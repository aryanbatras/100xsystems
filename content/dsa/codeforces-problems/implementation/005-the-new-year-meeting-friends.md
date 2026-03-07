---
title: "The New Year: Meeting Friends"
codeforces: "https://codeforces.com/problemset/problem/723/A"
difficulty: "Easy"
tags: ["implementation", "math", "min-max"]
---

## Problem

Min max distance between three friends.

## Example

**Input:** 1 2 3  

**Output:** 2  

## Solution Approach

### Method 1: Sort and Calculate
a, b, c = sorted(map(int, input().split()))

dist1 = b - a

dist2 = c - b

print(max(dist1, dist2))

## Time Complexity

O(1) - Constant.

## Space Complexity

O(1).

## Edge Cases

- **Same position**: 0
- **Two same**: Distance between different
- **Spread out**: Half the range

## Applications

- **Math**: Distance
- **Min-max**: Optimal meeting

## Practice Tips

- Sort positions
- Calculate distances
- Max of differences
