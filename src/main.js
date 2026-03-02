import { createApp, h, Suspense } from 'vue';
import './css/style.scss';
import Travels from './components/Travels.vue';
import Carousel from './components/Carousel.vue';

document.addEventListener('DOMContentLoaded', function() {;
	scrollOn();
	showNav();
	renderCarousel();
	renderTravels();
	tooltip();
});

function renderCarousel() {
	const carouselElem = document.querySelector('#carousel');
	if (carouselElem != null) {
		const carouselApp = createApp({
			render() {
				return h(Carousel);
			},
		});
		carouselApp.mount(carouselElem);
	}
}

function renderTravels() {
	const travelsElem = document.querySelector('#travels');
	if (travelsElem != null) {
		const travelsApp = createApp({
			render() {
				return h(Travels);
			},
		});
		travelsApp.mount(travelsElem);
	}
}

function tooltip() {
	//tooltip: controlar que esta abierto o cerrado con aria-expanded y data-open, y cerrar con escape
	document.querySelectorAll('.tooltip').forEach((tooltip) => {
		const tooltipButton = tooltip.querySelector('.tooltip__button');
		const open = () => {
			console.log('abrir tooltip');
			tooltip.dataset.open = 'true';
			tooltipButton.setAttribute('aria-expanded', 'true');
		};

		const close = () => {
			tooltip.dataset.open = 'false';
			tooltipButton.setAttribute('aria-expanded', 'false');
		};

		tooltipButton.addEventListener('mouseenter', open);
		tooltipButton.addEventListener('focus', open);

		tooltipButton.addEventListener('mouseleave', close);
		tooltipButton.addEventListener('blur', close);

		document.addEventListener('keydown', (e) => {
			if (e.key === 'Escape') {
				close();
				tooltipButton.blur();
			}
		});
	});
}

function scrollDirection() {
	const bodyEl = document.querySelector('body');
	if(window.scrollY > 0) {
		bodyEl.classList.add('scroll-on');
	} else {
		bodyEl.classList.remove('scroll-on');
	}
}

function scrollOn() {
	scrollDirection();
	window.onscroll = function(){
		scrollDirection();
	};
}

function showNav() {
	const navButton = document.querySelector('.header__navbutton');
	let open;
	if(navButton) {
		navButton.addEventListener('click', function(event){
			document.querySelector('body').classList.toggle('is-navon');
			document.querySelector('.nav').classList.toggle('is-navon');
			
			if(open) {
				event.target.setAttribute('aria-label', 'Mostrar navegación principal');
				open = false;

				document.addEventListener('keydown', (e) => {
					if (e.key === 'Escape') {
						document.querySelector('body').classList.remove('is-navon');
						document.querySelector('.nav').classList.remove('is-navon');
						document.querySelector('.header__navbutton').setAttribute('aria-expanded', false);
						open = false;
					}
				});
			} else {
				event.target.setAttribute('aria-label', 'Ocultar navegación principal');
				const navItems = document.querySelectorAll('.nav_list > li');
				[...navItems].forEach(navItem => {
					if(navItem.classList.contains('is-on')) {
						navItem.classList.add('on');
						if(navItem.classList.contains('has-child')) {
							[...navItems].forEach(item => {
								item.classList.add('off');
							});
						}
					}
				});
				open = true;
			}
		});		
	}
}


/*function elementInViewport() {
	const options = {
		threshold: 0
	};
	const observer = new IntersectionObserver(entries => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add('is-on');
			}
		});
	}, options);
	
	const element =  document.querySelectorAll('.animate-layer');
	element.forEach(item => {
		observer.observe(item);
	});
}*/