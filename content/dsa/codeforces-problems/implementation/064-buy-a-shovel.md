---
title: "Buy a Shovel"
codeforces: "https://codeforces.com/problemset/problem/732/A"
difficulty: "Easy"
tags: ["implementation", "math", "loop"]
---

## Problem

Min shovels to buy.

## Example

**Input:** 5 2  

**Output:** 2  

## Solution Approach

### Method 1: Loop

k, r = map(int, input().split())

for i in range(1, 11):

    if (k * i) % 10 == r or (k * i) % 10 == 0:

        print(i)

        break

## Time Complexity

O(1) - Loop 10.

## Space Complexity

O(1).

## Edge Cases

- **r=0**: 1

- **k ends with r**: 1

- **Loop**: Small

## Applications

- **Math**: Modulo

- **Shovels**: Min

## Practice Tips

- Loop 1 to 10

- Check condition

- Output i
