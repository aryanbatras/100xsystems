---
title: "Find Common Elements in 3 Sorted Arrays"
geeksforgeeks: "https://www.geeksforgeeks.org/find-common-elements-three-sorted-arrays/"
difficulty: "Easy"
tags: ["array", "three-pointers"]
---

## Problem

Given three arrays sorted in non-decreasing order, print all common elements present in all three arrays.

## Example

**Input:** ar1 = [1, 5, 10, 20, 40, 80], ar2 = [6, 7, 20, 80, 100], ar3 = [3, 4, 15, 20, 30, 70, 80, 120]  
**Output:** 20, 80  

**Input:** ar1 = [1, 2, 3], ar2 = [2, 3, 4], ar3 = [2, 3, 5]  
**Output:** 2, 3  

**Input:** ar1 = [1, 2], ar2 = [3, 4], ar3 = [5, 6]  
**Output:** (no common elements)

## Solution Approach

### Method 1: Three Pointers
1. Initialize i=0, j=0, k=0
2. While i < len(ar1) and j < len(ar2) and k < len(ar3):
   - If ar1[i] == ar2[j] == ar3[k], add to result, i++, j++, k++
   - Else if ar1[i] < ar2[j], i++
   - Else if ar2[j] < ar3[k], j++
   - Else k++

## Time Complexity

O(m + n + p) - Where m, n, p are lengths of arrays.

## Space Complexity

O(1) - Excluding output space.

## Edge Cases

- **No common elements**: Empty result
- **All elements common**: All elements in result
- **One array empty**: No common elements
- **Duplicates**: Handle carefully, but since sorted, may have duplicates

## Applications

- **Database Joins**: Multi-table intersections
- **Set Operations**: Common elements in multiple sets
- **Data Filtering**: Find overlapping data
- **Search Algorithms**: Multi-criteria matching

## Practice Tips

- Understand three-pointer technique
- Handle increments correctly
- Consider duplicates in input
- Practice with different array sizes
