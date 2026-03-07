---
title: "Josephus Problem II"
cses: "https://cses.fi/problemset/task/2163"
difficulty: "Easy"
tags: ["implementation", "simulation", "queue"]
---

## Problem

n people are standing in a circle. Every k-th person is eliminated, and you need to print the order of elimination.

## Example

**Input:** 5 2  
**Output:** 2 4 1 5 3  

**Input:** 6 3  
**Output:** 3 6 4 2 5 1  

**Input:** 1 1  
**Output:** 1

## Solution Approach

### Method 1: Simulation with List
1. people = list(range(1, n + 1))
2. idx = 0
3. order = []
4. while people:
   - idx = (idx + k - 1) % len(people)
   - order.append(people.pop(idx))
5. print(' '.join(map(str, order)))

## Time Complexity

O(n * k) - Simulation.

## Space Complexity

O(n) - List.

## Edge Cases

- **n=1**: 1
- **k=1**: 1 to n
- **k=n**: n, then 1 to n-1
- **Large n**: Careful

## Applications

- **Circular**: Elimination order
- **Simulation**: Josephus
- **Lists**: Removal

## Practice Tips

- Use list for circle
- Calculate index
- Collect eliminated
- Print order
