---
title: "Permutations"
cses: "https://cses.fi/problemset/task/1070"
difficulty: "Easy"
tags: ["implementation", "constructive"]
---

## Problem

Construct a permutation of numbers 1 to n such that no two adjacent numbers in the permutation are consecutive numbers.

## Example

**Input:** 4  
**Output:** 2 4 1 3  

**Input:** 3  
**Output:** 2 3 1  

**Input:** 1  
**Output:** 1

## Solution Approach

### Method 1: Constructive
1. if n == 1: print 1
2. elif n < 4: print "NO SOLUTION"
3. else:
   - evens = [i for i in range(2, n+1, 2)]
   - odds = [i for i in range(1, n+1, 2)]
   - result = evens + odds
   - print result

## Time Complexity

O(n) - List creation.

## Space Complexity

O(n) - Lists.

## Edge Cases

- **n=1**: 1
- **n=2**: Impossible
- **n=3**: 2 3 1
- **n>=4**: Evens then odds

## Applications

- **Constructive**: Permutations
- **Graphs**: Non-adjacent
- **Implementation**: List manipulation

## Practice Tips

- Handle small n
- Separate evens and odds
- Concatenate
