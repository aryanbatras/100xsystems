---
title: "Quick Sort"
geeksforgeeks: "https://www.geeksforgeeks.org/quick-sort/"
difficulty: "Easy"
tags: ["array", "sorting", "divide-and-conquer"]
---

## Problem

Given an array of integers, sort the array in ascending order using the quick sort algorithm.

## Example

**Input:** arr = [10, 7, 8, 9, 1, 5]  
**Output:** [1,5,7,8,9,10]  

**Input:** arr = [4, 2, 8, 3, 1, 5]  
**Output:** [1,2,3,4,5,8]  

**Input:** arr = [1]  
**Output:** [1]

## Solution Approach

### Method 1: Standard Quick Sort
1. Choose a pivot element (e.g., last element)
2. Partition the array around the pivot using a partition function
3. Recursively sort the left part (elements < pivot)
4. Recursively sort the right part (elements > pivot)

### Partition Function
1. Set pivot = arr[high]
2. Initialize i = low - 1
3. For j from low to high-1:
   - If arr[j] < pivot:
     - i++
     - Swap arr[i] and arr[j]
4. Swap arr[i+1] and arr[high]
5. Return i+1 (pivot index)

## Time Complexity

O(n log n) average case, O(n^2) worst case.

## Space Complexity

O(log n) - For recursion stack.

## Edge Cases

- **Already sorted**: Worst case O(n^2)
- **Reverse sorted**: Worst case O(n^2)
- **All equal**: Correctly sorted
- **Single element**: Already sorted

## Applications

- **Fast Sorting**: Generally faster than merge sort
- **In-Place Sorting**: Uses O(1) extra space
- **Cache Friendly**: Good locality of reference
- **Parallelizable**: Can be parallelized

## Practice Tips

- Understand the partitioning step
- Choose good pivot (median of three)
- Handle worst case scenarios
- Compare with other sorting algorithms
