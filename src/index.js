"use strict";

const ballance = require("./utils/ballance");

const split = document.getElementById("split");
const ballanceButton = document.getElementById("ballance");
const resetButton = document.getElementById("reset");
const closeInstruction = document.querySelector(
  ".instruction-modal-close-button"
);
// const dlReport = document.querySelector(".download-report");

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
      <input type="number" placeholder="Contribution" id="contribution_${id}" class="global-input contribution">
      <button class="calc-button">
        <div class="calc-symbol-row">
          <div class="calc-button-symbol">+</div>
          <div class="calc-button-symbol">-</div>
        </div>
        <div class="calc-symbol-row">
          <div class="calc-button-symbol">x</div>
          <div class="calc-button-symbol">=</div>
        </div>
      </button>`;
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
      }</span> owes <span class="highlight">${item.to}</span> &nbsp;<span>₹${
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

//  ***** Feature Disabled for now *****************
// dlReport.addEventListener("click", () => {
//   const reportTitle = "Ballance Report";
//   const ballanceDetails = document.querySelector(".split-by-person");
//   const printWindow = window.open("", "", "height=400,width=800");
//   printWindow.document.write(`<html><head><title>${reportTitle}</title>`);
//   printWindow.document.write("</head><body >");
//   printWindow.document.write(ballanceDetails.innerHTML);
//   printWindow.document.write("</body></html>");
//   printWindow.document.close();
//   printWindow.print();
// });
