---
title: "Tasks and Deadlines"
cses: "https://cses.fi/problemset/task/1630"
difficulty: "Easy"
tags: ["implementation", "sorting", "greedy"]
---

## Problem

You have n tasks, each with duration and deadline. Reward for task is max(0, deadline - finish_time). Maximize total reward.

## Example

**Input:** 3  
4 2  
3 5  
2 1  
**Output:** 2  

**Input:** 1  
1 1  
**Output:** 0  

**Input:** 2  
1 2  
1 1  
**Output:** 1

## Solution Approach

### Method 1: Sort by Duration
1. tasks.sort(key=lambda x: x[0])
2. current_time = 0
3. reward = 0
4. for d, ddl in tasks:
   - current_time += d
   - reward += max(0, ddl - current_time)
5. print(reward)

## Time Complexity

O(n log n) - Sorting.

## Space Complexity

O(1) - In-place.

## Edge Cases

- **All on time**: Sum deadlines - total time
- **All late**: 0
- **Single**: max(0, ddl - d)
- **Sorted**: Already

## Applications

- **Scheduling**: Deadlines
- **Greedy**: Shortest first
- **Sums**: Rewards

## Practice Tips

- Sort by duration
- Accumulate time
- Add max(0, ddl - time)
- Maximize reward
