---
title: "Subarray Distinct Values"
cses: "https://cses.fi/problemset/task/1666"
difficulty: "Easy"
tags: ["implementation", "sliding-window", "hash-table"]
---

## Problem

Given an array and k, count the number of subarrays with at most k distinct elements.

## Example

**Input:** 5 2  
1 2 3 1 1  
**Output:** 12  

**Input:** 3 1  
1 1 1  
**Output:** 6  

**Input:** 1 1  
1  
**Output:** 1

## Solution Approach

### Method 1: Sliding Window
1. from collections import defaultdict
2. count = defaultdict(int)
3. left = 0
4. distinct = 0
5. result = 0
6. for right in range(len(a)):
   - if count[a[right]] == 0:
     - distinct += 1
   - count[a[right]] += 1
   - while distinct > k and left <= right:
     - count[a[left]] -= 1
     - if count[a[left]] == 0:
       - distinct -= 1
     - left += 1
   - result += right - left + 1
7. print(result)

## Time Complexity

O(n) - Linear.

## Space Complexity

O(n) - Map.

## Edge Cases

- **k=0**: 0
- **k>= distinct**: All subarrays
- **All same**: All
- **k=1**: Runs of same

## Applications

- **Arrays**: Distinct in window
- **Sliding Window**: Variable
- **Hash Tables**: Counts

## Practice Tips

- Expand right
- Shrink left when >k
- Add window sizes
- Track distinct count
