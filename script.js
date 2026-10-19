
"use strict";

/* SCREEN NAVIGATION */
function nextScreen(screenId) {
  const screens = document.querySelectorAll(".screen");
  const target = document.getElementById(screenId);

  if (!target) {
    console.error("Screen not found:", screenId);
    return;
  }

  screens.forEach((screen) => {
    screen.classList.remove("active");
    screen.setAttribute("aria-hidden", "true");
  });

  target.classList.add("active");
  target.setAttribute("aria-hidden", "false");

  window.scrollTo({ top: 0, behavior: "smooth" });
}

/* WEDDING MUSIC */
function updateMusicButton(isPlaying) {
  const status = document.getElementById("music-status");
  const button = document.getElementById("music-toggle");

  if (status) status.textContent = isPlaying ? "Music On" : "Music Off";

  if (button) {
    button.setAttribute(
      "aria-label",
      isPlaying ? "Pause wedding music" : "Play wedding music"
    );
    button.setAttribute("aria-pressed", String(isPlaying));
  }
}

async function startWeddingMusic() {
  const music = document.getElementById("wedding-music");
  if (!music) return;

  music.volume = 0.7;

  try {
    await music.play();
    updateMusicButton(true);
  } catch (error) {
    console.warn("Music could not start:", error);
    updateMusicButton(false);
  }
}

function toggleWeddingMusic() {
  const music = document.getElementById("wedding-music");
  if (!music) return;

  if (music.paused) {
    startWeddingMusic();
  } else {
    music.pause();
    updateMusicButton(false);
  }
}

function openWeddingInvitation() {
  nextScreen("couple");
  startWeddingMusic();
}

/* WEDDING COUNTDOWN */
function updateCountdown() {
  const days = document.getElementById("days");
  const hours = document.getElementById("hours");
  const minutes = document.getElementById("minutes");
  const seconds = document.getElementById("seconds");

  if (!days || !hours || !minutes || !seconds) return;

  // Ghana local time is UTC+00:00.
  const weddingDate = new Date("2026-10-30T10:00:00+00:00");
  const difference = weddingDate.getTime() - Date.now();

  if (difference <= 0) {
    days.textContent = "0";
    hours.textContent = "00";
    minutes.textContent = "00";
    seconds.textContent = "00";
    return;
  }

  days.textContent = String(Math.floor(difference / 86400000));
  hours.textContent = String(
    Math.floor((difference % 86400000) / 3600000)
  ).padStart(2, "0");
  minutes.textContent = String(
    Math.floor((difference % 3600000) / 60000)
  ).padStart(2, "0");
  seconds.textContent = String(
    Math.floor((difference % 60000) / 1000)
  ).padStart(2, "0");
}

/* RSVP THROUGH WHATSAPP */
function sendRSVP(response) {
  const nameInput = document.getElementById("guest-name");

  if (!nameInput) return;

  const guestName = nameInput.value.trim();

  if (!guestName) {
    alert("Please enter your full name first.");
    nameInput.focus();
    return;
  }

  const answer =
    response === "accept"
      ? "Joyfully accepts"
      : "Regretfully declines";

  const message =
    "Hello Francis and Mabel,\n\n" +
    "My name is " + guestName + ".\n" +
    "I " + answer +
    " your wedding invitation on Friday, 30 October 2026 at 10:00 AM.\n\n" +
    "Venue: Agyementi, near Kitase, Eastern Region, Ghana.\n\n" +
    "Best wishes to you both!";

  const whatsappURL =
    "https://wa.me/?text=" + encodeURIComponent(message);

  const farewellMessage = document.getElementById("farewell-message");

  if (farewellMessage) {
    farewellMessage.textContent =
      "Thank you, " + guestName +
      ". Your RSVP message is ready. Please send it through WhatsApp.";
  }

  nextScreen("farewell");

  const whatsappWindow = window.open(whatsappURL, "_blank");

  if (!whatsappWindow) {
    window.location.href = whatsappURL;
  }
}

/* INITIALIZE THE WEBSITE */
document.addEventListener("DOMContentLoaded", function () {
  console.log("Francis & Mabel wedding website loaded successfully.");

  document.querySelectorAll(".screen").forEach((screen) => {
    screen.setAttribute(
      "aria-hidden",
      screen.classList.contains("active") ? "false" : "true"
    );
  });

  const openButton = document.getElementById("open-invitation");
  const musicButton = document.getElementById("music-toggle");
  const music = document.getElementById("wedding-music");

  if (openButton) {
    openButton.addEventListener("click", openWeddingInvitation);
  }

  if (musicButton) {
    musicButton.addEventListener("click", toggleWeddingMusic);
  }

  document.querySelectorAll("[data-next]").forEach((button) => {
    button.addEventListener("click", function () {
      nextScreen(button.dataset.next);
    });
  });

  document.querySelectorAll("[data-rsvp]").forEach((button) => {
    button.addEventListener("click", function () {
      sendRSVP(button.dataset.rsvp);
    });
  });

  if (music) {
    music.addEventListener("play", () => updateMusicButton(true));
    music.addEventListener("pause", () => updateMusicButton(false));

    music.addEventListener("error", () => {
      console.error("Music file not found. Check music/romantic.mp3.");
      updateMusicButton(false);
    });
  }

  updateCountdown();
  window.setInterval(updateCountdown, 1000);
});
