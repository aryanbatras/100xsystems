---
title: "Replace Words"
leetcode: "https://leetcode.com/problems/replace-words/"
difficulty: "Medium"
tags: ["trie", "string"]
---

## Problem

Given a dictionary of words and a sentence, replace each word in the sentence with the shortest root that has it as a prefix.

## Example

**Input:** dictionary = ["cat","bat","rat"], sentence = "the cattle was rattled by the battery"  
**Output:** "the cat was rat by the bat"  

**Input:** dictionary = ["a","b","c"], sentence = "aadsfasf absbs bbab cadsfafs"  
**Output:** "a b b a"  

**Input:** dictionary = ["a","aa","aaa","aaaa"], sentence = "a aa a aaaa aaa aaa aaa aaaaaa bbb baba ababa"  
**Output:** "a a a a a a a bbb baba a"

## Solution Approach

### Method 1: Trie
1. Build trie of dictionary words
2. For each word in sentence, traverse trie, find shortest prefix that is a root
3. Replace word with the root

## Time Complexity

O(n + m) - n sentence length, m dict size.

## Space Complexity

O(m) - Trie space.

## Edge Cases

- **No root for word**: Keep word
- **Multiple roots**: Shortest
- **Root is word**: Replace
- **Empty sentence**: Empty

## Applications

- **Text Processing**: Word replacement
- **Compression**: Shorten words
- **Data Structures**: Trie usage
- **Interview Questions**: Common

## Practice Tips

- Build trie of roots
- For each word, find shortest root
- Handle no root case
- Test with examples
