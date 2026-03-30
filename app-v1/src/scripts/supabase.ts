import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri } from 'expo-auth-session';
import { createClient } from '@supabase/supabase-js';

const url = process.env.EXPO_PUBLIC_SUPABASE_URL ?? '';
const anonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? '';

WebBrowser.maybeCompleteAuthSession();

export type SupabaseAuthRedirectOptions = {
  scheme?: string;
  path?: string;
};

function SupabaseClientGet() {
  return createClient(url, anonKey, {
    auth: {
      persistSession: false,
    }
  });
};

function TokensUrlGet(redirectUrl: string): { accessToken?: string; refreshToken?: string; error?: string } {
  const url = new URL(redirectUrl);
  const queryParams = url.searchParams;
  const hashParams = url.hash ? new URLSearchParams(url.hash.slice(1)) : undefined;
  const tokenGet = (key: string) => queryParams.get(key) ?? hashParams?.get(key) ?? undefined;
  return {
    accessToken: tokenGet('access_token'),
    refreshToken: tokenGet('refresh_token'),
    error: tokenGet('error_description') ?? tokenGet('error'),
  };
};

export async function SessionUrlCreate(redirectUrl: string) {
  const { accessToken, refreshToken, error } = TokensUrlGet(redirectUrl);
  if (error) throw new Error(error);
  if (!accessToken) throw new Error('No access token in redirect');
  const { data, error: sessionError } = await SupabaseClientGet().auth.setSession({
    access_token: accessToken,
    refresh_token: refreshToken ?? '',
  });
  if (sessionError) throw sessionError;
  return data.session;
};

export function RedirectUriGet(options?: SupabaseAuthRedirectOptions): string {
  return makeRedirectUri({
    scheme: options?.scheme ?? process.env.EXPO_PUBLIC_APP_SCHEME,
    path: options?.path ?? 'auth/callback',
    preferLocalhost: false,
  });
};

export async function GoogleSignIn(options?: SupabaseAuthRedirectOptions): Promise<{ token: string; email?: string }> {
  const client = SupabaseClientGet();
  const redirectTo = RedirectUriGet(options);
  const { data, error: oauthError } = await client.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo, skipBrowserRedirect: true },
  });
  if (oauthError) throw oauthError;
  if (!data?.url) throw new Error('No OAuth URL');

  const response = await WebBrowser.openAuthSessionAsync(data.url, redirectTo);
  if (response.type !== 'success' || !response.url) throw new Error('OAuth cancelled or failed');

  const session = await SessionUrlCreate(response.url);
  if (!session?.access_token) throw new Error('No session after sign in');
  return {
    token: session.access_token,
    email: session.user?.email ?? undefined,
  };
};
