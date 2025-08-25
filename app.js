let navMenu = document.querySelector('.navMenu');

document.querySelector('.navTitle').onclick = () => {
    navMenu.classList.toggle('active')
};

window.addEventListener('scroll', () => {
    if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
    }
});

let trevel = document.querySelector('.trevel');
let marksa = document.querySelector('.marksa');
let zelts = document.querySelector('.zelts');

document.querySelector('#M').onclick = () => {
    trevel.classList.add('active')
    marksa.classList.add('active')
    zelts.classList.remove('active');
};
document.querySelector('#Z').onclick = () => {
    trevel.classList.add('active')
    zelts.classList.add('active')
    marksa.classList.remove('active');
};

document.addEventListener("DOMContentLoaded", function() {
    const buttons = document.querySelectorAll(".stationBtn");
    const popups = document.querySelectorAll(".popup");
    const colseBtn = document.querySelectorAll(".close-btn");

    buttons.forEach(button => (
        button.addEventListener('click', function(){
            const popupId = this.getAttribute('data-popup');

            popups.forEach(popup => {
                popup.classList.remove('active');
            });
            document.getElementById(popupId).classList.add('active');
        })
    ))

    colseBtn.forEach(button => {
        button.addEventListener('click', function() {
            this.closest('.popup').classList.remove('active')
        })
    })

    popups.forEach(popup => {
        popups.addEventListener('click', function(e) {
            if (e.target === this){
                this.classList.remove('active')
            }
        })
    })
})

let mySwiper = null;

function initSwiper() {
    const swiperEl = document.querySelector('.img_wrapper');
    if (swiperEl && typeof Swiper !== 'undefined') {
        if (mySwiper) {
            mySwiper.destroy(true, true);
        }
        
        mySwiper = new Swiper('.img_wrapper', {
            loop: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            slidesPerView: 1,
            spaceBetween: 20,
            effect: 'slide',
            speed: 500,
        });
    }
}

window.addEventListener('load', function() {
    initSwiper();
    
    document.querySelectorAll('.stationBtn').forEach(btn => {
        btn.addEventListener('click', function() {
            setTimeout(initSwiper, 300);
        });
    });
});