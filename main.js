"use strict";
//  Libraries
const sys = require("systeminformation");
const os = require("os");
const color = require("colors");
const Table = require("cli-table");
// const cli = require("commander");
const table = new Table();

//Implementation of format for JavaScript

String.prototype.format = function() {
  let a = this;
  for (let k in arguments) {
    a = a.replace("{" + k + "}", arguments[k]);
  }
  return a;
};

// Fetcher functions

function get_cpu() {
  let model = os.cpus()[0]["model"];
  let cores = os.cpus().length;

  // Check if the processor it's from Intel or AMD
  if (!model.search("Intel")) {
    model = model.bold.blue;
  } else if (!model.search("AMD")) {
    model = model.bold.red;
  } else {
    model = model.bold.yellow;
  }
  return "{0} ({1})".format(model, cores);
}

function get_mem() {
  let freemem = Number.parseFloat(os.freemem() / 1024 ** 2).toFixed(0);
  let totalmem =
    Number.parseFloat(os.totalmem() / 1024 ** 3)
      .toFixed(0)
      .toString() + " GB";

  // If Free Memory is higher than 1024 MB, converto to GB with 1 decimal point
  if (freemem >= 1024) {
    freemem =
      Number.parseFloat(freemem / 1024)
        .toFixed(1)
        .toString() + " GB";
  } else {
    freemem = freemem.toString() + " MB";
  }
  return "{0} / {1} ".format(freemem, totalmem);
}

function get_gpu() {
  const model = sys.graphics(function(data, err) {
    if (err) {
      console.log(err);
    }
    if (data) {
      let gpu = data["controllers"][0]["model"];
      console.log(parsed);
    }
  });
  return model;
}
// Main Program

// table.push(
//   { Hostname: os.hostname() },
//   { CPU: get_cpu() },
//   { GPU: "" },
//   { Memory: get_mem() }
// );

// // Print the table
// console.log(table.toString());

get_gpu();
