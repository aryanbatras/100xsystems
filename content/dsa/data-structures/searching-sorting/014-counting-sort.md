---
title: "Counting Sort"
geeksforgeeks: "https://www.geeksforgeeks.org/counting-sort/"
difficulty: "Easy"
tags: ["array", "sorting"]
---

## Problem

Given an array of integers, sort the array in ascending order using counting sort. Assume that the elements are in the range 0 to k.

## Example

**Input:** arr = [1,4,1,2,7,5,2], k=7  
**Output:** [1,1,2,2,4,5,7]  

**Input:** arr = [1,0,3,2,1,0], k=3  
**Output:** [0,0,1,1,2,3]  

**Input:** arr = [5], k=5  
**Output:** [5]

## Solution Approach

### Method 1: Counting Sort
1. Find the maximum element in the array to determine k if not given
2. Create a count array of size k+1, initialize to 0
3. Count the frequency of each element in the count array
4. Modify the count array to store the cumulative sum
5. Create an output array
6. For each element from the end of the input array:
   - Use the count array to determine the position
   - Place the element in the output array
   - Decrement the count

## Time Complexity

O(n + k) - Where k is the range of input.

## Space Complexity

O(n + k) - For output and count arrays.

## Edge Cases

- **All elements same**: Correctly sorted
- **Already sorted**: Correctly sorted
- **Reverse sorted**: Correctly sorted
- **k = 0**: Single element range

## Applications

- **Small Range Sorting**: When k is small compared to n
- **Stable Sorting**: Maintains relative order
- **Frequency Based**: Uses frequency counts
- **Non-Comparison Sorting**: Doesn't compare elements

## Practice Tips

- Understand the count array role
- Handle cumulative sums carefully
- Practice with different ranges
- Compare with other sorting algorithms
