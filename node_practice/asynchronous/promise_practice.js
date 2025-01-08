const fs = require("fs");
const superagent = require("superagent");

const readFilePro = (fileName) => {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, "utf-8", (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
};

const writeFilePro = (fileName, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(fileName, data, (err) => {
      if (err) reject(err);
      resolve("File written successfully");
    });
  });
};

// const getDogImage = readFilePro("dog.txt")
//   .then((data) => {
//     console.log(`breed: ${data}`);
//     return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
//   })
//   .then((res) => {
//     console.log(res.body.message);
//     return writeFilePro("dog-img.txt", res.body.message);
//   })
//   .then(() => {
//     console.log("Random dog image saved to file");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// ------- using async/await -------

const getDogImage = async () => {
  const data = await readFilePro("dog.txt");
  console.log(`Breed: ${data}`);

  const res = await superagent.get(
    `https://dog.ceo/api/breed/${data}/images/random`
  );
  console.log(res.body.message);
};

getDogImage();
