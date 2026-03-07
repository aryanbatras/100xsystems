---
title: "Food Division"
cses: "https://cses.fi/problemset/task/1189"
difficulty: "Easy"
tags: ["implementation", "greedy", "sorting", "division"]
---

## Problem

Divide food fairly among people.

## Example

**Input:** 5 3  

1 2 3 4 5  

**Output:** 9  

## Solution Approach

### Method 1: Greedy
a.sort(reverse=True)
people = [0] * k
for food in a:
    people[0] += food
    people.sort()
print(max(people))

## Time Complexity

O(n log n) - Sorting.

## Space Complexity

O(n).

## Edge Cases

- **k=1**: Total sum
- **All same**: Sum / k
- **One large**: Max + others
- **k > n**: Some zero

## Applications

- **Greedy**: Assignment
- **Sorting**: Optimal
- **Division**: Fair share

## Practice Tips

- Sort food descending
- Assign to smallest current
- Max of groups
- Handle k
