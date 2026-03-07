---
title: "Weird Algorithm"
cses: "https://cses.fi/problemset/task/1068"
difficulty: "Easy"
tags: ["implementation"]
---

## Problem

Consider an algorithm that takes as input a positive integer n. If n is even, the algorithm divides it by two, and if n is odd, the algorithm multiplies it by three and adds one. The algorithm repeats this, until n becomes one. For example, the sequence for n=3 is 3, 10, 5, 16, 8, 4, 2, 1. Print the sequence.

## Example

**Input:** 3  
**Output:** 3 10 5 16 8 4 2 1  

**Input:** 1  
**Output:** 1  

**Input:** 2  
**Output:** 2 1

## Solution Approach

### Method 1: Simulation
1. while n != 1:
   - print n
   - if n % 2 == 0:
     - n = n // 2
   - else:
     - n = 3 * n + 1
2. print 1

## Time Complexity

O(log n) - Sequence length.

## Space Complexity

O(1) - Constant.

## Edge Cases

- **n = 1**: 1
- **Even n**: Halve
- **Odd n**: 3n+1

## Applications

- **Simulation**: Algorithm behavior
- **Sequences**: Collatz conjecture
- **Implementation**: Basic loop

## Practice Tips

- Handle large n carefully
- Print sequence
- Stop at 1
