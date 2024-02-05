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

  selectedTask.remove();
};

const deleteTask = (e) => {
  e.parentElement.parentElement.remove();
};

const resetForm = () => {
  textInputEl.value = "";
  dateInputEl.value = "";
  textAreaEl.value = "";
};

const addTask = () => {
  console.log(task);

  tasksEl.innerHTML += ` <div class="task">
  <h3>${task.name}</h3>
  <p class="fw-bold">${task.date}</p>
  <p>${task.text}</p>
  <div class="icons">
    <i class="fa-regular fa-pen-to-square" onClick="editTask(this)" data-bs-target="#form" data-bs-toggle="modal" ></i>
    <i class="fa-regular  fa-trash-can" onClick="deleteTask(this)"></i>
  </div>
</div>`;

  resetForm();
};

const createTask = () => {
  task["name"] = textInputEl.value;
  task["date"] = dateInputEl.value;
  task["text"] = textAreaEl.value;

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
