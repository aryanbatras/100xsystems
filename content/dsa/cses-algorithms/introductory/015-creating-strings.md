---
title: "Creating Strings"
cses: "https://cses.fi/problemset/task/1622"
difficulty: "Easy"
tags: ["implementation", "string", "backtracking", "permutations"]
---

## Problem

Given a string, your task is to generate all different strings that can be created using its characters.

## Example

**Input:** aab  
**Output:** 3  
aab  
aba  
baa  

**Input:** aaa  
**Output:** 1  
aaa  

**Input:** abc  
**Output:** 6  
abc  
acb  
bac  
bca  
cab  
cba

## Solution Approach

### Method 1: Backtracking
1. def generate(s, index, result):
   - if index == len(s):
     - result.add(''.join(s))
     - return
   - seen = set()
   - for i in range(index, len(s)):
     - if s[i] not in seen:
       - seen.add(s[i])
       - s[index], s[i] = s[i], s[index]
       - generate(s, index + 1, result)
       - s[index], s[i] = s[i], s[index]
2. s = list(input())
3. result = set()
4. generate(s, 0, result)
5. print(len(result))
6. for perm in sorted(result):
   - print(perm)

## Time Complexity

O(n! * n) - Permutations.

## Space Complexity

O(n! * n) - Set.

## Edge Cases

- **Duplicates**: Unique only
- **Single char**: 1
- **All same**: 1
- **Sorted order**: Sort output

## Applications

- **Strings**: Permutations
- **Backtracking**: Generate
- **Sets**: Uniqueness

## Practice Tips

- Use backtracking
- Swap to generate
- Skip duplicates
- Sort output
