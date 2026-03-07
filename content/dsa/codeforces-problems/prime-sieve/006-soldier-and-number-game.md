---
title: "Soldier and Number Game"
codeforces: "https://codeforces.com/problemset/problem/27/C"
difficulty: "Medium"
tags: ["greedy", "constructive"]
---

## Problem

Find the shortest subsequence that is not ordered.

## Example

**Input:** 5  
6 4 9 6 0 0 2 3  
**Output:** 3  
1 3 5  

## Solution Approach

### Method 1: Find violation

Look for indices where sequence breaks monotonicity.

## Time Complexity

O(n)

## Space Complexity

O(1)

## Edge Cases

- Already ordered: 0

## Applications

- Sequence analysis

## Practice Tips

- Check for increase and decrease
