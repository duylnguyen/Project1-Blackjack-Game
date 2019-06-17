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
    
    // All eventListener buttons
    $('.dealBtn').on('click', function(evt) {
        evt.preventDefault();
        resetGame();
        newDeck();
        shuffleDeck();
        dealerCard();
        playerCard();
        if (playerTotalScore === 21) {
            $('.popup').text('BLACKJACK!!! YOU WIN!!! Press Deal to start a new game.');
            playerCount++;
            $('#playerWin').text(" "+ playerCount +" ");
        }
        $('.dealBtn').attr("disable", true);
    });

    $('.hitBtn').on('click', function(evt) {
        evt.preventDefault();
        playerHit();
        if (playerTotalScore > 21) {
            compareScore();
            dealerTotalScoreDisplay();
            playerTotalScoreDisplay();
            winCount();
            $('.hitBtn').attr("disable", true);
            $('.standBtn').attr("disable", true);
        } 

    });

    $('.standBtn').on('click', function(evt) {
        evt.preventDefault();
        openDealerCard();
        dealerDraw();
        compareScore();
        winCount();
        $('.dealBtn').attr("disable", false);
    });
    
    // Deal cards from array                
    function dealerCardDealt() {
        let cardIndex = Math.floor(Math.random() * deck.length)
            currentCard = deck.splice(cardIndex, 1)[0];
            dealerHand.push(currentCard); 
            $('.dealerCard').append("<img src = '" + currentCard.cardImg + "' />");
    };

    function playerCardDealt() {
        let cardIndex = Math.floor(Math.random() * deck.length)
            currentCard = deck.splice(cardIndex, 1)[0];
            playerHand.push(currentCard);
            $('.playerCard').append("<img src = '" + currentCard.cardImg + "' />");    
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

    // Ace value conditions
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
            // Decide if the Ace value is 1 or 11
            while (dealerTotalScore > 21 && aceCards > 0) {
                dealerTotalScore = dealerTotalScore - 10;
                aceCards--;
            }
        }
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

    // Ace value conditions
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
            // Decide if the Ace value is 1 or 11
            while (playerTotalScore > 21 && aceCards > 0) {
                playerTotalScore = playerTotalScore - 10;
                aceCards--;
                // console.log(playerTotalScore);
            } 
        }
        return playerTotalScore;
    };

    // Function to add score and display scores
    function addDealerScore() {
        dealerTotalScore = dealerTotalScore + currentCard.value;    
    }

    function addPlayerScore() {
        playerTotalScore = playerTotalScore + currentCard.value;
    }

    function dealerTotalScoreDisplay() {
        $('#showDlrScore').text(" " + dealerTotalScore + " ");
    };

    function playerTotalScoreDisplay() {
        $('#showPlyScore').text(" " + playerTotalScore + " ");
    };

    // Deal first 2 cards to Dealer and Player
    function dealerCard() {
        $('.dealerCard').append("<img src = 'images/blue_back.jpg' />");
            dealerCardDealt();
            addDealerScore();
            dealerAceValue();
            dealerTotalScoreDisplay();
    };

    function playerCard() {
        for (let i = 0; i < 2; i++) {
            playerCardDealt();
            addPlayerScore();
            playerAceValue();
        }
        playerTotalScoreDisplay();
    };

    // Hit cards for Player
    function playerHit() {
        playerCardDealt();
        addPlayerScore();
        // Chad guide to solve the ace value issue
        if (playerTotalScore > 21) {
            playerAceValue();
        }    
        $('#showPlyScore').text(" " + playerTotalScore + " ");
    };

    // Open face down card for Dealer
    function openDealerCard() {
        card = deck[Math.floor(Math.random() * deck.length)]
            deck.shift(card);
            dealerHand.push(card);
            addDealerScore()
            dealerAceValue();
                $('img:first').replaceWith("<img src = '" + card.cardImg + "' />");
                $('#showDlrScore').text(" " + dealerTotalScore + " ");
    };

    // Draw cards for Dealer to complete game
    function dealerDraw() {
        for (let i = 0; i < 6; i++) {
            
            if (dealerTotalScore < 17) {
                dealerCardDealt();
                addDealerScore();
                // Chad guide to solve ace value issue
                if (dealerTotalScore > 21) {
                    dealerAceValue();
                }
                $('#showDlrScore').text(" " + dealerTotalScore + " ");
            } else if (dealerTotalScore >= 17) {
                return dealerTotalScore;
            }
        }
    };

    // Player and Dealer Win count
        let dealerCount = 0;
        let playerCount = 0;
    function winCount() {
        if (dealerTotalScore > playerTotalScore && dealerTotalScore <= 21 || playerTotalScore > 21) {
            dealerCount++;
            $('#dealerWin').text(" "+ dealerCount +" ");
        } else if (playerTotalScore > dealerTotalScore && playerTotalScore <= 21 || dealerTotalScore > 21) {
            playerCount++;
            $('#playerWin').text(" "+ playerCount +" ");
        } else if (playerTotalScore === dealerTotalScore) {
            dealerCount += 0;
            playerCount += 0;
        } 
    };
        
    // Compare score for winning conditions
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

    // function
    // Reset the game
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
        $('#showDlrScore').empty();
        $('#showPlyScore').empty();
        $('.popup').empty();
    };
});