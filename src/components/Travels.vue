<template>
	<div class="travels">
		<div class="travels__container">
			<h1 class="travels__title">Vive tus propias aventuras</h1>
			<p class="travels__description">Para los que les gusta explorar y conocer mundo sin complejos</p>

			<div class="travels__wrapper">
				<Filters :categories="categoriesList" v-model:filters="filters" />

				<div class="travels__content">
					<button class="travels__toggle-filters" type="button" aria-controls="filters" aria-label="Mostrar filtros" @click="showFiltersClick">Ver filtros</button>
					<div v-for="country in filteredCountries" :key="country.country">
						<h2 class="travels__content-title">{{ country.country }}</h2>
						<ul class="travels__list">
							<li v-for="item in country.items" :key="item.id" class="card travels__item">
								<img :src="item.image.src" :alt="item.image.alt" class="card__image" width="264" height="188" />
								<div class="card__content">
									<p class="card__category">{{ item.category }}</p>
									<p class="card__country">{{ item.country }}, <span class="card__days">{{ item.days }} días</span></p>
									<h3 class="card__title">{{ item.name }}</h3>
								</div>
								<div class="card__content is-pricing">
									<div class="card__price">
										<p class="card__price-info">
											<small class="card__price-fromtext">Desde</small>
											<span class="card__price-from">{{ formatNumber(item.pricing.from) }}€</span>
										</p>
										<button	type="button" class="card__price-button" :class="{ 'is-on': openDetailsId === String(item.id) }"  @click="showDetailsClick(item.id)">Ver desglose <span class="screen-reader-only">de precios de {{ item.name }}</span></button>
									</div>
									<p class="card__cta"><a class="button is-bordered" href="#">Reservar <span class="screen-reader-only">{{ item.name }}</span></a></p>
								</div>
								<div class="card__price-details" v-if="openDetailsId === String(item.id)">
									<div class="card__price-details-content is-bgcolor">
										<h4 class="card__price-details-title">Desglose de precios</h4>
										<button type="button" class="card__price-details-close" aria-label="Cerrar desglose de precios" @click="closeDetails()"><img src="/src/assets/ico-close.svg" alt=""></button>
									</div>
									<div class="card__price-details-content">
										<p class="card__country">{{ item.country }}, <span class="card__days">{{ item.days }} días</span></p>
										<ul class="card__price-details-list">
											<li class="card__price-details-item">Precio antes de impuestos <strong class="card__price-details-price">{{ formatNumber(item.pricing.beforeTax) }}€</strong></li>
											<li class="card__price-details-item">Impuesto <strong class="card__price-details-price">{{ formatNumber(item.pricing.tax) }}€</strong></li>
											<li class="card__price-details-item">Lorem ipsum <strong class="card__price-details-price">{{ formatNumber(item.pricing.fees) }}€</strong></li>
										</ul>
									</div>
									<p class="card__price-details-content is-bgcolor">Precio final <strong class="card__price-details-price">{{ formatNumber(item.pricing.final) }}€</strong></p>
								</div>
							</li>
						</ul>
					</div>
					<!-- Mensaje cuando no hay resultados tras aplicar filtros -->
					<div v-if="filteredCountries.length === 0" class="travels__no-results" role="status" aria-live="polite">
						<img src="/src/assets/not-found.webp" alt="" width="253" height="196" />
						<p>No se han encontrado viajes que coincidan con los filtros aplicados.</p>
					</div>
				</div>

			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import Filters from './Filters.vue';

const countries = ref([]);
const filters = ref({ selectedCategories: [], minPrice: null, maxPrice: null });
const showFilters = ref(null);
const openDetailsId = ref(null);

function matchesFilters(item) {
	if (!item) {
		return false;
	}

	const sel = filters.value.selectedCategories || [];
	if (sel.length && !sel.includes(item.category)) {
		return false;
	}

	const price = Number(item?.pricing?.from ?? NaN);
	if (!Number.isNaN(price)) {
		if (filters.value.minPrice !== null && filters.value.minPrice !== '' && price < Number(filters.value.minPrice)) {
			return false;
		}
		if (filters.value.maxPrice !== null && filters.value.maxPrice !== '' && price > Number(filters.value.maxPrice)) {
			return false;
		}
	}
	return true;
}

const showDetailsClick = (id) => {	
	const idStr = id === undefined || id === null ? null : String(id);
	openDetailsId.value = openDetailsId.value === idStr ? null : idStr;
};

const showFiltersClick = () => {
 	filters.value = { ...filters.value, showFilters: true };
};

const closeDetails = () => {
	openDetailsId.value = null;
};

const onKeydownFunction = (e) => {
	if (e.key === 'Escape' && openDetailsId.value != null) {
		closeDetails();
	}
};

const filteredCountries = computed(() => {
	return countries.value
		.map(c => ({ country: c.country, items: (c.items || []).filter(matchesFilters) }))
		.filter(c => (c.items || []).length > 0);
});

const formatNumber = (value) => {
	const number = Number(value);
	return new Intl.NumberFormat('es-ES', {
		useGrouping: true,
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	}).format(number);
};

const categoriesList = computed(() => {
	const s = new Set();
	countries.value.forEach(c => (c.items || []).forEach(i => i.category && s.add(i.category)));
	return Array.from(s);
});

onUnmounted(() => {
	document.removeEventListener('keydown', onKeydownFunction);
});

onMounted(async () => {
	try {
		const res = await fetch('/travels.json');
		const data = await res.json();
		countries.value = data.countries || [];
		
		document.addEventListener('keydown', onKeydownFunction);
	} catch (e) {
		console.error('Failed to load travels:', e);
	}
});

</script>

<style lang="scss" scoped>
	@use "../css/components/travels.scss";
</style>