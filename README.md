# Overview

Este proyecto fue desarrollado para el challenge de Conexa, integrando la [API de Rick & Morti](https://rickandmortyapi.com/documentation/#rest). Actualmente está desplegado en Vercel y usando un dominio propio en: https://conexa-challenge.arielsurco.dev/

## Funcionalidades solicitadas

- Listado de personajes en 2 secciones, con un paginado propio para cada una
- Cada card de personaje muestra el status y la especie
- Al seleccionar un personaje en cada sección, se muestran 3 secciones de episodios en los que aparecieron cada uno por separado y una para episodios en que aparecieron ambos

## Funcionalidades añadidas

### Validaciones

- Cuando se selecciona un personaje en una sección, se deshabilita en la otra para evitar que el usuario seleccione el mismo
- No se muestran las secciones de episodios hasta que no se hayan seleccionado 2 personajes
- Si no se encuentran episodios en los que haya salido un personaje X o en el que hayan salido ambos, la sección correspondiente mostrará un mensaje al usuario de "No episodes found"

### Responsive design

- La web se puede ver desde un celular con las secciones de personajes una debajo de la otra y teniendo una columna de cards cada una, a medida que la pantalla se agranda, cada sección puede llegar a tener hasta 2 columnas de cards de personajes
- Se limita a un ancho máximo el contenedor de toda la aplicación para evitar problemas en pantallas muy grandes
- Cuando se selecciona un personaje en una sección, si la otra sección no tiene personaje seleccionado, se lleva el scroll del usuario hasta la sección requerida. De esta forma logramos evitar la confusión del usuario (en Mobile) cuando no sabe qué hacer después de seleccionar un personaje.
- Si se seleccionaron personajes en ambas secciones, se lleva el scroll del usuario hasta la sección de episodios compartidos

### Performance

- Se agregó una estrategia de caché custom para el cliente, de forma que ambas secciones comparten un mismo contexto y si una sección ya llamó al servicio con un número de página X, cuando la misma sección vuelva a esa página no se va a volver a llamar al servicio, lo mismo cuando la otra sección solicita la misma página.

### Estados de carga

- Se buscó dar un feedback al usuario mientras se cargan los servicios del lado del Server (Listado de personajes) y del lado del Cliente (Paginado de personajes y listado de episodios)
- Se muestran skeleton cards para las secciones de personajes y para los listados de episodios
- Se tiene una pantalla global de carga para peticiones que se hacen desde el servidor (Easter Egg porque es difícil que se vea a menos que Vercel ande lento jajaj)

### Accesibilidad

- Se usan heading tags para los títulos de las secciones y cards
- Se usaron botones con un aria-label para las cards de personajes para indicar una acción clickeable y que el Screen Reader pueda leer "Select {NombrePersonaje}"
- Los botones de la paginación también tienen aria-labels para indicar "Go to previous page", "Go to page {NumeroPagina}" y "Go to next page" respectivamente

### Testing

- Se testearon la mayoría de los componentes logrando un coverage global del 96.77% y un coverage por componente mínimo del 84%

### Colores

- Se implementaron 2 paletas de colores para que la web pueda adaptarse a Light/Dark themes según la configuración del navegador del usuario

## Arquitectura de la aplicación

### Screaming Architecture

- Se implementó esta arquitectura separando el dominio en las carpetas `characters` y `episodes` dentro del `/src`.
- Dentro de cada carpeta de dominio se agregaron solo los componentes relacionados a la entidad, y se mantuvo una carpeta `shared` para gestionar componentes que sean o que puedan llegar a ser útiles en varios dominios
- También se separó un dominio de `containers` para poder manejar de cerca archivos de CSS del componente que renderiza una página, para evitar que a futuro la carpeta `app` se mantenga limpia porque debería utilizarse solo para Ruteo y definición de Endpoints del servidor

### Atomic Design

- Se implementó solo para la carpeta `shared/components` debido a que son los componentes más genéricos donde identificamos los componentes como `atomos`, `moleculas` y cuestiones de `layout`

### Flexibilidad

- Los componentes más genéricos (en carpeta `shared`) son flexibles dado que son atómicos y permiten utilizar cualquier prop que pueda recibir la Tag principal del componente

## Calidad y formato del código

- **Formato del código**: Implementé configuraciones de Prettier y Eslint para asegurar que el formato del código se mantenga consistente y seguir ciertas reglas de Eslint para evitar malas prácticas
- **Continuous Integration**: Trabajé con workflows de github actions para asegurarme de que los cambios que envíe a la rama principal no rompan mi rama productiva. En cada PR se ejecutaba un Pipeline que validaba que los tests funcionen y la build compile
- **Continuous Delivery**: En cada PR a la rama principal se corría un despliegue en Vercel con la versión más actualizada

## ¿Tienes que probarlo?

¡Es simple! Solo se tienen que seguir los siguientes pasos

```bash
## Clonar el repositorio
git clone https://github.com/ArielSurco/conexa-challenge.git

## Instalar dependencias
npm i

## Correr servidor de desarrollo
npm run dev
```

> **! Importante**
> Es necesario agregar un archivo `.env` con el valor de la URL de la API, dado que esto lo manejo como secretos, revisar el ejemplo en `.env.example`

## Notas finales

Me hubiera gustado agregar más features como un buscador por nombre de personaje en cada sección que además utilice un debounce para optimizar requests mientras le daba al usuario una forma más amigable de buscar sus personajes favoritos. Sin embargo, por cuestiones de tiempo lo voy a dejar hasta acá
