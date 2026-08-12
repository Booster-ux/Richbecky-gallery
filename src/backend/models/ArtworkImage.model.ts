/**
 * Richbecky Gallery — Artwork Image & Inventory Domain Models
 */

import { ArtworkImageEntity, InventoryEntity, InventoryStatusType } from '../types';
import { dbStore } from '../db';
import { getProductionImageUrl } from '../../services/imageService';

export class ArtworkImageModel {
  public static findByArtworkId(artworkId: string): ArtworkImageEntity[] {
    return dbStore.artworkImages.get(artworkId) || [];
  }

  public static addImage(data: Omit<ArtworkImageEntity, 'id' | 'createdAt'>): ArtworkImageEntity {
    const images = this.findByArtworkId(data.artworkId);
    
    // Resolve production safe URL
    const safeUrl = getProductionImageUrl(data.imageUrl);

    const newImg: ArtworkImageEntity = {
      ...data,
      id: `img-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      imageUrl: safeUrl,
      createdAt: new Date().toISOString()
    };

    if (newImg.isPrimary) {
      images.forEach(img => { img.isPrimary = false; });
    }

    images.push(newImg);
    images.sort((a, b) => a.displayOrder - b.displayOrder);
    dbStore.artworkImages.set(data.artworkId, images);

    return newImg;
  }
}

export class InventoryModel {
  public static findByArtworkId(artworkId: string): InventoryEntity | undefined {
    return dbStore.inventory.get(artworkId);
  }

  public static reserveStock(artworkId: string, quantityToReserve: number): InventoryEntity {
    const inv = this.findByArtworkId(artworkId);
    if (!inv) {
      throw new Error(`Inventory record for artwork ${artworkId} not found.`);
    }

    if (inv.availableQuantity < quantityToReserve) {
      throw new Error(`Insufficient stock available for artwork ${artworkId}. Required: ${quantityToReserve}, Available: ${inv.availableQuantity}`);
    }

    inv.reservedQuantity += quantityToReserve;
    inv.availableQuantity = inv.quantity - inv.reservedQuantity;
    if (inv.availableQuantity === 0) {
      inv.status = 'reserved';
    }
    inv.lastUpdated = new Date().toISOString();

    return inv;
  }

  public static releaseStock(artworkId: string, quantityToRelease: number): InventoryEntity {
    const inv = this.findByArtworkId(artworkId);
    if (!inv) {
      throw new Error(`Inventory record for artwork ${artworkId} not found.`);
    }

    inv.reservedQuantity = Math.max(0, inv.reservedQuantity - quantityToRelease);
    inv.availableQuantity = inv.quantity - inv.reservedQuantity;
    inv.status = inv.availableQuantity > 0 ? 'in_stock' : 'out_of_stock';
    inv.lastUpdated = new Date().toISOString();

    return inv;
  }
}
