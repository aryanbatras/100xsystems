---
title: "Median of Two Sorted Arrays of Same Size"
geeksforgeeks: "https://www.geeksforgeeks.org/median-of-two-sorted-arrays-of-same-size/"
difficulty: "Hard"
tags: ["array", "binary-search"]
---

## Problem

There are 2 sorted arrays A and B of size n each. Write an algorithm to find the median of the array obtained after merging the above 2 arrays(i.e. array of length 2n). The complexity should be O(log n).

## Example

**Input:** arr1 = [1, 12, 15, 26, 38], arr2 = [2, 13, 17, 30, 45]  
**Output:** 16  

**Input:** arr1 = [1, 2, 3, 4, 5], arr2 = [6, 7, 8, 9, 10]  
**Output:** 5.5  

**Input:** arr1 = [1, 3, 5, 7, 9], arr2 = [2, 4, 6, 8, 10]  
**Output:** 5.5

## Solution Approach

### Method 1: Merge Arrays
1. Merge the two sorted arrays into one sorted array of size 2n
2. Median = (arr[ n-1 ] + arr[ n ]) / 2

### Method 2: Binary Search (Optimal)
1. Do binary search on the smaller array (assume arr1)
2. Partition arr1 into two parts: left of size i, right of size n-i
3. Partition arr2 into two parts: left of size n-i, right of size i
4. Check if max(left1, left2) <= min(right1, right2)
5. If yes, median = (max(left1, left2) + min(right1, right2)) / 2
6. Else adjust the partition

## Time Complexity

O(log n) for binary search method.

## Space Complexity

O(1) for binary search, O(n) for merge.

## Edge Cases

- **n = 1**: Median of two elements
- **All elements same**: That value
- **One array smaller**: Handle partitioning
- **Negative numbers**: Work normally

## Applications

- **Statistics**: Find median of merged data
- **Data Analysis**: Median calculation
- **Algorithm Problems**: Binary search on arrays
- **Interview Questions**: Common problem

## Practice Tips

- Understand the partitioning logic
- Handle the binary search carefully
- Consider odd/even total elements
- Practice with small arrays
