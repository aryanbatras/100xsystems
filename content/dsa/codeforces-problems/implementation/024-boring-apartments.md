---
title: "Boring Apartments"
codeforces: "https://codeforces.com/problemset/problem/1433/A"
difficulty: "Easy"
tags: ["implementation", "digits", "counting"]
---

## Problem

Count apartments with same digit pattern.

## Example

**Input:** 22  

**Output:** 13  

## Solution Approach

### Method 1: Count Apartments
x = int(input())

s = str(x)

d = s[0]

length = len(s)

count = 0

# Apartments with length < length, any digit

for l in range(1, length):

    count += 9 * l

# Apartments with length == length, digit <= d

for digit in range(1, int(d) + 1):

    count += length

print(count)

## Time Complexity

O(1) - Constant.

## Space Complexity

O(1).

## Edge Cases

- **1**: 1
- **9**: 9
- **10**: 19
- **11**: 20

## Applications

- **Digits**: Counting
- **Numbers**: Ranges

## Practice Tips

- Calculate for lengths
- Add for digits
- Handle length
