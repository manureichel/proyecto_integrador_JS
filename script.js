let input = "";
let taskList = [];
let fullTask = "";

let taskListDOM = document.getElementById("task--list");
let leftTasks = document.getElementById("left-text");

const updateLeftTasks = (left) => {
  leftTasks.innerText = `${left} tareas restantes`;
};

const updateTasksOnDOM = (taskToAdd) => {
  if (taskToAdd) {
    // si lo recibido no es undefined añado un item

    if (taskList.length > 0) {
      for (let task of taskList) {
        let taskItem = document.createElement("div");

        taskItem.innerHTML = `<li class="task--item">
      <input type="checkbox" name="check--item" class="check--task" />
      <p>${task.task}</p>
      <i class="fa-solid fa-xmark"></i>
      </li>`;

        taskListDOM.appendChild(taskItem);
      }
    }
  } else {
    // sino, limpio la lista para actualizar por eliminación de task
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

const checkList = () => {
  if (taskList.length === 0) alert("La lista de tareas está vacía");
  else {
    alert(`La lista tiene ${taskList.length} tareas:\n${fullTask}`);
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

do {
  input = prompt(
    "Opciones:\nIngresar una nueva tarea o una de las siguientes opciones: \nm- Mostrar Tareas \nl- Limpiar la lista\nb-Borrar Tarea \ns-Buscar Tarea \nf- Finalizar"
  );
  if (input === "m") {
    checkList();
  } else if (input === "l") {
    cleanTaskList();
  } else if (input === "b") {
    deleteTask();
  } else if (input === "s") {
    searchTask(taskList);
  } else if (input !== "f") {
    addNewTask(input);
  } else if (input === "f") {
    updateTasksOnDOM("all");
    updateLeftTasks(taskList.length);
  }
} while (input !== "f");
