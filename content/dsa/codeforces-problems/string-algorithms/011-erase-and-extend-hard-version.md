---
title: "Erase and Extend (Hard Version)"
codeforces: "https://codeforces.com/problemset/problem/758/E"
difficulty: "Hard"
tags: ["string-algorithms", "dp"]
---

## Problem

Erase characters and extend to maximize the string.

## Example

**Input:** abc 2  

**Output:** abcabc  

## Solution Approach

### Method 1: DP

DP[i][j] = max length using first i chars, j erases.

## Time Complexity

O(n^2)

## Space Complexity

O(n^2)

## Edge Cases

- No erase

## Applications

- String optimization

## Practice Tips

- DP table
