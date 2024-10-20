import React from 'react';

<<<<<<< Updated upstream
const CFSTable = ({ question, isAnswered }) => {
  const highlights = question && question.highlight ? question.highlight.flat(2) : ["Inventory"];

  const isHighlighted = (key) => {
    return isAnswered && highlights.some(highlight => key.toLowerCase().includes(highlight.toLowerCase()));
=======
const CFSTable = (cfs_data, question) => {

  const highlights = (question && question.question && question.question.highlight) 
    ? question.question.highlight.flat(2) 
    : ["Inventory"];

  const isHighlighted = (subcategory) => {
    return highlights.includes(subcategory);
>>>>>>> Stashed changes
  };
  const formatNumber = (num) => {
    if (num === null || num === undefined) return '';
    const absNum = Math.abs(num);
    const formattedNum = absNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return num < 0 ? `(${formattedNum})` : formattedNum;
  };

  const renderRows = () => {
<<<<<<< Updated upstream
    return Object.entries(data).map(([key, value], index) => (
      <tr key={key} className={`${index % 2 === 0 ? 'bg-blue-100' : ''} ${isHighlighted(key) ? 'bg-green-300' : ''}`}>
        <td className="px-1 py-0.5 text-left text-xs">{key}</td>
        <td className="px-1 py-0.5 text-right text-xs">{formatNumber(value['2021'])}</td>
        <td className="px-1 py-0.5 text-right text-xs">{formatNumber(value['2022'])}</td>
        <td className="px-1 py-0.5 text-right text-xs">{formatNumber(value['2023'])}</td>
=======
    return Object.entries(cfs_data).map(([key, value], index) => (
      <tr key={key} className={index % 2 === 0 ? 'bg-blue-100' : ''}>
        <td className={`px-1 py-0.5 text-right text-xs ${isHighlighted(key) ? 'bg-yellow-300' : ''}`}>{key}</td>
        <td className={`px-1 py-0.5 text-right text-xs ${isHighlighted(key) ? 'bg-yellow-300' : ''}`}>{formatNumber(value['2021'])}</td>
        <td className={`px-1 py-0.5 text-right text-xs ${isHighlighted(key) ? 'bg-yellow-300' : ''}`}>{formatNumber(value['2022'])}</td>
        <td className={`px-1 py-0.5 text-right text-xs ${isHighlighted(key) ? 'bg-yellow-300' : ''}`}>{formatNumber(value['2023'])}</td>
>>>>>>> Stashed changes
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
