---
title: "Prefixes and Suffixes"
codeforces: "https://codeforces.com/problemset/problem/432/D"
difficulty: "Medium"
tags: ["string-algorithms", "kmp"]
---

## Problem

Find all prefixes that are suffixes with their counts.

## Example

**Input:** abab  

**Output:** 2 abab 1 ab 2  

## Solution Approach

### Method 1: KMP borders

Use KMP pi array to find borders.

## Time Complexity

O(n)

## Space Complexity

O(n)

## Edge Cases

- Prime length

## Applications

- String periodicity

## Practice Tips

- KMP pi
