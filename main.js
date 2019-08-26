//  Libraries
const os = require("os");
const color = require("colors");

//Implementation of format for JavaScript
String.prototype.format = function() {
  a = this;
  for (k in arguments) {
    a = a.replace("{" + k + "}", arguments[k]);
  }
  return a;
};

// Fetcher functions
function get_cpu() {
  let model = os.cpus()[0]["model"];
  let cores = os.cpus().length;
  return "{0} ({1})".format(model, cores);
}

// Main Program

const display = function() {
  console.log("/t"+os.hostname());
  console.log("CPU: {0}".format(get_cpu).bold.blue);
  console.log("GPU: {0}".format("Una mierda de NVIDIA").bold.green);
};

display();
