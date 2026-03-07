---
title: "Leaders in an Array"
leetcode: "https://www.geeksforgeeks.org/leaders-in-an-array/"
difficulty: "Easy"
tags: ["array", "leaders", "basics"]
---

## Problem

Given an array of integers, find all leaders in the array. An element is a leader if it is greater than all elements to its right. The rightmost element is always a leader.

## Example

**Input:** arr = [16, 17, 4, 3, 5, 2]
**Output:** [17, 5, 2]
**Explanation:** 
- 17 is greater than all elements to its right (4, 3, 5, 2)
- 5 is greater than all elements to its right (2)
- 2 is the rightmost element, always a leader

**Input:** arr = [1, 2, 3, 4, 0]
**Output:** [4, 0]
**Explanation:** 
- 4 is greater than all elements to its right (0)
- 0 is the rightmost element

**Input:** arr = [7, 10, 4, 10, 6, 5, 2]
**Output:** [10, 6, 5, 2]
**Explanation:** 10 (at index 1), 6, 5, and 2 are leaders.

## Solution Approach

### Method 1: Brute Force
For each element, compare with all elements to its right
- Time: O(n²)
- Space: O(1) for output

### Method 2: Optimized Scan from Right
1. Start from the rightmost element
2. Keep track of maximum element seen so far
3. An element is a leader if it's greater than current max
4. Update max when a new leader is found
5. Build result in reverse order

## Time Complexity

O(n) - We scan the array once from right to left.

## Space Complexity

O(n) - To store the result (O(1) if we print directly).

## Implementation

```python
def find_leaders(arr):
    if not arr:
        return []
    
    n = len(arr)
    leaders = []
    max_from_right = arr[-1]  # Rightmost element is always a leader
    leaders.append(max_from_right)
    
    # Scan from second last element to first
    for i in range(n-2, -1, -1):
        if arr[i] > max_from_right:
            max_from_right = arr[i]
            leaders.append(max_from_right)
    
    # Reverse to maintain original order
    return leaders[::-1]

# Space optimized version (returns in reverse order)
def find_leaders_reverse(arr):
    if not arr:
        return []
    
    leaders = []
    max_from_right = arr[-1]
    leaders.append(max_from_right)
    
    for i in range(len(arr)-2, -1, -1):
        if arr[i] > max_from_right:
            max_from_right = arr[i]
            leaders.append(max_from_right)
    
    return leaders  # Returns leaders in reverse order

# In-place modification
def print_leaders(arr):
    if not arr:
        print("No leaders")
        return
    
    max_from_right = arr[-1]
    print(max_from_right, end=" ")
    
    for i in range(len(arr)-2, -1, -1):
        if arr[i] > max_from_right:
            max_from_right = arr[i]
            print(max_from_right, end=" ")
    
    print()  # New line
```

## Step-by-Step Example

For arr = [16, 17, 4, 3, 5, 2]:

1. Start from right: max_from_right = 2, leaders = [2]
2. i = 4: arr[4] = 5 > 2 → max_from_right = 5, leaders = [2, 5]
3. i = 3: arr[3] = 3 ≤ 5 → not a leader
4. i = 2: arr[2] = 4 ≤ 5 → not a leader
5. i = 1: arr[1] = 17 > 5 → max_from_right = 17, leaders = [2, 5, 17]
6. i = 0: arr[0] = 16 ≤ 17 → not a leader
7. Final: [17, 5, 2] (after reversing)

## Edge Cases

- **Empty Array**: No leaders
- **Single Element**: That element is the only leader
- **All Equal Elements**: Only the rightmost element
- **Sorted Increasing**: All elements are leaders
- **Sorted Decreasing**: All elements are leaders

## Applications

- **Stock Analysis**: Find days when stock price was at peak
- **Performance Metrics**: Identify record-breaking performances
- **Data Analysis**: Find local maxima in time series
- **Quality Control**: Find values that exceed all subsequent values
- **Competitive Analysis**: Identify market leaders over time

## Variations

### Left Leaders
Elements greater than all elements to their left:
```python
def find_left_leaders(arr):
    if not arr:
        return []
    
    leaders = []
    max_from_left = arr[0]
    leaders.append(max_from_left)
    
    for i in range(1, len(arr)):
        if arr[i] > max_from_left:
            max_from_left = arr[i]
            leaders.append(max_from_left)
    
    return leaders
```

### Leaders in Circular Array
Consider circular nature where elements can see through boundaries.

## Practice Tips

- Understand that rightmost element is always a leader
- Practice scanning from right to left
- Remember to reverse the result for correct order
- Handle edge cases properly
- Test with different array patterns

## Common Mistakes

- Forgetting that rightmost element is always a leader
- Not reversing the result at the end
- Using O(n²) approach instead of O(n)
- Not handling empty array case
- Off-by-one errors in loop bounds

## Related Problems

- Maximum element to the right
- Next greater element
- Find all local maxima
- Array manipulation problems
- Right view of array (similar to right view of tree)
