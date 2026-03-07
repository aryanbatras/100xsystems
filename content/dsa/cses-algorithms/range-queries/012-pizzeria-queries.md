---
title: "Pizzeria Queries"
cses: "https://cses.fi/problemset/task/2206"
difficulty: "Hard"
tags: ["implementation", "segment-tree", "range-minimum"]
---

## Problem

Find min distance to nearest pizzeria in range.

## Example

**Input:** 4 3  
1 2 1 2  
2 1 4  
1 2 3  
2 1 4  
**Output:** 0  
1  
0  

**Input:** 5 2  
1 1 1 1 1  
2 1 5  
1 3 2  
2 1 5  
**Output:** 1  
2  

**Input:** 1 1  
1  
2 1 1  
**Output:** 0

## Solution Approach

### Method 1: Segment Tree with Custom Update
1. Build segment tree for min distance
2. For updates, set position to 0, others increase by 1
3. Queries get min in range

## Time Complexity

O((n + q) log n) - Operations.

## Space Complexity

O(n) - Segment tree.

## Edge Cases

- **Pizzeria at position**: 0
- **No pizzeria**: Large distance
- **Update pizzeria**: Reset distances
- **Range queries**: Min distance

## Applications

- **Arrays**: Distance calculations
- **Updates**: Point updates affect ranges
- **Queries**: Range minimum

## Practice Tips

- Segment tree for min
- Update with custom logic
- Query ranges
- Handle distances
