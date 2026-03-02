/* ========================= */
/* ===== VARIABLES ========= */
/* ========================= */

const deckDiv = document.getElementById("deck");
const spreadDiv = document.getElementById("spread");
const spreadArea = document.getElementById("spread-area");
const readingDiv = document.getElementById("reading");
const modeSelect = document.getElementById("modeSelect");

let deck = [
  { name: "El Loco", image: "images/0.jpg" },
  { name: "El Mago", image: "images/1.jpg" },
  { name: "La Sacerdotisa", image: "images/2.jpg" },
  { name: "La Emperatriz", image: "images/3.jpg" },
  { name: "El Emperador", image: "images/4.jpg" },
  { name: "El Papa", image: "images/5.jpg" },
  { name: "Los Enamorados", image: "images/6.jpg" },
  { name: "El Carro", image: "images/7.jpg" },
  { name: "La Justicia", image: "images/8.jpg" },
  { name: "El Ermitaño", image: "images/9.jpg" },
  { name: "La Rueda", image: "images/10.jpg" },
  { name: "La Fuerza", image: "images/11.jpg" },
  { name: "El Colgado", image: "images/12.jpg" },
  { name: "La Muerte", image: "images/13.jpg" },
  { name: "La Templanza", image: "images/14.jpg" },
  { name: "El Diablo", image: "images/15.jpg" },
  { name: "La Torre", image: "images/16.jpg" },
  { name: "La Estrella", image: "images/17.jpg" },
  { name: "La Luna", image: "images/18.jpg" },
  { name: "El Sol", image: "images/19.jpg" },
  { name: "El Juicio", image: "images/20.jpg" },
  { name: "El Mundo", image: "images/21.jpg" }
];

/* ========================= */
/* ===== UTILIDADES ======== */
/* ========================= */

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

/* ========================= */
/* ===== CREAR ABANICO ===== */
/* ========================= */

function createDeckVisual() {
  deckDiv.innerHTML = "";

  for (let i = 0; i < 5; i++) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.style.backgroundImage = "url('images/back.jpg')";
    deckDiv.appendChild(card);
  }
}

/* ========================= */
/* ===== MOSTRAR CARTA ===== */
/* ========================= */

function showCard(card) {
  const img = document.createElement("img");
  img.src = card.image;
  spreadDiv.appendChild(img);

  const readingImg = document.createElement("img");
  readingImg.src = card.image;
  readingDiv.appendChild(readingImg);
}

/* ========================= */
/* ===== MODOS NORMALES ==== */
/* ========================= */

function drawMultiple(count) {
  spreadDiv.innerHTML = "";
  readingDiv.innerHTML = "";
  spreadArea.classList.add("hidden");

  const shuffled = shuffle(deck);

  for (let i = 0; i < count; i++) {
    showCard(shuffled[i]);
  }
}

/* ========================= */
/* ===== CRUZ CELTA ======== */
/* ========================= */

function showCelticCross() {
  spreadDiv.innerHTML = "";
  readingDiv.innerHTML = "";
  spreadArea.classList.remove("hidden");

  const positions = spreadArea.querySelectorAll(".spread-card");
  const shuffled = shuffle(deck);

  positions.forEach((cardDiv, index) => {
    cardDiv.style.backgroundImage = `url(${shuffled[index].image})`;
  });
}

/* ========================= */
/* ===== RESET ========= */
/* ========================= */

function resetReading() {
  spreadDiv.innerHTML = "";
  readingDiv.innerHTML = "";
  spreadArea.classList.add("hidden");
  createDeckVisual();
}

/* ========================= */
/* ===== EVENTOS ========= */
/* ========================= */

deckDiv.addEventListener("click", () => {
  const mode = modeSelect.value;

  if (mode === "free") {
    const shuffled = shuffle(deck);
    showCard(shuffled[0]);
  }

  if (mode === "three") {
    drawMultiple(3);
  }

  if (mode === "five") {
    drawMultiple(5);
  }

  if (mode === "celtic") {
    showCelticCross();
  }
});

/* ========================= */
/* ===== INICIO ========= */
/* ========================= */

createDeckVisual();
