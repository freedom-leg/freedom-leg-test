import { useState } from 'react';

interface QuizSectionProps {
  onComplete?: () => void;
}

export function QuizSection({ onComplete }: QuizSectionProps) {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResult, setShowResult] = useState(false);
  const [resultType, setResultType] = useState<'success' | 'warning'>('success');

  const selectAnswer = (question: string, answer: string) => {
    setAnswers({ ...answers, [question]: answer });

    if (question === 'q1') {
      setCurrentQuestion(2);
    } else if (question === 'q2') {
      if (answer === 'needs-assist') {
        showWarning('balance');
      } else {
        setCurrentQuestion(3);
      }
    } else if (question === 'q3') {
      if (answer === 'cannot-bend') {
        showWarning('knee-bend');
      } else {
        setCurrentQuestion(4);
      }
    } else if (question === 'q4') {
      showSuccess(answer);
      onComplete?.();
    }
  };

  const showWarning = (type: 'balance' | 'knee-bend') => {
    setResultType('warning');
    setShowResult(true);
  };

  const showSuccess = (priority: string) => {
    setResultType('success');
    setShowResult(true);
  };

  const getResultContent = () => {
    if (resultType === 'warning') {
      if (answers.q2 === 'needs-assist') {
        return {
          title: '⚕️ Please consult your doctor',
          message:
            'The Freedom Leg requires good balance and core strength. Since you mentioned using a walker or cane before your injury, we strongly recommend consulting with your doctor or physical therapist before ordering.',
          image: '',
        };
      } else {
        return {
          title: '⚕️ Please consult your doctor',
          message:
            'The Freedom Leg requires you to bend your knee at least 20 degrees to properly secure the brace and distribute weight safely. Please consult with your doctor or physical therapist to ensure your knee mobility is sufficient.',
          image: '',
        };
      }
    } else {
      const messages: Record<string, { text: string; image: string }> = {
        hands: {
          text: 'The Freedom Leg keeps both hands completely free - perfect for carrying items, using your phone, or holding onto railings for extra stability.',
          image: 'https://cdn.shopify.com/s/files/1/0425/6173/2773/files/use-freedom-leg-brace.jpg',
        },
        stairs: {
          text: 'You can safely navigate stairs with the Freedom Leg! The knee pad provides stability and you can use railings with both hands free.',
          image: 'https://cdn.shopify.com/s/files/1/0425/6173/2773/files/fit_the_Freedom_Leg_3.png',
        },
        active: {
          text: 'Stay as active as you want! Walk, do chores, go to work - the Freedom Leg gives you the independence to keep living your normal life.',
          image: 'https://cdn.shopify.com/s/files/1/0425/6173/2773/files/Walking_in_Kitchen.png',
        },
        outdoor: {
          text: 'Freedom Leg works great on all terrain - grass, gravel, uneven surfaces. Take it anywhere you need to go!',
          image: 'https://cdn.shopify.com/s/files/1/0425/6173/2773/files/Customer_review_photo_Lee_Partyka.jpg',
        },
      };

      const result = messages[answers.q4] || messages.hands;
      return {
        title: '✅ Great fit!',
        message: result.text,
        image: result.image,
      };
    }
  };

  return (
    <section className="py-12 px-4 bg-white" id="quiz">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 text-[#333]">Will This Work For Me?</h2>

        {currentQuestion === 1 && !showResult && (
          <div className="mb-8">
            <h3 className="text-2xl mb-6 text-[#333]">What describes your situation?</h3>
            <div className="flex flex-col gap-4">
              <button
                onClick={() => selectAnswer('q1', 'foot')}
                className="bg-[#f5f5f5] border-2 border-[#ddd] p-5 rounded-lg cursor-pointer transition-all duration-250 text-lg text-left hover:bg-[#e8f5e9] hover:border-[#2e7d32] hover:-translate-y-0.5"
              >
                Foot or ankle surgery/injury
              </button>
              <button
                onClick={() => selectAnswer('q1', 'lower-leg')}
                className="bg-[#f5f5f5] border-2 border-[#ddd] p-5 rounded-lg cursor-pointer transition-all duration-250 text-lg text-left hover:bg-[#e8f5e9] hover:border-[#2e7d32] hover:-translate-y-0.5"
              >
                Lower leg surgery/injury
              </button>
              <button
                onClick={() => selectAnswer('q1', 'knee')}
                className="bg-[#f5f5f5] border-2 border-[#ddd] p-5 rounded-lg cursor-pointer transition-all duration-250 text-lg text-left hover:bg-[#e8f5e9] hover:border-[#2e7d32] hover:-translate-y-0.5"
              >
                Knee surgery (non-weight-bearing)
              </button>
              <button
                onClick={() => selectAnswer('q1', 'other')}
                className="bg-[#f5f5f5] border-2 border-[#ddd] p-5 rounded-lg cursor-pointer transition-all duration-250 text-lg text-left hover:bg-[#e8f5e9] hover:border-[#2e7d32] hover:-translate-y-0.5"
              >
                Other lower extremity injury
              </button>
            </div>
          </div>
        )}

        {currentQuestion === 2 && !showResult && (
          <div className="mb-8">
            <h3 className="text-2xl mb-6 text-[#333]">
              Before your injury, did you need a walker or cane to get around?
            </h3>
            <div className="flex flex-col gap-4">
              <button
                onClick={() => selectAnswer('q2', 'good-balance')}
                className="bg-[#f5f5f5] border-2 border-[#ddd] p-5 rounded-lg cursor-pointer transition-all duration-250 text-lg text-left hover:bg-[#e8f5e9] hover:border-[#2e7d32] hover:-translate-y-0.5"
              >
                No, I had good balance
              </button>
              <button
                onClick={() => selectAnswer('q2', 'needs-assist')}
                className="bg-[#f5f5f5] border-2 border-[#ddd] p-5 rounded-lg cursor-pointer transition-all duration-250 text-lg text-left hover:bg-[#e8f5e9] hover:border-[#2e7d32] hover:-translate-y-0.5"
              >
                Yes, I used a walker or cane
              </button>
            </div>
          </div>
        )}

        {currentQuestion === 3 && !showResult && (
          <div className="mb-8">
            <h3 className="text-2xl mb-6 text-[#333]">
              Can you bend your knee 20 degrees and tolerate moderate pressure on your shin?
            </h3>
            <div className="flex flex-col gap-4">
              <button
                onClick={() => selectAnswer('q3', 'can-bend')}
                className="bg-[#f5f5f5] border-2 border-[#ddd] p-5 rounded-lg cursor-pointer transition-all duration-250 text-lg text-left hover:bg-[#e8f5e9] hover:border-[#2e7d32] hover:-translate-y-0.5"
              >
                Yes, I can bend my knee comfortably
              </button>
              <button
                onClick={() => selectAnswer('q3', 'cannot-bend')}
                className="bg-[#f5f5f5] border-2 border-[#ddd] p-5 rounded-lg cursor-pointer transition-all duration-250 text-lg text-left hover:bg-[#e8f5e9] hover:border-[#2e7d32] hover:-translate-y-0.5"
              >
                No, I have limited knee mobility
              </button>
            </div>
          </div>
        )}

        {currentQuestion === 4 && !showResult && (
          <div className="mb-8">
            <h3 className="text-2xl mb-6 text-[#333]">What matters most to you?</h3>
            <div className="flex flex-col gap-4">
              <button
                onClick={() => selectAnswer('q4', 'hands')}
                className="bg-[#f5f5f5] border-2 border-[#ddd] p-5 rounded-lg cursor-pointer transition-all duration-250 text-lg text-left hover:bg-[#e8f5e9] hover:border-[#2e7d32] hover:-translate-y-0.5"
              >
                Keeping my hands free
              </button>
              <button
                onClick={() => selectAnswer('q4', 'stairs')}
                className="bg-[#f5f5f5] border-2 border-[#ddd] p-5 rounded-lg cursor-pointer transition-all duration-250 text-lg text-left hover:bg-[#e8f5e9] hover:border-[#2e7d32] hover:-translate-y-0.5"
              >
                Being able to use stairs
              </button>
              <button
                onClick={() => selectAnswer('q4', 'active')}
                className="bg-[#f5f5f5] border-2 border-[#ddd] p-5 rounded-lg cursor-pointer transition-all duration-250 text-lg text-left hover:bg-[#e8f5e9] hover:border-[#2e7d32] hover:-translate-y-0.5"
              >
                Staying active/independent
              </button>
              <button
                onClick={() => selectAnswer('q4', 'outdoor')}
                className="bg-[#f5f5f5] border-2 border-[#ddd] p-5 rounded-lg cursor-pointer transition-all duration-250 text-lg text-left hover:bg-[#e8f5e9] hover:border-[#2e7d32] hover:-translate-y-0.5"
              >
                Going outdoors safely
              </button>
            </div>
          </div>
        )}

        {showResult && (
          <div className="text-center p-8 bg-white rounded-lg border-2 border-[#e0e0e0]">
            <h3
              className={`text-3xl mb-6 ${
                resultType === 'warning' ? 'text-[#ff9800]' : 'text-[#2e7d32]'
              }`}
            >
              {getResultContent().title}
            </h3>
            {getResultContent().image && (
              <img
                src={getResultContent().image}
                alt="Freedom Leg"
                className="w-full max-w-md h-auto rounded-lg mb-6 mx-auto shadow-lg"
              />
            )}
            <p className="text-xl leading-relaxed mb-8 text-[#333]">{getResultContent().message}</p>
          </div>
        )}
      </div>
    </section>
  );
}
