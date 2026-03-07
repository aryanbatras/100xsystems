---
title: "Movie Festival"
cses: "https://cses.fi/problemset/task/1629"
difficulty: "Easy"
tags: ["implementation", "sorting", "greedy"]
---

## Problem

In a movie festival, n movies will be shown. You know the starting and ending times of each movie. What is the maximum number of movies you can watch entirely?

## Example

**Input:** 3  
3 5  
4 9  
5 8  
**Output:** 2  

**Input:** 4  
1 2  
2 3  
3 4  
4 5  
**Output:** 2  

**Input:** 1  
1 10  
**Output:** 1

## Solution Approach

### Method 1: Sort by End Time
1. movies.sort(key=lambda x: x[1])
2. count = 0
3. end = 0
4. for s, e in movies:
   - if s >= end:
     - count += 1
     - end = e
5. print(count)

## Time Complexity

O(n log n) - Sorting.

## Space Complexity

O(1) - In-place.

## Edge Cases

- **All overlap**: 1
- **No overlap**: n
- **Single movie**: 1
- **Sorted**: Already

## Applications

- **Greedy**: Earliest end
- **Intervals**: Scheduling
- **Sorting**: End times

## Practice Tips

- Sort by end time
- Pick if start >= current end
- Update end
- Count selected
