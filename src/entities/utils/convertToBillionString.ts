const convertToBillion = (value: number) => {
  return value < 10000
    ? `${value.toLocaleString()}만원`
    : `${value.toString().slice(0, -4)}억 ${value
        .toString()
        .slice(-4)
        .toLocaleString()}만원`;
};

export default convertToBillion;
