---
title: "Largest Rectangular Area in a Histogram"
leetcode: "https://leetcode.com/problems/largest-rectangle-in-histogram/"
difficulty: "Hard"
tags: ["stack", "array"]
---

## Problem

Given an array of integers heights representing the histogram's bar height where the width of each bar is 1, return the area of the largest rectangle in the histogram.

## Example

**Input:** heights = [2,1,5,6,2,3]  
**Output:** 10  

**Input:** heights = [2,4]  
**Output:** 4  

**Input:** heights = [1,1,1,1]  
**Output:** 4

## Solution Approach

### Method 1: Stack
1. Use a stack to keep indices
2. Append 0 to heights for processing
3. Initialize max_area = 0
4. For i in 0 to len(heights):
   - While stack not empty and heights[stack.top] >= heights[i]:
     - h = heights[stack.pop]
     - left = stack.top if not empty else -1
     - w = i - left - 1
     - area = h * w
     - max_area = max(max_area, area)
   - Push i to stack

## Time Complexity

O(n) - Each bar pushed/popped once.

## Space Complexity

O(n) - For stack.

## Edge Cases

- **All same height**: n * height
- **Strictly increasing**: 1 * last height
- **Strictly decreasing**: n * first height
- **Single bar**: height * 1

## Applications

- **Histogram Analysis**: Largest rectangle in bar charts
- **Image Processing**: Rectangle detection
- **Data Visualization**: Area calculations
- **Algorithm Problems**: Stack applications

## Practice Tips

- Use stack for boundaries
- Handle the appended 0
- Calculate width correctly
- Visualize the histogram
