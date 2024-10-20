import * as React from "react";
import { useNavigate } from "react-router-dom";
import companiesData from './companies_mapping.json'; // Update the path accordingly

interface Company {
  symbol: string;
  name: string;
  cik: number; // Add cik to the Company interface
}

export default function Homepage() {
  // Create an array of companies from the JSON data
  const companies = Object.entries(companiesData).map(([symbol, { name, cik }]: [string, { name: string; cik: number }]) => ({
    symbol,
    name,
    cik,
  }));

  const [companySymbol, setCompanySymbol] = React.useState<string>("");
  const [suggestions, setSuggestions] = React.useState<Company[]>([]);
  const [showSuggestions, setShowSuggestions] = React.useState<boolean>(false);

  const navigate = useNavigate();

  const handleCompanySearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Searching for company: ${companySymbol}`);
    setShowSuggestions(false);
    
    // Find the selected company object from suggestions to get the CIK
    const selectedCompany = suggestions.find(company => company.symbol === companySymbol);
    if (selectedCompany) {
      navigate(`/practice/${selectedCompany.symbol}/${selectedCompany.cik}`); // Navigate with the symbol and CIK
    } else {
      alert("Please select a valid company.");
    }
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

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Master Accounting Section (66%) */}
      <div className="flex flex-col justify-center p-8 flex-grow">
        <section className="py-5 bg-muted flex-grow flex flex-col justify-center">
          <div>
            <h1 className="text-8xl font-bold mb-4 text-left pb-2">10K-cademy</h1>
            <div className="container px-4">
              <h2 className="text-lg text-left mb-8">Interactive accounting practice with 10-Ks from every public company</h2>
              <form onSubmit={handleCompanySearch} className="max-w-md relative">
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Enter company (e.g., AAPL)"
                    value={companySymbol}
                    onChange={handleInputChange}
                    className="flex-grow border-2 rounded-lg p-1"
                  />
<<<<<<< Updated upstream
                  <button
                    type="submit"
                    onClick={handleButtonClick}
                    className="bg-gray-800 text-white font-bold border border-black rounded-lg px-4 py-2 hover:bg-gray-700 transition-colors duration-300"
                  >
                    Practice
=======
                  <button type="submit" className="border-2 rounded-lg p-1">
                    Search
>>>>>>> Stashed changes
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
