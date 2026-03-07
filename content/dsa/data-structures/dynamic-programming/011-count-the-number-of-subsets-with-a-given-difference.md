---
title: "Count the Number of Subsets with a Given Difference"
difficulty: "Medium"
tags: ["dynamic-programming", "array"]
---

## Problem

Given an array and a difference d, count the number of subsets whose sum has a difference of d.

## Example

**Input:** arr = [1,1,2,3], d = 1  
**Output:** 4 (subsets: {1,2,3}-{1}=4, {1,3}-{1,2}=0, etc.)  

**Input:** arr = [1,2,3,4,5], d = 0  
**Output:** Count subsets with sum equal to total/2  

**Input:** arr = [1,2], d = 3  
**Output:** 0

## Solution Approach

### Method 1: DP
1. total = sum(arr)
2. if (total + d) % 2 != 0: return 0
3. target = (total + d) // 2
4. Use subset sum count DP to count subsets with sum target
5. dp = [0] * (target + 1)
6. dp[0] = 1
7. for num in arr:
   - for j in target downto num:
     - dp[j] += dp[j - num]
8. return dp[target]

## Time Complexity

O(n * sum) - DP.

## Space Complexity

O(sum) - DP array.

## Edge Cases

- **d > total**: 0
- **total + d odd**: 0
- **d = 0**: equal sum partitions
- **Empty array**: 0

## Applications

- **Subset Problems**: Difference counts
- **Dynamic Programming**: Count subsets
- **Combinatorics**: Sum differences
- **Interview Questions**: Variant

## Practice Tips

- Reduce to subset sum count
- Handle negative d
- Use 1D DP
- Test with small arrays
