---
title: "Distinct Colors"
cses: "https://cses.fi/problemset/task/1139"
difficulty: "Medium"
tags: ["implementation", "tree", "euler-tour", "mo-algorithm", "distinct-count"]
---

## Problem

Count distinct colors in subtree.

## Example

**Input:** 5  
2 3 2 2 1  
1 2  
1 3  
3 4  
3 5  
**Output:** 2 3 2 1 1  

**Input:** 3  
1 1 1  
1 2  
1 3  
**Output:** 1 1 1  

**Input:** 1  
1  
**Output:** 1

## Solution Approach

### Method 1: Euler Tour + Mo's Algorithm
1. Perform Euler tour to get entry and exit times
2. Each subtree corresponds to a range [entry[u], exit[u]]
3. Use Mo's algorithm on the Euler tour array for offline queries
4. Maintain count of colors in current window
5. For each query, output the distinct count

## Time Complexity

O(n √n) - Mo's algorithm.

## Space Complexity

O(n) - Euler tour and arrays.

## Edge Cases

- **Single color**: 1
- **All distinct**: Subtree size
- **Root subtree**: All colors
- **Leaf subtree**: 1

## Applications

- **Trees**: Subtree queries
- **Mo's Algorithm**: Offline queries
- **Distinct Counting**: Window distinct

## Practice Tips

- Euler tour for ranges
- Mo's algorithm setup
- Add/remove for distinct
- Handle subtree queries
