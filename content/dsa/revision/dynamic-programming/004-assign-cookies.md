---
title: "Assign Cookies"
leetcode: "https://leetcode.com/problems/assign-cookies/"
difficulty: "Easy"
tags: ["array", "two-pointers", "greedy", "sorting"]
---

## Problem

Assume you are an awesome parent and want to give your children some cookies. But, you should give each child at most one cookie. Each child i has a greed factor g[i], which is the minimum size of a cookie that the child will be content with; and each cookie j has a size s[j]. If s[j] >= g[i], we can assign the cookie j to the child i, and the child i will be content. Your goal is to maximize the number of your content children and output the maximum number.

## Example

**Input:** g = [1,2,3], s = [1,1]  
**Output:** 1  

**Input:** g = [1,2], s = [1,2,3]  
**Output:** 2  

**Input:** g = [1,2,3], s = []  
**Output:** 0

## Solution Approach

### Method 1: Greedy Sort
1. g.sort()
2. s.sort()
3. i = j = 0
4. count = 0
5. while i < len(g) and j < len(s):
   - if s[j] >= g[i]:
     - count += 1
     - i += 1
   - j += 1
6. return count

## Time Complexity

O(n log n) - Sorting.

## Space Complexity

O(1) - No extra space.

## Edge Cases

- **No cookies**: 0
- **No children**: 0
- **All match**: Min(len(g), len(s))
- **Greed > size**: Skip

## Applications

- **Greedy Algorithms**: Assignment
- **Two Pointers**: Sorted arrays
- **Optimization**: Max content
- **Interview Questions**: Easy

## Practice Tips

- Sort greed and sizes
- Two pointers
- Assign if possible
- Count satisfied
