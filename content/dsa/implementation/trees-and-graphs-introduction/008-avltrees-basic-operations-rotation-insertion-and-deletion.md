---
title: "AVL Trees - Basic Operations (Rotation, Insertion and Deletion)"
difficulty: "Theory"
tags: ["theory", "data-structures", "trees", "avl-trees", "balancing", "rotations"]
---

## AVL Trees - Basic Operations (Rotation, Insertion and Deletion)

### What are AVL Trees?

AVL trees are self-balancing binary search trees named after their inventors Adelson-Velsky and Landis. They maintain balance by ensuring that the height difference between left and right subtrees (balance factor) is at most 1 for every node.

### Balance Factor

**Definition**: Balance factor = height(right subtree) - height(left subtree)

**Valid Range**: -1, 0, or 1 for balanced nodes

**Violation**: Any node with balance factor outside [-1, 1] is unbalanced

### Rotations

Rotations are fundamental operations used to restore balance in AVL trees. There are four types of rotations.

#### Right Rotation (LL Case)

**When to use**: Left-Left imbalance (balance factor = -2, left child has balance factor ≤ 0)

**Algorithm**:
1. Let node X be the unbalanced node
2. Let Y be X's left child
3. Make Y the new root of this subtree
4. Move Y's right child to X's left
5. Make X the right child of Y

```
     X              Y
    / \            / \
   Y   C   →      A   X
  / \                / \
 A   B              B   C
```

#### Left Rotation (RR Case)

**When to use**: Right-Right imbalance (balance factor = 2, right child has balance factor ≥ 0)

**Algorithm**:
1. Let node X be the unbalanced node
2. Let Y be X's right child
3. Make Y the new root of this subtree
4. Move Y's left child to X's right
5. Make X the left child of Y

```
   X                Y
  / \              / \
 A   Y     →      X   C
    / \          / \
   B   C        A   B
```

#### Left-Right Rotation (LR Case)

**When to use**: Left-Right imbalance (balance factor = -2, left child has balance factor = 1)

**Algorithm**:
1. First perform left rotation on left child
2. Then perform right rotation on current node

```
     X              X                Z
    / \            / \              / \
   Y   C   →      Z   C   →        Y   X
  / \            / \              / \ / \
 A   Z          Y   B            A  B C  D
    / \        / \
   B   D      A   B
```

#### Right-Left Rotation (RL Case)

**When to use**: Right-Left imbalance (balance factor = 2, right child has balance factor = -1)

**Algorithm**:
1. First perform right rotation on right child
2. Then perform left rotation on current node

```
   X                X                Z
  / \              / \              / \
 A   Y     →      A   Z     →      X   Y
    / \              / \          / \ / \
   Z   C            B   Y        A  B C  D
  / \                  / \
 B   D                D   C
```

### Insertion Operation

#### Algorithm

1. **Insert as in BST**: Insert the new key as in a regular binary search tree
2. **Update Heights**: Update heights of all ancestors of the inserted node
3. **Check Balance**: Check balance factor of each ancestor
4. **Rotate if Needed**: Perform appropriate rotation(s) to restore balance

#### Balance Check Cases

- **Case 1 (LL)**: Left-Left imbalance → Right rotation
- **Case 2 (RR)**: Right-Right imbalance → Left rotation  
- **Case 3 (LR)**: Left-Right imbalance → Left-Right rotation
- **Case 4 (RL)**: Right-Left imbalance → Right-Left rotation

#### Implementation

```python
class AVLNode:
    def __init__(self, key):
        self.key = key
        self.left = None
        self.right = None
        self.height = 1

def insert(root, key):
    # Step 1: BST insertion
    if not root:
        return AVLNode(key)
    
    if key < root.key:
        root.left = insert(root.left, key)
    else:
        root.right = insert(root.right, key)
    
    # Step 2: Update height
    root.height = 1 + max(get_height(root.left), get_height(root.right))
    
    # Step 3: Get balance factor
    balance = get_balance(root)
    
    # Step 4: Balance the tree
    # LL Case
    if balance > 1 and key < root.left.key:
        return right_rotate(root)
    
    # RR Case
    if balance < -1 and key > root.right.key:
        return left_rotate(root)
    
    # LR Case
    if balance > 1 and key > root.left.key:
        root.left = left_rotate(root.left)
        return right_rotate(root)
    
    # RL Case
    if balance < -1 and key < root.right.key:
        root.right = right_rotate(root.right)
        return left_rotate(root)
    
    return root
```

