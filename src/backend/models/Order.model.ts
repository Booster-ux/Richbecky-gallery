/**
 * Richbecky Gallery — Order, OrderItem, Wishlist & Commission Domain Models
 */

import {
  OrderEntity,
  OrderItemEntity,
  WishlistEntity,
  CommissionEntity,
  DatabaseOrderStatus,
  DatabasePaymentStatus,
  OrderShippingInfoSnapshot
} from '../types';
import { CurrencyCode, ArtworkType } from '../../types';
import { dbStore } from '../db';
import { ArtworkModel } from './Artwork.model';
import { ArtistModel } from './Artist.model';
import { convertPrice } from '../../services/currencyService';

export class OrderModel {
  public static findAll(): OrderEntity[] {
    return Array.from(dbStore.orders.values());
  }

  public static findById(id: string): OrderEntity | undefined {
    return dbStore.orders.get(id);
  }

  public static findByCustomerId(customerId: string): OrderEntity[] {
    const list: OrderEntity[] = [];
    for (const order of dbStore.orders.values()) {
      if (order.customerId === customerId) {
        list.push(order);
      }
    }
    return list;
  }

  public static generateOrderNumber(): string {
    const year = new Date().getFullYear();
    const count = dbStore.orders.size + 1;
    const formattedCount = String(count).padStart(4, '0');
    return `RBG-${year}-${formattedCount}`;
  }

  public static createOrder(data: {
    customerId: string;
    displayCurrency: CurrencyCode;
    shippingFee: number; // in displayCurrency
    shippingAddress: OrderShippingInfoSnapshot;
    billingAddress?: OrderShippingInfoSnapshot;
    paymentMethod: 'Card' | 'Bank Transfer';
    items: Array<{
      artworkId: string;
      quantity: number;
    }>;
  }): { order: OrderEntity; items: OrderItemEntity[] } {
    let subtotalDisplay = 0;
    const orderId = `ord-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const createdItems: OrderItemEntity[] = [];

    // Process order line items with historical snapshot preservation
    for (const itemInput of data.items) {
      const artwork = ArtworkModel.findById(itemInput.artworkId);
      if (!artwork) {
        throw new Error(`Artwork ${itemInput.artworkId} not found.`);
      }

      const artist = ArtistModel.findById(artwork.artistId);
      const commissionRate = artist ? artist.commissionRate : 15.0;

      // 1. Calculate price in customer's display currency
      const displayUnitPrice = convertPrice(
        artwork.price,
        artwork.originalCurrency,
        data.displayCurrency
      );
      const itemSubtotalDisplay = displayUnitPrice * itemInput.quantity;
      subtotalDisplay += itemSubtotalDisplay;

      // 2. Calculate artist vs gallery shares in artwork's original currency
      const originalTotalLinePrice = artwork.price * itemInput.quantity;
      const galleryShareAmount = (originalTotalLinePrice * commissionRate) / 100.0;
      const artistShareAmount = originalTotalLinePrice - galleryShareAmount;

      const orderItem: OrderItemEntity = {
        id: `item-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        orderId,
        artworkId: artwork.id,
        artistId: artwork.artistId,
        artworkTitleSnapshot: artwork.title,
        artworkTypeSnapshot: artwork.artworkType,
        quantity: itemInput.quantity,
        
        // Preserve unmutated historical original listing price
        originalListingPrice: artwork.price,
        originalListingCurrency: artwork.originalCurrency,
        
        // Preserve customer display checkout price
        applicableDisplayedPrice: displayUnitPrice,
        displayCurrency: data.displayCurrency,
        
        // Historical commission snapshots
        commissionRate,
        artistShareAmount,
        galleryShareAmount,
        
        createdAt: new Date().toISOString()
      };

      createdItems.push(orderItem);
    }

    const grandTotalDisplay = subtotalDisplay + data.shippingFee;

    const newOrder: OrderEntity = {
      id: orderId,
      orderNumber: this.generateOrderNumber(),
      customerId: data.customerId,
      orderDate: new Date().toISOString(),
      status: 'Processing',
      paymentStatus: 'Pending',
      displayCurrency: data.displayCurrency,
      subtotal: Math.round(subtotalDisplay * 100) / 100,
      shippingFee: data.shippingFee,
      total: Math.round(grandTotalDisplay * 100) / 100,
      shippingAddress: data.shippingAddress,
      billingAddress: data.billingAddress,
      paymentMethod: data.paymentMethod,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    dbStore.orders.set(newOrder.id, newOrder);
    dbStore.orderItems.set(newOrder.id, createdItems);

    // Create Commission Records for each item
    for (const item of createdItems) {
      CommissionModel.createForOrderItem(newOrder.id, item);
    }

    return { order: newOrder, items: createdItems };
  }

  public static updateStatus(orderId: string, status: DatabaseOrderStatus, paymentStatus?: DatabasePaymentStatus): OrderEntity {
    const order = this.findById(orderId);
    if (!order) {
      throw new Error(`Order with ID ${orderId} not found.`);
    }

    order.status = status;
    if (paymentStatus) {
      order.paymentStatus = paymentStatus;
    }
    order.updatedAt = new Date().toISOString();
    return order;
  }
}

export class WishlistModel {
  public static findByCustomerId(customerId: string): WishlistEntity[] {
    return dbStore.wishlists.get(customerId) || [];
  }

  public static add(customerId: string, artworkId: string): WishlistEntity {
    const userWishlist = this.findByCustomerId(customerId);
    
    // PREVENT DUPLICATE WISHLIST ENTRIES FOR SAME CUSTOMER AND ARTWORK
    const existing = userWishlist.find(item => item.artworkId === artworkId);
    if (existing) {
      return existing;
    }

    const newItem: WishlistEntity = {
      id: `wish-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      customerId,
      artworkId,
      createdAt: new Date().toISOString()
    };

    userWishlist.push(newItem);
    dbStore.wishlists.set(customerId, userWishlist);
    return newItem;
  }

  public static remove(customerId: string, artworkId: string): void {
    let userWishlist = this.findByCustomerId(customerId);
    userWishlist = userWishlist.filter(item => item.artworkId !== artworkId);
    dbStore.wishlists.set(customerId, userWishlist);
  }
}

export class CommissionModel {
  public static createForOrderItem(orderId: string, item: OrderItemEntity): CommissionEntity {
    const comm: CommissionEntity = {
      id: `comm-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      orderId,
      orderItemId: item.id,
      artistId: item.artistId,
      saleAmount: item.originalListingPrice * item.quantity,
      currency: item.originalListingCurrency,
      commissionPercentage: item.commissionRate,
      artistShare: item.artistShareAmount,
      galleryShare: item.galleryShareAmount,
      commissionStatus: 'calculated',
      payoutStatus: 'unpaid',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    dbStore.commissions.set(comm.id, comm);
    return comm;
  }

  public static findByArtistId(artistId: string): CommissionEntity[] {
    const list: CommissionEntity[] = [];
    for (const comm of dbStore.commissions.values()) {
      if (comm.artistId === artistId) {
        list.push(comm);
      }
    }
    return list;
  }
}
