import React from 'react';
import data from "../google_balance_sheet.json";

const AssetsTable = ({ highlightedRow }) => {
  const selectedData = data["Assets"];

  const formatNumber = (num) => {
    if (num === undefined || num === null) return '-';
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Define the subcategories you want to highlight
  const highlights = [
    [["cash_flow_statement", "investing_activities", "purchases_of_property_and_equipment"]]
  ];

  // Function to render individual rows and check if they need highlighting
  const renderRows = (subcategory, items) => {
    const isHighlighted = highlights.some(
      (highlight) => highlight.includes(subcategory)
    );

    return Object.entries(items).map(([item, values]) => (
      <tr
        key={item}
        className={isHighlighted ? 'bg-green-100' : 'bg-green-100'}
      >
        <td className="border border-gray-400 px-2 py-1 text-xs">{item}</td>
        <td className="border border-gray-400 px-2 py-1 text-xs">
          ${formatNumber(values['2022'])}
        </td>
        <td className="border border-gray-400 px-2 py-1 text-xs">
          ${formatNumber(values['2023'])}
        </td>
      </tr>
    ));
  };

  // Generate table rows
  const generateTableRows = () => {
    const rows = [];
    Object.entries(data.Assets).forEach(([subcategory, items]) => {
      const isHighlighted = highlights.some(
        (highlight) => highlight.some.includes(subcategory)
      );
      rows.push(
        <tr key={subcategory} className={isHighlighted ? 'bg-green-100' : 'bg-green-100'}>
          <td
            colSpan="3"
            className="border border-gray-400 px-2 py-1 text-xs font-semibold bg-gray-100"
          >
            <h1 className="bg-green-100">{subcategory}</h1>
          </td>
        </tr>
      );
      rows.push(...renderRows(subcategory, items));
    });
    return rows;
  };

  return (
    <div>
      <h2 className="font-bold text-base mb-2">Assets</h2>
      <table className="border-collapse w-full">
        <thead>
          <tr>
            <th className="border border-gray-400 px-2 py-1 text-xs font-semibold bg-gray-200">Assets</th>
            <th className="border border-gray-400 px-2 py-1 text-xs font-semibold bg-gray-200">2022</th>
            <th className="border border-gray-400 px-2 py-1 text-xs font-semibold bg-gray-200">2023</th>
          </tr>
        </thead>
        <tbody>{generateTableRows()}</tbody>
      </table>
    </div>
  );
};

export default AssetsTable;
