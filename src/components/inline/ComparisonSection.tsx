import { useState } from 'react';

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

export function ComparisonSection() {
  const [currentTab, setCurrentTab] = useState(0);

  return (
    <section className="py-12 px-4 bg-white" id="comparison">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 text-[#333]">Compare Alternatives</h2>

        <div className="flex gap-2 mb-8 border-b-2 border-[#e0e0e0]">
          {comparisons.map((comp, index) => (
            <button
              key={index}
              onClick={() => setCurrentTab(index)}
              className={`flex-1 px-4 py-4 bg-none border-none border-b-[3px] text-base lg:text-lg font-semibold cursor-pointer transition-all duration-250 ${
                currentTab === index
                  ? 'text-[#2e7d32] border-b-[#2e7d32]'
                  : 'text-[#666] border-b-transparent hover:text-[#2e7d32]'
              }`}
            >
              {comp.name}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse mb-8">
            <thead>
              <tr>
                <th className="p-4 text-left border-b border-[#e0e0e0] text-base lg:text-lg bg-[#f5f5f5] font-bold text-[#333]">
                  Feature
                </th>
                <th className="p-4 text-left border-b border-[#e0e0e0] text-base lg:text-lg bg-[#f5f5f5] font-bold text-[#333]">
                  {comparisons[currentTab].name}
                </th>
                <th className="p-4 text-left border-b border-[#e0e0e0] text-base lg:text-lg bg-[#f5f5f5] font-bold text-[#333]">
                  Freedom Leg
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisons[currentTab].rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  <td className="p-4 text-left border-b border-[#e0e0e0] text-base lg:text-lg font-semibold">
                    {row[0]}
                  </td>
                  <td className="p-4 text-left border-b border-[#e0e0e0] text-base lg:text-lg text-[#666]">
                    {row[1]}
                  </td>
                  <td className="p-4 text-left border-b border-[#e0e0e0] text-base lg:text-lg text-[#2e7d32] font-semibold">
                    {row[2]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
