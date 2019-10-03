$(document).ready(initializeApp);

var firstCardClicked = null, secondCardClicked = null;
var matches, maxMatches;

resetGame();

function initializeApp(){
  clickOn();
  $(".newgame").on("click", resetGame);
  $(".endmodal").addClass("hidden");
}

function clickOn() {
  $(".gamearea").on("click", ".card", cardClicked);
}

function clickOff() {
  $(".gamearea").unbind("click");
}

function cardClicked(event) {
  clickOff();
  var targetCard = $(event.currentTarget);

  if (targetCard.is(firstCardClicked)) {    // if the same card is clicked twice, do nothing
    clickOn();
    return;
  } else{
      targetCard.addClass("flipped");          // flip the card

      if(firstCardClicked === null){           // if this is the first card, store it
        firstCardClicked = targetCard;
        clickOn();
        return;
      } else {                                 //store second card, run check for match
          secondCardClicked = targetCard;
          setTimeout(checkforMatch,800,firstCardClicked, secondCardClicked);
        }
    }
}


function checkforMatch(cardA, cardB){

  var cardAClass = cardA.children().first().attr("class");
  var cardBClass = cardB.children().first().attr("class");
  firstCardClicked = null; secondCardClicked = null;  //reset the first and second card vars

    if(cardAClass === cardBClass){          //compare the class of the two cards

      cardA.addClass("matched").removeClass("card"); //make matched cards static
      cardB.addClass("matched").removeClass("card");
      matches++;                            //record the match
      checkforWin();                        // and check for a win
    } else{
    setTimeout(resetCards, 1000, cardB, cardA);
      }
}

function checkforWin(){
  if (matches === maxMatches){
    $(".endmodal").removeClass("hidden");
    return true;

  } else {
      clickOn();
      return false;
    }

}

function resetCards(){

  for(var iCard in arguments){
    arguments[iCard].removeClass("flipped");
  }
  firstCardClicked = null; secondCardClicked = null;
  $(".gamearea").on("click", ".card", cardClicked);
}

function resetGame() {
  $(".endmodal").addClass("hidden");
  matches = 0;
  maxMatches = 9;

  var matchedCards = {}
  matchedCards = $(".matched")
  matchedCards.removeClass("matched").addClass("card")

  resetCards(matchedCards);
}
