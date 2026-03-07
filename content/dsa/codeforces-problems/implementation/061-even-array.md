---
title: "Even Array"
codeforces: "https://codeforces.com/problemset/problem/1367/A"
difficulty: "Easy"
tags: ["implementation", "array", "parity"]
---

## Problem

Min operations to make all even.

## Example

**Input:** 3  

1 2 3  

**Output:** 1  

## Solution Approach

### Method 1: Count Odds

n = int(input())

a = list(map(int, input().split()))

odd_count = sum(1 for x in a if x % 2 == 1)

print(min(odd_count, n - odd_count))

## Time Complexity

O(n) - Linear.

## Space Complexity

O(n).

## Edge Cases

- **All even**: 0

- **All odd**: n/2

- **Mixed**: Min

## Applications

- **Array**: Parity

- **Operations**: Min changes

## Practice Tips

- Count odd numbers

- Min of odd and even counts

- Output result
