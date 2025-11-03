import React, { useState } from 'react';
import { CopyIcon, CheckIcon, ShareIcon } from './icons';

interface BioCardProps {
  bio: string;
}

export const BioCard: React.FC<BioCardProps> = ({ bio }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(bio);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    const encodedBio = encodeURIComponent(bio);
    const warpcastUrl = `https://warpcast.com/~/compose?text=${encodedBio}`;
    // This will open the link in a new tab, which Farcaster clients
    // like Warpcast will handle to open their native composer.
    window.open(warpcastUrl, '_blank');
  };


  return (
    <div className="bg-brand-surface border border-brand-outline rounded-xl p-4 flex items-center justify-between space-x-4 animate-fade-in">
      <p className="text-brand-text-primary flex-1">{bio}</p>
      <div className="flex items-center space-x-2 flex-shrink-0">
        <button
          onClick={handleCopy}
          className="p-2 rounded-full bg-brand-bg hover:bg-farcaster-purple transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-farcaster-purple-light"
          aria-label="Copy bio"
        >
          {copied ? (
            <CheckIcon className="w-5 h-5 text-green-400" />
          ) : (
            <CopyIcon className="w-5 h-5 text-brand-text-secondary" />
          )}
        </button>
        <button
          onClick={handleShare}
          className="p-2 rounded-full bg-brand-bg hover:bg-farcaster-purple transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-farcaster-purple-light"
          aria-label="Share on Farcaster"
        >
          <ShareIcon className="w-5 h-5 text-brand-text-secondary" />
        </button>
      </div>
    </div>
  );
};