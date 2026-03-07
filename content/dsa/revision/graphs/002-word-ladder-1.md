---
title: "Word ladder - 1"
leetcode: "https://leetcode.com/problems/word-ladder/"
difficulty: "Hard"
tags: ["hash-table", "string", "breadth-first-search"]
---

## Problem

A transformation sequence from word beginWord to word endWord using a dictionary wordList is a sequence of words beginWord -> s1 -> s2 -> ... -> sk such that: Every adjacent pair of words differs by a single letter. Every si for 1 <= i <= k is in wordList. Note that beginWord does not need to be in wordList. sk == endWord. Given two words, beginWord and endWord, and a dictionary wordList, find the length of the shortest transformation sequence from beginWord to endWord, or 0 if no such sequence exists.

## Example

**Input:** beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]  
**Output:** 5 (hit->hot->dot->dog->cog)  

**Input:** beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log"]  
**Output:** 0  

**Input:** beginWord = "a", endWord = "c", wordList = ["a","b","c"]  
**Output:** 2

## Solution Approach

### Method 1: BFS
1. from collections import deque
2. word_set = set(wordList)
3. if endWord not in word_set: return 0
4. queue = deque([(beginWord, 1)])
5. visited = set([beginWord])
6. while queue:
   - word, level = queue.popleft()
   - if word == endWord: return level
   - for i in range(len(word)):
     - for c in 'abcdefghijklmnopqrstuvwxyz':
       - new_word = word[:i] + c + word[i+1:]
       - if new_word in word_set and new_word not in visited:
         - visited.add(new_word)
         - queue.append((new_word, level + 1))
7. return 0

## Time Complexity

O(n * 26 * l) - n words, l length.

## Space Complexity

O(n) - Set and queue.

## Edge Cases

- **beginWord == endWord**: 1
- **endWord not in list**: 0
- **No path**: 0
- **Direct transform**: 2

## Applications

- **String Problems**: Word transformations
- **BFS**: Shortest path
- **Graphs**: Implicit graph
- **Interview Questions**: Hard

## Practice Tips

- Use set for wordList
- BFS with level
- Generate neighbors by changing one char
- Mark visited
