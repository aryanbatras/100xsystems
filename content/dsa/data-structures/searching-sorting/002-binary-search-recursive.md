---
title: "Binary Search Recursive"
difficulty: "Easy"
tags: ["array", "binary-search", "recursion"]
---

## Problem

Implement binary search recursively to find the index of a target element in a sorted array. Return -1 if the target is not found.

## Example

**Input:** nums = [1, 2, 3, 4, 5], target = 3  
**Output:** 2  

**Input:** nums = [1, 2, 3, 4, 5], target = 6  
**Output:** -1  

**Input:** nums = [1], target = 1  
**Output:** 0

## Solution Approach

### Method 1: Standard Recursive Binary Search
1. Define a helper function: binary_search(nums, low, high, target)
2. Base case: if low > high, return -1
3. Calculate mid = low + (high - low) // 2
4. If nums[mid] == target, return mid
5. If nums[mid] > target, return binary_search(nums, low, mid - 1, target)
6. Else, return binary_search(nums, mid + 1, high, target)

## Time Complexity

O(log n) - Each call reduces the search space by half.

## Space Complexity

O(log n) - Recursion stack depth.

## Edge Cases

- **Empty array**: Return -1
- **Single element**: Check if matches
- **Target not in array**: Return -1
- **Target at boundaries**: Return correct index

## Applications

- **Search Operations**: Efficient lookup in sorted data
- **Algorithm Foundations**: Building block for other algorithms
- **Data Structures**: Used in trees and other structures
- **Optimization**: Reduce search time

## Practice Tips

- Understand recursion base cases
- Handle integer overflow in mid calculation
- Practice with different array sizes
- Compare with iterative version
