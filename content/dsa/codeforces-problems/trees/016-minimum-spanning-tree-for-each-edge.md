---
title: "Minimum spanning tree for each edge"
codeforces: "https://codeforces.com/problemset/problem/609/E"
difficulty: "Hard"
tags: ["trees", "mst"]
---

## Problem

Find MST for each edge.

## Example

**Input:** 5 6  
1 2 1  
1 3 2  
2 3 3  
2 4 4  
3 4 5  
4 5 6  
**Output:** 1 2 3 4 5 6  

## Solution Approach

### Method 1: Kruskal with union-find

Use union-find for MST.

## Time Complexity

O(m log m)

## Space Complexity

O(m)

## Edge Cases

- Connected

## Applications

- MST

## Practice Tips

- Kruskal algorithm
