---
title: "Move All Negative Elements to One Side of the Array"
geeksforgeeks: "https://www.geeksforgeeks.org/problems/move-all-negative-elements-to-end1813/1"
difficulty: "Easy"
tags: ["array", "two-pointers"]
---

## Problem

Given an array of integers, move all negative numbers to one side of the array (typically to the end) while maintaining the relative order of elements is not required.

## Example

**Input:** arr = [1, -1, 3, 2, -7, -5, 11, 6]  
**Output:** arr = [1, 3, 2, 11, 6, -1, -7, -5]  
**Explanation:** All positive numbers are moved to the beginning, negatives to the end.

**Input:** arr = [-1, -2, 3, 4, -5]  
**Output:** arr = [3, 4, -1, -2, -5]

**Input:** arr = [1, 2, 3]  
**Output:** arr = [1, 2, 3] (no negatives)

## Solution Approach

### Method 1: Two Pointers (Optimal)
1. Initialize i = 0, j = n-1
2. While i < j:
   - If arr[i] >= 0, i++
   - Else, swap arr[i] and arr[j], j--
3. All negatives are moved to the end

### Method 2: Partition (Similar)
1. Use two pointers from start and end
2. Move positives to left, negatives to right

## Time Complexity

O(n) - Single pass through the array.

## Space Complexity

O(1) - In-place rearrangement.

## Edge Cases

- **No negatives**: Array unchanged
- **All negatives**: Array unchanged
- **Single element**: Unchanged
- **Empty array**: No operation

## Applications

- **Data Segregation**: Separate positive and negative values
- **Preprocessing**: Prepare data for further operations
- **Array Manipulation**: Rearrange based on conditions
- **Sorting Variations**: Custom sorting requirements

## Practice Tips

- Understand two-pointer technique
- Handle edge cases
- Consider maintaining relative order if required (more complex)
- Practice with different array sizes
