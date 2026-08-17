import { supabase } from '../lib/supabase';
import {
  ArtworkEntity,
  ArtistEntity,
  CategoryEntity,
  ArtistApplicationEntity,
  OrderEntity,
  OrderItemEntity,
  WishlistEntity,
  CommissionEntity,
  NotificationEntity,
  AuditRecordEntity,
  CustomerEntity,
  UserEntity
} from '../backend/types';

export class SupabaseService {
  // ==========================================
  // ARTWORKS & CATEGORIES
  // ==========================================
  public static async fetchArtworks(): Promise<ArtworkEntity[]> {
    const { data, error } = await supabase
      .from('artworks')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data) return [];
    return data.map((art: any) => ({
      id: art.id,
      title: art.title,
      artistId: art.artist_id,
      artistNameSnapshot: art.artist_name_snapshot,
      description: art.description,
      artworkStory: art.artwork_story,
      artistStatement: art.artist_statement,
      artworkType: art.artwork_type,
      categoryId: art.category_id,
      categoryNameSnapshot: art.category_name_snapshot,
      medium: art.medium,
      materials: art.materials,
      dimensionsFormatted: art.dimensions_formatted,
      dimensionsParsed: art.dimensions_parsed,
      yearCreated: art.year_created,
      price: Number(art.price),
      originalCurrency: art.original_currency,
      availability: art.availability,
      quantity: art.quantity,
      status: art.status,
      isFeatured: art.is_featured,
      isNewArrival: art.is_new_arrival,
      certificateIncluded: art.certificate_included,
      certificateNumber: art.certificate_number,
      certificateDetails: art.certificate_details,
      editionInfo: art.edition_info,
      editionNumber: art.edition_number,
      editionTotal: art.edition_total,
      editionType: art.edition_type,
      signatureInfo: art.signature_info,
      framingInfo: art.framing_info,
      fineArtPrintAvailable: art.fine_art_print_available,
      fineArtPrintDetails: art.fine_art_print_details,
      shippingInfoNotes: art.shipping_info_notes,
      shippingDetails: art.shipping_details,
      shippingPrepTime: art.shipping_prep_time,
      specialHandling: art.special_handling,
      slug: art.slug,
      primaryImageUrl: art.primary_image_url,
      altText: art.alt_text,
      createdAt: art.created_at,
      updatedAt: art.updated_at,
      publishedAt: art.published_at
    }));
  }

  public static async fetchArtists(): Promise<ArtistEntity[]> {
    const { data, error } = await supabase.from('artists').select('*');
    if (error || !data) return [];
    return data.map((a: any) => ({
      id: a.id,
      userId: a.user_id,
      fullName: a.full_name,
      biography: a.biography,
      artistStatement: a.artist_statement || '',
      profileImage: a.profile_image || '',
      coverImage: a.cover_image,
      country: a.country,
      contactInfo: a.contact_info || {},
      socialLinks: a.social_links || {},
      website: a.website,
      exhibitionsCount: a.exhibitions_count || 0,
      artworksCount: a.artworks_count || 0,
      commissionRate: Number(a.commission_rate || 30.0),
      status: a.status,
      approvalStatus: a.approval_status,
      registrationDate: a.registration_date,
      approvedDate: a.approved_date,
      createdAt: a.created_at,
      updatedAt: a.updated_at
    }));
  }

  public static async fetchCategories(): Promise<CategoryEntity[]> {
    const { data, error } = await supabase.from('categories').select('*').order('display_order');
    if (error || !data) return [];
    return data.map((c: any) => ({
      id: c.id,
      name: c.name,
      slug: c.slug,
      description: c.description,
      image: c.image,
      displayOrder: c.display_order,
      isActive: c.is_active,
      artworkCount: c.artwork_count,
      createdAt: c.created_at,
      updatedAt: c.updated_at
    }));
  }

  public static async saveArtwork(art: Partial<ArtworkEntity>): Promise<ArtworkEntity | null> {
    const payload = {
      id: art.id,
      title: art.title,
      artist_id: art.artistId,
      artist_name_snapshot: art.artistNameSnapshot,
      description: art.description,
      artwork_story: art.artworkStory,
      artist_statement: art.artistStatement,
      artwork_type: art.artworkType || 'Original Artwork',
      category_id: art.categoryId,
      category_name_snapshot: art.categoryNameSnapshot,
      medium: art.medium,
      materials: art.materials,
      dimensions_formatted: art.dimensionsFormatted,
      dimensions_parsed: art.dimensionsParsed,
      year_created: art.yearCreated,
      price: art.price,
      original_currency: art.originalCurrency || 'USD',
      availability: art.availability || 'Available',
      quantity: art.quantity || 1,
      status: art.status || 'Pending Admin Approval',
      is_featured: art.isFeatured || false,
      is_new_arrival: art.isNewArrival || true,
      certificate_included: art.certificateIncluded !== undefined ? art.certificateIncluded : true,
      slug: art.slug,
      primary_image_url: art.primaryImageUrl,
      alt_text: art.altText
    };

    const { data, error } = await supabase
      .from('artworks')
      .upsert(payload)
      .select('*')
      .single();

    if (error || !data) {
      console.error('Error saving artwork to Supabase:', error?.message);
      return null;
    }
    return (await this.fetchArtworks()).find(a => a.id === data.id) || null;
  }

  public static async updateArtworkStatus(artworkId: string, status: string): Promise<boolean> {
    const { error } = await supabase
      .from('artworks')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', artworkId);

    return !error;
  }

  // ==========================================
  // ARTIST APPLICATIONS
  // ==========================================
  public static async fetchArtistApplications(): Promise<ArtistApplicationEntity[]> {
    const { data, error } = await supabase.from('artist_applications').select('*').order('submitted_at', { ascending: false });
    if (error || !data) return [];
    return data.map((app: any) => ({
      id: app.id,
      userId: app.user_id,
      fullName: app.full_name,
      email: app.email,
      phone: app.phone,
      country: app.country,
      city: app.city,
      website: app.website,
      instagram: app.instagram,
      artistName: app.artist_name,
      bio: app.bio,
      artistStatement: app.artist_statement,
      practiceAreas: app.practice_areas,
      mediums: app.mediums,
      yearsActive: app.years_active,
      exhibitions: app.exhibitions,
      awards: app.awards,
      collections: app.collections,
      galleryExperience: app.gallery_experience,
      portfolioImages: app.portfolio_images || [],
      agreedToTerms: app.agreed_to_terms,
      status: app.status,
      rejectionReason: app.rejection_reason,
      submittedAt: app.submitted_at,
      reviewedAt: app.reviewed_at,
      reviewerId: app.reviewer_id,
      adminNotes: app.admin_notes
    }));
  }

  public static async saveArtistApplication(app: Partial<ArtistApplicationEntity>): Promise<ArtistApplicationEntity | null> {
    const payload = {
      id: app.id,
      user_id: app.userId,
      full_name: app.fullName,
      email: app.email,
      phone: app.phone,
      country: app.country,
      city: app.city,
      website: app.website,
      instagram: app.instagram,
      artist_name: app.artistName,
      bio: app.bio,
      artist_statement: app.artistStatement,
      practice_areas: app.practiceAreas,
      mediums: app.mediums,
      years_active: app.yearsActive,
      exhibitions: app.exhibitions,
      awards: app.awards,
      collections: app.collections,
      gallery_experience: app.galleryExperience,
      portfolio_images: app.portfolioImages || [],
      agreed_to_terms: app.agreedToTerms || true,
      status: app.status || 'Pending',
      rejection_reason: app.rejectionReason,
      submitted_at: app.submittedAt || new Date().toISOString()
    };

    const { data, error } = await supabase
      .from('artist_applications')
      .upsert(payload)
      .select('*')
      .single();

    if (error || !data) {
      console.error('Error saving artist application to Supabase:', error?.message);
      return null;
    }
    return (await this.fetchArtistApplications()).find(a => a.id === data.id) || null;
  }

  public static async updateArtistApplicationStatus(appId: string, status: string, rejectionReason?: string): Promise<boolean> {
    const { error } = await supabase
      .from('artist_applications')
      .update({
        status,
        rejection_reason: rejectionReason || null,
        reviewed_at: new Date().toISOString()
      })
      .eq('id', appId);

    return !error;
  }

  // ==========================================
  // STORAGE UPLOADS
  // ==========================================
  public static async uploadArtworkImage(file: File | Blob, fileName: string): Promise<string | null> {
    const path = `artworks/${Date.now()}_${fileName}`;
    const { data, error } = await supabase.storage
      .from('artwork-images')
      .upload(path, file, { upsert: true });

    if (error || !data) {
      console.error('Storage upload failed:', error?.message);
      return null;
    }

    const { data: pubUrl } = supabase.storage.from('artwork-images').getPublicUrl(path);
    return pubUrl.publicUrl;
  }

  // ==========================================
  // ORDERS & COMMISSIONS
  // ==========================================
  public static async saveOrder(order: Partial<OrderEntity>): Promise<boolean> {
    const payload = {
      id: order.id,
      order_number: order.orderNumber,
      customer_id: order.customerId,
      order_date: order.orderDate || new Date().toISOString(),
      status: order.status || 'Pending',
      payment_status: order.paymentStatus || 'Pending',
      display_currency: order.displayCurrency || 'USD',
      subtotal: order.subtotal,
      shipping_fee: order.shippingFee || 0,
      total: order.total,
      shipping_address: order.shippingAddress,
      billing_address: order.billingAddress,
      payment_method: order.paymentMethod || 'Card',
      tracking_number: order.trackingNumber
    };

    const { error } = await supabase.from('orders').upsert(payload);
    return !error;
  }

  // ==========================================
  // WISHLISTS
  // ==========================================
  public static async fetchWishlist(customerId: string): Promise<WishlistEntity[]> {
    const { data, error } = await supabase
      .from('wishlists')
      .select('*')
      .eq('customer_id', customerId);

    if (error || !data) return [];
    return data.map((w: any) => ({
      id: w.id,
      customerId: w.customer_id,
      artworkId: w.artwork_id,
      createdAt: w.created_at
    }));
  }

  public static async toggleWishlist(customerId: string, artworkId: string): Promise<boolean> {
    const existing = await this.fetchWishlist(customerId);
    const item = existing.find(w => w.artworkId === artworkId);

    if (item) {
      const { error } = await supabase.from('wishlists').delete().eq('id', item.id);
      return !error;
    } else {
      const { error } = await supabase.from('wishlists').insert({
        customer_id: customerId,
        artwork_id: artworkId
      });
      return !error;
    }
  }

  // ==========================================
  // AUDIT LOGS
  // ==========================================
  public static async logAuditRecord(record: Partial<AuditRecordEntity>): Promise<void> {
    await supabase.from('audit_records').insert({
      actor_id: record.actorId || null,
      actor_email: record.actorEmail || 'system@richbeckygallery.com',
      actor_role: record.actorRole || 'customer',
      action: record.action || 'view',
      affected_entity: record.affectedEntity || 'system',
      affected_entity_id: record.affectedEntityId || '0',
      metadata: record.metadata || {}
    });
  }
}
