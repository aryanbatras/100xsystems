---
title: "Find a Pair with Given Difference"
geeksforgeeks: "https://www.geeksforgeeks.org/find-a-pair-with-the-given-difference/"
difficulty: "Medium"
tags: ["array", "hashing"]
---

## Problem

Given an array arr[] of n integers and a number k, find if there exists a pair of elements in the array whose difference is k.

## Example

**Input:** arr = [5, 20, 3, 2, 50, 80], k=78  
**Output:** Yes (80 - 2 = 78)  

**Input:** arr = [90, 70, 20, 80, 50], k=45  
**Output:** No  

**Input:** arr = [1, 5, 3, 4, 2], k=3  
**Output:** Yes (5 - 2 = 3)

## Solution Approach

### Method 1: Brute Force
1. For each pair (i, j) where i < j:
   - If abs(arr[i] - arr[j]) == k, return true
2. Return false

### Method 2: Sorting + Two Pointers
1. Sort the array
2. Initialize i = 0, j = 1
3. While i < n and j < n:
   - If arr[j] - arr[i] == k, return true
   - Else if arr[j] - arr[i] < k, j++
   - Else i++
4. Return false

### Method 3: Hash Set (Optimal)
1. Create a set and insert all elements
2. For each element num in arr:
   - If num + k is in set or num - k is in set, return true
3. Return false

## Time Complexity

O(n) for hash set, O(n^2) for brute force.

## Space Complexity

O(n) for hash set.

## Edge Cases

- **k = 0**: Check for duplicate elements
- **k negative**: Treat as positive difference
- **No pair**: Return false
- **Multiple pairs**: Return true

## Applications

- **Pair Finding**: Find pairs with specific difference
- **Data Analysis**: Identify related elements
- **Algorithm Problems**: Common coding interview question
- **Optimization**: Efficient pair detection

## Practice Tips

- Handle k = 0 case carefully
- Consider duplicates in the array
- Choose appropriate method based on constraints
- Practice with different k values
