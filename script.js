const DateTime = luxon.DateTime;

const timestampToRelativeTime = (timestamp) =>
  DateTime.fromMillis(timestamp).minus({ seconds: 1 }).toRelative();

let taskList = [];

let taskListDOM = document.getElementById("task--list");
let leftTasks = document.getElementById("left-text");
let addButton = document.getElementById("add-button");
let inputText = document.getElementById("input-text");
let searchBox = document.getElementById("search-box");
let showAllButton = document.getElementById("show-all-button");
let showActiveButton = document.getElementById("show-active-button");
let showCompletedButton = document.getElementById("show-completed-button");

showAllButton.addEventListener("click", () => {
  updateTasksOnDOM(taskList);
});

showActiveButton.addEventListener("click", () => {
  const taskFiltrada = taskList.filter((task) => !task.isCompleted);
  updateTasksOnDOM(taskFiltrada);
});

showCompletedButton.addEventListener("click", () => {
  const taskFiltrada = taskList.filter((task) => task.isCompleted);
  updateTasksOnDOM(taskFiltrada);
});

const updateLeftTasks = (left) =>
  (leftTasks.innerText = `${left} tareas restantes`);

const loadTaskList = () => {
  const taskListJSON = localStorage.getItem("taskList");
  if (taskListJSON) {
    taskList = JSON.parse(taskListJSON);
    updateTasksOnDOM(taskList);
    updateLeftTasks(taskList.length);
  }
};

loadTaskList();

updateLeftTasks(leftTasks.length ? taskList.length : 0); // si no está definido se muestra 0 tareas restantes

// event listener para searchBox
searchBox.onkeyup = (e) => {
  const searchText = e.target.value.toLowerCase();
  const filteredTasks = taskList.filter((task) =>
    task.task.toLowerCase().includes(searchText)
  );
  updateTasksOnDOM(filteredTasks);
};

addButton.onclick = (e) => {
  e.preventDefault();
  if (inputText.value !== "") {
    addNewTask(inputText.value);
    inputText.value = "";
    updateTasksOnDOM(taskList);
    updateLeftTasks(taskList.length);
    localStorage.setItem("taskList", JSON.stringify(taskList));
  } else {
    //sweet alert para que no se pueda crear una tarea vacía
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "¡No puedes crear una tarea vacía!",
      timer: 2500,
    });
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
    taskList[i].isCompleted
      ? taskItem.classList.add("border-success", "light-green")
      : "";

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
    deleteIcon.id = `delete-task-${i}`;
    deleteButton.appendChild(deleteIcon);

    // Event listener para el botón de eliminar tarea
    deleteButton.addEventListener("click", (e) => {
      e.preventDefault();
      console.log(e.target.id);
      taskPosition = e.target.id.split("-")[2];

      Swal.fire({
        title: "¿Estás seguro que deseas borrar la tarea?",
        text: "Se eliminará permanentemente",
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "¡Sí, borrala!",
      }).then((result) => {
        if (result.isConfirmed) {
          console.log("voy a borrar: ", taskPosition);
          deleteTask(taskPosition);
          Swal.fire({
            title: "¡Borrada!",
            text: "La tarea fue eliminada",
            icon: "success",
            timer: 1800,
          });
        }
      });
    });

    // Event listener para el botón de checkear tarea
    checkButton.addEventListener("click", (e) => {
      taskList[i].isCompleted = !taskList[i].isCompleted;
      localStorage.setItem("taskList", JSON.stringify(taskList));
      updateTasksOnDOM(taskList);
    });

    // Event listener para el botón de editar

    editButton.addEventListener("click", (e) => {
      (async () => {
        const { value: text } = await Swal.fire({
          input: "textarea",
          inputLabel: "Editar la tarea",
          inputPlaceholder: taskList[i].task,
          inputAttributes: {
            "aria-label": "Edita aquí la tarea",
          },
          showCancelButton: true,
        });

        if (text) {
          console.log(text, i);
          taskList[i].task = text;
          updateTasksOnDOM(taskList);
          Swal.fire({
            title: "La tarea se ha editado",
            icon: "success",
            timer: 1800,
          });
        }
      })();
    });

    // created-text
    let createdText = document.createElement("small");
    createdText.className = "text-muted";
    createdText.textContent = timestampToRelativeTime(taskList[i].date);

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

const addNewTask = (newTask) => {
  if (newTask !== "" && newTask) {
    taskList = [
      {
        task: newTask,
        date: Date.now(),
        isCompleted: false,
      },
      ...taskList,
    ];
    Toastify({
      text: `Nueva tarea creada`,
      duration: 2500,
      gravity: "top",
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

Sortable.create(taskListDOM, {
  group: {
    name: "lista-tareas",
  },
  sort: true,
  delay: 200,
  delayOnTouchOnly: true,
  animation: 300,
  easing: "cubic-bezier(0.34, 1.56, 0.64, 1)",

  // Evento que se ejecuta cuando se termina de arrastrar un elemento
  onEnd: function (event) {
    event.to;
    event.from;
    // interchange(taskList, event.oldIndex, event.newIndex);
  },

  store: {
    set: function (sortable) {
      const orden = sortable.toArray();
      console.log(orden);

      //Reorder array according to a new order
      let reordererTaskList = [];

      for (let i = 0; i < orden.length; i++) {
        console.log(parseInt(orden[i]));
        reordererTaskList[i] = taskList[parseInt(orden[i])];
      }
      taskList = structuredClone(reordererTaskList);
      localStorage.setItem("taskList", JSON.stringify(taskList));
      updateTasksOnDOM(taskList);
      console.log("taskList", taskList);
    },
  },
});
