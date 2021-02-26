var fs = require("fs");
// load file by file
// var f = "./node_modules/73c68590a6b8ba4c/73c68590a6b8ba4c@693.js";
let base = "./node_modules/73c68590a6b8ba4c/";
var f = fs.readdirSync(base).filter((fn) => fn.startsWith("73c68590a6b8ba4c"));

var file = base + f[0];
fs.readFile(file, "utf8", function (err, data) {
  if (err) {
    return console.log(err);
  }
  // console.log(data);
  var result = data
    .replace(/new URL/g, "require")
    .replace(/,import.meta.url\)/g, ").default");

  fs.writeFile(file, result, "utf8", function (err) {
    if (err) return console.log(err);
  });
});

var f2 = fs.readdirSync(base).filter((fn) => fn.startsWith("e93997d5089d7165"));

var file2 = base + f2[0];
fs.readFile(file2, "utf8", function (err, data2) {
  if (err) {
    return console.log(err);
  }
  // console.log(data);
  var result2 = data2
    .replace(/new URL/g, "require")
    .replace(/,import.meta.url\)/g, ").default");

  fs.writeFile(file2, result2, "utf8", function (err) {
    if (err) return console.log(err);
  });
});

var f3 = fs.readdirSync(base).filter((fn) => fn.startsWith("a918fce3c1f416e8"));

var file3 = base + f3[0];
fs.readFile(file3, "utf8", function (err, data3) {
  if (err) {
    return console.log(err);
  }
  var result3 = data3
    .replace(/new URL/g, "require")
    .replace(/,import.meta.url\)/g, ").default");

  fs.writeFile(file3, result3, "utf8", function (err) {
    if (err) return console.log(err);
  });
});
