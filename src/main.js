// Set the Strict mode
"use strict";

//  Libraries

const sys = require("systeminformation");
const os = require("os");
const color = require("colors");
const Table = require("cli-table");
const cli = require("commander");
const command = require("child_process");
const table = new Table();

// Implementation of format for JavaScript

String.prototype.format = function() {
  let a = this;
  for (let k in arguments) {
    a = a.replace("{" + k + "}", arguments[k]);
  }
  return a;
};

// Fetcher Functions

function get_cpu() {
  let model = os.cpus()[0]["model"];
  let cores = os.cpus().length;

  //? Check if the processor it's from Intel or AMD

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
  let useMem = Number.parseFloat(
    (os.totalmem() - os.freemem()) / 1024 ** 2
  ).toFixed(0);

  let totalMem =
    Number.parseFloat(os.totalmem() / 1024 ** 3)
      .toFixed(0)
      .toString() + " GB";

  // If useMem is higher tan 1024 MB, converto to GB with 1 decimal point
  if (useMem >= 1024) {
    useMem =
      Number.parseFloat(useMem / 1024)
        .toFixed(1)
        .toString() + " GB";
  } else {
    useMem = useMem.toString() + " MB";
  }

  return "{0} / {1}".format(useMem, totalMem);
}

//TODO Solve Promise issue with this function
function get_gpu() {
  const info = command
    .execSync('lspci | grep VGA | cut -d ":" -f3 | cut -d "(" -f1')
    .toString()
    .trim();

  if (!info.search("NVIDIA")) return info.bold.green;
  if (!info.search("AMD")) return info.bold.red;
  if (!info.search("Intel")) return info.bold.blue;

  return info.bold.orange;
}

// * Main Program

table.push(
  { Hostname: os.hostname() },
  { CPU: get_cpu() },
  { GPU: get_gpu() },
  { Memory: get_mem() }
);

console.log(table.toString()); // Print the table
