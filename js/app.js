let allCards = [],
    openCards = [],
    matchedCards = []
starsLeft = 2;
let timerEvent;
let modal = document.querySelector(".modal");
let moves = document.querySelector(".moves");
let deck = document.querySelector(".deck");
let restartButton = document.querySelector(".restart");
let timer = document.querySelector(".timer");
initializeGame();

//add Click Event Listener on All cards
function onCardClick() {
    if (!this.classList.contains("open", "show")) {
        this.classList.add("open", "show");
        openCards.push(this);
        if (openCards.length > 1) {
            if (openCards[0].firstElementChild.classList.value == openCards[1].firstElementChild.classList.value) {
                openCards.forEach(card => {
                    card.classList.remove("open", "show");
                    card.classList.add("match");
                    card.removeEventListener("click", onCardClick);
                    matchedCards.push(card);
                });
            } else {
                openCards.forEach(card => {
                    setTimeout(() => {
                        card.classList.remove("open", "show");
                    }, 1000);
                });

            }
            openCards = [];
        }
        moves.innerHTML++;
        // reduce star
        if (moves.innerHTML == 19 || moves.innerHTML == 35 || moves.innerHTML == 51) {
            Array.from(document.querySelector(".stars").children)[starsLeft].style.display = 'none';
            starsLeft--;
        }
    }
    if (matchedCards.length === 16) {
        modal.style.cssText = 'display:block;';
        modal.lastElementChild.appendChild(document.querySelector(".score-panel"));
        clearInterval(timerEvent);

    }
};

//reset Button 
restartButton.addEventListener("click", () => {
    initializeGame();
    modal.style.display = 'none';
    deck.insertAdjacentElement('beforebegin', document.querySelector('.score-panel'));
    matchedCards = [];
    openCards = [];

});

function initializeGame() {
    //reset moves
    moves.innerHTML = 0;

    //reset timer
    timer.innerHTML = 0;
    clearInterval(timerEvent);

    //reset stars
    Array.from(document.querySelector(".stars").children).forEach(star => {
        star.style.display = 'inline';
    });
    starsLeft = 2;

    //shuffle cards
    allCards = shuffle(Array.from(document.querySelectorAll('.card')));
    allCards.forEach(card => {
        card.classList.remove("match", "open", "show");
    })
    while (deck.hasChildNodes()) {
        deck.removeChild(deck.lastChild);
    };

    allCards.forEach(card => {
        deck.appendChild(card);
    });

    //reset Event Handlers
    allCards.forEach(card => {
        card.addEventListener("click", onCardClick);

    });
    //start timer
    timerEvent = setInterval(() => {
        timer.innerHTML++;
    }, 1000);

}



// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}