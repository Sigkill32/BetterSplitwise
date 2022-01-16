data = [
  { name: "Manoj", spent: 5360 },
  { name: "Ruschick", spent: 0 },
  { name: "Rutvik", spent: 7960 },
  { name: "Shamanth", spent: 0 },
];

data2 = [
  { name: "Manoj", spent: 600 },
  { name: "Ruschick", spent: 0 },
  { name: "Rutvik", spent: 0 },
  { name: "Shamanth", spent: 0 },
];

const ballance = (data) => {
  console.log(data);
  console.log("--------------------------------------");
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
        console.log(positiveDiffData, negativeDiffData);
        obj = {};
        const currentBal = positiveDiffData[j].diff + negativeDiffData[i].diff;
        if (currentBal <= 0) {
          obj = {
            from: negativeDiffData[i].name,
            to: positiveDiffData[j].name,
            bal: positiveDiffData[j].diff,
          };
          positiveDiffData[j].diff = 0;
          negativeDiffData[i].diff = currentBal;
        } else {
          obj = {
            from: negativeDiffData[i].name,
            to: positiveDiffData[j].name,
            bal: negativeDiffData[i].diff * -1,
          };
          negativeDiffData[i].diff = 0;
          positiveDiffData[j].diff = currentBal;
        }
        ballanceArr.push(obj);
      }
    }
  }
  console.log(ballanceArr);
};

ballance(data2);
