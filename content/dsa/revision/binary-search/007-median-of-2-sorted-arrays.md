---
title: "Median of 2 sorted arrays"
leetcode: "https://leetcode.com/problems/median-of-two-sorted-arrays/"
difficulty: "Hard"
tags: ["array", "binary-search", "divide-and-conquer"]
---

## Problem

Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays. The overall run time complexity should be O(log (m+n)).

## Example

**Input:** nums1 = [1,3], nums2 = [2]  
**Output:** 2.0  

**Input:** nums1 = [1,2], nums2 = [3,4]  
**Output:** 2.5  

**Input:** nums1 = [0,0], nums2 = [0,0]  
**Output:** 0.0

## Solution Approach

### Method 1: Binary Search
1. if len(nums1) > len(nums2):
   - nums1, nums2 = nums2, nums1
2. m, n = len(nums1), len(nums2)
3. total = m + n
4. half = (total + 1) // 2
5. left = 0, right = m
6. while left <= right:
   - i = (left + right) // 2
   - j = half - i
   - nums1_left = nums1[i-1] if i > 0 else float('-inf')
   - nums1_right = nums1[i] if i < m else float('inf')
   - nums2_left = nums2[j-1] if j > 0 else float('-inf')
   - nums2_right = nums2[j] if j < n else float('inf')
   - if nums1_left <= nums2_right and nums2_left <= nums1_right:
     - if total % 2 == 1:
       - return max(nums1_left, nums2_left)
     - else:
       - return (max(nums1_left, nums2_left) + min(nums1_right, nums2_right)) / 2
   - elif nums1_left > nums2_right:
     - right = i - 1
   - else:
     - left = i + 1
7. return 0

## Time Complexity

O(log min(m,n)) - Binary search.

## Space Complexity

O(1) - Constant.

## Edge Cases

- **One empty**: Median of other
- **Odd total**: Middle
- **Even total**: Average
- **All equal**: Same

## Applications

- **Median Finding**: Two arrays
- **Binary Search**: Partition
- **Arrays**: Sorted
- **Interview Questions**: Hard

## Practice Tips

- Partition arrays
- Ensure left <= right
- Handle odd/even
- Use binary search on smaller
