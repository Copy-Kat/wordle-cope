//fetch("https://gist.githubusercontent.com/dracos/dd0668f281e685bad51479e5acaadb93/raw/ca9018b32e963292473841fb55fd5a62176769b5/valid-wordle-words.txt")
    //.then((response) => response.text())
    //.then((text) => {
    //new data = text; 
    //choice(text)
    //})

let dataGlobal;

const getData = async () => {
  const response = await fetch("https://gist.githubusercontent.com/dracos/dd0668f281e685bad51479e5acaadb93/raw/ca9018b32e963292473841fb55fd5a62176769b5/valid-wordle-words.txt");
  const data = await response.text();
  dataGlobal = data;
  return data;
};

(async () => {
  await getData();
  choice();
})();

function actualChoice(data, callback) {
  data.then(text => callback(text))
}

//choice(data)

window.addEventListener('load', e => {
  addDiv(0);

});

document.addEventListener('keydown', e => {
  if (!answered) {
      if (e.key === "Backspace" && currentSubDiv > 0) {
      handleBackspace();
    }
    else if (e.key === "Enter") {
      summitAnswer();
    };
  };
});

let userInput= ""
let answer
let answered = false

document.addEventListener('keypress', e => {
  if (currentSubDiv < 5 && e.keyCode >= 97 && e.keyCode <= 122) {
    handleInput(e.key);
  };
})

var currentSubDiv = 0;
var currentDiv = 0

function addDiv(currentDiv) {

  for (let i = 0; i < 5; i++) {
     
    const parentdiv = document.getElementById('main' + currentDiv);

    const newNode = document.createElement("div");

    newNode.className = "block empty" ;

    newNode.id = String(currentDiv) + i;

    const content = document.createTextNode("");

    newNode.appendChild(content);

    parentdiv.insertBefore(newNode, null);

  }
}

function handleInput(input) {  

  document.getElementById(String(currentDiv) + String(currentSubDiv)).textContent = input;  
  currentSubDiv++;
  userInput += input;
  console.log(userInput);

}

function handleBackspace() {  
  currentSubDiv--;
  document.getElementById(String(currentDiv) + String(currentSubDiv)).textContent = "";
  userInput = userInput.slice(0, -1)
  console.log(userInput)
}

function summitAnswer() {
  evalAnswer();
  if (userInput == answer && !answered) {
    answered = true
    console.log("true")
  }
  else if (currentDiv < 5) {
    currentDiv++;
    currentSubDiv = 0;
    userInput = ""
    addDiv(currentDiv)
    
  }
}

function evalAnswer() {
 for (let i = 0; i < 5; i++) {
  if (userInput[i] == answer[i]) {
    document.getElementById(String(currentDiv) + i).className = "block correct"
  }
  else if (answer.includes(userInput[i])) {
    document.getElementById(String(currentDiv) + i).className = "block misplaced"
  }
  else {
    document.getElementById(String(currentDiv) + i).className = "block wrong"
  }
 } 
}

function choice() {
  //console.log(text)
  let data = dataGlobal.split("\n");
  let range = data.length;
  let choice = data[Math.floor(Math.random()*range)]
      
  const target = document.getElementById("target");  
  answer = choice;
  target.textContent = "Answer: " + answer;

  console.log(choice);

}

