/* ========================================
   QUESTIONS & VARIABLES
======================================== */

const questions = [
  {
    bear: "https://media1.tenor.com/m/BxibqUT9-I0AAAAd/dudu-flower.gif",
    text: "မမကို အရမ်း သဘောကျနေမိပြီ... 💗"
  },
  {
    bear: "https://media.tenor.com/sWXhCC4A2woAAAAj/bubu-bubu-dudu.gif",
    text: "တံခါးလေး ဖွင့်ပေးနော် နည်းနည်းလောက် ဝင်ချင်လို့ 💗"
  },
  {
    bear: "https://media1.tenor.com/m/Bq89l_QP5HcAAAAd/dudu-flow-kiss-cute-dudu.gif",
    text: "မောင်လေး ဖိတ်စာပါ တစ်ခါထဲ ရိုက်လိုက်ပြီ 😁"
  }
];

let page1NoClicked = false;
let page2MessageIndex = 0;
let page3NoCount = 0;

const app = document.getElementById("app");


/* ========================================
   PAGE 1
======================================== */

function renderPage1() {

  app.innerHTML = `
    <div class="question-container pop-in">

      <section class="card-soft">

        <img
          src="${questions[0].bear}"
          alt="Cute bear"
          class="bear-image"
        >

        <p class="question-text">
          ${questions[0].text}
        </p>

        <div class="button-group">

          <button class="pill" id="yesButton">
            Yes
          </button>

          <div class="no-wrapper" id="page1NoWrapper">

            <div class="no-message hidden" id="page1Message">
              စဉ်းစားပေးမယ်မလား 🥺
            </div>

            <button class="pill pill-soft" id="noButton">
              No
            </button>

          </div>

        </div>

      </section>

    </div>
  `;

  document
    .getElementById("yesButton")
    .addEventListener("click", goToPage2);

  document
    .getElementById("noButton")
    .addEventListener("click", page1No);

}


function page1No() {

  if (page1NoClicked) return;

  page1NoClicked = true;

  const noButton = document.getElementById("noButton");

  const message = document.getElementById("page1Message");

  noButton.textContent = "Yes";

  message.classList.remove("hidden");

  noButton.addEventListener("click", goToPage2);

}


/* ========================================
   PAGE 2
======================================== */

function goToPage2() {

  page2MessageIndex = 0;

  renderPage2();

}


function renderPage2() {

  app.innerHTML = `
    <div
      class="question-container pop-in"
      id="page2Card"
    >

      <section class="card-soft">

        <img
          src="${questions[1].bear}"
          alt="Cute bear"
          class="bear-image"
        >

        <p class="question-text">
          ${questions[1].text}
        </p>

        <div class="button-group">

          <button class="pill" id="yesButton">
            Yes
          </button>

        </div>

      </section>

    </div>


    <div
      class="no-wrapper moving-no-wrapper"
      id="page2NoWrapper"
    >

      <div
        class="no-message hidden"
        id="page2Message"
      >
        မငြင်းပါနဲ့နော် 🥺
      </div>

      <button
        class="pill pill-soft"
        id="page2NoButton"
      >
        No
      </button>

    </div>
  `;


  // Yes Button
  document
    .getElementById("yesButton")
    .addEventListener("click", goToPage3);


  const wrapper = document.getElementById("page2NoWrapper");

  const noButton = document.getElementById("page2NoButton");


  // Initial position
  requestAnimationFrame(() => {
    moveNoWrapper(wrapper);
  });


  // Desktop Mouse: ထိတာနဲ့ ချက်ချင်းရွေ့မယ်
  noButton.addEventListener("pointerenter", (event) => {

    if (event.pointerType === "mouse") {
      page2No();
    }

  });


  // Mobile Touch: လက်နဲ့ထိတာနဲ့ ချက်ချင်းရွေ့မယ်
  noButton.addEventListener("pointerdown", (event) => {

    if (event.pointerType === "touch") {

      event.preventDefault();

      page2No();

    }

  });


  // Keyboard Support
  noButton.addEventListener("click", (event) => {

    if (event.detail === 0) {
      page2No();
    }

  });

}


/* ========================================
   PAGE 2 - MOVE NO WRAPPER
======================================== */

