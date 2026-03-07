---
title: "Dreamoon and Stairs"
codeforces: "https://codeforces.com/problemset/problem/476/A"
difficulty: "Easy"
tags: ["implementation", "math", "min-steps"]
---

## Problem

Min steps for stairs.

## Example

**Input:** 10 2  

**Output:** 5  

## Solution Approach

### Method 1: Check Conditions

n, m = map(int, input().split())

if n % 2 == 0:

    if m <= n // 2:

        print(n // 2)

    else:

        print(-1)

else:

    if m <= n // 2 + 1:

        print(n // 2 + 1)

    else:

        print(-1)

## Time Complexity

O(1) - Constant.

## Space Complexity

O(1).

## Edge Cases

- **n even**: n/2 if m <= n/2

- **n odd**: n/2+1 if m <= n/2+1

- **m too large**: -1

## Applications

- **Math**: Conditions

- **Stairs**: Steps

## Practice Tips

- Check n parity

- Compare m

- Output result
