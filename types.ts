
export interface FarcasterUser {
  fid: number;
  username: string;
  displayName: string;
  pfpUrl: string;
}

// Extend the Window interface to include the Farcaster SDK
declare global {
  interface Window {
    farcaster: {
      getFarcasterUser: () => Promise<{
        fid: number;
        username: string;
        displayName: string;
        pfp_url: string; // The SDK uses snake_case
      }>;
    };
  }
}
