---
title: "Middle of the Contest"
codeforces: "https://codeforces.com/problemset/problem/1133/A"
difficulty: "Easy"
tags: ["implementation", "time", "math"]
---

## Problem

Find middle time between two times.

## Example

**Input:** 12:00  

12:30  

**Output:** 12:15  

## Solution Approach

### Method 1: Calculate Minutes

def to_minutes(t):

    h, m = map(int, t.split(':'))

    return h * 60 + m

start = to_minutes(input())

end = to_minutes(input())

mid = (start + end) // 2

h = mid // 60

m = mid % 60

print(f"{h:02d}:{m:02d}")

## Time Complexity

O(1) - Constant.

## Space Complexity

O(1).

## Edge Cases

- **Same time**: Same

- **Hour change**: Correct

- **Midnight**: 00:00

## Applications

- **Time**: Calculations

- **Math**: Average

## Practice Tips

- Convert to minutes

- Calculate mid

- Format output
