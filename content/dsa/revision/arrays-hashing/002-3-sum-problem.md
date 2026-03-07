---
title: "3-Sum Problem"
leetcode: "https://leetcode.com/problems/3sum/"
difficulty: "Medium"
tags: ["array", "two-pointers", "sorting"]
---

## Problem

Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.

## Example

**Input:** nums = [-1,0,1,2,-1,-4]  
**Output:** [[-1,-1,2],[-1,0,1]]  

**Input:** nums = []  
**Output:** []  

**Input:** nums = [0]  
**Output:** []

## Solution Approach

### Method 1: Sort and Two Pointers
1. nums.sort()
2. result = []
3. for i in range(len(nums) - 2):
   - if i > 0 and nums[i] == nums[i-1]: continue
   - left, right = i + 1, len(nums) - 1
   - while left < right:
     - total = nums[i] + nums[left] + nums[right]
     - if total == 0:
       - result.append([nums[i], nums[left], nums[right]])
       - while left < right and nums[left] == nums[left+1]: left += 1
       - while left < right and nums[right] == nums[right-1]: right -= 1
       - left += 1
       - right -= 1
     - elif total < 0:
       - left += 1
     - else:
       - right -= 1
4. return result

## Time Complexity

O(n^2) - Sorting + two pointers.

## Space Complexity

O(1) - Excluding result.

## Edge Cases

- **No triplets**: []
- **Duplicates**: Skip
- **All zeros**: [[0,0,0]]
- **Negative and positive**: Balance

## Applications

- **Array Problems**: Triplet sums
- **Two Pointers**: Converge
- **Sorting**: Remove duplicates
- **Interview Questions**: Classic

## Practice Tips

- Sort the array
- Fix one, two pointers for others
- Skip duplicates at each level
- Handle sums
