---
title: "Movie Festival II"
cses: "https://cses.fi/problemset/task/1632"
difficulty: "Medium"
tags: ["implementation", "sorting", "greedy", "priority-queue"]
---

## Problem

Select k movies to maximize total reward, reward = max(0, w - start), no overlap.

## Example

**Input:** 5 2  
1 5 3  
8 10 4  
3 6 2  
2 4 1  
1 3 1  
**Output:** 6  

**Input:** 3 1  
1 2 3  
2 3 4  
3 4 5  
**Output:** 3  

**Input:** 2 2  
1 2 1  
2 3 1  
**Output:** 2

## Solution Approach

### Method 1: Sort by End, Priority Queue
1. movies.sort(key=lambda x: x[1])
2. import heapq
3. pq = []
4. result = 0
5. for s, e, w in movies:
   - reward = w - s
   - if reward <= 0:
     - continue
   - if len(pq) < k:
     - heapq.heappush(pq, reward)
     - result += reward
   - elif pq and reward > pq[0]:
     - result -= heapq.heappop(pq)
     - heapq.heappush(pq, reward)
     - result += reward
6. print(result)

## Time Complexity

O(n log n) - Sorting and heap.

## Space Complexity

O(n) - Heap.

## Edge Cases

- **k=0**: 0
- **k>=n**: Sum positive
- **No positive**: 0
- **Overlap**: Greedy

## Applications

- **Intervals**: Selection with rewards
- **Greedy**: Max reward
- **Priority Queue**: Min heap

## Practice Tips

- Sort by end time
- Use min heap for rewards
- Keep k best
- Maximize sum
