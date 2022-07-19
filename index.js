let myLeads = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
const tabBtn = document.getElementById("tab-btn");
const canvas = document.querySelector(".container");
const title = document.querySelector("h5");

if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  render(myLeads);
}

function render(leads) {
  let listItems = "";
  for (let item of leads) {
    listItems += `
            <li>
                <a target='_blank' href='${item}'>
                    ${item}
                </a>
                <span class="close">x</span>
            </li>
        `;
  }

  ulEl.innerHTML = listItems;

  if (myLeads.length === 0) {
    title.innerText = "Oops! Seems like the list is empty...";
  } else {
    title.innerText = "Your Leads...";
  }
}

tabBtn.addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLeads.push(tabs[0].url);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
  });
});

deleteBtn.addEventListener("dblclick", () => {
  localStorage.clear();
  myLeads = [];
  render(myLeads);
});

inputBtn.addEventListener("click", function () {
  if (inputEl.value != "") {
    myLeads.push(inputEl.value);
    inputEl.value = "";
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
  }
});

ulEl.addEventListener("click", (e) => {
  if (e.target.classList.contains("close")) {
    const targetLink = e.target.previousElementSibling.innerText;
    const newLeads = myLeads.filter((e) => e !== targetLink);
    myLeads = newLeads;
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
  }
});
