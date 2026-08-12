/**
 * Richbecky Gallery — Artwork & Category Domain Models
 */

import { ArtworkEntity, CategoryEntity, ArtworkParsedDimensions } from '../types';
import { ArtworkType, ArtworkStatus, CurrencyCode } from '../../types';
import { dbStore } from '../db';
import { getProductionImageUrl } from '../../services/imageService';

export class CategoryModel {
  public static findAll(): CategoryEntity[] {
    return Array.from(dbStore.categories.values());
  }

  public static findById(id: string): CategoryEntity | undefined {
    return dbStore.categories.get(id);
  }

  public static findBySlug(slug: string): CategoryEntity | undefined {
    const normalized = slug.toLowerCase().trim();
    for (const cat of dbStore.categories.values()) {
      if (cat.slug.toLowerCase() === normalized) {
        return cat;
      }
    }
    return undefined;
  }
}

export class ArtworkModel {
  public static findAll(): ArtworkEntity[] {
    return Array.from(dbStore.artworks.values());
  }

  public static findById(id: string): ArtworkEntity | undefined {
    return dbStore.artworks.get(id);
  }

  public static findBySlug(slug: string): ArtworkEntity | undefined {
    const normalized = slug.toLowerCase().trim();
    for (const art of dbStore.artworks.values()) {
      if (art.slug.toLowerCase() === normalized) {
        return art;
      }
    }
    return undefined;
  }

  public static generateSlug(title: string): string {
    let slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    let counter = 1;
    let candidate = slug;
    while (this.findBySlug(candidate)) {
      candidate = `${slug}-${counter}`;
      counter++;
    }
    return candidate;
  }

  public static validateArtworkData(data: {
    artworkType: ArtworkType;
    quantity: number;
    price: number;
  }): void {
    if (data.price < 0) {
      throw new Error('Artwork price cannot be negative.');
    }

    // ORIGINAL ARTWORK LOGIC CONSTRAINT: Max 1 item for Original Artwork
    if (data.artworkType === 'Original' || data.artworkType === 'Original Artwork') {
      if (data.quantity > 1) {
        throw new Error('Original Artwork quantity cannot exceed 1 piece.');
      }
    }

    if (data.quantity < 0) {
      throw new Error('Artwork quantity cannot be negative.');
    }
  }

  public static create(data: Omit<ArtworkEntity, 'id' | 'slug' | 'createdAt' | 'updatedAt'>): ArtworkEntity {
    this.validateArtworkData({
      artworkType: data.artworkType,
      quantity: data.quantity,
      price: data.price
    });

    const slug = this.generateSlug(data.title);
    const safePrimaryImage = getProductionImageUrl(data.primaryImageUrl, data.title);

    const newArtwork: ArtworkEntity = {
      ...data,
      id: `art-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      slug,
      primaryImageUrl: safePrimaryImage,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    dbStore.artworks.set(newArtwork.id, newArtwork);

    // Auto-create inventory record
    dbStore.inventory.set(newArtwork.id, {
      id: `inv-${newArtwork.id}`,
      artworkId: newArtwork.id,
      quantity: newArtwork.quantity,
      reservedQuantity: 0,
      availableQuantity: newArtwork.quantity,
      status: newArtwork.quantity > 0 ? 'in_stock' : 'out_of_stock',
      lastUpdated: new Date().toISOString()
    });

    return newArtwork;
  }

  public static updateStatus(artworkId: string, status: ArtworkStatus | 'Published' | 'Sold'): ArtworkEntity {
    const art = this.findById(artworkId);
    if (!art) {
      throw new Error(`Artwork with ID ${artworkId} not found.`);
    }

    art.status = status;
    if (status === 'Approved' || status === 'Published') {
      art.publishedAt = new Date().toISOString();
    }
    art.updatedAt = new Date().toISOString();
    return art;
  }

  public static markAsSold(artworkId: string): ArtworkEntity {
    const art = this.findById(artworkId);
    if (!art) {
      throw new Error(`Artwork with ID ${artworkId} not found.`);
    }

    if (art.artworkType === 'Original' || art.artworkType === 'Original Artwork') {
      art.quantity = 0;
      art.availability = 'Sold';
      art.status = 'Sold';
    } else {
      // Fine Art Print: decrease quantity
      if (art.quantity > 0) {
        art.quantity -= 1;
      }
      if (art.quantity === 0) {
        art.availability = 'Sold';
      }
    }

    art.updatedAt = new Date().toISOString();

    // Sync Inventory
    const inv = dbStore.inventory.get(artworkId);
    if (inv) {
      inv.quantity = art.quantity;
      inv.availableQuantity = Math.max(0, inv.quantity - inv.reservedQuantity);
      inv.status = inv.availableQuantity > 0 ? 'in_stock' : 'out_of_stock';
      inv.lastUpdated = new Date().toISOString();
    }

    return art;
  }
}
