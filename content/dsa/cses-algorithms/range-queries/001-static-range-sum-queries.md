---
title: "Static Range Sum Queries"
cses: "https://cses.fi/problemset/task/1646"
difficulty: "Easy"
tags: ["implementation", "prefix-sum"]
---

## Problem

Given an array and multiple range sum queries, compute the sum of elements from l to r.

## Example

**Input:** 8 4  
1 2 3 4 5 6 7 8  
2 5  
3 3  
1 8  
2 2  
**Output:** 14  
3  
36  
2  

**Input:** 5 3  
1 1 1 1 1  
1 5  
2 4  
3 3  
**Output:** 5  
3  
1  

**Input:** 1 1  
10  
1 1  
**Output:** 10

## Solution Approach

### Method 1: Prefix Sum
1. prefix = [0]
2. for num in a:
   - prefix.append(prefix[-1] + num)
3. for l, r in queries:
   - print(prefix[r] - prefix[l-1])

## Time Complexity

O(n + q) - Prefix + queries.

## Space Complexity

O(n) - Prefix array.

## Edge Cases

- **l = 1**: prefix[r]
- **r = n**: prefix[n] - prefix[l-1]
- **Single element**: a[l-1]
- **No queries**: Ok

## Applications

- **Arrays**: Range sums
- **Prefix Sum**: Efficient queries
- **Static**: No updates

## Practice Tips

- Build prefix sums
- Query in O(1)
- Handle 1-based indexing
- Output sums
