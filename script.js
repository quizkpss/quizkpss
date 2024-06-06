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

// Cevap kontrol fonksiyonu
function checkAnswer(category, selectedAnswer) {
    const quizId = `${category}-quiz`;
    const resultId = `${category}-result`;
    const correctAnswer = category === 'teknoloji' ? 'A' : 'B'; // Teknoloji için doğru cevap A, diğerleri için B

    const resultElement = document.getElementById(resultId);

    // Doğru cevap seçilmişse
    if (selectedAnswer === correctAnswer) {
        resultElement.innerHTML = 'Doğru Cevap!';
        resultElement.style.color = 'green';
        
        // Tüm cevap seçeneklerini devre dışı bırak
        document.querySelectorAll(`input[name="${category}-q1"]`).forEach(input => {
            input.disabled = true;
        });

        // Doğru seçilen cevabı yeşil yap
        const correctAnswerLabel = document.querySelector(`input[name="${category}-q1"][value="${correctAnswer}"] + label`);
        correctAnswerLabel.style.backgroundColor = '#4CAF50'; 
        correctAnswerLabel.style.color = '#fff';

    } else { // Yanlış cevap seçilmişse
        resultElement.innerHTML = 'Yanlış Cevap!';
        resultElement.style.color = 'red';

        // Tüm cevap seçeneklerini devre dışı bırak
        document.querySelectorAll(`input[name="${category}-q1"]`).forEach(input => {
            input.disabled = true;
        });

        // Yanlış seçilen cevabı kırmızı yap
        const wrongAnswerLabel = document.querySelector(`input[name="${category}-q1"][value="${selectedAnswer}"] + label`);
        wrongAnswerLabel.style.backgroundColor = '#f44336'; 
        wrongAnswerLabel.style.color = '#fff';

        // Doğru cevabı yeşil yap
        const correctAnswerLabel = document.querySelector(`input[name="${category}-q1"][value="${correctAnswer}"] + label`);
        correctAnswerLabel.style.backgroundColor = '#4CAF50'; 
        correctAnswerLabel.style.color = '#fff';
      
      // Seçilen cevabı koyu yap
const selectedLabel = document.querySelector(`input[name="${category}-q1"]:checked + label`);
selectedLabel.style.fontWeight = 'bold';
    }
}
