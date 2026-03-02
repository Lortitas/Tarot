const deckDiv = document.getElementById("deck");
const spreadDiv = document.getElementById("spread");
const spreadArea = document.getElementById("spread-area");
const readingDiv = document.getElementById("reading");
const modeSelect = document.getElementById("modeSelect");

/* ===== MAZO ===== */
let deck = [];

for (let i = 0; i <= 77; i++) {
  deck.push({
    name: `Carta ${i}`,
    image: `images/${i}.jpg`
  });
}

/* ===== CREAR ABANICO ===== */
function createDeckVisual() {
  deckDiv.innerHTML = "";

  const total = deck.length; // 78 cartas
  const radius = 600;        // radio del arco
  const angleStep = 120 / total; // apertura total del abanico

  deck.forEach((card, index) => {
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card");

    // imagen reverso
    cardDiv.style.backgroundImage = "url('images/back.jpg')";

    // calcular ángulo
    const angle = -60 + (angleStep * index);

    cardDiv.style.transform = `
      rotate(${angle}deg)
      translateY(-${radius}px)
      rotate(${-angle}deg)
    `;

    cardDiv.style.transformOrigin = `50% ${radius}px`;

    deckDiv.appendChild(cardDiv);
  });
}

/* ===== SHUFFLE ===== */
function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

/* ===== MOSTRAR CARTA ===== */
function showCard(card) {
  const img = document.createElement("img");
  img.src = card.image;
  spreadDiv.appendChild(img);
}

/* ===== EVENTO MAZO ===== */
deckDiv.addEventListener("click", () => {
  const mode = modeSelect.value;

  if (mode === "free") {
    const shuffled = shuffle(deck);
    showCard(shuffled[0]);
  }

  if (mode === "three") {
    spreadDiv.innerHTML = "";
    const shuffled = shuffle(deck);
    for (let i = 0; i < 3; i++) showCard(shuffled[i]);
  }

  if (mode === "five") {
    spreadDiv.innerHTML = "";
    const shuffled = shuffle(deck);
    for (let i = 0; i < 5; i++) showCard(shuffled[i]);
  }

  if (mode === "celtic") {
    spreadArea.classList.remove("hidden");
    const positions = spreadArea.querySelectorAll(".spread-card");
    const shuffled = shuffle(deck);
    positions.forEach((pos, i) => {
  pos.style.backgroundImage = `url(${shuffled[i % deck.length].image})`;
  });
  }
});

/* ===== RESET ===== */
function resetReading() {
  spreadDiv.innerHTML = "";
  readingDiv.innerHTML = "";
  spreadArea.classList.add("hidden");
  createDeckVisual();
}

/* ===== INICIO ===== */
createDeckVisual();
