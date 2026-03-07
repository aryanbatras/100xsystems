---
title: "Required Remainder"
codeforces: "https://codeforces.com/problemset/problem/1374/A"
difficulty: "Easy"
tags: ["implementation", "math", "modulo"]
---

## Problem

Find max x <= n with x % m == k.

## Example

**Input:** 7 5 2  

**Output:** 7  

## Solution Approach

### Method 1: Calculate

x, y, n = map(int, input().split())

if y > n:

    print(-1)

else:

    rem = n % x

    if rem == y:

        print(n)

    elif rem > y:

        print(n - (rem - y))

    else:

        print(n - (rem + x - y))

## Time Complexity

O(1) - Constant.

## Space Complexity

O(1).

## Edge Cases

- **y > n**: -1

- **n % x == y**: n

- **Adjust**: Correct x

## Applications

- **Math**: Modulo

- **Max**: Constraint

## Practice Tips

- Check y > n

- Adjust n to match remainder

- Output result
