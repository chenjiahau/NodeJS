const fs = require('fs');
const fsPromises = require('fs').promises;

const clearScreen = () => {
  console.log('\x1Bc');
}

const createFile = (file) => {
  fs.writeFileSync(file, '');
}

const listFile = (dir) => {
  const fileList = [];

  try {
    const files = fs.readdirSync(dir);
    let index = 1;
    files.forEach(file => {
      fileList.push({
        index,
        file
      });

      index++;
    });
  } catch (err) {
    console.log(err);
  }

  return fileList;
}

// Read a file
const readFile = (file) => {
  if (fs.existsSync(file)) {
    return fs.readFileSync(file, 'utf-8');
  }

  return '';
}

module.exports = {
  clearScreen,
  createFile,
  listFile,
  readFile
};