let data = [];

// Load data from local storage if available
if (localStorage.getItem("registrationData")) {
  data = JSON.parse(localStorage.getItem("registrationData"));
}

function renderTable() {
  const tableBody = document.getElementById("tableBody");
  tableBody.innerHTML = "";

  data.forEach((item, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${item.name}</td>
      <td>${item.email}</td>
      <td>${item.password}</td>
      <td class="icons">
        <i class="fa-regular fa-pen-to-square" onclick="editEntry(${index})"></i>
        <i class="fa-solid fa-trash-can" onclick="deleteEntry(${index})"></i>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

function submitForm() {
  const fullName = document.getElementById("fullName").value;
  const email = document.getElementById("yourEmail").value;
  const password = document.getElementById("pass").value;

  if (fullName && email && password) {
    const entry = { name: fullName, email, password };
    data.push(entry);
    saveDataToLocalStorage();
    renderTable();
    document.getElementById("form").reset();
  } else {
    alert("Please fill in all fields");
  }
}

function editEntry(index) {
  const entry = data[index];
  const fullName = prompt("Enter new full name:", entry.name);
  const email = prompt("Enter new email:", entry.email);
  const password = prompt("Enter new password:", entry.password);

  if (fullName && email && password) {
    data[index] = { name: fullName, email, password };
    saveDataToLocalStorage();
    renderTable();
  }
}

function deleteEntry(index) {
  const confirmation = confirm("Are you sure you want to delete this entry?");
  if (confirmation) {
    data.splice(index, 1);
    saveDataToLocalStorage();
    renderTable();
  }
}

function saveDataToLocalStorage() {
  localStorage.setItem("registrationData", JSON.stringify(data));
}

// Initial render
renderTable();
