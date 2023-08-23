'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function LogoutButton() {
  const supabase = createClientComponentClient();
  const logOut = () => {
    supabase.auth.signOut();
  };
  return (
    <button
      type="button"
      className="rounded-md bg-btn-background px-4 py-2 no-underline hover:bg-btn-background-hover"
      onClick={logOut}
    >
      Logout
    </button>
  );
}
