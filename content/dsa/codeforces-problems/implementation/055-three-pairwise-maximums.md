---
title: "Three Pairwise Maximums"
codeforces: "https://codeforces.com/problemset/problem/1385/A"
difficulty: "Easy"
tags: ["implementation", "math", "sorting"]
---

## Problem

Check if a,b,c can be pairwise maximums.

## Example

**Input:** 1 2 3  

**Output:** 1 2 3  

## Solution Approach

### Method 1: Sort and Check

x, y, z = sorted(map(int, input().split()))

if x == y == z:

    print("YES")

    print(x, y, z)

elif x == y and z >= x:

    print("YES")

    print(x, y, z)

else:

    print("NO")

## Time Complexity

O(1) - Constant.

## Space Complexity

O(1).

## Edge Cases

- **All equal**: YES

- **Two equal, third >=**: YES

- **All different**: NO

- **Invalid**: NO

## Applications

- **Math**: Pairwise max

- **Conditions**: Check

## Practice Tips

- Sort values

- Check conditions

- Output YES/NO and values
