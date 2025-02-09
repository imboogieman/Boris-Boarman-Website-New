import React, { useState } from 'react';
import { FileText, Twitter, ArrowRight, ExternalLink } from 'lucide-react';
import { supabase } from './lib/supabase';

const PigNoseLogo = () => (
  <svg width="48" height="48" viewBox="0 0 32 32" className="text-[#ff6b6c]">
    {/* Background circle */}
    <circle cx="16" cy="16" r="15" fill="white" stroke="currentColor" strokeWidth="1.5" />
    {/* Main nose shape */}
    <ellipse cx="16" cy="16" rx="10" ry="8" fill="currentColor" />
    {/* Nostrils */}
    <circle cx="13" cy="16" r="2" fill="#FFF" />
    <circle cx="19" cy="16" r="2" fill="#FFF" />
  </svg>
);

function App() {
  const [email, setEmail] = useState('');
  const [twitter, setTwitter] = useState('');
  const [twitterError, setTwitterError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validateTwitterHandle = (handle: string) => {
    if (!handle) return '';
    if (!handle.startsWith('@')) {
      return 'Twitter handle must start with @';
    }
    if (!/^@[A-Za-z0-9_]{1,15}$/.test(handle)) {
      return 'Invalid Twitter handle format';
    }
    return '';
  };

  const handleTwitterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTwitter(value);
    setTwitterError(validateTwitterHandle(value));
  };

  const getTwitterUrl = (handle: string) => {
    if (!handle || handle === '@') return '';
    return `https://twitter.com/${handle.substring(1)}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (twitter && twitterError) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const { error } = await supabase
        .from('subscribers')
        .insert([
          {
            email,
            twitter_handle: twitter || null,
          },
        ]);

      if (error) throw error;

      setSubmitStatus('success');
      setEmail('');
      setTwitter('');
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-100 text-neutral-800">
      <div className="container mx-auto px-4 py-8">
        {/* Navigation */}
        <nav className="flex items-center mb-16">
          <div className="flex items-center space-x-3">
            <PigNoseLogo />
            <span className="text-2xl font-junicode font-extrabold tracking-wide text-[#ff6b6c]">Boris Boarman</span>
          </div>
          <div className="flex-1 flex justify-center space-x-4">
            <a 
              href="#whitepaper"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-4 py-2 rounded-lg border border-neutral-800 text-neutral-800 hover:bg-neutral-800 hover:text-white transition-colors"
            >
              <FileText className="w-4 h-4" />
              <span className="font-junicode tracking-wide">White Paper</span>
            </a>
          </div>
          <a 
            href="https://x.com/BorisBoarman"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 px-4 py-2 rounded-lg border border-neutral-800 text-neutral-800 hover:bg-neutral-800 hover:text-white transition-colors"
          >
            <Twitter className="w-4 h-4" />
            <span className="font-junicode tracking-wide">Follow</span>
          </a>
        </nav>

        {/* Hero Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mt-8">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="font-junicode text-[5.85rem] font-bold leading-none tracking-wide text-neutral-800 whitespace-nowrap">
                Fund What Matters
              </h1>
              <h2 className="font-junicode text-3xl font-semibold tracking-wide text-[#ff6b6c]">
                Merit & Data-Based Funding
              </h2>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-junicode text-2xl font-semibold tracking-wide text-neutral-800">What is Boris Boarman?</h3>
              <p className="text-neutral-600 text-lg leading-relaxed">
                Boris Boarman revolutionizes public good funding by leveraging artificial intelligence 
                to ensure transparent, efficient, and merit-based resource allocation. Our platform 
                transforms how we support initiatives that matter, making funding decisions smarter 
                and more impactful.
              </p>
            </div>
          </div>

          <div className="lg:ml-auto w-full max-w-md">
            <div className="bg-white rounded-2xl p-8 border border-neutral-200 shadow-lg">
              <h3 className="font-junicode text-xl font-semibold mb-6 tracking-wide text-neutral-800">Join the Waiting List</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-neutral-600 mb-2 tracking-wide">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 bg-white border border-neutral-300 rounded-lg focus:ring-2 focus:ring-[#ff6b6c] focus:border-transparent outline-none"
                    placeholder="you@example.com"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="twitter" className="block text-sm font-medium text-neutral-600 mb-2 tracking-wide">
                    Twitter Profile
                  </label>
                  <div className="relative">
                    <Twitter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#ff6b6c]" />
                    <input
                      type="text"
                      id="twitter"
                      value={twitter}
                      onChange={handleTwitterChange}
                      className={`w-full pl-12 pr-4 py-2 bg-white border rounded-lg focus:ring-2 focus:ring-[#ff6b6c] focus:border-transparent outline-none ${
                        twitterError ? 'border-red-500' : 'border-neutral-300'
                      }`}
                      placeholder="@username"
                    />
                    {twitter && !twitterError && (
                      <a
                        href={getTwitterUrl(twitter)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#ff6b6c] hover:text-[#ff5152] transition-colors"
                        title="Verify Twitter Profile"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                  {twitterError && (
                    <p className="mt-1 text-sm text-red-500">{twitterError}</p>
                  )}
                </div>

                {submitStatus === 'success' && (
                  <div className="p-3 bg-green-50 text-green-700 rounded-lg">
                    Thank you for subscribing! We'll keep you updated.
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="p-3 bg-red-50 text-red-700 rounded-lg">
                    There was an error submitting your information. Please try again.
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full flex items-center justify-center space-x-2 bg-[#ff6b6c] hover:bg-[#ff5152] text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!!twitterError && !!twitter || isSubmitting}
                >
                  <span className="font-junicode tracking-wide">
                    {isSubmitting ? 'Subscribing...' : 'Subscribe for Updates'}
                  </span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;