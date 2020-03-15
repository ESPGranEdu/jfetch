"use strict";

//  Libraries
const command = require("child_process"),
  os = require("os"),
  color = require("colors"),
  ip = require("ip"),
  fs = require("fs"),
  lib = require("./lib");

// One liners
function get_hostname() { return os.hostname().bold; }
function get_shell() { return os.userInfo()["shell"].bold.yellow; }
function get_release() { return os.release().bold; }
function get_ipAddress() { return ip.address().bold; }

function get_cpu() {
  let model = os.cpus()[0]["model"];
  let cores = os.cpus().length;

  // Check if the processor it's from Intel or AMD
  if (model.includes("Intel")) {
    model = model.bold.blue;
  } else if (!model.includes("AMD")) {
    model = model.bold.red;
  } else {
    model = model.bold.yellow;
  }

  return `${model} (${cores})`;
}

function get_mem() {
  let useMem = parseFloat(
    (os.totalmem() - os.freemem()) / 1024 ** 2
  ).toFixed(0);

  let totalMem =
    parseFloat(os.totalmem() / 1024 ** 3)
      .toFixed(0)
      .toString() + " GB";

  // If useMem is higher tan 1024 MB, convert to GB with 1 decimal point
  if (useMem >= 1024) {
    useMem =
      parseFloat(useMem / 1024)
        .toFixed(1)
        .toString() + " GB";
  } else {
    useMem = useMem.toString() + " MB";
  }
  return `${useMem} / ${totalMem}`.bold;
}

function get_gpu() {
  const gpuinfo = command
    .execSync("lspci | grep VGA | cut -d: -f3 2>/dev/null")
    .toString()
    .trim() || "Unknown GPU".bold.rainbow;

  if (gpuinfo.includes("NVIDIA")) return gpuinfo.bold.green;
  if (gpuinfo.includes("AMD")) return gpuinfo.bold.red;
  if (gpuinfo.includes("Intel")) return gpuinfo.bold.blue;

  return gpuinfo.bold.yellow;
}

function get_os() {
  const osInfo = fs.readFileSync("/etc/os-release").toString();
  const reg_exp = /\s?NAME=.+\w"/;
  let osName = reg_exp.exec(osInfo)[0].trim().replace(/NAME=/, "");

  if (osName) return "Unknown OS".bold.rainbow
  else osName = lib.removeChars(osName, ["\"", " "]);

  // Color the name depending of the OS
  if (osName.includes("ArchLinux")) return osName.bold.cyan;
  if (osName.includes("Ubuntu")) return osName.bold.yellow;
  if (osName.includes("Fedora")) return osName.bold.blue;
  if (osName.includes("OpenSuse")) return osName.bold.green;
  if (osName.includes("Gentoo")) return osName.bold.magenta;
  if (osName.includes("Debian")) return osName.bold.red;
  if (osName.includes("BunsenLabs GNU/Linux")) return osName.bold.red;

  return osName.bold.yellow; // If no match, return yellow
}

// Export the functions
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
