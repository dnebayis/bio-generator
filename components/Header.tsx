
import React from 'react';
import { FarcasterUser } from '../types';

interface HeaderProps {
  user: FarcasterUser | null;
}

export const Header: React.FC<HeaderProps> = ({ user }) => {
  return (
    <header className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
      <div className="text-center sm:text-left">
        <h1 className="text-3xl font-bold text-farcaster-purple">Bio Generator</h1>
        <p className="text-brand-text-secondary">for Farcaster</p>
      </div>
      {user && (
        <div className="flex items-center space-x-3 bg-brand-surface p-2 rounded-full border border-brand-outline">
          <img src={user.pfpUrl} alt={user.displayName} className="w-10 h-10 rounded-full" />
          <span className="font-semibold pr-3">{user.displayName}</span>
        </div>
      )}
    </header>
  );
};