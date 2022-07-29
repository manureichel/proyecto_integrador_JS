let input = "";
let taskList = [];
let fullTask = "";
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
  if (taskList.length > 0) {
    // li correspondiente a cada tarea
    let taskItem = document.createElement("li");
    taskItem.id = `task-${taskList.length - 1}`;
    taskItem.className = "task--item";

    // checkbox para marcar la tarea como completada
    let taskCheckbox = document.createElement("input");
    taskCheckbox.type = "checkbox";
    taskCheckbox.id = `check-${taskList.length - 1}`;
    taskCheckbox.className = "check--task";

    taskCheckbox.addEventListener("click", (e) => {
      if (taskCheckbox.checked) {
        console.log(`Tarea ${e.target.id} completada`);
      } else {
        console.log(`Tarea ${e.target.id} no completada`);
      }
    });

    // contenido de la tarea
    let taskText = document.createElement("p");
    taskText.innerText = taskList[taskList.length - 1].task;

    // botón para eliminar la tarea
    let deleteTaskButton = document.createElement("i");
    deleteTaskButton.className = "fa-solid fa-xmark";
    deleteTaskButton.id = `delete-task-${taskList.length - 1}`;

    // Event listener para el botón de eliminar tarea
    deleteTaskButton.addEventListener("click", (e) => {
      e.preventDefault();
      console.log("id=" + e.target.id);
      // acá llamamos a una función que elimine la tarea de la lista
    });

    // agrega los elementos al DOM
    taskItem.appendChild(taskCheckbox);
    taskItem.appendChild(taskCheckbox);
    taskItem.appendChild(taskText);
    taskItem.appendChild(deleteTaskButton);
    taskListDOM.appendChild(taskItem);
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

const updateFullTask = () => {
  fullTask = "";
  taskList.forEach((element, index) => {
    fullTask += `[${index}]: ${element.task}  -  ${element.date}\n`;
  });
};

const cleanTaskList = () => {
  taskList = [];
  alert("Se ha limpiado la lista de tareas");
};

const addNewTask = (newTask) => {
  if (newTask !== "" && newTask) {
    taskList.push({ task: newTask, date: getDate() });
    updateFullTask();
  }
};

const deleteTask = () => {
  if (taskList.length === 0) {
    alert("La lista de tareas está vacía");
    return;
  }
  let taskToDelete = prompt(`Qué número de tarea desea eliminar?\n${fullTask}`);
  if (taskToDelete < taskList.length && taskToDelete >= 0 && taskToDelete) {
    deleted = taskList.splice(taskToDelete, 1);
    alert(`Se eliminó la tarea: "${deleted[0].task}"`);
    updateFullTask();
    updateTasksOnDOM();
  } else alert("El número de tarea ingresado no es válido");
};
