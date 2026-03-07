---
title: "Palindrome Partitioning 1"
leetcode: "https://leetcode.com/problems/palindrome-partitioning/"
difficulty: "Medium"
tags: ["backtracking", "string"]
---

## Problem

Given a string s, partition s such that every substring of the partition is a palindrome. Return all possible palindrome partitioning of s.

## Example

**Input:** s = "aab"  
**Output:** [["a","a","b"],["aa","b"]]  

**Input:** s = "a"  
**Output:** [["a"]]  

**Input:** s = "aa"  
**Output:** [["a","a"],["aa"]]

## Solution Approach

### Method 1: Backtracking
1. result = []
2. def backtrack(start, path):
   - if start == len(s):
     - result.append(path[:])
     - return
   - for end in range(start + 1, len(s) + 1):
     - substring = s[start:end]
     - if substring == substring[::-1]:
       - path.append(substring)
       - backtrack(end, path)
       - path.pop()
3. backtrack(0, [])
4. return result

## Time Complexity

O(2^n * n) - Exponential partitions.

## Space Complexity

O(n) - Recursion stack.

## Edge Cases

- **Single character**: [["a"]]
- **All palindromes**: Many partitions
- **No partitions**: Only single chars
- **Empty string**: [[]]

## Applications

- **String Partitioning**: Palindrome splits
- **Backtracking**: Exhaustive search
- **Combinatorics**: Palindrome combinations
- **Interview Questions**: Common

## Practice Tips

- Check palindrome condition
- Use backtracking for partitions
- Collect all valid paths
- Optimize with DP for palindrome check
