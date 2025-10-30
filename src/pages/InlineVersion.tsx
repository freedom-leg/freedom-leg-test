import { useEffect } from 'react';
import { Header } from '../components/Header';
import { AnnouncementBanner } from '../components/AnnouncementBanner';
import { Hero } from '../components/Hero';
import { ReviewSection } from '../components/ReviewSection';
import { QuizSection } from '../components/inline/QuizSection';
import { VideoSection } from '../components/inline/VideoSection';
import { ComparisonSection } from '../components/inline/ComparisonSection';
import { HowItWorksSection } from '../components/inline/HowItWorksSection';
import { FAQSection } from '../components/inline/FAQSection';
import { OrderSection } from '../components/inline/OrderSection';
import { trackPageVisit, trackConversion } from '../lib/analytics';

export function InlineVersion() {
  useEffect(() => {
    trackPageVisit('inline');
  }, []);

  const handleQuizComplete = () => {
    trackConversion('inline', 'quiz_complete');
  };

  return (
    <div className="min-h-screen">
      <Header />
      <AnnouncementBanner />
      <Hero />
      <ReviewSection />
      <QuizSection onComplete={handleQuizComplete} />
      <VideoSection />
      <HowItWorksSection />
      <ComparisonSection />
      <FAQSection />
      <OrderSection />
    </div>
  );
}
