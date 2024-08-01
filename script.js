
const frutasNome = [
    {name: "Rainha", img: "images/rainha.png"},
    {name: "Pen", img: "images/pen.png"},
    {name: "Kitty", img: "images/kitty.png"},
    {name: "Duquesa", img: "images/duquesa.png"},
    {name: "Lady", img: "images/lady.png"},
    {name: "Anthony", img: "images/anthony.png"},
    {name: "Eloise", img: "images/eloise.png"},
    {name: "Gregory", img: "images/gregory.png"},
    {name: "Colin", img: "images/colin.png"},
    {name: "fran", img: "images/fran.png"}
];

let cartas = frutasNome.concat(frutasNome); // Duplicar a lista para criar pares
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;

// Função para embaralhar as cartas
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Função para criar o tabuleiro do jogo
function createBoard() {
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = '';
    shuffle(cartas);
    for (let i = 0; i < cartas.length; i++) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.name = cartas[i].name;

        const cardInner = document.createElement('div');
        cardInner.classList.add('card-inner');
        card.appendChild(cardInner);

        const cardFront = document.createElement('div');
        cardFront.classList.add('card-front');
        cardInner.appendChild(cardFront);

        const cardBack = document.createElement('div');
        cardBack.classList.add('card-back');
        const img = document.createElement('img');
        img.src = cartas[i].img;
        cardBack.appendChild(img);
        cardInner.appendChild(cardBack);

        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    }
}

// Função para virar a carta
function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flipped');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

// Função para verificar se as cartas viradas formam um par
function checkForMatch() {
    let isMatch = firstCard.dataset.name === secondCard.dataset.name;
    isMatch ? disableCards() : unflipCards();
}

// Função para desativar as cartas (quando formam um par)
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetCards();
}

// Função para desvirar as cartas (quando não formam um par)
function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetCards();
    }, 1000);
}

// Função para resetar o estado das cartas viradas
function resetCards() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

document.addEventListener('DOMContentLoaded', createBoard);

