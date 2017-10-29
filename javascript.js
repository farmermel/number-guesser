var numberGuessed= document.querySelector('p.number-guessed');
var selectButton = document.querySelector('#submit');
var userInput = document.getElementById('enter-guess');
var gameFeedback = document.querySelector('.feedback');
var enterMinField = document.querySelector('#set-minimum');
var enterMaxField = document.querySelector('#set-maximum');
var setRangeButton = document.querySelector('#range-button');
var changePrintedRange = document.querySelector('.printed-range');
var hiddenMarvinImg = document.querySelector('img');
var clearButton = document.querySelector('.clear-button');

var minimum = 0;
var maximum = 100;

var randomNum;

generateCorrectAnswer();

selectButton.addEventListener('click', function(event) {
  submit(event);
  areTheyRight();

});

setRangeButton.addEventListener('click', function(event) {
  event.preventDefault();
  minimum = enterMinField.value;
  maximum = enterMaxField.value; 
  generateCorrectAnswer(minimum, maximum);
  changePrintedRangeText(minimum, maximum);
});

function generateCorrectAnswer() {
  minimum = Math.ceil(minimum);
  maximum = Math.floor(maximum);
  randomNum = Math.floor(Math.random() * (maximum - minimum)) + minimum;
  console.log(randomNum);
};

function changePrintedRangeText(minimum, maximum) {
  changePrintedRange.innerHTML = "Enter a number between <span>" + minimum + "</span> and <span>" + maximum + "</span>";
};

function submit(event) {
  event.preventDefault();
  if (numberGuessed === 42 && randomNum === 42) {
    unHideMarvin();
  } else { 
    numberGuessed.innerText = userInput.value;
  };
};

var rangeArray = [minimum, maximum];

function areTheyRight() {
  var userGuess = parseInt(userInput.value);
  if (userGuess === randomNum && userGuess === 42) {
    easterEggBehavior();
  } else if (userGuess === randomNum){
    winBehavior();
  } else if (userGuess > maximum || userGuess < minimum) {
    outOfRange();
  } else if (userGuess < randomNum) {
    tooLow();
  } else if (userGuess > randomNum) {
    tooHigh();
  } else { 
    notANumber();
  };
};

function easterEggBehavior() {
  gameFeedback.innerText = "Grab a towel!";
  winAdjust(minimum, maximum);
  generateCorrectAnswer();
  changePrintedRangeText(minimum, maximum);
  unHideMarvin();
};

function winBehavior() {
    gameFeedback.innerText = "BOOM!";
    winAdjust(minimum, maximum);
    generateCorrectAnswer();
    changePrintedRangeText(minimum, maximum);
};

function outOfRange() {
  gameFeedback.innerText = "Enter a number in range!";
};

function tooLow() {
  gameFeedback.innerText = "You're too low!";
};

function tooHigh() {
  gameFeedback.innerText = "You're too high!";
};

function notANumber() {
  gameFeedback.innerText = "Nice try, enter a real number.";
};

function winAdjust(minimum, maximum) {
  minimum -= 10;
  maximum += 10;
};

userInput.addEventListener('keydown', function() {
  clearButton.removeAttribute('disabled');
});

clearButton.addEventListener('click', function() {
  clearButton.setAttribute('disabled', 'true');
  resetButton.setAttribute('disabled', 'true');
  userInput.value = '';
  numberGuessed.innerText = "-"
});

var resetButton = document.querySelector('#reset-button');

userInput.addEventListener('keydown', function() {
  resetButton.removeAttribute('disabled');
});

resetButton.addEventListener('click', function() {
  resetButton.setAttribute('disabled', 'true');
  clearButton.setAttribute('disabled', 'true');
  numberGuessed.style.display = 'block';
  hiddenMarvinImg.style.display = 'none';
  userInput.value = '';
  numberGuessed.innerText = "-";
  generateCorrectAnswer();
});

function unHideMarvin() {
   hiddenMarvinImg.style.display = 'block';
   numberGuessed.style.display = 'none';
};

