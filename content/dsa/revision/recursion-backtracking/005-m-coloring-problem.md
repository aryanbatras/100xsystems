---
title: "M Coloring Problem"
difficulty: "Medium"
tags: ["graph", "backtracking"]
---

## Problem

Given an undirected graph and an integer m, determine if the graph can be colored with at most m colors such that no two adjacent vertices share the same color.

## Example

**Input:** graph = [[1,2],[0,2],[0,1]], m = 3  
**Output:** true  

**Input:** graph = [[1,2],[0,2],[0,1]], m = 2  
**Output:** false  

**Input:** graph = [[1],[0]], m = 2  
**Output:** true

## Solution Approach

### Method 1: Backtracking
1. color = [-1] * n
2. def is_safe(v, c):
   - for neighbor in graph[v]:
     - if color[neighbor] == c:
       - return False
   - return True
3. def color_graph(v):
   - if v == n:
     - return True
   - for c in range(m):
     - if is_safe(v, c):
       - color[v] = c
       - if color_graph(v + 1):
         - return True
       - color[v] = -1
   - return False
4. return color_graph(0)

## Time Complexity

O(m^n) - Worst case.

## Space Complexity

O(n) - Color array.

## Edge Cases

- **m = 1**: Only if no edges
- **Disconnected graph**: Easier
- **Complete graph**: Needs m >= n
- **Tree**: Always colorable with 2

## Applications

- **Graph Coloring**: NP-hard problem
- **Backtracking**: Constraint satisfaction
- **Map Coloring**: Real world
- **Interview Questions**: Medium

## Practice Tips

- Try colors for each vertex
- Check adjacent colors
- Backtrack on failure
- Start from vertex 0
