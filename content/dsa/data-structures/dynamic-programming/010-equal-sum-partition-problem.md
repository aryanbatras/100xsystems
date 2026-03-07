---
title: "Equal Sum Partition Problem"
difficulty: "Medium"
tags: ["dynamic-programming", "array"]
---

## Problem

Partition a set into two subsets such that the sum of elements in both subsets is same.

## Example

**Input:** arr = [1,5,11,5]  
**Output:** true (1+5+5=11, 11)  

**Input:** arr = [1,5,3]  
**Output:** false  

**Input:** arr = [1,2,3,4]  
**Output:** true (1+4=2+3)

## Solution Approach

### Method 1: Check Sum and Subset Sum
1. total = sum(arr)
2. if total % 2 != 0: return false
3. target = total // 2
4. Use subset sum DP to check if subset with sum target exists

## Time Complexity

O(n * sum) - Subset sum.

## Space Complexity

O(sum) - DP array.

## Edge Cases

- **Odd sum**: false
- **Empty array**: true
- **Single element**: false
- **All zeros**: true

## Applications

- **Partition Problems**: Equal sum subsets
- **Dynamic Programming**: Subset sums
- **Optimization**: Balanced partitions
- **Interview Questions**: Common

## Practice Tips

- Check sum parity
- Use subset sum DP
- Handle zeros
- Test with small arrays
