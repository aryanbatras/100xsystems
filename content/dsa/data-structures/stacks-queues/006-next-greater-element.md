---
title: "Next Greater Element"
leetcode: "https://leetcode.com/problems/next-greater-element-i/"
difficulty: "Easy"
tags: ["stack", "array"]
---

## Problem

The next greater element of some element x in an array is the first greater element that is to the right of x in the same array.

If there is no such element, the answer is -1.

Given two distinct 0-indexed arrays nums1 and nums2, where nums1 is a subset of nums2, find the next greater element for each element in nums1.

## Example

**Input:** nums1 = [4,1,2], nums2 = [1,3,4,2]  
**Output:** [-1,3,-1]  

**Input:** nums1 = [2,4], nums2 = [1,2,3,4]  
**Output:** [3,-1]  

**Input:** nums1 = [1,3,5,2,4], nums2 = [6,5,4,3,2,1,7]  
**Output:** [7,7,7,7,7]

## Solution Approach

### Method 1: Stack + Map
1. Use a stack and a map to store next greater for nums2
2. Iterate nums2 from right to left
3. For each num:
   - While stack not empty and stack.top <= num, pop
   - If stack empty, map[num] = -1
   - Else, map[num] = stack.top
   - Push num to stack
4. For each num in nums1, get from map

## Time Complexity

O(m + n) - m for nums1, n for nums2.

## Space Complexity

O(n) - For stack and map.

## Edge Cases

- **No greater element**: -1
- **Last element**: -1
- **All increasing**: All -1
- **nums1 not subset**: Assume it is

## Applications

- **Stock Prices**: Next higher price
- **Temperature**: Next warmer day
- **Data Analysis**: Next greater in sequences
- **Algorithm Problems**: Common pattern

## Practice Tips

- Use monotonic stack
- Iterate from right
- Handle map for lookup
- Practice with different arrays
