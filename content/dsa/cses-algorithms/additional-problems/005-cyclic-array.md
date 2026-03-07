---
title: "Cyclic Array"
cses: "https://cses.fi/problemset/task/1192"
difficulty: "Easy"
tags: ["implementation", "array", "kadane", "cyclic"]
---

## Problem

Maximum subarray sum in cyclic array.

## Example

**Input:** 5  
1 2 3 4 5  
**Output:** 15  

## Solution Approach

### Method 1: Kadane for Linear and Circular
def kadane(arr):
    max_current = max_global = arr[0]
    for i in range(1, len(arr)):
        max_current = max(arr[i], max_current + arr[i])
        max_global = max(max_global, max_current)
    return max_global

linear = kadane(a)
total = sum(a)
min_sum = -kadane([-x for x in a])
circular = total + min_sum
if circular == 0:
    print(linear)
else:
    print(max(linear, circular))

## Time Complexity

O(n) - Kadane.

## Space Complexity

O(1).

## Edge Cases

- **All negative**: Max element
- **All positive**: Total sum
- **Single element**: Itself
- **Empty**: N/A

## Applications

- **Arrays**: Subarray sum
- **Kadane**: Maximum sum
- **Cyclic**: Wrap around

## Practice Tips

- Kadane for linear
- Min sum for circular
- Handle all negative
- Max of both
