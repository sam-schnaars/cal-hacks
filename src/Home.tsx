import * as React from "react";
import { useNavigate } from "react-router-dom";
import companiesData from './companies_mapping.json'; // Update the path accordingly
import PracticeScreen from './Practice';

export default function Home() {
  // Create an array of companies from the JSON data
  const companies = Object.entries(companiesData).map(([symbol, { name }]) => ({
    symbol,
    name,
  }));

  const [selectedCompany, setSelectedCompany] = React.useState("GOOG");
  const navigate = useNavigate();

  const handleCompanySelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCompany(e.target.value);
  };

  const handleButtonClick = () => {
    navigate('/practice', { state: { company: selectedCompany } });
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Master Accounting Section (66%) */}
      <div className="flex flex-col justify-center p-8 flex-grow">
        <section className="py-5 bg-muted flex-grow flex flex-col justify-center">
          <div>
            <h1 className="text-8xl font-bold mb-4 text-left pb-2">10-Kademy</h1>
            <div className="container px-4">
              <h2 className="text-lg text-left mb-8">Interactive accounting practice with 10-Ks from every public company <span className="text-gray-300 ml-1">(coming soon)</span></h2>
              <div className="max-w-md relative">
                <div className="flex gap-2 mb-2">
                  <select
                    value={selectedCompany}
                    onChange={handleCompanySelect}
                    className="flex-grow border-2 rounded-lg p-1"
                    aria-label="Select a company"
                  >
                    <option value="GOOG">GOOG: Alphabet, Inc.</option>
                    <option value="AAPL">AAPL: Apple, Inc.</option>
                    <option value="NVDA">NVDA: NVIDIA Corp.</option>
                  </select>
                  <button
                    onClick={handleButtonClick}
                    className="bg-gray-800 text-white font-bold border border-black rounded-lg px-4 py-2 hover:bg-gray-700 transition-colors duration-300"
                  >
                    Test the Beta
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Brief Value Add Section (34%) */}
      <div className="flex-none w-1/3 flex flex-col justify-center p-8 border-l-2">
        <h2 className="text-2xl font-bold mb-4">How to Use This Tool</h2>
        <p className="mb-4">
          Our tool helps business students develop practical skills with real financial statements, 
          going beyond simplified examples of basic journal entries. 
          By quizzing yourself with actual 10-K filings from public companies, 
          you build the reflexes necessary for deeper financial understanding
          —something you can’t rely on AI for during your accounting final. 
          Just enter a stock to get started.
        </p>
      </div>
    </div>
  );
}
