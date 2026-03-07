---
title: "Wrong Subtraction"
codeforces: "https://codeforces.com/problemset/problem/977/A"
difficulty: "Easy"
tags: ["implementation", "simulation", "digits"]
---

## Problem

Perform wrong subtraction operations.

## Example

**Input:** 512 4  

**Output:** 50  

## Solution Approach

### Method 1: Simulation
n, k = map(int, input().split())

for _ in range(k):

    if n % 10 == 0:

        n //= 10

    else:

        n -= 1

print(n)

## Time Complexity

O(k) - Operations.

## Space Complexity

O(1).

## Edge Cases

- **Ends with 0**: Divide
- **Ends with 1-9**: Subtract
- **Becomes 0**: 0
- **k large**: Min value

## Applications

- **Simulation**: Operations
- **Digits**: Last digit

## Practice Tips

- Loop k times
- Check last digit
- Update n
