---
title: "Largest rectangle in a histogram"
leetcode: "https://leetcode.com/problems/largest-rectangle-in-histogram/"
difficulty: "Hard"
tags: ["array", "stack", "monotonic-stack"]
---

## Problem

Given an array of integers heights representing the histogram's bar height where the width of each bar is 1, return the area of the largest rectangle in the histogram.

## Example

**Input:** heights = [2,1,5,6,2,3]  
**Output:** 10  

**Input:** heights = [2,4]  
**Output:** 4  

**Input:** heights = [1,1]  
**Output:** 2

## Solution Approach

### Method 1: Monotonic Stack
1. stack = [-1]
2. max_area = 0
3. for i in range(len(heights)):
   - while stack[-1] != -1 and heights[stack[-1]] >= heights[i]:
     - h = heights[stack.pop()]
     - w = i - stack[-1] - 1
     - max_area = max(max_area, h * w)
   - stack.append(i)
4. while stack[-1] != -1:
   - h = heights[stack.pop()]
   - w = len(heights) - stack[-1] - 1
   - max_area = max(max_area, h * w)
5. return max_area

## Time Complexity

O(n) - Linear.

## Space Complexity

O(n) - Stack.

## Edge Cases

- **All increasing**: Last bar area
- **All decreasing**: First bar
- **Single bar**: Height * 1
- **Equal heights**: Whole width

## Applications

- **Histogram Problems**: Max area
- **Monotonic Stack**: Increasing
- **Arrays**: Rectangle calculation
- **Interview Questions**: Hard

## Practice Tips

- Use stack for indices
- Pop when smaller height
- Calculate width to previous
- Handle remaining stack
