---
title: "Merge 2 Sorted Arrays"
difficulty: "Easy"
tags: ["array", "merge", "two-pointers"]
---

## Problem

Given two sorted arrays, merge them into one sorted array.

## Example

**Input:** arr1 = [1,3,5], arr2 = [2,4,6]  
**Output:** [1,2,3,4,5,6]  

**Input:** arr1 = [1,2,3], arr2 = [4]  
**Output:** [1,2,3,4]  

**Input:** arr1 = [], arr2 = [1,2]  
**Output:** [1,2]

## Solution Approach

### Method 1: Two Pointers
1. Create a result array of size m + n
2. Initialize i = 0, j = 0, k = 0
3. While i < m and j < n:
   - If arr1[i] <= arr2[j], result[k] = arr1[i], i++
   - Else, result[k] = arr2[j], j++
   - k++
4. Copy remaining elements from arr1 or arr2

### Method 2: In Place (if arr1 has space)
1. Assume arr1 has enough space at end
2. Start from end: i = m-1, j = n-1, k = m+n-1
3. While i >= 0 and j >= 0:
   - If arr1[i] > arr2[j], arr1[k] = arr1[i], i--
   - Else, arr1[k] = arr2[j], j--
   - k--
4. Copy remaining from arr2 if any

## Time Complexity

O(m + n) - Linear merge.

## Space Complexity

O(m + n) for new array, O(1) for in place.

## Edge Cases

- **One array empty**: Return the other
- **All elements in one**: Works
- **Duplicates**: Maintained
- **Different sizes**: Works

## Applications

- **Merge Sort**: Merge step
- **Data Merging**: Combine sorted data
- **Algorithms**: Fundamental operation
- **External Sorting**: Merge runs

## Practice Tips

- Use two pointers
- Handle remaining elements
- Test with different sizes
- Consider in place if possible
