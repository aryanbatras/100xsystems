---
title: "Two Sets"
cses: "https://cses.fi/problemset/task/1092"
difficulty: "Easy"
tags: ["implementation", "greedy", "math"]
---

## Problem

Your task is to divide the numbers 1,2,…,n into two sets of equal sum.

## Example

**Input:** 7  
**Output:** YES  
4  
1 2 4 7  
3  
3 5 6  

**Input:** 6  
**Output:** NO

## Solution Approach

### Method 1: Greedy
1. total = n * (n + 1) // 2
2. if total % 2 != 0:
   - print("NO")
3. else:
   - sum1 = total // 2
   - set1 = []
   - set2 = []
   - for i in range(n, 0, -1):
     - if sum1 >= i:
       - set1.append(i)
       - sum1 -= i
     - else:
       - set2.append(i)
   - print("YES")
   - print(len(set1))
   - print(' '.join(map(str, set1)))
   - print(len(set2))
   - print(' '.join(map(str, set2)))

## Time Complexity

O(n) - Loop.

## Space Complexity

O(n) - Lists.

## Edge Cases

- **n=1**: NO
- **n=3**: NO
- **n=4**: YES, 1,4 and 2,3
- **Even sum**: Possible

## Applications

- **Partition**: Equal sum
- **Greedy**: Largest first
- **Implementation**: Sets

## Practice Tips

- Check sum parity
- Greedy assignment
- Output format
