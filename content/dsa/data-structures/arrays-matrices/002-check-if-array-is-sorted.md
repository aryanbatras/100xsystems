---
title: "Check if Array is Sorted or Not"
leetcode: "https://leetcode.com/problems/check-if-array-is-sorted-and-rotated/"
difficulty: "Easy"
tags: ["array", "sorting", "basics"]
---

## Problem

Given an array of integers, check whether the array is sorted in non-decreasing order.

## Example

**Input:** arr = [1, 2, 2, 3, 4]
**Output:** True
**Explanation:** The array is sorted in non-decreasing order.

**Input:** arr = [1, 3, 2, 4, 5]
**Output:** False
**Explanation:** The array is not sorted as 3 > 2.

**Input:** arr = [5, 4, 3, 2, 1]
**Output:** False
**Explanation:** The array is sorted in decreasing order, not non-decreasing.

## Solution Approach

### Method 1: Simple Linear Scan
1. Iterate through the array from index 1 to end
2. For each element, check if `arr[i] < arr[i-1]`
3. If any such pair is found, array is not sorted
4. If loop completes without finding such pair, array is sorted

### Method 2: Early Termination
1. Start from the beginning
2. As soon as we find a decreasing pair, return false
3. Only return true if we check all adjacent pairs

## Time Complexity

O(n) - We need to check each adjacent pair once.

## Space Complexity

O(1) - We only use constant extra space.

## Implementation

```python
def is_sorted(arr):
    if not arr or len(arr) == 1:
        return True
    
    for i in range(1, len(arr)):
        if arr[i] < arr[i-1]:
            return False
    
    return True

# Alternative with early exit
def is_sorted_early_exit(arr):
    n = len(arr)
    if n <= 1:
        return True
    
    for i in range(1, n):
        if arr[i] < arr[i-1]:
            return False
    
    return True

# One-liner version
def is_sorted_oneliner(arr):
    return all(arr[i] >= arr[i-1] for i in range(1, len(arr)))
```

## Edge Cases

- **Empty Array**: Considered sorted by convention
- **Single Element**: Always sorted
- **All Equal Elements**: Sorted (non-decreasing)
- **Already Sorted**: Should return true efficiently
- **Reverse Sorted**: Should return false

## Variations

### Check Non-Increasing Order
```python
def is_non_increasing(arr):
    return all(arr[i] <= arr[i-1] for i in range(1, len(arr)))
```

### Check Strictly Increasing
```python
def is_strictly_increasing(arr):
    return all(arr[i] > arr[i-1] for i in range(1, len(arr)))
```

### Check Strictly Decreasing
```python
def is_strictly_decreasing(arr):
    return all(arr[i] < arr[i-1] for i in range(1, len(arr)))
```

## Applications

- **Preprocessing**: Check if array is sorted before applying binary search
- **Validation**: Verify sorted input for algorithms requiring sorted data
- **Data Quality**: Check if data meets sorting requirements
- **Optimization**: Skip sorting if already sorted
- **Testing**: Verify sorting algorithm correctness

## Practice Tips

- Handle edge cases properly (empty, single element)
- Understand the difference between non-decreasing and strictly increasing
- Practice with different array sizes and patterns
- Consider the early termination optimization
- Test with various edge cases

## Common Mistakes

- Forgetting to handle empty array
- Not understanding non-decreasing vs strictly increasing
- Using wrong comparison operator
- Not considering single-element arrays
- Off-by-one errors in loop bounds

## Related Problems

- Sort an array
- Check if array is sorted and rotated
- Find minimum swaps to sort array
- Check if array can be sorted with at most one swap
- Find unsorted pair in array
