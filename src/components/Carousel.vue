<template>
	<div :class="['embla', { 'is-single': isSingle } ]">
		<div class="embla__viewport" ref="emblaRef">
			<div class="embla__container">
				<div class="embla__slide">
					<picture>
						<source srcset="/src/assets/carousel.webp" media="(min-width: 1280px)" />
						<source srcset="/src/assets/carousel-tablet-large.webp" media="(min-width: 1023px)" />
						<source srcset="/src/assets/carousel-tablet-small.webp" media="(min-width: 744px)" />
						<img class="embla__slide__image" src="/src/assets/carousel-mobile.webp" alt="" />
					</picture>
					<div class="embla__slide__content">
						<h2 class="embla__slide__title">Ruta por Australia</h2>
						<p class="embla__slide__text">Si te va la aventura, no te lo puedes perder</p>
						<a href="#" class="button is-secondary">Más información <span class="screen-reader-only">sobre Ruta por Australia</span></a>
					</div>
				</div>
			</div>
		</div>

		 <div class="embla__dots" v-if="!isSingle">
		 		<button
		 			:key="index"
		 			v-for="(_, index) in scrollSnaps"
		 			:class="['embla__dot', { 'is-selected': index === selectedIndex }]"
		 			@click="goTo(index)"
		 			:aria-label="`Ir al slide ${index + 1}`"
		 		>
		 		</button>
		 	</div>

		<button class="embla__nav is-prev" @click="goToPrev" aria-label="Slide anterior"></button>
		<button class="embla__nav is-next" @click="goToNext" aria-label="Slide siguiente"></button>
	</div>
</template>

<script setup>
	import { ref, watch, computed } from 'vue';
	import useEmblaCarousel from 'embla-carousel-vue';

	const [emblaRef, emblaApi] = useEmblaCarousel({ 
		loop: false,
	});
	const scrollSnaps = ref([]);

	const isSingle = computed(() => scrollSnaps.value.length === 1);
	const selectedIndex = ref(0);
	const goTo = (index) => emblaApi.value?.scrollTo(index);
	const setupSnaps = (api) => (scrollSnaps.value = api.scrollSnapList ? api.scrollSnapList() : []);

	const goToPrev = () => emblaApi.value?.scrollPrev();
	const goToNext = () => emblaApi.value?.scrollNext();

	watch(
		emblaApi,
		(api) => {
			if (!api) return;
			setupSnaps(api);
			// set initial selected index
			selectedIndex.value = api.selectedScrollSnap ? api.selectedScrollSnap() : 0;
			// update on selection change, reInit and resize
			api.on && api.on('select', () => (selectedIndex.value = api.selectedScrollSnap()));
			api.on && api.on('reInit', () => {
				setupSnaps(api);
				selectedIndex.value = api.selectedScrollSnap ? api.selectedScrollSnap() : 0;
			});
			api.on && api.on('resize', () => {
				setupSnaps(api);
				selectedIndex.value = api.selectedScrollSnap ? api.selectedScrollSnap() : 0;
			});
		},
		{ immediate: true }
	)
</script>

<style lang="scss" scoped>
	@use "../css/components/carousel.scss";
</style>