import React from 'react';
import data from "../google_balance_sheet.json";

const LiabilitiesTable = (dataType) => {
  const selectedData = data["Liabilities and Stockholders' Equity"];

  const renderRows = (subcategory, items) => {
    return Object.entries(items).map(([item, values]) => (
      <tr key={item} className="border b-2">
        <td className="pr-4 pl-4">{item}</td>
        <td className="pr-4 pl-4">${values['2022']}</td>
        <td className="pr-4 pl-4">${values['2023']}</td>
      </tr>
    ));
  };

  const generateTableRows = () => {
    const rows = [];
    Object.entries(selectedData).forEach(([subcategory, items]) => {
      // Add subcategory row (Current liabilities, Non-current liabilities)
      rows.push(
        <tr key={subcategory} className='pl-2 pr-2'>
          <td colSpan="3" style={{ fontWeight: 'bold' }} className='pl-2 pr-2'>{subcategory}</td>
        </tr>
      );
      // Add individual item rows within the subcategory
      rows.push(renderRows(subcategory, items));
    });
    return rows;
  };

  return (
    <div>
      <h1 className='font-bold text-lg'>Liabilities</h1>
      <table className="border b-2 pl-2 pr-2">
        <thead className="border b-2 pl-4 pr-4">
          <tr className="border b-2">
            <th className="border b-2">Subcategory</th>
            <th>2022</th>
            <th>2023</th>
          </tr>
        </thead>
        <tbody className="border b-2 pl-2 pr-2">{generateTableRows()}</tbody>
      </table>
    </div>
  );
};

export default LiabilitiesTable;
