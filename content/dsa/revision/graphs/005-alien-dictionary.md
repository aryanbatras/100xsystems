---
title: "Alien dictionary"
leetcode: "https://leetcode.com/problems/alien-dictionary/"
difficulty: "Hard"
tags: ["depth-first-search", "breadth-first-search", "graph", "topological-sort", "array", "string"]
---

## Problem

There is a new alien language that uses the English alphabet. However, the order among the letters is unknown to you. You are given a list of strings words from the alien language's dictionary, where the strings in words are sorted lexicographically by the rules of this new language. Derive the order of letters in this language, and return it. If the given input is invalid, return "".

## Example

**Input:** words = ["wrt","wrf","er","ett","rftt"]  
**Output:** "wertf"  

**Input:** words = ["z","x"]  
**Output:** "zx"  

**Input:** words = ["z","x","z"]  
**Output:** ""

## Solution Approach

### Method 1: Topological Sort
1. from collections import deque, defaultdict
2. # Build graph
3. graph = defaultdict(list)
4. indegree = {c: 0 for word in words for c in word}
5. for i in range(len(words) - 1):
   - w1, w2 = words[i], words[i+1]
   - for j in range(min(len(w1), len(w2))):
     - if w1[j] != w2[j]:
       - if w2[j] not in graph[w1[j]]:
         - graph[w1[j]].append(w2[j])
         - indegree[w2[j]] += 1
       - break
   - else:
     - if len(w1) > len(w2): return ""  # invalid
6. # Kahn's
7. queue = deque([c for c in indegree if indegree[c] == 0])
8. result = []
9. while queue:
   - c = queue.popleft()
   - result.append(c)
   - for nei in graph[c]:
     - indegree[nei] -= 1
     - if indegree[nei] == 0:
       - queue.append(nei)
10. return "".join(result) if len(result) == len(indegree) else ""

## Time Complexity

O(n + c) - n words, c chars.

## Space Complexity

O(c) - Graph.

## Edge Cases

- **Invalid order**: ""
- **Single char**: "a"
- **No edges**: Any order
- **Cycle**: ""

## Applications

- **String Problems**: Dictionary order
- **Graph**: Topological sort
- **Lex order**: Alien language
- **Interview Questions**: Hard

## Practice Tips

- Build graph from adjacent words
- Find first differing chars
- Topological sort
- Check all chars included
