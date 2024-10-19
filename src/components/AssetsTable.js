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
    Object.entries(data.Assets).forEach(([subcategory, items]) => {
      // Add subcategory row (Current assets, Non-current assets)
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
      <h1 className="">Assets</h1>
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

export default AssetsTable;
