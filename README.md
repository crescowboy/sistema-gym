# Sistema de Gimnasio

Este es un sistema de gestión de gimnasios creado con Next.js, TypeScript, Tailwind CSS y MongoDB.

## Funcionalidades

- Gestión de Usuarios
- Gestión de Clientes
- Gestión de Entrenadores
- Gestión de Pagos
- Gestión de Suscripciones
- Gestión de Horarios
- Reportes
- Recordatorios de Suscripción

## Cómo Empezar

### Prerrequisitos

- Node.js (v18 o superior)
- npm
- MongoDB

### Instalación

1.  **Clona el repositorio:**

    ```bash
    git clone https://github.com/tu-usuario/sistema-gym.git
    cd sistema-gym
    ```

2.  **Instala las dependencias:**

    ```bash
    npm install
    ```

3.  **Configura las variables de entorno:**

    Crea un archivo `.env.local` en la raíz del proyecto y añade la URI de tu base de datos de MongoDB:

    ```env
    MONGODB_URI=mongodb://localhost:27017/gimnasio
    ```

4.  **Inicia la aplicación:**

    ```bash
    npm run dev
    ```

    La aplicación estará disponible en [http://localhost:3000](http://localhost:3000).

## Estructura del Proyecto

-   `src/app/(pages)`: Contiene las páginas principales de la aplicación.
-   `src/app/api`: Contiene las rutas de la API.
-   `src/components`: Contiene los componentes de React utilizados en la aplicación.
-   `src/components/core`: Contiene los componentes de formulario reutilizables.
-   `src/hooks`: Contiene los hooks personalizados de React.
-   `src/lib`: Contiene las utilidades y la configuración de la base de datos.
-   `src/models`: Contiene los modelos de Mongoose para la base de datos.

## Scripts Disponibles

-   `npm run dev`: Inicia el servidor de desarrollo.
-   `npm run build`: Compila la aplicación para producción.
-   `npm run start`: Inicia el servidor de producción.
-   `npm run lint`: Ejecuta el linter de ESLint.