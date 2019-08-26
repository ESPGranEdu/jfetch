"use strict";
//  Libraries

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
  let totalmem = Number.parseFloat(os.totalmem() / 1024 ** 3).toFixed(0);

  return "{0} MB / {1} GB".format(freemem, totalmem);
}

// Main Program

table.push(
  { Hostname: os.hostname() },
  { CPU: get_cpu() },
  { GPU: "una Nvidia muy tocha".bold.green },
  { Memory: get_mem() }
);

// Print the table
console.log(table.toString());
