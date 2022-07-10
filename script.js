let taskList = "";
let input = "";
let numTask = 0;

const cleanTaskList = () => {
  taskList = "";
  numTask = 0;
};

const addNewTask = (newTask) => {
  if (newTask !== "") {
    taskList = taskList + "\n" + newTask;
    numTask++;
  }
};

const checkList = () => {
  if (taskList === "") prompt("La lista de tareas está vacía");
  else prompt(`La lista tiene ${numTask} tareas:\n${taskList}`);
};

do {
  input = prompt(
    "Opciones:\nIngresar una nueva tarea \nm- Mostrar Tareas \nl- Limpiar la lista \nf- finalizar"
  );
  if (input === "m") {
    checkList();
  } else if (input === "l") {
    cleanTaskList();
  } else if (input !== "f") {
    addNewTask(input);
  }
} while (input !== "f");
