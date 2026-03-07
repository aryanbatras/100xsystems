---
title: "Count of Occurrences of X in Sorted Array"
geeksforgeeks: "https://www.geeksforgeeks.org/count-number-of-occurrences-or-frequency-in-a-sorted-array/"
difficulty: "Easy"
tags: ["array", "binary-search"]
---

## Problem

Given a sorted array arr[] and a number x, write a function that counts the occurrences of x in arr[].

## Example

**Input:** arr = [1, 1, 2, 2, 2, 2, 3], x = 2  
**Output:** 4  

**Input:** arr = [1, 1, 2, 2, 2, 2, 3], x = 4  
**Output:** 0  

**Input:** arr = [1, 2, 3, 4, 5], x = 1  
**Output:** 1

## Solution Approach

### Method 1: Linear Search
1. Initialize count = 0
2. Iterate through the array
3. If arr[i] == x, count++
4. Return count

### Method 2: Binary Search (Optimal)
1. Find the first occurrence of x using binary search
2. Find the last occurrence of x using binary search
3. Return last - first + 1 if both exist, else 0

## Time Complexity

O(n) for linear, O(log n) for binary search.

## Space Complexity

O(1) - Constant space.

## Edge Cases

- **x not in array**: Return 0
- **x appears once**: Return 1
- **x appears at start or end**: Correct count
- **Empty array**: Return 0
- **All elements are x**: Return n

## Applications

- **Frequency Analysis**: Count occurrences in data
- **Search Algorithms**: Efficient counting in sorted data
- **Data Processing**: Statistical operations
- **Database Queries**: Count matches

## Practice Tips

- Utilize the sorted property
- Implement first and last occurrence functions
- Handle cases where x is not present
- Practice with different array sizes
