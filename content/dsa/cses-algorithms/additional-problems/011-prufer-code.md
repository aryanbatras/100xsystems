---
title: "Prufer Code"
cses: "https://cses.fi/problemset/task/1134"
difficulty: "Medium"
tags: ["implementation", "tree", "prufer-code", "encoding"]
---

## Problem

Encode tree using Prufer code.

## Example

**Input:** 5  
1 2  
1 3  
3 4  
3 5  
**Output:** 3 3  

## Solution Approach

### Method 1: Prufer Code Construction
import heapq

degree = [0] * (n+1)

for u, v in edges:
    degree[u] += 1
    degree[v] += 1

pq = []
for i in range(1, n+1):
    if degree[i] == 1:
        heapq.heappush(pq, i)

code = []
while len(code) < n-2:
    leaf = heapq.heappop(pq)
    # Find neighbor with degree > 0
    for nei in graph[leaf]:
        if degree[nei] > 0:
            code.append(nei)
            degree[nei] -= 1
            if degree[nei] == 1:
                heapq.heappush(pq, nei)
            break
    degree[leaf] = 0

print(' '.join(map(str, code)))

## Time Complexity

O(n log n) - Priority queue.

## Space Complexity

O(n).

## Edge Cases

- **Single edge**: Empty code
- **Star**: Root repeated
- **Line**: Alternating
- **n=2**: Empty

## Applications

- **Trees**: Encoding
- **Prufer Code**: Unique representation
- **Combinatorics**: Tree counting

## Practice Tips

- Priority queue for leaves
- Remove leaves
- Build code
- Handle degrees
