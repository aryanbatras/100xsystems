---
title: "Find a Fixed Point (Value Equal to Index) in a Sorted Array"
geeksforgeeks: "https://www.geeksforgeeks.org/find-a-fixed-point-in-a-given-array/"
difficulty: "Easy"
tags: ["array", "binary-search"]
---

## Problem

Given an array of n distinct integers sorted in ascending order, find a Fixed Point in the array. A Fixed Point is an index i such that arr[i] is equal to i. If no such index exists, return -1.

## Example

**Input:** arr = [-10, -5, 0, 3, 7]  
**Output:** 3 (arr[3] = 3)  

**Input:** arr = [0, 2, 5, 8, 17]  
**Output:** 0 (arr[0] = 0)  

**Input:** arr = [-10, -5, 3, 4, 7]  
**Output:** -1 (no fixed point)

## Solution Approach

### Method 1: Linear Search
1. Iterate through each index i from 0 to n-1
2. If arr[i] == i, return i
3. Return -1

### Method 2: Binary Search (Optimal for sorted array)
1. Initialize low = 0, high = n-1
2. While low <= high:
   - mid = low + (high - low) // 2
   - If arr[mid] == mid, return mid
   - Else if arr[mid] > mid, high = mid - 1
   - Else, low = mid + 1
3. Return -1

## Time Complexity

O(n) for linear, O(log n) for binary search.

## Space Complexity

O(1) - Constant space.

## Edge Cases

- **No fixed point**: Return -1
- **Fixed point at index 0**: Return 0
- **Fixed point at last index**: Return n-1
- **All elements greater than indices**: Return -1
- **All elements less than indices**: Return -1

## Applications

- **Fixed Point Problems**: Common in algorithm puzzles
- **Index Matching**: Find where value equals position
- **Search Algorithms**: Variants of binary search
- **Data Analysis**: Identify equilibrium points

## Practice Tips

- Utilize the sorted property for binary search
- Handle negative numbers and indices
- Consider multiple fixed points (return any)
- Practice both linear and binary approaches
