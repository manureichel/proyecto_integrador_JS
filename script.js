const DateTime = luxon.DateTime;

const timestampToRelativeTime = (timestamp) =>
  DateTime.fromMillis(timestamp).minus({ seconds: 1 }).toRelative();

let taskList = [];
let isDragging = false;

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

const updateLeftTasks = (left) => {
  left
    ? (leftTasks.innerText = `Tareas: ${left}`)
    : (leftTasks.innerText = "No hay tareas");
};

const loadTaskList = () => {
  const taskListJSON = localStorage.getItem("taskList");
  if (taskListJSON) {
    taskList = JSON.parse(taskListJSON);
    updateTasksOnDOM(taskList);
    updateLeftTasks(taskList.length);
  }
};

loadTaskList();
updateLeftTasks(taskList.length);

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
  if (inputText.value.trim().length) {
    addNewTask(inputText.value);
    inputText.value = "";
    updateTasksOnDOM(taskList);
    updateLeftTasks(taskList.length);
    localStorage.setItem("taskList", JSON.stringify(taskList));
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "¡No puedes crear una tarea vacía!",
      timer: 2500,
    });
  }
};

// función para crear elementos nuevos desde updateTasksOnDOM();
function createNewElement(element) {
  let newElement = document.createElement(element.tagname);

  element.id ? (newElement.id = element.id) : null;
  element.attribute
    ? newElement.setAttribute(element.attribute.name, element.attribute.value)
    : null;
  element.class ? (newElement.className = element.class) : null;
  element.text ? (newElement.textContent = element.text) : null;
  element.type ? (newElement.type = element.type) : null;
  for (let i in element.appended) newElement.appendChild(element.appended[i]);

  return newElement;
}

function updateTasksOnDOM(taskList) {
  taskListDOM.innerHTML = "";
  for (let i in taskList) {
    // card-text
    let cardText = createNewElement({
      tagname: "p",
      class: "card-text",
      text: taskList[i].task,
    });

    // edit-button
    let editIcon = createNewElement({
      tagname: "i",
      class: "fas fa-edit",
    });

    let editButton = createNewElement({
      tagname: "button",
      class: "btn btn-outline-primary mx-1",
      type: "button",
      appended: [editIcon],
    });

    // check-button
    let checkIcon = createNewElement({
      tagname: "i",
      class: "fas fa-check",
    });

    let checkButton = createNewElement({
      tagname: "button",
      class: "btn btn-outline-primary mx-1",
      type: "button",
      appended: [checkIcon],
    });

    // delete-button
    let deleteIcon = createNewElement({
      tagname: "i",
      class: "fas fa-trash-alt",
      id: `delete-task-${i}`,
    });
    let deleteButton = createNewElement({
      tagname: "button",
      class: "btn btn-outline-danger mx-1",
      type: "button",
      appended: [deleteIcon],
    });

    // created-text
    let createdText = document.createElement("small");
    createdText.className = "text-muted";
    createdText.textContent = timestampToRelativeTime(taskList[i].date);

    // button-group-flex-items
    let buttonGroupFlexItems = createNewElement({
      tagname: "div",
      class: "btn-group-sm",
      id: "button-group-flex-items",
      appended: [editButton, checkButton, deleteButton],
    });

    // button-group-flex
    let buttonGroupFlex = createNewElement({
      tagname: "div",
      class: "d-flex justify-content-between align-items-center",
      appended: [buttonGroupFlexItems, createdText],
    });

    let dragItemIcon = createNewElement({
      tagname: "i",
      id: "drag-item",
      class: "drag-item fa-solid fa-arrows-up-down-left-right text-secondary",
    });

    // card-text and drag flex
    let cardAndDragFlex = createNewElement({
      tagname: "div",
      class: "d-flex justify-content-between align-items-lg-start",
      appended: [cardText, dragItemIcon],
    });

    let taskBody = createNewElement({
      tagname: "div",
      class: "card-body",
      appended: [cardAndDragFlex, buttonGroupFlex],
    });

    let taskItem = createNewElement({
      tagname: "div",
      class: "card shadow mb-3 mt-4",
      id: `task-${i}`,
      attribute: { name: "data-id", value: i },
      appended: [taskBody],
    });

    // Pone en verde las tareas terminadas
    taskList[i].isCompleted
      ? taskItem.classList.add("border-success", "light-green")
      : null;

    // Event listener para el botón de eliminar tarea
    eventListenerDelete = deleteButton.addEventListener("click", (e) => {
      e.preventDefault();
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
          taskList[i].task = text;
          localStorage.setItem("taskList", JSON.stringify(taskList));
          updateTasksOnDOM(taskList);
          Swal.fire({
            title: "La tarea se ha editado",
            icon: "success",
            timer: 1800,
          });
        }
      })();
    });

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
  handle: ".drag-item",
  sort: true,
  delay: 200,
  delayOnTouchOnly: true,
  animation: 300,
  easing: "cubic-bezier(0.34, 1.56, 0.64, 1)",

  // Evento que se ejecuta cuando se empieza a arrastrar un elemento
  onStart: function () {
    isDragging = true;
  },

  // Evento que se ejecuta cuando se termina de arrastrar un elemento
  onEnd: function (evt) {
    isDragging = false;
  },

  store: {
    set: function (sortable) {
      const orden = sortable.toArray();

      let reordererTaskList = [];

      for (let i = 0; i < orden.length; i++) {
        reordererTaskList[i] = taskList[parseInt(orden[i])];
      }
      taskList = structuredClone(reordererTaskList);
      localStorage.setItem("taskList", JSON.stringify(taskList));
      updateTasksOnDOM(taskList);
    },
  },
});

// Intro la primera vez que corre la aplicación

const getDemoArray = async () => {
  fetch("./demoArray.json")
    .then((response) => response.json())
    .then((data) => {
      taskList = data;
      localStorage.setItem("taskList", JSON.stringify(data));
      updateTasksOnDOM(data);
      runDemo();
    });
};

const hasRunIntro = localStorage.getItem("hasRunIntro"); // Para que se ejecute solo la priemra vez que se cargue la página
if (hasRunIntro !== "1") getDemoArray();

function runDemo() {
  introJs()
    .setOptions({
      nextLabel: "Siguiente",
      prevLabel: "Atrás",
      doneLabel: "¡Listo!",

      steps: [
        {
          intro:
            "Bienvenido al gestor de tareas. A continuación, una breve introducción.",
        },
        {
          element: inputText,
          intro: "En este campo ingresas el texto de la tarea...",
        },
        {
          element: addButton,
          intro:
            "... y presionando en este botón o la tecla enter creas la tarea",
        },
        {
          element: searchBox,
          intro:
            "En este campo podes buscar una tarea, los resultados se mostrarán a medida que existan coincidencias.",
        },
        {
          element: document.getElementById("filter-group"),
          intro: "Acá podes filtrar las tareas según esten terminadas o no.",
        },
        {
          element: document.getElementById("button-group-flex-items"),
          intro:
            "Esta es una tarea ya creada.Acá podes editar, chequear o borrar la tarea.",
        },
        {
          element: document.getElementById("drag-item"),
          intro:
            "Desde este ícono podes arrastrar las tareas para reordenarlas.",
        },
        {
          intro: "¡Ya podes empezar a trabajar!",
        },
      ],
    })
    .start();
  localStorage.setItem("hasRunIntro", "1");
}
