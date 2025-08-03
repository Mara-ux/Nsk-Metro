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