---
title: "Maximum Length Chain of Pairs"
difficulty: "Medium"
tags: ["dynamic-programming", "greedy", "sorting"]
---

## Problem

Given a set of pairs, find the length of the longest chain which can be formed such that for every pair in the chain, the second element of the previous pair is smaller than the first element of the current pair.

## Example

**Input:** pairs = [[5,24],[39,60],[15,28],[27,40],[50,90]]  
**Output:** 3 ([15,28], [39,60], [50,90])  

**Input:** pairs = [[1,2],[3,4],[5,6]]  
**Output:** 3  

**Input:** pairs = [[1,2],[2,3],[3,4]]  
**Output:** 3

## Solution Approach

### Method 1: Greedy
1. Sort pairs by end time
2. Initialize count = 1, prev_end = pairs[0][1]
3. For each pair in sorted list:
   - if pair[0] > prev_end:
     - count++
     - prev_end = pair[1]
4. Return count

### Method 2: DP
1. Sort pairs by end time
2. dp[i] = max length ending at i
3. dp[0] = 1
4. for i in 1 to n-1:
   - dp[i] = 1
   - for j in 0 to i-1:
     - if pairs[j][1] < pairs[i][0]:
       - dp[i] = max(dp[i], dp[j] + 1)
5. Return max(dp)

## Time Complexity

O(n log n) for greedy, O(n^2) for DP.

## Space Complexity

O(1) for greedy, O(n) for DP.

## Edge Cases

- **No pairs**: 0
- **Single pair**: 1
- **All overlapping**: 1
- **All chainable**: n

## Applications

- **Interval Scheduling**: Chain intervals
- **Dynamic Programming**: Chain problems
- **Greedy Algorithms**: Sort by end
- **Interview Questions**: Common

## Practice Tips

- Sort by end time
- Greedy for optimal
- DP for all lengths
- Test with overlapping pairs
