---
title: "Chewbacca and Number"
codeforces: "https://codeforces.com/problemset/problem/514/A"
difficulty: "Easy"
tags: ["implementation", "greedy", "digits"]
---

## Problem

Make smallest number by changing digits to 9 - d.

## Example

**Input:** 27  
**Output:** 22  

## Solution Approach

### Method 1: Greedy
s = input()
result = []
for i, c in enumerate(s):
    d = int(c)
    new_d = 9 - d
    if new_d < d:
        if i == 0 and new_d == 0:
            result.append(str(d))
        else:
            result.append(str(new_d))
    else:
        result.append(str(d))
print(''.join(result))

## Time Complexity

O(n) - Linear.

## Space Complexity

O(n).

## Edge Cases

- **All 9s**: Same
- **Leading 9**: Becomes 0, keep
- **Single digit**: 9-d

## Applications

- **Greedy**: Digit choice
- **Implementation**: String manipulation

## Practice Tips

- Check each digit
- Handle leading zero
- Build result
