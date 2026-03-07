---
title: "Sorting Methods"
cses: "https://cses.fi/problemset/task/1162"
difficulty: "Easy"
tags: ["implementation", "sorting", "custom-sort", "comparators"]
---

## Problem

Sort by different methods.

## Example

**Input:** 3 1  
1 2 3  
**Output:** 1 2 3  

## Solution Approach

### Method 1: Custom Sorting
# Depending on the method, sort with custom key

# For example, sort by last digit

a.sort(key=lambda x: x % 10)

print(' '.join(map(str, a)))

## Time Complexity

O(n log n) - Sorting.

## Space Complexity

O(n).

## Edge Cases

- **Already sorted**: Same

- **Reverse**: Reversed

- **Duplicates**: Stable

- **Different methods**: Different orders

## Applications

- **Sorting**: Custom orders

- **Comparators**: Keys

- **Algorithms**: Sort variants

## Practice Tips

- Custom key

- Sort function

- Handle methods

- Output sorted
