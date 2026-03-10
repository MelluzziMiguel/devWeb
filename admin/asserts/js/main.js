const toggle = document.getElementById('toggleSidebar');
const layout = document.querySelector('.layout');

toggle.addEventListener('click', () => {
    layout.classList.toggle('collapsed')
})