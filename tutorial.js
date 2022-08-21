export function runDemo() {
  introJs()
    .setOptions({
      nextLabel: "Siguiente",
      prevLabel: "Atrás",
      doneLabel: "¡Listo!",

      steps: [
        {
          intro:
            "Bienvenido al gestor de tareas. A continuación, te mostramos una breve introducción sobre cómo funciona.",
        },
        {
          element: document.getElementById("input-text"),
          intro: "En este campo ingresas el texto de la tarea",
        },
        {
          element: document.getElementById("add-button"),
          intro: "Y presionando en este botón o enter creas la tarea",
        },
        {
          element: document.getElementById("search-box"),
          intro: "En este campo podes buscar una tarea",
        },
        {
          element: document.getElementById("filter-group"),
          intro: "Acá podes filtrar las tareas según esten terminadas o no.",
        },
        {
          element: document.getElementById("task-0"),
          intro:
            "Esta es una tarea ya creada. Es posible crear otras y arrastrarlas para cambiar su posición",
        },
        {
          element: document.getElementById("button-group-flex-items"),
          intro: "Aquí podes editar, chequear o borrar la tarea.",
        },
        {
          intro: "¡Ya podes empezar a trabajar!",
        },
      ],
    })
    .start();
  localStorage.setItem("hasRunIntro", "1");
}
