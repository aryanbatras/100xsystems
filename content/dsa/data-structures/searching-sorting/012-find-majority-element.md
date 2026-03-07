---
title: "Find Majority Element"
leetcode: "https://leetcode.com/problems/majority-element/"
difficulty: "Easy"
tags: ["array", "divide-and-conquer"]
---

## Problem

Given an array nums of size n, return the majority element. The majority element is the element that appears more than ⌊n/2⌋ times. You may assume that the majority element always exists in the array.

## Example

**Input:** nums = [3,2,3]  
**Output:** 3  

**Input:** nums = [2,2,1,1,1,2,2]  
**Output:** 2  

**Input:** nums = [1]  
**Output:** 1

## Solution Approach

### Method 1: Hash Map
1. Use a hash map to count frequency of each element
2. Iterate through the map, find the element with count > n/2
3. Return that element

### Method 2: Moore's Voting Algorithm (Optimal)
1. Initialize candidate = nums[0], count = 1
2. For each num in nums[1:]:
   - If count == 0:
     - candidate = num
     - count = 1
   - Else if num == candidate:
     - count++
   - Else:
     - count--
3. Return candidate

## Time Complexity

O(n) for voting algorithm.

## Space Complexity

O(1) for voting, O(n) for hash map.

## Edge Cases

- **All elements same**: Return that element
- **Majority at start**: Correct
- **Majority at end**: Correct
- **n = 1**: Return the element

## Applications

- **Voting Systems**: Determine majority vote
- **Data Analysis**: Find dominant element
- **Compression**: Identify frequent items
- **Algorithm Design**: Building block for other algorithms

## Practice Tips

- Understand the voting algorithm logic
- Practice with different majority positions
- Consider edge cases
- Implement both methods for comparison
