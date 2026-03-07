---
title: "Optimum Search Trees"
difficulty: "Theory"
tags: ["theory", "data-structures", "trees", "dynamic-programming", "optimum-search-trees"]
---

## Optimum Search Trees

### What are Optimum Search Trees?

An optimum search tree (also called optimal binary search tree) is a binary search tree that minimizes the expected search cost for a given set of keys with known access frequencies. Unlike balanced BSTs that minimize worst-case operations, optimal BSTs minimize average-case search time.

### Problem Definition

Given:
- **Keys**: Sorted array of keys K = [k₁, k₂, ..., kₙ]
- **Frequencies**: Access frequencies f₁, f₂, ..., fₙ for each key
- **Dummy Keys**: Frequencies for unsuccessful searches between keys

Find a BST structure that minimizes the expected search cost.

### Cost Analysis

#### Search Cost
- **Successful Search**: Cost proportional to number of comparisons
- **Unsuccessful Search**: Cost for searches that fail
- **Expected Cost**: Weighted average over all possible searches

#### Cost Formula
For a BST with root r:
```
Cost = Σ(freq[i] × depth(i)) for all keys i
     + Σ(dummy_freq[j] × depth(j)) for unsuccessful searches
```

Where depth(i) is the depth of key i in the tree.

### Dynamic Programming Approach

#### Optimal Substructure
The optimal BST for keys i to j with root r satisfies:
- Left subtree: optimal BST for keys i to r-1
- Right subtree: optimal BST for keys r+1 to j

#### Recurrence Relation
```
OPT[i][j] = min over r=i to j of {
    OPT[i][r-1] + OPT[r+1][j] + cost of subtree i to j with root r
}
```

Where cost includes the frequency sum of the subtree.

#### Cost Calculation
```
cost[i][j] = Σ freq[k] for k=i to j
           + Σ dummy_freq[k] for dummies between i and j
```

### Implementation

#### Table Construction

**Algorithm**:
1. Create tables OPT[n+1][n+1] and root[n+1][n+1]
2. Initialize for single keys: OPT[i][i] = freq[i]
3. For length from 2 to n:
   - For each possible subtree i to j:
     - Try each possible root r
     - Calculate cost = OPT[i][r-1] + OPT[r+1][j] + cost[i][j]
     - Keep minimum cost and record root

**Code Structure**:
```python
def optimal_bst(keys, freq, dummy_freq):
    n = len(keys)
    # Initialize tables
    opt = [[0] * (n+1) for _ in range(n+1)]
    root = [[0] * (n+1) for _ in range(n+1)]
    
    # For single keys
    for i in range(1, n+1):
        opt[i][i] = freq[i-1]
        root[i][i] = i
    
    # For chains of increasing length
    for length in range(2, n+1):
        for i in range(1, n-length+2):
            j = i + length - 1
            opt[i][j] = float('inf')
            
            # Try each possible root
            for r in range(i, j+1):
                cost = (opt[i][r-1] if r > i else 0) + \
                       (opt[r+1][j] if r < j else 0) + \
                       sum(freq[k-1] for k in range(i, j+1))
                
                if cost < opt[i][j]:
                    opt[i][j] = cost
                    root[i][j] = r
    
    return opt, root
```

### Time and Space Complexity

- **Time Complexity**: O(n³) due to three nested loops
- **Space Complexity**: O(n²) for the DP tables
- **Optimization**: Can be improved to O(n²) with better cost calculation

### Constructing the Tree

#### Tree Construction Algorithm

**Algorithm**:
1. Use the root table to build the tree recursively
2. For subtree i to j with root r:
   - Create node for key r
   - Recursively build left subtree i to r-1
   - Recursively build right subtree r+1 to j

### Applications

- **Database Indexing**: Optimizing index structures
- **Compiler Design**: Symbol table organization
- **File Systems**: Directory structure optimization
- **Decision Trees**: Minimizing average access time
- **Cache Optimization**: Frequently accessed data placement

### Comparison with Other BSTs

| Property | Optimal BST | AVL Tree | Red-Black Tree |
|----------|-------------|----------|----------------|
| Balance | Perfect for frequencies | Height balanced | Height balanced |
| Operations | Static (precomputed) | Dynamic | Dynamic |
| Time Complexity | O(log n) average | O(log n) worst | O(log n) worst |
| Construction | O(n³) | O(n log n) | O(n log n) |
| Updates | Expensive | Efficient | Efficient |

### Limitations

- **Static Nature**: Not suitable for dynamic updates
- **Frequency Knowledge**: Requires access pattern knowledge
- **Construction Cost**: Expensive to build for large n
- **Memory Overhead**: Requires additional storage for tables

### Extensions

#### Weighted Optimal BST
- Different weights for successful and unsuccessful searches
- More general cost model
- Applications in text compression

#### Optimal Binary Search Trees with Costs
- Different costs for comparisons at different levels
- Non-uniform comparison costs
- Hardware-specific optimizations

### Implementation Considerations

#### Input Requirements
- **Sorted Keys**: Keys must be in sorted order
- **Frequency Data**: Accurate access frequency information
- **Dummy Frequencies**: For unsuccessful search costs

#### Numerical Stability
- **Large Frequencies**: Handle overflow with appropriate data types
- **Floating Point**: Use appropriate precision for calculations
- **Infinity Handling**: Proper initialization of minimum values

#### Memory Optimization
- **Table Reuse**: Reuse space for different subproblems
- **Sparse Storage**: Only store necessary table entries
- **Recursive Construction**: Build tree without storing full table

### Real-World Usage

- **Database Query Optimization**: Index selection
- **Code Generation**: Optimal decision tree construction
- **Text Processing**: Huffman-like tree construction
- **Network Routing**: Optimal routing table organization

### Related Problems

- **Matrix Chain Multiplication**: Similar DP approach
- **Optimal Binary Search**: Finding optimal search strategies
- **Huffman Coding**: Optimal prefix code construction
- **Minimum Cost BST**: Variations with different cost models

## Practice Tips

- Implement the DP algorithm for optimal BST construction
- Practice with small examples to understand cost calculations
- Compare with other BST construction methods
- Study the trade-offs between construction cost and search efficiency
- Learn to reconstruct the tree from the DP tables
- Understand applications in database and compiler design
