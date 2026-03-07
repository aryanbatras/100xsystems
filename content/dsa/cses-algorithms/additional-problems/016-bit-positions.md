---
title: "Bit Positions"
cses: "https://cses.fi/problemset/task/1145"
difficulty: "Easy"
tags: ["implementation", "bit-manipulation", "positions"]
---

## Problem

Find positions of set bits.

## Example

**Input:** 5  

**Output:** 0 2  

## Solution Approach

### Method 1: Bit Operations
positions = []
i = 0
while n > 0:
    if n & 1:
        positions.append(i)
    n >>= 1
    i += 1
print(' '.join(map(str, positions)))

## Time Complexity

O(1) - 32 bits.

## Space Complexity

O(1).

## Edge Cases

- **0**: Empty

- **1**: 0

- **Power of 2**: One position

- **All bits**: All positions

## Applications

- **Bit Manipulation**: Set bits

- **Numbers**: Binary representation

- **Algorithms**: Bit operations

## Practice Tips

- Loop through bits

- Check set bits

- Collect positions

- Handle 0
