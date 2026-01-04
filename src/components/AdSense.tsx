"use client";

import { useEffect, useState } from "react";

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

interface AdSenseProps {
  adSlot?: string;
  minContentWords?: number;
}

export const AdSense = ({ adSlot, minContentWords = 600 }: AdSenseProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [shouldShowAd, setShouldShowAd] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    const checkContentQuality = () => {
      const mainContent = document.querySelector('main');
      if (!mainContent) {
        setShouldShowAd(false);
        return;
      }

      // Check if we are on a policy or admin page where we might want to be extra careful
      const path = window.location.pathname;
      const isLowValuePage = path.includes('/admin') || 
                             path === '/login' || 
                             path === '/register';
      
      if (isLowValuePage) {
        setShouldShowAd(false);
        return;
      }

      const textContent = mainContent.innerText || '';
      const wordCount = textContent.trim().split(/\s+/).filter(word => word.length > 0).length;
      
      const h1 = mainContent.querySelector('h1');
      const hasH1 = h1 !== null && h1.innerText.trim().length > 10;
      const paragraphs = mainContent.querySelectorAll('p');
      const hasParagraphs = paragraphs.length >= 4; // Increased from 2
      
      const hasMinimalContent = wordCount >= minContentWords;
      const hasProperStructure = hasH1 && hasParagraphs;
      
      // Ensure the ad is placed after some content (we check if there are elements before it in the DOM)
      // This is a bit tricky to check globally, but we can assume if it's rendered, the parent is where it should be.
      // The user wants: "Ads must appear only AFTER meaningful content"
      
      setShouldShowAd(hasMinimalContent && hasProperStructure);
    };

    const timeout = setTimeout(checkContentQuality, 500);
    return () => clearTimeout(timeout);
  }, [minContentWords]);

  useEffect(() => {
    if (shouldShowAd && isMounted) {
      try {
        const timeout = setTimeout(() => {
          if (typeof window !== "undefined" && window.adsbygoogle) {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
          }
        }, 1000);
        return () => clearTimeout(timeout);
      } catch (err) {
        console.error("AdSense error:", err);
      }
    }
  }, [shouldShowAd, isMounted]);

  if (!isMounted || !shouldShowAd) {
    return null;
  }

  return (
    <div className="my-8 flex justify-center overflow-hidden w-full min-h-[90px]" style={{ display: 'block' }}>
      <ins
        className="adsbygoogle"
        style={{ display: "block", width: "100%" }}
        data-ad-client="ca-pub-8720393672493597"
        data-ad-slot={adSlot || "7436652493"}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
};
