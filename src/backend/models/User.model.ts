/**
 * Richbecky Gallery — User Domain Model
 */

import { UserEntity, SystemUserRole, UserStatus } from '../types';
import { dbStore } from '../db';

export class UserModel {
  public static findById(id: string): UserEntity | undefined {
    return dbStore.users.get(id);
  }

  public static findByEmail(email: string): UserEntity | undefined {
    const normalized = email.toLowerCase().trim();
    for (const user of dbStore.users.values()) {
      if (user.email.toLowerCase() === normalized) {
        return user;
      }
    }
    return undefined;
  }

  public static create(data: {
    email: string;
    firstName: string;
    lastName: string;
    role: SystemUserRole;
    phone?: string;
    profileImage?: string;
    passwordHash?: string;
  }): UserEntity {
    const existing = this.findByEmail(data.email);
    if (existing) {
      throw new Error(`User with email ${data.email} already exists.`);
    }

    const newUser: UserEntity = {
      id: `u-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      email: data.email.toLowerCase().trim(),
      firstName: data.firstName,
      lastName: data.lastName,
      role: data.role,
      phone: data.phone,
      profileImage: data.profileImage,
      passwordHash: data.passwordHash,
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    dbStore.users.set(newUser.id, newUser);
    dbStore.persistState();
    return newUser;
  }

  public static updateStatus(userId: string, newStatus: UserStatus): UserEntity {
    const user = this.findById(userId);
    if (!user) {
      throw new Error(`User with ID ${userId} not found.`);
    }
    user.status = newStatus;
    user.updatedAt = new Date().toISOString();
    return user;
  }

  public static recordLastLogin(userId: string): void {
    const user = this.findById(userId);
    if (user) {
      user.lastLogin = new Date().toISOString();
      user.updatedAt = new Date().toISOString();
    }
  }
}
