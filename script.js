let input = "";
let taskList = [];
let fullTask = "";

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
  }
  updateFullTask();
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
  let taskToDelete = prompt(`Qué número tarea desea eliminar?\n${fullTask}`);
  if (taskToDelete < taskList.length && taskToDelete >= 0 && taskToDelete) {
    deleted = taskList.splice(taskToDelete, 1);
    alert(`Se eliminó la tarea: "${deleted[0].task}"`);
    updateFullTask();
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
  }
} while (input !== "f");
