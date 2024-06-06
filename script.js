const slides = document.querySelectorAll('.slide');
const cardView = document.querySelector('.card-view');
const darkModeToggle = document.querySelector('.dark-mode-toggle');
const cardContents = document.querySelectorAll('.card-content');
const categorySlider = document.querySelector('.category-slider');
const fontIncreaseBtn = document.getElementById('increase-font');
const fontDecreaseBtn = document.getElementById('decrease-font');

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

// Üste Çık Fonksiyonu
function topFunction() {
  document.body.scrollTop = 0; 
  document.documentElement.scrollTop = 0; 
}

// Üste çık düğmesini görüntülemek için sayfa kaydırma olayı
window.onscroll = function() {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("goTopBtn").style.display = "block";
  } else {
    document.getElementById("goTopBtn").style.display = "none";
  }
}


// Doğru cevapları belirleyin
const correctAnswers = {
    teknoloji: 'A',
    moda: 'A',
    sanat: 'B',
    yemek: 'A',
     seyahat: 'B',
    // Diğer kategoriler ve doğru cevapları ekleyin
};

// Cevap kontrol fonksiyonu
function checkAnswer(category, selectedAnswer) {
    const resultId = `${category}-result`;
    const correctAnswer = correctAnswers[category];
    const resultElement = document.getElementById(resultId);

    // Doğru cevap seçilmişse
    if (selectedAnswer === correctAnswer) {
        resultElement.innerHTML = 'Doğru Cevap!';
        resultElement.style.color = 'green';

        // Doğru seçilen cevabı yeşil yap
        const correctAnswerLabel = document.querySelector(`input[name="${category}-q1"][value="${correctAnswer}"] + label`);
        correctAnswerLabel.style.backgroundColor = '#4CAF50';
        correctAnswerLabel.style.color = '#fff';

    } else { // Yanlış cevap seçilmişse
        resultElement.innerHTML = 'Yanlış Cevap!';
        resultElement.style.color = 'red';

        // Yanlış seçilen cevabı kırmızı yap
        const wrongAnswerLabel = document.querySelector(`input[name="${category}-q1"][value="${selectedAnswer}"] + label`);
        wrongAnswerLabel.style.backgroundColor = '#f44336';
        wrongAnswerLabel.style.color = '#fff';

        // Doğru cevabı yeşil yap
        const correctAnswerLabel = document.querySelector(`input[name="${category}-q1"][value="${correctAnswer}"] + label`);
        correctAnswerLabel.style.backgroundColor = '#4CAF50';
        correctAnswerLabel.style.color = '#fff';
    }

    // Tüm cevap seçeneklerini devre dışı bırak
    document.querySelectorAll(`input[name="${category}-q1"]`).forEach(input => {
        input.disabled = true;
    });
}

// Font Boyutu Değiştirme Fonksiyonu
function changeFontSize(increment) {
    cardContents.forEach(content => {
        const textElements = content.querySelectorAll('p, li, h2, h3');
        textElements.forEach(element => {
            let currentFontSize = parseFloat(getComputedStyle(element).fontSize); // Hesaplanmış font boyutunu al
            currentFontSize += increment;
            element.style.fontSize = `${currentFontSize}px`;
        });
    });
}

// Butonlara Olay Dinleyicileri Ekle
fontIncreaseBtn.addEventListener('click', () => changeFontSize(2)); // 2px artır
fontDecreaseBtn.addEventListener('click', () => changeFontSize(-2)); // 2px azalt

// Her kategori için ayrı quiz kontrolü ekleyin
cardContents.forEach(cardContent => {
    const category = cardContent.dataset.category;
    const answers = cardContent.querySelectorAll(`input[name="${category}-q1"]`);

    answers.forEach(answer => {
        answer.addEventListener('click', () => {
            checkAnswer(category, answer.value);
        });
    });
});
