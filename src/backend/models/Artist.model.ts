/**
 * Richbecky Gallery — Artist & Artist Application Domain Models
 */

import {
  ArtistEntity,
  ArtistApplicationEntity,
  ArtistStatusType,
  ApplicationStatusType,
  ArtistContactInfo,
  ArtistSocialLinks
} from '../types';
import { dbStore } from '../db';

export class ArtistModel {
  public static findAll(): ArtistEntity[] {
    return Array.from(dbStore.artists.values());
  }

  public static findById(id: string): ArtistEntity | undefined {
    return dbStore.artists.get(id);
  }

  public static findByUserId(userId: string): ArtistEntity | undefined {
    for (const artist of dbStore.artists.values()) {
      if (artist.userId === userId) {
        return artist;
      }
    }
    return undefined;
  }

  public static create(data: {
    userId: string;
    fullName: string;
    biography: string;
    artistStatement: string;
    profileImage: string;
    country: string;
    contactInfo: ArtistContactInfo;
    socialLinks: ArtistSocialLinks;
    website?: string;
    commissionRate?: number;
  }): ArtistEntity {
    const existing = this.findByUserId(data.userId);
    if (existing) return existing;

    const newArtist: ArtistEntity = {
      id: `a-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      userId: data.userId,
      fullName: data.fullName,
      biography: data.biography,
      artistStatement: data.artistStatement,
      profileImage: data.profileImage,
      country: data.country,
      contactInfo: data.contactInfo,
      socialLinks: data.socialLinks,
      website: data.website,
      exhibitionsCount: 0,
      artworksCount: 0,
      commissionRate: data.commissionRate !== undefined ? data.commissionRate : 15.0,
      status: 'Pending Verification',
      approvalStatus: 'Pending',
      registrationDate: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    dbStore.artists.set(newArtist.id, newArtist);
    return newArtist;
  }

  public static updateStatus(artistId: string, status: ArtistStatusType, approvalStatus?: ApplicationStatusType): ArtistEntity {
    const artist = this.findById(artistId);
    if (!artist) {
      throw new Error(`Artist with ID ${artistId} not found.`);
    }

    artist.status = status;
    if (approvalStatus) {
      artist.approvalStatus = approvalStatus;
      if (approvalStatus === 'Approved') {
        artist.approvedDate = new Date().toISOString();
      }
    }
    artist.updatedAt = new Date().toISOString();
    return artist;
  }
}

export class ArtistApplicationModel {
  public static findAll(): ArtistApplicationEntity[] {
    return Array.from(dbStore.artistApplications.values());
  }

  public static findById(id: string): ArtistApplicationEntity | undefined {
    return dbStore.artistApplications.get(id);
  }

  public static submit(data: Omit<ArtistApplicationEntity, 'id' | 'status' | 'submittedAt'>): ArtistApplicationEntity {
    const newApp: ArtistApplicationEntity = {
      ...data,
      id: `app-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      status: 'Pending',
      submittedAt: new Date().toISOString()
    };

    dbStore.artistApplications.set(newApp.id, newApp);
    return newApp;
  }

  public static review(
    applicationId: string,
    reviewerId: string,
    action: 'Approved' | 'Rejected',
    notes?: string,
    rejectionReason?: string
  ): ArtistApplicationEntity {
    const app = this.findById(applicationId);
    if (!app) {
      throw new Error(`Artist application with ID ${applicationId} not found.`);
    }

    app.status = action;
    app.reviewerId = reviewerId;
    app.reviewedAt = new Date().toISOString();
    if (notes) app.adminNotes = notes;
    if (rejectionReason) app.rejectionReason = rejectionReason;

    // If approved, sync status to corresponding Artist record if exists
    if (app.userId) {
      const artist = ArtistModel.findByUserId(app.userId);
      if (artist) {
        ArtistModel.updateStatus(
          artist.id,
          action === 'Approved' ? 'Active' : 'Rejected',
          action
        );
      }
    }

    return app;
  }
}
