---
title: "Cyclic Rotation of Array"
leetcode: "https://leetcode.com/problems/rotate-array/"
difficulty: "Medium"
tags: ["array", "rotation"]
---

## Problem

Given an array, rotate the array to the right by k steps, where k is non-negative.

## Example

**Input:** nums = [1,2,3,4,5,6,7], k = 3  
**Output:** [5,6,7,1,2,3,4]  
**Explanation:** Rotate 1 steps to the right: [7,1,2,3,4,5,6]  
Rotate 2 steps: [6,7,1,2,3,4,5]  
Rotate 3 steps: [5,6,7,1,2,3,4]

**Input:** nums = [-1,-100,3,99], k = 2  
**Output:** [3,99,-1,-100]

**Input:** nums = [1,2], k = 3  
**Output:** [2,1] (since k % 2 = 1, rotate once)

## Solution Approach

### Method 1: Using Extra Space
1. Create a new array of size n
2. For each i, new_array[(i+k)%n] = nums[i]
3. Copy back to nums

### Method 2: Reverse Method (Optimal)
1. Reverse the entire array
2. Reverse the first k elements
3. Reverse the remaining n-k elements

### Method 3: Cyclic Replacement
1. For i from 0 to gcd(n,k)-1:
   - Start from i, place elements in their rotated positions
   - Use a temp to store the starting element

## Time Complexity

O(n) - Linear time for all methods.

## Space Complexity

O(1) - For reverse method, O(n) for extra space method.

## Edge Cases

- **k = 0**: No rotation
- **k % n = 0**: No rotation
- **k > n**: Equivalent to k % n
- **Single element**: No change
- **Empty array**: No operation

## Applications

- **Circular Buffers**: Data rotation in buffers
- **String Manipulation**: Rotate strings
- **Game Development**: Position updates
- **Algorithm Preprocessing**: Prepare data for processing

## Practice Tips

- Handle k >= n by taking k % n
- Understand all three methods
- Consider space constraints
- Practice with large k values
