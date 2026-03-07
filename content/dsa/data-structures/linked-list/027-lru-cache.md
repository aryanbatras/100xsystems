---
title: "LRU Cache"
leetcode: "https://leetcode.com/problems/lru-cache/"
difficulty: "Medium"
tags: ["design", "linked-list", "hash-table"]
---

## Problem

Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.

Implement the LRUCache class:

- LRUCache(int capacity) Initialize the LRU cache with positive size capacity.
- int get(int key) Return the value of the key if the key exists, otherwise return -1.
- void put(int key, int value) Update the value of the key if the key exists. Otherwise, add the key-value pair to the cache. If the number of keys exceeds the capacity from this operation, evict the least recently used key.

The functions get and put must each run in O(1) average time complexity.

## Example

**Input:** ["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]  
[[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]  
**Output:** [null, null, null, 1, null, -1, null, -1, 3, 4]  

**Explanation:**  
LRUCache lRUCache = new LRUCache(2);  
lRUCache.put(1, 1); // cache is {1=1}  
lRUCache.put(2, 2); // cache is {1=1, 2=2}  
lRUCache.get(1);    // return 1  
lRUCache.put(3, 3); // LRU key was 2, evicts key 2, cache is {1=1, 3=3}  
lRUCache.get(2);    // returns -1 (not found)  
lRUCache.put(4, 4); // LRU key was 1, evicts key 1, cache is {4=4, 3=3}  
lRUCache.get(1);    // return -1 (not found)  
lRUCache.get(3);    // return 3  
lRUCache.get(4);    // return 4

## Solution Approach

### Method 1: Hash Map + Doubly Linked List
1. Use a hash map to store key -> node
2. Use a doubly linked list to maintain the order of usage
3. Node: key, value, prev, next
4. head and tail dummies, head.next is LRU, tail.prev is MRU
5. For get(key):
   - If key not in map, return -1
   - Else, move the node to tail (MRU), return value
6. For put(key, value):
   - If key in map:
     - Update value, move to tail
   - Else:
     - Create new node, add to tail, add to map
     - If size > capacity, remove head (LRU), remove from map

## Time Complexity

O(1) for both get and put.

## Space Complexity

O(capacity) - For hash map and linked list.

## Edge Cases

- **Capacity 0**: No operations
- **Get non-existent key**: -1
- **Put when full**: Evict LRU
- **Update existing key**: Move to MRU

## Applications

- **Caching Systems**: Database caches, web caches
- **Browser History**: Recently visited pages
- **Memory Management**: Page replacement
- **Optimization**: Reduce access time

## Practice Tips

- Implement doubly linked list carefully
- Handle hash map updates
- Manage head and tail pointers
- Test with different capacities
