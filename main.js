$(document).ready(function () {


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

    // function createNewDeck() {
    //     deck = [];
    //     shuffleDeck(deck);
    // }

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

    let dealerHand = [];
    let playerHand = [];
    
    let dealerTotalScore = 0;
    let playerTotalScore = 0;

    function deal() {
        shuffleDeck(deck);
    };

    $('.dealBtn').on('click', function(evt) {
        deal();
        evt.preventDefault();
        dealerCardDealt();
        playerCardDealt();
        
        console.log(deck.length);
        console.log(dealerHand.length);
        console.log(playerHand.length);
    });

    $('.hitBtn').on('click', function(evt) {
        playerHit();
        checkPlayerScore();
        console.log(dealerHand.length);
        console.log(playerHand.length);
    });

    $('.standBtn').on('click', function(evt) {
        compareScore();
    });

    console.log(dealerHand.length);
    console.log(playerHand.length);


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
        
        dealerTotalScore = dealerFirstCardScore + dealerSecondCardScore;
                // console.log(dealerTotalScore);
        $('.dealerScore').append("<span> " + dealerTotalScore + "</span>");
    };

    function playerCardDealt() {
        let playerFirstCard = deck[Math.floor(Math.random() * deck.length)];
            $('#playerCard-1').append("<div><img src = '" + playerFirstCard.cardImg + "' /></div>");
                let playerFirstCardScore = playerFirstCard.value;
                deck.pop(playerFirstCard);
                playerHand.push(playerFirstCard);
                // console.log(playerFirstCardScore);
            
        let playerSecondCard = deck[Math.floor(Math.random() * deck.length)];
            $('#playerCard-2').append("<div><img src = '" + playerSecondCard.cardImg + "' /></div>");
                let playerSecondCardScore = playerSecondCard.value;
                deck.pop(playerSecondCard);
                playerHand.push(playerSecondCard);
                // console.log(playerSecondCardScore);
        
        playerTotalScore = playerFirstCardScore + playerSecondCardScore;
                // console.log(playerTotalScore);
        $('.playerScore').append("<span id = 'scorePly'> " + playerTotalScore + "</span>");

    }   

    function playerHit() {
        let playerHitCard = deck[Math.floor(Math.random() * deck.length)];
            $('#playerCard-3').append("<div><img src = '" + playerHitCard.cardImg + "' /></div>");
            let playerHitCardScore = playerHitCard.value;
            deck.pop(playerHitCard);
            playerHand.push(playerHitCard);
            console.log(playerHitCardScore);

            playerTotalScore = playerTotalScore + playerHitCardScore;
            console.log(playerTotalScore);
            $('#scorePly').text(" " + playerTotalScore + " ");
    };

    function checkPlayerScore() {
        if (playerTotalScore > 21) {
            $('.popup').append('<p>Better Luck Next Time! Dealer Win<br>Press DEAL to start a new game</p>');
        }
    };    

    function compareScore() { 
        if (playerTotalScore > dealerTotalScore) {
            $('.popup').append('<p>Congragulation! You Win!!!<br>Press DEAL to start a new game</p>');
        }
    };

    





});