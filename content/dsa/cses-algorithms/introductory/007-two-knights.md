---
title: "Two Knights"
cses: "https://cses.fi/problemset/task/1072"
difficulty: "Easy"
tags: ["implementation", "math", "combinatorics"]
---

## Problem

Your task is to count for k=1,2,…,n the number of ways two knights can be placed on a k×k chessboard so that they do not attack each other.

## Example

**Input:** 5  
**Output:** 0  
0  
28  
96  
252  

**Input:** 3  
**Output:** 0  
0  
28

## Solution Approach

### Method 1: Combinatorics
1. for k in 1 to n:
   - total = k * k * (k * k - 1) // 2
   - attacking = 4 * (k - 1) * (k - 2)
   - print(total - attacking)

## Time Complexity

O(n) - Loop.

## Space Complexity

O(1) - Constant.

## Edge Cases

- **k=1**: 0
- **k=2**: 0
- **k=3**: 28
- **Large k**: Formula

## Applications

- **Combinatorics**: Pairs
- **Chess**: Knight attacks
- **Math**: Subtractions

## Practice Tips

- Total pairs minus attacking
- Attacking pairs formula
- Handle small k
