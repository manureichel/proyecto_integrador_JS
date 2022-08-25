# 📝Task Manager
### ✏️ Sobre el proyecto

La idea del proyecto es una aplicación web de manejo de tareas. Donde el usuario pueda agregar nuevas tareas a una lista y gestionarla.
### 💻 Funcionalidades:
* Tutorial de uso en la primer ejecución.
* Crear y eliminar tareas individualmente.
* Edición de tareas.
* Búsqueda de Tareas.
* Hacer un check a tareas terminadas.
* Mostrar filtrando por tareas activas, terminadas, o todas.
* Visualización del dato de hace cuanto tiempo se creó la tarea.
* Drag n Drop: se pueden arrastrar tareas desde un ícono y reubicarlas.
* Almacenamiento en Local Storage.


### Librerías Utilizadas en el Proyecto:
#### ⏱️ Luxon

Se incluye Luxon para obtener de manera facil textos relativos de tiempo. De esta manera se agregan a cada tarea strings relacionados al tiempo que pasó desde que se creó la tarea.

#### 📤 Toastify 

Se agrega mediante Toastify JS un mensaje simple cuando se crea correctamente una tarea.

#### ⁉️ SweetAlert2

Con Sweet Alert implementé facilmente modales utilizados para la edición de tareas y para verificar que realmente se quiera eliminar una tarea.

#### 🔀 Sortable

Sortable es una librería que permite convertir una sección de contenido, como un div, en un objeto arrastrable. Se implementa esta librería para arrastrar las tareas y reordenarlas. Se trabajó además con [Easings](https://easings.net/) para la animación a la hora de arrastrar.
#### 🧑🏻‍🏫 Intro.js

Se incorpora la librería Intro.js. La misma se ejecuta solamente la primeras vez que se hace uso de la aplicación. Realiza un recorrido de cada uno de los elementos de la aplicación a modo de tutorial.

