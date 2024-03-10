// Подключение функционала "Чертогов Фрилансера"
import { isMobile } from "./functions.js";
// Подключение списка активных модулей
import { flsModules } from "./modules.js";



// Мелкие скрипты
document.addEventListener("DOMContentLoaded", function () {
   // --------------
   // Уменьшение главного тайтла при открытии селекта с валютой
   // Получаем элементы
   const selectFilterCurrency = document.querySelector('.select_filter__currency');
   const titleSpan = document.querySelector('.anim__object._title');

   // Находим класс _select-open у select_filter__currency
   const observer = new MutationObserver(function (mutationsList, observer) {
      for (let mutation of mutationsList) {
         if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
            const isOpen = selectFilterCurrency.classList.contains('_select-open');
            if (isOpen) {
               titleSpan.classList.add('_min');
            } else {
               titleSpan.classList.remove('_min');
            }
         }
      }
   });

   // Опции для наблюдения изменений атрибутов
   const config = { attributes: true };

   // Начинаем наблюдение за изменениями в классах элемента select_filter__currency
   observer.observe(selectFilterCurrency, config);

   // --------------
   // Выдает класс _line-break тайтлу если в нем больше 1 слова
   let h1 = document.querySelector('.service__title');
   let text = document.querySelector('.cards__text');

   if (h1) {
      let textContent = h1.textContent.trim();
      let words = textContent.split(" ");

      if (words.length > 1) {
         h1.classList.add("_line-break");
         text.classList.add("_line-break");
      }
   }
   // --------------
   // На определенных страницах добавляю класс хедеру чтоб по нему удалить иконку меню. Можно было сделать проще(
   let animBlock = document.querySelector('.anim');
   let header = document.querySelector('.header')
   if (animBlock && animBlock.classList.contains('anim__second')) {
      header.classList.add('header__second')
   }
   // ---------------
   // У одного из испутов попапа с отправкой Отзыва двойной placeholder. Надо убрать при вводе инпута.
   const input = document.querySelector('.form-review__service');
   const placeholder = document.querySelector('.form-review__placeholder');
   if (input) {
      input.addEventListener('input', function (event) {
         if (event.target.value.length === 0) {
            placeholder.style.opacity = '1';
         } else {
            placeholder.style.opacity = '0';
         }
      });
   }
   // ---------------
   // Делаем карту квадратной меньше чем 991 пикселей.
   window.addEventListener('resize', function () {
      // Проверяем ширину окна
      if (window.innerWidth < 991) {
         var map = document.querySelector('.map__map iframe');
         // Проверяем наличие элемента на странице
         if (map) {
            var width = map.offsetWidth;
            map.style.height = width + 'px';
         }
      }
   });
   // ---------------
   // Вызов функции после загрузки страницы для установки начальных размеров
   window.addEventListener('load', function () {
      // Проверяем ширину окна
      if (window.innerWidth < 991) {
         var map = document.querySelector('.map__map iframe');
         // Проверяем наличие элемента на странице
         if (map) {
            var width = map.offsetWidth;
            map.style.height = width + 'px';
         }
      }
   });

});

// Анимации для дочерних страниц
document.addEventListener("DOMContentLoaded", function () {
   if (document.documentElement.classList.contains('_anim')) {
      window.addEventListener("scroll", function () {
         const scrollPosition = window.scrollY;
         const logo = document.querySelector('.header__logo');
         let translateY = 0;
         let scrollThreshold = 0;

         if (window.innerWidth < 769) {
            translateY = Math.min(scrollPosition, 130);
            scrollThreshold = 20;
         } else if (window.innerWidth > 991) {
            translateY = Math.min(scrollPosition - 50, 150);
            scrollThreshold = 140;
         } else {
            translateY = Math.min(scrollPosition - 40, 80);
            scrollThreshold = 100;
         }

         logo.style.transform = `translateY(-${translateY}px)`;
         document.documentElement.classList.toggle("_scroll", scrollPosition > scrollThreshold);
      });
   }
});

// Маска на телефон + фильтр на заполненость телефона
document.addEventListener('DOMContentLoaded', function () {
   // Находим все формы с классом "form__form"
   var forms = document.querySelectorAll('.form__form');

   forms.forEach(function (form) {
      // Находим инпут типа "tel" внутри каждой формы
      var telInput = form.querySelector('.form__input');

      // Находим кнопку submit внутри каждой формы
      var submitButton = form.querySelector('.form__submit');

      // Создаем маску для ввода номера телефона
      var telMask = new IMask(telInput, {
         mask: '+7 (000)000-00-00'
      }).on('complete', () => {
         submitButton.classList.remove('_empty-tel');
         submitButton.setAttribute('data-popup', "#thanks");
      }).on('accept', function () {
         submitButton.classList.add('_empty-tel');
         submitButton.removeAttribute('data-popup');
      });;

      telInput.addEventListener('input', function () {
         checkPhoneNumber();
      });

      telInput.addEventListener('blur', function () {
         checkPhoneNumber();
      });

      function checkPhoneNumber() {
         var phoneNumber = telMask.unmaskedValue;
         console.log('phoneNumber:', phoneNumber);
         if (phoneNumber && phoneNumber.replace(/\D/g, '').length === 10) {
            if (submitButton) {
               submitButton.classList.remove('_empty-tel');
               submitButton.setAttribute('data-popup', "#thanks");
            }
         } else {
            if (submitButton) {

            }
         }
      }

      // Добавляем обработчик события ввода
      telInput.addEventListener('input', function () {
         var phoneNumber = telMask.unmaskedValue;

         // Проверяем, заполнен ли номер телефона
         if (phoneNumber && phoneNumber.replace(/\D/g, '').length === 10) {
            if (submitButton) {
               submitButton.classList.remove('_empty-tel');
               submitButton.setAttribute('data-popup', "#thanks");
            }
         } else {
            if (submitButton) {
               submitButton.classList.add('_empty-tel');
               // Если номер не заполнен, удаляем атрибут data-popup у кнопки submit
               submitButton.removeAttribute('data-popup');
            }
         }
      });
      // Добавляем обработчик события submit формы
      form.addEventListener('submit', function (event) {
         // Проверяем, активна ли кнопка submit (не имеет класса _empty-tel)
         if (submitButton && submitButton.classList.contains('_empty-tel')) {
            // Если кнопка не активна, предотвращаем отправку формы
            event.preventDefault();
         }
      });
   });
});

