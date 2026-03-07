---
title: "Tree Isomorphism I"
cses: "https://cses.fi/problemset/task/1700"
difficulty: "Medium"
tags: ["implementation", "tree", "isomorphism", "dfs"]
---

## Problem

Check if two trees are isomorphic.

## Example

**Input:** 4 4  
1 2  
1 3  
3 4  
1 2  
2 3  
2 4  
**Output:** YES  

## Solution Approach

### Method 1: Canonical Labeling with DFS
def dfs(node, parent):

    children = []

    for child in graph[node]:

        if child != parent:

            children.append(dfs(child, node))

    children.sort()

    return tuple(children)

canon1 = dfs(1, -1)

canon2 = dfs(1, -1)

print("YES" if canon1 == canon2 else "NO")

## Time Complexity

O(n log n) - Sorting.

## Space Complexity

O(n).

## Edge Cases

- **Single node**: YES

- **Different sizes**: NO

- **Same structure**: YES

- **Different labels**: YES

## Applications

- **Trees**: Isomorphism

- **Canonical**: Labeling

- **Comparison**: Structure

## Practice Tips

- DFS for subtrees

- Sort children

- Compare tuples

- Handle roots
