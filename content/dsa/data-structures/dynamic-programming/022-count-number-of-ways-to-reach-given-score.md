---
title: "Count Number of Ways to Reach Given Score"
difficulty: "Medium"
tags: ["dynamic-programming", "array"]
---

## Problem

Given a list of scores and a target score, count the number of ways to reach the target score using the given scores. You can use each score multiple times.

## Example

**Input:** scores = [2,3,6], score = 7  
**Output:** 2 (2+2+3, 3+2+2)  

**Input:** scores = [1,2,3], score = 4  
**Output:** 7  

**Input:** scores = [1], score = 0  
**Output:** 1

## Solution Approach

### Method 1: DP
1. dp = [0] * (score + 1)
2. dp[0] = 1
3. for s in scores:
   - for j in s to score:
     - dp[j] += dp[j - s]
4. return dp[score]

## Time Complexity

O(score * len(scores)) - DP.

## Space Complexity

O(score) - DP array.

## Edge Cases

- **score = 0**: 1
- **No scores**: 0
- **Scores > score**: 0
- **Single score**: if divides, ways

## Applications

- **Scoring Systems**: Ways to score
- **Dynamic Programming**: Unbounded combinations
- **Combinatorics**: Count combinations
- **Interview Questions**: Common

## Practice Tips

- Initialize dp[0] = 1
- Update for each score
- Handle large score
- Test with small inputs
