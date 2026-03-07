---
title: "Binary Search - Iterative"
leetcode: "https://leetcode.com/problems/binary-search/"
difficulty: "Easy"
tags: ["array", "binary-search", "searching"]
---

## Problem

Given a sorted array of integers and a target value, return the index of the target if it exists in the array, otherwise return -1.

## Example

**Input:** nums = [-1,0,3,5,9,12], target = 9
**Output:** 4
**Explanation:** 9 exists in nums and its index is 4.

**Input:** nums = [-1,0,3,5,9,12], target = 2
**Output:** -1
**Explanation:** 2 does not exist in nums so return -1.

**Input:** nums = [1,2,3,4,5,6,7,8,9,10], target = 6
**Output:** 5
**Explanation:** 6 exists at index 5.

## Solution Approach

### Iterative Binary Search
1. Initialize `left = 0` and `right = len(nums) - 1`
2. While `left <= right`:
   - Calculate `mid = left + (right - left) // 2`
   - If `nums[mid] == target`, return `mid`
   - If `nums[mid] < target`, search right half: `left = mid + 1`
   - If `nums[mid] > target`, search left half: `right = mid - 1`
3. If loop ends, target not found, return -1

### Key Points
- **Sorted Array**: Binary search only works on sorted arrays
- **Integer Overflow**: Use `left + (right - left) // 2` instead of `(left + right) // 2`
- **Termination**: Loop ends when `left > right`
- **Time Complexity**: O(log n) - halves search space each iteration

## Time Complexity

O(log n) - We eliminate half of the remaining elements in each iteration.

## Space Complexity

O(1) - We only use constant extra space for pointers.

## Implementation

```python
def binary_search_iterative(nums, target):
    left, right = 0, len(nums) - 1
    
    while left <= right:
        # Prevent integer overflow
        mid = left + (right - left) // 2
        
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            left = mid + 1
        else:  # nums[mid] > target
            right = mid - 1
    
    return -1

# With detailed comments
def binary_search_detailed(nums, target):
    """
    Iterative binary search implementation.
    
    Args:
        nums: Sorted array of integers
        target: Integer to search for
        
    Returns:
        int: Index of target if found, -1 otherwise
    """
    left = 0
    right = len(nums) - 1
    
    print(f"Searching for {target} in {nums}")
    print(f"Initial: left={left}, right={right}")
    
    while left <= right:
        mid = left + (right - left) // 2
        print(f"mid={mid}, nums[mid]={nums[mid]}")
        
        if nums[mid] == target:
            print(f"Found {target} at index {mid}")
            return mid
        elif nums[mid] < target:
            print(f"{nums[mid]} < {target}, searching right half")
            left = mid + 1
        else:
            print(f"{nums[mid]} > {target}, searching left half")
            right = mid - 1
        
        print(f"Updated: left={left}, right={right}")
    
    print(f"{target} not found")
    return -1

# Generic version for any comparable type
def binary_search_generic(arr, target):
    """
    Generic binary search that works with any comparable type.
    """
    left, right = 0, len(arr) - 1
    
    while left <= right:
        mid = left + (right - left) // 2
        
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return -1
```

## Step-by-Step Example

For nums = [-1,0,3,5,9,12], target = 9:

1. **Initial**: left = 0, right = 5
2. **Iteration 1**: 
   - mid = 0 + (5-0)//2 = 2
   - nums[2] = 3 < 9
   - Update: left = 3, right = 5
3. **Iteration 2**:
   - mid = 3 + (5-3)//2 = 4
   - nums[4] = 9 == 9
   - Return 4

## Edge Cases

- **Empty Array**: Return -1 immediately
- **Single Element**: Check if it matches target
- **Target Not Found**: Loop completes, return -1
- **Duplicate Elements**: Returns any matching index
- **All Elements Same**: Works correctly

## Variations

### Find First Occurrence
```python
def binary_search_first(nums, target):
    left, right = 0, len(nums) - 1
    result = -1
    
    while left <= right:
        mid = left + (right - left) // 2
        
        if nums[mid] == target:
            result = mid  # Remember this position
            right = mid - 1  # Continue searching left
        elif nums[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return result
```

### Find Last Occurrence
```python
def binary_search_last(nums, target):
    left, right = 0, len(nums) - 1
    result = -1
    
    while left <= right:
        mid = left + (right - left) // 2
        
        if nums[mid] == target:
            result = mid  # Remember this position
            left = mid + 1  # Continue searching right
        elif nums[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return result
```

## Applications

- **Dictionary Lookup**: Fast word search in sorted dictionary
- **Database Indexing**: Quick record retrieval
- **Phone Book**: Contact search by name
- **File Search**: Find file in sorted directory
- **Game Development**: Binary search in game state arrays

## Practice Tips

- Always check if array is sorted before using binary search
- Practice the integer overflow prevention technique
- Understand the loop condition `left <= right`
- Master the three cases inside the loop
- Test with various array sizes and target positions

## Common Mistakes

- Forgetting to check if array is sorted
- Using `(left + right) // 2` (possible overflow)
- Wrong loop condition (`left < right` instead of `left <= right`)
- Incorrect update of left/right pointers
- Not handling empty array case

## Related Problems

- Binary search recursive version
- Search in rotated sorted array
- Find first and last position of element
- Search insert position
- Square root using binary search
