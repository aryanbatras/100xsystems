---
title: "Find Maximum and Minimum Element of an Array"
leetcode: "https://leetcode.com/problems/maximum-product-of-two-elements-in-an-array/"
difficulty: "Easy"
tags: ["array", "basics"]
---

## Problem

Given an array of integers, find the maximum and minimum element in the array.

## Example

**Input:** arr = [3, 1, 4, 1, 5, 9, 2, 6]
**Output:** Maximum = 9, Minimum = 1
**Explanation:** The largest element is 9 and the smallest element is 1.

**Input:** arr = [-10, -20, -30, -5]
**Output:** Maximum = -5, Minimum = -30
**Explanation:** The largest element is -5 and the smallest element is -30.

## Solution Approach

### Method 1: Simple Linear Scan
1. Initialize `max_val = arr[0]` and `min_val = arr[0]`
2. Iterate through the array from index 1 to end
3. For each element:
   - If `arr[i] > max_val`, update `max_val = arr[i]`
   - If `arr[i] < min_val`, update `min_val = arr[i]`
4. Return `max_val` and `min_val`

### Method 2: Tournament Method (Optimized)
1. If array has one element, it's both max and min
2. Compare elements in pairs:
   - For each pair (arr[i], arr[i+1]):
     - Find local max and min in one comparison
     - Update global max and min
3. Reduces comparisons from 2(n-1) to 3(n/2) comparisons

## Time Complexity

O(n) - We need to examine each element at least once.

## Space Complexity

O(1) - We only use constant extra space for max and min values.

## Implementation

```python
def find_max_min(arr):
    if not arr:
        return None, None
    
    max_val = min_val = arr[0]
    
    for num in arr[1:]:
        if num > max_val:
            max_val = num
        if num < min_val:
            min_val = num
    
    return max_val, min_val

# Optimized version with pairwise comparison
def find_max_min_optimized(arr):
    if not arr:
        return None, None
    
    if len(arr) == 1:
        return arr[0], arr[0]
    
    # Initialize max and min based on first two elements
    if arr[0] > arr[1]:
        max_val, min_val = arr[0], arr[1]
    else:
        max_val, min_val = arr[1], arr[0]
    
    # Process remaining elements in pairs
    i = 2
    while i < len(arr) - 1:
        local_max = max(arr[i], arr[i+1])
        local_min = min(arr[i], arr[i+1])
        
        if local_max > max_val:
            max_val = local_max
        if local_min < min_val:
            min_val = local_min
        
        i += 2
    
    # Handle last element if odd length
    if i < len(arr):
        if arr[i] > max_val:
            max_val = arr[i]
        if arr[i] < min_val:
            min_val = arr[i]
    
    return max_val, min_val
```

## Edge Cases

- **Empty Array**: Return None or appropriate error
- **Single Element**: Element is both max and min
- **All Equal Elements**: Max and min are the same
- **Negative Numbers**: Handle correctly without issues

## Applications

- **Range Finding**: Determine data range for statistics
- **Normalization**: Scale data based on min/max values
- **Validation**: Check if values are within expected range
- **Data Analysis**: Basic statistical analysis
- **Algorithm Prerequisites**: Many algorithms need min/max values

## Practice Tips

- Always handle edge cases (empty array, single element)
- Consider the optimization for large arrays
- Practice both simple and optimized approaches
- Understand the comparison count optimization
- Implement in different languages to reinforce concepts
