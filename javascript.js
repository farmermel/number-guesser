console.log('Javascript is linked succesfully!')

//select elements from HTML
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

//other variables
var minimum = 0;
var maximum = 100;

var randomNum;

generateCorrectAnswer();

//EVENT LISTENERS
//on click of submit button, run submit function to change display of number guessed. Also run areTheyRight function which determines whether they're correct and implements desired behavior. 

selectButton.addEventListener('click', function(event) {
  submit(event);
  areTheyRight();

});

//on click the set range button will assign entered value to minimum and maximum, and call generateCorrectAnswer and changePrintedRange to update the minimum and maximum in relevant places

setRangeButton.addEventListener('click', function(event) {
  event.preventDefault();
  minimum = enterMinField.value;
  maximum = enterMaxField.value; 
  generateCorrectAnswer(minimum, maximum);
  changePrintedRangeText(minimum, maximum);
});

//generate the correct answer based on minimum and maximum

function generateCorrectAnswer() {
  minimum = Math.ceil(minimum);
  maximum = Math.floor(maximum);
  randomNum = Math.floor(Math.random() * (maximum - minimum)) + minimum;
  console.log(randomNum);
};

//change the range that is printed at the top of the page
function changePrintedRangeText(minimum, maximum) {
  changePrintedRange.innerHTML = "Enter a number between <span>" + minimum + "</span> and <span>" + maximum + "</span>";
  console.log('Hi I change the printed range!')
}


function submit(event) {
  event.preventDefault();
  if (numberGuessed === 42 && randomNum === 42) {
  unHideMarvin();
  console.log('unhiding marvin');
  } else { 
  numberGuessed.innerText = userInput.value;
  }
};

var rangeArray = [minimum, maximum];

//decide if user is right, if they are implement necessary behaviors


function areTheyRight() {
  var userGuess = parseInt(userInput.value);
  console.log(userGuess);
  console.log(randomNum);
  if (userGuess === randomNum && userGuess === 42) {
    easterEggBehavior();
  } else if (userGuess === randomNum){
    winBehavior();
  } else if (userGuess > maximum || userGuess < minimum) {
    outOfRange();
  } else if (userGuess < randomNum) {
    tooLow();
  } else if (userGuess > randomNum) {
    console.log('too high if statement is working')
    tooHigh();
  } else { 
    notANumber();
  };
};

//input reaction functions

function easterEggBehavior() {
  console.log('guess was Marvin');
  gameFeedback.innerText = "Grab a towel!";
  winAdjust(minimum, maximum);
  //minimum = rangeArray[0];
  //maximum = rangeArray[1];
  generateCorrectAnswer();
  console.log(randomNum);
  changePrintedRangeText(minimum, maximum);
  unHideMarvin();
};

function winBehavior() {
  console.log('guess was right');
    gameFeedback.innerText = "BOOM!";
    winAdjust(minimum, maximum);
    //minimum = rangeArray[0];
    //maximum = rangeArray[1];
    generateCorrectAnswer();
    console.log(randomNum);
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

//adjust range when user wins

function winAdjust(minimum, maximum) {
  minimum -= 10;
  maximum += 10;
  //rangeArray = [minimum, maximum];
  console.log('winAdjust is being called');
  console.log(rangeArray[1]);
  //return rangeArray;
}

//disable and reenable the clear button

userInput.addEventListener('keydown', function() {
  clearButton.removeAttribute('disabled');
});

clearButton.addEventListener('click', function() {
  clearButton.setAttribute('disabled', 'true');
  resetButton.setAttribute('disabled', 'true');
  userInput.value = '';
  numberGuessed.innerText = "-"
});

//disable and reenable the reset button

var resetButton = document.querySelector('#reset-button');

userInput.addEventListener('keydown', function() {
  resetButton.removeAttribute('disabled');
});

resetButton.addEventListener('click', function() {
  resetButton.setAttribute('disabled', 'true');
  clearButton.setAttribute('disabled', 'true');
  numberGuessed.style.display = 'block';
  hiddenMarvinImg.style.display = 'none'
  userInput.value = '';
  numberGuessed.innerText = "-"
  generateCorrectAnswer()
});


function unHideMarvin() {
   hiddenMarvinImg.style.display = 'block';
   numberGuessed.style.display = 'none';
  // hiddenMarvinImg.style.removeProperty('display');
  // console.log(hiddenMarvinImg.hasAttribute('hidden'));
  // hiddenMarvinImg.removeAttribute('hidden');
  // console.log('tried to show Marvin');
  // numberGuessed.innerText = hiddenMarvinImg;
  // console.log(hiddenMarvinImg.hasAttribute('hidden'));
};

