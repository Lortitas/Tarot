// --- ARCANOS MAYORES ---
const majorArcana = [
  "The Fool", "The Magician", "The High Priestess", "The Empress",
  "The Emperor", "The Hierophant", "The Lovers", "The Chariot",
  "Strength", "The Hermit", "Wheel of Fortune", "Justice",
  "The Hanged Man", "Death", "Temperance", "The Devil",
  "The Tower", "The Star", "The Moon", "The Sun",
  "Judgement", "The World"
];

// --- ARCANOS MENORES ---
const suits = ["Wands", "Cups", "Swords", "Pentacles"];
const ranks = [
  "Ace","2","3","4","5","6","7","8","9","10",
  "Page","Knight","Queen","King"
];

let minorArcana = [];
for (let suit of suits) {
  for (let rank of ranks) {
    minorArcana.push(`${rank} of ${suit}`);
  }
}

let deck = [];

// --- FISHER-YATES ---
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// --- RESETEAR MAZO ---
function resetDeck() {
  deck = [...majorArcana, ...minorArcana];
  shuffle(deck);
  document.getElementById("table").innerHTML = "";
}

// --- SACAR CARTA ---
function drawCard() {
  if (deck.length === 0) {
    alert("No quedan cartas.");
    return;
  }

  const cardName = deck.pop();
  const reversed = Math.random() < 0.5;

  const cardElement = document.createElement("div");
  cardElement.classList.add("card");
  if (reversed) cardElement.classList.add("reversed");

  cardElement.innerText = cardName;

  document.getElementById("table").appendChild(cardElement);
}

// Inicializar
resetDeck();
