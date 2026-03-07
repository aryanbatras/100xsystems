---
title: "Course Schedule"
cses: "https://cses.fi/problemset/task/1679"
difficulty: "Easy"
tags: ["implementation", "graph", "topological-sort"]
---

## Problem

Check if course schedule is possible, i.e., no cycles.

## Example

**Input:** 4 3  
1 2  
2 3  
3 4  
**Output:** YES  

**Input:** 4 4  
1 2  
2 3  
3 1  
1 4  
**Output:** NO  

**Input:** 1 0  
**Output:** YES

## Solution Approach

### Method 1: Kahn's Algorithm
1. from collections import deque
2. indegree = [0] * (n + 1)
3. graph = [[] for _ in range(n + 1)]
4. for a, b in prerequisites:
   - graph[a].append(b)
   - indegree[b] += 1
5. queue = deque([i for i in range(1, n+1) if indegree[i] == 0])
6. count = 0
7. while queue:
   - u = queue.popleft()
   - count += 1
   - for v in graph[u]:
     - indegree[v] -= 1
     - if indegree[v] == 0:
       - queue.append(v)
8. print("YES" if count == n else "NO")

## Time Complexity

O(n + m) - Kahn's.

## Space Complexity

O(n + m) - Graph.

## Edge Cases

- **No prerequisites**: YES
- **Cycle**: NO
- **Linear**: YES
- **Disconnected**: If no cycles, YES

## Applications

- **Graph**: Topological
- **Dependencies**: Courses
- **Cycles**: Detection

## Practice Tips

- Build indegree
- Queue zero indegree
- Process and reduce
- Check all processed
