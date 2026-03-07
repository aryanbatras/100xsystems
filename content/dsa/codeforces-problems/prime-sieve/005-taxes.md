---
title: "Taxes"
codeforces: "https://codeforces.com/problemset/problem/27/B"
difficulty: "Medium"
tags: ["graph", "constructive"]
---

## Problem

Find the missing game result in a tournament based on falling asleep speeds.

## Example

**Input:** 4  
4 2  
4 1  
2 1  
2 3  
4 3  
1 3  
**Output:** 4 3  

## Solution Approach

### Method 1: Model as graph

Lower speed wins, find the missing edge.

## Time Complexity

O(n^2)

## Space Complexity

O(n^2)

## Edge Cases

- Small n

## Applications

- Graph reconstruction

## Practice Tips

- Use adjacency matrix
