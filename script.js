const categories = document.querySelectorAll('.category');
const categoryHeaders = document.querySelectorAll('.category-header');
const darkModeToggle = document.querySelector('.dark-mode-toggle');

categoryHeaders.forEach((header, index) => {
    header.addEventListener('click', () => {
        // Diğer tüm kategorilerin içeriğini kapat
        categories.forEach((category, i) => {
            if (i !== index) {
                const categoryContent = category.querySelector('.category-content');
                categoryContent.classList.remove('show');
                const icon = category.querySelector('.category-icon');
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
            }
        });

        // Tıklanan kategorinin içeriğini aç/kapa
        const categoryContent = categories[index].querySelector('.category-content');
        categoryContent.classList.toggle('show');
        const icon = header.querySelector('.category-icon');
        if (categoryContent.classList.contains('show')) {
            icon.classList.remove('fa-chevron-down');
            icon.classList.add('fa-chevron-up');
        } else {
            icon.classList.remove('fa-chevron-up');
            icon.classList.add('fa-chevron-down');
        }
    });
});

darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    darkModeToggle.classList.toggle('fa-sun');
    darkModeToggle.classList.toggle('fa-moon');
});