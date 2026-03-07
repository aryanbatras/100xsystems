---
title: "Missing Coin Sum"
cses: "https://cses.fi/problemset/task/2183"
difficulty: "Easy"
tags: ["implementation", "sorting", "greedy"]
---

## Problem

You have n coins with certain values. You want to know the smallest sum of money that cannot be made using a subset of the coins.

## Example

**Input:** 5  
1 1 3 7 10  
**Output:** 2  

**Input:** 3  
1 2 4  
**Output:** 8  

**Input:** 1  
1  
**Output:** 2

## Solution Approach

### Method 1: Greedy
1. x.sort()
2. current = 1
3. for coin in x:
   - if coin > current:
     - break
   - current += coin
4. print(current)

## Time Complexity

O(n log n) - Sorting.

## Space Complexity

O(1) - In-place.

## Edge Cases

- **Starts with 1**: 1 + sum + 1
- **Missing 1**: 1
- **All large**: 1
- **Consecutive**: Sum + 1

## Applications

- **Subsets**: Possible sums
- **Greedy**: Build up
- **Sorting**: Order

## Practice Tips

- Sort coins
- Track reachable sum
- Break when gap
- Output next
