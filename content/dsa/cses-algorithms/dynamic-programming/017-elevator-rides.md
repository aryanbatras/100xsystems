---
title: "Elevator Rides"
cses: "https://cses.fi/problemset/task/1653"
difficulty: "Medium"
tags: ["implementation", "dynamic-programming", "bitmask"]
---

## Problem

People with weights, elevator capacity x, min rides.

## Example

**Input:** 4 10  
4 8 6 1  
**Output:** 2  

**Input:** 1 10  
5  
**Output:** 1  

**Input:** 2 5  
4 3  
**Output:** 1

## Solution Approach

### Method 1: DP Bitmask
1. n = len(p)
2. dp = [float('inf')] * (1 << n)
3. dp[0] = 0
4. for mask in range(1 << n):
   - if dp[mask] == float('inf'):
     - continue
   - current_sum = 0
   - for i in range(n):
     - if mask & (1 << i):
       - current_sum += p[i]
   - for i in range(n):
     - if not (mask & (1 << i)) and current_sum + p[i] <= x:
       - new_mask = mask | (1 << i)
       - dp[new_mask] = min(dp[new_mask], dp[mask])
   - # Start new ride
   - dp[mask] = min(dp[mask], dp[mask] + 1)
5. print(dp[(1 << n) - 1])

## Time Complexity

O(2^n * n) - Bitmask DP.

## Space Complexity

O(2^n) - DP array.

## Edge Cases

- **All fit**: 1
- **Each alone**: n
- **n=1**: 1
- **Large weights**: More rides

## Applications

- **DP**: Subsets
- **Bitmask**: States
- **Grouping**: Capacity

## Practice Tips

- DP on subsets
- Track min rides
- Add to current or new
- Final mask
