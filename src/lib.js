// Personal libraries to perform various actions
function removeChars(string, charsArray) {
    let modString = string.split(""); // String to char array

    // Loop over the array removing the passed chars
    charsArray.forEach(c1 => {
        modString.forEach(c2 => {
            if (c1 == c2) {
                delete modString[modString.indexOf(c1)];
            }
        });
    });

    // for (c1 of charsArray) {
    //     for (c2 of modString) {
    //         if (c1 == c2) {
    //             delete modString[modString.indexOf(c1)];
    //         }
    //     }
    // }

    // Return string with removed chars
    return modString.join("");
}

// Export function
module.exports = {
    removeChars
};