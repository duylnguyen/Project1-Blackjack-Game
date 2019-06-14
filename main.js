$(document).ready(function () {

    dealerHand = [];
    playerHand = [];
    dealerHandValue = 0;
    playerHandValue = 0;

    let deck = [];
    let value = 0
    for (let i = 0; i < 52; i++) {
        if (i < 4) {
            value = 11
        } else if (i < 8) {
            value = 2
        } else if (i < 12) {
            value = 3
        } else if (i < 16) {
            value = 4
        } else if (i < 20) {
            value = 5
        } else if (i < 24) {
            value = 6
        } else if (i < 28) {
            value = 7
        } else if (i < 32) {
            value = 8
        } else if (i < 36) {
            value = 9
        } else if (i < 52) {
            value = 10
        }
        deck.push({ value: value, cardImg: "images/" + i + ".jpg" });
    };

    function shuffleDeck(deck) {
        let i = 0;
        let randomIndex = 0;
        let temporaryValue = null;

        for (i = deck.length - 1; i > 0; i--) {
            randomIndex = Math.floor(Math.random() * (i + 1));
            temporaryValue = deck[i];
            deck[i] = deck[randomIndex];
            deck[randomIndex] = temporaryValue;
        }
    };

    function deal() {
        shuffleDeck(deck);
    };

    $('.dealBtn').on('click', function (evt) {
        deal();
        evt.preventDefault();
        dealerCardDealt();
        playerCardDealt();
        console.log(deck.length);
    });

    function dealerCardDealt() {
        let dealerFirstCard = deck[Math.floor(Math.random() * deck.length)];
            $('#dealerCard-1').append("<div><img src = '" + dealerFirstCard.cardImg + "' /></div>");
                let dealerFirstCardScore = dealerFirstCard.value;
                deck.pop(dealerFirstCard);
                dealerHand.push(dealerFirstCard);
                // console.log(dealerFirstCardScore);
        
        let dealerSecondCard = deck[Math.floor(Math.random() * deck.length)];
            $('#dealerCard-2').append("<div><img src = '" + dealerSecondCard.cardImg + "' /></div>");
                let dealerSecondCardScore = dealerSecondCard.value;
                deck.pop(dealerSecondCard);
                dealerHand.push(dealerSecondCard);
                // console.log(dealerSecondCardScore);
        
        let dealerTotalScore = dealerFirstCardScore + dealerSecondCardScore;
                // console.log(dealerTotalScore);
        $('.dealerScore').append("<span> " + dealerTotalScore + "</span>");
    };

    function playerCardDealt() {
        let playerFirstCard = deck[Math.floor(Math.random() * deck.length)];
            $('#playerCard-1').append("<div><img src = '" + playerFirstCard.cardImg + "' /></div>");
                let playerFirstCardScore = playerFirstCard.value;
                deck.pop(playerFirstCard);
                playerHand.push(playerFirstCard);
                console.log(playerFirstCardScore);
            
        let playerSecondCard = deck[Math.floor(Math.random() * deck.length)];
            $('#playerCard-2').append("<div><img src = '" + playerSecondCard.cardImg + "' /></div>");
                let playerSecondCardScore = playerSecondCard.value;
                deck.pop(playerSecondCard);
                playerHand.push(playerSecondCard);
                console.log(playerSecondCardScore);
        
        let playerTotalScore = playerFirstCardScore + playerSecondCardScore;
                console.log(playerTotalScore);
        $('.playerScore').append("<span> " + playerTotalScore + "</span>");
    }   









});