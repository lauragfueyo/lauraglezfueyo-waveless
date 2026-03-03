### Aspectos técnicos
Para el desarrollo del proyecto he optado por utilizar Vite con una configuración básica, lo que permite un entorno de desarrollo rápido y ágil.

Las tecnologías empleadas han sido HTML5, Vue, SASS y JavaScript. Aunque el uso de frameworks no era obligatorio, he decidido utilizar Vue porque estoy familiarizada con él y me permite gestionar el dinamismo de la página y pequeñas interacciones (como mostrar/ocultar elementos) de forma más clara y mantenible, reduciendo la complejidad del código.

La estructura de carpetas es la siguiente:
- **Assets**: Recursos gráficos.
- **Components**: Componentes de Vue.
- **JS**: Ficheros JavaScript. En este caso he utilizado un único archivo para funcionalidades genéricas del proyecto y el renderizado de los componentes de Vue.
- **CSS**: Estilos del proyecto. La estructura interna está organizada para facilitar su mantenimiento y escalabilidad:
  - **Base**: Estilos base del portal.
    - `normalize`: Reset de estilos por defecto del navegador.
    - `screen-reader`: Clase para ocultar contenido visualmente manteniéndolo accesible para lectores de pantalla.
  - **Components**: Hojas de estilo específicas de cada componente Vue.
  - **Generic**: Estilos reutilizables en todo el portal (botones, tooltips, cards).
  - **Layout**: Estilos estructurales principales (header, nav, container, footer).
  - **Tools**: Variables, mixins y utilidades SASS compartidas.

He mantenido el archivo principal `style.scss` en la raíz de la carpeta CSS, ya que en este proyecto solo es necesario un punto de entrada. En proyectos de mayor tamaño podría contemplarse una estructura adicional (por ejemplo, una carpeta `theme` o múltiples entry points por página).

En cuanto a los recursos gráficos, he utilizado formatos modernos como WebP y SVG para optimizar el rendimiento, lo que contribuye positivamente a la carga de la página.

Se ha trabajado el etiquetado semántico y el uso de atributos ARIA para reforzar la accesibilidad, buscando que el contenido sea perceptible, operable, comprensible y robusto para todos los usuarios, independientemente de sus capacidades o del dispositivo utilizado.

El desarrollo se ha realizado con enfoque mobile-first, garantizando una correcta visualización y adaptación en distintos dispositivos.



Etiquetado semnatico y uso de marcado aria para potenciar la accesibilidad de la página. Creando contenido que pueda ser perceptible, operable, comprensible y robusto para todos los usuarios, independientemente de sus capacidad físicas, cognitivas o tecnológicas.

Web adaptable mobile first para la correcta visulización en los diferentes dispositivos.

## Comentarios
Me gustaría compartir algunos detalles observados durante la maquetación:

- En los textos del carrusel, el tamaño del título y la descripción en versión escritorio es inferior al de resoluciones más pequeñas. He mantenido las medidas indicadas para ser fiel al diseño, aunque me ha resultado llamativo.
- En el footer ocurre algo similar con el logotipo: en escritorio está centrado, mientras que en resoluciones pequeñas aparece alineado a la izquierda, manteniéndose el texto legal centrado. Lo indico por si pudiera tratarse de una pequeña inconsistencia de diseño.
- Revisando las distintas pantallas del Figma, he observado que en la página de “Organismos” existe un popup (posiblemente para el detalle de cada viaje). Al no estar incluido en la página principal ni formar parte de los elementos solicitados en la prueba, no lo he maquetado.

## Instalación y requisitos

- **Node.js**: versión mínima recomendada v22.12.0.
- **Gestor de paquetes**: `npm` (incluido con Node), `yarn` o `pnpm`.

### Pasos para ejecutar el proyecto en local

1. Clona el repositorio (o descarga y extrae el ZIP):

```bash
git clone <URL-del-repo>
cd <nombre-del-proyecto>
```

2. Instala dependencias:

```bash
# npm
npm install

# yarn
yarn install

# pnpm
pnpm install
```

3. Inicia el servidor de desarrollo:

```bash
# npm
npm run dev

# yarn
yarn dev

# pnpm
pnpm dev
```

4. Compilar para producción:

```bash
npm run build
# vista previa del build
npm run preview
```

