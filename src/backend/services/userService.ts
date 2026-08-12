/**
 * Richbecky Gallery — User & Commission Services
 */

import { UserEntity, AuthSession, CommissionEntity } from '../types';
import { UserModel } from '../models/User.model';
import { CustomerModel } from '../models/Customer.model';
import { CommissionModel } from '../models/Order.model';
import { AuthService } from '../security/auth';
import { AuditRecordModel } from '../models/Notification.model';

export class UserBackendService {
  public static loginUser(email: string): AuthSession {
    const session = AuthService.authenticate(email);
    
    AuditRecordModel.logAction({
      actorId: session.user.id,
      actorEmail: session.user.email,
      actorRole: session.user.role,
      action: 'USER_LOGIN',
      affectedEntity: 'User',
      affectedEntityId: session.user.id
    });

    return session;
  }

  public static registerCustomer(data: {
    email: string;
    firstName: string;
    lastName: string;
    phone?: string;
  }): AuthSession {
    const user = UserModel.create({
      ...data,
      role: 'customer'
    });

    CustomerModel.create({
      userId: user.id
    });

    return AuthService.createSession(user);
  }
}

export class CommissionBackendService {
  public static getCommissionsForArtist(artistId: string): CommissionEntity[] {
    return CommissionModel.findByArtistId(artistId);
  }

  public static calculateCommissionBreakdown(saleAmount: number, commissionRate: number = 15.0): {
    artistShare: number;
    galleryShare: number;
  } {
    const galleryShare = (saleAmount * commissionRate) / 100.0;
    const artistShare = saleAmount - galleryShare;
    return {
      artistShare: Math.round(artistShare * 100) / 100,
      galleryShare: Math.round(galleryShare * 100) / 100
    };
  }
}
