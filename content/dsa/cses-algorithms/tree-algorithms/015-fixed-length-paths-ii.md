---
title: "Fixed-Length Paths II"
cses: "https://cses.fi/problemset/task/2414"
difficulty: "Hard"
tags: ["implementation", "tree", "centroid-decomposition", "paths", "length-k"]
---

## Problem

Count paths of exactly length k in tree.

## Example

**Input:** 5 2  
1 2  
2 3  
3 4  
4 5  
1  
2  
**Output:** 4  
1  

**Input:** 3 1  
1 2  
2 3  
1  
**Output:** 2  

**Input:** 1 1  
0  
**Output:** 1

## Solution Approach

### Method 1: Centroid Decomposition
1. def decompose(node, parent):

   - centroid = find_centroid(node)

   - # Process centroid

   - # Count paths through centroid

   - # Use maps for distances from centroid

   - for child in graph[centroid]:

     - if child != parent:

       - decompose(child, centroid)

2. # For each centroid, count pairs at distance k

3. # Use map to store counts of distances in subtrees

4. # Combine for paths through centroid

## Time Complexity

O(n log n) - Centroid decomposition.

## Space Complexity

O(n) - Maps and recursion.

## Edge Cases

- **k=0**: n
- **k=1**: Edges
- **No paths**: 0
- **Large k**: Few paths

## Applications

- **Trees**: Path lengths
- **Centroid Decomposition**: Divide and conquer
- **Distance Queries**: Path counts

## Practice Tips

- Centroid finding
- Distance maps
- Combine counts
- Handle through-centroid paths
