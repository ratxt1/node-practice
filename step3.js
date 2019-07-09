const fs = require('fs');
const axios = require('axios');

let includesOut = process.argv[2] === '--out'
start()



async function start() {
  if (includesOut) {
    for (let i = 0; i < ((process.argv.length - 3) / 2); i++) {
      let readPath = process.argv[4 + 2*i];
      data = await read(readPath);
      let writePath = process.argv[3 + 2*i];
      write(writePath, data)
    }
  } else {
    for (let i = 0; i < process.argv.length - 2; i++) {
      let readPath = process.argv[2 + i];
      data = await read(readPath);
      console.log(data)
    }
  }
} 

//cat, webCat, and out return promises

async function cat(path) {
  return fs.promises.readFile(path, "utf-8")
}

async function webCat(url) {
  return axios.get(url)
}

async function out(writeFile, data) {
  return fs.promises.writeFile(writeFile, data);
}

//error handling

async function catchError(args, method, errorMsg) {
  try {
    let data = await method(...args)
    return data
  } catch (error) {
    console.error(errorMsg(args, error))
    process.exit(1)
  }
}

async function read(path) {
  let errorMsg = errorMessageOnRead
  let method = (path.startsWith('http')) ? webCat : cat;
  
  data = await catchError([path], method, errorMsg);
  if (method === webCat) {
    data = data.data
  }
  return data
}

async function write(writePath, data) {
  method = out;
  errorMsg = errorMessageOnWrite;

  catchError([writePath, data], method, errorMsg);
}

function errorMessageOnRead(args, error) {
  return `Error reading ${args[0]}: \n ${error}`;
}

function errorMessageOnWrite(args, error) {
  return `Couldn't write  ${args[0]}: \n ${error}`;
}