const hambuttonElement = document.querySelector('#ham-btn');
const mainnavElement = document.querySelector('.navigation');

hambuttonElement.addEventListener('click', () => {
    mainnavElement.classList.toggle('show');
    hambuttonElement.classList.toggle('show');
});
