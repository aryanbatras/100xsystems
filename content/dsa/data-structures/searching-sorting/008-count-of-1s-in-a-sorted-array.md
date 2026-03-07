---
title: "Count of 1s in a Sorted Array"
geeksforgeeks: "https://www.geeksforgeeks.org/count-1s-sorted-binary-array/"
difficulty: "Easy"
tags: ["array", "binary-search"]
---

## Problem

Given a binary array sorted in non-increasing order (all 1s followed by all 0s), count the number of 1s in the array.

## Example

**Input:** arr = [1,1,0,0,0,0]  
**Output:** 2  

**Input:** arr = [1,1,1,1,1,1]  
**Output:** 6  

**Input:** arr = [0,0,0,0]  
**Output:** 0

## Solution Approach

### Method 1: Linear Search
1. Initialize count = 0
2. Iterate from the start until a 0 is encountered
3. For each 1, increment count
4. Return count

### Method 2: Binary Search (Optimal)
1. Find the first 0 using binary search
2. The index of the first 0 is the count of 1s
3. If no 0 found, count = n

## Time Complexity

O(n) for linear, O(log n) for binary search.

## Space Complexity

O(1) - Constant space.

## Edge Cases

- **All 1s**: Return n
- **All 0s**: Return 0
- **Single 1**: Return 1
- **Empty array**: Return 0

## Applications

- **Binary Search Variants**: Counting in sorted binary arrays
- **Data Analysis**: Frequency of 1s in binary data
- **Image Processing**: Pixel counting
- **Algorithm Problems**: Common coding interview question

## Practice Tips

- Utilize the sorted property
- Implement binary search for first 0
- Handle all 1s and all 0s cases
- Practice with different array sizes
