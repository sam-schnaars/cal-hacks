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
          <h1 className="text-8xl font-bold  mb-4 text-left pb-2">10K-cademy</h1>
          <div className="container px-4">
            <h2 className="text-lg text-left mb-8">Interactive accounting on any public company's 10K</h2>
            <form onSubmit={handleCompanySearch} className="max-w-md">
              <div className="flex gap-2 mb-8">
                <input
                  type="text"
                  placeholder="Enter company symbol (e.g., AAPL)"
                  value={companySymbol}
                  onChange={(e) => setCompanySymbol(e.target.value)}
                  className="flex-grow border-2 rounded-lg p-1"
                />
                <button type="submit" onClick={handleButtonClick} className="border-2 rounded-lg p-1">
                  Search
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
          This tool helps you understand financial statements by providing quizzes based on real 10-K filings. 
          Simply enter the stock symbol of a public company to get started.
        </p>
        <p>
          The quizzes will test your knowledge on various aspects of financial accounting, ensuring you gain practical skills.
        </p>
      </div>
    </div>
  );
}
