---
title: "Good Substrings"
codeforces: "https://codeforces.com/problemset/problem/271/D"
difficulty: "Medium"
tags: ["string-algorithms", "sliding window"]
---

## Problem

Count substrings with at most k bad characters.

## Example

**Input:** abc  
2  
abc  
**Output:** 6  

## Solution Approach

### Method 1: Sliding window

Use two pointers to maintain window with <= k bad.

## Time Complexity

O(n)

## Space Complexity

O(n)

## Edge Cases

- k = 0

## Applications

- Substring counting

## Practice Tips

- Prefix bad count
