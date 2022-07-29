let input = "";
let taskList = [];
let taskDomArray = [];

let taskListDOM = document.getElementById("task--list");
let leftTasks = document.getElementById("left-text");
let addButton = document.getElementById("add-button");
let inputText = document.getElementById("input-text");

const updateLeftTasks = (left) =>
  (leftTasks.innerText = `${left} tareas restantes`);

updateLeftTasks(leftTasks.length ? taskList.length : 0); // si no está definido van 0 tareas restantes

addButton.onclick = (e) => {
  e.preventDefault();
  if (inputText.value !== "") {
    addNewTask(inputText.value);
    inputText.value = "";
    updateTasksOnDOM(taskList);
    updateLeftTasks(taskList.length);
  }
};

const updateTasksOnDOM = (taskList) => {
  taskListDOM.innerHTML = "";

  if (taskList.length > 0) {
    for (let i in taskList) {
      let taskItem = document.createElement("li");
      taskItem.id = `task-${i}`;
      taskItem.className = "task--item";
      if (taskList[i].isCompleted)
        taskItem.classList.add("task--item--completed");

      // checkbox para marcar la tarea como completada
      let taskCheckbox = document.createElement("input");
      taskCheckbox.checked = taskList[i].isCompleted;
      taskCheckbox.type = "checkbox";
      taskCheckbox.id = `check-${i}`;
      taskCheckbox.className = "check--task";

      taskCheckbox.addEventListener("click", (e) => {
        if (taskCheckbox.checked) {
          taskList[i].isCompleted = true;
        } else {
          taskList[i].isCompleted = false;
        }
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
      taskItem.appendChild(taskCheckbox);
      taskItem.appendChild(taskText);
      taskItem.appendChild(deleteTaskButton);
      updateLeftTasks(taskList.length);
      taskListDOM.appendChild(taskItem);
    }
  } else {
    taskListDOM.innerHTML = "";
    updateLeftTasks(taskList.length);
  }
};

// Función para obtener la fecha actual y agregar a la lista de tareas
const getDate = () => {
  let date = new Date();
  return `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}  -  ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
};

const addNewTask = (newTask) => {
  if (newTask !== "" && newTask) {
    taskList.push({ task: newTask, date: getDate(), isCompleted: false });
  }
};

const deleteTask = (taskToDelete) => {
  deleted = taskList.splice(taskToDelete, 1);
  updateTasksOnDOM(taskList);
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
