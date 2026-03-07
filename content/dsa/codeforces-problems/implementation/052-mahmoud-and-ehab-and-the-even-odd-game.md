---
title: "Mahmoud and Ehab and the even-odd game"
codeforces: "https://codeforces.com/problemset/problem/959/A"
difficulty: "Easy"
tags: ["implementation", "game-theory", "parity"]
---

## Problem

Determine winner of even-odd game.

## Example

**Input:** 1  

**Output:** Ehab  

## Solution Approach

### Method 1: Check Parity

n = int(input())

if n % 2 == 0:

    print("Mahmoud")

else:

    print("Ehab")

## Time Complexity

O(1) - Constant.

## Space Complexity

O(1).

## Edge Cases

- **1**: Ehab

- **2**: Mahmoud

- **Even**: Mahmoud

- **Odd**: Ehab

## Applications

- **Game Theory**: Simple

- **Parity**: Decide

## Practice Tips

- Check n % 2

- Output winner
