/*
Документация по работе в шаблоне: 
Документация слайдера: https://swiperjs.com/
Сниппет(HTML): swiper
*/

// Подключаем слайдер Swiper из node_modules
// При необходимости подключаем дополнительные модули слайдера, указывая их в {} через запятую
// Пример: { Navigation, Autoplay }
import Swiper from 'swiper';
import { Navigation, EffectCards, Pagination } from 'swiper/modules';
/*
Основниые модули слайдера:
Navigation, Pagination, Autoplay, 
EffectFade, Lazy, Manipulation
Подробнее смотри https://swiperjs.com/
*/

// Стили Swiper
// Базовые стили
import "../../scss/base/swiper.scss";
// Полный набор стилей из scss/libs/swiper.scss
// import "../../scss/libs/swiper.scss";
// Полный набор стилей из node_modules
// import 'swiper/css';

// Инициализация слайдеров
function initSliders() {

	if (document.querySelector('.reviews__slider')) { // Указываем скласс нужного слайдера
		let windowWidth = window.innerWidth;
		let params;

		if (windowWidth >= 650) {
			params = {
				modules: [Navigation, EffectCards],
				observer: true,
				slidesPerView: 'auto',
				centeredSlides: true,
				grabCursor: true,
				speed: 400,
				navigation: {
					prevEl: '.reviews__arrow-left',
					nextEl: '.reviews__arrow-right',
				},
				effect: 'cards',
				cardsEffect: {
					rotate: false,
					perSlideOffset: 12, // Space between cards in px
					perSlideRotate: 0, // Rotation of cards in degrees
				},
				on: {
					init: function () {
						setTimeout(function () {
							updateSlideClasses();
						}, 0);
					},
					slideChange: function () {
						updateSlideClasses();
					},
				}
			};
		} else {
			params = {
				modules: [Navigation, EffectCards],
				observer: true,
				slidesPerView: 'auto',
				centeredSlides: true,
				grabCursor: true,
				speed: 400,
				navigation: {
					prevEl: '.reviews__arrow-left',
					nextEl: '.reviews__arrow-right',
				},
				spaceBetween: -3,
				on: {
					init: function () {
						setTimeout(function () {
							updateSlideClasses();
						}, 0);
					},
					slideChange: function () {
						updateSlideClasses();
					},
				}
			}
		}

		var mySwiper = new Swiper('.reviews__slider', params);
	}

	if (document.querySelector('.photos__slider')) {
		new Swiper('.photos__slider', {
			modules: [Navigation, Pagination],
			grabCursor: true,
			centeredSlides: true,
			pagination: {
				el: '.photos__pagination',
				type: 'bullets',
			},
			breakpoints: {
				320: {
					spaceBetween: 20,
					slidesPerView: 1,
				},
				650: {
					spaceBetween: 20,
					slidesPerView: 1.08,
				},
				768: {
					spaceBetween: 20,
					slidesPerView: 1.08,
				},
				991: {
					spaceBetween: 30,
				},
				1300: {
					spaceBetween: 30,
					slidesPerView: 1.06,
				},
			},
			navigation: {
				prevEl: '.photos__arrow-left',
				nextEl: '.photos__arrow-right',
			},
			on: {
				init: function (swiper) {
					var offer = document.querySelector('.photos__number');
					if (offer) {
						offer.innerHTML = 'Фото ' + (swiper.activeIndex + 1) + '/' + swiper.slides.length;
					}
				},
				slideChange: function (swiper) {
					var offer = document.querySelector('.photos__number');
					if (offer) {
						offer.innerHTML = 'Фото ' + (swiper.activeIndex + 1) + '/' + swiper.slides.length;
					}
				},
				slideChangeTransitionStart: function () {

				},
				slideChangeTransitionEnd: function () {

				},
			}
		});
	}

	// Функция для обновления классов слайдов
	function updateSlideClasses() {
		if (mySwiper) {
			var slides = document.querySelectorAll('.reviews__slide');
			var activeIndex = mySwiper.activeIndex;

			slides.forEach(function (slide, index) {
				// Удаление всех дополнительных классов у слайда

				slide.classList.remove(
					'swiper-slide-prev-prev',
					'swiper-slide-prev',
					'swiper-slide-next',
					'swiper-slide-next-next',
					'swiper-slide-active'
				);

				// Определение классов для текущего слайда и его соседей
				if (index === activeIndex - 2) {
					slide.classList.add('swiper-slide-prev-prev');
				} else if (index === activeIndex - 1) {
					slide.classList.add('swiper-slide-prev');
				} else if (index === activeIndex) {
					slide.classList.add('swiper-slide-active');
				} else if (index === activeIndex + 1) {
					slide.classList.add('swiper-slide-next');
				} else if (index === activeIndex + 2) {
					slide.classList.add('swiper-slide-next-next');
				}
			});
		}
	}
}
window.addEventListener("load", function (e) {
	initSliders();
});
