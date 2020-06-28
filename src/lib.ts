// Personal libraries to perform various actions
export function removeChars(string: string, charsArray: string[]): string {
    let modString: string[] = string.split(""); // String to char array

    // Loop over the array removing the passed chars
    charsArray.forEach(c1 => {
        modString.forEach(c2 => {
            if (c1 == c2) {
                delete modString[modString.indexOf(c1)];
            }
        });
    });

    // Return string with removed chars
    return modString.join("");
}
