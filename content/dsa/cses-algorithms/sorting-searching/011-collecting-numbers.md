---
title: "Collecting Numbers"
cses: "https://cses.fi/problemset/task/2216"
difficulty: "Easy"
tags: ["implementation", "array"]
---

## Problem

You are given a list of n numbers. In each round, you go through the list and collect all numbers that are not yet collected and are at most the current maximum collected number. What is the minimum number of rounds needed to collect all numbers?

## Example

**Input:** 5  
4 2 1 5 3  
**Output:** 3  

**Input:** 4  
2 1 4 3  
**Output:** 2  

**Input:** 1  
1  
**Output:** 1

## Solution Approach

### Method 1: Track Positions
1. pos = [0] * (n + 1)
2. for i in range(n):
   - pos[a[i]] = i
3. rounds = 1
4. max_pos = pos[1]
5. for i in range(2, n + 1):
   - if pos[i] < max_pos:
     - rounds += 1
     - max_pos = pos[i]
   - else:
     - max_pos = max(max_pos, pos[i])
6. print(rounds)

## Time Complexity

O(n) - Linear.

## Space Complexity

O(n) - Position array.

## Edge Cases

- **Sorted**: 1
- **Reverse**: n
- **Single**: 1
- **Consecutive**: Fewer

## Applications

- **Arrays**: Collection rounds
- **Positions**: Tracking
- **Greedy**: Max position

## Practice Tips

- Find positions
- Track max position
- Increment rounds when needed
- Update max
