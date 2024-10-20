import React from 'react';
import data from "../google_balance_sheet.json";

const LiabilitiesTable = (dataType) => {
  const selectedData = data["Liabilities and Stockholders' Equity"];

  const formatNumber = (num) => {
    if (num === undefined || num === null) return '-';
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  
  const renderRows = (subcategory, items) => {
    return Object.entries(items).map(([item, values]) => (
      <tr key={item}>
        <td className="border border-gray-400 px-2 py-1 text-xs">{item}</td>
        <td className="border border-gray-400 px-2 py-1 text-xs">${formatNumber(values['2022'])}</td>
        <td className="border border-gray-400 px-2 py-1 text-xs">${formatNumber(values['2023'])}</td>
      </tr>
    ));
  };

  const generateTableRows = () => {
    const rows = [];
    Object.entries(data["Liabilities and Stockholders' Equity"]).forEach(([subcategory, items]) => {
      rows.push(
        <tr key={subcategory}>
          <td colSpan="3" className="border border-gray-400 px-2 py-1 text-sm font-semibold bg-gray-100">{subcategory}</td>
        </tr>
      );
      rows.push(...renderRows(subcategory, items));
    });
    return rows;
  };

  return (
    <div>
      <h2 className='font-bold text-xs mb-2'>Liabilities</h2>
      <table className="border-collapse w-full">
        <thead>
          <tr>
            <th className="border border-gray-400 px-2 py-1 text-sm font-semibold bg-gray-200">Liabilities</th>
            <th className="border border-gray-400 px-2 py-1 text-sm font-semibold bg-gray-200">2022</th>
            <th className="border border-gray-400 px-2 py-1 text-sm font-semibold bg-gray-200">2023</th>
          </tr>
        </thead>
        <tbody>
          {generateTableRows()}
        </tbody>
      </table>
    </div>
  );
};

export default LiabilitiesTable;
