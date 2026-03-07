---
title: "Donut Shops"
codeforces: "https://codeforces.com/problemset/problem/1373/A"
difficulty: "Easy"
tags: ["implementation", "math", "min-cost"]
---

## Problem

Min cost for donuts.

## Example

**Input:** 5  

3 2 1  

**Output:** 5  

## Solution Approach

### Method 1: Calculate for Each

x = int(input())

ans = float('inf')

for _ in range(x):

    a, b, c = map(int, input().split())

    cost = min(a, b) + c

    ans = min(ans, cost)

print(ans)

## Time Complexity

O(x) - Linear.

## Space Complexity

O(1).

## Edge Cases

- **a=0**: c

- **b=0**: 0 + c

- **Large a**: b + c

## Applications

- **Math**: Cost calculation

- **Min**: Over options

## Practice Tips

- Calculate cost per shop

- Find min cost

- Handle parameters
