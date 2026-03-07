---
title: "New Year's Eve"
codeforces: "https://codeforces.com/problemset/problem/912/A"
difficulty: "Easy"
tags: ["bit-manipulation", "math"]
---

## Problem

Find the minimum number of fireworks to buy to meet the requirements.

## Example

**Input:** 5 5 6 7  
**Output:** 3  

## Solution Approach

### Method 1: Calculate deficits

Compute max(0, x - a) + max(0, y - b)

## Time Complexity

O(1)

## Space Complexity

O(1)

## Edge Cases

- a >= x and b >= y: 0

## Applications

- Resource allocation

## Practice Tips

- Use max function
