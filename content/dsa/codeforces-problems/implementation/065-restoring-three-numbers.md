---
title: "Restoring Three Numbers"
codeforces: "https://codeforces.com/problemset/problem/1154/A"
difficulty: "Easy"
tags: ["implementation", "math", "sorting"]
---

## Problem

Find a,b,c from sums.

## Example

**Input:** 3 6 5 4  

**Output:** 1 2 3  

## Solution Approach

### Method 1: Sort and Calculate

arr = sorted(map(int, input().split()))

a = arr[0]

b = arr[1]

c = arr[2]

d = arr[3]

# d = a + b + c

# c = d - a - b

# But since sorted, c = arr[2], a = arr[0], b = arr[1]

print(a, b, c)

## Time Complexity

O(1) - Constant.

## Space Complexity

O(1).

## Edge Cases

- **Sorted**: Direct

- **Different**: Correct

- **Same**: Possible

## Applications

- **Math**: Sums

- **Numbers**: Restore

## Practice Tips

- Sort array

- Output first three

- Simple
