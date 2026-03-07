---
title: "Prefix and Suffix Search"
leetcode: "https://leetcode.com/problems/prefix-and-suffix-search/"
difficulty: "Hard"
tags: ["trie", "design"]
---

## Problem

Design a special dictionary that searches the words for a prefix and a suffix.

Implement the WordFilter class:

- WordFilter(string[] words)

- int f(string prefix, string suffix) Returns the index of the word in words that has the prefix prefix and the suffix suffix. If there is more than one valid index, return the largest index. If there is no such word, return -1.

## Example

**Input:** words = ["apple"], f("a","e") = 0  

**Input:** words = ["apple","apply"], f("ap","e") = 0  

**Input:** words = ["apple","apply"], f("ap","y") = 1

## Solution Approach

### Method 1: Brute Force
1. Store words list
2. For f, loop from len(words)-1 downto 0
3. If words[i].startswith(prefix) and words[i].endswith(suffix), return i
4. Return -1

### Method 2: Trie
1. Build prefix trie and suffix trie
2. For f, traverse prefix trie, collect possible words, check suffix

## Time Complexity

O(n * m) per query for brute.

## Space Complexity

O(n * m) - Word storage.

## Edge Cases

- **No match**: -1
- **Multiple matches**: Largest index
- **Prefix/suffix empty**: All words
- **Single word**: Check

## Applications

- **Word Search**: Prefix and suffix
- **Dictionary**: Advanced search
- **Data Structures**: Trie applications
- **Interview Questions**: Hard problem

## Practice Tips

- Store words
- Iterate from end
- Check conditions
- Optimize with tries
