const easyEnglishWords = [
  "apple",
  "banana",
  "car",
  "dog",
  "elephant",
  "flower",
  "grape",
  "house",
  "ice cream",
  "juice",
  "kite",
  "lemon",
  "mouse",
  "nest",
  "orange",
  "pencil",
  "queen",
  "rain",
  "sun",
  "tree",
  "umbrella",
  "violin",
  "water",
  "xylophone",
  "zebra",
  "baby",
  "cat",
  "duck",
  "egg",
  "fish",
  "goat",
  "hat",
  "igloo",
  "jacket",
  "kangaroo",
  "lion",
  "monkey",
  "nut",
  "owl",
  "parrot",
  "quack",
  "rabbit",
  "snake",
  "tiger",
  "umbrella",
  "vase",
  "wagon",
  "xylophone",
  "yacht",
  "zeppelin",
  "artist",
  "baker",
  "chef",
  "dancer",
  "engineer",
  "farmer",
  "gardener",
  "hairdresser",
  "inventor",
  "janitor",
  "king",
  "lawyer",
  "musician",
  "nurse",
  "optician",
  "plumber",
  "quiltmaker",
  "reporter",
  "scientist",
  "teacher",
  "artist",
  "baker",
  "chef",
  "dancer",
  "engineer",
  "farmer",
  "gardener",
  "hairdresser",
  "inventor",
  "janitor",
  "king",
  "lawyer",
  "musician",
  "nurse",
  "optician",
  "plumber",
  "quiltmaker",
  "reporter",
  "scientist",
  "teacher",
  "ball",
  "book",
  "chair",
  "desk",
  "eraser",
  "flag",
  "guitar",
  "hat",
  "insect",
  "jar",
  "key",
  "lamp",
  "map",
  "notebook",
  "ocean",
  "pen",
  "quill",
  "robot",
  "sailboat",
  "teapot",
  "umbrella",
  "violin",
  "wallet",
  "xylophone",
  "yarn",
  "zeppelin",
  "astronaut",
  "butterfly",
  "carrot",
  "dolphin",
  "elephant",
  "firetruck",
  "giraffe",
  "helicopter",
  "island",
  "jellyfish",
  "koala",
  "lighthouse",
  "mountain",
  "night",
  "octopus",
  "penguin",
  "quokka",
  "rainbow",
  "seahorse",
  "turtle",
  "unicorn",
  "volcano",
  "whale",
  "xylophone",
  "yo-yo",
  "zebra",
  "apple",
  "banana",
  "car",
  "dog",
  "elephant",
  "flower",
  "grape",
  "house",
  "cream",
  "juice",
  "kite",
  "lemon",
  "mouse",
  "nest",
  "orange",
  "pencil",
  "queen",
  "rain",
  "sun",
  "tree",
  "umbrella",
  "violin",
  "water",
  "xylophone",
  "zebra",
  "baby",
  "cat",
  "duck",
  "egg",
  "fish",
  "goat",
  "hat",
  "igloo",
  "jacket",
  "kangaroo",
  "lion",
  "monkey",
  "nut",
  "owl",
  "parrot",
  "quack",
  "rabbit",
  "snake",
  "tiger",
  "umbrella",
  "vase",
  "wagon",
  "xylophone",
  "yacht",
  "zeppelin",
];

// Saving the score
localStorage.setItem("right", localStorage.getItem("right") || 0);
localStorage.setItem("wrong", localStorage.getItem("wrong") || 0);

let word =
    easyEnglishWords[Math.floor(Math.random() * easyEnglishWords.length)],
  guessedLetters = [],
  fails = 0,
  guessedRight = false,
  hiddenWordArray = "-".repeat(word.length).split(""),
  input = document.getElementById("guess"),
  h1 = document.getElementById("word"),
  img = document.getElementById("fails"),
  label = document.getElementById("label"),
  btn = document.getElementById("btn"),
  score = document.getElementById("score"),
  rightScore = 0,
  wrongScore = 0,
  resetScore = () => {
    localStorage.right = 0;
    localStorage.wrong = 0;
    updateScore();
  },
  updateScore = () => {
    score.innerText = `Wins: ${localStorage.right} |  Losses: ${localStorage.wrong}`;
  },
  endDisplay = (h1text, src) => {
    h1.innerText = h1text;
    input.remove();
    label.remove();
    btn.classList.toggle("hidden");
    if (src) {
      img.setAttribute("src", src);
    }
  };

updateScore();
h1.innerText = hiddenWordArray.join("");

input.addEventListener("keydown", (e) => {
  // Checking if the a letter has been used before.
  if (guessedLetters.includes(input.value)) {
    input.value = "";
    return;
  }
  if (e.code == "Enter") {
    // Using map to check every letter of the answer and if it matches the player's guess.
    word.split("").map((x, index) => {
      if (x === input.value) {
        hiddenWordArray[index] = input.value;
        guessedRight = true;
      }
    });

    // Adding the letter to the already-guessed-letters array so that the player doeas not get penelized more than once for the wrong guess
    guessedLetters.push(input.value);

    // If the guess is wrong the image will switch to the next one
    if (!guessedRight) {
      fails++;
      img.setAttribute("src", `./assets/${fails}.jpg`);
    }

    // If guessed write the boolean varaible is switched back to false
    else {
      guessedRight = false;
      // If the the player has guessed the word then it ends the game.
      if (hiddenWordArray.join("") == word) {
        localStorage.right++;
        updateScore();
        endDisplay(`You Won!`, `./assets/8.jpg`);
        return;
      }
    }

    if (fails == 7) {
      localStorage.wrong++;
      updateScore();
      // If the the player has guesse wrong 7 times then the game end.
      endDisplay(`The Correct Answer Was: ${word}`);
      return;
    }

    h1.innerText = hiddenWordArray.join("");

    // This empties the input element to recieve the new guess
    input.value = "";
  }
});
