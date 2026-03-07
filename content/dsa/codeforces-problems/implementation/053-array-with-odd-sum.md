---
title: "Array with Odd Sum"
codeforces: "https://codeforces.com/problemset/problem/1296/A"
difficulty: "Easy"
tags: ["implementation", "array", "parity"]
---

## Problem

Check if can get odd sum by removing elements.

## Example

**Input:** 3  

1 2 3  

**Output:** YES  

## Solution Approach

### Method 1: Count Odds

n = int(input())

a = list(map(int, input().split()))

odd_count = sum(1 for x in a if x % 2 == 1)

if odd_count > 0:

    print("YES")

else:

    print("NO")

## Time Complexity

O(n) - Linear.

## Space Complexity

O(n).

## Edge Cases

- **All even**: NO

- **Has odd**: YES

- **One odd**: YES

- **Multiple odds**: YES

## Applications

- **Array**: Sum parity

- **Removal**: Possible odd

## Practice Tips

- Count odd numbers

- Check >0

- Output YES/NO
