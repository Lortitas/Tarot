const TOTAL_CARDS = 78;
let deck = [];
let selectedCards = [];

let mode = "free";
let maxSelection = Infinity;
let spreadPositions = [];

const spreads = {
  three: {
    positions: ["Pasado", "Presente", "Futuro"],
    max: 3
  },
  five: {
    positions: ["Centro", "Obstáculo", "Base", "Pasado", "Futuro"],
    max: 5
  },
  celtic: {
    positions: [
      "Situación",
      "Desafío",
      "Base",
      "Pasado",
      "Meta",
      "Futuro",
      "Actitud",
      "Entorno",
      "Esperanzas",
      "Resultado"
    ],
    max: 10
  }
};

const spreadLayouts = {

  three: [
    { x: 100, y: 250 },
    { x: 380, y: 250 },
    { x: 660, y: 250 }
  ],

  five: [
    { x: 380, y: 250 }, // centro
    { x: 380, y: 100 }, // arriba
    { x: 380, y: 400 }, // abajo
    { x: 100, y: 250 }, // izquierda
    { x: 660, y: 250 }  // derecha
  ],

  celtic: [
    { x: 380, y: 250 }, // 1 centro
    { x: 380, y: 250, rotate: 90 }, // 2 cruzada
    { x: 380, y: 400 }, // 3 base
    { x: 380, y: 100 }, // 4 pasado
    { x: 100, y: 250 }, // 5 meta
    { x: 660, y: 250 }, // 6 futuro
    { x: 820, y: 100 }, // 7 actitud
    { x: 820, y: 220 }, // 8 entorno
    { x: 820, y: 340 }, // 9 esperanzas
    { x: 820, y: 460 }  // 10 resultado
  ]

};

const deckDiv = document.getElementById("deck");
const spreadDiv = document.getElementById("spread");
const readingDiv = document.getElementById("reading");

/* Crear mazo */
for (let i = 0; i < TOTAL_CARDS; i++) {
  deck.push({ id: i, file: `${i}.jpg` });
}

/* Fisher-Yates */
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

shuffle(deck);

/* Cambiar modo */
document.getElementById("modeSelect")
.addEventListener("change", (e) => {

  mode = e.target.value;

  if (mode === "free") {
    maxSelection = Infinity;
    spreadPositions = [];
  } else {
    maxSelection = spreads[mode].max;
    spreadPositions = spreads[mode].positions;
  }

  resetReading();
});

/* Expandir abanico */
deckDiv.addEventListener("click", spreadCards);

function spreadCards() {

  deckDiv.style.display = "none";
  spreadDiv.innerHTML = "";

  const angleRange = 120;
  const startAngle = -60;
  const angleStep = angleRange / deck.length;

  deck.forEach((card, index) => {

    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card");

    const angle = startAngle + index * angleStep;

    cardDiv.style.left = `calc(50% - 60px + ${index * 6}px)`;
    cardDiv.style.top = "120px";
    cardDiv.style.transform = `rotate(${angle}deg)`;

    const inner = document.createElement("div");
    inner.classList.add("inner");

    const front = document.createElement("div");
    front.classList.add("front");
    front.style.backgroundImage = `url(images/${card.file})`;

    const back = document.createElement("div");
    back.classList.add("back");

    inner.appendChild(front);
    inner.appendChild(back);
    cardDiv.appendChild(inner);

    cardDiv.addEventListener("click", () => selectCard(cardDiv));

    spreadDiv.appendChild(cardDiv);
  });
}

/* Seleccionar carta */
function selectCard(cardElement) {

  if (cardElement.classList.contains("flipped")) return;
  if (selectedCards.length >= maxSelection) return;

  cardElement.classList.add("flipped");

  const reversed = Math.random() < 0.5;

  setTimeout(() => {

  cardElement.remove();

  const clone = cardElement.cloneNode(true);
  clone.classList.add("selected");

  const reversed = Math.random() < 0.5;
  let rotation = 0;

  if (mode !== "free") {

    const layout = spreadLayouts[mode][selectedCards.length];

    clone.style.left = layout.x + "px";
    clone.style.top = layout.y + "px";

    if (layout.rotate) {
      rotation += layout.rotate;
    }

    const label = document.createElement("div");
    label.classList.add("position-label");
    label.innerText = spreadPositions[selectedCards.length];
    clone.appendChild(label);
  }
  else {
    // Modo libre alineado
    clone.style.left = (150 * selectedCards.length) + "px";
    clone.style.top = "200px";
  }

  if (reversed) {
    rotation += 180;
  }

  clone.style.transform = `rotate(${rotation}deg)`;

  readingDiv.appendChild(clone);
  selectedCards.push(clone);

  if (selectedCards.length === maxSelection && mode !== "free") {
    disableSpread();
  }

}, 600);

/* Desactivar abanico */
function disableSpread() {
  const cards = document.querySelectorAll(".card");
  cards.forEach(c => {
    c.style.opacity = "0.3";
    c.style.pointerEvents = "none";
  });
}

/* Reset */
function resetReading() {

  selectedCards = [];
  readingDiv.innerHTML = "";
  spreadDiv.innerHTML = "";
  deckDiv.style.display = "block";

  shuffle(deck);
}
