const path = require('path');
const prompt = require("prompt-sync")();
const { Table } = require('console-table-printer');

// Util
const util = require("./util.js");

const enterToLeave = () => prompt("Enter to leave: ");

const addANewLesson = () => {
  util.clearScreen();

  const lessonName = prompt("Enter the lesson name: ");

  if (lessonName.length !== 0) {
    const file = path.join(__dirname, `./lessons/${lessonName}.txt`);
    util.createFile(file);
  }

  enterToLeave();
}

const listAllLessons = () => {
  util.clearScreen();

  const fileList = util.listFile("./lessons");
  printTable(fileList);

  enterToLeave();
}

const listLessonContent = (file) => {
  util.clearScreen();

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
  util.clearScreen();

  const lessonName = prompt("Enter the lesson: ");
  const testType = prompt("Enter test type(1 to english, to 2 translation):");
  let wordList = [];
  const randomWordList = () => wordList.sort(() => Math.random() - 0.5);

  console.log('');
  if (lessonName.length !== 0) {
    const file = path.join(__dirname, `./lessons/${lessonName}.txt`);
    const content = util.readFile(file);

    if (content.length === 0) {
      return;
    } else {
      const lineList = content.split('\n');
      for (const line of lineList) {
        const ary = line.split(',');
        wordList.push({
          word: ary[0],
          translation: ary[1]
        })
      }
    }
  }

  if (+testType === 1) {
    console.log("############################################################");
    console.log("# 1 is checked, 0 is not checked                           #");
    console.log("############################################################");

    const testResult = new Table();
    let totalNumber = 0;
    let checkedNumber = 0;
    let notCheckedNumber = 0;
    for (const index in randomWordList()) {
      const isChecked = prompt(`Do you organize "${wordList[index]['word']}": `);
      const result = +isChecked === 1;

      totalNumber++;
      result ? checkedNumber++ : notCheckedNumber++;
      testResult.addRow(
        {
          index: +index + 1,
          word: wordList[index]['word'],
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
    console.log(`Not checked word: ${notCheckedNumber}\n`);
  } else {
    const testResult = new Table();
    let totalNumber = 0;
    let checkedNumber = 0;
    let notCheckedNumber = 0;
    for (const index in randomWordList()) {
      const word = prompt(`${wordList[index]['translation']}: `);
      const result = word === wordList[index]['word'];

      totalNumber++;
      result ? checkedNumber++ : notCheckedNumber++;
      testResult.addRow(
        {
          index: +index + 1,
          word: wordList[index]['word'],
          answer: word,
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
    console.log(`Not checked word: ${notCheckedNumber}\n`);
  }

  const answer = prompt("Enter 1 again, enter to leave: ")
  if (+answer === 1) {
    testLesson();
  }
}

module.exports = {
  addANewLesson,
  listAllLessons,
  listLessonContent,
  testLesson
};