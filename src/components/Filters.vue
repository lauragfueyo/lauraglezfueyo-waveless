<template>
	<aside id="filters" :class="['filter', { 'is-open': props.filters?.showFilters }]" role="region" aria-label="Filtrar el listado de viajes">
		<div class="filter__header">
			<h2 class="filter__header-title">Filtrar mi búsqueda</h2>
			<button class="filter__header-close" type="button" aria-controls="filters" aria-label="Ocultar filtros" @click="hideFiltersClick"></button>
		</div>

		<div class="filter__content">
			<details class="filter__category">
				<summary class="filter__category-summary">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M11.4725 20.3495C16.4301 20.3495 20.449 16.3529 20.449 11.4229C20.449 6.49286 16.4301 2.49629 11.4725 2.49629C6.5149 2.49629 2.49597 6.49286 2.49597 11.4229C2.49597 16.3529 6.5149 20.3495 11.4725 20.3495Z" stroke="#342E34" stroke-width="1.2672" stroke-linecap="round" stroke-linejoin="round"/>
						<path d="M3.18848 14.8585H5.60524C6.2462 14.8585 6.86091 14.6053 7.31414 14.1546C7.76737 13.7039 8.022 13.0926 8.022 12.4552V10.3952C8.022 9.75784 8.27662 9.14655 8.72985 8.69584C9.18308 8.24513 9.79779 7.99193 10.4388 7.99193C11.0797 7.99193 11.6944 7.73872 12.1477 7.28801C12.6009 6.83731 12.8555 6.22601 12.8555 5.58862V2.59477" stroke="#342E34" stroke-width="1.2672" stroke-linecap="round" stroke-linejoin="round"/>
						<path d="M20.4459 11.2827C19.7544 10.9259 18.9876 10.7377 18.2086 10.7334H15.2671C14.6261 10.7334 14.0114 10.9866 13.5582 11.4373C13.105 11.888 12.8503 12.4993 12.8503 13.1367C12.8503 13.7741 13.105 14.3854 13.5582 14.8361C14.0114 15.2868 14.6261 15.54 15.2671 15.54C15.7249 15.54 16.164 15.7209 16.4877 16.0428C16.8115 16.3648 16.9934 16.8014 16.9934 17.2567V18.4515" stroke="#342E34" stroke-width="1.2672" stroke-linecap="round" stroke-linejoin="round"/>
						<path d="M10.9144 19.789C11.0658 19.4493 11.0892 19.0377 10.9141 18.673C10.7389 18.3084 10.5452 17.7873 10.1461 17.6113C9.74691 17.4353 9.30393 17.4014 8.91458 17.5172C8.52523 17.6329 8.2214 17.8888 8.06994 18.2284C7.96175 18.4711 7.74473 18.6538 7.46662 18.7365C7.18852 18.8192 6.8721 18.795 6.58699 18.6693L5.83877 18.3393" stroke="#342E34" stroke-width="1.2672" stroke-linecap="round" stroke-linejoin="round"/>
					</svg>
					Destinos
				</summary>
				<div class="filter__category-options">
					<ul :id="listId('destinos')" class="filter__category-list">
						<li v-for="cat in visibleCategoriesFor('destinos')" :key="cat" class="filter__category-option">
							<input type="checkbox" :id="`cat-${slug(cat)}`" :value="cat" v-model="selectedCategories" class="filter__category-checkbox">
							<label :for="`cat-${slug(cat)}`" class="filter__category-label">{{ cat }}</label>
							<p class="tooltip" data-tooltip>
								<button class="tooltip__button" aria-describedby="tooltip-{{ slug(cat) }}"><img src="/src/assets/ico-ayuda.svg" alt="Ayuda"></button>
								<span class="tooltip__text" role="tooltip" id="tooltip-{{ slug(cat) }}">Lorem ipsum</span>
							</p>
						</li>
					</ul>

					<button
						v-if="categoriesList.length > limit"
						type="button"
						class="filter__category-showmore"
						@click="() => toggleShowAll('destinos')"
						:aria-expanded="String(isShowAll('destinos'))"
						:aria-controls="listId('destinos')"
					>
						<span v-if="!isShowAll('destinos')">Ver {{ hiddenCountFor('destinos') }} más</span>
						<span v-else>Ver menos</span>
					</button>
				</div>
			</details>

			<details class="filter__category">
				<summary class="filter__category-summary">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M15.375 6.75C16.4105 6.75 17.25 5.91053 17.25 4.875C17.25 3.83947 16.4105 3 15.375 3C14.3395 3 13.5 3.83947 13.5 4.875C13.5 5.91053 14.3395 6.75 15.375 6.75Z" stroke="#342E34" stroke-width="1.34" stroke-linecap="round" stroke-linejoin="round"/>
						<path d="M0.75 18.75L7.60312 7.11937C7.6693 7.00659 7.76381 6.91307 7.87728 6.84809C7.99075 6.7831 8.11924 6.74892 8.25 6.74892C8.38076 6.74892 8.50925 6.7831 8.62272 6.84809C8.73619 6.91307 8.8307 7.00659 8.89688 7.11937L15.75 18.75H0.75Z" stroke="#342E34" stroke-width="1.34" stroke-linecap="round" stroke-linejoin="round"/>
						<path d="M4.72031 12H11.7797" stroke="#342E34" stroke-width="1.34" stroke-linecap="round" stroke-linejoin="round"/>
						<path d="M13.7447 15.3478L16.8441 10.1175C16.9105 10.0056 17.0049 9.91287 17.1179 9.84848C17.231 9.78408 17.3589 9.75022 17.4891 9.75022C17.6192 9.75022 17.7471 9.78408 17.8602 9.84848C17.9733 9.91287 18.0677 10.0056 18.1341 10.1175L23.25 18.75H15.75" stroke="#342E34" stroke-width="1.34" stroke-linecap="round" stroke-linejoin="round"/>
					</svg>
					Aventura
				</summary>
				<div class="filter__category-options">
					<ul :id="listId('aventura')" class="filter__category-list">
						<li v-for="cat in visibleCategoriesFor('aventura')" :key="cat" class="filter__category-option">
							<input type="checkbox" :id="`cat-${slug(cat)}`" :value="cat" v-model="selectedCategories" class="filter__category-checkbox">
							<label :for="`cat-${slug(cat)}`" class="filter__category-label">{{ cat }}</label>
							<p class="tooltip" data-tooltip>
								<button class="tooltip__button" aria-describedby="tooltip-{{ slug(cat) }}"><img src="/src/assets/ico-ayuda.svg" alt="Ayuda"></button>
								<span class="tooltip__text" role="tooltip" id="tooltip-{{ slug(cat) }}">Lorem ipsum</span>
							</p>
						</li>
					</ul>

					<button
						v-if="categoriesList.length > limit"
						type="button"
						class="filter__category-showmore"
						@click="() => toggleShowAll('aventura')"
						:aria-expanded="String(isShowAll('aventura'))"
						:aria-controls="listId('aventura')"
					>
						<span v-if="!isShowAll('aventura')">Ver {{ hiddenCountFor('aventura') }} más</span>
						<span v-else>Ver menos</span>
					</button>
				</div>
			</details>

			<details class="filter__category">
				<summary class="filter__category-summary">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<circle cx="12.5282" cy="8.3042" r="1.056" stroke="#342E34" stroke-width="1.056"/>
						<path d="M11.558 4.1798C12.1143 3.69608 12.9422 3.69608 13.4985 4.1798L20.2836 10.0792C20.6379 10.3872 20.8251 10.8457 20.7875 11.3136L20.2133 18.4552C20.1514 19.2229 19.5099 19.8143 18.7397 19.8146H6.31683C5.54658 19.8144 4.90517 19.2229 4.8432 18.4552L4.26898 11.3136C4.23142 10.8457 4.41865 10.3872 4.77289 10.0792L11.558 4.1798Z" stroke="#342E34" stroke-width="1.2672"/>
						<line x1="7.45172" y1="19.8938" x2="7.45172" y2="21.9262" stroke="#342E34" stroke-width="1.2672" stroke-linecap="round"/>
						<line x1="17.2563" y1="19.8938" x2="17.2563" y2="21.9262" stroke="#342E34" stroke-width="1.2672" stroke-linecap="round"/>
						<path d="M14.996 19.2619V14.7748C14.996 13.6084 14.0505 12.6628 12.884 12.6628H12.2053C11.0389 12.6628 10.0933 13.6084 10.0933 14.7748V19.2619" stroke="#342E34" stroke-width="1.2672"/>
					</svg>

					Alojamiento
				</summary>
				<div class="filter__category-options">
					<ul :id="listId('alojamiento')" class="filter__category-list">
						<li v-for="cat in visibleCategoriesFor('alojamiento')" :key="cat" class="filter__category-option">
							<input type="checkbox" :id="`cat-${slug(cat)}`" :value="cat" v-model="selectedCategories" class="filter__category-checkbox">
							<label :for="`cat-${slug(cat)}`" class="filter__category-label">{{ cat }}</label>
							<p class="tooltip" data-tooltip>
								<button class="tooltip__button" aria-describedby="tooltip-{{ slug(cat) }}"><img src="/src/assets/ico-ayuda.svg" alt="Ayuda"></button>
								<span class="tooltip__text" role="tooltip" id="tooltip-{{ slug(cat) }}">Lorem ipsum</span>
							</p>
						</li>
					</ul>

					<button
						v-if="categoriesList.length > limit"
						type="button"
						class="filter__category-showmore"
						@click="() => toggleShowAll('alojamiento')"
						:aria-expanded="String(isShowAll('alojamiento'))"
						:aria-controls="listId('alojamiento')"
					>
						<span v-if="!isShowAll('alojamiento')">Ver {{ hiddenCountFor('alojamiento') }} más</span>
						<span v-else>Ver menos</span>
					</button>
				</div>
			</details>

			<details class="filter__category">
				<summary class="filter__category-summary">
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
						<path d="M3.96938 12.9694C3.82899 12.8288 3.75009 12.6383 3.75 12.4397V3.75H12.4397C12.6383 3.75009 12.8288 3.82899 12.9694 3.96938L22.2806 13.2806C22.4212 13.4213 22.5001 13.612 22.5001 13.8108C22.5001 14.0096 22.4212 14.2003 22.2806 14.3409L14.3438 22.2806C14.2031 22.4212 14.0124 22.5001 13.8136 22.5001C13.6148 22.5001 13.4241 22.4212 13.2834 22.2806L3.96938 12.9694Z" stroke="#342E34" stroke-width="1.2672" stroke-linecap="round" stroke-linejoin="round"/>
						<path d="M7.875 7.38379C8.14639 7.38379 8.36621 7.60361 8.36621 7.875C8.36621 8.14639 8.14639 8.36621 7.875 8.36621C7.60361 8.36621 7.38379 8.14639 7.38379 7.875C7.38379 7.60361 7.60361 7.38379 7.875 7.38379Z" stroke="#342E34" stroke-width="1.2672"/>
					</svg>
					Precio (€)
				</summary>
				<div class="filter__category-options no-grow">
					<p class="filter__category-option">
						<label for="price-min" class="filter__category-label is-labelinput">Mínimo</label>
						<input id="price-min" type="number" inputmode="numeric" min="0" step="1" v-model.number="minPrice" class="filter__category-input" placeholder="">
					</p>
					<p class="filter__category-option">
						<label for="price-max" class="filter__category-label is-labelinput">Máximo</label>
						<input id="price-max" type="number" inputmode="numeric" min="0" step="1" v-model.number="maxPrice" class="filter__category-input" placeholder="">
					</p>
				</div>
			</details>
		</div>
  </aside>
