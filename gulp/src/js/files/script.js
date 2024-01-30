// Подключение функционала "Чертогов Фрилансера"
import { isMobile } from "./functions.js";
// Подключение списка активных модулей
import { flsModules } from "./modules.js";


// import './mask.js'


/* function createPhoneNumberMask(element) {
   var maskOptions = {
      mask: '+0 (000) 000-00-00'
   };

   var maskValue = element.value;
   var lastKnownLength = 0;

   function applyMask() {
      var maskedValue = '';
      var j = 0;

      for (var i = 0; i < maskOptions.mask.length; i++) {
         if (maskOptions.mask[i] === '0' && j < maskValue.length) {
            maskedValue += maskValue[j++];
         } else if (maskOptions.mask[i] !== '0') {
            maskedValue += maskOptions.mask[i];
         }
      }

      element.value = maskedValue;
   }

   function checkPhoneNumber() {
      var phoneNumber = element.value.replace(/\D/g, '');
      var submitButton = document.querySelector('.form__submit');

      if (phoneNumber.length === 11) {
         submitButton.classList.remove('_empty-tel');
      } else {
         submitButton.classList.add('_empty-tel');
      }
   }

   element.addEventListener('input', function () {
      maskValue = element.value.replace(/\D/g, '');

      if (maskValue.length > lastKnownLength) {
         if (maskValue.length <= 18) {
            applyMask();
         } else {
            element.value = maskValue.slice(0, 18);
         }
      }

      lastKnownLength = maskValue.length;

      checkPhoneNumber();
   });
}

document.addEventListener('DOMContentLoaded', function () {
   var telInputs = document.querySelectorAll('input[type="tel"]');

   telInputs.forEach(function (telInput) {
      createPhoneNumberMask(telInput);
   });
});
 */

//# sourceMappingURL=imask.js.map

/* document.addEventListener('DOMContentLoaded', function () {
   const element = document.getElementById('phone-mask');
   const maskOptions = {
      mask: '+{7}(000)000-00-00'
   };
   const mask = new IMask(element, maskOptions);
});
 */
document.addEventListener("DOMContentLoaded", function () {
   if (document.documentElement.classList.contains('_anim')) {
      window.addEventListener("scroll", function () {
         const header = document.querySelector('.header');
         const scrollPosition = window.scrollY;
         console.log(scrollPosition, header.offsetHeight)
         if (scrollPosition > header.offsetHeight) {
            document.documentElement.classList.add("_scroll")
         } else {
            document.documentElement.classList.remove("_scroll")
         }
      });
   }
});



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