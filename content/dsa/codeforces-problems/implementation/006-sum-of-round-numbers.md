---
title: "Sum of Round Numbers"
codeforces: "https://codeforces.com/problemset/problem/1352/A"
difficulty: "Easy"
tags: ["implementation", "math", "digits"]
---

## Problem

Express as sum of round numbers.

## Example

**Input:** 5009  

**Output:** 2  

5000 9  

## Solution Approach

### Method 1: Process Digits
n = int(input())

round_nums = []

s = str(n)

for i, d in enumerate(s):

    if d != '0':

        round_num = int(d) * (10 ** (len(s) - i - 1))

        round_nums.append(round_num)

print(len(round_nums))

print(' '.join(map(str, round_nums)))

## Time Complexity

O(log n) - Digits.

## Space Complexity

O(log n).

## Edge Cases

- **0**: 0 numbers
- **Power of 10**: 1 number
- **All digits**: n numbers

## Applications

- **Math**: Number representation
- **Digits**: Processing

## Practice Tips

- Convert to string
- Check non-zero digits
- Calculate round numbers
