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
    const file = this.files;
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

        const isGoodLook = Math.random() > 0.3; // 70% chance high score
        const score = isGoodLook ? Math.floor(Math.random() * 16) + 85 : Math.floor(Math.random() * 21) + 55;

        meterFill.style.width = score + '%';
        scoreText.innerText = score + '%';

        generateReview(selectedGender, document.getElementById('themeSelect').value, isGoodLook);
    }, 3000);
});

// Premium Hinglish Database with New Themes
function generateReview(gender, theme, isGood) {
    const verdictTag = document.getElementById('verdictTag');
    const mainComment = document.getElementById('mainComment');
    const detailsText = document.getElementById('detailsText');
    const adviceBox = document.getElementById('adviceBox');
    const adviceText = document.getElementById('adviceText');

    if (gender === 'girl') {
        if (isGood) {
            verdictTag.style.backgroundColor = '#2e7d32'; verdictTag.innerText = '🔥 Absolutely Gorgeous!';
            adviceBox.classList.add('hidden');

            if (theme === 'bollywood') {
                mainComment.innerText = 'Full Bollywood Actress Vibe! Direct cinema parda par entry honi chahiye aapki! 😍';
                detailsText.innerHTML = 'Aapka pose aur dress selection ekदम dynamic hai, bilkul 90s ki superhit heroine jaisa! The outfit colors are popping out beautifully under the lights, and that dramatic facial expression is pure gold. Flawless beauty!';
            } else if (theme === 'streetwear') {
                mainComment.innerText = 'Super Chill & Trendy! You are completely killing this streetwear look! 🔥';
                detailsText.innerHTML = 'Oversized top aur elements ka coordination builds a killer aesthetic. Loose hair and minimal rings look absolutely aesthetic. High-street fashion at its best!';
            } else if (theme === 'corporate') {
                mainComment.innerText = 'Elite Corporate Slay! Office boss lady energy all over! 💼';
                detailsText.innerHTML = 'That sharp blazer/formal look is giving massive professional goals. Minimalist watch, sleek hair, and a confident smile... aapke is charm ke aage poori company flat ho jayegi!';
            } else { // Default traditional/modern/hot
                mainComment.innerText = 'You look absolutely stunning! Ekdam laakhaat ek face... your vibe is completely unmatched! 😍';
                detailsText.innerHTML = 'Your jewelry choices are extremely elegant. Te galyatla ani kantala is looking so delicate, perfectly matching your outfit color tone! Saree border ka golden touch and red bangles look elite. Flawless look!';
            }
        } else {
            verdictTag.style.backgroundColor = '#c62828'; verdictTag.innerText = '💡 Style Alert';
            adviceBox.classList.remove('hidden');

            if (theme === 'bollywood') {
                mainComment.innerText = 'Look to achha hai, but it lacks that typical Bollywood drama! 🤔';
                detailsText.innerHTML = 'Outfit and background simple lag rahe hain, cinematic feel missing hai. Background colors and clothes match nahi ho rahe.';
                adviceText.innerText = 'Try using brighter colors like red or yellow for Bollywood theme, aur pose thoda extra dramatic rakho! Bold shades ki lipstick add karo.';
            } else if (theme === 'streetwear') {
                mainComment.innerText = 'Street style me maza nahi aaya, it looks a bit plain! 🙄';
                detailsText.innerHTML = 'Oversized outfit bina sneakers ke complete nahi lagta. Color pairing thodi dull lag rahi hai.';
                adviceText.innerText = 'Streetwear ke liye chunky sneakers, ek cool cap ya metallic chain add karo. Loose baggy pants perfectly match karengi!';
            } else if (theme === 'corporate') {
                mainComment.innerText = 'Formal vibe is nice, but it looks a bit too casual! 💼';
                detailsText.innerHTML = 'Clothing fitting could be sharper, formal look me lines aur fitting solid honi chahiye.';
                adviceText.innerText = 'Apne blazers ki fitting check karo. Deep colors like Navy Blue ya Black select karo, hair properly tie karo for clean look.';
            } else {
                mainComment.innerText = 'The look is sweet, but it needs a little bit of glamour to stand out! 🤔';
                detailsText.innerHTML = 'The overall color coordination feels a bit cluttered. Blouse pattern border se match nahi ho raha.';
                adviceText.innerText = 'Try using premium nude or lighter lipstick. Heavy necklace ki jagah delicate chain aur statement earrings pehno!';
            }
        }
    } else { // For Boys
        if (isGood) {
            verdictTag.style.backgroundColor = '#1565c0'; verdictTag.innerText = '😎 Incredibly Dashing & Dapper!';
            adviceBox.classList.add('hidden');

            if (theme === 'bollywood') {
                mainComment.innerText = 'Ekdam Shah Rukh Khan vibe, bhai! Picture ka hero dikh raha hai tu! 👑';
                detailsText.innerHTML = 'That charming style and open-button shirt code is giving elite 90s hero vibe. Well-set hair and the dramatic background lighting perfectly matches your star persona. Blockbuster look, brother!';
            } else if (theme === 'streetwear') {
                mainComment.innerText = 'Full Hip-Hop Vibe! Hard core streetwear style, bhau! 🧢';
                detailsText.innerHTML = 'Oversized t-shirt and those premium sneakers ka game ekdam on-point hai. Wrist band, dynamic chains, aur dynamic pose pura hip-hop culture reflect kar rahe hain. Pure hypebeast look!';
            } else if (theme === 'corporate') {
                mainComment.innerText = 'Pure Corporate King! Executive and sharp look, bhai! 💼';
                detailsText.innerHTML = 'The formal suit/blazer cutting is flawless. Well-groomed beard style, perfectly polished shoes vibe, and that luxury premium watch in hand is giving hardcore billionaire energy!';
            } else {
                mainComment.innerText = 'Ekdam kadak look, bhai! Full on main character energy... total sharp vibe! 👑';
                detailsText.innerHTML = 'The premium collar structure and fitting of your outfit is absolutely on point. Well-groomed beard style and clean hair cut aapke face structure ko perfectly complement kar rahe hain. Complete unbeatable look!';
            }
        } else {
            verdictTag.style.backgroundColor = '#c62828'; verdictTag.innerText = '💡 Fashion Alert!';
            adviceBox.classList.remove('hidden');

            if (theme === 'bollywood') {
                mainComment.innerText = 'Hero waali baat nahi ban paayi, bhau! 🙄';
                detailsText.innerHTML = 'Expression thoda blank lag raha hai aur pose bahut jyada simple ya stiff hai. Cinematic energy missing hai.';
                adviceText.innerText = 'Agle photo me cool sunglasses lagao, face par thodi attitude waali smile rakho aur hair ko gel se piche stroke karo!';
            } else if (theme === 'streetwear') {
                mainComment.innerText = 'Streetwear loop chukla aahe thoda sa! 🧢';
                detailsText.innerHTML = 'Normal tight jeans ke upar oversized top accha nahi lag raha. Hip-hop vibe nahi aa rahi.';
                adviceText.innerText = 'Baggy cargos ya loose joggers pehno. Canvas shoes ke badle proper white sports sneakers aur neck chain add karo!';
            } else if (theme === 'corporate') {
                mainComment.innerText = 'Bhai, board meeting me aisi dressing nahi chalegi! ❌';
                detailsText.innerHTML = 'Formal shirts properly ironed nahi lag rahi hain aur color combo thoda faded dikh raha hai.';
                adviceText.innerText = 'Always tuck-in your shirt properly. Ek acchi premium leather belt pehno aur shoe color and belt color hamesha black/brown matching rakho!';
            } else {
                mainComment.innerText = 'Outfit combination could be slightly more polished, bhau! 🙄';
