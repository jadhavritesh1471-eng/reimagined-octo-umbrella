let selectedGender = 'girl';

// Step Navigation Logic
function goToStep(stepNumber) {
    document.querySelectorAll('.step-page').forEach(page => {
        page.classList.add('hidden');
    });
    document.getElementById('step' + stepNumber).classList.remove('hidden');
}

// Gender Selection
document.querySelectorAll('.btn-gender').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.btn-gender').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selectedGender = btn.getAttribute('data-gender');
    });
});

// Photo Upload Logic
const imageUpload = document.getElementById('imageUpload');
const previewContainer = document.getElementById('previewContainer');
const imagePreview = document.getElementById('imagePreview');
const analyzeBtn = document.getElementById('analyzeBtn');

imageUpload.addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            imagePreview.src = e.target.result;
            previewContainer.classList.remove('hidden');
            analyzeBtn.disabled = false;
        }
        reader.readAsDataURL(file);
    }
});

// Analyze & Scan Action
analyzeBtn.addEventListener('click', () => {
    const scanLine = document.getElementById('scanLine');
    const resultSection = document.getElementById('resultSection');
    const meterFill = document.getElementById('meterFill');
    const scoreText = document.getElementById('scoreText');
    const uploadBackBtn = document.getElementById('uploadBackBtn');

    scanLine.classList.remove('hidden');
    analyzeBtn.disabled = true;
    uploadBackBtn.style.display = 'none';

    setTimeout(() => {
        scanLine.classList.add('hidden');
        document.getElementById('step3').classList.add('hidden');
        resultSection.classList.remove('hidden');

        const isGoodLook = Math.random() > 0.4;
        const score = isGoodLook ? Math.floor(Math.random() * 16) + 85 : Math.floor(Math.random() * 21) + 55;

        meterFill.style.width = score + '%';
        scoreText.innerText = score + '%';

        generateReview(selectedGender, document.getElementById('themeSelect').value, isGoodLook);
    }, 3000);
});

// Premium Hinglish Database
function generateReview(gender, theme, isGood) {
    const verdictTag = document.getElementById('verdictTag');
    const mainComment = document.getElementById('mainComment');
    const detailsText = document.getElementById('detailsText');
    const adviceBox = document.getElementById('adviceBox');
    const adviceText = document.getElementById('adviceText');

    if (gender === 'girl') {
        if (isGood) {
            verdictTag.style.backgroundColor = '#2e7d32'; verdictTag.innerText = '🔥 Drop-Dead Gorgeous!';
            mainComment.innerText = 'You look absolutely stunning and beautiful! Ekdam laakhaat ek face... your vibe is completely unmatched! 😍';
            detailsText.innerHTML = 'Your jewelry choices are extremely elegant and aesthetically pleasing. Te galyatla ani kantala is looking so delicate, perfectly matching your outfit color tone! The premium golden border of the saree is creating an elite contrast with those red bangles on your red blouse. Aur is poore flawless look ko completely next level par le gaya hai aapka <b>Gajra</b>!';
            adviceBox.classList.add('hidden');
        } else {
            verdictTag.style.backgroundColor = '#c62828'; verdictTag.innerText = '💡 Quick Style Transformation Needed';
            mainComment.innerText = 'The look is sweet, but it needs a little bit of glamour to stand out! 🤔';
            detailsText.innerHTML = 'The overall color coordination feels a bit cluttered. Blouse ka color pattern saree ke border se properly match nahi ho raha hai, and heavy design ki wajah से neck area is looking too crowded instead of looking neat.';
            adviceBox.classList.remove('hidden');
            adviceText.innerText = 'Try using a premium nude or lighter lipstick shade for this theme. Instead of a heavy necklace, just wear a delicate chain and pair it with big statement earrings, look bilkul attractive aur khul ke dikhega!';
        }
    } else { // For Boys
        if (isGood) {
            verdictTag.style.backgroundColor = '#1565c0'; verdictTag.innerText = '😎 Incredibly Dashing & Dapper!';
            mainComment.innerText = 'Ekdam kadak look, bhai! Full on main character energy... total sharp and handsome vibe! 👑';
            detailsText.innerHTML = 'The premium collar structure and fitting of your shirt/kurta is absolutely on point. Well-groomed beard style and clean hair cut aapke face structure ko perfectly complement kar rahe hain. That classy premium watch in hand and your confident posture makes this look completely unbeatable!';
            adviceBox.classList.add('hidden');
        } else {
            verdictTag.style.backgroundColor = '#c62828'; verdictTag.innerText = '💡 Fashion Alert!';
            mainComment.innerText = 'Outfit combination could be slightly more polished, bhau! 🙄';
            detailsText.innerHTML = 'Shirt aur pants ke color ka contrast properly balance nahi ho paa raha hai to look premium. Also, the messy, unstyled hair is taking away from the otherwise sharp structure of your overall personality.';
            adviceBox.classList.remove('hidden');
            adviceText.innerText = 'Try unbuttoning the top shirt button and wear a sleek metal chain or premium sunglasses. Focus on darker shirts with lighter pants, settle your hair properly with some gel, and you will look absolutely stellar!';
        }
    }
}

document.getElementById('resetBtn').addEventListener('click', () => {
    location.reload();
});
