"use strict";

//  Libraries
import command from "child_process";
import os from "os";
import ip from "ip";
import fs from "fs";
import color from "colors";
import * as lib from "./lib";

// One liners
export function get_hostname(): string {
    return color.bold(os.hostname());
}
export function get_shell(): string {
    return color.yellow.bold(os.userInfo()["shell"]);
}
export function get_release(): string {
    return color.bold(os.release());
}
export function get_ipAddress(): string {
    return color.bold(ip.address());
}

export function get_cpu(): string {
    let model: string = os.cpus()[0]["model"];
    let cores: number = os.cpus().length;

    // Check if the processor it's from Intel or AMD
    if (model.includes("Intel")) {
        model = color.blue.bold(model);
    } else if (model.includes("AMD")) {
        model = color.blue.bold(model);
    } else {
        model = color.yellow.bold(model);
    }

    return `${model} (${cores})`;
}

export function get_mem(): string {
    let useMem: number = Math.round((os.totalmem() - os.freemem()) / 1024 ** 2);
    let totalMem: number = Math.round(os.totalmem() / 1024 ** 3);

    // If greater than 1024 MB, converto to GB
    useMem = useMem > 1024 ? useMem / 1024 : useMem;

    return color.bold(`${useMem.toFixed(2)} GB / ${totalMem} GB`);
}

export function get_gpu(): string {
    const gpuinfo: string =
        command
            .execSync("lspci | grep VGA | cut -d: -f3 2>/dev/null")
            .toString()
            .trim() || color.rainbow.bold("Unknown GPU");

    if (gpuinfo.includes("NVIDIA")) {
        return color.green.bold(gpuinfo);
    } else if (gpuinfo.includes("AMD")) {
        return color.red.bold(gpuinfo);
    } else {
        return color.yellow.bold(gpuinfo);
    }
}

export function get_os(): string {
    const osInfo: string = fs.readFileSync("/etc/os-release").toString();
    const reg_exp: RegExp = /\s?NAME=.+\w"/;
    let osName: string = reg_exp.exec(osInfo)![0].trim().replace(/NAME=/, "");

    if (!osName) return color.rainbow.bold("Unknown OS");

    osName = lib.removeChars(osName, ['"', " "]);

    // Color the name depending of the OS
    switch (osName) {
        case "ArchLinux":
            return color.cyan.bold(osName);
        case "Ubuntu":
            return color.yellow.bold(osName);
        case "Fedora":
            return color.blue.bold(osName);
        case "openSUSE":
            return color.green.bold(osName);
        case "Gentoo":
            return color.magenta.bold(osName);
        case "Debian":
            return color.red.bold(osName);
        default:
            return color.rainbow.bold(osName);
    }
}
