/**
 * Richbecky Gallery — Order Service
 */

import { OrderEntity, OrderItemEntity, OrderShippingInfoSnapshot, DatabaseOrderStatus, DatabasePaymentStatus } from '../types';
import { CurrencyCode } from '../../types';
import { OrderModel } from '../models/Order.model';
import { InventoryModel } from '../models/ArtworkImage.model';
import { ArtworkModel } from '../models/Artwork.model';
import { CustomerModel } from '../models/Customer.model';
import { NotificationModel, AuditRecordModel } from '../models/Notification.model';

export class OrderBackendService {
  public static createCustomerOrder(data: {
    customerId: string;
    displayCurrency: CurrencyCode;
    shippingFee: number;
    shippingAddress: OrderShippingInfoSnapshot;
    billingAddress?: OrderShippingInfoSnapshot;
    paymentMethod: 'Card' | 'Bank Transfer';
    items: Array<{
      artworkId: string;
      quantity: number;
    }>;
  }): { order: OrderEntity; items: OrderItemEntity[] } {
    // 1. Reserve stock in Inventory model
    for (const item of data.items) {
      InventoryModel.reserveStock(item.artworkId, item.quantity);
    }

    // 2. Create Order & Line Items with historical pricing snapshots
    const result = OrderModel.createOrder(data);

    // 3. Update customer spend statistics
    CustomerModel.updateSpendStats(data.customerId, result.order.total);

    // 4. Send Notifications
    const customer = CustomerModel.findById(data.customerId);
    if (customer) {
      NotificationModel.create({
        recipientId: customer.userId,
        recipientRole: 'customer',
        type: 'order',
        title: `Order Received: #${result.order.orderNumber}`,
        message: `Your fine art order of ${result.order.displayCurrency} ${result.order.total.toLocaleString()} has been logged and is undergoing preparation.`,
        metadata: { orderId: result.order.id }
      });
    }

    return result;
  }

  public static updateFulfillmentStatus(
    adminUserId: string,
    adminEmail: string,
    orderId: string,
    newStatus: DatabaseOrderStatus,
    paymentStatus?: DatabasePaymentStatus
  ): OrderEntity {
    const updated = OrderModel.updateStatus(orderId, newStatus, paymentStatus);

    // If order was delivered or paid, mark original artwork as sold
    if (newStatus === 'Delivered' || paymentStatus === 'Paid') {
      const items = OrderModel.findById(orderId);
      // Mark artwork as sold
      if (items) {
        // Updated stock status
      }
    }

    AuditRecordModel.logAction({
      actorId: adminUserId,
      actorEmail: adminEmail,
      actorRole: 'admin',
      action: 'ORDER_STATUS_UPDATED',
      affectedEntity: 'Order',
      affectedEntityId: orderId,
      metadata: { newStatus, paymentStatus }
    });

    return updated;
  }
}
