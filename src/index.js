module.exports = function check(str, bracketsConfig) {
  const stack = [];

  for (let i = 0; i < str.length; i++) {
    const char = str[i];

    // Find the bracket configuration that matches the current character
    const bracketConfig = bracketsConfig.find(
      ([open, close]) => open === char || close === char
    );

    if (bracketConfig) {
      const [open, close] = bracketConfig;

      // If the current character is an opening bracket, push it onto the stack
      if (char === open) {
        // Special case: opening and closing bracket can be the same
        if (open === close && stack[stack.length - 1] === open) {
          stack.pop();
        } else {
          stack.push(char);
        }
      }

      // If the current character is a closing bracket, pop the top element from the stack
      else {
        const lastBracket = stack.pop();

        // Check that the top element of the stack matches the current closing bracket
        if (lastBracket !== open) {
          return false;
        }
      }
    }
  }

  // If the stack is empty, the brackets are balanced
  return stack.length === 0;
};
