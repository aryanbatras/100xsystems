---
title: "Restaurant Customers"
cses: "https://cses.fi/problemset/task/1619"
difficulty: "Easy"
tags: ["implementation", "sorting", "events"]
---

## Problem

You are given the arrival and leaving times of n customers in a restaurant. What was the maximum number of customers in the restaurant at any time?

## Example

**Input:** 3  
5 8  
2 4  
3 9  
**Output:** 2  

**Input:** 2  
1 3  
2 4  
**Output:** 2  

**Input:** 1  
1 2  
**Output:** 1

## Solution Approach

### Method 1: Events
1. events = []
2. for a, l in times:
   - events.append((a, 1))
   - events.append((l, -1))
3. events.sort()
4. current = 0
5. max_c = 0
6. for time, type in events:
   - current += type
   - max_c = max(max_c, current)
7. print(max_c)

## Time Complexity

O(n log n) - Sorting.

## Space Complexity

O(n) - Events.

## Edge Cases

- **No overlap**: 1
- **All overlap**: n
- **Single customer**: 1
- **Depart before arrive**: Invalid, but assume valid

## Applications

- **Intervals**: Overlaps
- **Events**: Sweep line
- **Sorting**: Times

## Practice Tips

- Create events for arrive and leave
- Sort by time
- Track current count
- Max current
