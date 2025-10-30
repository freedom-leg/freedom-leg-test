import { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { AnnouncementBanner } from '../components/AnnouncementBanner';
import { Hero } from '../components/Hero';
import { CTASection } from '../components/CTASection';
import { ReviewSection } from '../components/ReviewSection';
import { StickyFooter } from '../components/StickyFooter';
import { QuizModal } from '../components/modals/QuizModal';
import { VideoModal } from '../components/modals/VideoModal';
import { ComparisonModal } from '../components/modals/ComparisonModal';
import { HowItWorksModal } from '../components/modals/HowItWorksModal';
import { QuickAnswersModal } from '../components/modals/QuickAnswersModal';
import { OrderModal } from '../components/modals/OrderModal';
import { trackPageVisit, trackInteraction, trackConversion } from '../lib/analytics';

export function ModalVersion() {
  const [quizModalOpen, setQuizModalOpen] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [comparisonModalOpen, setComparisonModalOpen] = useState(false);
  const [howItWorksModalOpen, setHowItWorksModalOpen] = useState(false);
  const [quickAnswersModalOpen, setQuickAnswersModalOpen] = useState(false);
  const [orderModalOpen, setOrderModalOpen] = useState(false);

  useEffect(() => {
    trackPageVisit('modal');
  }, []);

  const handleOpenQuiz = () => {
    trackInteraction('modal', 'button_click', 'quiz_button');
    setQuizModalOpen(true);
  };

  const handleOpenVideo = () => {
    trackInteraction('modal', 'button_click', 'video_button');
    setVideoModalOpen(true);
  };

  const handleOpenComparison = () => {
    trackInteraction('modal', 'button_click', 'comparison_button');
    setComparisonModalOpen(true);
  };

  const handleOpenHowItWorks = () => {
    trackInteraction('modal', 'button_click', 'how_it_works_button');
    setHowItWorksModalOpen(true);
  };

  const handleOpenQuickAnswers = () => {
    trackInteraction('modal', 'button_click', 'quick_answers_button');
    setQuickAnswersModalOpen(true);
  };

  const handleOpenOrderModal = () => {
    trackInteraction('modal', 'button_click', 'find_my_size_button');
    setOrderModalOpen(true);
  };

  const handleCloseQuiz = () => {
    trackInteraction('modal', 'modal_close', 'quiz_modal');
    setQuizModalOpen(false);
  };

  const handleCloseVideo = () => {
    trackInteraction('modal', 'modal_close', 'video_modal');
    setVideoModalOpen(false);
  };

  const handleCloseComparison = () => {
    trackInteraction('modal', 'modal_close', 'comparison_modal');
    setComparisonModalOpen(false);
  };

  const handleCloseHowItWorks = () => {
    trackInteraction('modal', 'modal_close', 'how_it_works_modal');
    setHowItWorksModalOpen(false);
  };

  const handleCloseQuickAnswers = () => {
    trackInteraction('modal', 'modal_close', 'quick_answers_modal');
    setQuickAnswersModalOpen(false);
  };

  const handleCloseOrderModal = () => {
    trackInteraction('modal', 'modal_close', 'order_modal');
    setOrderModalOpen(false);
  };

  return (
    <div className="min-h-screen">
      <Header />
      <AnnouncementBanner />
      <Hero />
      <CTASection
        onOpenQuiz={handleOpenQuiz}
        onOpenComparison={handleOpenComparison}
        onOpenVideo={handleOpenVideo}
        onOpenHowItWorks={handleOpenHowItWorks}
      />
      <ReviewSection />
      <StickyFooter
        onOpenQuickAnswers={handleOpenQuickAnswers}
        onOpenOrderModal={handleOpenOrderModal}
      />
      <QuizModal
        isOpen={quizModalOpen}
        onClose={handleCloseQuiz}
        onOpenOrderModal={handleOpenOrderModal}
      />
      <VideoModal
        isOpen={videoModalOpen}
        onClose={handleCloseVideo}
        onOpenOrderModal={handleOpenOrderModal}
      />
      <ComparisonModal
        isOpen={comparisonModalOpen}
        onClose={handleCloseComparison}
        onOpenOrderModal={handleOpenOrderModal}
      />
      <HowItWorksModal isOpen={howItWorksModalOpen} onClose={handleCloseHowItWorks} />
      <QuickAnswersModal
        isOpen={quickAnswersModalOpen}
        onClose={handleCloseQuickAnswers}
        onOpenOrderModal={handleOpenOrderModal}
      />
      <OrderModal isOpen={orderModalOpen} onClose={handleCloseOrderModal} />
    </div>
  );
}
