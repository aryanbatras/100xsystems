---
title: "Find the Repeating and Missing Number"
geeksforgeeks: "https://www.geeksforgeeks.org/find-a-repeating-and-a-missing-number/"
difficulty: "Medium"
tags: ["array", "math", "bit-manipulation"]
---

## Problem

Given an unsorted array of size n, where array elements are in the range from 1 to n. One number from set {1, 2, ..., n} is missing and one number occurs twice in the array. Find these two numbers.

## Example

**Input:** arr = [3,1,3], n=3  
**Output:** Missing: 2, Repeating: 3  

**Input:** arr = [4,3,6,2,1,1], n=6  
**Output:** Missing: 5, Repeating: 1  

**Input:** arr = [1,2,3,4,5,6,7,7], n=8  
**Output:** Missing: 8, Repeating: 7

## Solution Approach

### Method 1: Using Sum and Sum of Squares
1. Calculate actual_sum = sum(arr), expected_sum = n*(n+1)/2
2. diff = expected_sum - actual_sum  # missing - repeating
3. Calculate actual_sum_sq = sum(arr[i]*arr[i]), expected_sum_sq = n*(n+1)*(2*n+1)/6
4. diff_sq = expected_sum_sq - actual_sum_sq  # missing^2 - repeating^2
5. missing = (diff + diff_sq/diff)/2
6. repeating = missing - diff

### Method 2: Using XOR
1. XOR all array elements: xor_arr = 0
2. XOR with 1 to n: xor_total = xor_arr ^ (xor from 1 to n)
3. xor_total = missing ^ repeating
4. Find rightmost set bit: bit = xor_total & -xor_total
5. XOR elements in arr and 1 to n where bit is set: xor_set = 0
6. XOR elements where bit is not set: xor_unset = 0
7. If xor_set ^ xor_unset == 0, then missing is in set, repeating in unset, else vice versa

## Time Complexity

O(n) - Single pass for XOR, or calculations.

## Space Complexity

O(1) - Constant space.

## Edge Cases

- **Repeating at start**: Handle correctly
- **Missing at end**: Handle correctly
- **n = 2**: Simple cases
- **All correct except one repeat and miss**: General case

## Applications

- **Data Integrity**: Find duplicates and missing in sequences
- **Error Detection**: Identify corrupted data
- **Array Validation**: Check for anomalies
- **Mathematical Puzzles**: Common problem type

## Practice Tips

- Implement both math and XOR methods
- Be careful with integer division
- Handle large n for sum calculations
- Practice with small examples
