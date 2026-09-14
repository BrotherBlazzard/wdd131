let d = new Date();
document.getElementById("currentYear").innerHTML = `&copy;${d.getFullYear()}`;
document.querySelector('#lastModified').textContent = `Last Modification: ${document.lastModified}`;

const hambutton = document.querySelector('#hambutton');
const navmenu = document.querySelector('#navmenu');

hambutton.addEventListener('click', (event) => {
  event.preventDefault();
  document.querySelector('h1.handler').classList.toggle('show');
  navmenu.classList.toggle('show');
  hambutton.classList.toggle('show');
});

function toggleActive(element) {
  document.querySelectorAll('#navmenu a').forEach((link) => {
    link.classList.remove('active');
  });
  element.classList.add('active');
}

document.querySelectorAll('#navmenu a').forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    toggleActive(link);
  });
});
