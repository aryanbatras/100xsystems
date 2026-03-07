---
title: "Increasing Subsequence"
cses: "https://cses.fi/problemset/task/1145"
difficulty: "Medium"
tags: ["implementation", "dynamic-programming", "binary-search"]
---

## Problem

Find the length of the longest increasing subsequence.

## Example

**Input:** 8  
7 3 5 3 6 2 9 8  
**Output:** 4 (3,5,6,9)  

**Input:** 1  
1  
**Output:** 1  

**Input:** 5  
5 4 3 2 1  
**Output:** 1

## Solution Approach

### Method 1: DP
1. dp = [1] * n
2. for i in range(1, n):
   - for j in range(i):
     - if a[i] > a[j]:
       - dp[i] = max(dp[i], dp[j] + 1)
3. print(max(dp))

### Method 2: Patience Sorting
1. piles = []
2. for num in a:
   - left, right = 0, len(piles) - 1
   - while left <= right:
     - mid = (left + right) // 2
     - if piles[mid] < num:
       - left = mid + 1
     - else:
       - right = mid - 1
   - if left == len(piles):
     - piles.append(num)
   - else:
     - piles[left] = num
3. print(len(piles))

## Time Complexity

O(n log n) for binary search, O(n^2) for DP.

## Space Complexity

O(n) - DP or piles.

## Edge Cases

- **Increasing**: n
- **Decreasing**: 1
- **Single**: 1
- **Duplicates**: Not strictly

## Applications

- **Sequences**: LIS
- **DP**: Length
- **Binary Search**: Optimization

## Practice Tips

- DP for O(n^2)
- Binary search for O(n log n)
- Maintain piles
- Length of piles
