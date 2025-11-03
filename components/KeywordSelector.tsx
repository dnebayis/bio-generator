
import React from 'react';

const KEYWORDS = ["Funny", "Professional", "Witty", "Techie", "Artist", "Degen", "Mysterious", "Minimalist", "Maximalist"];

interface KeywordSelectorProps {
  selectedKeywords: string[];
  onKeywordToggle: (keyword: string) => void;
}

export const KeywordSelector: React.FC<KeywordSelectorProps> = ({ selectedKeywords, onKeywordToggle }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {KEYWORDS.map(keyword => {
        const isSelected = selectedKeywords.includes(keyword);
        return (
          <button
            key={keyword}
            onClick={() => onKeywordToggle(keyword)}
            className={`py-3 px-4 rounded-lg font-semibold text-center transition-all duration-200 ease-in-out border-2 ${
              isSelected
                ? 'bg-farcaster-purple border-farcaster-purple-light text-white'
                : 'bg-brand-bg border-brand-outline hover:border-farcaster-purple text-brand-text-primary'
            }`}
          >
            {keyword}
          </button>
        );
      })}
    </div>
  );
};