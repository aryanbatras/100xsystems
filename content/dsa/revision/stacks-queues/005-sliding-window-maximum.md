---
title: "Sliding Window maximum"
leetcode: "https://leetcode.com/problems/sliding-window-maximum/"
difficulty: "Hard"
tags: ["array", "queue", "sliding-window", "monotonic-queue"]
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

### Method 1: Monotonic Deque
1. dq = deque()
2. result = []
3. for i in range(len(nums)):
   - while dq and nums[dq[-1]] <= nums[i]:
     - dq.pop()
   - dq.append(i)
   - if dq[0] == i - k:
     - dq.popleft()
   - if i >= k - 1:
     - result.append(nums[dq[0]])
4. return result

## Time Complexity

O(n) - Linear.

## Space Complexity

O(k) - Deque.

## Edge Cases

- **k = 1**: Each element
- **k = n**: Max of array
- **Decreasing**: First elements
- **Increasing**: Last k elements

## Applications

- **Sliding Window**: Max in window
- **Monotonic Queue**: Decreasing
- **Arrays**: Window operations
- **Interview Questions**: Hard

## Practice Tips

- Use deque for indices
- Maintain decreasing order
- Remove out of window
- Front is max
