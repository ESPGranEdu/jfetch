// Import functions from functions.js

const fetch = require("./functions"),
  cmd = require("commander");

console.log(`${"Hostname".bold}:\t${fetch.get_hostname()}`);
console.log(`${"OS".bold}:\t\t${fetch.get_os()}`);
console.log(`${"Release".bold}:\t${fetch.get_release()}`);
console.log(`${"Shell".bold}:\t\t${fetch.get_shell()}`);
console.log(`${"CPU".bold}:\t\t${fetch.get_cpu()}`);
console.log(`${"GPU".bold}:\t\t${fetch.get_gpu()}`);
console.log(`${"Memory".bold}:\t\t${fetch.get_mem()}`);
console.log(`${"IP".bold}:\t\t${fetch.get_ipAddress()}`);
