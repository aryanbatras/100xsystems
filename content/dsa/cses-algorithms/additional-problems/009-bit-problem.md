---
title: "Bit Problem"
cses: "https://cses.fi/problemset/task/1654"
difficulty: "Medium"
tags: ["implementation", "bit-manipulation", "fenwick-tree", "xor"]
---

## Problem

Bit operations on array with updates.

## Example

**Input:** 5 3  

1 2 3 4 5  

1 1 3  

2 2  

1 2 4 1  

2 1  

**Output:** 3  

1  

3  

## Solution Approach

### Method 1: Fenwick Tree for XOR

Use Fenwick tree to handle range XOR updates and point queries.

## Time Complexity

O((n + q) log n) - Operations.

## Space Complexity

O(n).

## Edge Cases

- **No updates**: Original values

- **XOR 0**: No change

- **Single bit**: Toggle

- **Range updates**: Correct XOR

## Applications

- **Bit Manipulation**: XOR operations

- **Fenwick Tree**: Range updates

- **Arrays**: Dynamic XOR

## Practice Tips

- Fenwick tree for XOR

- Update ranges

- Query points

- Handle bits