function moveNoWrapper(wrapper) {

  if (!wrapper || !wrapper.isConnected) return;

  const padding = 16;

  const width = wrapper.offsetWidth;

  const height = wrapper.offsetHeight;

  const card = document.getElementById("page2Card");

  const cardRect = card
    ? card.getBoundingClientRect()
    : null;


  const maxX = Math.max(
    padding,
    window.innerWidth - width - padding
  );

  const maxY = Math.max(
    padding,
    window.innerHeight - height - padding
  );


  let position = null;


  // Card နဲ့ မထပ်တဲ့နေရာ ရှာမယ်
  for (let attempt = 0; attempt < 60; attempt++) {

    const x = Math.floor(
      Math.random() * (maxX - padding + 1)
    ) + padding;

    const y = Math.floor(
      Math.random() * (maxY - padding + 1)
    ) + padding;


    const overlapsCard = cardRect &&
      x < cardRect.right + 12 &&
      x + width > cardRect.left - 12 &&
      y < cardRect.bottom + 12 &&
      y + height > cardRect.top - 12;


    if (!overlapsCard) {

      position = { x, y };

      break;

    }

  }


  // နေရာမတွေ့ရင် အခြားနေရာရွေးမယ်
  if (!position) {

    const choices = [

      { x: padding, y: padding },

      { x: maxX, y: padding },

      { x: padding, y: maxY },

      { x: maxX, y: maxY }

    ];


    position = choices.find(point => {

      if (!cardRect) return true;

      return !(
        point.x < cardRect.right + 12 &&
        point.x + width > cardRect.left - 12 &&
        point.y < cardRect.bottom + 12 &&
        point.y + height > cardRect.top - 12
      );

    }) || choices[0];

  }


  wrapper.style.left = `${position.x}px`;

  wrapper.style.top = `${position.y}px`;

}


/* ========================================
   PAGE 2 - NO BUTTON MESSAGE
======================================== */

function page2No() {

  const wrapper = document.getElementById("page2NoWrapper");

  const message = document.getElementById("page2Message");

  if (!wrapper || !message) return;


  const messages = [

    "မငြင်းပါနဲ့နော် 🥺",

    "တစ်ခါလောက်တော့ စဉ်းစားပေးပါနော် 💗",

    "စိတ်မဆိုးရဘူးနော် 🥹"

  ];


  message.textContent = messages[page2MessageIndex];

  message.classList.remove("hidden");


  page2MessageIndex =
    (page2MessageIndex + 1) % messages.length;


  // Message နဲ့ No Button ကို အတူတူရွှေ့မယ်
  requestAnimationFrame(() => {

    moveNoWrapper(wrapper);

  });

}


/* ========================================
   PAGE 3
======================================== */

function goToPage3() {

  page3NoCount = 0;

  renderPage3();

}


function renderPage3() {

  app.innerHTML = `
    <div class="question-container pop-in">

      <section class="card-soft" id="page3Card">

        <img
          src="${questions[2].bear}"
          alt="Cute bear"
          class="bear-image"
        >

        <p class="question-text">
          ${questions[2].text}
        </p>

        <div class="page3-button-group">

          <button
            class="pill page3-yes"
            id="yesButton"
          >
            Yes 💗
          </button>

          <div
            class="no-wrapper page3-no-wrapper"
            id="page3NoWrapper"
          >

            <div
              class="no-message hidden"
              id="page3Message"
            >
              ချစ်တယ်မလား ပိစိလေးတော့ ပြန်ချစ်ကြည့်ပါ အရွေးမမှားပါဘူး 💗
            </div>

            <button
              class="pill pill-soft no-shrinking"
              id="page3NoButton"
            >
              No
            </button>

          </div>

        </div>

      </section>

    </div>
  `;


  document
    .getElementById("yesButton")
    .addEventListener("click", showEnvelope);


  document
    .getElementById("page3NoButton")
    .addEventListener("click", page3No);

}


/* ========================================
   PAGE 3 - NO BUTTON
======================================== */

