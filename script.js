let step = 0;
let musicStarted = false;
let noInterval = null;

/* ================= MUSIC ================= */

function startMusicOnce() {
  if (musicStarted) return;
  const music = document.getElementById("bgMusic");
  if (!music) return;

  music.volume = 0.4;
  music.play().catch(() => {});
  musicStarted = true;

  const btn = document.getElementById("musicBtn");
  if (btn) btn.innerText = "🔊";
}

function toggleMusic() {
  const bg = document.getElementById("bgMusic");
  const letter = document.getElementById("letterMusic");
  const btn = document.getElementById("musicBtn");

  // if letter music is currently playing, control it
  if (letter && !letter.paused) {
    letter.pause();
    btn.innerText = "🔇";
    return;
  }

  // if letter music is paused but bg is also paused, resume letter music
  if (letter && letter.currentTime > 0 && letter.paused) {
    letter.play().catch(() => {});
    btn.innerText = "🔊";
    return;
  }

  // otherwise control background music
  if (!bg) return;

  if (bg.paused) {
    bg.play().catch(() => {});
    btn.innerText = "🔊";
  } else {
    bg.pause();
    btn.innerText = "🔇";
  }
}

function playLetterMusic() {
  const bg = document.getElementById("bgMusic");
  const letter = document.getElementById("letterMusic");

  // stop background music completely
  if (bg) {
    bg.pause();
  }

  // start letter music
  if (letter) {
    letter.currentTime = 0;
    letter.volume = 0.25;
    letter.play().catch(() => {});
  }
}

function stopLetterMusic() {
  const bg = document.getElementById("bgMusic");
  const letter = document.getElementById("letterMusic");

  // stop letter music
  if (letter) {
    letter.pause();
    letter.currentTime = 0;
  }

  // resume background music
  if (bg) {
    bg.volume = 0.4;
    bg.play().catch(() => {});
  }
}



/* ================= TYPING ================= */

function typeText(el, text, speed = 40) {
  el.innerHTML = "";
  let i = 0;

  const container = el.closest(".letter-wrap");

  const interval = setInterval(() => {
    if (i >= text.length) {
      clearInterval(interval);
      return;
    }

    // 👇 if HTML tag, insert instantly
    if (text[i] === "<") {
      const tagEnd = text.indexOf(">", i);
      el.innerHTML += text.slice(i, tagEnd + 1);
      i = tagEnd + 1;
    } else {
      el.innerHTML += text[i];
      i++;
    }

    // auto-scroll while typing
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, speed);
}


/* ================= HEARTS ================= */

function createHeart() {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.innerText = "💖";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.bottom = "0px";
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 3000);
}

/* ================= MAIN FLOW ================= */

function nextStep() {
  startMusicOnce();
  createHeart();
  step++;

  const card = document.getElementById("card");

  if (step === 1) {
    card.innerHTML = `
      <h1>So… 💭</h1>
      <p id="text"></p>
      <button onclick="nextStep()">Continue</button>
    `;
    typeText(
  document.getElementById("text"),
  `I wanted to do something a little different
this Valentine since we aren't dating.`
);

  }

  else if (step === 2) {
    fadeTo(  `
      <h1>Quick choice 😌</h1>
      <p> What vibe do you feel for the day?</p>
      <button onclick="choose('cute')">Cute 💗</button>
      <button onclick="choose('funny')">Funny 😄</button>
      <button onclick="choose('romantic')">Romantic 🌙</button>
    `);
  }

  else if (step === 3) {
    fadeTo( `
      <h1>Quick quiz 😌</h1>
      <p>What do you think, makes me smile the most?</p>
      <button onclick="correct()">You 💖</button>
      <button onclick="wrong()">Food 🍕</button>
      <button onclick="wrong()">Sleep 😴</button>
    `);
  }

  else if (step === 4) {
    fadeTo(`
      <h1>Be honest 😌</h1>
      <p>How much do you like my surprises?</p>
      <input type="range" min="0" max="100" value="50"
        oninput="updateSlider(this.value)">
      <p id="sliderText">50%</p>
      <button onclick="nextStep()">Next</button>
    `);
  }

  else if (step === 5) {
    showLetterBeforeProposal();
  }
}

/* ================= HELPERS ================= */

