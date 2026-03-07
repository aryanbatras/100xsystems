---
title: "Swap Round Sorting"
cses: "https://cses.fi/problemset/task/1697"
difficulty: "Medium"
tags: ["implementation", "sorting", "bubble-sort", "rounds"]
---

## Problem

Sort with minimum swap rounds.

## Example

**Input:** 5  
5 4 3 2 1  
**Output:** 4  
2 3  
4 5  
3 4  
1 2  

## Solution Approach

### Method 1: Bubble Sort Rounds
rounds = []
for i in range(n):
    current_round = []
    for j in range(n - i - 1):
        if a[j] > a[j + 1]:
            a[j], a[j + 1] = a[j + 1], a[j]
            current_round.append(j + 1)
    if current_round:
        rounds.append(current_round)

print(len(rounds))
for round in rounds:
    print(len(round), *round)

## Time Complexity

O(n^2) - Bubble sort.

## Space Complexity

O(n).

## Edge Cases

- **Sorted**: 0 rounds
- **Reverse**: n-1 rounds
- **Duplicates**: Same
- **Small n**: Few rounds

## Applications

- **Sorting**: Bubble sort
- **Rounds**: Swap groups
- **Algorithms**: Simulation

## Practice Tips

- Bubble sort
- Collect swaps per pass
- Output rounds
- Handle sorted
