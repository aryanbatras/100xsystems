---
title: "Projects"
cses: "https://cses.fi/problemset/task/1140"
difficulty: "Medium"
tags: ["implementation", "dynamic-programming", "sorting"]
---

## Problem

Select non-overlapping projects to maximize reward.

## Example

**Input:** 4  
2 4 4  
3 6 6  
6 8 2  
5 7 3  
**Output:** 7 (4+3)  

**Input:** 1  
1 2 1  
**Output:** 1  

**Input:** 2  
1 2 1  
2 3 1  
**Output:** 1

## Solution Approach

### Method 1: Sort and DP
1. projects.sort(key=lambda x: x[1])
2. dp = [0] * n
3. dp[0] = projects[0][2]
4. for i in range(1, n):
   - # Find last non-overlapping
   - left, right = 0, i - 1
   - while left <= right:
     - mid = (left + right) // 2
     - if projects[mid][1] <= projects[i][0]:
       - left = mid + 1
     - else:
       - right = mid - 1
   - prev = dp[right] if right >= 0 else 0
   - dp[i] = max(dp[i-1], prev + projects[i][2])
5. print(dp[-1])

## Time Complexity

O(n log n) - Sorting and binary search.

## Space Complexity

O(n) - DP array.

## Edge Cases

- **No overlap**: Sum all
- **All overlap**: Max single
- **Single**: Reward
- **Sorted**: Ok

## Applications

- **Intervals**: Selection
- **DP**: Max reward
- **Greedy**: Sort by end

## Practice Tips

- Sort by end time
- Binary search for previous
- DP for max reward
- Handle overlaps
