---
title: "Lucky Sum of Digits"
codeforces: "https://codeforces.com/problemset/problem/109/A"
difficulty: "Easy"
tags: ["implementation", "math", "greedy"]
---

## Problem

Min sum with lucky digits.

## Example

**Input:** 11  

**Output:** 5  

74  

## Solution Approach

### Method 1: Greedy

n = int(input())

count7 = n // 7

while (n - count7 * 7) % 4 != 0 and count7 >= 0:

    count7 -= 1

if count7 < 0:

    print(-1)

else:

    count4 = (n - count7 * 7) // 4

    print('7' * count7 + '4' * count4)

## Time Complexity

O(1) - Loop small.

## Space Complexity

O(1).

## Edge Cases

- **4**: 4

- **7**: 7

- **8**: 44

- **1**: -1

## Applications

- **Math**: Representation

- **Greedy**: Lucky digits

## Practice Tips

- Try max 7s

- Adjust for 4s

- Check possible
