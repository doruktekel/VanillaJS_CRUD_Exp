const formEl = document.getElementById("form");
const textInputEl = document.getElementById("textInput");
const dateInputEl = document.getElementById("dateInput");
const textAreaEl = document.getElementById("textArea");
const addEl = document.getElementById("add");

const msgEl = document.querySelector(".msg");
const tasksEl = document.querySelector(".tasks");

let task = {};

const editTask = (e) => {
  const selectedTask = e.parentElement.parentElement;

  textInputEl.value = selectedTask.children[0].innerHTML;
  dateInputEl.value = selectedTask.children[1].innerHTML;
  textAreaEl.value = selectedTask.children[2].innerHTML;

  data.splice(e.parentElement.parentElement.id, 1);
};

const deleteTask = (e) => {
  data.splice(e.parentElement.parentElement.id, 1);
  addTask();
};

const resetForm = () => {
  textInputEl.value = "";
  dateInputEl.value = "";
  textAreaEl.value = "";
};

const addTask = () => {
  tasksEl.innerHTML = "";
  data.map((task, index) => {
    tasksEl.innerHTML += ` <div class="task" id=${index}>
    <h3>${task.name}</h3>
    <p class="fw-bold">${task.date}</p>
    <p>${task.text}</p>
    <div class="icons">
      <i class="fa-regular fa-pen-to-square" onClick="editTask(this)" data-bs-target="#form" data-bs-toggle="modal" ></i>
      <i class="fa-regular  fa-trash-can" onClick="deleteTask(this)"></i>
    </div>
  </div>`;
  });

  resetForm();
};

let data = [];

const createTask = () => {
  data.push({
    name: textInputEl.value,
    date: dateInputEl.value,
    text: textAreaEl.value,
  });

  localStorage.setItem("Data", JSON.stringify(data));

  addTask();
};

formEl.addEventListener("submit", (e) => {
  e.preventDefault();

  if (textInputEl.value === "") {
    msgEl.innerHTML = "Task name couldnt be empty";
  } else {
    msgEl.innerHTML = "";
    createTask();
    addEl.setAttribute("data-bs-dismiss", "modal");
    addEl.click();
    (() => {
      addEl.setAttribute("data-bs-dismiss", "");
    })();
  }
});

(() => {
  data = JSON.parse(localStorage.getItem("Data")) || [];
  addTask();
})();
