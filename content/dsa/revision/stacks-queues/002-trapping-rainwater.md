---
title: "Trapping Rainwater"
leetcode: "https://leetcode.com/problems/trapping-rain-water/"
difficulty: "Hard"
tags: ["array", "two-pointers", "stack", "dynamic-programming"]
---

## Problem

Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.

## Example

**Input:** height = [0,1,0,2,1,0,1,3,2,1,2,1]  
**Output:** 6  

**Input:** height = [4,2,0,3,2,5]  
**Output:** 9  

**Input:** height = [0,1,0]  
**Output:** 0

## Solution Approach

### Method 1: Two Pointers
1. left = 0, right = len(height) - 1
2. left_max = right_max = 0
3. water = 0
4. while left < right:
   - if height[left] < height[right]:
     - if height[left] >= left_max:
       - left_max = height[left]
     - else:
       - water += left_max - height[left]
     - left += 1
   - else:
     - if height[right] >= right_max:
       - right_max = height[right]
     - else:
       - water += right_max - height[right]
     - right -= 1
5. return water

### Method 2: Stack
1. stack = []
2. water = 0
3. for i in range(len(height)):
   - while stack and height[i] > height[stack[-1]]:
     - bottom = stack.pop()
     - if not stack:
       - break
     - width = i - stack[-1] - 1
     - h = min(height[i], height[stack[-1]]) - height[bottom]
     - water += width * h
   - stack.append(i)
5. return water

## Time Complexity

O(n) - Linear.

## Space Complexity

O(1) for two pointers, O(n) for stack.

## Edge Cases

- **No water**: Flat or decreasing
- **Single bar**: 0
- **All increasing**: 0
- **Valley shape**: Traps water

## Applications

- **Array Problems**: Water trapping
- **Two Pointers**: Converge
- **Stack**: Monotonic
- **Interview Questions**: Hard

## Practice Tips

- Use two pointers for efficiency
- Track max heights
- Calculate trapped water
- Handle boundaries
