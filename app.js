// Part 1
async function part1() {
    let shuffleDeck = axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");

    shuffleDeck
        .then(deck =>
            axios.get(`https://deckofcardsapi.com/api/deck/${deck.data.deck_id}/draw/?count=1`)
            )
        .then(id =>
            console.log(id.data.cards[0].value + " of " + id.data.cards[0].suit)
            )
}

// Part 2
async function part2() {
    let firstCard = await axios.get("https://deckofcardsapi.com/api/deck/new/draw");
    let deckId = firstCard.data.deck_id;
    let secondCard = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/`);
    [firstCard, secondCard].forEach((card) => {
        console.log(`${card.data.cards[0].value} of ${card.data.cards[0].suit}`);
    })
}

// Part 3

let $cardBtn = $("#card-btn")
let $cardDiv = $("#card-div");
let deckId;


$cardBtn.click(function() {
    part3();
    }
)

async function part3() {
    if (deckId) {
        let card = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw`);
        addCardImage(card.data.cards[0].image);
    }
    else {
        let firstCard = await axios.get("https://deckofcardsapi.com/api/deck/new/draw");
        deckId = firstCard.data.deck_id;
        addCardImage(firstCard.data.cards[0].image);
    }
}

function addCardImage(imgURL) {
    $cardDiv.html(`<img src='${imgURL}'>`);
}