---
title: "Bit++"
codeforces: "https://codeforces.com/problemset/problem/282/A"
difficulty: "Easy"
tags: ["implementation", "simulation"]
---

## Problem

Simulate Bit++ operations, count final value.

## Example

**Input:** 3  
++X  
X++  
--X  
**Output:** 1  

## Solution Approach

### Method 1: Simulation
Initialize x = 0

For each statement:

if '+' in statement:

x += 1

else:

x -= 1

print(x)

## Time Complexity

O(n) - Linear.

## Space Complexity

O(1).

## Edge Cases

- **All ++**: n
- **All --**: -n
- **Mixed**: Correct count

## Applications

- **Simulation**: Simple operations
- **Implementation**: Basic programming

## Practice Tips

- Read statements
- Count + and -
- Output result
