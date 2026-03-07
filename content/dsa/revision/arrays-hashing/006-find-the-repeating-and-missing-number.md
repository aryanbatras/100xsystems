---
title: "Find the repeating and missing number"
difficulty: "Medium"
tags: ["array", "math", "bit-manipulation"]
---

## Problem

You are given an array of size n containing numbers from 1 to n, with one number missing and one number repeating. Find the repeating and missing numbers.

## Example

**Input:** nums = [3,1,3]  
**Output:** [3,2]  

**Input:** nums = [4,3,6,2,1,1]  
**Output:** [1,5]  

**Input:** nums = [1,2,2]  
**Output:** [2,3]

## Solution Approach

### Method 1: Math
1. n = len(nums)
2. sum_expected = n * (n + 1) // 2
3. sum_actual = sum(nums)
4. sum_sq_expected = n * (n + 1) * (2 * n + 1) // 6
5. sum_sq_actual = sum(x * x for x in nums)
6. diff = sum_expected - sum_actual  # missing - repeating
7. sum_diff = sum_sq_expected - sum_sq_actual  # missing^2 - repeating^2
8. missing = (sum_diff // diff + diff) // 2
9. repeating = missing - diff
10. return [repeating, missing]

### Method 2: XOR
1. n = len(nums)
2. xor_all = 0
3. for i in range(1, n + 1):
   - xor_all ^= i
4. for num in nums:
   - xor_all ^= num
5. # xor_all = missing ^ repeating
6. set_bit = xor_all & -xor_all
7. xor1 = 0
8. xor2 = 0
9. for i in range(1, n + 1):
   - if i & set_bit:
     - xor1 ^= i
   - else:
     - xor2 ^= i
10. for num in nums:
    - if num & set_bit:
      - xor1 ^= num
    - else:
      - xor2 ^= num
11. # xor1 is missing or repeating, xor2 the other
12. if xor1 in nums:
    - repeating = xor1
    - missing = xor2
13. else:
    - repeating = xor2
    - missing = xor1
14. return [repeating, missing]

## Time Complexity

O(n) - Linear.

## Space Complexity

O(1) - Constant.

## Edge Cases

- **n = 2**: [2,1] or [1,2]
- **Repeating at end**: Handle
- **Missing at start**: Handle
- **Consecutive**: Ok

## Applications

- **Array Problems**: Missing and repeating
- **Math**: Sum formulas
- **Bit Manipulation**: XOR
- **Interview Questions**: Common

## Practice Tips

- Use sum and sum squares
- Or XOR for bit approach
- Find set bit
- Separate into groups
