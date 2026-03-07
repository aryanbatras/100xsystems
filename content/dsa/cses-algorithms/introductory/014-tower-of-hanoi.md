---
title: "Tower of Hanoi"
cses: "https://cses.fi/problemset/task/2165"
difficulty: "Easy"
tags: ["implementation", "recursion"]
---

## Problem

The Tower of Hanoi game consists of three rods and n disks of different sizes which can slide onto any rod. The puzzle starts with the disks in a neat stack in ascending order of size on one rod, the smallest at the top. The objective of the puzzle is to move the entire stack to another rod, obeying the following simple rules: Only one disk can be moved at a time. Each move consists of taking the upper disk from one of the stacks and placing it on top of another stack or on an empty rod. No larger disk may be placed on top of a smaller disk.

## Example

**Input:** 2  
**Output:** 3  
1 2  
1 3  
2 3  

**Input:** 1  
**Output:** 1  
1 3

## Solution Approach

### Method 1: Recursion
1. def hanoi(n, src, dst, aux):
   - if n == 1:
     - print(src, dst)
     - return
   - hanoi(n-1, src, aux, dst)
   - print(src, dst)
   - hanoi(n-1, aux, dst, src)
2. print(2**n - 1)
3. hanoi(n, 1, 3, 2)

## Time Complexity

O(3^n) - Exponential.

## Space Complexity

O(n) - Recursion stack.

## Edge Cases

- **n=1**: 1 move
- **n=2**: 3 moves
- **Large n**: Many moves

## Applications

- **Recursion**: Classic problem
- **Divide and Conquer**: Subproblems
- **Implementation**: Moves

## Practice Tips

- Base case n=1
- Move n-1 to aux
- Move nth to dst
- Move n-1 to dst
