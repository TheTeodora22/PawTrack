document.addEventListener('DOMContentLoaded', () => {
    const mainSection = document.querySelector('.main');

    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        const colors = ['#D8B59E', '#9A7E6F', '#D8B5AE'];
        const index = Math.min(Math.floor(scrollPosition / 200), colors.length - 1);
        mainSection.style.backgroundColor = colors[index];
    });
});
