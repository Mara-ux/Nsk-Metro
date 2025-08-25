// Главная функция инициализации
function initApp() {
    console.log('Initializing app...');
    
    // 1. Навигационное меню
    initNavigation();
    
    // 2. Кнопки выбора маршрута
    initRouteButtons();
    
    // 3. Попапы станций
    initStationPopups();
    
    // 4. Swiper инициализируется при открытии попапа
    console.log('App initialized successfully');
}

// Инициализация навигации
function initNavigation() {
    const navTitle = document.querySelector('.navTitle');
    const navMenu = document.querySelector('.navMenu');
    
    if (navTitle && navMenu) {
        navTitle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
        
        // Закрытие меню при скролле
        window.addEventListener('scroll', function() {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
        });
    }
}

// Инициализация кнопок маршрута
function initRouteButtons() {
    const btnM = document.querySelector('#M');
    const btnZ = document.querySelector('#Z');
    const trevel = document.querySelector('.trevel');
    const marksa = document.querySelector('.marksa');
    const zelts = document.querySelector('.zelts');
    
    if (btnM && marksa) {
        btnM.addEventListener('click', function() {
            if (trevel) trevel.classList.add('active');
            marksa.classList.add('active');
            if (zelts) zelts.classList.remove('active');
            // Прокрутка к разделу
            trevel.scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    if (btnZ && zelts) {
        btnZ.addEventListener('click', function() {
            if (trevel) trevel.classList.add('active');
            zelts.classList.add('active');
            if (marksa) marksa.classList.remove('active');
            // Прокрутка к разделу
            trevel.scrollIntoView({ behavior: 'smooth' });
        });
    }
}

// Инициализация попапов
function initStationPopups() {
    const popupButtons = document.querySelectorAll('.stationBtn');
    const popups = document.querySelectorAll('.popup');
    const closeButtons = document.querySelectorAll('.close-btn');
    
    console.log('Found popup buttons:', popupButtons.length);
    console.log('Found popups:', popups.length);
    
    // Сначала скрываем все попапы через класс active
    popups.forEach(popup => {
        popup.classList.remove('active');
    });
    
    // Обработчик для кнопок открытия
    popupButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const popupId = this.getAttribute('data-popup');
            console.log('Opening popup:', popupId);
            
            // Закрываем все попапы
            popups.forEach(popup => {
                popup.classList.remove('active');
            });
            
            // Открываем нужный попап
            const targetPopup = document.getElementById(popupId);
            if (targetPopup) {
                targetPopup.classList.add('active');
                console.log('Popup classes:', targetPopup.classList);
                // Инициализируем свайпер для этого попапа
                initSwiperForPopup(targetPopup);
                
                // Блокируем прокрутку body при открытом попапе
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // Обработчик для кнопок закрытия
    closeButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const popup = this.closest('.popup');
            if (popup) {
                popup.classList.remove('active');
                // Возвращаем прокрутку body
                document.body.style.overflow = '';
            }
        });
    });
    
    // Закрытие по клику вне попапа
    popups.forEach(popup => {
        popup.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
    
    // Закрытие по ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            popups.forEach(popup => {
                if (popup.classList.contains('active')) {
                    popup.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        }
    });
}

// Инициализация Swiper для конкретного попапа
function initSwiperForPopup(popup) {
    const swiperContainer = popup.querySelector('.swiper');
    
    if (swiperContainer && typeof Swiper !== 'undefined') {
        // Удаляем предыдущий экземпляр если есть
        if (swiperContainer.swiper) {
            swiperContainer.swiper.destroy(true, true);
        }
        
        // Создаем новый Swiper
        new Swiper(swiperContainer, {
            loop: true,
            pagination: {
                el: swiperContainer.querySelector('.swiper-pagination'),
                clickable: true,
            },
            navigation: {
                nextEl: swiperContainer.querySelector('.swiper-button-next'),
                prevEl: swiperContainer.querySelector('.swiper-button-prev'),
            },
            slidesPerView: 1,
            spaceBetween: 20,
            observer: true,
            observeParents: true,
            on: {
                init: function() {
                    console.log('Swiper initialized for popup');
                }
            }
        });
    }
}

// Обработка ошибок
window.addEventListener('error', function(e) {
    console.error('Global error:', e.error);
});

// Запуск при полной загрузке
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}

// let navMenu = document.querySelector('.navMenu');

// document.querySelector('.navTitle').onclick = () => {
//     navMenu.classList.toggle('active')
// };

// window.addEventListener('scroll', () => {
//     if (navMenu.classList.contains('active')) {
//         navMenu.classList.remove('active');
//     }
// });

// let trevel = document.querySelector('.trevel');
// let marksa = document.querySelector('.marksa');
// let zelts = document.querySelector('.zelts');

// document.querySelector('#M').onclick = () => {
//     trevel.classList.add('active')
//     marksa.classList.add('active')
//     zelts.classList.remove('active');
// };
// document.querySelector('#Z').onclick = () => {
//     trevel.classList.add('active')
//     zelts.classList.add('active')
//     marksa.classList.remove('active');
// };

// document.addEventListener("DOMContentLoaded", function() {
//     const buttons = document.querySelectorAll(".stationBtn");
//     const popups = document.querySelectorAll(".popup");
//     const colseBtn = document.querySelectorAll(".close-btn");

//     buttons.forEach(button => (
//         button.addEventListener('click', function(){
//             const popupId = this.getAttribute('data-popup');

//             popups.forEach(popup => {
//                 popup.classList.remove('active');
//             });
//             document.getElementById(popupId).classList.add('active');
//         })
//     ))

//     colseBtn.forEach(button => {
//         button.addEventListener('click', function() {
//             this.closest('.popup').classList.remove('active')
//         })
//     })

//     popups.forEach(popup => {
//         popups.addEventListener('click', function(e) {
//             if (e.target === this){
//                 this.classList.remove('active')
//             }
//         })
//     })
// })

// let mySwiper = null;

// function initSwiper() {
//     const swiperEl = document.querySelector('.img_wrapper');
//     if (swiperEl && typeof Swiper !== 'undefined') {
//         if (mySwiper) {
//             mySwiper.destroy(true, true);
//         }
        
//         mySwiper = new Swiper('.img_wrapper', {
//             loop: true,
//             pagination: {
//                 el: '.swiper-pagination',
//                 clickable: true,
//             },
//             navigation: {
//                 nextEl: '.swiper-button-next',
//                 prevEl: '.swiper-button-prev',
//             },
//             slidesPerView: 1,
//             spaceBetween: 20,
//             effect: 'slide',
//             speed: 500,
//         });
//     }
// }

// window.addEventListener('load', function() {
//     initSwiper();
    
//     document.querySelectorAll('.stationBtn').forEach(btn => {
//         btn.addEventListener('click', function() {
//             setTimeout(initSwiper, 300);
//         });
//     });
// });