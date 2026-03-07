---
title: "Distinct Numbers"
cses: "https://cses.fi/problemset/task/1621"
difficulty: "Easy"
tags: ["implementation", "hash-table"]
---

## Problem

You are given a list of n integers, and your task is to calculate the number of distinct values in the list.

## Example

**Input:** 5  
2 3 2 2 3  
**Output:** 2  

**Input:** 4  
1 1 1 1  
**Output:** 1  

**Input:** 3  
1 2 3  
**Output:** 3

## Solution Approach

### Method 1: Set
1. print(len(set(a)))

## Time Complexity

O(n) - Set insertion.

## Space Complexity

O(n) - Set.

## Edge Cases

- **All same**: 1
- **All distinct**: n
- **Empty**: 0

## Applications

- **Arrays**: Distinct count
- **Hash Tables**: Sets
- **Implementation**: Simple

## Practice Tips

- Use set for uniqueness
- Len of set
- Handle large n
