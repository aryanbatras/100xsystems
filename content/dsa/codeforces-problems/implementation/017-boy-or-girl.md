---
title: "Boy or Girl"
codeforces: "https://codeforces.com/problemset/problem/236/A"
difficulty: "Easy"
tags: ["implementation", "string", "set"]
---

## Problem

Decide to chat or ignore based on username.

## Example

**Input:** wjmzbmr  

**Output:** chat with her!  

## Solution Approach

### Method 1: Count Distinct
username = input()

distinct = len(set(username))

if distinct % 2 == 0:

    print("CHAT WITH HER!")

else:

    print("IGNORE HIM!")

## Time Complexity

O(n) - Set.

## Space Complexity

O(1) - 26 chars.

## Edge Cases

- **All same**: IGNORE
- **Even distinct**: CHAT
- **Odd distinct**: IGNORE

## Applications

- **String**: Distinct chars
- **Decision**: Condition

## Practice Tips

- Use set for distinct
- Check parity
- Output message
