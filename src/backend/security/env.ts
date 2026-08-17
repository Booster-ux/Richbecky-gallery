/**
 * Richbecky Gallery — Environment Variables Validator
 * Strictly validates environment variables without hardcoding secrets in source code.
 */

export interface AppEnvConfig {
  NODE_ENV: string;
  SUPABASE_URL?: string;
  SUPABASE_ANON_KEY?: string;
  SUPABASE_SERVICE_ROLE_KEY?: string;
  JWT_SECRET?: string;
  RESEND_API_KEY?: string;
  PORT: number;
}

export class EnvConfig {
  private static config: AppEnvConfig | null = null;

  public static get(): AppEnvConfig {
    if (!this.config) {
      const getEnv = (key: string): string | undefined => {
        try {
          const meta = import.meta as any;
          if (meta && meta.env && meta.env[key] !== undefined) {
            return meta.env[key];
          }
        } catch (_) {}
        const proc = (globalThis as any).process;
        if (proc && proc.env) {
          return proc.env[key];
        }
        return undefined;
      };

      this.config = {
        NODE_ENV: getEnv('NODE_ENV') || 'development',
        SUPABASE_URL: getEnv('VITE_SUPABASE_URL') || getEnv('SUPABASE_URL'),
        SUPABASE_ANON_KEY: getEnv('VITE_SUPABASE_PUBLISHABLE_KEY') || getEnv('VITE_SUPABASE_ANON_KEY') || getEnv('SUPABASE_ANON_KEY'),
        SUPABASE_SERVICE_ROLE_KEY: getEnv('SUPABASE_SERVICE_ROLE_KEY'),
        JWT_SECRET: getEnv('JWT_SECRET'),
        RESEND_API_KEY: getEnv('RESEND_API_KEY'),
        PORT: Number(getEnv('PORT') || 3000)
      };
    }
    return this.config;
  }
}
