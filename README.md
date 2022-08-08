# 📝Task Manager 

## 💻 Entrega: Operadores Avanzados

Para esta segunda entrega se optimiza el código utilizando operadores avanzados.

* Ya se venía utilizando operador ternario en otras entregas, pero se añade el mismo en otros if/else.
* En la función que obtiene la fecha se realiza una desestructuración, lo que mejora la legibilidad.
* Se utiliza el operador spread en la función de añadir nueva tarea.
* Se eliminan algunos if innecesario, como el que verificaba que la longitud sea mayor que cero en la función de updateTasksOnDom. La misma se llama de manera controlada desde otras instancias, por lo que no es necesaria esa verificación.
* Se agrega al DOM la fecha. 

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