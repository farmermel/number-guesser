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


selectButton.addEventListener('click', submit);

function submit(event) {
  event.preventDefault();
  console.log('function submit is running');
  numberGuessed.innerText = userInput.value;
};

function generateCorrectAnswer() {
  var correctAnswer = Math.floor(Math.random() * 100 + 1 );
  console.log(correctAnswer);
  return correctAnswer;
};

var randomNum = generateCorrectAnswer();

selectButton.addEventListener('click', areTheyRight);

function areTheyRight() {
  var userGuess = parseInt(userInput.value);
  console.log(typeof(userGuess));
  // if (typeof(userGuess) !== 'number') {
  //   console.log('guess was not a number');
  //   gameFeedback.innerText = "Nice try, enter a real number.";
  // } else 
  // when I have the above as the first if statement it always runs as though the value of input is a number, even though it isn't! Not sure why
  if (userGuess === randomNum) {
    console.log('guess was right');
    gameFeedback.innerText = "BOOM!";
  } else if (userGuess < randomNum) {
    console.log('guess is too low');
    gameFeedback.innerText = "You're too low!";
  } else if (userGuess > 100) {
    gameFeedback.innerText = "Enter a number in range!";
  } else if (userGuess > randomNum) {
    console.log('guess is too high');
    gameFeedback.innerText = "You're too high!";
  } else{ gameFeedback.innerText = "Nice try, enter a real number.";
  }
};

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
})
