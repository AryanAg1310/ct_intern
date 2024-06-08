const fs = require('fs');

function readFileAsync(filePath, callback) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      callback(err);
    } else {
      callback(null, data);
    }
  });
}

function processFileData(data, callback) {
  // simulate some async processing
  setTimeout(() => {
    const processedData = data.toUpperCase();
    callback(null, processedData);
  }, 2000);
}

function main() {
  readFileAsync('example.txt', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      processFileData(data, (err, processedData) => {
        if (err) {
          console.error(err);
        } else {
          console.log(processedData);
        }
      });
    }
  });
}

main();

const fs = require('fs').promises;

async function readFileAsync(filePath) {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    return data;
  } catch (err) {
    throw err;
  }
}

async function processFileData(data) {
  // simulate some async processing
  await new Promise(resolve => setTimeout(resolve, 2000));
  return data.toUpperCase();
}

async function main() {
  try {
    const data = await readFileAsync('example.txt');
    const processedData = await processFileData(data);
    console.log(processedData);
  } catch (err) {
    console.error(err);
  }
}

main();