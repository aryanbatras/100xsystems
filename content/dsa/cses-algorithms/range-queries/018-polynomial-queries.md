---
title: "Polynomial Queries"
cses: "https://cses.fi/problemset/task/2413"
difficulty: "Hard"
tags: ["implementation", "segment-tree", "lazy-propagation", "polynomial-updates"]
---

## Problem

Support polynomial range updates and point queries.

## Example

**Input:** 5 3  
1 2 3 4 5  
1 1 3 0 0 1  
2 2  
1 2 5 1 2 0  
2 4  
**Output:** 3  
10  

**Input:** 3 2  
1 1 1  
1 1 2 0 0 1  
2 1  
**Output:** 1  

**Input:** 1 1  
5  
1 1 1 1 0 0  
2 1  
**Output:** 6

## Solution Approach

### Method 1: Segment Tree with Lazy Polynomial
1. Use segment tree for point queries
2. Lazy propagation for polynomial updates
3. Store polynomial coefficients in lazy

## Time Complexity

O((n + q) log n) - Operations.

## Space Complexity

O(n) - Segment tree.

## Edge Cases

- **No updates**: Original values
- **Degree 0**: Constant updates
- **Single point**: Update/query
- **Complex polynomials**: High degrees

## Applications

- **Arrays**: Polynomial updates
- **Lazy Propagation**: Complex updates
- **Point Queries**: Individual values

## Practice Tips

- Segment tree for values
- Lazy for polynomials
- Propagate coefficients
- Evaluate polynomials