function page3No() {

  const noButton = document.getElementById("page3NoButton");

  const noWrapper = document.getElementById("page3NoWrapper");

  const yesButton = document.getElementById("yesButton");

  const message = document.getElementById("page3Message");


  const messages = [

    "ချစ်တယ်မလား ပိစိလေးတော့ ပြန်ချစ်ကြည့်ပါ အရွေးမမှားပါဘူး 💗",

    "Yes လေးကိုပဲ နှိပ်ပေးပါနော် 🥺",

    "ဒီတစ်ခါတော့ Yes လို့ ဖြေပေးပါနော် 💗",

    "နောက်ဆုံးတစ်ခါလေးပါနော် 💗"

  ];


  if (page3NoCount >= 4) return;


  message.textContent = messages[page3NoCount];

  message.classList.remove("hidden");


  page3NoCount++;


  const card = document.getElementById("page3Card");

  const availableWidth = card.clientWidth - 36;

  const startWidth = 120;


  const targetWidth = Math.min(
    availableWidth,
    startWidth + page3NoCount * 65
  );


  const targetHeight = 52 + page3NoCount * 9;

  const targetFontSize = 16 + page3NoCount * 1.5;


  // Yes Button ကြီးလာမယ်
  yesButton.style.width = `${targetWidth}px`;

  yesButton.style.minHeight = `${targetHeight}px`;

  yesButton.style.fontSize = `${targetFontSize}px`;


  // No Button သေးသွားမယ်
  const scale = Math.max(
    0,
    1 - page3NoCount * 0.25
  );


  noButton.style.transform = `scale(${scale})`;

  noButton.style.opacity = `${1 - page3NoCount * 0.25}`;


  // 4 ကြိမ်မြောက်မှာ No ပျောက်သွားမယ်
  if (page3NoCount === 4) {

    message.classList.add("hidden");

    noWrapper.style.opacity = "0";


    setTimeout(() => {

      noWrapper.style.display = "none";

    }, 300);

  }

}


/* ========================================
   ENVELOPE
======================================== */

function showEnvelope() {

  app.innerHTML = `
    <div class="envelope-page">

      <button
        class="envelope-button"
        id="envelopeButton"
        aria-label="Open love letter"
      >

        <div class="env">

          <span class="env-flap"></span>

          <span class="env-seal">💗</span>

        </div>

        <span class="envelope-tag">
          ✉️ ePostcard For MaMa ✨
        </span>

      </button>

    </div>
  `;


  document
    .getElementById("envelopeButton")
    .addEventListener("click", openLetter);

}


/* ========================================
   LOVE LETTER
======================================== */

function openLetter() {

  app.innerHTML = `
    <article class="letter pop-in">

      <span class="clip">📎</span>

      <h1 class="letter-title">
        သို့ / ချစ်ရပါသော မမ
      </h1>

      <hr class="dotted">

      <div class="letter-content">

        <p>
          အခုနောက်ပိုင်း မမက 
          ကျွန်တော့် ခေါင်းထဲ အတွေးထဲ
          ရောက်ရောက်လာတယ်
        </p>

        <p>
          ဘေးက ပရောဂတွေ မပါပဲ 
          မမကို တကယ် သဘောကျသွားတာကို
          ကျွန်တော် ထိန်းလို မရခဲ့ဘူး
        </p>

        <p>
          မမရဲ့ နှလုံးသားလေးကို နောက်တစ်ခေါက် လောက် ဝင်ခွင့်ပြုပါလား
        </p>

         <p>
          မမ ကျွန်တော့်ကို စဉ်းစားပေးမယ်မလားဟင်
        </p>
        
      </div>

      <p class="letter-footer">
        ချိုက်တေ မ..💗
      </p>

    </article>
  `;

}


/* ========================================
   WINDOW RESIZE
======================================== */

window.addEventListener("resize", () => {

  const wrapper = document.getElementById("page2NoWrapper");

  if (wrapper) {
    moveNoWrapper(wrapper);
  }

});


/* ========================================
   INITIALIZE
======================================== */

renderPage1();


/* ========================================
   BACKGROUND MUSIC
======================================== */

const bgMusic = document.getElementById("bgMusic");

const musicToggle = document.getElementById("musicToggle");

let musicStarted = false;


// First user interaction starts music
document.addEventListener("click", () => {

  if (!musicStarted && bgMusic) {

    bgMusic.play()
      .then(() => {

        musicStarted = true;

        musicToggle.textContent = "🎵 Music On";

      })
      .catch(() => { });

  }

}, { once: true });


// Music On / Off
musicToggle.addEventListener("click", event => {

  event.stopPropagation();


  if (bgMusic.paused) {

    bgMusic.play()
      .then(() => {

        musicStarted = true;

        musicToggle.textContent = "🎵 Music On";

      })
      .catch(() => {

        musicToggle.textContent = "🎵 Tap to Play";

      });

  } else {

    bgMusic.pause();

    musicToggle.textContent = "🔇 Music Off";

  }

});