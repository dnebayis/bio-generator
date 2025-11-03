
import { useState, useEffect } from 'react';
import { FarcasterUser } from '../types';

export const useFarcasterIdentity = () => {
  const [user, setUser] = useState<FarcasterUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      // The Farcaster SDK is loaded from a script tag and attaches to the window object
      if (!window.farcaster || !window.farcaster.getFarcasterUser) {
        setError("Farcaster SDK not found. Please run this app inside a Farcaster client like Warpcast.");
        setLoading(false);
        return;
      }

      try {
        const userData = await window.farcaster.getFarcasterUser();
        if (userData && userData.fid) {
          setUser({
            fid: userData.fid,
            username: userData.username,
            displayName: userData.displayName,
            pfpUrl: userData.pfp_url,
          });
        } else {
           throw new Error("Could not retrieve Farcaster user data.");
        }
      } catch (err) {
        console.error("Error fetching Farcaster user:", err);
        setError("Could not access your Farcaster profile. Please ensure the app has the necessary permissions.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, loading, error };
};