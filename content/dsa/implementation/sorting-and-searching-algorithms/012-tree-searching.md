---
title: "Tree Searching"
difficulty: "Theory"
tags: ["theory", "algorithms", "searching", "tree-search", "data-structures", "trees"]
---

## Tree Searching

### Overview
Tree searching refers to algorithms for finding specific elements or patterns within tree data structures. Unlike linear searching, tree search exploits the hierarchical organization of trees to achieve efficient search operations. Different tree types require different search strategies.

### Binary Search Tree (BST) Search

#### Basic BST Search
**Algorithm**:
1. Start at root
2. Compare target with current node
3. If equal, found
4. If smaller, search left subtree
5. If larger, search right subtree
6. Continue until found or leaf reached

**Implementation**:
```python
def bst_search(root, target):
    current = root
    while current:
        if current.data == target:
            return current
        elif target < current.data:
            current = current.left
        else:
            current = current.right
    return None
```

**Time Complexity**: O(h) where h is tree height
- **Balanced BST**: O(log n)
- **Skewed BST**: O(n)

#### BST Search Variations

**Finding Minimum**:
```python
def find_min(root):
    current = root
    while current.left:
        current = current.left
    return current
```

**Finding Maximum**:
```python
def find_max(root):
    current = root
    while current.right:
        current = current.right
    return current
```

**Finding Successor** (in-order successor):
```python
def find_successor(root, node):
    # Case 1: Node has right subtree
    if node.right:
        return find_min(node.right)
    
    # Case 2: Node has no right subtree
    successor = None
    current = root
    while current:
        if node.data < current.data:
            successor = current
            current = current.left
        elif node.data > current.data:
            current = current.right
        else:
            break
    return successor
```

### Balanced Tree Search

#### AVL Tree Search
- **Same as BST**: Follow left/right pointers based on comparison
- **Guaranteed Balance**: Height always O(log n)
- **Rotations**: Don't affect search path, only structure

#### Red-Black Tree Search
- **Similar to BST**: Standard comparison-based search
- **Color Properties**: Search ignores color information
- **Balance Guarantee**: Height ≤ 2 log(n+1)

#### B-Tree Search
- **Multi-level**: Search through multiple levels
- **Node Search**: Binary search within nodes
- **Fan-out**: High branching factor for disk efficiency

### Tree Traversal as Search

#### Depth-First Search (DFS)
- **Preorder**: Root → Left → Right
- **Inorder**: Left → Root → Right (sorted for BST)
- **Postorder**: Left → Right → Root
- **Applications**: Tree copying, expression evaluation

#### Breadth-First Search (BFS)
- **Level Order**: Visit nodes level by level
- **Queue-based**: FIFO traversal
- **Shortest Path**: In unweighted tree terms

### Specialized Tree Search Algorithms

#### Expression Tree Evaluation
- **Postorder Traversal**: Evaluate leaves first
- **Operator Application**: Apply operators to operands
- **Stack-based**: Use stack for evaluation

#### Huffman Tree Search
- **Prefix Codes**: No code is prefix of another
- **Bit-by-bit**: Traverse based on bits
- **Optimal Codes**: Minimum average code length

#### Decision Tree Search
- **Path to Leaf**: Follow decisions to outcome
- **Pruning**: Eliminate impossible paths
- **Optimization**: Choose best path based on criteria

### Search in Different Tree Types

#### Binary Trees
- **Full Traversal**: May need to search entire tree
- **No Ordering**: Cannot use comparison-based search
- **Complete Search**: DFS or BFS required

#### Heaps
- **Root Access**: Maximum/minimum at root
- **No General Search**: Not designed for arbitrary element search
- **Heapify**: Restore heap property after modifications

#### Trie (Prefix Tree)
- **Character-based**: Follow characters in key
- **Prefix Matching**: Find all words with given prefix
- **Exact Match**: Follow complete key path

#### Segment Tree
- **Range Queries**: Answer queries about ranges
- **Point Updates**: Update individual elements
- **Efficient Operations**: O(log n) for both

### Search Complexity Analysis

#### Time Complexity by Tree Type

