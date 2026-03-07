---
title: "Fox And Snake"
codeforces: "https://codeforces.com/problemset/problem/510/A"
difficulty: "Easy"
tags: ["implementation", "grid", "pattern"]
---

## Problem

Print snake pattern in grid.

## Example

**Input:** 3 3  

**Output:**  

# . #  

. # .  

# . #  

## Solution Approach

### Method 1: Pattern Printing
n, m = map(int, input().split())

for i in range(n):

    if i % 2 == 0:

        print('#' * m)

    else:

        if (i // 2) % 2 == 0:

            print('.' * (m-1) + '#')

        else:

            print('#' + '.' * (m-1))

## Time Complexity

O(n*m) - Printing.

## Space Complexity

O(1).

## Edge Cases

- **1x1**: #
- **Even n**: Pattern
- **Large m**: Row

## Applications

- **Grid**: Pattern generation
- **Implementation**: Printing

## Practice Tips

- Determine row type
- Print appropriate pattern
- Handle boundaries
