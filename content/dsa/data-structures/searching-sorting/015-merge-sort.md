---
title: "Merge Sort"
geeksforgeeks: "https://www.geeksforgeeks.org/merge-sort/"
difficulty: "Easy"
tags: ["array", "sorting", "divide-and-conquer"]
---

## Problem

Given an array of integers, sort the array in ascending order using the merge sort algorithm.

## Example

**Input:** arr = [12,11,13,5,6,7]  
**Output:** [5,6,7,11,12,13]  

**Input:** arr = [38,27,43,3,9,82,10]  
**Output:** [3,9,10,27,38,43,82]  

**Input:** arr = [1]  
**Output:** [1]

## Solution Approach

### Method 1: Recursive Merge Sort
1. If the array has 1 or 0 elements, it is already sorted
2. Find the middle point: mid = len(arr) // 2
3. Recursively sort the left half: merge_sort(arr[:mid])
4. Recursively sort the right half: merge_sort(arr[mid:])
5. Merge the two sorted halves using a merge function

### Merge Function
1. Create a temporary array to store the merged result
2. Initialize pointers i = 0, j = 0, k = 0 for left, right, and temp arrays
3. While i < len(left) and j < len(right):
   - If left[i] <= right[j], temp[k] = left[i], i++
   - Else, temp[k] = right[j], j++
   - k++
4. Copy any remaining elements from left or right
5. Copy the temp array back to the original array

## Time Complexity

O(n log n) - Divide and conquer approach.

## Space Complexity

O(n) - For the temporary array during merging.

## Edge Cases

- **Single element**: Already sorted
- **Empty array**: No operation
- **Already sorted**: Still O(n log n)
- **Reverse sorted**: Correctly sorted

## Applications

- **Stable Sorting**: Maintains relative order of equal elements
- **Large Datasets**: Efficient for large arrays
- **External Sorting**: Can be adapted for disk-based sorting
- **Linked Lists**: Can be implemented for linked lists

## Practice Tips

- Understand the divide and conquer strategy
- Implement the merge function carefully
- Practice with different array sizes
- Compare with other sorting algorithms
