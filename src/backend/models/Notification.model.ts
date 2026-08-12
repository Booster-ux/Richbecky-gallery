/**
 * Richbecky Gallery — Notification, Audit & Content Domain Models
 */

import {
  NotificationEntity,
  NotificationRecipientRole,
  NotificationType,
  AuditRecordEntity,
  SystemUserRole,
  PolicyEntity,
  WebsiteContentEntity,
  PolicyType,
  EnquiryEntity
} from '../types';
import { dbStore } from '../db';

export class NotificationModel {
  public static findByRecipientId(recipientId: string): NotificationEntity[] {
    return dbStore.notifications.get(recipientId) || [];
  }

  public static create(data: Omit<NotificationEntity, 'id' | 'read' | 'createdAt'>): NotificationEntity {
    const userNotifications = this.findByRecipientId(data.recipientId);

    const newNotif: NotificationEntity = {
      ...data,
      id: `notif-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      read: false,
      createdAt: new Date().toISOString()
    };

    userNotifications.unshift(newNotif);
    dbStore.notifications.set(data.recipientId, userNotifications);
    return newNotif;
  }

  public static markAsRead(recipientId: string, notificationId: string): void {
    const list = this.findByRecipientId(recipientId);
    const target = list.find(n => n.id === notificationId);
    if (target) {
      target.read = true;
    }
  }
}

export class AuditRecordModel {
  public static logAction(data: {
    actorId: string;
    actorEmail: string;
    actorRole: SystemUserRole;
    action: string;
    affectedEntity: string;
    affectedEntityId: string;
    metadata?: Record<string, unknown>;
  }): AuditRecordEntity {
    const record: AuditRecordEntity = {
      ...data,
      id: `audit-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toISOString()
    };

    dbStore.auditRecords.unshift(record);
    return record;
  }

  public static findAll(): AuditRecordEntity[] {
    return dbStore.auditRecords;
  }
}

export class PolicyModel {
  public static findByType(policyType: PolicyType): PolicyEntity | undefined {
    for (const p of dbStore.policies.values()) {
      if (p.policyType === policyType) {
        return p;
      }
    }
    return undefined;
  }
}

export class EnquiryModel {
  public static findAll(): EnquiryEntity[] {
    return Array.from(dbStore.enquiries.values());
  }

  public static create(data: Omit<EnquiryEntity, 'id' | 'status' | 'date'>): EnquiryEntity {
    const enquiry: EnquiryEntity = {
      ...data,
      id: `enq-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      status: 'New',
      date: new Date().toISOString()
    };

    dbStore.enquiries.set(enquiry.id, enquiry);
    return enquiry;
  }
}
