# FIFALICHI - HIGHER OR LOWER
---

## Índice

- [Descripción del Proyecto](#descripción-del-proyecto)
- [Demostración de funciones y aplicaciones](#demostración-de-funciones-y-aplicaciones)
  - [Registro e inicio de sesión](#1-registro-e-inicio-de-sesión)
  - [Menú principal](#2-menú-principal)
  - [Modo de juego](#3-modo-de-juego)
  - [Filtros](#4-filtros)
  - [Partida (Higher o Lower)](#5-partida-higher-o-lower)
  - [Tabla de puntajes](#6-tabla-de-puntajes)
  - [Panel de administración](#7-panel-de-administración)
  - [API / Backend](#8-api--backend)
- [Personas Contribuyentes](#personas-contribuyentes)

---

## Descripción del Proyecto

**FIFALICHI HoL** es un juego web inspirado en la dinámica *"Higher or Lower"*, donde se presentan dos cartas de futbolistas y el jugador debe adivinar cuál de las dos tiene el valor más alto en una estadística determinada (tiro, pase, ritmo, físico, defensa, regate, altura o peso). Cada acierto suma puntos y el objetivo es alcanzar el puntaje más alto posible antes de fallar.

El proyecto está dividido en dos grandes bloques:

- **Front** (`/Front`): la interfaz del juego, construida en HTML, CSS y JavaScript puro (vanilla JS), con pantallas de login/registro, menú, filtros, selección de modo, juego y tabla de puntajes.
- **Back** (`/Back`): una API REST desarrollada en **Node.js** con **Express**, conectada a una base de datos **MySQL**, encargada de gestionar usuarios, jugadores/cartas, filtros y puntajes de las partidas.

### Principales tecnologías utilizadas

| Capa | Tecnologías |
|---|---|
| Frontend | HTML5, CSS3, JavaScript (vanilla) |
| Backend | Node.js, Express, body-parser, cors, nodemon |
| Base de datos | MySQL (mediante `mysql2/promise`) |

---

## Demostración de funciones y aplicaciones

A continuación se describe el recorrido funcional de la aplicación, pantalla por pantalla.

### 1. Registro e inicio de sesión
Pantalla inicial (`index.html`) donde el usuario puede:
- Iniciar sesión con **mail** y **contraseña**.
- Registrarse ingresando un **nombre de usuario**.

### 2. Menú principal
Desde `menu.html` el usuario accede a las distintas secciones del juego:
- **Jugar**: inicia una partida.
- **Filtros**: define qué jugadores pueden aparecer en la partida.
- **Modo**: elige la estadística por la cual se va a jugar.
- **Tabla de puntaje**: consulta el ranking de puntajes.
- **Cerrar sesión**.

También incluye un botón de **instrucciones (i)** que explica la mecánica del juego:
> "En el juego van a aparecer 2 cartas de jugadores y una estadística de ellas (por ejemplo tiro, pase, etc.) y hay que adivinar cuál de las 2 es más alta y seguir hasta conseguir el puntaje más alto."

### 3. Modo de juego
En `mode.html` se selecciona la estadística sobre la que se va a jugar:

`Tiro` · `Pase` · `Ritmo` · `Físico` · `Defensa` · `Regate` · `Altura` · `Peso`

### 4. Filtros
En `filters.html` se puede restringir qué jugadores aparecen en la partida, filtrando por:
- **País**
- **Liga**
- **Posición**

### 5. Partida (Higher o Lower)
En `game.html` se muestran dos cartas de jugadores (foto, nombre y estadística según el modo elegido) y el usuario debe elegir cuál tiene el valor más alto. Al finalizar la partida se muestra el **puntaje final**, con la opción de guardarlo o volver al menú.

### 6. Tabla de puntajes
En `points.html` se puede consultar el ranking de puntajes con distintas vistas:
- **Personal** o **Todos** los usuarios.
- **Ultima semana** o **Histórico**.

### 7. Panel de administración
`admin.html` permite a un usuario administrador gestionar la base de jugadores:
- **Crear** un nuevo futbolista (nombre, país, liga, posición, estadísticas de su carta, etc.).
- **Editar** un futbolista existente.
- **Eliminar** un futbolista por ID.

### 8. API / Backend
El servidor Express (`Back/index.js`) expone, entre otros, los siguientes endpoints:

| Método | Endpoint | Descripción |
|---|---|---|
| `GET` | `/jugadores` | Devuelve jugadores/cartas (con filtro opcional por categoría) |
| `POST` | `/jugadores` | Crea un nuevo jugador y su carta |
| `PUT` | `/jugadores` | Edita un jugador y su carta |
| `DELETE` | `/jugadores` | Elimina un jugador y su carta |
| `GET` | `/usuarios` | Lista los usuarios registrados |
| `POST` | `/usuarios` | Registra un nuevo usuario |
| `POST` | `/login` | Autentica un usuario (mail + contraseña) |
| `GET` | `/id_pais` / `/id_liga` | Obtiene identificadores por país o liga |
| `GET` | `/filtro` | Devuelve los valores más frecuentes de una categoría |
| `POST` / `GET` | `/puntaje` | Guarda y consulta puntajes de partidas |

La conexión a la base de datos se realiza mediante el módulo `Back/modulos/mysql.js`, utilizando variables de entorno (`MYSQL_HOST`, `MYSQL_USERNAME`, `MYSQL_PASSWORD`, `MYSQL_DB`).

---

## Personas Contribuyentes

Proyecto desarrollado por:

- **Borda**
- **Garcea**
- **Piscolichi**
- **Rey**