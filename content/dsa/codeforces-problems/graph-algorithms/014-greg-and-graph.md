---
title: "Greg and Graph"
codeforces: "https://codeforces.com/problemset/problem/295/B"
difficulty: "Medium"
tags: ["graph-algorithms", "floyd warshall"]
---

## Problem

Compute shortest paths after deletions.

## Example

**Input:** 3  
0 1 2  
1 0 3  
2 3 0  
1 2 3  
**Output:** 0 1 2  

## Solution Approach

### Method 1: Floyd Warshall reverse

Run Floyd in reverse order.

## Time Complexity

O(n^3)

## Space Complexity

O(n^2)

## Edge Cases

- No edges

## Applications

- Dynamic shortest paths

## Practice Tips

- Floyd implementation
