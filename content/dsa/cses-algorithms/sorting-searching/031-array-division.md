---
title: "Array Division"
cses: "https://cses.fi/problemset/task/1085"
difficulty: "Easy"
tags: ["implementation", "binary-search"]
---

## Problem

Divide the array into k subarrays such that the maximum sum of any subarray is minimized.

## Example

**Input:** 5 3  
2 4 7 3 5  
**Output:** 8  

**Input:** 4 2  
1 2 3 4  
**Output:** 6  

**Input:** 1 1  
10  
**Output:** 10

## Solution Approach

### Method 1: Binary Search
1. left = max(a)
2. right = sum(a)
3. while left < right:
   - mid = (left + right) // 2
   - if can_divide(a, k, mid):
     - right = mid
   - else:
     - left = mid + 1
4. print(left)

5. def can_divide(a, k, max_sum):
   - current = 0
   - groups = 1
   - for num in a:
     - if current + num > max_sum:
       - groups += 1
       - current = num
       - if groups > k:
         - return False
     - else:
       - current += num
   - return True

## Time Complexity

O(n log sum) - Binary search.

## Space Complexity

O(1) - Constant.

## Edge Cases

- **k=1**: Sum
- **k=n**: Max
- **Sorted**: Ok
- **Large sum**: Binary

## Applications

- **Arrays**: Division
- **Binary Search**: On max sum
- **Greedy**: Grouping

## Practice Tips

- Binary search on max sum
- Check if can divide into k groups
- Minimize max sum
- Adjust bounds
