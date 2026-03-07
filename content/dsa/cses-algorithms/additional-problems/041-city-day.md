---
title: "City Day"
codeforces: "https://codeforces.com/problemset/problem/1199/A"
difficulty: "Easy"
tags: ["implementation", "array", "sliding-window"]
---

## Problem

Max people in city.

## Example

**Input:** 5 1 2  

1 2 3 4 5  

**Output:** 3  

## Solution Approach

### Method 1: Check Each

n, x, y = map(int, input().split())

a = list(map(int, input().split()))

max_p = 0

for i in range(n):

    can = True

    for j in range(max(0, i-x), min(n, i+y+1)):

        if a[j] > a[i]:

            can = False

            break

    if can:

        max_p = max(max_p, a[i])

print(max_p)

## Time Complexity

O(n * (x+y)) - Nested.

## Space Complexity

O(n).

## Edge Cases

- **x=0, y=0**: All

- **Large x,y**: Full check

- **No max**: Smallest

## Applications

- **Array**: Local max

- **Window**: Check

## Practice Tips

- Check each position

- Verify in window

- Update max

Yes.
