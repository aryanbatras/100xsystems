---
title: "Sort an Array of 0s, 1s and 2s"
leetcode: "https://leetcode.com/problems/sort-colors/"
difficulty: "Medium"
tags: ["array", "sorting", "two-pointers"]
---

## Problem

Given an array nums with n objects colored red, white, or blue, sort them in-place so that objects of the same color are adjacent, with the colors in the order red, white, blue. We will use the integers 0, 1, and 2 to represent the color red, white, and blue respectively.

## Example

**Input:** nums = [2,0,2,1,1,0]  
**Output:** [0,0,1,1,2,2]  
**Explanation:** Sort the array such that 0s come first, then 1s, then 2s.

**Input:** nums = [2,0,1]  
**Output:** [0,1,2]

**Input:** nums = [0]  
**Output:** [0]

## Solution Approach

### Method 1: Counting Sort
1. Count the number of 0s, 1s, and 2s in the array
2. Overwrite the array: first place all 0s, then 1s, then 2s based on counts

### Method 2: Dutch National Flag Algorithm (Optimal)
1. Initialize three pointers: low = 0, mid = 0, high = n-1
2. While mid <= high:
   - If nums[mid] == 0, swap nums[low] and nums[mid], low++, mid++
   - If nums[mid] == 1, mid++
   - If nums[mid] == 2, swap nums[mid] and nums[high], high--

## Time Complexity

O(n) - Single pass through the array.

## Space Complexity

O(1) - In-place sorting.

## Edge Cases

- **All 0s**: Array remains unchanged
- **All 1s**: Array remains unchanged
- **All 2s**: Array remains unchanged
- **Single element**: Already sorted
- **Empty array**: No operation needed

## Applications

- **Color Sorting**: Sort objects by multiple categories
- **Partitioning Problems**: Divide array into three parts
- **Data Classification**: Sort data into discrete categories
- **Image Processing**: Pixel sorting by color values

## Practice Tips

- Understand the three-pointer technique
- Practice both counting and in-place methods
- Handle edge cases with care
- Visualize the pointer movements