function choose(vibe) {
  step = 2;
  const messages = {
    cute: "Of course, your beauty makes it even cuterrrr🧿",
    funny: "I knew you’d pick chaos 😄",
    romantic: "Alright… Now heart is officially involved 🌙"
  };

  document.getElementById("card").innerHTML = `
    <h1>${vibe.toUpperCase()} MODE</h1>
    <p>${messages[vibe]}</p>
    <button onclick="nextStep()">Continue</button>
  `;
}

function correct() {
  popperEffect(); // 🎉 POP!
  step = 3;
  document.getElementById("card").innerHTML = `
    <h1>Correct, I hope it wasn't that hard 😏</h1>
    <p>You know me too well 💕</p>
    <button onclick="nextStep()">Continue</button>
  `;
}

function wrong() {
  alert("Come on yrr, try again 😔");
}

function updateSlider(val) {
  document.getElementById("sliderText").innerText =
    val + "% intrigued 👀";
}
function popperEffect() {
  const icons = ["💖", "✨", "💫", "🌸"];
  const count = 22;

  for (let i = 0; i < count; i++) {
    const el = document.createElement("div");
    el.className = "popper";

    el.innerText = icons[Math.floor(Math.random() * icons.length)];

    // random spread
    const x = Math.random() * 220 - 110;
    el.style.setProperty("--x", x + "px");

    el.style.left = "50vw";
    el.style.top = "45vh";
    el.style.animationDelay = Math.random() * 0.15 + "s";

    document.body.appendChild(el);

    setTimeout(() => el.remove(), 1600);
  }
}


/* ================= LETTER BEFORE PROPOSAL ================= */

function showLetterBeforeProposal() {
  playLetterMusic();

  document.getElementById("card").innerHTML = `
    <div class="letter-wrap flicker" id="letterWrap">
      <div class="letter-title" id="letterTitle">Ek aur khat tere naam</div>


      <div id="letterText" class="letter-text"></div>

      <div class="signature" id="signature" style="opacity:0;">
        — Yours
      </div>
    </div>

    <button id="letterBtn" disabled>Continue ✨</button>
  `;

  const letter = 
`Babbu,


Before I ask you something important,
I know you told me to wait but
I just wanted you to know this.`;

  const textEl = document.getElementById("letterText");
  const wrap = document.getElementById("letterWrap");
  const btn = document.getElementById("letterBtn");
  const sig = document.getElementById("signature");

  const speed = 45;

  typeText(textEl, letter, speed);

  const totalTime = letter.length * speed + 300;

  setTimeout(() => {
    wrap.classList.remove("flicker");   // stop candle flicker
    sig.style.opacity = 1;              // reveal signature
    sig.style.transition = "opacity 1.2s ease";

    btn.disabled = false;
    btn.onclick = showBeforeProposalSlideshow;
    enableHiddenLine();
  }, totalTime);
  

}
function showBeforeProposalSlideshow() {
  const card = document.getElementById("card");

  bpIndex = 0;
  if (bpInterval) clearInterval(bpInterval);

  card.innerHTML = `
    <div id="bpSlide" style="position:relative;"></div>
  `;

  renderBpSlide();

  bpInterval = setInterval(() => {
    bpIndex++;

    if (bpIndex >= beforeProposalSlides.length) {
      clearInterval(bpInterval);
      showProposal();
      return;
    }

    renderBpSlide();
  }, 4000);
}
function renderBpSlide() {
  const slide = beforeProposalSlides[bpIndex];
  const container = document.getElementById("bpSlide");

  if (!container) return;

  container.innerHTML = `
    <div style="
      position:relative;
      width:100%;
      height:70vh;
      border-radius:18px;
      overflow:hidden;
    ">
      <img 
        src="${slide.src}"
        style="
          width:100%;
          height:100%;
          object-fit:cover;
        "
      >

      <div style="
        position:absolute;
        bottom:22px;
        left:50%;
        transform:translateX(-50%);
        background:rgba(0,0,0,0.45);
        color:#fff;
        padding:12px 20px;
        border-radius:999px;
        font-size:18px;
        font-weight:500;
        text-align:center;
      ">
        ${slide.text}
      </div>
    </div>
  `;
}

const beforeProposalSlides = [
  {
    src: "photo4.jpg",
    text: "My life has been lifeless like this"
  },
  {
    src: "photo1.jpg",
    text: "And I wanted it to be like this"
  }
];

