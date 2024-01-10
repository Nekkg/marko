// Получаем все элементы с классом dropdown-btn
const dropdownButtons = document.querySelectorAll('.dropdown-btn');

// Добавляем обработчик события клика для каждой кнопки
dropdownButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Закрываем все другие открытые меню
        dropdownButtons.forEach(otherButton => {
            if (otherButton !== button) {
                otherButton.classList.remove('dropdown-btn-show');
                const otherMenu = otherButton.nextElementSibling;
                if (otherMenu) {
                    otherMenu.classList.remove('dropdown-menu-show');
                }

                // Скрываем стрелку для других кнопок
                const otherArrow = otherButton.querySelector('.dropdown-arrow');
                if (otherArrow) {
                    otherArrow.classList.remove('dropdown-arrow-show');
                }
            }
        });

        // Тогглим классы для текущей кнопки и её меню
        this.classList.toggle('dropdown-btn-show');
        const menu = this.nextElementSibling;
        if (menu) {
            menu.classList.toggle('dropdown-menu-show');
        }

        // Тогглим класс для стрелки текущей кнопки
        const arrow = this.querySelector('.dropdown-arrow');
        if (arrow) {
            arrow.classList.toggle('dropdown-arrow-show');
        }
    });
});

// Закрываем меню при клике вне области меню
document.addEventListener('click', function(e) {
    dropdownButtons.forEach(button => {
        const menu = button.nextElementSibling;
        if (!button.contains(e.target) && (!menu || !menu.contains(e.target))) {
            button.classList.remove('dropdown-btn-show');
            if (menu) {
                menu.classList.remove('dropdown-menu-show');
            }

            // Скрываем стрелку при закрытии меню
            const arrow = button.querySelector('.dropdown-arrow');
            if (arrow) {
                arrow.classList.remove('dropdown-arrow-show');
            }
        }
    });
});


// Получаем все элементы .dropdown-menu__item-text
const dropdownItemTexts = document.querySelectorAll('.dropdown-menu__item-text');

// Добавляем обработчик события клика для каждого элемента
dropdownItemTexts.forEach(itemText => {
    itemText.addEventListener('click', function() {
        // Находим чекбокс, который находится в пределах того же родительского элемента
        const checkbox = this.parentElement.querySelector('.checkbox');

        // Изменяем состояние чекбокса
        if (checkbox) {
            checkbox.checked = !checkbox.checked;
        }
    });
});


let items = document.querySelectorAll('.carousel .carousel-item')

items.forEach((e) => {
    const slide = 3;
    let next = e.nextElementSibling;
    for (let i = 0; i < slide; i++){
        if(!next){
            next = items[0]
        }
        let clonechild = next.cloneNode(true)
        e.appendChild(clonechild.children[0])
        next = next.nextElementSibling
    }
})

document.addEventListener('DOMContentLoaded', function () {
    // Получаем все элементы с классом carousel
    var carousels = document.querySelectorAll('.carousel');

    carousels.forEach(function (carousel) {
        // Для каждой карусели ищем соответствующие элементы
        var totalSlide = carousel.querySelector('.total-slide');
        var currentSlide = carousel.querySelector('.current-slide');

        // Обновляем общее количество слайдов
        totalSlide.textContent = formatSlideNumber(carousel.querySelectorAll('.carousel-item').length);

        // Слушаем событие 'slid.bs.carousel' для обновления текущего слайда
        carousel.addEventListener('slid.bs.carousel', function () {
            var activeSlideIndex = Array.from(carousel.querySelectorAll('.carousel-item')).indexOf(carousel.querySelector('.carousel-item.active')) + 1;
            currentSlide.textContent = formatSlideNumber(activeSlideIndex);

            // Находим соответствующую .work-images
            var workImages = findWorkImages(carousel);

            // Update work-main-img src
            var workMainImg = workImages.querySelector('.work-main-img');
            var activeItem = carousel.querySelector('.carousel-item.active img');
            if (activeItem && workMainImg) {
                workMainImg.src = activeItem.src;
            }
        });

        // Инициализация
        updateSlideInfo();

        function updateSlideInfo() {
            var activeIndex = getActiveIndex(carousel);
            currentSlide.textContent = formatSlideNumber(activeIndex + 1);
        }

        function getActiveIndex(carousel) {
            return Array.from(carousel.querySelectorAll('.carousel-item')).indexOf(carousel.querySelector('.carousel-item.active'));
        }

        function findWorkImages(carousel) {
            // Находим .work-images, соответствующую текущей карусели
            var carouselIndex = Array.from(carousels).indexOf(carousel);
            var workImagesList = document.querySelectorAll('.work-images');
            return workImagesList[carouselIndex];
        }
    });

    function formatSlideNumber(number) {
        // Форматируем номер слайда с ведущими нулями
        return number < 10 ? '0' + number : number.toString();
    }
});


