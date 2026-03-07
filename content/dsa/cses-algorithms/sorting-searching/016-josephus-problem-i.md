---
title: "Josephus Problem I"
cses: "https://cses.fi/problemset/task/2162"
difficulty: "Easy"
tags: ["implementation", "simulation", "queue"]
---

## Problem

n people are standing in a circle. Every k-th person is eliminated until one remains. Who is the last one?

## Example

**Input:** 5 2  
**Output:** 3  

**Input:** 6 3  
**Output:** 4  

**Input:** 1 1  
**Output:** 1

## Solution Approach

### Method 1: Simulation with List
1. people = list(range(1, n + 1))
2. idx = 0
3. while len(people) > 1:
   - idx = (idx + k - 1) % len(people)
   - people.pop(idx)
4. print(people[0])

## Time Complexity

O(n * k) - Simulation.

## Space Complexity

O(n) - List.

## Edge Cases

- **n=1**: 1
- **k=1**: n
- **k=n**: 1
- **Large n**: Efficient

## Applications

- **Circular**: Elimination
- **Simulation**: Josephus
- **Lists**: Removal

## Practice Tips

- Use list for circle
- Calculate index
- Remove k-1 th
- Last remaining
