---
title: "Nearly Lucky Number"
codeforces: "https://codeforces.com/problemset/problem/110/A"
difficulty: "Easy"
tags: ["implementation", "digits", "lucky"]
---

## Problem

Check if number of lucky digits is lucky.

## Example

**Input:** 40047  

**Output:** YES  

## Solution Approach

### Method 1: Count Lucky Digits
n = input()

count = 0

for d in n:

    if d in '47':

        count += 1

if str(count) in ['4', '7'] or all(d in '47' for d in str(count)):

    print("YES")

else:

    print("NO")

## Time Complexity

O(log n) - Digits.

## Space Complexity

O(1).

## Edge Cases

- **All lucky**: YES

- **No lucky**: NO

- **Count is lucky**: YES

- **Count not lucky**: NO

## Applications

- **Digits**: Counting

- **Lucky numbers**: Condition

## Practice Tips

- Count 4 and 7

- Check count

- Output YES/NO
