---
title: "LFU Cache"
leetcode: "https://leetcode.com/problems/lfu-cache/"
difficulty: "Hard"
tags: ["design", "linked-list", "hash-table"]
---

## Problem

Design and implement a data structure for Least Frequently Used (LFU) cache.

Implement the LFUCache class:

- LFUCache(int capacity)

- int get(int key)

- void put(int key, int value)

The functions get and put must each run in O(1) average time complexity.

## Example

**Input:** ["LFUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]  
[[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]  
**Output:** [null, null, null, 1, null, -1, null, -1, 3, 4]  

**Explanation:**  
LFUCache lfu = new LFUCache(2);  
lfu.put(1, 1); // cache=[1,_1], cnt(1)=1  
lfu.put(2, 2); // cache=[2,_1], cnt(2)=1, cnt(1)=1  
lfu.get(1);    // return 1, cache=[1,_1], cnt(1)=2  
lfu.put(3, 3); // 2 is LFU, cache=[3,_1], cnt(3)=1, cnt(1)=2  
lfu.get(2);    // return -1 (not found)  
lfu.put(4, 4); // 3 is LFU, cache=[4,_1], cnt(4)=1, cnt(1)=2  
lfu.get(1);    // return 1, cache=[1,_4], cnt(1)=3  
lfu.get(3);    // return -1 (not found)  
lfu.get(4);    // return 4, cache=[4,_1], cnt(4)=2, cnt(1)=3  

## Solution Approach

### Method 1: Hash Map + Hash Map of Doubly Linked Lists
1. Hash map key -> node
2. Hash map freq -> doubly linked list of nodes with that freq
3. Node: key, value, freq, prev, next
4. min_freq
5. For get(key):
   - If key not in map, return -1
   - node = map[key]
   - curr_freq = node.freq
   - remove from curr_freq list
   - node.freq += 1
   - add to (curr_freq + 1) list
   - if curr_freq list empty and curr_freq == min_freq, min_freq += 1
   - return node.value
6. For put(key, value):
   - If key in map:
     - node = map[key]
     - node.value = value
     - get(key)  # update freq
   - Else:
     - if len(map) == capacity:
       - if min_freq in freq_map:
         - remove head of min_freq list
         - del map[removed.key]
     - new_node = Node(key, value, 1)
     - map[key] = new_node
     - add to freq 1 list
     - min_freq = 1

## Time Complexity

O(1) average for both get and put.

## Space Complexity

O(capacity) - For hash maps and linked lists.

## Edge Cases

- **Capacity 0**: No operations
- **Get non-existent key**: -1
- **Put when full**: Evict LFU
- **Multiple with same freq**: Evict LRU

## Applications

- **Caching Systems**: Advanced cache policies
- **Database Management**: Frequency-based eviction
- **Memory Optimization**: Smart replacement
- **Performance Tuning**: Adaptive caching

## Practice Tips

- Implement doubly linked lists for freq
- Handle min_freq updates
- Manage node removals and additions
- Test with different scenarios
