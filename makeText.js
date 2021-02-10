/** Command-line tool to generate Markov text. */

const markov = require("../markov");
const fs = require("fs");
const process = require("process");
const axios = require("axios");
const argv = process.argv;

let [method, path] = argv.slice(2);

function generateText(text) {
  let newMM = new markov.MarkovMachine(text);
  console.log(newMM.makeText());
}

function makeTextFromFile(path) {
  fs.readFile(path, "utf8", (err, data) => {
    if (err) {
      console.error(`Cannot read file: ${path}: ${err}`);
      process.exit(1);
    } else {
      generateText(data);
    }
  });
}

async function makeTextFromURL(url) {
  let response;
  try {
    response = await axios.get(url);
  } catch (err) {
    console.error(`Cannot read url: ${url}: ${err}`);
    process.exit(1);
  }
  generateText(response.data);
}

if (method === "file") {
  makeTextFromFile(path);
} else if (method === "url") {
  makeTextFromURL(path);
} else {
  console.error(`Unknown method: ${method}`);
  process.exit(1);
}
