---
title: "New Year Transportation"
codeforces: "https://codeforces.com/problemset/problem/500/A"
difficulty: "Easy"
tags: ["implementation", "graph", "reachability"]
---

## Problem

Can reach position n.

## Example

**Input:** 8 4  

1 2 3 4 5 6 7 8  

2 3 6 8  

**Output:** YES  

## Solution Approach

### Method 1: Check Reachability

n, t = map(int, input().split())

a = list(map(int, input().split()))

pos = 1

while pos < t:

    pos += a[pos - 1]

    if pos == t:

        print("YES")

        exit()

print("NO")

## Time Complexity

O(n) - Worst case.

## Space Complexity

O(n).

## Edge Cases

- **t=1**: YES

- **Cannot reach**: NO

- **Exact**: YES

- **Overshoot**: NO

## Applications

- **Graph**: Path

- **Jumps**: Reachability

## Practice Tips

- Start from 1

- Jump using a[pos-1]

- Check if reach t
