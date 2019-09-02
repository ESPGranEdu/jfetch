"use strict";
//  Libraries

const command = require("child_process"),
  os = require("os"),
  cli = require("commander"),
  color = require("colors"),
  ip = require("ip");

// Fetcher Functions
function get_hostname() {
  return os.hostname().bold;
}
function get_shell() {
  return os.userInfo()["shell"].bold.yellow;
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
  return `${useMem} / ${totalMem}`.bold;
}

function get_gpu() {
  const gpuinfo = command
    .execSync('lspci | grep VGA | cut -d ":" -f3 | cut -d "(" -f1')
    .toString()
    .trim();

  if (!gpuinfo.search("NVIDIA")) return gpuinfo.bold.green;
  if (!gpuinfo.search("AMD")) return gpuinfo.bold.red;
  if (!gpuinfo.search("Intel")) return gpuinfo.bold.blue;

  return gpuinfo.bold.orange;
}

function get_release() {
  return os.release().bold;
}

function get_ipAddress() {
  return ip.address().bold;
}

function get_os() {
  const osName = command
    .execSync("cat /etc/os-release | grep ^NAME | cut -d '\"' -f2")
    .toString()
    .trim();

  // Color the name depending of the OS Name
  if (osName == "Arch Linux") return osName.bold.cyan;
  if (osName == "Ubuntu") return osName.bold.orange;
  if (osName == "Fedora") return osName.bold.blue;
  if (osName == "OpenSuse") return osName.bold.green;
  if (osName == "Gentoo") return osName.bold.magenta;
  if (osName == "Debian") return osName.bold.red;

  return osName.bold.orange;
}

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
