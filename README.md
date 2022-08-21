# 📝Task Manager 

## 💻 Entrega: Fetch

Se pide utilizar fetch para obtener información. Como este proyecto es bastante dinámico (no tiene muchos datos por defecto al comienzo), se plantea leer un archivo json con las tareas para la demo de la aplicación la primera vez que se corre la misma. 
Tendría más sentido hacer un fetch sobre los datos de toda la lista de tareas, pero sería necesario también mantener dichos datos actualizados. Por lo que estuve viendo, con node:fs podría hacer esto, pero a efectos de mantener lo mas "front" posible el proyecto me limité por ahora a hacer la lectura de los datos de una tarea demo.

Para ponerle onda, agregué un footer que en el que, mediante un fetch , se agrega una imagen random de un pokemon desde [ésta api](https://pokeapi.co/).
### ✏️ Sobre el proyecto

La idea del proyecto de es una aplicación web de manejo de tareas. Donde el usuario pueda agregar nuevas tareas a una lista y gestionarla.

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
