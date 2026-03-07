---
title: "Subarray Divisibility"
cses: "https://cses.fi/problemset/task/1662"
difficulty: "Easy"
tags: ["implementation", "prefix-sum", "hash-table", "modulo"]
---

## Problem

Given an array, count the number of subarrays where the sum is divisible by n.

## Example

**Input:** 5  
1 2 3 4 5  
**Output:** 2  

**Input:** 3  
1 1 1  
**Output:** 3  

**Input:** 1  
1  
**Output:** 1

## Solution Approach

### Method 1: Prefix Sum Modulo
1. prefix = 0
2. count = 0
3. map = {0: 1}
4. for num in a:
   - prefix = (prefix + num) % n
   - if prefix in map:
     - count += map[prefix]
   - map[prefix] = map.get(prefix, 0) + 1
5. print(count)

## Time Complexity

O(n) - Linear.

## Space Complexity

O(n) - Map.

## Edge Cases

- **n=1**: All subarrays
- **All divisible**: More
- **No**: 0
- **Empty**: 1 if 0 % n == 0

## Applications

- **Arrays**: Subarray sums mod
- **Prefix Sum**: Modulo
- **Hash Tables**: Remainders

## Practice Tips

- Use prefix sum mod n
- Count same remainders
- Add combinations
- Handle modulo
