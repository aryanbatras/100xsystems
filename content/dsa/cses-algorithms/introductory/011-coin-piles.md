---
title: "Coin Piles"
cses: "https://cses.fi/problemset/task/1754"
difficulty: "Easy"
tags: ["implementation", "math"]
---

## Problem

You have two coin piles containing a and b coins. On each move, you can remove one coin from one pile and two coins from the other pile, or two coins from one pile and one coin from the other pile. Can you empty both piles?

## Example

**Input:** 2 1  
**Output:** YES  

**Input:** 2 2  
**Output:** NO  

**Input:** 0 0  
**Output:** YES

## Solution Approach

### Method 1: Check Conditions
1. if a + b % 3 != 0: NO
2. if min(a, b) * 2 < max(a, b): NO
3. else: YES

## Time Complexity

O(1) - Constant.

## Space Complexity

O(1) - Constant.

## Edge Cases

- **0 0**: YES
- **1 1**: NO
- **2 1**: YES
- **Unequal**: Check

## Applications

- **Games**: Coin piles
- **Math**: Invariants
- **Implementation**: Conditions

## Practice Tips

- Total coins mod 3
- Min * 2 >= max
- Handle zero
