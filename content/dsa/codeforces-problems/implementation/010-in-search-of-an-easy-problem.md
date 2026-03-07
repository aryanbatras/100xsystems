---
title: "In Search of an Easy Problem"
codeforces: "https://codeforces.com/problemset/problem/1030/A"
difficulty: "Easy"
tags: ["implementation", "logic", "check"]
---

## Problem

Check if all answers are YES.

## Example

**Input:** 3  

1  

0  

1  

**Output:** HARD  

## Solution Approach

### Method 1: Check All
n = int(input())

answers = list(map(int, input().split()))

if 0 in answers:

    print("HARD")

else:

    print("EASY")

## Time Complexity

O(n) - Linear.

## Space Complexity

O(n).

## Edge Cases

- **All 1**: EASY
- **Has 0**: HARD
- **Single 1**: EASY
- **Single 0**: HARD

## Applications

- **Logic**: Condition check
- **Implementation**: Input processing

## Practice Tips

- Read answers
- Check for 0
- Output YES/NO
