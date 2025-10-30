import { useState, useRef, useEffect } from 'react';
import { Modal, ModalBody, ModalFooter } from './Modal';

interface ComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenOrderModal: () => void;
}

const comparisons = [
  {
    name: 'Crutches',
    rows: [
      ['Hands Free', 'No', 'Yes'],
      ['Stairs', 'Difficult', 'Easy'],
      ['Learning Curve', 'Moderate', 'Minimal'],
      ['Upper Body Strain', 'High', 'None'],
      ['Indoor Use', 'Good', 'Excellent'],
      ['Outdoor Use', 'Limited', 'All terrain'],
    ],
  },
  {
    name: 'Knee Walker',
    rows: [
      ['Hands Free', 'Yes', 'Yes'],
      ['Stairs', 'Impossible', 'Easy'],
      ['Portability', 'Bulky', 'Compact'],
      ['Tight Spaces', 'Difficult', 'Easy'],
      ['Indoor Use', 'Good', 'Excellent'],
      ['Outdoor Use', 'Limited', 'All terrain'],
    ],
  },
  {
    name: 'iWalk',
    rows: [
      ['Hands Free', 'Yes', 'Yes'],
      ['Stairs', 'Moderate', 'Easy'],
      ['Knee Pressure', 'High', 'Low'],
      ['Balance Required', 'High', 'Moderate'],
      ['Weight Distribution', 'Knee only', 'Knee & shin'],
      ['Comfort', 'Can be painful', 'Comfortable'],
    ],
  },
];

export function ComparisonModal({ isOpen, onClose, onOpenOrderModal }: ComparisonModalProps) {
  const [currentTab, setCurrentTab] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e: TouchEvent) => {
      touchEndX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
      const swipeDistance = touchStartX.current - touchEndX.current;
      const minSwipeDistance = 50;

      if (Math.abs(swipeDistance) > minSwipeDistance) {
        if (swipeDistance > 0 && currentTab < comparisons.length - 1) {
          setCurrentTab(currentTab + 1);
        } else if (swipeDistance < 0 && currentTab > 0) {
          setCurrentTab(currentTab - 1);
        }
      }
    };

    container.addEventListener('touchstart', handleTouchStart);
    container.addEventListener('touchmove', handleTouchMove);
    container.addEventListener('touchend', handleTouchEnd);

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [currentTab]);

  const handleOrderClick = () => {
    onClose();
    onOpenOrderModal();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} progressStep="Compare">
      <ModalBody>
        <div className="flex gap-2 mb-5 border-b-2 border-[#e0e0e0]">
          {comparisons.map((comp, index) => (
            <button
              key={index}
              onClick={() => setCurrentTab(index)}
              className={`flex-1 px-2 py-3 bg-none border-none border-b-[3px] text-[0.9em] font-semibold cursor-pointer transition-all duration-250 ${
                currentTab === index
                  ? 'text-[#2e7d32] border-b-[#2e7d32]'
                  : 'text-[#666] border-b-transparent hover:text-[#2e7d32]'
              }`}
            >
              {comp.name}
            </button>
          ))}
        </div>
        <div className="relative overflow-hidden" ref={containerRef}>
          <div
            className="flex transition-transform duration-300"
            style={{ transform: `translateX(-${currentTab * 100}%)` }}
          >
            {comparisons.map((comp, index) => (
              <div key={index} className="min-w-full flex-shrink-0">
                <table className="w-full border-collapse mb-5">
                  <thead>
                    <tr>
                      <th className="p-3 text-left border-b border-[#e0e0e0] text-[0.9em] bg-[#f5f5f5] font-bold text-[#333]">
                        Feature
                      </th>
                      <th className="p-3 text-left border-b border-[#e0e0e0] text-[0.9em] bg-[#f5f5f5] font-bold text-[#333]">
                        {comp.name}
                      </th>
                      <th className="p-3 text-left border-b border-[#e0e0e0] text-[0.9em] bg-[#f5f5f5] font-bold text-[#333]">
                        Freedom Leg
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {comp.rows.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        <td className="p-3 text-left border-b border-[#e0e0e0] text-[0.9em] font-semibold">
                          {row[0]}
                        </td>
                        <td className="p-3 text-left border-b border-[#e0e0e0] text-[0.9em] text-[#666]">
                          {row[1]}
                        </td>
                        <td className="p-3 text-left border-b border-[#e0e0e0] text-[0.9em] text-[#2e7d32] font-semibold">
                          {row[2]}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center gap-2 my-5">
          {comparisons.map((_, index) => (
            <div
              key={index}
              onClick={() => setCurrentTab(index)}
              className={`h-2 rounded-full cursor-pointer transition-all duration-250 ${
                currentTab === index ? 'bg-[#2e7d32] w-6 rounded' : 'bg-[#ddd] w-2'
              }`}
            />
          ))}
        </div>
      </ModalBody>
      <ModalFooter>
        <button
          onClick={handleOrderClick}
          className="inline-block px-5 py-3 text-[0.85em] font-bold uppercase tracking-[0.08em] rounded-lg border-2 border-[#e0e0e0] cursor-pointer transition-all duration-250 bg-[rgba(255,255,255,0.98)] text-[#333] hover:bg-[rgba(46,125,50,0.95)] hover:text-white hover:border-[#2e7d32]"
        >
          Find my size
        </button>
      </ModalFooter>
    </Modal>
  );
}
