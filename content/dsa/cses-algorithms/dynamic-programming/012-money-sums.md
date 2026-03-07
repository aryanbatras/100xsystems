---
title: "Money Sums"
cses: "https://cses.fi/problemset/task/1745"
difficulty: "Easy"
tags: ["implementation", "dynamic-programming", "bitset"]
---

## Problem

Find all possible sums with given coins.

## Example

**Input:** 4  
4 2 5 2  
**Output:** 13  
2 4 5 6 7 8 9 10 11 13 14 15 16  

**Input:** 1  
10  
**Output:** 1  
10  

**Input:** 2  
1 1  
**Output:** 2  
1 2

## Solution Approach

### Method 1: DP Set
1. possible = set([0])
2. for coin in x:
   - new_sums = set()
   - for s in possible:
     - new_sums.add(s + coin)
   - possible.update(new_sums)
3. print(len(possible) - 1)
4. print(' '.join(map(str, sorted(list(possible))[1:])))

## Time Complexity

O(n * sum) - Worst.

## Space Complexity

O(sum) - Set.

## Edge Cases

- **One coin**: 0 and coin
- **Duplicates**: Unique sums
- **Zero coin**: Not
- **Large sum**: DP

## Applications

- **Subsets**: Sum possibilities
- **DP**: Bitset or set
- **Coins**: All sums

## Practice Tips

- Use set for sums
- Add new sums
- Sort output
- Exclude 0
