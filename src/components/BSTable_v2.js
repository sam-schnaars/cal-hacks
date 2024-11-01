import React from "react";

const BSTable = ({ question, isAnswered, new_data }) => {
  const data = new_data;

  const highlights =
    question && question.highlight ? question.highlight.flat(2) : ["Inventory"];

  const isHighlighted = (key) => {
    return (
      isAnswered &&
      highlights.some(
        (highlight) => key.toLowerCase() === highlight.toLowerCase()
      )
    );
  };

  const renderRows = () => {
    return data["rows"].map((dataRow, index) => (
      <tr
        key={dataRow["title"] + index}
        className={index % 2 === 0 ? "bg-blue-100" : ""}
      >
        <td
          className={`px-1 py-0.5 text-left text-xs ${
            isHighlighted(dataRow["title"]) ? "bg-green-300" : ""
          } ${dataRow["2023"] ? "" : "font-bold"}`}
        >
          {dataRow["title"]}
        </td>
        <td
          className={`px-1 py-0.5 text-right text-xs ${
            isHighlighted(dataRow["2022"]) ? "bg-green-300" : ""
          }`}
        >
          {dataRow["2022"]}
        </td>
        <td
          className={`px-1 py-0.5 text-right text-xs ${
            isHighlighted(dataRow["2023"]) ? "bg-green-300" : ""
          }`}
        >
          {dataRow["2023"]}
        </td>
      </tr>
    ));
  };

  return (
    <div className="container mx-auto">
      <table className="table-auto w-full text-xs">
        <thead>
          <tr className="bg-white text-black">
            <th className="px-1 py-0.5 text-left text-xs font-bold">
              Balance Sheet (in millions)
            </th>
            <th className="px-1 py-0.5 text-right text-xs font-bold">2022</th>
            <th className="px-1 py-0.5 text-right text-xs font-bold">2023</th>
          </tr>
        </thead>
        <tbody>{renderRows()}</tbody>
      </table>
    </div>
  );
};

export default BSTable;
