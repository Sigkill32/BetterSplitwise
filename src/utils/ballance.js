const ballance = (data) => {
  let grandTotal = 0;
  const headCount = data.length;
  const positiveDiffData = [];
  const negativeDiffData = [];
  const ballanceArr = [];
  data.forEach((person) => {
    grandTotal += person.spent;
  });
  const costPerHead = grandTotal / headCount;
  data.forEach((person) => {
    const difference = person.spent - costPerHead;
    const obj = { name: person.name, diff: difference };
    if (difference < 0) negativeDiffData.push(obj);
    else positiveDiffData.push(obj);
  });
  positiveDiffData.sort((a, b) => b.diff - a.diff);
  negativeDiffData.sort((a, b) => a.diff - b.diff);
  for (let i = 0; i < negativeDiffData.length; i++) {
    for (let j = 0; j < positiveDiffData.length; j++) {
      if (negativeDiffData[i].diff === 0 || positiveDiffData[j].diff === 0)
        continue;
      else {
        let balObj = {};
        const currentBal = positiveDiffData[j].diff + negativeDiffData[i].diff;
        if (currentBal <= 0) {
          balObj = {
            from: negativeDiffData[i].name,
            to: positiveDiffData[j].name,
            bal: positiveDiffData[j].diff,
          };
          positiveDiffData[j].diff = 0;
          negativeDiffData[i].diff = currentBal;
        } else {
          balObj = {
            from: negativeDiffData[i].name,
            to: positiveDiffData[j].name,
            bal: negativeDiffData[i].diff * -1,
          };
          negativeDiffData[i].diff = 0;
          positiveDiffData[j].diff = currentBal;
        }
        ballanceArr.push(balObj);
      }
    }
  }
  return ballanceArr;
};

module.exports = ballance;
