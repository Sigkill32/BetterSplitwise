"use strict";

const split = document.getElementById("split");
const ballanceButton = document.getElementById("ballance");
const resetButton = document.getElementById("reset");
const closeInstruction = document.querySelector(
  ".instruction-modal-close-button"
);

let costPerHead = 0;

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

split.addEventListener("click", () => {
  const peopleContainer = document.querySelector(".people-container");
  const splitByPerson = document.querySelector(".split-by-person");
  const splitCount = document.getElementById("splitCount");
  splitByPerson.innerHTML = "";
  peopleContainer.innerHTML = "";
  if (splitCount.value) {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < splitCount.value; i++) {
      const div = personGenerator(i);
      fragment.appendChild(div);
    }
    peopleContainer.appendChild(fragment);
    document.querySelector(".split-action-buttons").classList.remove("hidden");
  } else {
    alert("Head count can't be empty");
  }
});

const personGenerator = (id) => {
  const div = document.createElement("div");
  div.className = "person-container";
  div.innerHTML = `<input type="text" placeholder="Name" id="name_${id}" class="global-input name">
      <input type="number" placeholder="Contribution" id="contribution_${id}" class="global-input contribution">`;
  return div;
};

const renderSplit = (ballanceArr) => {
  const splitByPerson = document.querySelector(".split-by-person");
  splitByPerson.innerHTML = "";
  if (ballanceArr.length > 0) {
    const fragment = document.createDocumentFragment();
    ballanceArr.forEach((item) => {
      const sentence = `<span class="highlight">${
        item.from
      }</span> owes <span class="highlight">${
        item.to
      }</span> <span class="highlight">₹${
        Math.round((item.bal + Number.EPSILON) * 100) / 100
      }</span>`;
      const p = document.createElement("p");
      p.innerHTML = sentence;
      p.className = "balance-item";
      fragment.appendChild(p);
    });
    splitByPerson.appendChild(fragment);
  } else {
    splitByPerson.innerHTML = `<span class="highlight">No one owes shit to anyone</span>`;
  }
};

ballanceButton.addEventListener("click", () => {
  const splitCount = document.getElementById("splitCount");
  const data = [];
  for (let i = 0; i < splitCount.value; i++) {
    const name = document.getElementById(`name_${i}`).value || `Person${i + 1}`;
    let spent = document.getElementById(`contribution_${i}`).value;
    spent = spent === "" ? 0 : spent;
    data.push({ name, spent: parseFloat(spent) });
  }
  const ballanceArr = ballance(data);
  document.querySelector(".split-ways-container").classList.remove("hidden");
  renderSplit(ballanceArr);
});

resetButton.addEventListener("click", () => {
  const peopleContainer = document.querySelector(".people-container");
  const splitByPerson = document.querySelector(".split-by-person");
  const splitCount = document.getElementById("splitCount");
  document.querySelector(".split-ways-container").classList.add("hidden");
  document.querySelector(".split-action-buttons").classList.add("hidden");
  splitByPerson.innerHTML = "";
  peopleContainer.innerHTML = "";
  splitCount.value = "";
});

closeInstruction.addEventListener("click", () => {
  document.querySelector(".app-usage-modal-container").classList.add("hidden");
});
