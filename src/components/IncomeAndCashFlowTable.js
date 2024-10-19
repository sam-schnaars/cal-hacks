import React from 'react';
import data from "../google_income_and_cash_flow_statements.json";

const IncomeAndCashFlowTable = () => {
  const formatNumber = (num) => {
    if (num === undefined || num === null) return '-';
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const renderRows = (items, depth = 0) => {
    return Object.entries(items).map(([item, values]) => {
      if (typeof values === 'object' && !('2022' in values) && !('2023' in values)) {
        return (
          <React.Fragment key={item}>
            <tr>
              <td colSpan="3" className={`border border-gray-400 px-2 py-1 text-xs font-semibold bg-gray-${100 + depth * 100}`} style={{paddingLeft: `${depth * 20}px`}}>{item}</td>
            </tr>
            {renderRows(values, depth + 1)}
          </React.Fragment>
        );
      } else {
        return (
          <tr key={item}>
            <td className="border border-gray-400 px-2 py-1 text-xs" style={{paddingLeft: `${depth * 20}px`}}>{item}</td>
            <td className="border border-gray-400 px-2 py-1 text-xs text-right">{typeof values['2022'] === 'number' ? '$' : ''}{formatNumber(values['2022'])}</td>
            <td className="border border-gray-400 px-2 py-1 text-xs text-right">{typeof values['2023'] === 'number' ? '$' : ''}{formatNumber(values['2023'])}</td>
          </tr>
        );
      }
    });
  };

  return (
    <div>
      <h2 className='font-bold text-base mb-2'>Income Statement and Cash Flow Statement</h2>
      <table className="border-collapse w-full">
        <thead>
          <tr>
            <th className="border border-gray-400 px-2 py-1 text-xs font-semibold bg-gray-200">Income Statement</th>
            <th className="border border-gray-400 px-2 py-1 text-xs font-semibold bg-gray-200">2022</th>
            <th className="border border-gray-400 px-2 py-1 text-xs font-semibold bg-gray-200">2023</th>
          </tr>
        </thead>
        <tbody>
          {renderRows(data)}
        </tbody>
      </table>
    </div>
  );
};

export default IncomeAndCashFlowTable;
