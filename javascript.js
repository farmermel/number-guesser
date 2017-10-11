console.log('Javascript is linked succesfully!')

// function selectThings(selection) {
//   var testSelection = document.querySelectorAll(selection);
//   return testSelection;
// }

// function selectThingsById(id) {
//   var idSelection = document.getElementById(id);
//   return idSelection;
// }

var numberGuessed= document.querySelector('p.number-guessed');
var selectButton = document.querySelector('#submit');
var userInput = document.getElementById('enter-guess');
var gameFeedback = document.querySelector('.feedback');
var enterMinField = document.querySelector('#set-minimum');
var enterMaxField = document.querySelector('#set-maximum');
var setRangeButton = document.querySelector('#range-button');
var changePrintedRange = document.querySelector('.printed-range');

var minimum = 0;
var maximum = 100;


selectButton.addEventListener('click', function() {
  submit(event);
  areTheyRight()

});

var randomNum = generateCorrectAnswer();

function generateCorrectAnswer() {
  minimum = Math.ceil(minimum);
  maximum = Math.floor(maximum);
  randomNum = Math.floor(Math.random() * (maximum - minimum)) + minimum;
  console.log(randomNum);
  return randomNum
};

function changePrintedRangeText(minimum, maximum) {
  changePrintedRange.innerHTML = "Enter a number between <span>" + minimum + "</span> and <span>" + maximum + "</span>";
  console.log('Hi I change the printed range!')
}

setRangeButton.addEventListener('click', function() {
  event.preventDefault();
  minimum = enterMinField.value;
  maximum = enterMaxField.value; 
  generateCorrectAnswer(minimum, maximum);
  changePrintedRangeText(minimum, maximum);
});


function submit(event) {
  event.preventDefault();
  console.log('function submit is running');
  numberGuessed.innerText = userInput.value;
  console.log(minimum);
};

var rangeArray = [minimum, maximum];
//rangeArray seems like a promising approach. It's making the changes! Now need to make the adjust range function call, and also need to update texts etc. Make sure it's adjust minimum and maximum everywhere!!!

function areTheyRight() {
  var userGuess = parseInt(userInput.value);
  console.log(userGuess);
  console.log(randomNum);
  if (userGuess === randomNum) {
    console.log('guess was right');
    gameFeedback.innerText = "BOOM!";
    winAdjust(minimum, maximum);
    minimum = rangeArray[0];
    maximum = rangeArray[1];
    generateCorrectAnswer();
    console.log(randomNum);
    changePrintedRangeText(minimum, maximum)
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

function winAdjust(minimum, maximum) {
  minimum -= 10;
  maximum += 10;
  rangeArray = [minimum, maximum];
  console.log('winAdjust is being called');
  console.log(rangeArray[1]);
  return rangeArray;
}

var clearButton = document.querySelector('.clear-button');

// userInput.addEventListener('keydown', function() {
//   if (clearButton.getAttribute('disabled') === '') { 
//     clearButton.setAttribute('disabled', 'true');
//   } else {clearButton.removeAttribute('disabled');
//   console.log('keydown working in disable button');
//   }
// });

//working turn clear button back on

//disable and reenable the clear button

userInput.addEventListener('keydown', function() {
  clearButton.removeAttribute('disabled');

  console.log('keydown working in disable button')
});

clearButton.addEventListener('click', function() {
  clearButton.setAttribute('disabled', 'true');
  resetButton.setAttribute('disabled', 'true');
  userInput.value = '';
  numberGuessed.innerText = "* ; *"
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
  numberGuessed.innerText = "* ; *"
  generateCorrectAnswer()
});


