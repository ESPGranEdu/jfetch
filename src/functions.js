"use strict";
//  Libraries

const command = require("child_process"),
  os = require("os"),
  getos = require("getos"),
  cli = require("commander"),
  color = require("colors");

// Fetcher Functions
function get_hostname() {
  return os.hostname().bold;
}
function get_shell() {
  let shell = new String(os.userInfo()["shell"]);
  return shell;
}
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

  return `${model} (${cores})`;
}
//TODO Recalculate Used Memory to display properly

function get_mem() {
  let useMem = Number.parseFloat(
    (os.totalmem() - os.freemem()) / 1024 ** 2
  ).toFixed(0);

  let totalMem =
    Number.parseFloat(os.totalmem() / 1024 ** 3)
      .toFixed(0)
      .toString() + " GB";

  // If useMem is higher tan 1024 MB, convert to GB with 1 decimal point
  if (useMem >= 1024) {
    useMem =
      Number.parseFloat(useMem / 1024)
        .toFixed(1)
        .toString() + " GB";
  } else {
    useMem = useMem.toString() + " MB";
  }
  return `${useMem} / ${totalMem}`;
}

function get_gpu() {
  const info = command
    .execSync('lspci | grep VGA | cut -d ":" -f3 | cut -d "(" -f1')
    .toString()
    .trim();

  if (!info.search("NVIDIA")) return `${info.bold.green}`;
  if (!info.search("AMD")) return `${info.bold.red}`;
  if (!info.search("Intel")) return `${info.bold.blue}`;

  return `${info.bold.orange}`;
}

function get_release() {
  return os.release();
}

function get_ipAddress() {
  const netinfo = os.networkInterfaces();
  if (netinfo["enp3s0"]) {
    return `${netinfo["enp3s0"][0]["address"]}`;
  } else if (netinfo["eth0"]) {
    return `${netinfo["eth0"][0]["address"]}`;
  }
}
//TODO Fix this function to get the OS name
function get_os() {}

// Export the functions to be avaliable for main.js

module.exports = {
  get_cpu,
  get_gpu,
  get_hostname,
  get_mem,
  get_release,
  get_ipAddress,
  get_os,
  get_shell
};
