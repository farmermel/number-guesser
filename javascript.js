console.log('Javascript is linked succesfully!')

// function selectThings(selection) {
//   var testSelection = document.querySelectorAll(selection);
//   return testSelection;
// }

// function selectThingsById(id) {
//   var idSelection = document.getElementById(id);
//   return idSelection;
// }
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

//other variables
var minimum = 0;
var maximum = 100;

var randomNum = generateCorrectAnswer();

//Event listeners
//on click of submit button, run submit function to change display of number guessed. Also run areTheyRight function which determines whether they're correct and implements desired behavior. 

selectButton.addEventListener('click', function() {
  submit(event);
  areTheyRight();

});

//on click the set range button will assign entered value to minimum and maximum, and call generateCorrectAnswer and changePrintedRange to update the minimum and maximum in relevant places

setRangeButton.addEventListener('click', function() {
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
  return randomNum
};

//change the range that is printed at the top of the page
function changePrintedRangeText(minimum, maximum) {
  changePrintedRange.innerHTML = "Enter a number between <span>" + minimum + "</span> and <span>" + maximum + "</span>";
  console.log('Hi I change the printed range!')
}


function submit(event) {
  event.preventDefault();
  // if (numberGuessed === 42 && randomNum === 42) {
  // unHideMarvin();
  // console.log('unhiding marvin');
  // } else {
  console.log('function submit is running');
  numberGuessed.innerText = userInput.value;
  console.log(minimum);
  // }
};

var rangeArray = [minimum, maximum];

//decide if user is right, if they are implement necessary behaviors

function areTheyRight() {
  var userGuess = parseInt(userInput.value);
  console.log(userGuess);
  console.log(randomNum);
  if (userGuess === randomNum && userGuess === 42) {
    console.log('guess was Marvin');
    gameFeedback.innerText = "Grab a towel!";
    winAdjust(minimum, maximum);
    minimum = rangeArray[0];
    maximum = rangeArray[1];
    generateCorrectAnswer();
    console.log(randomNum);
    changePrintedRangeText(minimum, maximum);
    unHideMarvin();
  } else if (userGuess === randomNum){
    console.log('guess was right');
    gameFeedback.innerText = "BOOM!";
    winAdjust(minimum, maximum);
    minimum = rangeArray[0];
    maximum = rangeArray[1];
    generateCorrectAnswer();
    console.log(randomNum);
    changePrintedRangeText(minimum, maximum);
  } else if (userGuess > maximum || userGuess < minimum) {
    gameFeedback.innerText = "Enter a number in range!";
  } else if (userGuess < randomNum) {
    console.log('guess is too low');
    gameFeedback.innerText = "You're too low!";
  } else if (userGuess > randomNum) {
    console.log('guess is too high');
    gameFeedback.innerText = "You're too high!";
  } else { gameFeedback.innerText = "Nice try, enter a real number.";
  }
};

//adjust range when user wins

function winAdjust(minimum, maximum) {
  minimum -= 10;
  maximum += 10;
  rangeArray = [minimum, maximum];
  console.log('winAdjust is being called');
  console.log(rangeArray[1]);
  return rangeArray;
}

var clearButton = document.querySelector('.clear-button');

//disable and reenable the clear button

userInput.addEventListener('keydown', function() {
  clearButton.removeAttribute('disabled');

  console.log('keydown working in disable button')
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
  userInput.value = '';
  numberGuessed.innerText = "-"
  generateCorrectAnswer()
});

function unHideMarvin() {
  hiddenMarvinImg.style.removeProperty('display');
  // console.log(hiddenMarvinImg.hasAttribute('hidden'));
  // hiddenMarvinImg.removeAttribute('hidden');
  // console.log('tried to show Marvin');
  // numberGuessed.innerText = hiddenMarvinImg;
  // console.log(hiddenMarvinImg.hasAttribute('hidden'));
};

