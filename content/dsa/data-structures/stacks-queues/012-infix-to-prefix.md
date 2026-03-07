---
title: "Infix to Prefix"
difficulty: "Medium"
tags: ["stack", "expression", "conversion"]
---

## Problem

Convert an infix expression to prefix expression.

Infix: A + B * C

Prefix: + A * B C

## Example

**Input:** infix = "a+b*c"  
**Output:** "+ a * b c"  

**Input:** infix = "(a+b)*c"  
**Output:** "* + a b c"  

**Input:** infix = "a*b+c"  
**Output:** "+ * a b c"

## Solution Approach

### Method 1: Reverse Infix to Postfix then Reverse
1. Reverse the infix string
2. Replace '(' with ')' and vice versa
3. Convert the modified string to postfix using stack
4. Reverse the postfix string

## Time Complexity

O(n) - Multiple passes.

## Space Complexity

O(n) - For strings and stack.

## Edge Cases

- **No parentheses**: Works
- **Nested parentheses**: Correct conversion
- **Single operator**: Simple
- **All operands**: No change

## Applications

- **Expression Evaluation**: Prefix for evaluation
- **Compiler Design**: Syntax trees
- **Calculator Programs**: Alternative notation
- **Algorithm Problems**: Conversion techniques

## Practice Tips

- Reverse the string carefully
- Swap parentheses
- Use postfix conversion logic
- Reverse the result
