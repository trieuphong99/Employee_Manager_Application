import React from "react";
import { FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";

const SortTarget = ({ type, sortType, sortField, letSort, value }) => {
  return (
    <th className="cursor-pointer" onClick={() => letSort(type.toLowerCase())}>
      {value}
      {sortType === "ASC" && sortField === type.toLowerCase() && (
        <FaSortAmountUp className="icon-sort-date" />
      )}
      {sortType === "DESC" && sortField === type.toLowerCase() && (
        <FaSortAmountDown className="icon-sort-date" />
      )}
    </th>
  );
};

export default SortTarget;
