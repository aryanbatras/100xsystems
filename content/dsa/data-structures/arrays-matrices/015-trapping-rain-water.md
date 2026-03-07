---
title: "Trapping Rain Water"
leetcode: "https://leetcode.com/problems/trapping-rain-water/"
difficulty: "Hard"
tags: ["array", "two-pointers", "stack"]
---

## Problem

Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.

## Example

**Input:** height = [0,1,0,2,1,0,1,3,2,1,2,1]  
**Output:** 6  
**Explanation:** The above elevation map (black sections) is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water (blue sections) are being trapped.

**Input:** height = [4,2,0,3,2,5]  
**Output:** 9

**Input:** height = [0,1,0,2,1,0,1,3,2,1,2,1]  
**Output:** 6

## Solution Approach

### Method 1: Two Pointers (Optimal)
1. Initialize left = 0, right = n-1, max_left = 0, max_right = 0, water = 0
2. While left < right:
   - If height[left] < height[right]:
     - If height[left] >= max_left, max_left = height[left]
     - Else, water += max_left - height[left]
     - left++
   - Else:
     - If height[right] >= max_right, max_right = height[right]
     - Else, water += max_right - height[right]
     - right--

### Method 2: Using Stack
1. Use stack to keep indices of bars
2. For each bar i:
   - While stack not empty and height[i] > height[stack.top]:
     - Pop top, calculate water trapped above it: min(height[i], height[stack.top]) - height[top]
     - Add to total water
   - Push i to stack

## Time Complexity

O(n) - Single pass.

## Space Complexity

O(1) for two pointers, O(n) for stack.

## Edge Cases

- **All zeros or single bar**: 0 water
- **Strictly increasing**: 0 water
- **Strictly decreasing**: 0 water
- **Flat areas**: No water trapped

## Applications

- **Rainwater Collection**: Real-world water trapping
- **Histogram Analysis**: Bar chart water levels
- **Terrain Analysis**: Elevation mapping
- **Algorithm Problems**: Common interview question

## Practice Tips

- Visualize the water trapping
- Understand both pointer movements
- Practice with small examples
- Handle boundary conditions
