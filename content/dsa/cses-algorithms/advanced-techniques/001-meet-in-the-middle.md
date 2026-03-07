---
title: "Meet in the Middle"
cses: "https://cses.fi/problemset/task/1628"
difficulty: "Medium"
tags: ["implementation", "meet-in-the-middle", "subset-sum", "exponential"]
---

## Problem

Count subsets with sum x.

## Example

**Input:** 4 8  
2 4 6 8  
**Output:** 2  

## Solution Approach

### Method 1: Meet in the Middle
left = a[:n//2]
right = a[n//2:]
left_sums = []
for mask in range(1 << len(left)):
    s = 0
    for i in range(len(left)):
        if mask & (1 << i):
            s += left[i]
    left_sums.append(s)
left_sums.sort()
count = 0
for mask in range(1 << len(right)):
    s = 0
    for i in range(len(right)):
        if mask & (1 << i):
            s += right[i]
    # Binary search for x - s
    l, r = 0, len(left_sums) - 1
    while l <= r:
        mid = (l + r) // 2
        if left_sums[mid] == x - s:
            count += 1
            break
        elif left_sums[mid] < x - s:
            l = mid + 1
        else:
            r = mid - 1
print(count)

## Time Complexity

O(2^{n/2} log (2^{n/2})) - Meet in middle.

## Space Complexity

O(2^{n/2}).

## Edge Cases

- **No subset**: 0
- **Empty subset**: 1 if x=0
- **Multiple**: Count
- **Large n**: 40

## Applications

- **Subset Sum**: Optimization
- **Meet in Middle**: Reduce complexity
- **Exponential**: Large n

## Practice Tips

- Split array
- Generate subsets
- Sort and search
- Count matches