| Tree Type | Search Time | Height | Balance |
|-----------|-------------|--------|---------|
| BST (balanced) | O(log n) | O(log n) | Yes |
| BST (skewed) | O(n) | O(n) | No |
| AVL Tree | O(log n) | O(log n) | Yes |
| Red-Black Tree | O(log n) | O(log n) | Yes |
| B-Tree | O(log n) | O(log_b n) | Yes |
| Binary Tree | O(n) | O(n) | No |

#### Space Complexity
- **Tree Storage**: O(n) nodes
- **Search Stack**: O(h) recursion depth
- **Auxiliary**: O(1) to O(log n) depending on implementation

### Search Optimization Techniques

#### Tree Balancing
- **AVL Rotations**: Maintain height balance
- **Red-Black Adjustments**: Preserve color properties
- **Self-balancing**: Automatic rebalancing

#### Search Caching
- **Access Frequency**: Cache frequently accessed nodes
- **Path Caching**: Store recent search paths
- **Memoization**: Cache subtree results

#### Concurrent Search
- **Read-Write Locks**: Allow multiple readers
- **Lock-free Structures**: Atomic operations
- **Optimistic Concurrency**: Version-based updates

### Applications of Tree Search

#### Database Systems
- **B-Tree Indexes**: Efficient key lookup
- **Query Optimization**: Index-based search
- **Transaction Processing**: Concurrent access

#### File Systems
- **Directory Trees**: File path resolution
- **File Organization**: Hierarchical storage
- **Search Optimization**: Fast file location

#### Artificial Intelligence
- **Game Trees**: Minimax search
- **Decision Trees**: Classification
- **State Space Search**: Problem solving

#### Networking
- **Routing Tables**: IP address lookup
- **Trie-based Routing**: Longest prefix matching
- **Network Topology**: Path finding

### Search in Unbalanced Trees

#### Skewed Tree Issues
- **Worst Case**: O(n) search time
- **Performance Degradation**: Tree becomes linked list
- **Solution**: Rebalancing or different data structure

#### Tree Rebalancing
- **AVL Trees**: Strict balancing
- **Red-Black Trees**: Relaxed balancing
- **Splay Trees**: Amortized balancing

### Multi-way Tree Search

#### B-Tree Search
```python
def btree_search(node, key):
    if node.is_leaf:
        # Search in leaf node
        for i, k in enumerate(node.keys):
            if k == key:
                return node.values[i]
        return None
    
    # Find appropriate child
    i = 0
    while i < len(node.keys) and key > node.keys[i]:
        i += 1
    
    return btree_search(node.children[i], key)
```

#### B+-Tree Search
- **Leaf-oriented**: Data stored only in leaves
- **Sequential Access**: Efficient range queries
- **Index Nodes**: Only keys for navigation

### Tree Search Algorithms Comparison

| Algorithm | Best For | Time | Space | Implementation |
|-----------|----------|------|-------|----------------|
| BST Search | Ordered data | O(log n) | O(1) | Simple |
| DFS | Tree traversal | O(n) | O(h) | Recursive/Iterative |
| BFS | Level order | O(n) | O(w) | Queue-based |
| Trie Search | String keys | O(m) | O(1) | Character-based |

### Error Handling in Tree Search

#### Boundary Conditions
- **Empty Tree**: Return null/not found
- **Single Node**: Check root only
- **Missing Element**: Proper not-found indication

#### Invalid Operations
- **Null Pointers**: Check for null nodes
- **Tree Corruption**: Detect structural issues
- **Concurrent Modification**: Handle during search

### Performance Monitoring

#### Search Statistics
- **Average Path Length**: Measure search efficiency
- **Cache Hit Rate**: Memory access efficiency
- **Branching Factor**: Tree width analysis

#### Optimization Metrics
- **Balance Factor**: Tree balance measurement
- **Height Distribution**: Node depth analysis
- **Access Patterns**: Frequent search paths

## Practice Tips

- Implement search algorithms for different tree types
- Compare performance between balanced and unbalanced trees
- Practice tree traversal as search operations
- Study specialized tree search algorithms
- Learn to handle edge cases in tree search
- Understand the impact of tree structure on search performance
- Implement concurrent search operations
