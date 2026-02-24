console.log("Frontend script loaded");
const dialog = document.getElementById("formDialog");
const openButton = document.getElementById("open-btn");
const closeButton = document.getElementById("close-btn");
const tableBody = document.getElementById("tableBody");
const form = document.getElementById("form");

closeButton.addEventListener("click", () => {
  dialog.close();
});

openButton.addEventListener("click", () => {
  dialog.showModal();
});
//get the table data from the database
async function loadApplications() {
  const response = await fetch("http://localhost:3000/applications");
  const data = await response.json();

  const tableBody = document.getElementById("tableBody");
  tableBody.innerHTML = "";

  data.forEach((app) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${app.job_title}</td>
      <td>${app.company}</td>
      <td>${app.status}</td>
      <td>${app.date_applied}</td>
      <td>
      <button class="edit-btn" data-id="${app.id}">Edit Status</button>
      <button class="delete-btn" data-id="${app.id}  ">Delete</button>
      
      </td>
    `;

    tableBody.appendChild(row);
  });
}

document.addEventListener("DOMContentLoaded", loadApplications);

//handle form submission
form.addEventListener("submit", async function (event) {
  event.preventDefault();

  const jobData = {
    job_title: document.getElementById("jobTitle").value,
    company: document.getElementById("company").value,
    status: document.getElementById("status").value,
    date_applied: document.getElementById("dateApplied").value,
  };

  const response = await fetch("http://localhost:3000/applications", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jobData),
  });

  if (response.ok) {
    form.reset();
    loadApplications(); // refresh table from database
  }
});

//make delete button functional
tableBody.addEventListener("click", async function (event) {
  if (event.target.classList.contains("delete-btn")) {
    const id = event.target.getAttribute("data-id");
    const response = await fetch(`http://localhost:3000/applications/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      loadApplications(); // refresh table from database
    }
  }
});

const statusDialog = document.getElementById("statusDialog");
const statusForm = document.getElementById("statusForm");
const editStatusSelect = document.getElementById("editStatus");
const closeStatusDialog = document.getElementById("closeStatusDialog");

let currentEditId = null;

tableBody.addEventListener("click", function (event) {
  if (event.target.classList.contains("edit-btn")) {
    currentEditId = event.target.getAttribute("data-id");
    statusDialog.showModal();
  }
});

closeStatusDialog.addEventListener("click", () => {
  statusDialog.close();
});

statusForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  const updatedStatus = editStatusSelect.value;

  const response = await fetch(
    `http://localhost:3000/applications/${currentEditId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: updatedStatus }),
    },
  );

  if (response.ok) {
    statusDialog.close();
    loadApplications();
  }
});
