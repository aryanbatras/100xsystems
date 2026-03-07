---
title: "Traversal Algorithms"
difficulty: "Theory"
tags: ["theory", "data-structures", "trees", "algorithms", "traversal"]
---

## Traversal Algorithms

### Tree Traversal Overview

Tree traversal algorithms visit each node in a tree exactly once, following specific patterns. These algorithms are fundamental to tree operations and form the basis for many tree-based algorithms.

### Depth-First Traversal (DFT)

Depth-first traversal explores as far as possible along each branch before backtracking.

#### Inorder Traversal (Left-Root-Right)

**Algorithm**:
1. Traverse left subtree recursively
2. Visit root node
3. Traverse right subtree recursively

**Recursive Implementation**:
```python
def inorder(root):
    if root:
        inorder(root.left)
        print(root.data)
        inorder(root.right)
```

**Iterative Implementation**:
```python
def inorder_iterative(root):
    stack = []
    current = root
    while current or stack:
        while current:
            stack.append(current)
            current = current.left
        current = stack.pop()
        print(current.data)
        current = current.right
```

**Properties**:
- **Binary Search Trees**: Produces sorted order
- **Time Complexity**: O(n)
- **Space Complexity**: O(h) recursive, O(n) iterative worst case
- **Applications**: BST validation, expression tree evaluation

#### Preorder Traversal (Root-Left-Right)

**Algorithm**:
1. Visit root node
2. Traverse left subtree recursively
3. Traverse right subtree recursively

**Recursive Implementation**:
```python
def preorder(root):
    if root:
        print(root.data)
        preorder(root.left)
        preorder(root.right)
```

**Iterative Implementation**:
```python
def preorder_iterative(root):
    if not root:
        return
    stack = [root]
    while stack:
        node = stack.pop()
        print(node.data)
        if node.right:
            stack.append(node.right)
        if node.left:
            stack.append(node.left)
```

**Properties**:
- **Tree Copying**: Useful for creating tree copies
- **Prefix Notation**: Used in expression evaluation
- **Time Complexity**: O(n)
- **Space Complexity**: O(h) recursive, O(n) iterative worst case

#### Postorder Traversal (Left-Right-Root)

**Algorithm**:
1. Traverse left subtree recursively
2. Traverse right subtree recursively
3. Visit root node

**Recursive Implementation**:
```python
def postorder(root):
    if root:
        postorder(root.left)
        postorder(root.right)
        print(root.data)
```

**Iterative Implementation**:
```python
def postorder_iterative(root):
    if not root:
        return
    stack1 = [root]
    stack2 = []
    while stack1:
        node = stack1.pop()
        stack2.append(node)
        if node.left:
            stack1.append(node.left)
        if node.right:
            stack1.append(node.right)
    while stack2:
        print(stack2.pop().data)
```

**Properties**:
- **Tree Deletion**: Safe for deleting tree nodes
- **Postfix Notation**: Used in expression evaluation
- **Memory Deallocation**: Visits children before parent
- **Time Complexity**: O(n)
- **Space Complexity**: O(h) recursive, O(n) iterative worst case

### Breadth-First Traversal (BFT)

Breadth-first traversal visits all nodes at a given level before moving to the next level.

#### Level Order Traversal

**Algorithm**:
1. Create a queue and enqueue root
2. While queue is not empty:
   - Dequeue front node
   - Visit the node
   - Enqueue left child if exists
   - Enqueue right child if exists

**Implementation**:
```python
from collections import deque

def level_order(root):
    if not root:
        return
    queue = deque([root])
    while queue:
        node = queue.popleft()
        print(node.data)
        if node.left:
            queue.append(node.left)
        if node.right:
            queue.append(node.right)
```

**Properties**:
- **Level-by-Level Processing**: Processes nodes by depth
- **Shortest Path**: Finds minimum depth operations
- **Time Complexity**: O(n)
- **Space Complexity**: O(w) where w is maximum width

### Advanced Traversal Techniques

#### Morris Traversal

**Inorder Morris Traversal**:
- **Space Complexity**: O(1) auxiliary space
- **Threading**: Uses right pointers as threads
- **Algorithm**:
  1. Initialize current as root
  2. While current is not null:
     - If current has no left child:
       - Visit current
       - Move to right child
     - Else:
       - Find inorder predecessor
       - Make current right child of predecessor
       - Move current to left child

#### Boundary Traversal

**Left Boundary + Leaves + Right Boundary**:
1. Print left boundary (excluding leaves)
2. Print all leaves
3. Print right boundary (excluding leaves)

#### Diagonal Traversal

**Diagonal Sum/Aggregation**:
- Group nodes by diagonal (same diagonal have same diagonal distance)
- Use queue with diagonal distance tracking

#### Vertical Traversal

**Column-wise Traversal**:
- Assign column numbers (-1 for left, 0 for root, +1 for right)
- Use map or list of lists to store nodes by column

### Traversal Applications

#### Tree Construction
- **From Traversals**: Reconstruct tree from inorder + preorder/postorder
- **From Level Order**: Build tree from level order and inorder

#### Tree Analysis
- **Height Calculation**: Using any traversal
- **Diameter**: Using postorder traversal
- **Path Finding**: Finding paths from root to leaf

#### Expression Evaluation
- **Inorder**: Infix expressions
- **Preorder**: Prefix expressions
- **Postorder**: Postfix expressions

### Implementation Considerations

#### Recursive vs Iterative
- **Recursive**: Simpler code, stack overflow risk
- **Iterative**: Complex implementation, no overflow risk
- **Choice**: Depends on tree size and constraints

#### Space Optimization
- **Morris Traversal**: O(1) extra space
- **Iterative with Stack**: O(h) space
- **Level Order**: O(w) space

#### Thread Safety
- **Immutable Trees**: Safe for concurrent access
- **Mutable Trees**: Need synchronization for modifications

### Common Traversal Patterns

#### Tree Walking Patterns
- **Visitor Pattern**: Apply operation to each node
- **Predicate-based**: Visit nodes meeting criteria
- **Accumulator**: Collect results during traversal

#### Multi-pass Traversals
- **First Pass**: Gather information
- **Second Pass**: Apply modifications
- **Validation**: Check tree properties

### Performance Comparison

| Traversal | Time | Space (Recursive) | Space (Iterative) | Applications |
|-----------|------|-------------------|-------------------|--------------|
| Inorder | O(n) | O(h) | O(h) | BST, sorting |
| Preorder | O(n) | O(h) | O(h) | Copying, prefix |
| Postorder | O(n) | O(h) | O(h) | Deletion, postfix |
| Level Order | O(n) | O(w) | O(w) | BFS, shortest path |

### Debugging Traversal Code

#### Common Issues
- **Null Pointer Exceptions**: Check for null nodes
- **Infinite Loops**: Ensure proper termination conditions
- **Stack Overflow**: Use iterative for deep trees
- **Wrong Order**: Verify traversal logic

#### Testing Strategies
- **Small Trees**: Test with known small trees
- **Edge Cases**: Empty tree, single node, skewed trees
- **Large Trees**: Performance testing
- **Correctness**: Compare with expected output

## Practice Tips

- Implement all traversal algorithms recursively and iteratively
- Practice tree reconstruction from traversals
- Study space-optimized traversal techniques
- Learn to identify appropriate traversal for specific problems
- Practice with different tree types and structures
- Debug traversal code systematically
