import React from 'react';
import data from "../google_balance_sheet.json";

const BalanceSheetTable = () => {
  const assetsData = data.Assets;
  const liabilitiesData = data["Liabilities and Stockholders' Equity"];

  const formatNumber = (num) => {
    if (num === undefined || num === null) return '-';
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const renderCombinedRows = (assetsItems, liabilitiesItems) => {
    const rows = [];
    const assetEntries = Object.entries(assetsItems);
    const liabilityEntries = Object.entries(liabilitiesItems);
    const maxLength = Math.max(assetEntries.length, liabilityEntries.length);

    for (let i = 0; i < maxLength; i++) {
      const assetItem = assetEntries[i] || [];
      const liabilityItem = liabilityEntries[i] || [];

      rows.push(
        <tr key={`row-${i}`}>
          <td className={`${assetItem[0] ? 'border border-gray-400' : ''} px-2 py-1 text-xs`}>{assetItem[0] || ''}</td>
          <td className={`${assetItem[1] ? 'border border-gray-400' : ''} px-2 py-1 text-xs text-right`}>{assetItem[1] ? `$${formatNumber(assetItem[1]['2022'])}` : ''}</td>
          <td className={`${assetItem[1] ? 'border border-gray-400' : ''} px-2 py-1 text-xs text-right`}>{assetItem[1] ? `$${formatNumber(assetItem[1]['2023'])}` : ''}</td>
          <td className={`${liabilityItem[0] ? 'border border-gray-400' : ''} px-2 py-1 text-xs`}>{liabilityItem[0] || ''}</td>
          <td className={`${liabilityItem[1] ? 'border border-gray-400' : ''} px-2 py-1 text-xs text-right`}>{liabilityItem[1] ? `$${formatNumber(liabilityItem[1]['2022'])}` : ''}</td>
          <td className={`${liabilityItem[1] ? 'border border-gray-400' : ''} px-2 py-1 text-xs text-right`}>{liabilityItem[1] ? `$${formatNumber(liabilityItem[1]['2023'])}` : ''}</td>
        </tr>
      );
    }

    return rows;
  };

  const generateCombinedTableRows = (assetsData, liabilitiesData) => {
    const rows = [];
    const assetCategories = Object.entries(assetsData);
    const liabilityCategories = Object.entries(liabilitiesData);
    const maxCategories = Math.max(assetCategories.length, liabilityCategories.length);

    for (let i = 0; i < maxCategories; i++) {
      const [assetCategory, assetItems] = assetCategories[i] || [];
      const [liabilityCategory, liabilityItems] = liabilityCategories[i] || [];

      if (assetCategory || liabilityCategory) {
        rows.push(
          <tr key={`category-${i}`}>
            <td className={`${assetCategory ? 'border border-gray-400 bg-gray-100' : ''} px-2 py-1 text-xs font-semibold`}>{assetCategory || ''}</td>
            {assetCategory && (
              <>
                <td className="border border-gray-400 bg-gray-100 px-2 py-1 text-xs font-semibold text-center">2022</td>
                <td className="border border-gray-400 bg-gray-100 px-2 py-1 text-xs font-semibold text-center">2023</td>
              </>
            )}
            {!assetCategory && (
              <>
                <td></td>
                <td></td>
              </>
            )}
            <td className={`${liabilityCategory ? 'border border-gray-400 bg-gray-100' : ''} px-2 py-1 text-xs font-semibold`}>{liabilityCategory || ''}</td>
            {liabilityCategory && (
              <>
                <td className="border border-gray-400 bg-gray-100 px-2 py-1 text-xs font-semibold text-center">2022</td>
                <td className="border border-gray-400 bg-gray-100 px-2 py-1 text-xs font-semibold text-center">2023</td>
              </>
            )}
            {!liabilityCategory && (
              <>
                <td></td>
                <td></td>
              </>
            )}
          </tr>
        );
      }

      if (assetItems || liabilityItems) {
        rows.push(...renderCombinedRows(assetItems || {}, liabilityItems || {}));
      }
    }

    return rows;
  };

  return (
    <div>
      <table className="border-collapse w-full">
        <thead>
          <tr>
            <th colSpan="6" className="border border-gray-400 px-2 py-1 text-xs font-bold bg-gray-200">Balance Sheet</th>
          </tr>
        </thead>
        <tbody>
          {generateCombinedTableRows(assetsData, liabilitiesData)}
        </tbody>
      </table>
    </div>
  );
};

export default BalanceSheetTable;
