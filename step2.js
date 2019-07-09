// const fs = require('fs');
// const axios = require('axios');

// async function cat(path) {
//   return await fs.promises.readFile(path, "utf-8")
// }

// async function webCat(url) {
//   return await axios.get(url)
// }

// async function errorHandling(cb, param) {
//   let data
//   try {
//     data = await cb(param)
//   } catch (error) {
//     console.error(`Error reading ${param}: \n ${error}`);
//     process.exit(1)
//   }
//   return data
// }

// async function start() {
//   if (process.argv[2].startsWith('http')) {
//     msg = await errorHandling(webCat, process.argv[2]);
//     console.log(msg)
//   } else {
//     msg = await errorHandling(cat, process.argv[2]);
//     console.log(msg)
//   }
// }
 
// start()


const fs = require('fs');
const axios = require('axios');

function cat(path) {
  fs.readFile(path, 'utf-8', function(error, data) {
    if (error) {
      console.error(`Error reading ${path}: \n ${error}`);
      process.exit(1)
    }
    console.log(data)
  })
}

async function webCat(url) {
  try {
    let request = await axios.get(url)
    console.log(request.data)
  } catch (error) {
    console.error(`Error reading ${url}: \n ${error}`);
    process.exit(1)
  }
}

if (process.argv[2].startsWith('http')) {
  webCat(process.argv[2]);
} else {
  cat(process.argv[2])
}



