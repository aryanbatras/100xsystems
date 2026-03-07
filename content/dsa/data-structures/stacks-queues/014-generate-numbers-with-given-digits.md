---
title: "Generate Numbers with Given Digits"
difficulty: "Easy"
tags: ["backtracking", "permutation"]
---

## Problem

Given a set of digits, generate all possible unique numbers that can be formed by arranging them.

## Example

**Input:** digits = [1,2,3]  
**Output:** [123,132,213,231,312,321]  

**Input:** digits = [1,1]  
**Output:** [11]  

**Input:** digits = [0,1]  
**Output:** [10,1]

## Solution Approach

### Method 1: Backtracking for Permutations
1. Use backtracking to generate all permutations
2. Convert each permutation to integer
3. Use a set to store unique numbers (to handle duplicates)

## Time Complexity

O(n!) - For generating permutations.

## Space Complexity

O(n!) - For storing results.

## Edge Cases

- **Empty digits**: Empty result
- **Single digit**: Single number
- **Duplicate digits**: Unique numbers
- **Leading zeros**: Not included if converted to int

## Applications

- **Number Generation**: All possible combinations
- **Permutation Problems**: Arrangements
- **Data Processing**: Generate sequences
- **Algorithm Problems**: Backtracking practice

## Practice Tips

- Use backtracking for permutations
- Handle duplicates with set
- Convert to int carefully
- Test with small inputs
