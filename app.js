function initApp() {
    console.log('Initializing app...');
    
    initLoader();

    initNavigation();
    
    initRouteButtons();
    
    initStationPopups();
    
    console.log('App initialized successfully');
}

function initNavigation() {
    const navTitle = document.querySelector('.navTitle');
    const navMenu = document.querySelector('.navMenu');
    
    if (navTitle && navMenu) {
        navTitle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
        
        window.addEventListener('scroll', function() {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
        });
    }
}

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
            trevel.scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    if (btnZ && zelts) {
        btnZ.addEventListener('click', function() {
            if (trevel) trevel.classList.add('active');
            zelts.classList.add('active');
            if (marksa) marksa.classList.remove('active');
            trevel.scrollIntoView({ behavior: 'smooth' });
        });
    }
}

function initStationPopups() {
    const popupButtons = document.querySelectorAll('.stationBtn');
    const popups = document.querySelectorAll('.popup');
    const closeButtons = document.querySelectorAll('.close-btn');
    
    console.log('Found popup buttons:', popupButtons.length);
    console.log('Found popups:', popups.length);
    
    popups.forEach(popup => {
        popup.classList.remove('active');
    });
    
    popupButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const popupId = this.getAttribute('data-popup');
            console.log('Opening popup:', popupId);
            
            popups.forEach(popup => {
                popup.classList.remove('active');
            });
            
            const targetPopup = document.getElementById(popupId);
            if (targetPopup) {
                targetPopup.classList.add('active');
                console.log('Popup classes:', targetPopup.classList);
                initSwiperForPopup(targetPopup);
                
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    closeButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const popup = this.closest('.popup');
            if (popup) {
                popup.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
    
    popups.forEach(popup => {
        popup.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
    
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

function initSwiperForPopup(popup) {
    const swiperContainer = popup.querySelector('.swiper');
    
    if (swiperContainer && typeof Swiper !== 'undefined') {
        if (swiperContainer.swiper) {
            swiperContainer.swiper.destroy(true, true);
        }
        
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
function initLoader() {
    const loader = document.querySelector('.loader');
    
    if (loader) {
        // Скрываем прелоадер после полной загрузки страницы
        window.addEventListener('load', function() {
            setTimeout(function() {
                loader.classList.add('loader-hidden');
                
                // Удаляем прелоадер после завершения анимации
                loader.addEventListener('transitionend', function() {
                    if (loader.parentNode) {
                        loader.parentNode.removeChild(loader);
                    }
                });
            }, 1000); // Задержка 1 секунда для демонстрации
        });
        
        // Альтернативно: скрыть через 3 секунды максимум
        setTimeout(function() {
            if (loader.parentNode) {
                loader.classList.add('loader-hidden');
                setTimeout(function() {
                    if (loader.parentNode) {
                        loader.parentNode.removeChild(loader);
                    }
                }, 500);
            }
        }, 3000);
    }
}
window.addEventListener('error', function(e) {
    console.error('Global error:', e.error);
});


if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}
