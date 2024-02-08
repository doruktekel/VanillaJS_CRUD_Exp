const formEl = document.getElementById("form");
const textEl = document.getElementById("text");
const msgEl = document.querySelector(".msg");
const postsEl = document.querySelector(".posts");
const deleteEls = document.querySelectorAll(".fa-trash-can");

///  Check Local Storage  ///

let datas = localStorage.getItem("Data")
  ? JSON.parse(localStorage.getItem("Data"))
  : [];

///  Get Data  ///

const getData = () => {
  let dataText = textEl.value;
  let dataId = new Date().getTime().toString();
  let data = {
    id: dataId,
    text: dataText,
  };
  datas = [data, ...datas];
  console.log(datas);
  if (dataText === "") {
    msgEl.innerHTML = "textarea couldnt be null !";
    setTimeout(() => {
      msgEl.innerHTML = "";
    }, 3000);
  }
};

///   Delete Data   ///

const deletePost = (id) => {
  datas = datas.filter((data) => data.id !== id);
  writeData();
};

///   Edit Data   ///

const editPost = (id) => {
  const selectedItem = datas.find((data) => data.id === id);
  textEl.value = selectedItem.text;
  // let dataText = textEl.value;
  // let data = {
  //   id: selectedItem.id,
  //   text: dataText,
  // };

  // deletePost(selectedItem.id);
};

///   Write Data   ///

const writeData = () => {
  postsEl.innerHTML = "";
  datas.forEach((data) => {
    const div = document.createElement("div");
    div.classList.add("post");

    const parag = document.createElement("p");
    parag.innerHTML = data.text;
    div.appendChild(parag);

    const span = document.createElement("span");
    span.classList.add("icons");
    div.appendChild(span);

    const editIcon = document.createElement("i");
    editIcon.classList.add("fa-regular");
    editIcon.classList.add("fa-pen-to-square");
    editIcon.onclick = () => {
      editPost(data.id);
    };
    span.appendChild(editIcon);

    const deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fa-regular");
    deleteIcon.classList.add("fa-trash-can");
    deleteIcon.onclick = () => {
      deletePost(data.id);
    };
    span.appendChild(deleteIcon);

    postsEl.appendChild(div);
  });
  localStorage.setItem("Data", JSON.stringify(datas));
};
writeData();

const handleFormEvent = (e) => {
  e.preventDefault();
  getData();
  writeData();
  textEl.value = "";
};

formEl.addEventListener("submit", (e) => {
  handleFormEvent(e);
});

formEl.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    handleFormEvent(e);
  }
});
