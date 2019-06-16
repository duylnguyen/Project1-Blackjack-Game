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

    let card;                

    function dealerCardDealt() {
            card = deck[Math.floor(Math.random() * deck.length)]
            deck.splice(card, 1);
            dealerHand.push(card);
            // dealerAceValue();  
            $('.dealerCard').append("<img src = '" + card.cardImg + "' />");
    };

    function playerCardDealt() {
            card = deck[Math.floor(Math.random() * deck.length)]
            deck.splice(card, 1);
            playerHand.push(card);
            // playerAceValue();
            $('.playerCard').append("<img src = '" + card.cardImg + "' />");    
    };

    // function dealerAceValue() {
    //     for (let i = 0; i < dealerHand.length; i++) {
    //         if (dealerHand[i].value === 1 && dealerTotalScore < 21) {
    //             return dealerTotalScore -= 10;
    //         } else if (dealerHand[i].value === 1 && dealerTotalScore > 11) {
    //             return dealerTotalScore;
    //         }
    //     } 
    // };

    function dealerAceValue() {
        dealerTotalScore = 0;
        let tempValue = 0;
        let aceCards = 0;

        for (let i = 0; i < dealerHand.length; i++) {
            tempValue = dealerHand[i].value;
            if (tempValue === 11) {
                aceCards++;    
            }
            dealerTotalScore = dealerTotalScore + tempValue;
            
            while (dealerTotalScore > 11 && dealerTotalScore < 17 && aceCards > 0 || dealerTotalScore > 21 && aceCards > 0) {
                dealerTotalScore = dealerTotalScore - 10;
                aceCards--;
            }
        }
        console.log(dealerTotalScore);
        return dealerTotalScore;
    };

    // function playerAceValue() {
    //     for (let i = 0; i < playerHand.length; i++) {
    //         if (playerHand[i].value === 1 && playerTotalScore < 21) {
    //             return playerTotalScore -= 10;
    //         } else if (playerHand[i].value === 1 && playerTotalScore > 11) {
    //             return playerTotalScore;
    //         }
    //     } 
    // };

    function playerAceValue() {
            playerTotalScore = 0;
        let tempValue = 0;
        let aceCards = 0;

        for (let i = 0; i < playerHand.length; i++) {
            tempValue = playerHand[i].value;
            if (tempValue === 11) {
                aceCards++;
            }
            playerTotalScore = playerTotalScore + tempValue;

            while (playerTotalScore > 11 && playerTotalScore < 17  && aceCards > 0 || playerTotalScore > 21 && aceCards > 0) {
                playerTotalScore = playerTotalScore - 10;
                aceCards--;
            } 
        }
        console.log(playerTotalScore);
        return playerTotalScore;
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
            dealerAceValue();
            // dealerTotalScoreDisplay();
    }

    function playerCard() {
        for (let i = 0; i < 2; i++) {
            playerCardDealt();
            addPlayerScore();
            playerAceValue();
            if (playerTotalScore === 21) {
                $('.popup').text('BLACKJACK!!! YOU WIN!!! Press Deal to start a new game.');
            }
        }
        // playerTotalScoreDisplay();
    }

    function playerHit() {
        playerCardDealt();
        addPlayerScore();
        playerAceValue();
        // compareScore();    
        // $('#scorePly').text(" " + playerTotalScore + " ");
    };

    function openDealerCard() {
        card = deck[Math.floor(Math.random() * deck.length)]
            deck.splice(card, 1);
            dealerHand.push(card);
            addDealerScore()
            dealerAceValue();
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

    // Player and Dealer Win count



    function compareScore() {
        if (playerTotalScore > 21) {
            $('.popup').text('YOU BUSTED!!! Press Deal to start a new game.');
        } 
        else if (dealerTotalScore > 21  || (playerTotalScore > dealerTotalScore && dealerTotalScore >= 17)) {
            $('.popup').text('Congratulation! YOU WIN!!! Press Deal to start a new game.');
        }
        else if (playerTotalScore < dealerTotalScore) {
            $('.popup').text('YOU LOST!!! Press Deal to start a new game.');
        }
        else if (playerTotalScore === dealerTotalScore) {
            $('.popup').text('TIE GAME!!! Press Deal to start a new game.');
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


});