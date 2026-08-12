/**
 * Richbecky Gallery — Customer & Customer Address Domain Models
 */

import { CustomerEntity, CustomerAddressEntity, UserStatus } from '../types';
import { CurrencyCode } from '../../types';
import { dbStore } from '../db';

export class CustomerModel {
  public static findById(id: string): CustomerEntity | undefined {
    return dbStore.customers.get(id);
  }

  public static findByUserId(userId: string): CustomerEntity | undefined {
    for (const customer of dbStore.customers.values()) {
      if (customer.userId === userId) {
        return customer;
      }
    }
    return undefined;
  }

  public static create(data: {
    userId: string;
    preferredCurrency?: CurrencyCode;
  }): CustomerEntity {
    const existing = this.findByUserId(data.userId);
    if (existing) return existing;

    const newCustomer: CustomerEntity = {
      id: `c-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      userId: data.userId,
      accountNumber: `RBG-CUST-${Math.floor(1000 + Math.random() * 9000)}`,
      vipStatus: 'Standard',
      totalSpend: 0,
      orderCount: 0,
      wishlistCount: 0,
      preferredCurrency: data.preferredCurrency || 'USD',
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    dbStore.customers.set(newCustomer.id, newCustomer);
    return newCustomer;
  }

  public static updatePreferredCurrency(customerId: string, currency: CurrencyCode): CustomerEntity {
    const customer = this.findById(customerId);
    if (!customer) {
      throw new Error(`Customer with ID ${customerId} not found.`);
    }
    customer.preferredCurrency = currency;
    customer.updatedAt = new Date().toISOString();
    return customer;
  }

  public static updateSpendStats(customerId: string, addedSpend: number): void {
    const customer = this.findById(customerId);
    if (customer) {
      customer.totalSpend += addedSpend;
      customer.orderCount += 1;

      // Automatic VIP Tier upgrade logic based on total spend
      if (customer.totalSpend >= 5000000) { // e.g. 5M NGN / $3500+
        customer.vipStatus = 'VIP Collector';
      } else if (customer.totalSpend >= 2000000) {
        customer.vipStatus = 'Gold';
      } else if (customer.totalSpend >= 500000) {
        customer.vipStatus = 'Silver';
      }

      customer.updatedAt = new Date().toISOString();
    }
  }
}

export class AddressModel {
  public static findByCustomerId(customerId: string): CustomerAddressEntity[] {
    const list: CustomerAddressEntity[] = [];
    for (const addr of dbStore.customerAddresses.values()) {
      if (addr.customerId === customerId) {
        list.push(addr);
      }
    }
    return list;
  }

  public static addAddress(data: Omit<CustomerAddressEntity, 'id' | 'createdAt' | 'updatedAt'>): CustomerAddressEntity {
    const existing = this.findByCustomerId(data.customerId);
    
    // If this is set as default, clear default flag on other addresses
    if (data.isDefault) {
      existing.forEach(a => { a.isDefault = false; });
    }

    const newAddr: CustomerAddressEntity = {
      ...data,
      id: `addr-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      isDefault: data.isDefault || existing.length === 0, // First address is default by default
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    dbStore.customerAddresses.set(newAddr.id, newAddr);
    return newAddr;
  }
}
