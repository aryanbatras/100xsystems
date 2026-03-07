---
title: "Collecting Numbers II"
cses: "https://cses.fi/problemset/task/2217"
difficulty: "Easy"
tags: ["implementation", "array"]
---

## Problem

You are given a list that contains each number between 1 and n exactly once. Your task is to collect the numbers from 1 to n in increasing order. On each round, you go through the list and collect all numbers that are currently available for collection. What is the minimum number of rounds needed to collect all numbers?

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

### Method 1: Count Increases
1. pos = [0] * (n + 1)
2. for i in range(n):
   - pos[a[i]] = i
3. rounds = 1
4. for i in range(2, n + 1):
   - if pos[i] < pos[i - 1]:
     - rounds += 1
5. print(rounds)

## Time Complexity

O(n) - Linear.

## Space Complexity

O(n) - Position array.

## Edge Cases

- **Sorted**: 1
- **Reverse**: n
- **Consecutive**: 1
- **Single**: 1

## Applications

- **Permutations**: Collection order
- **Arrays**: Position tracking
- **Counting**: Rounds

## Practice Tips

- Find positions
- Count when position decreases
- Increment rounds
- Handle increasing
