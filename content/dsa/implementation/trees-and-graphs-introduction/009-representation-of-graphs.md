---
title: "Representation of Graphs"
difficulty: "Theory"
tags: ["theory", "data-structures", "graphs", "representation", "adjacency-matrix", "adjacency-list"]
---

## Representation of Graphs

### What is a Graph?

A graph is a non-linear data structure consisting of nodes (vertices) connected by edges. Graphs are used to represent relationships between objects and are fundamental to many algorithms in computer science.

### Graph Components

- **Vertices (Nodes)**: Fundamental units that represent entities
- **Edges**: Connections between vertices
- **Directed Edges**: One-way connections (arrows)
- **Undirected Edges**: Two-way connections (lines)
- **Weighted Edges**: Edges with associated costs or weights
- **Self-Loops**: Edges connecting a vertex to itself

### Types of Graphs

#### Undirected Graph
- Edges have no direction
- Edge (u,v) is same as (v,u)
- No self-loops typically

#### Directed Graph (Digraph)
- Edges have direction
- Edge (u,v) ≠ (v,u)
- Can have self-loops

#### Weighted Graph
- Edges have weights/costs
- Can be directed or undirected

#### Unweighted Graph
- All edges have equal weight (typically 1)
- Focus on connectivity

### Graph Representation Methods

#### Adjacency Matrix

**Description**: 2D matrix where matrix[i][j] represents the edge between vertices i and j.

**Characteristics**:
- **Space Complexity**: O(V²) where V is number of vertices
- **Time Complexity**:
  - Check edge: O(1)
  - Find neighbors: O(V)
  - Add edge: O(1)
- **Memory Usage**: High for sparse graphs
- **Implementation**: Simple 2D array

**For Undirected Graph**:
```python
# Initialize V x V matrix with 0s
adj_matrix = [[0] * V for _ in range(V)]

# Add edge between u and v
adj_matrix[u][v] = 1
adj_matrix[v][u] = 1  # For undirected
```

**For Directed Graph**:
```python
# Add directed edge from u to v
adj_matrix[u][v] = 1
# No reverse edge for directed
```

**For Weighted Graph**:
```python
# Use weight instead of 1
adj_matrix[u][v] = weight
```

**Advantages**:
- Simple implementation
- Fast edge existence check
- Easy to understand
- Good for dense graphs

**Disadvantages**:
- High space complexity
- Wasted space for sparse graphs
- Not suitable for dynamic graphs

#### Adjacency List

**Description**: Array of lists where each list represents neighbors of a vertex.

**Characteristics**:
- **Space Complexity**: O(V + E) where E is number of edges
- **Time Complexity**:
  - Check edge: O(degree of vertex)
  - Find neighbors: O(degree of vertex)
  - Add edge: O(1)
- **Memory Usage**: Efficient for sparse graphs
- **Implementation**: Array of linked lists or dynamic arrays

**For Undirected Graph**:
```python
# Initialize list of lists
adj_list = [[] for _ in range(V)]

# Add edge between u and v
adj_list[u].append(v)
adj_list[v].append(u)  # For undirected
```

**For Directed Graph**:
```python
# Add directed edge from u to v
adj_list[u].append(v)
# No reverse for directed
```

**For Weighted Graph**:
```python
# Store (neighbor, weight) pairs
adj_list[u].append((v, weight))
```

**Advantages**:
- Space efficient
- Good for sparse graphs
- Easy to iterate through neighbors
- Suitable for dynamic graphs

**Disadvantages**:
- Slower edge existence check
- More complex implementation
- Requires dynamic memory allocation

### Comparison of Representations

| Aspect | Adjacency Matrix | Adjacency List |
|--------|------------------|----------------|
| Space | O(V²) | O(V + E) |
| Edge Check | O(1) | O(degree) |
| Neighbors | O(V) | O(degree) |
| Add Edge | O(1) | O(1) |
| Dense Graphs | Good | Poor |
| Sparse Graphs | Poor | Good |
| Implementation | Simple | Moderate |

