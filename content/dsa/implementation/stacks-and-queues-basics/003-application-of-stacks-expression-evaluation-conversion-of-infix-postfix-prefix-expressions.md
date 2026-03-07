---
title: "Application of Stacks - Expression Evaluation, Conversion of Infix, Postfix, Prefix Expressions"
difficulty: "Theory"
tags: ["theory", "data-structures", "stacks", "expressions", "algorithms"]
---

## Application of Stacks in Expression Evaluation and Conversion

### Expression Evaluation and Conversion

Stacks are fundamental data structures used in parsing and evaluating mathematical expressions, particularly for converting between different notations and evaluating postfix expressions.

### Types of Expression Notations

#### Infix Notation
- **Format**: Operator between operands (e.g., `A + B`)
- **Human-readable**: Most natural for humans
- **Evaluation**: Requires precedence rules and parentheses
- **Examples**: `(2 + 3) * 4`, `A * (B + C) / D`

#### Postfix Notation (Reverse Polish Notation)
- **Format**: Operator after operands (e.g., `A B +`)
- **Computer-friendly**: No precedence rules needed
- **Evaluation**: Simple left-to-right processing
- **Examples**: `2 3 + 4 *`, `A B C + * D /`

#### Prefix Notation (Polish Notation)
- **Format**: Operator before operands (e.g., `+ A B`)
- **Computer-friendly**: Easy to parse recursively
- **Evaluation**: Right-to-left processing
- **Examples**: `* + 2 3 4`, `/ * A + B C D`

### Infix to Postfix Conversion

**Algorithm using Stack:**
1. Initialize empty stack and empty result string
2. Scan infix expression from left to right
3. For each token:
   - **Operand**: Add to result
   - **'('**: Push to stack
   - **')'**: Pop and add to result until '(' found, discard '('
   - **Operator**: Pop operators with higher/equal precedence, then push current
4. Pop remaining operators to result

**Example**: `(A + B) * C`
```
Input: ( A + B ) * C
Step 1: ( pushed
Step 2: A added to result
Step 3: + pushed
Step 4: B added to result
Step 5: ) found, pop + and add to result, pop (
Step 6: * pushed
Step 7: C added to result
Step 8: Pop * to result
Result: A B + C *
```

### Infix to Prefix Conversion

**Algorithm:**
1. Reverse the infix expression
2. Swap '(' and ')'
3. Convert to postfix using above algorithm
4. Reverse the result

**Example**: `A + B * C`
```
1. Reverse: C * B + A
2. Swap parens: (same)
3. To postfix: C B * A +
4. Reverse: + A * B C
```

### Postfix Expression Evaluation

**Algorithm using Stack:**
1. Initialize empty stack
2. Scan postfix expression from left to right
3. For each token:
   - **Operand**: Push to stack
   - **Operator**: Pop two operands, apply operator, push result
4. Final result is the only element in stack

**Example**: `2 3 + 4 *`
```
Step 1: Push 2
Step 2: Push 3
Step 3: Pop 3,2; 2+3=5; Push 5
Step 4: Push 4
Step 5: Pop 4,5; 5*4=20; Push 20
Result: 20
```

### Operator Precedence

**Precedence Order** (highest to lowest):
1. `^` (exponentiation, right-associative)
2. `*`, `/` (left-associative)
3. `+`, `-` (left-associative)

**Associativity Rules**:
- Left-associative: `a + b + c = (a + b) + c`
- Right-associative: `a ^ b ^ c = a ^ (b ^ c)`

### Handling Parentheses

- **Opening '(': Always push to stack
- **Closing ')': Pop until matching '(' found
- Parentheses override precedence rules

### Error Handling

- **Mismatched parentheses**: Check for empty stack when ')' encountered
- **Invalid expressions**: Stack should be empty at end (except final result)
- **Division by zero**: Handle in evaluation
- **Insufficient operands**: Check stack size before popping

### Applications

- **Compiler Design**: Expression parsing and evaluation
- **Calculator Programs**: Evaluating mathematical expressions
- **Programming Languages**: Syntax analysis
- **Database Queries**: SQL expression evaluation

## Practice Tips

- Master the conversion algorithms step by step
- Practice with complex expressions including parentheses
- Implement expression evaluators for all three notations
- Understand operator precedence and associativity rules
- Debug conversion and evaluation algorithms thoroughly
