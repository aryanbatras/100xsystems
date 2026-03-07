---
title: "Infix to Postfix"
difficulty: "Medium"
tags: ["stack", "expression", "conversion"]
---

## Problem

Convert an infix expression to postfix expression.

Infix: A + B * C

Postfix: A B C * +

## Example

**Input:** infix = "a+b*c"  
**Output:** "a b c * +"  

**Input:** infix = "(a+b)*c"  
**Output:** "a b + c *"  

**Input:** infix = "a*b+c"  
**Output:** "a b * c +"

## Solution Approach

### Method 1: Stack
1. Initialize stack for operators, output string
2. For each character in infix:
   - If operand, add to output
   - If '(', push to stack
   - If ')', pop until '(', add to output
   - If operator, while stack not empty and precedence(stack.top) >= precedence(char), pop to output
   - Push char to stack
3. Pop remaining operators to output

Precedence: ^ > * / > + -

## Time Complexity

O(n) - Single pass.

## Space Complexity

O(n) - For stack and output.

## Edge Cases

- **No parentheses**: Simple precedence
- **Nested parentheses**: Correct order
- **Single operator**: Works
- **All operands**: No operators

## Applications

- **Expression Evaluation**: Postfix for easier evaluation
- **Compiler Design**: Syntax analysis
- **Calculator Programs**: Convert expressions
- **Algorithm Problems**: Expression conversion

## Practice Tips

- Understand precedence rules
- Handle parentheses
- Manage associativity
- Test with complex expressions
