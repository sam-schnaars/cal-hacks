import React from 'react';
import incomeData from "../google_income_statement.json";
import cashFlowData from "../google_cash_flow.json";

const IncomeAndCashFlowTable = (question) => {
  const highlights = question.question.highlight ? question.question.highlight.flat(2) : "Inventory";

  const formatNumber = (num) => {
    if (num === undefined || num === null) return '-';
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const isHighlighted = (subcategory) => {
    return highlights.includes(subcategory);
  };

  const renderRows = (items, depth = 0) => {
    return Object.entries(items).map(([item, values]) => {
      if (typeof values === 'object' && !('2022' in values) && !('2023' in values)) {
        return (
          <React.Fragment key={item}>
            <tr>
              <td colSpan="3" className={`border border-gray-400 px-2 py-1 text-xs font-semibold`} style={{paddingLeft: `${5 + depth * 20}px`}}>{item}</td>
            </tr>
            {renderRows(values, depth + 1)}
          </React.Fragment>
        );
      } else {
        const isBold = item === 'Net Income' || item.toLowerCase().startsWith('net cash') || item === 'Cash and Cash Equivalents at End of Period';
        return (
          <tr key={item}>
            <td className={`border border-gray-400 px-2 py-1 text-xs ${isBold ? 'font-bold' : ''} ${isHighlighted(item) ? 'bg-yellow-300' : ''}`} style={{paddingLeft: `${5 + depth * 20}px`}}>{item}</td>
            <td className={`border border-gray-400 px-2 py-1 text-xs text-right ${isBold ? 'font-bold' : ''} ${isHighlighted(item) ? 'bg-yellow-300' : ''}`} style={{paddingLeft: '5px'}}>{typeof values['2022'] === 'number' ? '$' : ''}{formatNumber(values['2022'])}</td>
            <td className={`border border-gray-400 px-2 py-1 text-xs text-right ${isBold ? 'font-bold' : ''} ${isHighlighted(item) ? 'bg-yellow-300' : ''}`} style={{paddingLeft: '5px'}}>{typeof values['2023'] === 'number' ? '$' : ''}{formatNumber(values['2023'])}</td>
          </tr>
        );
      }
    });
  };

  return (
    <div>
      <table className="border-collapse w-full mb-8">
        <thead>
          <tr>
            <th className="border border-gray-400 px-2 py-1 text-xs font-semibold bg-gray-200" style={{paddingLeft: '5px'}}>Income Statement (in millions)</th>
            <th className="border border-gray-400 px-2 py-1 text-xs font-semibold bg-gray-200" style={{paddingLeft: '5px'}}>2022</th>
            <th className="border border-gray-400 px-2 py-1 text-xs font-semibold bg-gray-200" style={{paddingLeft: '5px'}}>2023</th>
          </tr>
        </thead>
        <tbody>
          {renderRows(incomeData)}
        </tbody>
      </table>

      <table className="border-collapse w-full">
        <thead>
          <tr>
            <th className="border border-gray-400 px-2 py-1 text-xs font-semibold bg-gray-200" style={{paddingLeft: '5px'}}>Cash Flow Statement (in millions)</th>
            <th className="border border-gray-400 px-2 py-1 text-xs font-semibold bg-gray-200" style={{paddingLeft: '5px'}}>2022</th>
            <th className="border border-gray-400 px-2 py-1 text-xs font-semibold bg-gray-200" style={{paddingLeft: '5px'}}>2023</th>
          </tr>
        </thead>
        <tbody>
          {renderRows(cashFlowData)}
        </tbody>
      </table>
    </div>
  );
};

export default IncomeAndCashFlowTable;