### Advanced Representations

#### Incidence Matrix

**Description**: Matrix showing relationship between vertices and edges.

- **Rows**: Vertices
- **Columns**: Edges
- **Values**: -1 (tail), +1 (head) for directed, 1 for undirected

**Use Cases**:
- Edge-based operations
- Flow networks
- Complex graph algorithms

#### Edge List

**Description**: Simple list of all edges in the graph.

**Structure**:
```python
edges = [(u1, v1), (u2, v2), ...]  # Undirected
edges = [(u1, v1, weight1), (u2, v2, weight2), ...]  # Weighted
```

**Use Cases**:
- Kruskal's algorithm
- Simple graph storage
- Memory-constrained environments

#### Adjacency Set

**Description**: Array of sets instead of lists for fast membership testing.

**Implementation**:
```python
adj_set = [set() for _ in range(V)]
```

**Advantages**:
- Fast edge existence check: O(1)
- Set operations available
- Good for dynamic graphs

### Choosing the Right Representation

#### Factors to Consider

- **Graph Density**: Dense → Matrix, Sparse → List
- **Operations Needed**: Edge checks → Matrix, Traversals → List
- **Memory Constraints**: Limited memory → List
- **Dynamic Nature**: Changing structure → List
- **Algorithm Requirements**: Specific algorithms may prefer certain representations

#### Common Guidelines

- **Most Algorithms**: Adjacency List
- **All-Pairs Shortest Path**: Adjacency Matrix
- **Dense Graphs**: Adjacency Matrix
- **Sparse Graphs**: Adjacency List
- **Simple Implementation**: Adjacency Matrix

### Implementation Considerations

#### Memory Management

- **Static Graphs**: Pre-allocated structures
- **Dynamic Graphs**: Resizable data structures
- **Memory Efficiency**: Choose appropriate data types
- **Cache Performance**: Consider memory access patterns

#### Error Handling

- **Invalid Vertices**: Check vertex bounds
- **Self-Loops**: Handle appropriately
- **Multiple Edges**: Decide policy (allow/disallow)
- **Negative Weights**: Handle based on algorithm

#### Language-Specific Considerations

**Python**:
```python
# List of lists for adjacency list
adj_list = [[] for _ in range(V)]

# Dictionary for sparse representations
adj_dict = {i: [] for i in range(V)}
```

**C++**:
```cpp
// Vector of vectors for adjacency list
vector<vector<int>> adj_list(V);

// Vector of sets for fast lookups
vector<unordered_set<int>> adj_set(V);
```

**Java**:
```java
// ArrayList for adjacency list
ArrayList<ArrayList<Integer>> adjList = new ArrayList<>(V);

// HashSet for fast operations
ArrayList<HashSet<Integer>> adjSet = new ArrayList<>(V);
```

### Graph Construction

#### From Edge List
```python
def build_graph(V, edges, directed=False):
    adj_list = [[] for _ in range(V)]
    for u, v in edges:
        adj_list[u].append(v)
        if not directed:
            adj_list[v].append(u)
    return adj_list
```

#### From Adjacency Matrix
```python
def matrix_to_list(adj_matrix):
    V = len(adj_matrix)
    adj_list = [[] for _ in range(V)]
    for i in range(V):
        for j in range(V):
            if adj_matrix[i][j] != 0:
                adj_list[i].append(j)
    return adj_list
```

### Applications

- **Social Networks**: User relationships
- **Transportation Networks**: Roads, flights
- **Computer Networks**: Internet topology
- **Dependency Graphs**: Software dependencies
- **Recommendation Systems**: User-item relationships

## Practice Tips

- Implement both adjacency matrix and list representations
- Convert between different representations
- Analyze space and time trade-offs for different graph types
- Practice graph construction from various input formats
- Understand when to use each representation
- Learn language-specific implementation details
