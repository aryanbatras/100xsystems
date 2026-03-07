---
title: "Nim Game I"
cses: "https://cses.fi/problemset/task/1730"
difficulty: "Easy"
tags: ["implementation", "game-theory", "xor", "nim"]
---

## Problem

Determine winner in nim game.

## Example

**Input:** 3  
3 4 5  
1 1 1  
2 2 2  
**Output:** first  
second  
first  

## Solution Approach

### Method 1: XOR
xor_sum = 0

for pile in piles:

    xor_sum ^= pile

if xor_sum != 0:

    print("first")

else:

    print("second")

## Time Complexity

O(n) - XOR.

## Space Complexity

O(1).

## Edge Cases

- **All zero**: second

- **One pile**: first if >0

- **Multiple**: XOR

- **Large piles**: XOR

## Applications

- **Game Theory**: Nim

- **Mathematics**: XOR

- **Algorithms**: Bit operations

## Practice Tips

- XOR all piles

- Check non-zero

- Determine winner

- Handle input
