---
title: "Number Spiral"
cses: "https://cses.fi/problemset/task/1071"
difficulty: "Easy"
tags: ["implementation", "math"]
---

## Problem

A number spiral is an infinite grid whose upper-left square has number 1. Here are the first five layers of the spiral:

1 2 3 4 5  
16 17 18 19 6  
15 24 25 20 7  
14 23 22 21 8  
13 12 11 10 9  

Your task is to find out the number in row y and column x.

## Example

**Input:** 2 2  
**Output:** 3  

**Input:** 1 1  
**Output:** 1  

**Input:** 4 2  
**Output:** 15

## Solution Approach

### Method 1: Math
1. layer = max(x, y)
2. corner = layer * layer
3. if layer % 2 == 0:
   - if y == layer:
     - return corner - (layer - x)
   - else:
     - return corner - (layer - 1) - (layer - y)
4. else:
   - if x == layer:
     - return corner - (layer - y)
   - else:
     - return corner - (layer - 1) - (layer - x)

## Time Complexity

O(1) - Constant.

## Space Complexity

O(1) - Constant.

## Edge Cases

- **1,1**: 1
- **Even layer**: Adjust
- **Odd layer**: Adjust

## Applications

- **Grids**: Spiral patterns
- **Math**: Layer calculations
- **Implementation**: Position finding

## Practice Tips

- Determine layer
- Find corner value
- Adjust based on position
