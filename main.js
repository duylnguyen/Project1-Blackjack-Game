$(document).ready(function () {

    let dealerHand = [];
    let playerHand = [];
        
    let dealerTotalScore = 0;
    let playerTotalScore = 0;

    // Set up deck of cards
        let deck = [];
        let value = 0;
        
    function newDeck() {
        
        for (let i = 0; i < 52; i++) {
            if (i < 4) {
                value = 1
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
        }
    };
    
    // Shuffle Deck
    function shuffleDeck() {
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
        resetGame();
        newDeck();
        shuffleDeck();
        dealerCard();
        playerCard();
    });

    $('.hitBtn').on('click', function(evt) {
        evt.preventDefault();
        playerHit();
        compareScore();
        if (playerTotalScore > 21) {
            dealerTotalScoreDisplay();
            playerTotalScoreDisplay();
        }
    });

    $('.standBtn').on('click', function(evt) {
        evt.preventDefault();
        openDealerCard();
        dealerDraw();
        dealerTotalScoreDisplay();
        playerTotalScoreDisplay();
        compareScore();
    });
    
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

    let card;                

    function dealerCardDealt() {
            card = deck[Math.floor(Math.random() * deck.length)]
            deck.splice(card, 1);
            dealerHand.push(card);
            dealerAceValue();  
            $('.dealerCard').append("<img src = '" + card.cardImg + "' />");
    };

    function playerCardDealt() {
            card = deck[Math.floor(Math.random() * deck.length)]
            deck.splice(card, 1);
            playerHand.push(card);
            playerAceValue();
            $('.playerCard').append("<img src = '" + card.cardImg + "' />");    
    };

    function dealerAceValue() {
        for (let i = 0; i < dealerHand.length; i++) {
            if (dealerHand[i].value === 1 && dealerTotalScore + 10 < 11) {
                return dealerTotalScore += 10;
            } else if (dealerHand[i].value === 1 && dealerTotalScore > 11) {
                return dealerTotalScore += 0;
            }
        } 
    };

    function playerAceValue() {
        for (let i = 0; i < playerHand.length; i++) {
            if (playerHand[i].value === 1 && playerTotalScore + 10 < 11) {
                return playerTotalScore += 10;
            } else if (playerHand[i].value === 1 && playerTotalScore > 11) {
                return playerTotalScore += 0;
            }
        } 
    };

    function addDealerScore() {
        dealerTotalScore = dealerTotalScore + card.value;    
        // dealerAceValue();
    }

    function addPlayerScore() {
        playerTotalScore = playerTotalScore + card.value;
        // playerAceValue();
    }

    function dealerTotalScoreDisplay() {
        $('.dealerScore').append("<span id = 'scoreDlr'> " + dealerTotalScore + "</span>");
    }

    function playerTotalScoreDisplay() {
        $('.playerScore').append("<span id = 'scorePly'> " + playerTotalScore + "</span>");
    }

    function dealerCard() {
        $('.dealerCard').append("<img src = 'images/blue_back.jpg' />");
            dealerCardDealt();
            addDealerScore();
            // dealerAceValue();
            // dealerTotalScoreDisplay();
    }

    function playerCard() {
        for (let i = 0; i < 2; i++) {
            playerCardDealt();
            addPlayerScore();
            // playerAceValue();
        }
        // playerTotalScoreDisplay();
    }

    function playerHit() {
            playerCardDealt();
            addPlayerScore();
            // playerAceValue();
            // compareScore();    
                // $('#scorePly').text(" " + playerTotalScore + " ");
    };

    function openDealerCard() {
        card = deck[Math.floor(Math.random() * deck.length)]
            deck.splice(card, 1);
            dealerHand.push(card);
            addDealerScore()
            // dealerAceValue();
            $('img:first').replaceWith("<img src = '" + card.cardImg + "' />");
            // $('#scoreDlr').text(" " + dealerTotalScore + " ");
    };

    function dealerDraw() {
        for (let i = 0; i < 5; i++) {
            
            if (dealerTotalScore < 17) {
                dealerCardDealt();
                addDealerScore();
                // dealerAceValue();
                // $('#scoreDlr').text(" " + dealerTotalScore + " ");
            } else if (dealerTotalScore >= 17) {
                return dealerTotalScore;
            }
        }
    };

    function compareScore() {
        if (playerTotalScore > 21) {
            $('.popup').append('<p>YOU ARE BUSTED!!! Better Luck Next Time! Dealer Win<br>Press DEAL to start a new game</p>');
        } 
        else if (dealerTotalScore > 21  || (playerTotalScore > dealerTotalScore && dealerTotalScore >= 17)) {
            $('.popup').append('<p>Congragulation! YOU WIN!!!<br>Press DEAL to start a new game</p>');
        }
        else if (playerTotalScore < dealerTotalScore) {
            $('.popup').append('<p>YOU LOST!!! Better Luck Next Time! Dealer Win<br>Press DEAL to start a new game</p>');
        }
        else if (playerTotalScore === dealerTotalScore) {
            $('.popup').append('<p>TIE GAME</p>');
        } 
    };

    function resetGame() {
        $('.dealerCard').empty();
        $('.playerCard').empty();
        $('.dealerScore span').empty();
        $('.playerScore span').empty();
        deck = [];
        dealerTotalScore = 0;
        playerTotalScore = 0;
        dealerHand = [];
        playerHand = [];
        $('span #scoreDlr').empty();
        $('span #scorePly').empty();
        $('.popup').empty();
    };
    
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
    //         $('.popup').append('<p>YOU ARE BUSTED!!! Better Luck Next Time! Dealer Win<br>Press DEAL to start a new game</p>');
    //     }
    // }

    // function checkPlayerScore() {
    //     if (playerTotalScore > 21) {
    //         $('.popup').append('<p>YOU LOST!!! Better Luck Next Time! Dealer Win<br>Press DEAL to start a new game</p>');
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