---
title: "Directing Edges"
codeforces: "https://codeforces.com/problemset/problem/1385/E"
difficulty: "Medium"
tags: ["graph-algorithms", "dfs"]
---

## Problem

Assign directions to edges.

## Example

**Input:** 3 3  
1 2  
2 3  
1 3  
**Output:** YES  
1 2  
2 3  
3 1  

## Solution Approach

### Method 1: Topological sort

Check if can orient without cycles.

## Time Complexity

O(n + m)

## Space Complexity

O(n + m)

## Edge Cases

- Has cycle

## Applications

- Graph orientation

## Practice Tips

- Cycle detection
