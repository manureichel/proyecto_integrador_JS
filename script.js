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
  addNewTask(inputText.value);
  inputText.value = "";
  updateTasksOnDOM(taskList);
  updateLeftTasks(taskList.length);
};

const updateTasksOnDOM = (taskList) => {
  if (taskList.length > 0) {
    let taskItem = document.createElement("li");

    taskItem.id = `task-${taskList.length - 1}`;

    taskItem.innerHTML = `<li class="task--item" id="task-${
      taskList.length - 1
    }">
      <input type="checkbox" name="check--item" class="check--task" id="check-${
        taskList.length - 1
      }"/>
      <p>${taskList[taskList.length - 1].task}</p>
      <i class="fa-solid fa-xmark" id="delete-task-${taskList.length - 1}"></i>
      </li>`;
    taskListDOM.appendChild(taskItem);
  } else {
    taskListDOM.innerHTML = "";
    updateLeftTasks(taskList.length);
  }
};

// const updateTasksOnDOM = (taskList) => {
//   if (taskList.length > 0) {
//     let taskItem = document.createElement("div");

//     taskItem.innerHTML = `<li class="task--item" id="task-${
//       taskList.length - 1
//     }">
//       <input type="checkbox" name="check--item" class="check--task" id="check-${
//         taskList.length - 1
//       }"/>
//       <p>${taskList[taskList.length - 1].task}</p>
//       <i class="fa-solid fa-xmark" id="delete-task-${taskList.length - 1}"></i>
//       </li>`;
//     taskListDOM.appendChild(taskItem);
//   } else {
//     taskListDOM.innerHTML = "";
//     updateLeftTasks(taskList.length);
//   }
// };

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
    console.log(taskList);
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

// do {
//   input = prompt(
//     "Opciones:\nIngresar una nueva tarea o una de las siguientes opciones: \nm- Mostrar Tareas \nl- Limpiar la lista\nb-Borrar Tarea \ns-Buscar Tarea \nf- Finalizar"
//   );
//   if (input === "m") {
//     checkList();
//   } else if (input === "l") {
//     cleanTaskList();
//   } else if (input === "b") {
//     deleteTask();
//   } else if (input === "s") {
//     searchTask(taskList);
//   } else if (input !== "f") {
//     addNewTask(input);
//   } else if (input === "f") {
//     updateTasksOnDOM("all");
//     updateLeftTasks(taskList.length);
//   }
// } while (input !== "f");
