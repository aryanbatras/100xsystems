---
title: "Increasing Array"
cses: "https://cses.fi/problemset/task/1094"
difficulty: "Easy"
tags: ["implementation", "greedy"]
---

## Problem

You are given an array of n integers. You want to make the array strictly increasing, that is, every element is larger than the previous one. On each move, you may increase the value of any element by one. What is the minimum number of moves required?

## Example

**Input:** 5  
3 2 5 1 7  
**Output:** 5  

**Input:** 3  
1 2 3  
**Output:** 0  

**Input:** 4  
1 3 2 4  
**Output:** 1

## Solution Approach

### Method 1: Greedy
1. moves = 0
2. for i in range(1, n):
   - if a[i] <= a[i-1]:
     - moves += a[i-1] - a[i] + 1
     - a[i] = a[i-1] + 1
3. return moves

## Time Complexity

O(n) - Linear.

## Space Complexity

O(1) - In-place.

## Edge Cases

- **Already increasing**: 0
- **Decreasing**: Sum differences
- **Equal**: Add 1

## Applications

- **Arrays**: Make increasing
- **Greedy**: Local decisions
- **Implementation**: Accumulate

## Practice Tips

- Iterate from left
- Ensure a[i] > a[i-1]
- Count additions
