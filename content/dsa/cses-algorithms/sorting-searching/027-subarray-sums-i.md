---
title: "Subarray Sums I"
cses: "https://cses.fi/problemset/task/1660"
difficulty: "Easy"
tags: ["implementation", "prefix-sum", "hash-table"]
---

## Problem

Given an array and a target sum x, count the number of subarrays with sum x.

## Example

**Input:** 5 7  
1 2 3 4 5  
**Output:** 2  

**Input:** 3 6  
1 2 3  
**Output:** 1  

**Input:** 1 0  
0  
**Output:** 1

## Solution Approach

### Method 1: Prefix Sum
1. prefix = 0
2. count = 0
3. map = {0: 1}
4. for num in a:
   - prefix += num
   - if prefix - x in map:
     - count += map[prefix - x]
   - map[prefix] = map.get(prefix, 0) + 1
5. print(count)

## Time Complexity

O(n) - Linear.

## Space Complexity

O(n) - Map.

## Edge Cases

- **No subarray**: 0
- **Whole array**: 1 if sum == x
- **Empty subarray**: If x=0, but usually not
- **Negative numbers**: Ok

## Applications

- **Arrays**: Subarray sums
- **Prefix Sum**: Efficient count
- **Hash Tables**: Frequency

## Practice Tips

- Use prefix sums
- Map for previous sums
- Count occurrences
- Handle zero sum
