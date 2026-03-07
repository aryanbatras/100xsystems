---
title: "Strip"
codeforces: "https://codeforces.com/problemset/problem/487/B"
difficulty: "Medium"
tags: ["stacks-queues-priorityqueues", "deque"]
---

## Problem

Find the longest strip with min max difference <= k.

## Example

**Input:** 5 2  
1 3 2 4 5  
**Output:** 3  

## Solution Approach

### Method 1: Two pointers with deque

Use deque to maintain min and max.

## Time Complexity

O(n)

## Space Complexity

O(n)

## Edge Cases

- k = 0

## Applications

- Sliding window

## Practice Tips

- Deque for min max
