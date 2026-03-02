<script setup>
import AccessibleCarousel from './components/AccessibleCarousel.vue'

const slides = [
  { src: '/images/slide1.jpg', alt: 'Slide 1' },
  { src: '/images/slide2.jpg', alt: 'Slide 2' },
  { src: '/images/slide3.jpg', alt: 'Slide 3' }
]
</script>

<template>
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>


  <section style="margin:2rem 0">
    <h2>Ejemplo de carrusel accesible</h2>
    <AccessibleCarousel :slides="slides" />
  </section>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>