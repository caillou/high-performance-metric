'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export const getURL = () => {
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
    process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
    'http://localhost:3000/';

  // Make sure to include https:// when not localhost.
  url = url.includes('http') ? url : `https://${url}`;
  // Make sure to including trailing /.
  url = url.charAt(url.length - 1) === '/' ? url : `${url}/`;
  return url;
};

export default function LoginButton() {
  const supabase = createClientComponentClient();

  const signIn = () => {
    supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${getURL()}auth/callback`,
      },
    });
  };

  return (
    <button
      type="button"
      className="rounded-md bg-btn-background px-4 py-2 no-underline hover:bg-btn-background-hover"
      onClick={signIn}
    >
      Login
    </button>
  );
}
