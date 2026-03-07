---
title: "Anton and Polyhedrons"
codeforces: "https://codeforces.com/problemset/problem/785/A"
difficulty: "Easy"
tags: ["implementation", "map", "counting"]
---

## Problem

Count total faces from polyhedron names.

## Example

**Input:** 4  

Tetrahedron  

Cube  

Octahedron  

Dodecahedron  

**Output:** 42  

## Solution Approach

### Method 1: Map and Sum
faces = {

    "Tetrahedron": 4,

    "Cube": 6,

    "Octahedron": 8,

    "Dodecahedron": 12,

    "Icosahedron": 20

}

n = int(input())

total = 0

for _ in range(n):

    poly = input()

    total += faces[poly]

print(total)

## Time Complexity

O(n) - Linear.

## Space Complexity

O(1).

## Edge Cases

- **All same**: n * faces
- **Different**: Sum
- **Invalid**: Not handled

## Applications

- **Map**: Lookup
- **Counting**: Sum

## Practice Tips

- Define faces map
- Read inputs
- Sum faces
