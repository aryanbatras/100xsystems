---
title: "Range Xor Queries"
cses: "https://cses.fi/problemset/task/1650"
difficulty: "Easy"
tags: ["implementation", "prefix-xor"]
---

## Problem

Given an array and multiple range XOR queries, compute the XOR of elements from l to r.

## Example

**Input:** 4 3  
1 3 4 8  
1 2  
2 4  
1 4  
**Output:** 2  
15  
14  

**Input:** 5 2  
1 1 1 1 1  
1 5  
2 4  
**Output:** 1  
1  

**Input:** 1 1  
10  
1 1  
**Output:** 10

## Solution Approach

### Method 1: Prefix XOR
1. prefix = [0]
2. for num in a:
   - prefix.append(prefix[-1] ^ num)
3. for l, r in queries:
   - print(prefix[r] ^ prefix[l-1])

## Time Complexity

O(n + q) - Prefix + queries.

## Space Complexity

O(n) - Prefix array.

## Edge Cases

- **l = 1**: prefix[r]
- **r = n**: prefix[n] ^ prefix[l-1]
- **Single element**: a[l-1]
- **Whole array**: prefix[n]

## Applications

- **Arrays**: Range XOR
- **Prefix XOR**: Efficient queries
- **Bit Manipulation**: XOR properties

## Practice Tips

- Build prefix XOR
- Query with XOR
- Handle 1-based indexing
- XOR is associative
