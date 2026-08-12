/**
 * Richbecky Gallery — Artwork Service
 */

import { ArtworkEntity, CategoryEntity } from '../types';
import { ArtworkModel, CategoryModel } from '../models/Artwork.model';
import { InventoryModel } from '../models/ArtworkImage.model';
import { AuditRecordModel } from '../models/Notification.model';
import { RBACService } from '../security/rbac';
import { SystemUserRole } from '../types';

export class ArtworkBackendService {
  public static getPublicCatalog(): ArtworkEntity[] {
    return ArtworkModel.findAll().filter(art => art.status === 'Approved' || art.status === 'Published');
  }

  public static getArtworkBySlug(slug: string): ArtworkEntity | undefined {
    return ArtworkModel.findBySlug(slug);
  }

  public static getCategories(): CategoryEntity[] {
    return CategoryModel.findAll().filter(c => c.isActive);
  }

  public static submitNewArtwork(
    actorRole: SystemUserRole,
    data: Omit<ArtworkEntity, 'id' | 'slug' | 'createdAt' | 'updatedAt'>
  ): ArtworkEntity {
    RBACService.assertPermission(actorRole, 'artwork:create');

    const created = ArtworkModel.create(data);

    AuditRecordModel.logAction({
      actorId: data.artistId,
      actorEmail: `artist_${data.artistId}@richbeckygallery.com`,
      actorRole,
      action: 'ARTWORK_SUBMITTED',
      affectedEntity: 'Artwork',
      affectedEntityId: created.id,
      metadata: { title: created.title, artworkType: created.artworkType }
    });

    return created;
  }

  public static approveArtwork(
    adminUserId: string,
    adminEmail: string,
    artworkId: string
  ): ArtworkEntity {
    RBACService.assertPermission('admin', 'artwork:approve');

    const updated = ArtworkModel.updateStatus(artworkId, 'Approved');

    AuditRecordModel.logAction({
      actorId: adminUserId,
      actorEmail: adminEmail,
      actorRole: 'admin',
      action: 'ARTWORK_APPROVED',
      affectedEntity: 'Artwork',
      affectedEntityId: artworkId,
      metadata: { title: updated.title }
    });

    return updated;
  }

  public static rejectArtwork(
    adminUserId: string,
    adminEmail: string,
    artworkId: string,
    reason: string
  ): ArtworkEntity {
    RBACService.assertPermission('admin', 'artwork:approve');

    const updated = ArtworkModel.updateStatus(artworkId, 'Rejected');

    AuditRecordModel.logAction({
      actorId: adminUserId,
      actorEmail: adminEmail,
      actorRole: 'admin',
      action: 'ARTWORK_REJECTED',
      affectedEntity: 'Artwork',
      affectedEntityId: artworkId,
      metadata: { title: updated.title, reason }
    });

    return updated;
  }
}
