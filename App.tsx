
import React, { useState, useCallback } from 'react';
import { useFarcasterIdentity } from './hooks/useFarcasterIdentity';
import { generateBios } from './services/geminiService';
import { Header } from './components/Header';
import { KeywordSelector } from './components/KeywordSelector';
import { BioCard } from './components/BioCard';
import { LoadingSpinner } from './components/LoadingSpinner';

const App: React.FC = () => {
  const { user, loading: userLoading, error: userError } = useFarcasterIdentity();
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [generatedBios, setGeneratedBios] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleKeywordToggle = (keyword: string) => {
    setSelectedKeywords(prev =>
      prev.includes(keyword)
        ? prev.filter(k => k !== keyword)
        : [...prev, keyword]
    );
  };

  const handleGenerateBios = useCallback(async () => {
    if (!user?.displayName || selectedKeywords.length === 0) {
      setError("Please select at least one keyword to continue.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedBios([]);

    try {
      const bios = await generateBios(user.displayName, selectedKeywords);
      setGeneratedBios(bios);
    } catch (err) {
      console.error(err);
      setError("An error occurred while generating bios. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [user, selectedKeywords]);

  const renderContent = () => {
    if (userLoading) {
      return (
        <div className="flex flex-col items-center justify-center text-center p-8 h-64">
          <LoadingSpinner />
          <p className="mt-4 text-brand-text-secondary">Loading your Farcaster profile...</p>
        </div>
      );
    }

    if (userError) {
      return (
        <div className="text-center p-8 bg-red-900/20 border border-red-500/50 rounded-lg">
          <h3 className="text-xl font-bold text-red-400">Error</h3>
          <p className="mt-2 text-red-300">{userError}</p>
        </div>
      );
    }

    if (user) {
      return (
        <>
          <KeywordSelector selectedKeywords={selectedKeywords} onKeywordToggle={handleKeywordToggle} />
          <button
            onClick={handleGenerateBios}
            disabled={isLoading || selectedKeywords.length === 0}
            className="w-full mt-8 py-4 px-6 bg-farcaster-purple hover:bg-farcaster-purple-light disabled:bg-brand-outline disabled:text-brand-text-secondary disabled:cursor-not-allowed text-white font-bold rounded-xl text-lg transition-all duration-300 ease-in-out shadow-lg shadow-farcaster-purple/20 focus:outline-none focus:ring-2 focus:ring-farcaster-purple-light focus:ring-offset-2 focus:ring-offset-brand-bg"
          >
            {isLoading ? 'Generating...' : '✨ Generate Bios'}
          </button>
        </>
      );
    }
    
    return null;
  };

  return (
    <div className="min-h-screen bg-brand-bg font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-2xl mx-auto">
        <Header user={user} />
        <main className="mt-8 bg-brand-surface border border-brand-outline rounded-2xl p-6 shadow-2xl shadow-black/20">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-brand-text-primary">Craft Your New Bio</h2>
            <p className="mt-2 text-brand-text-secondary">Select a few styles to reflect the perfect vibe for your profile.</p>
          </div>
          <div className="mt-8">
            {renderContent()}
          </div>
        </main>

        {error && (
          <div className="mt-6 text-center p-4 bg-red-900/20 text-red-300 border border-red-500/50 rounded-lg">
            {error}
          </div>
        )}

        {isLoading && (
            <div className="mt-8 flex flex-col items-center justify-center text-center p-8">
                <LoadingSpinner />
                <p className="mt-4 text-brand-text-secondary">AI is working its magic...</p>
            </div>
        )}

        {!isLoading && generatedBios.length > 0 && (
          <div className="mt-8 space-y-4">
             <h3 className="text-xl font-bold text-center text-brand-text-primary">Here are your suggestions:</h3>
            {generatedBios.map((bio, index) => (
              <BioCard key={index} bio={bio} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
