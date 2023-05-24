export const customComparator = (valueA, valueB) => {
  return valueA.toLowerCase().localeCompare(valueB.toLowerCase());
};

export const customCellRenderNumberComparator = (valueA, valueB) => {
  if (valueA.length === valueB.length) {
    return 0;
  }
  return valueA.length < valueB.length ? -1 : 1;
};

export const customNumberComparator = (valueA, valueB) => {
  if (parseInt(valueA) === parseInt(valueB)) {
    return 0;
  }
  return parseInt(valueA) < parseInt(valueB) ? -1 : 1;
};
