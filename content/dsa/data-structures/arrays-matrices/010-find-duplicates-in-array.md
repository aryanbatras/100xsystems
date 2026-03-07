---
title: "Find Duplicates in Array"
geeksforgeeks: "https://www.geeksforgeeks.org/find-duplicates-in-on-time-and-constant-extra-space/"
difficulty: "Medium"
tags: ["array", "hashing"]
---

## Problem

Given an array of n elements which contains elements from 0 to n-1, with any of these numbers appearing any number of times. Find these repeating numbers in O(n) time and using only constant memory space.

## Example

**Input:** n=7, array[]={1, 2, 3, 6, 3, 6, 1}  
**Output:** 1, 3, 6  
**Explanation:** Elements 1, 3, and 6 appear more than once.

**Input:** n=5, array[]={1, 2, 3, 4, 5}  
**Output:** No duplicates

**Input:** n=4, array[]={1, 1, 1, 1}  
**Output:** 1

## Solution Approach

### Method 1: Using Array as Hash
1. Traverse the array: for each arr[i], do arr[arr[i] % n] += n
2. Traverse again: for each i, if arr[i] / n > 1, then i is a duplicate

### Method 2: Mark Visited by Negation
1. For each i from 0 to n-1:
   - index = abs(arr[i])
   - If arr[index] < 0, then index is duplicate
   - Else, arr[index] = -arr[index]
2. Collect all duplicates found

## Time Complexity

O(n) - Two passes through the array.

## Space Complexity

O(1) - No extra space used.

## Edge Cases

- **No duplicates**: Empty output
- **All elements same**: Single duplicate
- **Single element**: No duplicates
- **Elements not in range 0 to n-1**: May not work, assume they are

## Applications

- **Duplicate Detection**: Find repeated items
- **Data Validation**: Check for invalid repetitions
- **Frequency Analysis**: Count occurrences
- **Array Processing**: Clean data

## Practice Tips

- Understand the hashing technique
- Handle the negation method carefully
- Consider constraints on element values
- Practice with different array sizes
