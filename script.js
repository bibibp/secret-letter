
const opening = document.getElementById("opening");
const letterScreen = document.getElementById("letterScreen");
const thanksScreen = document.getElementById("thanksScreen");
const endingScreen = document.getElementById("endingScreen");

const envelopeButton = document.getElementById("openEnvelope");
const clickHint = document.getElementById("clickHint");

const continueButton = document.getElementById("continueButton");
const endingButton = document.getElementById("endingButton");
const restartButton = document.getElementById("restartButton");

const music = document.getElementById("music");
const musicButton = document.getElementById("musicButton");
const musicBars = document.getElementById("musicBars");
const musicControl = document.querySelector(".music-control");
const progressFill = document.getElementById("progressFill");

const screens = [
    opening,
    letterScreen,
    thanksScreen,
    endingScreen
];

let currentScreen = 0;
let isOpening = false;

function showScreen(index) {
    screens.forEach((screen, i) => {
        screen.classList.toggle("active", i === index);
    });

    currentScreen = index;
    progressFill.style.width = `${(index / (screens.length - 1)) * 100}%`;

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

function openLetter() {
    if (isOpening) return;

    isOpening = true;
    envelopeButton.classList.add("opening-animation");
    clickHint.textContent = "[ OPENING LETTER... ]";

    // Coba memulai musik setelah interaksi pengguna.
    playMusic();

    setTimeout(() => {
        showScreen(1);
        isOpening = false;
    }, 950);
}

envelopeButton.addEventListener("click", openLetter);

continueButton.addEventListener("click", () => {
    showScreen(2);
});

endingButton.addEventListener("click", () => {
    showScreen(3);
});

restartButton.addEventListener("click", () => {
    envelopeButton.classList.remove("opening-animation");
    clickHint.textContent = "[ KLIK UNTUK MEMBUKA ]";
    showScreen(0);
});

// Musik latar
async function playMusic() {
    try {
        music.volume = 0.7;

        const result = music.play();
        await result;

        updateMusicButton(true);
        console.log("Musik berhasil diputar!");
    } catch (error) {
        updateMusicButton(false);

        console.error("Gagal memutar musik:", error);
        console.log("Audio source:", music.currentSrc);
        console.log("Audio error:", music.error);
        alert("Musik gagal diputar. Cek Console (F12) untuk melihat penyebabnya.");
    }
}

function updateMusicButton(isPlaying) {
    musicButton.textContent = isPlaying ? "MUSIC: ON" : "MUSIC: OFF";
    musicBars.textContent = isPlaying ? "♫" : "♪";
    musicControl.classList.toggle("playing", isPlaying);
}

musicButton.addEventListener("click", async () => {
    if (music.paused) {
        await playMusic();
    } else {
        music.pause();
        updateMusicButton(false);
    }
});

music.addEventListener("play", () => updateMusicButton(true));
music.addEventListener("pause", () => updateMusicButton(false));

music.addEventListener("error", () => {
    console.error("File audio gagal dimuat:", music.error);
    console.error("Alamat audio:", music.currentSrc);
});