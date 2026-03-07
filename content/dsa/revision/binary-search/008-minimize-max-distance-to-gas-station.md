---
title: "Minimize Max Distance to Gas Station"
leetcode: "https://leetcode.com/problems/minimize-max-distance-to-gas-station/"
difficulty: "Hard"
tags: ["array", "binary-search"]
---

## Problem

You are given an integer array stations that represents the positions of the gas stations on a horizontal line. You are also given an integer k, which is the number of gas stations you need to add. You can add gas stations anywhere on the line, and the distance between any two adjacent gas stations should be minimized in terms of the maximum distance. Return the smallest possible maximum distance between adjacent gas stations after adding k gas stations.

## Example

**Input:** stations = [1,2,3,4,5,6,7,8,9,10], k = 9  
**Output:** 0.5  

**Input:** stations = [23,24,36,39,46,56,57,65,84,98], k = 1  
**Output:** 14  

**Input:** stations = [1,2], k = 1  
**Output:** 0.5

## Solution Approach

### Method 1: Binary Search
1. stations.sort()
2. left = 0, right = stations[-1] - stations[0]
3. while right - left > 1e-6:
   - mid = (left + right) / 2
   - if can_place(stations, k, mid):
     - right = mid
   - else:
     - left = mid
4. return left

5. def can_place(stations, k, dist):
   - count = 0
   - for i in range(1, len(stations)):
     - diff = stations[i] - stations[i-1]
     - count += int(diff / dist)
   - return count <= k

## Time Complexity

O(n log max_dist) - Binary search on distance.

## Space Complexity

O(1) - Constant.

## Edge Cases

- **k = 0**: Max gap
- **All equal**: 0
- **Two stations**: (dist / (k+1))
- **Large k**: Small distance

## Applications

- **Optimization**: Minimize max distance
- **Binary Search**: On distance
- **Arrays**: Station positions
- **Interview Questions**: Hard

## Practice Tips

- Binary search on max distance
- Count stations needed for mid
- Use floating point precision
- Sort stations first
