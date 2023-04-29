const path = require('path');
const prompt = require("prompt-sync")();
const { Table } = require('console-table-printer');

// Util
const util = require("./util.js");

const enterToLeave = () => prompt("Enter to leave: ");

const addANewLesson = () => {
  const lessonName = prompt("Enter the lesson name: ");

  if (lessonName.length !== 0) {
    const file = path.join(__dirname, `./lessons/${lessonName}.txt`);
    util.createFile(file);
  }

  enterToLeave();
}

const listAllLessons = () => {
  const fileList = util.listFile("./lessons");
  printTable(fileList);

  enterToLeave();
}

const listLessonContent = (file) => {
  const lessonName = prompt("Enter the lesson: ");

  if (lessonName.length !== 0) {
    const file = path.join(__dirname, `./lessons/${lessonName}.txt`);
    const list = util.readFile(file).split('\n');
    const wordList = [];

    for (const index in list) {
      wordList.push({
        index: +index + 1,
        word: list[index]
      })
    }

    printTable(wordList);
  }

  enterToLeave();
}

const testLesson = () => {
  const lessonName = prompt("Enter the lesson: ");
  let wordList = [];
  const randomWordList = () => wordList.sort(() => Math.random() - 0.5);

  if (lessonName.length !== 0) {
    const file = path.join(__dirname, `./lessons/${lessonName}.txt`);
    const content = util.readFile(file);

    if (content.length === 0) {
      return;
    } else {
      wordList = content.split('\n');
    }
  }

  console.log("############################################################");
  console.log("# 1 is checked, 0 is not checked                           #");
  console.log("############################################################");

  const testResult = new Table();
  let totalNumber = 0;
  let checkedNumber = 0;
  let notCheckedNumber = 0;
  for (const index in randomWordList()) {
    const isChecked = prompt(`Do you organize "${wordList[index]}": `);
    const result = +isChecked === 1;

    totalNumber++;
    result ? checkedNumber++ : notCheckedNumber++;
    testResult.addRow(
      {
        index: +index + 1,
        word: wordList[index],
        isChecked: result ? '✅' : '❌',
      },
      {
        color: result ? 'green' : 'red'
      }
    );
  }

  util.clearScreen();
  testResult.printTable();

  console.log(`Total word: ${totalNumber}`);
  console.log(`Checked word: ${checkedNumber}`);
  console.log(`NOt checked word: ${notCheckedNumber}`);
  console.log('');

  const answer = prompt("Enter 1 again, enter to leave: ")
  if (+answer === 1) {
    randomWordList();
  }
}

module.exports = {
  addANewLesson,
  listAllLessons,
  listLessonContent,
  testLesson
};