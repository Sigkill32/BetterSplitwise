"use strict";

const ballance = require("./utils/ballance");

const split = document.getElementById("split");
const ballanceButton = document.getElementById("ballance");
const resetButton = document.getElementById("reset");
const closeInstruction = document.querySelector(
  ".instruction-modal-close-button"
);
const reportClose = document.getElementById("report-close-btn");
const splitReportModal = document.querySelector(".split-ways-container");
const splitCount = document.getElementById("splitCount");
const headCountText = document.querySelector(".head-count-text");
// const dlReport = document.querySelector(".download-report");

const handleHeadCountChange = (() => {
  const headCountText = document.querySelector(".head-count-text");
  return function (e) {
    const { value } = e.target;
    if (value.length === 0) headCountText.classList.add("hidden");
    else {
      if (headCountText.className.split.length > 1)
        headCountText.classList.remove("hidden");
    }
  };
})();

splitCount.addEventListener("input", handleHeadCountChange);

function handlePersonChange(e, id) {
  const { value } = e.target;
  const label = document.getElementById(id);
  if (value.length === 0) label.classList.add("hidden");
  else {
    if (label.className.split.length > 1) label.classList.remove("hidden");
  }
}

function addRow() {
  const div = document.createElement("div");
  div.className = "add-row";
  div.innerHTML = `<button class="add-row-button">+ ADD ROW</button>`;
  div.addEventListener("click", handleAddRowClick);
  return div;
}

const handleAddRowClick = (() => {
  const peopleContainer = document.querySelector(".people-container");
  return function (e) {
    if (e.target.className === "add-row-button") {
      const button = e.target;
      button.parentNode.removeChild(button);
      const div = personGenerator(splitCount.value);
      const addRowButton = addRow();
      peopleContainer.appendChild(div);
      peopleContainer.appendChild(addRowButton);
      splitCount.value = parseInt(splitCount.value) + 1;
    }
  };
})();

split.addEventListener("click", () => {
  const peopleContainer = document.querySelector(".people-container");
  const splitByPerson = document.querySelector(".split-by-person");
  splitByPerson.innerHTML = "";
  peopleContainer.innerHTML = "";
  if (splitCount.value) {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < splitCount.value; i++) {
      const div = personGenerator(i);
      div.addEventListener("input", (e) => {
        handlePersonChange(e, `label_${e.target.id}`);
      });
      fragment.appendChild(div);
    }
    const addRowButton = addRow();
    fragment.appendChild(addRowButton);
    peopleContainer.appendChild(fragment);
    document.querySelector(".split-action-buttons").classList.remove("hidden");
  } else {
    alert("Head count can't be empty");
  }
});

const personGenerator = (id) => {
  const div = document.createElement("div");
  div.className = "person-container";
  div.innerHTML = `<div class="name-input">
    <div class="name-label hidden" id="label_name_${id}">Name</div>
    <input type="text" placeholder="Name" id="name_${id}" class="global-input name">
  </div>
  <div class="contribution-input">
  <div class="contribution-label hidden" id="label_contribution_${id}">Contribution</div>
    <input type="number" placeholder="Contribution" id="contribution_${id}" class="global-input contribution">
  </div>`;
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
  document.querySelector(".split-ways-container").classList.add("hidden");
  document.querySelector(".split-action-buttons").classList.add("hidden");
  splitByPerson.innerHTML = "";
  peopleContainer.innerHTML = "";
  splitCount.value = "";
});

closeInstruction.addEventListener("click", () => {
  document.querySelector(".app-usage-modal-container").classList.add("hidden");
});

reportClose.addEventListener("click", () => {
  document.querySelector(".split-ways-container").classList.add("hidden");
});

splitReportModal.addEventListener("click", () => {
  document.querySelector(".split-ways-container").classList.add("hidden");
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
