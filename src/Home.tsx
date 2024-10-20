import * as React from "react";
import { useNavigate } from "react-router-dom";
import companiesData from './companies_mapping.json'; // Update the path accordingly

export default function Homepage() {
  // Create an array of companies from the JSON data
  const companies = Object.entries(companiesData).map(([symbol, { name }]) => ({
    symbol,
    name,
  }));

  const [companySymbol, setCompanySymbol] = React.useState("");
  const [suggestions, setSuggestions] = React.useState<{ symbol: string; name: string }[]>([]);
  const [showSuggestions, setShowSuggestions] = React.useState(false);

  const handleCompanySearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Searching for company: ${companySymbol}`);
    setShowSuggestions(false); // Hide suggestions on submit
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setCompanySymbol(input);

    if (input.length > 0) {
      const filteredCompanies = companies.filter(
        (company) =>
          company.symbol.toLowerCase().includes(input.toLowerCase()) ||
          company.name.toLowerCase().includes(input.toLowerCase())
      );
      setSuggestions(filteredCompanies);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (symbol: string) => {
    setCompanySymbol(symbol);
    setShowSuggestions(false);
  };

  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/practice');
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Master Accounting Section (66%) */}
      <div className="flex flex-col justify-center p-8 flex-grow">
        <section className="py-5 bg-muted flex-grow flex flex-col justify-center">
          <div>
            <h1 className="text-8xl font-bold mb-4 text-left pb-2">10K-cademy</h1>
            <div className="container px-4">
              <h2 className="text-lg text-left mb-8">Interactive accounting on any public company's 10K</h2>
              <form onSubmit={handleCompanySearch} className="max-w-md relative">
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Enter company symbol (e.g., AAPL)"
                    value={companySymbol}
                    onChange={handleInputChange}
                    className="flex-grow border-2 rounded-lg p-1"
                  />
                  <button type="submit" onClick={handleButtonClick} className="border-2 rounded-lg p-1">
                    Search
                  </button>
                </div>
                {/* Suggestions Dropdown */}
                {showSuggestions && suggestions.length > 0 && (
                  <ul className="absolute bg-white border-2 rounded-lg w-full z-10 mt-1 max-h-40 overflow-y-auto">
                    {suggestions.map((company, index) => (
                      <li
                        key={index}
                        onClick={() => handleSuggestionClick(company.symbol)}
                        className="p-2 cursor-pointer hover:bg-gray-100"
                      >
                        {company.name} ({company.symbol})
                      </li>
                    ))}
                  </ul>
                )}
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
