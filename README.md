# 📝Task Manager 

## 💻 Entrega: Librerías

En esta entrega se incorporan librerías para agregar funcionalidades de manera sencilla al proyecto. Además se reemplaza el CSS utilizado hasta el momento por Bootstrap. 
Se incorporan las funcionalidades de edición de tareas y mostrar filtrando por Todas, Finalizadas y pendientes.

Las librerías agregadas son:

### ⏱️ Luxon

Anteriormente ya se trabajaba con fechas mediante el objeto Date incluído de manera nativa en JS. Ahora se incluye Luxon para obtener de manera facil textos relativos de tiempo. De esta manera se agregan a cada tarea strings relacionados al tiempo que pasó desde que se creó la tarea.

### 📤 Toastify 

Se agrega mediante Toastify JS un mensaje simple cuando se crea correctamente una tarea.

### ⁉️ SweetAlert2

Con Sweet Alert implementé facilmente modales utilizados para la edición de tareas y para verificar que realmente se quiera eliminar una tarea.

### 🔀 Sortable

Sortable es una librería que permite convertir una sección de contenido, como un div, en un objeto arrastrable. Se implementa esta librería para arrastrar las tareas y reordenarlas. Se trabajó además con [Easings](https://easings.net/) para la animación a la hora de arrastrar.

## ✏️ Funcionalidades del proyecto

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