/**
 * Richbecky Gallery — Security & Authentication Foundation
 */

import { UserEntity, AuthSession, SystemUserRole } from '../types';
import { UserModel } from '../models/User.model';

export interface JwtPayload {
  sub: string; // User ID
  email: string;
  role: SystemUserRole;
  iat: number;
  exp: number;
}

export class AuthService {
  /**
   * Dummy secure password hashing interface for Stage 1.
   * Stage 2 will connect bcrypt or Supabase Auth.
   */
  public static async hashPassword(password: string): Promise<string> {
    if (!password || password.length < 8) {
      throw new Error('Password must be at least 8 characters long.');
    }
    // Simulation of secure hash string format for Stage 1
    const encoded = typeof btoa !== 'undefined' ? btoa(password) : encodeURIComponent(password);
    return `$2a$12$RBG.${encoded}`;
  }

  public static async verifyPassword(password: string, hash: string): Promise<boolean> {
    if (!hash) return false;
    const computed = await this.hashPassword(password);
    const encoded = typeof btoa !== 'undefined' ? btoa(password) : encodeURIComponent(password);
    return computed === hash || hash.includes(encoded);
  }

  public static createSession(user: UserEntity): AuthSession {
    const { passwordHash, ...userClean } = user;
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(); // 7 days
    const token = `rbg_token_${user.id}_${Date.now()}`;

    return {
      user: userClean,
      token,
      expiresAt
    };
  }

  public static authenticate(email: string): AuthSession {
    const user = UserModel.findByEmail(email);
    if (!user) {
      throw new Error(`Authentication failed for email: ${email}`);
    }
    if (user.status === 'suspended') {
      throw new Error('User account is suspended. Please contact gallery advisory.');
    }

    UserModel.recordLastLogin(user.id);
    return this.createSession(user);
  }
}
