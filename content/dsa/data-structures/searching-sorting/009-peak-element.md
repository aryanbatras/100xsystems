---
title: "Peak Element"
leetcode: "https://leetcode.com/problems/find-peak-element/"
difficulty: "Medium"
tags: ["array", "binary-search"]
---

## Problem

A peak element is an element that is strictly greater than its neighbors. Given a 0-indexed integer array nums, find a peak element, and return its index. If the array contains multiple peaks, return the index to any of the peaks. You may imagine that nums[-1] = nums[n] = -∞. In other words, an element is always considered to be strictly greater than a neighbor that is outside the array.

## Example

**Input:** nums = [1,2,3,1]  
**Output:** 2 (nums[2] = 3 is a peak)  

**Input:** nums = [1,2,1,3,5,6,4]  
**Output:** 1 or 5 (nums[1]=2 or nums[5]=6 are peaks)  

**Input:** nums = [1]  
**Output:** 0

## Solution Approach

### Method 1: Linear Scan
1. If n == 1, return 0
2. Check if nums[0] > nums[1], return 0
3. Check if nums[n-1] > nums[n-2], return n-1
4. For i in 1 to n-2:
   - If nums[i] > nums[i-1] and nums[i] > nums[i+1], return i

### Method 2: Binary Search (Optimal)
1. Initialize low = 0, high = n-1
2. While low < high:
   - mid = low + (high - low) // 2
   - If nums[mid] > nums[mid+1], high = mid
   - Else, low = mid + 1
3. Return low

## Time Complexity

O(n) for linear, O(log n) for binary search.

## Space Complexity

O(1) - Constant space.

## Edge Cases

- **Single element**: Return 0
- **Strictly increasing**: Return n-1
- **Strictly decreasing**: Return 0
- **All equal**: Any index (since not strictly greater, but problem assumes peaks exist)

## Applications

- **Local Maxima Finding**: Identify peaks in data
- **Optimization Problems**: Hill climbing algorithms
- **Signal Processing**: Detect peaks in signals
- **Graph Algorithms**: Related to finding maxima

## Practice Tips

- Understand the binary search reduction
- Handle boundary elements
- Consider multiple peaks
- Practice with different array patterns
