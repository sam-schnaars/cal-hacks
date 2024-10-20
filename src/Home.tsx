import * as React from "react";
import { useNavigate } from "react-router-dom";

export default function Homepage() {
  const [companySymbol, setCompanySymbol] = React.useState("");

  const handleCompanySearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Searching for company: ${companySymbol}`);
  };

  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/practice'); // Navigate to the AnotherPage
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Master Accounting Section (66%) */}
      <div className="flex flex-col justify-center p-8 flex-grow">
        <section className="py-5 bg-muted flex-grow flex flex-col justify-center">
          <div>
            <h1 className="text-8xl font-bold  mb-4 text-left pb-2">10-Kademy</h1>
            <div className="container px-4">
              <h2 className="text-lg text-left mb-8">Interactive accounting practice with 10-Ks from every public company</h2>
              <form onSubmit={handleCompanySearch} className="max-w-md">
                <div className="flex gap-2 mb-8">
                  <input
                    type="text"
                    placeholder="Enter company symbol (e.g., AAPL)"
                    value={companySymbol}
                    onChange={(e) => setCompanySymbol(e.target.value)}
                    className="flex-grow border-2 rounded-lg p-1"
                  />
                  <button
                    type="submit"
                    onClick={handleButtonClick}
                    className="bg-gray-800 text-white font-bold border border-black rounded-lg px-4 py-2 hover:bg-gray-700 transition-colors duration-300"
                  >
                    Practice
                  </button>
                </div>
              </form>
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
          Just enter a stock symbol to get started.
        </p>
      </div>
    </div>
  );
}
