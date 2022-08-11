let taskList = [];

let taskListDOM = document.getElementById("task--list");
let leftTasks = document.getElementById("left-text");
let addButton = document.getElementById("add-button");
let inputText = document.getElementById("input-text");

const updateLeftTasks = (left) =>
  (leftTasks.innerText = `${left} tareas restantes`);

updateLeftTasks(leftTasks.length ? taskList.length : 0); // si no está definido se muestra 0 tareas restantes

const loadTaskList = () => {
  const taskListJSON = localStorage.getItem("taskList");
  if (taskListJSON) {
    taskList = JSON.parse(taskListJSON);
    updateTasksOnDOM(taskList);
    updateLeftTasks(taskList.length);
  }
};

loadTaskList();

addButton.onclick = (e) => {
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
  console.log(taskList);
  taskListDOM.innerHTML = "";
  for (let i in taskList) {
    let taskItem = document.createElement("li");
    taskItem.id = `task-${i}`;
    taskItem.className = "task--item";
    if (taskList[i].isCompleted)
      taskItem.classList.add("task--item--completed");

    // p para fecha
    let taskDate = document.createElement("p");
    taskDate.className = "task--date";
    taskDate.innerText = taskList[i].date;

    // checkbox para marcar la tarea como completada
    let taskCheckbox = document.createElement("input");
    taskCheckbox.checked = taskList[i].isCompleted;
    taskCheckbox.type = "checkbox";
    taskCheckbox.id = `check-${i}`;
    taskCheckbox.className = "check--task";

    taskCheckbox.addEventListener("click", (e) => {
      taskCheckbox.checked
        ? (taskList[i].isCompleted = true)
        : (taskList[i].isCompleted = false);
      localStorage.setItem("taskList", JSON.stringify(taskList));
      updateTasksOnDOM(taskList);
    });

    // contenido de la tarea
    let taskText = document.createElement("p");
    taskText.innerText = taskList[i].task;

    // botón para eliminar la tarea
    let deleteTaskButton = document.createElement("i");
    deleteTaskButton.className = "fa-solid fa-xmark";
    deleteTaskButton.id = `delete-task-${i}`;

    // Event listener para el botón de eliminar tarea
    deleteTaskButton.addEventListener("click", (e) => {
      e.preventDefault();
      taskPosition = e.target.id.split("-")[2];
      deleteTask(taskPosition);
    });

    // agrega los elementos al DOM
    taskItem.appendChild(taskCheckbox);
    taskItem.appendChild(taskText);
    taskItem.appendChild(taskDate);
    taskItem.appendChild(deleteTaskButton);
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
      text: "Tarea agregada",
      duration: 1500,
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
