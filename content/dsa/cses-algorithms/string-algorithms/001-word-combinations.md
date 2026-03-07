---
title: "Word Combinations"
cses: "https://cses.fi/problemset/task/1731"
difficulty: "Medium"
tags: ["implementation", "string", "dynamic-programming", "trie"]
---

## Problem

Count ways to form string from dictionary words.

## Example

**Input:** aabc  
3  
a  
ab  
c  
**Output:** 3  

## Solution Approach

### Method 1: DP with Trie
Build trie of words.

dp[i] = number of ways to form s[0..i-1]

dp[0] = 1

for i in range(len(s)):

    if dp[i] > 0:

        node = root

        for j in range(i, len(s)):

            if s[j] not in node.children:

                break

            node = node.children[s[j]]

            if node.is_end:

                dp[j+1] = (dp[j+1] + dp[i]) % MOD

print(dp[len(s)])

## Time Complexity

O(n * m) - DP with trie.

## Space Complexity

O(m) - Trie.

## Edge Cases

- **No words**: 0

- **Single word**: 1 if matches

- **Overlapping**: Sum

- **Empty string**: 1

## Applications

- **Strings**: Word formation

- **DP**: Prefix matching

- **Trie**: Dictionary

## Practice Tips

- Build trie

- DP for ways

- Modular arithmetic

- Handle edge cases
