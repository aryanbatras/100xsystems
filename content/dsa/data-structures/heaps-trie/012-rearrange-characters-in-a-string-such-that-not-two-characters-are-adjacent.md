---
title: "Rearrange Characters in a String such that No Two Characters are Adjacent"
difficulty: "Medium"
tags: ["heap", "greedy", "string"]
---

## Problem

Given a string, rearrange it so that no two identical characters are adjacent. Return the rearranged string or "" if impossible.

## Example

**Input:** s = "aab"  
**Output:** "aba"  

**Input:** s = "aaab"  
**Output:** "" (impossible)  

**Input:** s = "abc"  
**Output:** "abc"

## Solution Approach

### Method 1: Max Heap
1. Count frequency of each character
2. If max freq > (n+1)/2, impossible
3. Use max heap with (freq, char)
4. While heap:
   - Pop most freq, append to result
   - Decrement freq
   - Push back if freq > 0
   - To avoid adjacent, skip if last char same

### Method 2: Greedy with Sorting
1. Sort characters by freq descending
2. Place them in even positions first, then odd

## Time Complexity

O(n log 26) - Heap operations.

## Space Complexity

O(26) - Frequency map.

## Edge Cases

- **All same**: Impossible if n > 1
- **Already valid**: No change
- **Two types**: Alternate
- **Single char**: Same

## Applications

- **String Rearrangement**: Avoid duplicates adjacent
- **Data Processing**: Rearrange for constraints
- **Algorithms**: Greedy placement
- **Interview Questions**: Common

## Practice Tips

- Check feasibility first
- Use heap for greedy
- Handle frequencies
- Test with different strings
