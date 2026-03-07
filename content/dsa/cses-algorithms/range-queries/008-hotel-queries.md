---
title: "Hotel Queries"
cses: "https://cses.fi/problemset/task/1143"
difficulty: "Medium"
tags: ["implementation", "segment-tree", "range-maximum"]
---

## Problem

For each group size, find leftmost hotel with enough rooms.

## Example

**Input:** 8 5  
5 4 7 2 1 3 2 6  
5  
4  
7  
2  
3  
**Output:** 1  
2  
3  
4  
5  

**Input:** 5 3  
1 2 3 4 5  
6  
4  
2  
**Output:** 4  
3  
2

## Solution Approach

### Method 1: Segment Tree for Max
1. Build segment tree with max values
2. For each query:
   - Binary search for leftmost position where max >= needed
   - If found, update that position by subtracting needed

## Time Complexity

O((n + q) log n) - Build + queries.

## Space Complexity

O(n) - Segment tree.

## Edge Cases

- **No space**: 0
- **Exact fit**: Position
- **Multiple**: Leftmost
- **End**: n+1

## Applications

- **Arrays**: Range maximum
- **Binary Search**: Position finding
- **Updates**: Point updates

## Practice Tips

- Segment tree for max
- Binary search on tree
- Update positions
- Handle no fit
