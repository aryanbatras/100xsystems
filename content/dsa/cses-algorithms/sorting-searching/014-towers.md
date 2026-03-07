---
title: "Towers"
cses: "https://cses.fi/problemset/task/1073"
difficulty: "Easy"
tags: ["implementation", "sorting", "data-structure"]
---

## Problem

You have n cubes, and you want to build towers by stacking them. Each cube has a size, and you can stack a cube on top of another only if the cube below is larger. What is the minimum number of towers needed?

## Example

**Input:** 5  
3 8 2 1 5  
**Output:** 2  

**Input:** 4  
1 2 3 4  
**Output:** 4  

**Input:** 3  
5 3 1  
**Output:** 1

## Solution Approach

### Method 1: Greedy with List
1. towers = []
2. for cube in x:
   - placed = False
   - for i in range(len(towers)):
     - if towers[i] >= cube:
       - towers[i] = cube
       - placed = True
       - break
   - if not placed:
     - towers.append(cube)
3. print(len(towers))

## Time Complexity

O(n^2) - Nested loops.

## Space Complexity

O(n) - Towers list.

## Edge Cases

- **Increasing**: n towers
- **Decreasing**: 1 tower
- **All same**: 1 tower
- **Sorted**: Fewer

## Applications

- **Greedy**: Placement
- **Arrays**: Tower tops
- **Minimization**: Towers

## Practice Tips

- Maintain tower tops
- Place on smallest >= cube
- Or add new tower
- Count towers
