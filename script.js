
"use strict";

// Navigate between invitation screens
function nextScreen(screenId) {
    const next = document.getElementById(screenId);

    if (!next) {
        console.error("Invitation screen not found:", screenId);
        return;
    }

    const current = document.querySelector(".screen.active");

    if (current === next) return;

    if (current) {
        current.classList.remove("active");
    }

    next.classList.add("active");

    // Restart the entrance animation
    void next.offsetWidth;

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


function sendRSVP(choice, contact) {
    const response = choice === "accept"
        ? "Joyfully accept"
        : "Regretfully decline";

    const contacts = {
        francis: "233247927914",
        mabel: "233245755255"
    };

    const phoneNumber = contacts[contact];

    if (!phoneNumber) {
        alert("Please select a valid RSVP contact.");
        return;
    }

    const message =
        `Hello ${contact === "francis" ? "Francis" : "Mabel"}!\n\n` +
        `Regarding the wedding of Francis and Mabel on ` +
        `Friday, 30 October 2026 at 10:00 AM:\n\n` +
        `My RSVP: ${response}.\n\n` +
        `Best wishes!`;

    const whatsappURL =
        `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

        window.open(whatsappURL, "_blank", "noopener,noreferrer");

        const farewellMessage = document.getElementById("farewell-message");
        
        if (farewellMessage) {
            farewellMessage.textContent =
                choice === "accept"
                    ? "Thank you for confirming! We look forward to celebrating with you."
                    : "Thank you for letting us know. With love and best wishes from Francis and Mabel.";
        }
        
        nextScreen("farewell");}


// Wedding countdown: 30 October 2026, 10:00 AM Ghana time (UTC)
function updateCountdown() {
    const countdown = document.getElementById("countdown");

    if (!countdown) return;

    const weddingTime = Date.UTC(2026, 9, 30, 10, 0, 0);
    const now = Date.now();
    const difference = weddingTime - now;

    if (difference <= 0) {
        countdown.innerHTML = `
            <div class="countdown-message">
                Our special day is here! ♥
            </div>
        `;
        return;
    }

    const days = Math.floor(difference / 86400000);
    const hours = Math.floor((difference % 86400000) / 3600000);
    const minutes = Math.floor((difference % 3600000) / 60000);
    const seconds = Math.floor((difference % 60000) / 1000);

    countdown.innerHTML = `
        <div class="countdown-box">
            <span class="countdown-number">${days}</span>
            <span class="countdown-label">Days</span>
        </div>

        <div class="countdown-box">
            <span class="countdown-number">${hours}</span>
            <span class="countdown-label">Hours</span>
        </div>

        <div class="countdown-box">
            <span class="countdown-number">${minutes}</span>
            <span class="countdown-label">Minutes</span>
        </div>

        <div class="countdown-box">
            <span class="countdown-number">${seconds}</span>
            <span class="countdown-label">Seconds</span>
        </div>
    `;
}

// Start and refresh countdown every second
updateCountdown();
window.setInterval(updateCountdown, 1000);
// Wedding background music
function startWeddingMusic() {
    const music = document.getElementById("wedding-music");

    if (!music) {
        console.error("Wedding music element not found.");
        return;
    }

    music.volume = 0.7;

    music.play()
        .then(() => {
            console.log("Wedding music is playing.");
        })
        .catch((error) => {
            console.error("Music playback failed:", error);
        });
}

function toggleWeddingMusic() {
    const music = document.getElementById("wedding-music");
    const status = document.getElementById("music-status");
    const button = document.getElementById("music-toggle");

    if (!music || !status || !button) return;

    if (music.paused) {
        startWeddingMusic();

        status.textContent = "Music On";
        button.setAttribute("aria-label", "Mute wedding music");
    } else {
        music.pause();

        status.textContent = "Music Off";
        button.setAttribute("aria-label", "Play wedding music");
    }
}
