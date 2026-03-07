---
title: "Count number of subarrays with given xor K"
difficulty: "Medium"
tags: ["array", "hash-table", "bit-manipulation", "prefix-sum"]
---

## Problem

Given an array of integers and an integer k, find the number of subarrays whose XOR is equal to k.

## Example

**Input:** nums = [4,2,2,6,4], k = 6  
**Output:** 4  

**Input:** nums = [5,6,7,8,9], k = 5  
**Output:** 2  

**Input:** nums = [1,1,1], k = 2  
**Output:** 0

## Solution Approach

### Method 1: Prefix XOR
1. xor = 0
2. count = 0
3. map = {0: 1}
4. for num in nums:
   - xor ^= num
   - if xor ^ k in map:
     - count += map[xor ^ k]
   - map[xor] = map.get(xor, 0) + 1
5. return count

## Time Complexity

O(n) - Linear.

## Space Complexity

O(n) - Hash map.

## Edge Cases

- **k = 0**: Subarrays with XOR 0
- **No subarrays**: 0
- **All elements same**: Depending on k
- **Empty array**: 0

## Applications

- **XOR Problems**: Subarray XOR
- **Prefix XOR**: Efficient counting
- **Hash Tables**: Frequency map
- **Interview Questions**: Common

## Practice Tips

- Use prefix XOR
- Check xor ^ k
- Update map
- Handle edge cases
