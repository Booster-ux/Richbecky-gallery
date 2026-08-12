/**
 * Richbecky Gallery — Artist Service
 */

import { ArtistEntity, ArtistApplicationEntity } from '../types';
import { ArtistModel, ArtistApplicationModel } from '../models/Artist.model';
import { NotificationModel, AuditRecordModel } from '../models/Notification.model';
import { RBACService } from '../security/rbac';

export class ArtistBackendService {
  public static getAllActiveArtists(): ArtistEntity[] {
    return ArtistModel.findAll().filter(a => a.status === 'Active');
  }

  public static getArtistById(id: string): ArtistEntity | undefined {
    return ArtistModel.findById(id);
  }

  public static submitApplication(
    data: Omit<ArtistApplicationEntity, 'id' | 'status' | 'submittedAt'>
  ): ArtistApplicationEntity {
    const app = ArtistApplicationModel.submit(data);

    // Notify admins of new artist registration application
    AuditRecordModel.logAction({
      actorId: data.userId || 'guest-applicant',
      actorEmail: data.email,
      actorRole: 'artist',
      action: 'ARTIST_APPLICATION_SUBMITTED',
      affectedEntity: 'ArtistApplication',
      affectedEntityId: app.id,
      metadata: { artistName: app.artistName }
    });

    return app;
  }

  public static reviewApplication(
    adminUserId: string,
    adminEmail: string,
    applicationId: string,
    action: 'Approved' | 'Rejected',
    notes?: string,
    rejectionReason?: string
  ): ArtistApplicationEntity {
    RBACService.assertPermission('admin', 'application:review');

    const app = ArtistApplicationModel.review(applicationId, adminUserId, action, notes, rejectionReason);

    if (app.userId) {
      NotificationModel.create({
        recipientId: app.userId,
        recipientRole: 'artist',
        type: 'artist',
        title: action === 'Approved' ? 'Application Approved!' : 'Application Decision Update',
        message: action === 'Approved'
          ? 'Welcome to Richbecky Gallery! Your artist profile is now active.'
          : `Your application was reviewed. Note: ${rejectionReason || 'Please contact gallery team.'}`,
        metadata: { applicationId: app.id }
      });
    }

    AuditRecordModel.logAction({
      actorId: adminUserId,
      actorEmail: adminEmail,
      actorRole: 'admin',
      action: action === 'Approved' ? 'ARTIST_APPLICATION_APPROVED' : 'ARTIST_APPLICATION_REJECTED',
      affectedEntity: 'ArtistApplication',
      affectedEntityId: applicationId,
      metadata: { artistName: app.artistName, rejectionReason }
    });

    return app;
  }
}
