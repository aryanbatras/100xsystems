---
title: "Next Greater Element"
leetcode: "https://leetcode.com/problems/next-greater-element-i/"
difficulty: "Easy"
tags: ["array", "stack", "monotonic-stack"]
---

## Problem

The next greater element of some element x in an array is the first greater element that is to the right of x in the same array. If there is no such element, return -1.

## Example

**Input:** nums1 = [4,1,2], nums2 = [1,3,4,2]  
**Output:** [-1,3,-1]  

**Input:** nums1 = [2,4], nums2 = [1,2,3,4]  
**Output:** [3,-1]  

**Input:** nums1 = [1,3,5,2,4], nums2 = [6,5,4,3,2,1,7]  
**Output:** [7,7,7,7,7]

## Solution Approach

### Method 1: Monotonic Stack
1. map = {}
2. stack = []
3. for num in nums2[::-1]:
   - while stack and stack[-1] <= num:
     - stack.pop()
   - map[num] = stack[-1] if stack else -1
   - stack.append(num)
4. result = [map[num] for num in nums1]
5. return result

## Time Complexity

O(n) - Linear.

## Space Complexity

O(n) - Stack and map.

## Edge Cases

- **No greater element**: -1
- **All increasing**: Last -1
- **Duplicates**: Handle correctly
- **nums1 subset**: Map from nums2

## Applications

- **Stack Problems**: Next greater
- **Monotonic Stack**: Decreasing
- **Arrays**: Element relations
- **Interview Questions**: Easy

## Practice Tips

- Traverse from right
- Maintain decreasing stack
- Pop smaller elements
- Use map for lookup
