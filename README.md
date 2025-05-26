# TaskUser_ImagineApps
Repositorio de prueba técnica desarrollada


He desarrollado una aplicación para la gestión de tareas utilizando Angular en el frontend y Node.js en el backend. Para mantener un código limpio, modular y escalable, he implementado la arquitectura de Diseño Dirigido por el Dominio (DDD), lo que me permite organizar la lógica del negocio en diferentes capas bien definidas.

En el backend, la lógica de negocio está separada en dominios, servicios y repositorios, lo que facilita el mantenimiento y la evolución del sistema. Cada parte tiene una responsabilidad clara: los dominios modelan las reglas y entidades principales, los servicios coordinan las operaciones y los repositorios gestionan la persistencia de datos.

Para asegurar que solo usuarios autorizados puedan acceder a los servicios, he implementado autenticación mediante JSON Web Tokens (JWT). Cuando un usuario se autentica, recibe un token que se utiliza en las solicitudes posteriores para validar su identidad y permisos. Esto garantiza que las operaciones sobre las tareas, como creación, actualización o eliminación, estén protegidas y solo sean accesibles para usuarios autenticados.

En el frontend, Angular me permite crear una interfaz dinámica, reactiva y fácil de usar. La comunicación con el backend se hace a través de servicios HTTP que incluyen el token JWT en los headers para autenticar cada petición. Además, he incorporado funcionalidades como búsqueda y filtrado de tareas, creación, actualización del estado y eliminación, todo con una experiencia de usuario intuitiva y fluida.

En resumen, esta aplicación combina buenas prácticas de arquitectura, seguridad y experiencia de usuario para ofrecer una solución robusta y eficiente en la gestión de tareas.
