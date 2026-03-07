---
title: "Task Scheduler"
leetcode: "https://leetcode.com/problems/task-scheduler/"
difficulty: "Medium"
tags: ["array", "hash-table", "greedy", "sorting", "heap", "priority-queue"]
---

## Problem

Given a characters array tasks, representing the tasks a CPU needs to do, where each letter represents a different task. Tasks could be done in any order. Each task is done in one unit of time. For each unit of time, the CPU could complete either one task or just be idle. However, there is a non-negative integer n that represents the cooldown period between two same tasks (the same letter in the array), that is that there must be at least n units of time between any two same tasks. Return the least number of units of times that the CPU will take to finish all the tasks.

## Example

**Input:** tasks = ["A","A","A","B","B","B"], n = 2  
**Output:** 8  

**Input:** tasks = ["A","A","A","B","B","B"], n = 0  
**Output:** 6  

**Input:** tasks = ["A","B","C"], n = 2  
**Output:** 3

## Solution Approach

### Method 1: Max Heap
1. count = Counter(tasks)
2. max_heap = [-cnt for cnt in count.values()]
3. heapq.heapify(max_heap)
4. time = 0
5. while max_heap:
   - temp = []
   - for _ in range(min(len(max_heap), n + 1)):
     - cnt = -heapq.heappop(max_heap)
     - if cnt > 1:
       - temp.append(-(cnt - 1))
   - time += n + 1 if temp else 1
   - for t in temp:
     - heapq.heappush(max_heap, t)
6. return time

## Time Complexity

O(n log m) - n tasks, m unique.

## Space Complexity

O(m) - Heap.

## Edge Cases

- **n = 0**: Length of tasks
- **All same**: (count-1)*(n+1) + 1
- **No cooldown**: Sum counts
- **Single task**: 1

## Applications

- **Scheduling Problems**: CPU tasks
- **Heap**: Frequency management
- **Greedy**: Max first
- **Interview Questions**: Medium

## Practice Tips

- Count frequencies
- Use max heap
- Process cycles of n+1
- Handle remaining tasks
