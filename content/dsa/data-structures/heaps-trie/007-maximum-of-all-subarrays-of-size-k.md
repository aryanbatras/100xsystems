---
title: "Maximum of All Subarrays of Size K"
leetcode: "https://leetcode.com/problems/sliding-window-maximum/"
difficulty: "Hard"
tags: ["heap", "deque", "sliding-window"]
---

## Problem

You are given an array of integers nums, there is a sliding window of size k which is moving from the very left of the array to the very right. You can only see the k numbers in the window. Each time the sliding window moves right by one position. Return the max sliding window.

## Example

**Input:** nums = [1,3,-1,-3,5,3,6,7], k = 3  
**Output:** [3,3,5,5,6,7]  

**Input:** nums = [1], k = 1  
**Output:** [1]  

**Input:** nums = [1,-1], k = 1  
**Output:** [1,-1]

## Solution Approach

### Method 1: Deque
1. Use a deque to store indices, front has the max
2. For each i in 0 to n-1:
   - While deque and nums[deque.back] <= nums[i], pop back
   - While deque and deque.front <= i - k, pop front
   - Push i to back
   - If i >= k-1, result.append(nums[deque.front])

### Method 2: Max Heap
1. Use a max heap with (value, index)
2. For each window, add k elements, get max, remove old
3. But need to handle removals

## Time Complexity

O(n) for deque, O(n log n) for heap.

## Space Complexity

O(k) for deque, O(k) for heap.

## Edge Cases

- **k = 1**: All elements
- **k = n**: [max of array]
- **Decreasing array**: First k elements
- **Increasing array**: Last of each window

## Applications

- **Sliding Window**: Maximum in window
- **Data Processing**: Local maxima
- **Algorithms**: Efficient window operations
- **Real-time Systems**: Streaming data

## Practice Tips

- Implement deque approach
- Maintain decreasing order
- Handle window boundaries
- Test with different k
