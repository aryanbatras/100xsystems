---
title: "Count Inversions"
geeksforgeeks: "https://www.geeksforgeeks.org/counting-inversions/"
difficulty: "Medium"
tags: ["array", "merge-sort", "divide-and-conquer"]
---

## Problem

Given an array of integers, count the number of inversion pairs in the array. An inversion is a pair (i, j) such that i < j and arr[i] > arr[j].

## Example

**Input:** arr = [2, 4, 1, 3, 5]  
**Output:** 3  
**Explanation:** The inversions are (2,1), (4,1), (4,3)

**Input:** arr = [1, 2, 3, 4, 5]  
**Output:** 0  

**Input:** arr = [5, 4, 3, 2, 1]  
**Output:** 10

## Solution Approach

### Method 1: Brute Force
1. For each pair i < j, if arr[i] > arr[j], count++

### Method 2: Modified Merge Sort (Optimal)
1. Use merge sort, during merge:
   - When taking element from right half, add the number of remaining elements in left half to inversion count
2. Recursively count in left and right halves

## Time Complexity

O(n log n) - For merge sort.

## Space Complexity

O(n) - For temporary arrays.

## Edge Cases

- **Sorted array**: 0 inversions
- **Reverse sorted**: n(n-1)/2 inversions
- **Single element**: 0 inversions
- **Duplicates**: No inversions between equals

## Applications

- **Sorting Analysis**: Measure disorder
- **Algorithm Efficiency**: Compare sorting methods
- **Data Statistics**: Array randomness measure
- **Computational Geometry**: Point comparisons

## Practice Tips

- Implement merge sort carefully
- Understand inversion counting during merge
- Practice with small arrays
- Handle duplicates correctly
