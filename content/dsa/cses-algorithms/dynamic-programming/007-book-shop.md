---
title: "Book Shop"
cses: "https://cses.fi/problemset/task/1158"
difficulty: "Easy"
tags: ["implementation", "dynamic-programming", "knapsack"]
---

## Problem

Maximize pages with budget x, books have price and pages.

## Example

**Input:** 4 10  
4 8 5 3  
5 12 8 1  
**Output:** 13  

**Input:** 1 10  
10  
10  
**Output:** 10  

**Input:** 2 5  
4 2  
5 3  
**Output:** 3

## Solution Approach

### Method 1: DP
1. dp = [0] * (x + 1)
2. for price, pages in zip(prices, pages):
   - for j in range(x, price - 1, -1):
     - dp[j] = max(dp[j], dp[j - price] + pages)
3. print(max(dp))

## Time Complexity

O(n * x) - DP.

## Space Complexity

O(x) - DP array.

## Edge Cases

- **x=0**: 0
- **No books**: 0
- **All affordable**: Sum pages
- **Price > x**: Skip

## Applications

- **DP**: Knapsack
- **Optimization**: Max pages
- **Budget**: Constraints

## Practice Tips

- DP for each book
- Backward update
- Max pages for budget
- Handle multiple
