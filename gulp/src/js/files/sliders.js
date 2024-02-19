/*
Документация по работе в шаблоне: 
Документация слайдера: https://swiperjs.com/
Сниппет(HTML): swiper
*/

// Подключаем слайдер Swiper из node_modules
// При необходимости подключаем дополнительные модули слайдера, указывая их в {} через запятую
// Пример: { Navigation, Autoplay }
import Swiper from 'swiper';
import { Navigation, EffectCards } from 'swiper/modules';
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
	if (document.querySelector('.swiper')) { // Указываем скласс нужного слайдера
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

		var mySwiper = new Swiper('.swiper', params);
	}
	// Функция для обновления классов слайдов
	function updateSlideClasses() {
		if (mySwiper) {
			var slides = document.querySelectorAll('.swiper-slide');
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







// Скролл на базе слайдера (по классу swiper_scroll для оболочки слайдера)
function initSlidersScroll() {
	let sliderScrollItems = document.querySelectorAll('.swiper_scroll');
	if (sliderScrollItems.length > 0) {
		for (let index = 0; index < sliderScrollItems.length; index++) {
			const sliderScrollItem = sliderScrollItems[index];
			const sliderScrollBar = sliderScrollItem.querySelector('.swiper-scrollbar');
			const sliderScroll = new Swiper(sliderScrollItem, {
				observer: true,
				observeParents: true,
				direction: 'vertical',
				slidesPerView: 'auto',
				freeMode: {
					enabled: true,
				},
				scrollbar: {
					el: sliderScrollBar,
					draggable: true,
					snapOnRelease: false
				},
				mousewheel: {
					releaseOnEdges: true,
				},
			});
			sliderScroll.scrollbar.updateSize();
		}
	}
}