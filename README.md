# Portfolio95

[![live_preview](https://img.shields.io/badge/live_preview-000?style=for-the-badge&logo=vercel&logoColor=white)](https://portfolio95-silk.vercel.app/)
[![behance](https://img.shields.io/badge/behance-1769FF?style=for-the-badge&logo=behance&logoColor=white)](https://www.behance.net/ingfranciscastillo)

> Un portfolio interactivo inspirado en el escritorio clásico de Windows 95

![Portfolio95 Preview](/screenshot.png)

## Sobre el Proyecto

Portfolio95 es un portfolio interactivo que recrea la experiencia del icónico escritorio de Windows 95 en la web. Presento mis proyectos, skills y experiencia a través de ventanas arrastrables, menús contextuales auténticos y una experiencia retro operativa.

## Windows 95: Un Icono de la Computación

Lanzado el 24 de agosto de 1995, Windows 95 representó una revolución en la computación personal. Por primera vez, millones de usuarios pudieron experimentar una interfaz gráfica intuitiva con el icónico botón Start, la barra de tareas y ventanas que podían arrastrarse libremente por la pantalla.

Más que un sistema operativo, Windows 95 definió toda una era: los sonidos de inicio, los degradés azulados, los botones 3D con efecto relieve (bevel), y esa sensación única de "mi PC" siguen siendo icónicos para toda una generación de desarrolladores que creció frente a monitores CRT. El diseño skeumórfico de Microsoft en los 90 estableció convenciones de UI que aún hoy influyen en cómo esperamos que funcione una interfaz.

## Arquitectura

- **React Router 7** para rutas y navegación
- **Zustand** para estado global (ventanas, apps, escritorio)
- **React RND** para ventanas arrastrables y redimensionables

## Stack Técnico

- React 19
- React Router 7
- React RND
- Zustand
- Tailwind CSS v4
- TypeScript
- Vite

## Estructura

```
app/
├── apps/          # Apps simuladas (Notepad, Paint, Minesweeper...)
├── os/            # Componentes del SO (Desktop, Window, Taskbar, BootScreen)
├── mobile/        # Shell móvil
├── assets/        # Iconos e imágenes
├── content/       # Datos (resume.json)
└── routes/        # Rutas de la app
```

## Features

- Ventanas arrastrables y redimensionables
- Menú Start con lista de apps
- Menú contextual en escritorio e iconos
- Múltiples apps funcionales
- Diseño responsive (escritorio + móvil)
- Sonidos clásicos de Windows 95

## Licencia

MIT © Francis Castillo

---

Gracias por ver el proyecto 💙
