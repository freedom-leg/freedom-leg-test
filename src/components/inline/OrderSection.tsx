import { useState, useEffect } from 'react';

const variantMap: Record<string, string> = {
  'Small-Standard': '34867137085605',
  'Small-Long': '34867137151141',
  'Regular-Standard': '34867137216677',
  'Regular-Long': '34867137249445',
  'Tall-Standard': '34867137314981',
  'Tall-Long': '34867137347749',
};

export function OrderSection() {
  const [measurementA, setMeasurementA] = useState('');
  const [measurementB, setMeasurementB] = useState('');
  const [braceSize, setBraceSize] = useState('');
  const [strapSize, setStrapSize] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    const savedA = localStorage.getItem('fl-measurement-a');
    const savedB = localStorage.getItem('fl-measurement-b');
    if (savedA) setMeasurementA(savedA);
    if (savedB) setMeasurementB(savedB);
    if (savedA && savedB) {
      calculateSize(parseFloat(savedA), parseFloat(savedB));
    }
  }, []);

  const calculateSize = (inputA: number, inputB: number) => {
    if (!inputA || !inputB) {
      setShowResult(false);
      setShowWarning(false);
      return;
    }

    localStorage.setItem('fl-measurement-a', inputA.toString());
    localStorage.setItem('fl-measurement-b', inputB.toString());

    if (inputA < 16 || inputA > 24 || inputB < 14 || inputB > 29) {
      setShowResult(false);
      setShowWarning(true);
      return;
    }

    setShowWarning(false);

    let brace: string;
    if (inputA >= 16 && inputA <= 18.5) {
      brace = 'Small';
    } else if (inputA > 18.5 && inputA <= 21) {
      brace = 'Regular';
    } else {
      brace = 'Tall';
    }

    let strap: string;
    if (inputB >= 14 && inputB <= 21) {
      strap = 'Standard';
    } else {
      strap = 'Long';
    }

    setBraceSize(brace);
    setStrapSize(strap);
    localStorage.setItem('fl-brace-size', brace);
    localStorage.setItem('fl-strap-size', strap);
    setShowResult(true);
  };

  const handleInputChange = (field: 'A' | 'B', value: string) => {
    const numValue = parseFloat(value);

    if (field === 'A') {
      setMeasurementA(value);
      if (measurementB) {
        calculateSize(numValue, parseFloat(measurementB));
      }
    } else {
      setMeasurementB(value);
      if (measurementA) {
        calculateSize(parseFloat(measurementA), numValue);
      }
    }
  };

  const proceedToOrder = () => {
    const sizeKey = `${braceSize}-${strapSize}`;
    const variantId = variantMap[sizeKey];

    if (variantId) {
      window.location.href = `https://freedom-leg-brace.myshopify.com/cart/${variantId}:1`;
    }
  };

  return (
    <section className="py-12 px-4 bg-[#f5f5f5]" id="order">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4 text-[#333]">Find Your Perfect Fit</h2>
        <p className="text-lg text-center text-[#666] mb-8">
          Take two quick measurements to get your size
        </p>

        <div className="bg-white rounded-lg p-6 lg:p-8 shadow-lg border-2 border-[#e0e0e0]">
          <div className="space-y-6 mb-8">
            <div className="space-y-3">
              <label className="font-semibold text-lg text-[#333] flex items-center gap-2">
                📏 Measurement A
              </label>
              <p className="text-base text-[#666] leading-relaxed ml-8">
                From floor to top of kneecap
              </p>
              <div className="flex gap-3 items-center">
                <input
                  type="number"
                  value={measurementA}
                  onChange={(e) => handleInputChange('A', e.target.value)}
                  placeholder="Enter inches"
                  className="flex-1 p-4 border-2 border-[#ddd] rounded-lg text-xl font-semibold transition-all duration-250 focus:outline-none focus:border-[#2e7d32] focus:shadow-[0_0_0_3px_rgba(46,125,50,0.1)]"
                />
                <span className="text-lg text-[#666] font-semibold">inches</span>
              </div>
            </div>

            <div className="space-y-3">
              <label className="font-semibold text-lg text-[#333] flex items-center gap-2">
                📏 Measurement B
              </label>
              <p className="text-base text-[#666] leading-relaxed ml-8">
                Mid-thigh circumference
              </p>
              <div className="flex gap-3 items-center">
                <input
                  type="number"
                  value={measurementB}
                  onChange={(e) => handleInputChange('B', e.target.value)}
                  placeholder="Enter inches"
                  className="flex-1 p-4 border-2 border-[#ddd] rounded-lg text-xl font-semibold transition-all duration-250 focus:outline-none focus:border-[#2e7d32] focus:shadow-[0_0_0_3px_rgba(46,125,50,0.1)]"
                />
                <span className="text-lg text-[#666] font-semibold">inches</span>
              </div>
            </div>
          </div>

          {showResult && (
            <div className="bg-[rgba(46,125,50,0.1)] border-2 border-[#2e7d32] rounded-lg p-6 text-center mb-6">
              <h3 className="text-[#2e7d32] text-2xl mb-3">Your Size</h3>
              <div className="text-3xl font-bold text-[#2e7d32] mb-2">
                {braceSize} Brace / {strapSize} Strap
              </div>
              <p className="text-base text-[#666]">
                Measurement A: {measurementA}" | Measurement B: {measurementB}"
              </p>
            </div>
          )}

          {showWarning && (
            <div className="bg-[#fff7ed] border-2 border-[#ff9800] rounded-lg p-6 text-center mb-6">
              <h3 className="text-[#ff9800] text-2xl mb-4">📞 Please Call for Sizing Help</h3>
              <p className="text-base text-[#333] leading-relaxed mb-3">
                Your measurements fall outside our standard range. Our team can help find the right
                solution for you.
              </p>
              <div className="text-2xl font-bold text-[#ff9800] my-4">(888) 816-8127</div>
              <p className="text-base text-[#333]">Mon-Fri, 9am-5pm EST</p>
            </div>
          )}

          <button
            onClick={proceedToOrder}
            disabled={!showResult}
            className="w-full px-8 py-4 text-lg font-bold uppercase tracking-wider rounded-lg border-2 border-[#e0e0e0] cursor-pointer transition-all duration-250 bg-[rgba(255,255,255,0.98)] text-[#333] hover:bg-[rgba(46,125,50,0.95)] hover:text-white hover:border-[#2e7d32] hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[rgba(255,255,255,0.98)] disabled:hover:text-[#333] disabled:hover:border-[#e0e0e0] disabled:hover:translate-y-0 disabled:hover:shadow-none"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </section>
  );
}
