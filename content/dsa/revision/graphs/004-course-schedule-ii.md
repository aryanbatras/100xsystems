---
title: "Course Schedule - II"
leetcode: "https://leetcode.com/problems/course-schedule-ii/"
difficulty: "Medium"
tags: ["depth-first-search", "breadth-first-search", "graph", "topological-sort"]
---

## Problem

There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai. Return the ordering of courses you should take to finish all courses. If there are many valid answers, return any of them. If it is impossible to finish all courses, return an empty array.

## Example

**Input:** numCourses = 2, prerequisites = [[1,0]]  
**Output:** [0,1]  

**Input:** numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]  
**Output:** [0,2,1,3] or [0,1,2,3]  

**Input:** numCourses = 2, prerequisites = [[1,0],[0,1]]  
**Output:** []

## Solution Approach

### Method 1: Kahn's Algorithm
1. from collections import deque
2. indegree = [0] * numCourses
3. graph = [[] for _ in range(numCourses)]
4. for a, b in prerequisites:
   - graph[b].append(a)
   - indegree[a] += 1
5. queue = deque([i for i in range(numCourses) if indegree[i] == 0])
6. result = []
7. while queue:
   - course = queue.popleft()
   - result.append(course)
   - for nei in graph[course]:
     - indegree[nei] -= 1
     - if indegree[nei] == 0:
       - queue.append(nei)
8. return result if len(result) == numCourses else []

## Time Complexity

O(n + e) - Nodes and edges.

## Space Complexity

O(n + e) - Graph and indegree.

## Edge Cases

- **No prerequisites**: Any order
- **Cycle**: []
- **Single course**: [0]
- **Multiple orders**: Any valid

## Applications

- **Graph Problems**: Topological sort
- **BFS**: Kahn's algorithm
- **Dependencies**: Course scheduling
- **Interview Questions**: Medium

## Practice Tips

- Build graph and indegree
- Queue zero indegree
- Process and reduce indegree
- Check all courses
