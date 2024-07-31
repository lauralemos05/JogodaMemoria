document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('gameBoard');

    // Lista de imagens (insira os caminhos das suas imagens aqui)
    const images = [
        'fotos/ img1.jpg', 'fotos/ img2.jpg', 'fotos/img3.jpeg', 'fotos/img4.jpg', 
        'img5.jpg', 'img6.jpg', 'img7.jpg', 'img8.jpg'
    ];

    // Duplicar as imagens para criar pares e embaralhar
    const cardsArray = [...images, ...images];
    cardsArray.sort(() => 0.5 - Math.random());

    // Criar os cartões
    cardsArray.forEach(image => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front"></div>
                <div class="card-back">
                    <img src="${image}" alt="Imagem">
                </div>
            </div>
        `;
        gameBoard.appendChild(card);
    });

    let hasFlippedCard = false;
    let firstCard, secondCard;
    let lockBoard = false;

    function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return;

        this.classList.add('flip');

        if (!hasFlippedCard) {
            // Primeiro clique
            hasFlippedCard = true;
            firstCard = this;
            return;
        }

        // Segundo clique
        secondCard = this;
        checkForMatch();
    }

    function checkForMatch() {
        let isMatch = firstCard.querySelector('.card-back img').src === secondCard.querySelector('.card-back img').src;

        isMatch ? disableCards() : unflipCards();
    }

    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);

        resetBoard();
    }

    function unflipCards() {
        lockBoard = true;

        setTimeout(() => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');

            resetBoard();
        }, 1500);
    }

    function resetBoard() {
        [hasFlippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];
    }

    document.querySelectorAll('.card').forEach(card => card.addEventListener('click', flipCard));
});