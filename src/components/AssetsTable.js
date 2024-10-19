import React from 'react';

const AssetsTable = () => {
  const data = {
    Assets: {
      'Current assets': {
        'Cash and cash equivalents': { '2022': 21879, '2023': 29045 },
        'Marketable securities': { '2022': 93997, '2023': 91789 },
        'Total cash, cash equivalents, and marketable securities': {
          '2022': 115876,
          '2023': 120834,
        },
        'Accounts receivable, net': { '2022': 40258, '2023': 44029 },
        Inventory: { '2022': 2670, '2023': 2470 },
        'Other current assets': { '2022': 10959, '2023': 11499 },
        'Total current assets': { '2022': 169763, '2023': 178832 },
      },
      'Non-current assets': {
        'Property and equipment, net': { '2022': 111262, '2023': 126412 },
        'Operating lease assets': { '2022': 12478, '2023': 12804 },
        'Intangible assets, net': { '2022': 2882, '2023': 3729 },
        Goodwill: { '2022': 28960, '2023': 32760 },
        'Non-marketable securities': { '2022': 29916, '2023': 31894 },
        'Deferred income taxes': { '2022': 1891, '2023': 2256 },
        'Other non-current assets': { '2022': 5410, '2023': 6181 },
        'Total non-current assets': { '2022': 192799, '2023': 216036 },
      },
      'Total assets': {"":{'2022': 362562, '2023': 394868 }},
    }
  };

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
    Object.entries(data.Assets).forEach(([subcategory, items]) => {
      rows.push(
        <tr key={subcategory}>
          <td colSpan="3" className="border border-gray-400 px-2 py-1 text-xs font-semibold bg-gray-100">{subcategory}</td>
        </tr>
      );
      rows.push(...renderRows(subcategory, items));
    });
    return rows;
  };

  return (
    <div>
      <h2 className='font-bold text-base mb-2'>Assets</h2>
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
