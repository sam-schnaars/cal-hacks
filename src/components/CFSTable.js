import React from 'react';
import gcf from '../jsons/gcfs.json';
import aaplCfs from '../jsons/aapl-cfs.json';
import ncfs from '../jsons/ncfs.json';

const CFSTable = ({ question, isAnswered, company }) => {
  const data = company === 'GOOG' ? gcf : company === 'AAPL' ? aaplCfs : ncfs;
  const highlights = question && question.highlight ? question.highlight.flat(2) : ["Inventory"];

  const isHighlighted = (key) => {
    return isAnswered && highlights.some(highlight => key.toLowerCase() === highlight.toLowerCase());
  };
  const formatNumber = (num) => {
    if (num === null || num === undefined) return '';
    const absNum = Math.abs(num);
    const formattedNum = absNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return num < 0 ? `(${formattedNum})` : formattedNum;
  };

  const renderRows = () => {
    return Object.entries(data).map(([key, value], index) => (
      <tr key={key} className={`${index % 2 === 0 ? 'bg-blue-100' : ''} ${isHighlighted(key) ? 'bg-green-300' : ''}`}>
        <td className="px-1 py-0.5 text-left text-xs">{key}</td>
        <td className="px-1 py-0.5 text-right text-xs">{formatNumber(value['2021'])}</td>
        <td className="px-1 py-0.5 text-right text-xs">{formatNumber(value['2022'])}</td>
        <td className="px-1 py-0.5 text-right text-xs">{formatNumber(value['2023'])}</td>
      </tr>
    ));
  };

  return (
    <div className="container mx-auto">
      <table className="table-auto w-full text-xs">
        <thead>
          <tr className="bg-white text-black">
            <th className="px-1 py-0.5 text-left text-xs font-bold">Cash Flow Statement (in millions)</th>
            <th className="px-1 py-0.5 text-right text-xs font-bold">2021</th>
            <th className="px-1 py-0.5 text-right text-xs font-bold">2022</th>
            <th className="px-1 py-0.5 text-right text-xs font-bold">2023</th>
          </tr>
        </thead>
        <tbody>
          {renderRows()}
        </tbody>
      </table>
    </div>
  );
};

export default CFSTable;
