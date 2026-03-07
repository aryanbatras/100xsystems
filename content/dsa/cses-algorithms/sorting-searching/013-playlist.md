---
title: "Playlist"
cses: "https://cses.fi/problemset/task/1141"
difficulty: "Easy"
tags: ["implementation", "sliding-window", "hash-table"]
---

## Problem

You are given a playlist of songs, and you want to find the longest subsequence of songs that contains no duplicates.

## Example

**Input:** 5  
1 2 3 2 1  
**Output:** 3  

**Input:** 4  
1 2 3 4  
**Output:** 4  

**Input:** 3  
1 1 1  
**Output:** 1

## Solution Approach

### Method 1: Sliding Window
1. seen = set()
2. left = 0
3. max_len = 0
4. for right in range(len(k)):
   - while k[right] in seen:
     - seen.remove(k[left])
     - left += 1
   - seen.add(k[right])
   - max_len = max(max_len, right - left + 1)
5. print(max_len)

## Time Complexity

O(n) - Linear.

## Space Complexity

O(n) - Set.

## Edge Cases

- **All distinct**: n
- **All same**: 1
- **No duplicates**: Whole
- **Duplicates**: Shrink window

## Applications

- **Arrays**: Longest unique subarray
- **Sliding Window**: Variable size
- **Hash Tables**: Seen elements

## Practice Tips

- Use set for uniqueness
- Move left on duplicate
- Track max length
- Expand right
