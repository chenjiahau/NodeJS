const prompt = require("prompt-sync")();

// Util
const util = require("./util.js");

// Func
const func = require("./func.js");

const startProgram = () => {
  util.clearScreen();

  console.log("############################################################");
  console.log("# 1. Add a new lesson                                      #");
  console.log("# 2. List all lessons                                      #");
  console.log("# 3. List a lesson content                                 #");
  console.log("# 4. Run test                                              #");
  console.log("############################################################");
  console.log("# 98. Clear screen                                         #");
  console.log("# 0. Exist                                                 #");
  console.log("############################################################");
  const answer = prompt("Enter a number: ");

  return +answer;
}

while (true) {
  const answer = startProgram();

  if (answer === 98) {
    util.clearScreen();
  }

  if (answer === 0) {
    break;
  }

  switch (answer) {
    case 1:
      func.addANewLesson();
      break;
    case 2:
      func.listAllLessons();
      break;
    case 3:
      func.listLessonContent();
      break;
    case 4:
      func.testLesson();
      break;
  }
}

