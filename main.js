$(document).ready(function () {

    let dealerHand = [];
    let playerHand = [];
        
    let dealerTotalScore = 0;
    let playerTotalScore = 0;

    // Set up deck of cards
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

    // Shuffle Deck
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
    
    $('.dealBtn').on('click', function(evt) {
        evt.preventDefault();
        
        dealerCard();
        playerCard();
        // createNewDeck();
    });

    // $('.hitBtn').on('click', function(evt) {
    //     playerHit();
    //     checkPlayerScore();
    // });

    // $('.standBtn').on('click', function(evt) {
    //     dealerDraw();
    //     compareScore();
    // });

    // function dealerCardDealt() {
    //     let dealerFirstCard = deck[Math.floor(Math.random() * deck.length)];
    //         $('.dealerCard').append("<img src = '" + dealerFirstCard.cardImg + "' />");
    //             let dealerFirstCardScore = dealerFirstCard.value;
    //             deck.pop(dealerFirstCard);
    //             dealerHand.push(dealerFirstCard);
    //             // console.log(dealerFirstCardScore);
        
    //     let dealerSecondCard = deck[Math.floor(Math.random() * deck.length)];
    //         $('.dealerCard').append("<img src = '" + dealerSecondCard.cardImg + "' />");
    //             let dealerSecondCardScore = dealerSecondCard.value;
    //             deck.pop(dealerSecondCard);
    //             dealerHand.push(dealerSecondCard);
    //             // console.log(dealerSecondCardScore);
        
    //     dealerTotalScore = dealerFirstCardScore + dealerSecondCardScore;
    //             // console.log(dealerTotalScore);
    //     $('.dealerScore').append("<span id = 'scoreDlr'> " + dealerTotalScore + "</span>");
    // };

    
            // dealerTotalScore = dealerTotalScore + card.value;
            // $('.dealerScore').append("<span id = 'scoreDlr'> " + dealerTotalScore + "</span>");
    let card;                

    function dealerCardDealt() {
            card = deck[Math.floor(Math.random() * deck.length)]
            deck.pop(card);
            dealerHand.push(card);   
            $('.dealerCard').append("<img src = '" + card.cardImg + "' />");
    }

    function playerCardDealt() {
            card = deck[Math.floor(Math.random() * deck.length)]
            deck.pop(card);
            playerHand.push(card);
            $('.playerCard').append("<img src = '" + card.cardImg + "' />");    
    }

    function addDealerScore() {
        dealerTotalScore = dealerTotalScore + card.value;    
    }

    function addPlayerScore() {
        playerTotalScore = playerTotalScore + card.value;
        console.log(playerTotalScore);
    }

    function dealerTotalScoreDisplay() {
        $('.dealerScore').append("<span id = 'scoreDlr'> " + dealerTotalScore + "</span>");
    }

    function playerTotalScoreDisplay() {
        $('.playerScore').append("<span id = 'scoreDlr'> " + playerTotalScore + "</span>");
    }

    function dealerCard() {
        $('.dealerCard').append("<img src = 'images/blue_back.jpg' />");
            dealerCardDealt();
            addDealerScore();
            dealerTotalScoreDisplay();
    }

    function playerCard() {
        for (let i = 0; i < 2; i++) {
            playerCardDealt();
            addPlayerScore();
        }
        playerTotalScoreDisplay();
    }
    
    // function playerCardDealt() {
    //     let playerFirstCard = deck[Math.floor(Math.random() * deck.length)];
    //         $('.playerCard').append("<img src = '" + playerFirstCard.cardImg + "' />");
    //             let playerFirstCardScore = playerFirstCard.value;
    //             deck.pop(playerFirstCard);
    //             playerHand.push(playerFirstCard);
            
    //     let playerSecondCard = deck[Math.floor(Math.random() * deck.length)];
    //         $('.playerCard').append("<img src = '" + playerSecondCard.cardImg + "' />");
    //             let playerSecondCardScore = playerSecondCard.value;
    //             deck.pop(playerSecondCard);
    //             playerHand.push(playerSecondCard);
        
    //     playerTotalScore = playerFirstCardScore + playerSecondCardScore;
    //     $('.playerScore').append("<span id = 'scorePly'> " + playerTotalScore + "</span>");
    // }   

    // function playerHit() {
    //     let playerHitCard = deck[Math.floor(Math.random() * deck.length)];
    //         $('.playerCard').append("<img src = '" + playerHitCard.cardImg + "' />");
    //         let playerHitCardScore = playerHitCard.value;
    //         deck.pop(playerHitCard);
    //         playerHand.push(playerHitCard);

    //         playerTotalScore = playerTotalScore + playerHitCardScore;
    //         $('#scorePly').text(" " + playerTotalScore + " ");
    // };

    // function checkDealerScore() {
    //     if (dealerTotalScore > 21) {
    //         $('.popup').append('<p>Congragulation! You Win!!!<br>Press DEAL to start a new game</p>');
    //     }
    // }

    // function checkPlayerScore() {
    //     if (playerTotalScore > 21) {
    //         $('.popup').append('<p>Better Luck Next Time! Dealer Win<br>Press DEAL to start a new game</p>');
    //     }
    // };    

    // function compareScore() { 
    //     if (playerTotalScore > dealerTotalScore && playerTotalScore < 21) {
    //         $('.popup').append('<p>Congragulation! You Win!!!<br>Press DEAL to start a new game</p>');
    //     } else if (dealerTotalScore > playerTotalScore && dealerTotalScore < 21) {
    //         $('.popup').append('<p>Better Luck Next Time! Dealer Win<br>Press DEAL to start a new game</p>');
    //     }
    // };

    // function dealerDraw() {
    //     for (let i = 0; i < 3; i++) {
    //         if (dealerTotalScore < 17) {
    //             dealerDrawCard = deck[Math.floor(Math.random() * deck.length)];
    //                 $('.dealerCard').append("<img src = '" + dealerDrawCard.cardImg + "' />");
    //             let dealerDrawCardScore = dealerDrawCard.value;
    //             deck.pop(dealerDrawCard);
    //             playerHand.push(dealerDrawCard);

    //             dealerTotalScore = dealerTotalScore + dealerDrawCardScore;
    //             // console.log(dealerTotalScore);
    //             $('#scoreDlr').text(" " + dealerTotalScore + " ");
    //         } else {
    //             compareScore();
    //         }
    //     }
    //     checkDealerScore();
    // }





});