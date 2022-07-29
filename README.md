# 📝Task Manager 

## 💻Entrega: Eventos

Para esta entrega ya se encuentra funcionando la posibilidad de crear nuevas tareas a partir del ingreso del dato en la caja de texto y presionando el botón + o la tecla enter. 

Se hicieron modificaciones en la función que creaba en DOM una tarea, ahora es más modular, se tiene para cada elemento que forma una tarea la variable correspondiente: checkbox, texto y botón de eliminación. Cuando se crea una tarea se le asigna un id a la misma y un event listener para el checkbox y botón de eliminación.

Queda aún por implementar la lógica de eliminar una tarea y actualizar el DOM, además de marcarla como terminada con el checkbox. Por el momento se hace un console.log cuando se hace click en el botón o checkbox para verificar el event listener de cada uno de estos.


## ✏️ Funcionalidades

La idea del proyecto de es crear una aplicación web de manejo de tareas. Donde el usuario pueda agregar nuevas tareas a una lista y gestionarla.

### 🔜 Como funcionalidades a futuro se plantean:

* Crear y eliminar tareas individualmente.
* Hacer un check a tareas terminadas.
* Mostrar filtrando por tareas activas, terminadas, o todas.
* Limpiar todas las tareas.
* Visualización de hora de creación de tarea.
* Tarea con fecha de vencimiento y mostrar tiempo restante.
* Etiquetas para tareas urgentes.
* Tareas arrastrables para re-ubicarlas en la lista.