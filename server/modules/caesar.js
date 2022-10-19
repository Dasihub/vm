const caesarShift = (str, shift) => {
  // Make an output variable
  let output = "";

  // Go through each character
  for (let i = 0; i < str.length; i++) {
    // Get the character we'll be appending
    let c = str[i];
    // Get its code
    const code = str.charCodeAt(i);
    c = String.fromCharCode(code + shift);
    // Append
    output += c;
  }
  // All done!
  return output;
};

module.exports = caesarShift;
