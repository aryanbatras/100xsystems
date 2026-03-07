---
title: "Insertion Sort"
geeksforgeeks: "https://www.geeksforgeeks.org/insertion-sort/"
difficulty: "Easy"
tags: ["array", "sorting"]
---

## Problem

Given an array of integers, sort the array in ascending order using the insertion sort algorithm.

## Example

**Input:** arr = [12,11,13,5,6]  
**Output:** [5,6,11,12,13]  

**Input:** arr = [4,3,2,1]  
**Output:** [1,2,3,4]  

**Input:** arr = [1,2,3,4,5]  
**Output:** [1,2,3,4,5]

## Solution Approach

### Method 1: Standard Insertion Sort
1. Start from the second element (index 1)
2. For each element at index i:
   - Store the current element as key
   - Compare key with elements before it
   - Shift elements greater than key to the right
   - Insert key at the correct position
3. Repeat for all elements

## Time Complexity

O(n^2) worst case, O(n) best case (already sorted).

## Space Complexity

O(1) - In-place sorting.

## Edge Cases

- **Already sorted**: O(n) time
- **Reverse sorted**: O(n^2) time
- **Single element**: Already sorted
- **All equal**: O(n) time

## Applications

- **Small Arrays**: Efficient for small datasets
- **Adaptive Sorting**: Performs well on nearly sorted data
- **Stable Sorting**: Maintains relative order of equal elements
- **Online Algorithms**: Can sort as data arrives

## Practice Tips

- Visualize the insertion process
- Understand the shifting of elements
- Practice with different initial orders
- Compare with other sorting algorithms
