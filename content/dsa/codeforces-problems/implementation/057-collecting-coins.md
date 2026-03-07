---
title: "Collecting Coins"
codeforces: "https://codeforces.com/problemset/problem/1294/A"
difficulty: "Easy"
tags: ["implementation", "math", "sorting"]
---

## Problem

Check if can collect coins.

## Example

**Input:** 1 2 3 6  

**Output:** YES  

## Solution Approach

### Method 1: Check Sum

a, b, c, n = map(int, input().split())

max_coin = max(a, b, c)

total = a + b + c + n

if total % 3 == 0 and total // 3 >= max_coin:

    print("YES")

else:

    print("NO")

## Time Complexity

O(1) - Constant.

## Space Complexity

O(1).

## Edge Cases

- **Equal**: YES

- **Large n**: YES

- **Small n**: NO

- **Unequal**: Check

## Applications

- **Math**: Distribution

- **Coins**: Collection

## Practice Tips

- Check total % 3 == 0

- Max <= average

- Output YES/NO
