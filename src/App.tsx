import { useState, useEffect } from 'react';
import { ModalVersion } from './pages/ModalVersion';
import { InlineVersion } from './pages/InlineVersion';

function App() {
  const [variant, setVariant] = useState<'modal' | 'inline'>('modal');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let assignedVariant = localStorage.getItem('fl-ab-variant') as 'modal' | 'inline' | null;

    if (!assignedVariant) {
      const urlParams = new URLSearchParams(window.location.search);
      const forceVariant = urlParams.get('variant');

      if (forceVariant === 'modal' || forceVariant === 'inline') {
        assignedVariant = forceVariant;
      } else {
        assignedVariant = Math.random() < 0.5 ? 'modal' : 'inline';
      }

      localStorage.setItem('fl-ab-variant', assignedVariant);
    }

    setVariant(assignedVariant);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-xl text-[#333]">Loading...</div>
      </div>
    );
  }

  return variant === 'modal' ? <ModalVersion /> : <InlineVersion />;
}

export default App;
