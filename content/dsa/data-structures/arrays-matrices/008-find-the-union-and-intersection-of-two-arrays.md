---
title: "Find the Union and Intersection of Two Arrays"
geeksforgeeks: "https://www.geeksforgeeks.org/union-and-intersection-of-two-sorted-arrays-2/"
difficulty: "Easy"
tags: ["array", "set", "two-pointers"]
---

## Problem

Given two arrays, find their union (all unique elements from both arrays) and intersection (common elements present in both arrays).

## Example

**Input:** arr1 = [1, 3, 4, 5, 7], arr2 = [2, 3, 5, 6]  
**Union:** [1, 2, 3, 4, 5, 6, 7]  
**Intersection:** [3, 5]  

**Input:** arr1 = [1, 2, 3], arr2 = [4, 5, 6]  
**Union:** [1, 2, 3, 4, 5, 6]  
**Intersection:** []  

**Input:** arr1 = [1, 1, 2, 2], arr2 = [1, 2, 3]  
**Union:** [1, 2, 3]  
**Intersection:** [1, 2]

## Solution Approach

### Method 1: Using Sets (For Unsorted Arrays)
1. Insert all elements of arr1 into a set
2. For union: Insert all elements of arr2 into the set
3. For intersection: Create another set for arr2, find common elements

### Method 2: Two Pointers (For Sorted Arrays)
1. Initialize i=0, j=0 for union and intersection
2. For union: Merge like merge sort, skip duplicates
3. For intersection: When arr1[i] == arr2[j], add to intersection, increment both

## Time Complexity

O(m + n) - Where m and n are array sizes.

## Space Complexity

O(m + n) - For storing results.

## Edge Cases

- **Empty arrays**: Union empty, intersection empty
- **One array empty**: Union is the other, intersection empty
- **No common elements**: Intersection empty
- **Duplicate elements**: Handle uniqueness

## Applications

- **Database Queries**: SQL union and intersection
- **Set Operations**: Mathematical set theory
- **Data Merging**: Combine datasets
- **Duplicate Detection**: Find common items

## Practice Tips

- Handle sorted vs unsorted cases
- Use appropriate data structures
- Consider time and space constraints
- Practice with different array sizes
