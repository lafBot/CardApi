/* Part 1:
        Draw a card from a newly shuffled deck */  
async function part1() {
    
    let newDeck = await axios.get("https://deckofcardsapi.com/api/deck/new/");
    await axios.get(`https://deckofcardsapi.com/api/deck/${newDeck.data.deck_id}/shuffle/`);
    let drawn = await axios.get(`https://deckofcardsapi.com/api/deck/${newDeck.data.deck_id}/draw/?count=1`);

    console.log(drawn.data.cards[0].value + " of " + drawn.data.cards[0].suit);
}

/* Part 2:
        Get new deck and draw a card, then draw another card*/
async function part2() {
    let firstCard = await axios.get("https://deckofcardsapi.com/api/deck/new/draw");
    let deckId = firstCard.data.deck_id;
    let secondCard = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/`);
    [firstCard, secondCard].forEach((card) => {
        console.log(`${card.data.cards[0].value} of ${card.data.cards[0].suit}`);
    })
}

/* Part 3:
        User interface allows user to draw a card from the same deck with each click*/

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