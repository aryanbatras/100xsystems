---
title: "Recursion"
difficulty: "Theory"
tags: ["theory", "algorithms", "recursion", "programming"]
---

## Recursion

### What is Recursion?

Recursion is a programming technique where a function calls itself directly or indirectly to solve a problem. It breaks down complex problems into simpler, smaller subproblems of the same type.

### Key Components of Recursion

#### Base Case
- **Definition**: The condition that stops the recursive calls
- **Purpose**: Prevents infinite recursion
- **Importance**: Every recursive function must have at least one base case

#### Recursive Case
- **Definition**: The part where the function calls itself
- **Purpose**: Breaks down the problem into smaller subproblems
- **Pattern**: Progress towards the base case

### How Recursion Works

**Recursive Call Stack**:
```
Function calls build up on the call stack
Each call waits for its subcalls to complete
Results bubble up from base cases to the top
```

**Example**: Factorial calculation
```
factorial(5)
  = 5 * factorial(4)
  = 5 * (4 * factorial(3))
  = 5 * (4 * (3 * factorial(2)))
  = 5 * (4 * (3 * (2 * factorial(1))))
  = 5 * (4 * (3 * (2 * 1)))
  = 5 * (4 * (3 * 2))
  = 5 * (4 * 6)
  = 5 * 24
  = 120
```

### Types of Recursion

#### Direct Recursion
- Function calls itself directly
- `function f() { return f(); }`

#### Indirect Recursion
- Function calls another function which eventually calls the first
- `function f() { return g(); }`
- `function g() { return f(); }`

#### Linear Recursion
- Each call makes at most one recursive call
- Example: Factorial, Fibonacci

#### Tree Recursion
- Each call makes multiple recursive calls
- Example: Fibonacci, Tower of Hanoi

#### Tail Recursion
- Recursive call is the last operation
- Can be optimized by compilers
- Example: Tail-recursive factorial

### Recursion vs Iteration

**Recursion Advantages**:
- Cleaner, more readable code for certain problems
- Natural fit for tree/graph traversals
- Easier to implement divide-and-conquer algorithms

**Recursion Disadvantages**:
- Higher memory usage (call stack)
- Potential stack overflow for deep recursion
- Slower due to function call overhead

**Iteration Advantages**:
- Better performance
- Lower memory usage
- No stack overflow risk

**Iteration Disadvantages**:
- Sometimes more complex code
- Harder to implement for irregular structures

### Common Recursive Patterns

#### Divide and Conquer
- Break problem into smaller subproblems
- Solve subproblems recursively
- Combine solutions
- Example: Merge sort, Quick sort

#### Backtracking
- Try different possibilities
- Backtrack when solution not found
- Example: N-Queens, Sudoku solver

#### Dynamic Programming on Trees
- Compute values for subtrees
- Combine with parent computations
- Example: Tree diameter, maximum path sum

### Recursion in Data Structures

**Trees**:
- Traversal (preorder, inorder, postorder)
- Height calculation
- Node counting

**Graphs**:
- Depth-First Search (DFS)
- Connected components
- Topological sorting

**Arrays/Lists**:
- Binary search
- Quick sort
- Merge sort

### Handling Recursion

#### Stack Overflow Prevention
- Increase stack size if possible
- Convert to iterative solution
- Use memoization to reduce depth

#### Debugging Recursive Functions
- Add debug prints at function entry/exit
- Use debugger to step through calls
- Check base cases carefully
- Verify recursive case progress

#### Optimization Techniques
- **Memoization**: Cache results of expensive calls
- **Tail Recursion**: Optimize for compilers that support it
- **Iterative Conversion**: Transform to loop-based solutions

### Real-World Applications

- **File System Traversal**: Directory walking
- **Mathematical Computations**: Factorial, Fibonacci, series sums
- **Algorithm Design**: Sorting, searching, graph algorithms
- **Parsing**: Expression evaluation, syntax analysis
- **Game Theory**: Minimax algorithm, game tree search

## Practice Tips

- Start with simple recursive functions (factorial, fibonacci)
- Always identify base cases first
- Draw recursion trees to understand call patterns
- Practice converting recursive solutions to iterative ones
- Learn to recognize when recursion is appropriate
- Master debugging recursive functions
- Study space and time complexity of recursive algorithms
