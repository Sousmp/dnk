// Подключение из node_modules
import * as noUiSlider from 'nouislider';

// Подключение стилей из scss/base/forms/range.scss 
// в файле scss/forms/forms.scss

// Подключение cтилей из node_modules
// import 'nouislider/dist/nouislider.css';

export function rangeInit() {

	// Check if the element with class 'filter__area' exists
	var rangeSliderArea = document.querySelector('.filter__area');
	if (rangeSliderArea) {
		noUiSlider.create(rangeSliderArea, {
			start: [100],
			connect: [true, false],
			range: {
				'min': [40],
				'max': [400]
			},
			format: {
				to: function (value) {
					// Отображаем целое значение, без десятичной части
					return Math.round(value);
				},
				from: function (value) {
					return value;
				}
			}
		});

		var rangeSliderAreaValue = document.querySelector('.filter__area-value');
		rangeSliderArea.noUiSlider.on('update', function (values, handle) {
			rangeSliderAreaValue.innerHTML = values[handle];
		});
	}
	// Check if the element with class 'filter__price' exists
	var rangePrice = document.querySelector('.filter__price');
	if (rangePrice) {
		var slider = noUiSlider.create(rangePrice, {
			start: [10000000],
			connect: [true, false],
			step: 100,
			range: {
				'min': [1000000],
				'max': [30000000]
			},
			format: {
				to: function (value) {
					// Отображаем целое значение, без десятичной части
					return Math.round(value);
				},
				from: function (value) {
					return value;
				}
			}
		});

		rangePrice.querySelector('.noUi-handle').addEventListener('keydown', function (e) {
			if (e.which === 38) { // Стрелка вверх
				var value = slider.get() + 24900;
				slider.set(value);
			} else if (e.which === 40) { // Стрелка вниз
				var value = slider.get() - 24900;
				slider.set(value);
			}
		});

		var rangeSliderPriceValue = document.querySelector('.filter__price-value');
		rangePrice.noUiSlider.on('update', function (values, handle) {
			rangeSliderPriceValue.innerHTML = values[handle];
		});


		// Меняем цифры в рендже зависимо от валюты
		document.addEventListener("selectCallback", function (e) {
			const currentSelect = e.detail.select;
			const rangePrice = document.querySelector('.filter__price');
			const selectedCurrency = currentSelect.value; // Получаем выбранную валюту из селекта
			if (rangePrice && selectedCurrency) {
				var slider = rangePrice.noUiSlider; // Получаем слайдер

				switch (selectedCurrency) {
					case 'rub':
						slider.updateOptions({
							range: {
								'min': [1000000],
								'max': [30000000]
							},
							start: [10000000]
						});
						break;
					case 'usd':
						slider.updateOptions({
							range: {
								'min': [10000],
								'max': [300000]
							},
							start: [100000]
						});
						break;
					case 'eur':
						slider.updateOptions({
							range: {
								'min': [10000],
								'max': [300000]
							},
							start: [100000]
						});
						break;
					// Можно добавить еще валюты
					default:
						break;
				}
			}
		});
		// Функция для форматирования числа с разделителями пробелами
		function formatNumberWithSpaces(number) {
			return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
		}

		// Добавляем обработчик события update для отображения отформатированного значения
		rangePrice.noUiSlider.on('update', function (values, handle) {
			var formattedValue = formatNumberWithSpaces(values[handle]);
			rangeSliderPriceValue.innerHTML = formattedValue;
		});

		/* 
		// Сабмит он change
		rangePrice.noUiSlider.on('change', function (values, handle) {
			// Вызываем функцию отправки формы
			submitForm();
		});
		function submitForm() {
			// Находим форму
			var form = document.querySelector('.filter__form');

			if (form) {
				// Отправляем форму
				form.submit();
			}
		} */
	}
}

rangeInit();

