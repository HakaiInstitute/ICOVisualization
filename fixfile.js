var fs = require("fs");
// load file by file
// var f = "./node_modules/73c68590a6b8ba4c/73c68590a6b8ba4c@693.js";
const books = [
  "73c68590a6b8ba4c",
  "e93997d5089d7165",
  "a918fce3c1f416e8",
  "a2e58f97fd5e8d7c",
];
let f = [];
let fileToGet = [];
let result = [];

let i = 0;
for (let index = 4; index < 4 + books.length; index++) {
  // console.log(pages[i]);
  let base = "./node_modules/73c68590a6b8ba4c/";
  f[index] = fs.readdirSync(base).filter((fn) => fn.startsWith(books[i]));
  i++;

  fileToGet[index] = base + f[index][0];
  fs.readFile(fileToGet[index], "utf8", function (err, data) {
    if (err) {
      return console.log(err);
    }
    // console.log(data);
    result[index] = data
      .replace(/new URL/g, "require")
      .replace(/,import.meta.url\)/g, ").default");

    fs.writeFile(fileToGet[index], result[index], "utf8", function (err) {
      if (err) return console.log(err);
    });
  });
}
// let base = "./node_modules/73c68590a6b8ba4c/";
// var f = fs.readdirSync(base).filter((fn) => fn.startsWith("73c68590a6b8ba4c"));

// var file = base + f[0];
// fs.readFile(file, "utf8", function (err, data) {
//   if (err) {
//     return console.log(err);
//   }
//   // console.log(data);
//   var result = data
//     .replace(/new URL/g, "require")
//     .replace(/,import.meta.url\)/g, ").default");

//   fs.writeFile(file, result, "utf8", function (err) {
//     if (err) return console.log(err);
//   });
// });

// var f2 = fs.readdirSync(base).filter((fn) => fn.startsWith("e93997d5089d7165"));

// var file2 = base + f2[0];
// fs.readFile(file2, "utf8", function (err, data2) {
//   if (err) {
//     return console.log(err);
//   }
//   // console.log(data);
//   var result2 = data2
//     .replace(/new URL/g, "require")
//     .replace(/,import.meta.url\)/g, ").default");

//   fs.writeFile(file2, result2, "utf8", function (err) {
//     if (err) return console.log(err);
//   });
// });

// var f3 = fs.readdirSync(base).filter((fn) => fn.startsWith("a918fce3c1f416e8"));

// var file3 = base + f3[0];
// fs.readFile(file3, "utf8", function (err, data3) {
//   if (err) {
//     return console.log(err);
//   }
//   var result3 = data3
//     .replace(/new URL/g, "require")
//     .replace(/,import.meta.url\)/g, ").default");

//   fs.writeFile(file3, result3, "utf8", function (err) {
//     if (err) return console.log(err);
//   });
// });

// fix second notebook
const pages = [
  "e93997d5089d7165",
  "a2e58f97fd5e8d7c",
  "94ec544c25860285",
  "3ba42860653e101c",
  "a918fce3c1f416e8",
  "73c68590a6b8ba4c",
];
let ff = [];
let fileToGrab = [];
let resultz = [];

let j = 0;
for (let index = 4; index < 4 + pages.length; index++) {
  // console.log(pages[i]);
  let base2 = "./node_modules/1aff5f3ccb61927a/";
  ff[index] = fs.readdirSync(base2).filter((fn) => fn.startsWith(pages[j]));
  i++;

  fileToGrab[index] = base2 + ff[index][0];
  fs.readFile(fileToGrab[index], "utf8", function (err, data) {
    if (err) {
      return console.log(err);
    }
    // console.log(data);
    resultz[index] = data
      .replace(/new URL/g, "require")
      .replace(/,import.meta.url\)/g, ").default");

    fs.writeFile(fileToGrab[index], resultz[index], "utf8", function (err) {
      if (err) return console.log(err);
    });
  });
}

// var f5 = fs
//   .readdirSync(base2)
//   .filter((fn) => fn.startsWith("7d475d2f636fd7d5"));

// var file5 = base2 + f5[0];
// fs.readFile(file4, "utf8", function (err, data) {
//   if (err) {
//     return console.log(err);
//   }
//   // console.log(data);
//   var result5 = data
//     .replace(/new URL/g, "require")
//     .replace(/,import.meta.url\)/g, ").default");

//   fs.writeFile(file5, result5, "utf8", function (err) {
//     if (err) return console.log(err);
//   });
// });