let bpIndex = 0;
let bpInterval = null;




/* ================= PROPOSAL ================= */

function showProposal() {
  stopLetterMusic();

  const card = document.getElementById("card");

  card.innerHTML = `
    <p style="font-size:14px; opacity:0.7;">
      Loading confidence…
    </p>
    <p style="font-size:14px; opacity:0.7;">
      Overthinking slightly…
    </p>
  `;

  setTimeout(() => {
    card.innerHTML = `
      <div class="heartbeat">
        <h1>One more thing ✨</h1>
        <p>Wapas kab aarahi hai?</p>
      </div>

      <div id="btnZone"
        style="position:relative; height:160px; margin-top:20px;">
        <button onclick="yesClicked()">Sabr rakh 😭</button>
        <button id="noBtn" style="position:absolute;"> Dispossible😅</button>
      </div>
    `;

    startAutoRunNo();
  }, 1500);
}


let noTries = 0;

function startAutoRunNo() {
  const btn = document.getElementById("noBtn");
  const parent = document.getElementById("btnZone");

  if (noInterval) clearInterval(noInterval);

  noInterval = setInterval(() => {
    const maxX = parent.clientWidth - btn.offsetWidth;
    const maxY = parent.clientHeight - btn.offsetHeight;

    btn.style.left = Math.random() * maxX + "px";
    btn.style.top = Math.random() * maxY + "px";

    noTries++;

    if (noTries === 3) btn.innerText = "Almost 😅";
    if (noTries === 6) btn.innerText = "You’re fast 👀";
    if (noTries === 9) btn.innerText = "You're quicker 😂";
  }, 300);
}
//Final Question
function showFinalQuestion() {
  const card = document.getElementById("card");

  card.innerHTML = `
    <h1 style="margin-bottom:12px;">One Genuine question 💭</h1>

    <p style="font-size:18px; margin-bottom:22px;">
      When you return, would you like to go out with me on a date?
    </p>

    <div style="display:flex; gap:14px; justify-content:center;">
      <button onclick="finalYes()">Yes 💖</button>
      <button onclick="finalNo()">No</button>
    </div>
  `;
}

function finalYes() {
  const card = document.getElementById("card");

  card.innerHTML = `
    <h1>NO FREAKING WAY, you said yes 😭💖</h1>
    <p>You just made my whole year 😭😭.</p>
  `;

  fireworkBurst();

  setTimeout(() => {
    showFinalPhoto(); // 👉 NOW go to core memories slideshow
  }, 2500);
}

function finalNo() {
  const card = document.getElementById("card");

  card.innerHTML = `
    <h1>That’s okay 🤍</h1>
    <p>I completely understand.</p>
    <p style="opacity:0.75; margin-top:10px;">
      Thank you for being there for me.
    </p>
  `;

  setTimeout(() => {
    showFinalPhoto(); // 👉 still show memories
  }, 2500);
}

/* ================= FINAL PHOTO ================= */

function yesClicked() {
  clearInterval(noInterval);

  const card = document.getElementById("card");

  card.innerHTML = `
    <p style="font-size:15px; opacity:0.7;">Processing courage…</p>
  `;

  setTimeout(() => {
    card.innerHTML += `
      <p style="font-size:15px; opacity:0.7;">Checking heartbeat…</p>
    `;
  }, 700);

  setTimeout(() => {
    card.innerHTML += `
      <p style="font-size:15px; opacity:0.7;">Verifying feelings…</p>
    `;
  }, 1600);

  setTimeout(() => {
    card.innerHTML = `
      <p style="font-size:18px;">✨ No way! ✨</p>
    `;
  }, 2300);

  setTimeout(showFinalQuestion, 3000);
}


/* ================= START MUSIC ================= */

document.body.addEventListener(
  "click",
  () => startMusicOnce(),
  { once: true }
);

function fadeTo(html, callback) {
  const card = document.getElementById("card");

  card.classList.add("fade-out");

  setTimeout(() => {
    card.innerHTML = html;
    card.classList.remove("fade-out");
    card.classList.add("fade-in");

    if (callback) callback();
  }, 350);
}
let secretTaps = 0;

