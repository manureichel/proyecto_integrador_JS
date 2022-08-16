// const DateTime = luxon.DateTime;

// console.log(DateTime.local().toLocaleString(DateTime.DATE_FULL));

console.log("Welcome to the ToDo List!");

let taskList = [];

let taskListDOM = document.getElementById("task--list");
let leftTasks = document.getElementById("left-text");
let addButton = document.getElementById("add-button");
let inputText = document.getElementById("input-text");

const updateLeftTasks = (left) =>
  (leftTasks.innerText = `${left} tareas restantes`);

const loadTaskList = () => {
  const taskListJSON = localStorage.getItem("taskList");
  if (taskListJSON) {
    taskList = JSON.parse(taskListJSON);
    updateTasksOnDOM(taskList);
    updateLeftTasks(taskList.length);
    console.log(taskList);
  }
};

loadTaskList();

updateLeftTasks(leftTasks.length ? taskList.length : 0); // si no está definido se muestra 0 tareas restantes

//Función para intercambiar el orden de las tareas (Usada en el event listener de drag and drop)
const interchange = (array, index1, index2) => {
  [array[index1], array[index2]] = [array[index2], array[index1]];
  console.log("lista: ", taskList);
  localStorage.setItem("taskList", JSON.stringify(taskList));
};

addButton.onclick = (e) => {
  console.log("Toqué el botón! :D");
  e.preventDefault();
  if (inputText.value !== "") {
    addNewTask(inputText.value);
    inputText.value = "";
    updateTasksOnDOM(taskList);
    updateLeftTasks(taskList.length);
    localStorage.setItem("taskList", JSON.stringify(taskList));
  }
};

function updateTasksOnDOM(taskList) {
  console.table(taskList);
  taskListDOM.innerHTML = "";
  for (let i in taskList) {
    let taskItem = document.createElement("div");
    taskItem.id = `task-${i}`;
    taskItem.setAttribute("data-id", i);
    taskItem.className = "card shadow mb-3 mt-4";
    if (taskList[i].isCompleted)
      taskItem.classList.add("task--item--completed");

    // card-body
    let taskBody = document.createElement("div");
    taskBody.className = "card-body";

    // card-text
    let cardText = document.createElement("p");
    cardText.textContent = taskList[i].task;
    cardText.className = "card-text";

    // button-group-flex
    let buttonGroupFlex = document.createElement("div");
    buttonGroupFlex.className =
      "d-flex justify-content-between align-items-center";

    // button-group-flex-items
    let buttonGroupFlexItems = document.createElement("div");
    buttonGroupFlexItems.className = "btn-group-sm";
    buttonGroupFlexItems.role = "group";

    // edit-button
    let editButton = document.createElement("button");
    editButton.className = "btn btn-outline-primary mx-1";
    editButton.type = "button";
    let editIcon = document.createElement("i");
    editIcon.className = "fas fa-edit";
    editButton.appendChild(editIcon);

    // check-button
    let checkButton = document.createElement("button");
    checkButton.className = "btn btn-outline-primary mx-1";
    checkButton.type = "button";
    let checkIcon = document.createElement("i");
    checkIcon.className = "fas fa-check";
    checkButton.appendChild(checkIcon);

    // delete-button
    let deleteButton = document.createElement("button");
    deleteButton.className = "btn btn-outline-primary mx-1";
    deleteButton.type = "button";
    deleteButton.id = `delete-task-${i}`;
    let deleteIcon = document.createElement("i");
    deleteIcon.className = "fas fa-trash-alt";
    deleteButton.appendChild(deleteIcon);

    // Event listener para el botón de eliminar tarea
    deleteButton.addEventListener("click", (e) => {
      e.preventDefault();
      taskPosition = e.target.id.split("-")[2];
      deleteTask(taskPosition);
    });

    // created-text
    let createdText = document.createElement("small");
    createdText.className = "text-muted";
    createdText.textContent = `Creado el ${taskList[i].date}`;

    // agrega los elementos al DOM
    taskBody.appendChild(cardText);
    taskItem.appendChild(taskBody);
    buttonGroupFlex.appendChild(buttonGroupFlexItems);
    buttonGroupFlex.appendChild(createdText);
    buttonGroupFlexItems.appendChild(editButton);
    buttonGroupFlexItems.appendChild(checkButton);
    buttonGroupFlexItems.appendChild(deleteButton);
    taskBody.appendChild(buttonGroupFlex);

    updateLeftTasks(taskList.length);
    taskListDOM.appendChild(taskItem);
  }
}

// Función para obtener la fecha actual y agregar a la lista de tareas

const getDate = () => {
  let date = new Date();
  let { day, month, year, hour, min } = {
    day: date.getDate() < 10 ? "0" + date.getDate() : date.getDate(),
    month:
      date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1,
    year: date.getFullYear(),
    hour: date.getHours() < 10 ? "0" + date.getHours() : date.getHours(),
    min: date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(),
  };

  return `${day}/${month}/${year}  -  ${hour}:${min}`;
};

const addNewTask = (newTask) => {
  if (newTask !== "" && newTask) {
    taskList = [
      ...taskList,
      { task: newTask, date: getDate(), isCompleted: false },
    ];
    Toastify({
      text: `Nueva tarea creada`,
      duration: 2500,
      gravity: "bottom",
      position: "down",
      stopOnFocus: true,
      style: {
        background: "success",
      },
    }).showToast();
  }
};

const deleteTask = (taskToDelete) => {
  deleted = taskList.splice(taskToDelete, 1);
  localStorage.setItem("taskList", JSON.stringify(taskList));
  updateTasksOnDOM(taskList);
  updateLeftTasks(taskList.length);
};

// Función que tomaba desde prompt, hay que implementarla con DOM
const searchTask = (taskList) => {
  if (taskList.length === 0) {
    alert("La lista de tareas está vacía");
    return;
  }

  do {
    wordToSearch = prompt("Ingrese la tarea a buscar: ");
  } while (wordToSearch === "");

  let foundedTasks = "";
  let found = false;

  taskList.forEach((element, index) => {
    if (element.task.toLowerCase().search(wordToSearch.toLowerCase()) != -1) {
      foundedTasks += `${index}: ${element.task}  -  ${element.date}\n`;
      found = true;
    }
  });
  if (found)
    alert(
      `Las siguientes tareas contienen la palabra \"${wordToSearch}\" \n` +
        foundedTasks
    );
  else alert("No existen coincidencias");
};

Sortable.create(taskListDOM, {
  group: {
    name: "lista-tareas",
  },
  sort: true,
  animation: 300,
  easing: "cubic-bezier(0.34, 1.56, 0.64, 1)",

  // Evento que se ejecuta cuando se termina de arrastrar un elemento
  onEnd: function (event) {
    event.to;
    event.from;
    interchange(taskList, event.oldIndex, event.newIndex);
  },

  store: {
    set: function (sortable) {
      const orden = sortable.toArray();
      console.log(orden);

      //Reorder array according to a new order
      let reordererTaskList = [];

      for (const element of orden) {
        console.log(parseInt(element));
        reordererTaskList[parseInt(element)];
      }
    },
  },
});
