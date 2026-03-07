---
title: "Petr and a Combination Lock"
codeforces: "https://codeforces.com/problemset/problem/1097/B"
difficulty: "Easy"
tags: ["bit-manipulation", "brute force"]
---

## Problem

Check if can rotate the lock to open with given angles.

## Example

**Input:** 4  
10 20 30 40  
**Output:** YES  

## Solution Approach

### Method 1: Subset sum

Check if sum of subset equals 360 or 0 mod 360.

## Time Complexity

O(2^n)

## Space Complexity

O(1)

## Edge Cases

- All zero: YES

## Applications

- Subset sum

## Practice Tips

- Use bit mask
