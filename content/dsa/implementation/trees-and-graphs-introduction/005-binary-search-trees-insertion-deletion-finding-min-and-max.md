---
title: "Binary Search Trees - Insertion, Deletion, Finding Min and Max"
difficulty: "Theory"
tags: ["theory", "data-structures", "trees", "binary-search-trees", "operations"]
---

## Binary Search Trees - Insertion, Deletion, Finding Min and Max

### Binary Search Tree (BST) Properties

A Binary Search Tree is a binary tree with the following ordering property:

- **Left Subtree**: All nodes have values less than the root
- **Right Subtree**: All nodes have values greater than the root
- **Recursive Property**: Both subtrees are also BSTs

This property ensures efficient search, insertion, and deletion operations.

### Finding Minimum and Maximum

#### Finding Minimum Value

**Algorithm**:
1. Start from root
2. Traverse left until reaching a node with no left child
3. Return that node's value

**Implementation**:
```python
def find_min(root):
    if root is None:
        return None
    current = root
    while current.left is not None:
        current = current.left
    return current.data
```

**Properties**:
- **Time Complexity**: O(h) where h is tree height
- **Space Complexity**: O(1)
- **Result**: Leftmost node in the tree

#### Finding Maximum Value

**Algorithm**:
1. Start from root
2. Traverse right until reaching a node with no right child
3. Return that node's value

**Implementation**:
```python
def find_max(root):
    if root is None:
        return None
    current = root
    while current.right is not None:
        current = current.right
    return current.data
```

**Properties**:
- **Time Complexity**: O(h) where h is tree height
- **Space Complexity**: O(1)
- **Result**: Rightmost node in the tree

### Insertion Operation

#### Insertion Algorithm

**Algorithm**:
1. If tree is empty, create new node as root
2. Compare value with current node:
   - If less, go left
   - If greater, go right
   - If equal, handle duplicate (usually go right or left)
3. Recur until finding null position
4. Insert new node at that position

**Implementation**:
```python
def insert(root, value):
    if root is None:
        return Node(value)
    
    if value < root.data:
        root.left = insert(root.left, value)
    elif value > root.data:
        root.right = insert(root.right, value)
    # For duplicates, can choose to go left or right
    # Here we go right for equal values
    
    return root
```

**Properties**:
- **Time Complexity**: O(h) average, O(n) worst case
- **Space Complexity**: O(h) for recursion stack
- **Maintains BST Property**: Ordering preserved

#### Iterative Insertion

**Algorithm**:
1. If tree empty, create root
2. Start from root, traverse until finding insertion point
3. Insert new node

**Implementation**:
```python
def insert_iterative(root, value):
    new_node = Node(value)
    if root is None:
        return new_node
    
    current = root
    parent = None
    
    while current is not None:
        parent = current
        if value < current.data:
            current = current.left
        else:
            current = current.right
    
    if value < parent.data:
        parent.left = new_node
    else:
        parent.right = new_node
    
    return root
```

### Deletion Operation

#### Deletion Cases

**Case 1: Node to delete is a leaf**
- Simply remove the node
- Update parent's pointer to null

**Case 2: Node has one child**
- Replace node with its child
- Update parent's pointer to the child

**Case 3: Node has two children**
- Find inorder successor (or predecessor)
- Replace node's value with successor's value
- Delete the successor node (which will be case 1 or 2)

#### Deletion Algorithm

**Implementation**:
```python
def delete(root, value):
    if root is None:
        return root
    
    # Find the node to delete
    if value < root.data:
        root.left = delete(root.left, value)
    elif value > root.data:
        root.right = delete(root.right, value)
    else:
        # Node found
        
        # Case 1: No children
        if root.left is None and root.right is None:
            return None
        
        # Case 2: One child
        elif root.left is None:
            return root.right
        elif root.right is None:
            return root.left
        
        # Case 3: Two children
        else:
            # Find inorder successor (min in right subtree)
            successor = find_min(root.right)
            root.data = successor.data
            # Delete the successor
            root.right = delete(root.right, successor.data)
    
    return root
```

#### Finding Successor/Predecessor

**Inorder Successor**:
- Smallest value larger than current node
- Right subtree's minimum, or ancestor where node is in left subtree

**Inorder Predecessor**:
- Largest value smaller than current node
- Left subtree's maximum, or ancestor where node is in right subtree

### Time Complexity Analysis

| Operation | Average Case | Worst Case | Best Case |
|-----------|-------------|------------|-----------|
| Search | O(log n) | O(n) | O(log n) |
| Insert | O(log n) | O(n) | O(log n) |
| Delete | O(log n) | O(n) | O(log n) |
| Find Min | O(log n) | O(n) | O(log n) |
| Find Max | O(log n) | O(n) | O(log n) |

### Space Complexity

- **Tree Storage**: O(n) for n nodes
- **Recursion Stack**: O(h) for operations
- **Worst Case**: O(n) for skewed trees

### Implementation Considerations

#### Handling Duplicates

- **Option 1**: Allow duplicates in right subtree
- **Option 2**: Allow duplicates in left subtree
- **Option 3**: Disallow duplicates entirely
- **Option 4**: Use counters for frequency

#### Tree Balance

- **Balanced Trees**: AVL, Red-Black provide guaranteed O(log n)
- **Self-balancing**: Automatic rebalancing during operations
- **Height Constraint**: Maximum height difference between subtrees

#### Memory Management

- **Node Allocation**: Dynamic memory allocation
- **Pointer Updates**: Careful maintenance of parent-child relationships
- **Memory Deallocation**: Proper cleanup to prevent leaks

### Common BST Problems

#### Validation
- **BST Property Check**: Verify ordering property
- **Height Calculation**: Tree height and balance
- **Completeness Check**: Check if tree is complete

#### Conversions
- **Sorted Array to BST**: Balanced BST construction
- **BST to Sorted List**: Inorder traversal
- **BST Operations**: Range queries, k-th element

#### Advanced Operations
- **Lowest Common Ancestor**: Find LCA of two nodes
- **Inorder Successor/Predecessor**: Find next/previous element
- **Range Queries**: Count elements in range

## Practice Tips

- Implement all BST operations from scratch
- Practice with different tree shapes (balanced, skewed, complete)
- Understand deletion cases and successor selection
- Learn iterative vs recursive implementations
- Study time complexity analysis for different cases
- Practice tree reconstruction and validation algorithms
