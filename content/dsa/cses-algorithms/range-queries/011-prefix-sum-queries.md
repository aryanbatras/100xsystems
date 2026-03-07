---
title: "Prefix Sum Queries"
cses: "https://cses.fi/problemset/task/2166"
difficulty: "Hard"
tags: ["implementation", "segment-tree", "prefix-sum", "lazy-propagation"]
---

## Problem

Support prefix sum queries and range updates.

## Example

**Input:** 8 4  
1 2 3 4 5 6 7 8  
1 1 3 5  
2 3  
1 2 4 2  
2 5  
**Output:** 9  
18  
22  
27  

**Input:** 5 2  
1 1 1 1 1  
1 1 5 10  
2 3  
**Output:** 3  
33  

**Input:** 1 1  
10  
1 1 1 5  
2 1  
**Output:** 5

## Solution Approach

### Method 1: Segment Tree with Lazy Propagation
1. Build segment tree for sum
2. Lazy propagation for range updates
3. Query prefix sums

## Time Complexity

O((n + q) log n) - Operations.

## Space Complexity

O(n) - Segment tree.

## Edge Cases

- **No updates**: Static sums
- **Whole range**: Total sum
- **Single element**: Value
- **Overlapping**: Correct sums

## Applications

- **Arrays**: Dynamic prefix sums
- **Range Updates**: Lazy propagation
- **Prefix Queries**: Efficient

## Practice Tips

- Segment tree with lazy
- Range updates
- Prefix queries
- Handle propagation
