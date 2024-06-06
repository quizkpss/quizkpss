// script.js
const slides = document.querySelectorAll('.slide');
const cardView = document.querySelector('.card-view');
const darkModeToggle = document.querySelector('.dark-mode-toggle');
const cardContents = document.querySelectorAll('.card-content');
const categorySlider = document.querySelector('.category-slider');
const slideWidth = slides[0].offsetWidth; // İlk slide'ın genişliği

// Kategoriye tıklandığında kartı göster
slides.forEach(slide => {
    slide.addEventListener('click', () => {
        // Diğer aktif slaytları devre dışı bırak
        slides.forEach(s => s.classList.remove('active'));

        // Tıklanan slaydı aktif hale getir
        slide.classList.add('active');

        // Kart içeriğini göster
        const category = slide.dataset.category;
        const cardContent = document.querySelector(`.card-content[data-category="${category}"]`);
        if (cardContent) {
            cardContents.forEach(content => content.classList.remove('active')); // Önceki kart içeriğini gizle
            cardContent.classList.add('active');
        }
    });
});

// Karanlık mod işlevi
darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    darkModeToggle.classList.toggle('active'); // Karanlık mod ikonunu değiştir
    slides.forEach(slide => slide.classList.toggle('dark-mode')); // Menü öğeleri için de dark-mode sınıfını ekle veya kaldır
});

// Sayfa yüklendiğinde ilk kartı göster
window.addEventListener('load', () => {
    const firstSlide = document.querySelector('.slide.active');
    const firstCategory = firstSlide.dataset.category;
    const firstCardContent = document.querySelector(`.card-content[data-category="${firstCategory}"]`);
    if (firstCardContent) {
        firstCardContent.classList.add('active');
    }
});
