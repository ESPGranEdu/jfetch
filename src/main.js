// Import functions from functions.js

const fetch = require("./functions");

// Library for the table output
const Table = require("cli-table");
const table = new Table();

// * Main Program

table.push(
  { Hostname: fetch.get_hostname() },
  // { OS: fetch.get_os() },
  { Release: fetch.get_release() },
  // { Shell: fetch.get_shell() },
  { CPU: fetch.get_cpu() },
  // { GPU: fetch.get_gpu() },
  { Memory: fetch.get_mem() },
  { IP: fetch.get_ipAddress() }
);

console.log(table.toString()); // Print the table