### Deletion Operation

#### Algorithm

1. **Delete as in BST**: Delete the node as in a regular binary search tree
2. **Update Heights**: Update heights while backtracking
3. **Check Balance**: Check balance factor at each ancestor
4. **Rotate if Needed**: Perform rotations to maintain balance

#### Deletion Balance Cases

Same as insertion: LL, RR, LR, RL cases apply during the backtracking phase.

#### Implementation

```python
def delete(root, key):
    # Step 1: BST deletion
    if not root:
        return root
    
    if key < root.key:
        root.left = delete(root.left, key)
    elif key > root.key:
        root.right = delete(root.right, key)
    else:
        # Node with only one child or no child
        if root.left is None:
            return root.right
        elif root.right is None:
            return root.left
        
        # Node with two children
        temp = min_value_node(root.right)
        root.key = temp.key
        root.right = delete(root.right, temp.key)
    
    # Step 2: Update height
    root.height = 1 + max(get_height(root.left), get_height(root.right))
    
    # Step 3: Get balance factor
    balance = get_balance(root)
    
    # Step 4: Balance the tree (same cases as insertion)
    if balance > 1 and get_balance(root.left) >= 0:
        return right_rotate(root)
    
    if balance < -1 and get_balance(root.right) <= 0:
        return left_rotate(root)
    
    if balance > 1 and get_balance(root.left) < 0:
        root.left = left_rotate(root.left)
        return right_rotate(root)
    
    if balance < -1 and get_balance(root.right) > 0:
        root.right = right_rotate(root.right)
        return left_rotate(root)
    
    return root
```

### Helper Functions

#### Get Height

```python
def get_height(node):
    if not node:
        return 0
    return node.height
```

#### Get Balance Factor

```python
def get_balance(node):
    if not node:
        return 0
    return get_height(node.left) - get_height(node.right)
```

#### Right Rotation

```python
def right_rotate(y):
    x = y.left
    T2 = x.right
    
    # Perform rotation
    x.right = y
    y.left = T2
    
    # Update heights
    y.height = 1 + max(get_height(y.left), get_height(y.right))
    x.height = 1 + max(get_height(x.left), get_height(x.right))
    
    return x
```

#### Left Rotation

```python
def left_rotate(x):
    y = x.right
    T2 = y.left
    
    # Perform rotation
    y.left = x
    x.right = T2
    
    # Update heights
    x.height = 1 + max(get_height(x.left), get_height(x.right))
    y.height = 1 + max(get_height(y.left), get_height(y.right))
    
    return y
```

### Time Complexity

- **Insertion**: O(log n)
- **Deletion**: O(log n)
- **Search**: O(log n)
- **Height**: Always O(log n)

### Advantages

- **Guaranteed Balance**: Height always O(log n)
- **Fast Operations**: All operations O(log n)
- **Self-Balancing**: No external balancing required
- **Deterministic**: Performance is predictable

### Disadvantages

- **Complex Implementation**: More complex than regular BST
- **Extra Storage**: Height field required
- **Rotation Overhead**: Rotations add computational cost
- **Memory Usage**: Slightly higher than regular BST

### Applications

- **Database Indexing**: Balanced tree structures
- **Symbol Tables**: Compiler implementations
- **Sorted Collections**: Ordered data maintenance
- **File Systems**: Directory organization
- **Priority Queues**: Heap implementations

### Comparison with Other Balanced Trees

| Feature | AVL Tree | Red-Black Tree | B-Tree |
|---------|----------|----------------|--------|
| Balance | Strict | Relaxed | Multi-level |
| Height | Minimal | Near minimal | Varies |
| Rotations | More frequent | Less frequent | Complex |
| Search | Very fast | Fast | Fast |
| Memory | Low | Low | Higher |

## Practice Tips

- Implement all rotations from scratch
- Practice insertion and deletion with balance restoration
- Study the four balance violation cases
- Compare AVL with regular BST performance
- Understand when rotations are triggered
- Learn to calculate balance factors manually
- Practice with different insertion/deletion sequences