</template>

<script setup>
import { computed, watch, ref, onMounted, onUnmounted } from 'vue';

const props = defineProps({
	filters: { type: Object, default: () => ({ 
		selectedCategories: [], 
		minPrice: null, 
		maxPrice: null,
		showFilters: null,
	})}
})
const emit = defineEmits(['update:filters']);

const categoriesList = [
	'Quads','Parapente','Rafting','Explora','Buceo','Paracaídas','Snowboard','Surf',
	'Senderismo','Escalada','Kayak','Ciclismo','Esquí','Windsurf','Kitesurf','Snorkel',
	'Buceo nocturno','Safari','Trekking','Camping','Buceo técnico','Observación de aves',
	'Tour gastronómico','Enoturismo','Fotografía','Yoga retreat','Spa','Cultural','City break'
];

// limit + show-more state per section
const limit = 8;
const _suffix = Math.random().toString(36).slice(2,9);
const showAllMap = ref({});

const listId = (key) => `filter-cats-${key}-${_suffix}`;

const isShowAll = (key) => Boolean(showAllMap.value[key]);
const toggleShowAll = (key) => {
  showAllMap.value = { ...showAllMap.value, [key]: !isShowAll(key) };
};

const visibleCategoriesFor = (key) => (isShowAll(key) ? categoriesList : categoriesList.slice(0, limit));
const visibleCountFor = (key) => visibleCategoriesFor(key).length;
const hiddenCountFor = (key) => Math.max(0, categoriesList.length - visibleCountFor(key));

const hideFiltersClick = () => {
	emit('update:filters', { ...props.filters, showFilters: false });
};

const onKeydownFunction = (e) => {
	if (e.key === 'Escape' && props.filters?.showFilters === true) {
		hideFiltersClick();
	}
};

function slug (str) {
	return String(str || '')
		.toLowerCase()
		.replace(/\s+/g, '-')
		.replace(/[^a-z0-9-_]/g, '')
}

const selectedCategories = computed({
	get() { return props.filters?.selectedCategories || [] },
	set(v) { emit('update:filters', { ...props.filters, selectedCategories: v }) }
});

const minPrice = computed({
	get() { return props.filters?.minPrice ?? null },
	set(v) { emit('update:filters', { ...props.filters, minPrice: v }) }
});

const maxPrice = computed({
	get() { return props.filters?.maxPrice ?? null },
	set(v) { emit('update:filters', { ...props.filters, maxPrice: v }) }
});

onUnmounted(() => {
	document.removeEventListener('keydown', onKeydownFunction);
});

onMounted(() => {
	document.addEventListener('keydown', onKeydownFunction);
});

</script>

<style lang="scss" scoped>
	@use "../css/components/filter.scss";
</style>
