$(document).ready(function() {

    dealerHand = [];
    playerHand = [];
    dealerHandValue = 0;
    playerHandValue = 0;

    let deck = [];
    let value = 0
    for(let i = 0; i < 52; i++){
        if(i < 4) {
            value = 11
        } else if(i < 8) {
            value = 2
        } else if(i < 12) {
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
        deck.push({value: value, cardImg: "images/" + i + ".jpg"});
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

    function newDeck() {
        deck.pop(2);
        deck.pop(1);
        deck.pop(0);
        console.log(deck.length);
    };
    

    $('.dealBtn').on('click', function(evt) {
        shuffleDeck(deck);
        evt.preventDefault();
            $('#dealerCard-1').append("<div><img src = '" + deck[Math.floor(Math.random() * deck.length)].cardImg + "' /></div>");
                                    //  ('<img src = "images/Red_back.jpg">');                                                                                                  
            $('#dealerCard-2').append("<div><img src = '" + deck[Math.floor(Math.random() * deck.length)].cardImg + "' /></div>");
            $('#playerCard-1').append("<div><img src = '" + deck[Math.floor(Math.random() * deck.length)].cardImg + "' /></div>");
            $('#playerCard-2').append("<div><img src = '" + deck[Math.floor(Math.random() * deck.length)].cardImg + "' /></div>");
        
        newDeck();
    });






});