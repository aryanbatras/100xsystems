---
title: "Ichihime and Triangle"
codeforces: "https://codeforces.com/problemset/problem/1337/A"
difficulty: "Easy"
tags: ["implementation", "math", "triangle"]
---

## Problem

Find triangle sides with given constraints.

## Example

**Input:** 3 4 5  

**Output:** 2 3 4  

## Solution Approach

### Method 1: Calculate Sides

a, b, c = map(int, input().split())

x = a + b - c

y = a - b + c

z = -a + b + c

if x > 0 and y > 0 and z > 0 and x + y + z == a + b + c:

    print(x, y, z)

else:

    print("No solution")

## Time Complexity

O(1) - Constant.

## Space Complexity

O(1).

## Edge Cases

- **Valid triangle**: Sides

- **Invalid**: No solution

- **Equal**: Possible

## Applications

- **Math**: Triangle inequality

- **Constraints**: Given sums

## Practice Tips

- Calculate x,y,z

- Check positive and sum

- Output sides
