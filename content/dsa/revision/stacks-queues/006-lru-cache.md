---
title: "LRU cache"
leetcode: "https://leetcode.com/problems/lru-cache/"
difficulty: "Medium"
tags: ["design", "hash-table", "linked-list", "doubly-linked-list"]
---

## Problem

Design a data structure that follows the constraints of a Least Recently Used (LRU) cache. Implement the LRUCache class: LRUCache(int capacity) Initialize the LRU cache with positive size capacity. int get(int key) Return the value of the key if the key exists, otherwise return -1. void put(int key, int value) Update the value of the key if the key exists. Otherwise, add the key-value pair to the cache. If the number of keys exceeds the capacity from this operation, evict the least recently used key.

## Example

**Input:** ["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"] [[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]  
**Output:** [null, null, null, 1, null, -1, null, -1, 3, 4]

## Solution Approach

### Method 1: Hash Map + Doubly Linked List
1. class Node:
   - def __init__(self, key, val):
     - self.key = key
     - self.val = val
     - self.prev = None
     - self.next = None

2. class LRUCache:
   - def __init__(self, capacity):
     - self.capacity = capacity
     - self.map = {}
     - self.head = Node(0, 0)
     - self.tail = Node(0, 0)
     - self.head.next = self.tail
     - self.tail.prev = self.head

   - def _remove(self, node):
     - p = node.prev
     - n = node.next
     - p.next = n
     - n.prev = p

   - def _add(self, node):
     - p = self.tail.prev
     - p.next = node
     - node.prev = p
     - node.next = self.tail
     - self.tail.prev = node

   - def get(self, key):
     - if key in self.map:
       - node = self.map[key]
       - self._remove(node)
       - self._add(node)
       - return node.val
     - return -1

   - def put(self, key, value):
     - if key in self.map:
       - node = self.map[key]
       - node.val = value
       - self._remove(node)
       - self._add(node)
     - else:
       - node = Node(key, value)
       - self.map[key] = node
       - self._add(node)
       - if len(self.map) > self.capacity:
         - lru = self.head.next
         - self._remove(lru)
         - del self.map[lru.key]

## Time Complexity

O(1) - Hash map operations.

## Space Complexity

O(capacity) - Nodes and map.

## Edge Cases

- **Capacity 1**: Always evict
- **Get non-existent**: -1
- **Put existing**: Update
- **Evict LRU**: Remove least recent

## Applications

- **Cache Design**: LRU policy
- **Doubly Linked List**: Order maintenance
- **Hash Map**: Fast access
- **Interview Questions**: Medium

## Practice Tips

- Use dummy head and tail
- Move to end on access
- Evict from head
- Handle capacity
