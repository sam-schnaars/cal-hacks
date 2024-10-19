import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Lesson from './components/Lesson.tsx';
import Quiz from './components/Quiz';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/quiz" element={<Quiz />} />
      </Routes>
      
    <div className="flex h-screen bg-background text-foreground">
      {/* Sidebar */}
      <div className="w-64 border-r bg-muted">
        <div className="p-4 font-semibold text-lg border-b">Question</div>
        <div className="h-[calc(100vh-57px)]">
          <nav className="p-2">
            {[
              "Introduction to Accounting",
              "The Accounting Equation",
              "Financial Statements",
            ].map((item, index) => (
              <div
                key={index}
                className={`p-2 rounded-md cursor-pointer ${
                  index === 0 ? "bg-primary text-primary-foreground" : "hover:bg-accent"
                }`}
              >
                {item}
              </div>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-6">
        <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50%]">Assets</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Cash and Cash Equivalents</TableCell>
                  <TableCell className="text-right">$100,000</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Accounts Receivable</TableCell>
                  <TableCell className="text-right">$50,000</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Inventory</TableCell>
                  <TableCell className="text-right">$75,000</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Property, Plant, and Equipment</TableCell>
                  <TableCell className="text-right">$200,000</TableCell>
                </TableRow>
                <TableRow className="font-semibold">
                  <TableCell>Total Assets</TableCell>
                  <TableCell className="text-right">$425,000</TableCell>
                </TableRow>
              </TableBody>
            </Table>

            <Table className="mt-8">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50%]">Liabilities and Equity</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Accounts Payable</TableCell>
                  <TableCell className="text-right">$30,000</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Short-term Debt</TableCell>
                  <TableCell className="text-right">$20,000</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Long-term Debt</TableCell>
                  <TableCell className="text-right">$100,000</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Common Stock</TableCell>
                  <TableCell className="text-right">$200,000</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Retained Earnings</TableCell>
                  <TableCell className="text-right">$75,000</TableCell>
                </TableRow>
                <TableRow className="font-semibold">
                  <TableCell>Total Liabilities and Equity</TableCell>
                  <TableCell className="text-right">$425,000</TableCell>
                </TableRow>
              </TableBody>
            </Table>
        </main>

        {/* Bottom Right Buttons */}
        <div className="p-4 flex justify-end gap-4">
          <Link to="/quiz">IDK</Link>
          <Link to="/next">Next</Link>
        </div>
      </div>
    </div>
    </Router>
  );
}

export default App;