// Работа с фильтром для попапа с отправкой Отзыва
document.addEventListener('DOMContentLoaded', function () {
   const form = document.querySelector('.form-review__form');
   const nameInput = document.querySelector('.form-review__name');
   const serviceInput = document.querySelector('.form-review__service');
   const textarea = document.querySelector('.form-review__textarea');
   const submitButton = document.querySelector('.form-review__submit');

   [nameInput, serviceInput, textarea].forEach((element) => {
      element.addEventListener('input', checkInputs);
   });

   form.addEventListener('submit', function (event) {
      if (!submitButton.classList.contains('_active')) {
         event.preventDefault();
         // alert('Не все поля заполнены или введено меньше 20 слов в текстовом поле.');
      }
   });

   function checkInputs() {
      const nameInputValue = nameInput.value.trim();
      const serviceInputValue = serviceInput.value.trim();
      const textareaValue = textarea.value.trim().split(/\s+/);

      if (
         nameInputValue.length > 0 &&
         serviceInputValue.length > 0 &&
         textareaValue.length >= 20 &&
         textareaValue.join(' ').length >= 20
      ) {
         submitButton.classList.add('_active');
         submitButton.setAttribute('data-popup', "#thanks2");
      } else {
         submitButton.classList.remove('_active');
         submitButton.removeAttribute('data-popup', "#thanks2");
      }
   }
});

// Добавляет картинку и класс в попапе с отправкой Отзыва 
document.addEventListener('DOMContentLoaded', function () {
   const input = document.querySelector('.form-review__file');
   const preview = document.querySelector('.form-review__preview');
   const fileContainer = document.querySelector('.form-review__file-body');
   const text = document.querySelector('.form-review__file-lable p');
   const lable = document.querySelector('.form-review__file-lable');

   input.addEventListener('change', function () {
      if (this.files && this.files[0]) {
         const file = this.files[0];
         const reader = new FileReader();

         reader.onload = function (e) {
            preview.src = e.target.result;
            fileContainer.classList.add('_preview-show');
            text.textContent = 'Удалить фото';
         };

         reader.readAsDataURL(file);
      }
   });

   lable.addEventListener('click', function (event) {
      if (fileContainer.classList.contains('_preview-show')) {
         input.value = ''; // Очищаем значение input
         preview.src = ''; // Очищаем превью
         fileContainer.classList.remove('_preview-show');
         text.textContent = 'Загрузить аватар';
         event.preventDefault(); // Останавливаем стандартное действие элемента input
         return false; // Останавливаем действие по умолчанию, чтобы предотвратить открытие проводника файлов
      }
   });
});

// Меняем активные селекты зависимо от типа недвижимости
document.addEventListener("selectCallback", function (e) {
   const currentSelect = e.detail.select;

   // Объект для хранения соответствия значений селекта и действий
   const actions = {
      'residential': {
         show: ['.filter__residential-type-box', '.filter__repair-box'],
         hide: ['.filter__commercial-type-box', '.filter__plot-type-box', '.filter__bedroom-box', '.filter__room-box', '.filter__comunications-box', '.filter__buildings-box']
      },
      'commercial': {
         show: ['.filter__commercial-type-box', '.filter__room-box', '.filter__repair-box'],
         hide: ['.filter__residential-type-box', '.filter__plot-type-box', '.filter__bedroom-box', '.filter__comunications-box', '.filter__buildings-box']
      },
      'plot': {
         show: ['.filter__plot-type-box', '.filter__buildings-box', '.filter__comunications-box'],
         hide: ['.filter__residential-type-box', '.filter__commercial-type-box', '.filter__bedroom-box', '.filter__room-box', '.filter__repair-box']
      }
   };

   // Проверяем, есть ли текущее значение селекта в объекте actions
   if (currentSelect.value in actions) {
      const action = actions[currentSelect.value];
      // Показываем элементы, указанные в свойстве show
      action.show.forEach(selector => {
         document.querySelector(selector).hidden = false;
      });
      // Скрываем элементы, указанные в свойстве hide
      action.hide.forEach(selector => {
         document.querySelector(selector).hidden = true;
      });
   }
});

// меняем валюту на странице object
document.addEventListener("selectCallback", function (e) {
   const currentSelect = e.detail.select;
   const currency = document.querySelector('.info__currency')
   if (currentSelect.classList.contains('filter__currency') && currency) {
      switch (currentSelect.value) {
         case 'usd':
            currency.innerHTML = 'дол.';
            break;
         case 'eur':
            currency.innerHTML = 'евро';
            break;
         case 'rub':
            currency.innerHTML = 'руб.';
            break;
         default:
            break;
      }
   }
});


/* 
// При изменении инпута в филтре сабмитим форму
document.addEventListener('DOMContentLoaded', function () {
   const myInput = document.querySelector('.filter__search');
   const myForm = document.querySelector('.filter__form');

   myInput.addEventListener('change', function () {
      myForm.submit();
   });
}); */