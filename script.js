let input = "";
let taskList = [];
let fullTask = "";

const updateFullTask = () => {
  fullTask = "";
  taskList.forEach((element, index) => {
    fullTask += `[${index}]: ${element.task}\n`;
  });
};

const cleanTaskList = () => {
  taskList = [];
  alert("Se ha limpiado la lista de tareas");
};

const addNewTask = (newTask) => {
  if (newTask !== "" && newTask) {
    taskList.push({ task: newTask });
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
  console.log(taskToDelete);
  if (taskToDelete < taskList.length && taskToDelete >= 0 && taskToDelete) {
    deleted = taskList.splice(taskToDelete, 1);
    alert(`Se eliminó la tarea: "${deleted[0].task}"`);
    updateFullTask();
  } else alert("El número de tarea ingresado no es válido");
};

do {
  input = prompt(
    "Opciones:\nIngresar una nueva tarea o una de las siguientes opciones: \nm- Mostrar Tareas \nl- Limpiar la lista\nb-Borrar Tarea \nf- Finalizar"
  );
  if (input === "m") {
    checkList();
  } else if (input === "l") {
    cleanTaskList();
  } else if (input === "b") {
    deleteTask();
  } else if (input !== "f") {
    addNewTask(input);
  }
} while (input !== "f");
