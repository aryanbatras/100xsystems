---
title: "Gennady and a Card Game"
codeforces: "https://codeforces.com/problemset/problem/1097/A"
difficulty: "Easy"
tags: ["implementation", "cards", "matching"]
---

## Problem

Check if Gennady has a matching card.

## Example

**Input:** AS  

2H 4C TH JH AD  

**Output:** YES  

## Solution Approach

### Method 1: Check Matches
table = input()

hand = input().split()

rank, suit = table[0], table[1]

for card in hand:

    if card[0] == rank or card[1] == suit:

        print("YES")

        exit()

print("NO")

## Time Complexity

O(1) - Constant.

## Space Complexity

O(1).

## Edge Cases

- **Same rank**: YES

- **Same suit**: YES

- **No match**: NO

- **All different**: NO

## Applications

- **Cards**: Matching

- **Logic**: Conditions

## Practice Tips

- Compare rank and suit

- Check each card

- Output YES/NO