function enableHiddenLine() {
  const title = document.getElementById("letterTitle");
  if (!title) return;

  title.addEventListener("click", () => {
    secretTaps++;

    if (secretTaps === 3) {
      const hidden = document.createElement("div");
      hidden.style.marginTop = "14px";
      hidden.style.fontSize = "14px";
      hidden.style.opacity = "0.8";
      hidden.style.fontStyle = "italic";
      hidden.style.color = "#000";
      hidden.innerText = "I miss you so so so much 😭";

      title.parentElement.appendChild(hidden);
    }
  });
}
/* ================= BACKGROUND FLOATERS ================= */

setInterval(() => {
  const el = document.createElement("div");
  el.innerText = Math.random() > 0.66 ? "❤️" : Math.random() > 0.33 ? "✨" : "💖";
  el.style.position = "fixed";
  el.style.left = Math.random() * 100 + "vw";
  el.style.bottom = "-20px";
  el.style.fontSize = Math.random() * 10 + 14 + "px";
  el.style.opacity = "0.7";
  el.style.pointerEvents = "none";
  el.style.animation = "floatUp 6s linear";

  document.body.appendChild(el);

  setTimeout(() => el.remove(), 6000);
}, 1200);
/* ================= SHOOTING STAR ================= */

function launchShootingStar() {
  const star = document.createElement("div");
  star.className = "shooting-star";

  // random horizontal start
  star.style.left = Math.random() * 40 + "vw";

  document.body.appendChild(star);

  setTimeout(() => {
    star.remove();
  }, 1300);
}

// one shooting star roughly every minute
setInterval(launchShootingStar, 23000);

const finalSlides = [
  { type: "image", src: "photo2.jpg", fit: "contain" }, // 👈 zoomed out
  { type: "imageWithText", src: "photo3.jpg", text: "My fav gift 💝", fit: "cover" }
];


let slideIndex = 0;
let slideInterval = null;

function showFinalPhoto() {
  const card = document.getElementById("card");

  if (slideInterval) clearInterval(slideInterval);
  slideIndex = 0;

  card.innerHTML = `
  <h2 style="
    margin-bottom: 12px;
    font-weight: 600;
    opacity: 0.85;
  ">
     These are my favourite core memories of us
  </h2>

  <div id="slideshow" style="position:relative;">
    <div id="slideContent"></div>
  </div>

  <button onclick="location.reload()">Replay ✨</button>
`;

  renderSlide();
  slideInterval = setInterval(renderSlide, 2500);
}

function renderSlide() {
  const container = document.getElementById("slideContent");
  if (!container) return;

  // fade out
  container.classList.add("fade-slide");

  setTimeout(() => {
    const slide = finalSlides[slideIndex];

    if (slide.type === "image") {
      container.innerHTML = `
        <img 
          src="${slide.src}"
          style="
            width:100%;
            height:70vh;
            object-fit:${slide.fit || "cover"};
background:#000;

            border-radius:18px;
          "
        >
      `;
    }

    else if (slide.type === "imageWithText") {
      container.innerHTML = `
        <div style="
          position:relative;
          width:100%;
          height:70vh;
          border-radius:18px;
          overflow:hidden;
        ">
          <img 
            src="${slide.src}"
            style="
              width:100%;
              height:100%;
              object-fit:cover;
            "
          >
          <div style="
            position:absolute;
            bottom:20px;
            left:50%;
            transform:translateX(-50%);
            background:rgba(0,0,0,0.45);
            color:#fff;
            padding:10px 18px;
            border-radius:999px;
            font-size:18px;
            font-weight:600;
          ">
            ${slide.text}
          </div>
        </div>
      `;
    }

    // move to next slide
    slideIndex = (slideIndex + 1) % finalSlides.length;

    // fade in
    container.classList.remove("fade-slide");
  }, 900);
}

function fireworkBurst() {
  const icons = ["✨", "✨", "✨", "✨"];
  const count = 26;

  for (let i = 0; i < count; i++) {
    const el = document.createElement("div");
    el.className = "firework";
    el.innerText = icons[Math.floor(Math.random() * icons.length)];

    el.style.left = "50vw";
    el.style.top = "45vh";

    const x = Math.random() * 260 - 130;
    const y = Math.random() * 260 - 130;

    el.style.setProperty("--x", x + "px");
    el.style.setProperty("--y", y + "px");

    document.body.appendChild(el);

    setTimeout(() => el.remove(), 1600);
  }
}
