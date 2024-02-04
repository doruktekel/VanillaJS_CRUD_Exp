const formEl = document.getElementById("form");
const textEl = document.getElementById("text");
const msgEl = document.querySelector(".msg");
const postsEl = document.querySelector(".posts");

const getData = () => {
  let data = textEl.value;
  if (data === "") {
    msgEl.innerHTML = "textarea couldnt be null !";
    setTimeout(() => {
      msgEl.innerHTML = "";
    }, 3000);
  }
  return data;
};

const deletePost = (e) => {
  e.parentElement.parentElement.remove();
};

const editPost = (e) => {
  textEl.value = e.parentElement.previousElementSibling.innerHTML;
  e.parentElement.parentElement.remove();
};

const writeData = (data) => {
  postsEl.innerHTML += `<div class="post">
    <p>${data}</p>
    <span class="icons">
      <i class="fa-regular fa-pen-to-square" onClick="editPost(this)"></i>
    <i class="fa-regular fa-trash-can" onClick="deletePost(this)"></i>
    </span></div>`;
};

formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  let data = getData();
  writeData(data);
  textEl.value = "";
});
