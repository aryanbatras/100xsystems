---
title: "Apartments"
cses: "https://cses.fi/problemset/task/1084"
difficulty: "Easy"
tags: ["implementation", "sorting", "two-pointers"]
---

## Problem

There are n applicants and m free apartments. Your task is to assign an apartment for each applicant. Each applicant has a desired apartment size, and each apartment has a size. Find the maximum number of applicants who will get an apartment.

## Example

**Input:** 4 3 5  
60 45 80 60  
30 60 75  
**Output:** 2  

**Input:** 1 1 0  
10  
10  
**Output:** 1  

**Input:** 2 1 10  
1 1  
10  
**Output:** 0

## Solution Approach

### Method 1: Sort and Two Pointers
1. a.sort()
2. b.sort()
3. i = j = 0
4. count = 0
5. while i < len(a) and j < len(b):
   - if b[j] >= a[i] - k and b[j] <= a[i] + k:
     - count += 1
     - i += 1
     - j += 1
   - elif b[j] < a[i] - k:
     - j += 1
   - else:
     - i += 1
6. print(count)

## Time Complexity

O(n log n) - Sorting.

## Space Complexity

O(1) - In-place.

## Edge Cases

- **No matches**: 0
- **All match**: Min(n,m)
- **k=0**: Exact match
- **Sorted**: Already

## Applications

- **Greedy**: Assignment
- **Two Pointers**: Converge
- **Sorting**: Prerequisites

## Practice Tips

- Sort both arrays
- Move pointers
- Check range
- Count matches
