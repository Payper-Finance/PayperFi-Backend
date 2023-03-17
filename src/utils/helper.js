const helperCandle = async (result) => {
  let newarr = [];
  for (let i = 0; i < result.length; i = i + 3) {
    let Open = result[i].Open;
    let High = result[i].High;
    let Low = result[i].Low;
    let Close = result[i].Close;
    for (let j = i; j < i + 3; j++) {
      if (j + 1 > result.length) {
        break;
      }
      if (High < result[j].High) {
        High = result[j].High;
      }
      if (Low > result[j].Low) {
        Low = result[j].Low;
      }
      Close = result[j].Close;
    }
    let data = {
      Date: result[i].Date,
      Open: Open,
      High: High,
      Low: Low,
      Close: Close,
    };
    newarr.push(data);
  }
  return newarr;
};

module.exports = {
  helperCandle,
};
