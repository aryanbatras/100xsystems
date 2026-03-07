---
title: "Minimum Cost Spanning Tree (Prim and Kruskal)"
difficulty: "Theory"
tags: ["theory", "data-structures", "graphs", "minimum-spanning-tree", "prim", "kruskal", "greedy-algorithm"]
---

## Minimum Cost Spanning Tree (Prim and Kruskal)

### What is a Spanning Tree?

A spanning tree of a connected graph G is a subgraph that is a tree and connects all vertices of G. A minimum spanning tree (MST) is a spanning tree with the minimum total edge weight among all possible spanning trees.

### Properties of MST

- **Connectivity**: Connects all vertices
- **Acyclic**: No cycles
- **Minimum Weight**: Smallest possible sum of edge weights
- **Unique for Distinct Weights**: May not be unique if weights are equal
- **n-1 Edges**: Exactly n-1 edges for n vertices

### Cut Property

The cut property states that for any cut in the graph, the minimum weight edge that crosses the cut is part of some MST.

### Cycle Property

The cycle property states that for any cycle in the graph, the maximum weight edge in that cycle is not part of any MST.

### Kruskal's Algorithm

#### Overview
Kruskal's algorithm builds the MST by adding edges in increasing order of weight, ensuring no cycles are formed.

#### Algorithm Steps

1. **Sort Edges**: Sort all edges by weight in ascending order
2. **Initialize**: Create n singleton sets (one for each vertex)
3. **Process Edges**: For each edge in sorted order:
   - If the edge connects two different components:
     - Add the edge to MST
     - Union the two components
4. **Termination**: Stop when n-1 edges are added or all edges processed

#### Implementation

**Code**:
```python
class UnionFind:
    def __init__(self, size):
        self.parent = list(range(size))
        self.rank = [0] * size
    
    def find(self, x):
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]
    
    def union(self, x, y):
        px, py = self.find(x), self.find(y)
        if px != py:
            if self.rank[px] < self.rank[py]:
                self.parent[px] = py
            elif self.rank[px] > self.rank[py]:
                self.parent[py] = px
            else:
                self.parent[py] = px
                self.rank[px] += 1
            return True
        return False

def kruskal(graph, vertices):
    # graph is list of (weight, u, v) tuples
    graph.sort()  # Sort by weight
    uf = UnionFind(vertices)
    mst = []
    total_weight = 0
    
    for weight, u, v in graph:
        if uf.union(u, v):
            mst.append((u, v, weight))
            total_weight += weight
            if len(mst) == vertices - 1:
                break
    
    return mst, total_weight
```

#### Time Complexity
- **Sorting**: O(E log E)
- **Union-Find**: Nearly O(E α(V)) where α is inverse Ackermann function
- **Total**: O(E log E)

#### Advantages
- **Simple Implementation**: Easy to understand and code
- **Edge-Based**: Works well with edge lists
- **Sparse Graphs**: Efficient for graphs with few edges

### Prim's Algorithm

#### Overview
Prim's algorithm grows the MST from a starting vertex by repeatedly adding the cheapest edge that connects a vertex in the MST to a vertex outside the MST.

#### Algorithm Steps

1. **Initialize**: Start with an arbitrary vertex in MST
2. **Priority Queue**: Maintain priority queue of edges from MST to non-MST vertices
3. **Grow MST**: While MST doesn't include all vertices:
   - Select minimum weight edge connecting MST to non-MST
   - Add the edge and new vertex to MST
   - Update priority queue with new edges from new vertex
4. **Termination**: When all vertices are included

#### Implementation

**Code**:
```python
import heapq

def prim(graph, start):
    # graph is adjacency list: {vertex: [(neighbor, weight), ...]}
    visited = set()
    mst = []
    total_weight = 0
    
    # Priority queue: (weight, from_vertex, to_vertex)
    pq = [(0, start, start)]  # Dummy edge to start
    
    while pq:
        weight, from_v, to_v = heapq.heappop(pq)
        
        if to_v in visited:
            continue
        
        visited.add(to_v)
        total_weight += weight
        
        if from_v != to_v:  # Skip dummy edge
            mst.append((from_v, to_v, weight))
        
        # Add edges from to_v to unvisited neighbors
        for neighbor, edge_weight in graph[to_v]:
            if neighbor not in visited:
                heapq.heappush(pq, (edge_weight, to_v, neighbor))
    
    return mst, total_weight
```

#### Time Complexity
- **Binary Heap**: O((V + E) log V)
- **Simple Array**: O(V²)
- **Fibonacci Heap**: O(E + V log V) theoretically

#### Advantages
- **Vertex-Based**: Good for dense graphs
- **Incremental Growth**: Builds MST incrementally
- **Priority Queue Friendly**: Works well with heap data structures

### Kruskal vs Prim Comparison

| Aspect | Kruskal | Prim |
|--------|---------|------|
| Approach | Edge selection | Vertex addition |
| Data Structure | Union-Find | Priority Queue |
| Graph Type | Good for sparse | Good for dense |
| Time Complexity | O(E log E) | O((V+E) log V) |
| Implementation | Simpler | Moderate complexity |
| Memory | Lower | Higher |

### Applications of MST

#### Network Design
- **Computer Networks**: Designing efficient network topologies
- **Telecommunication**: Minimizing cable length for connections
- **Transportation**: Optimizing road/railway network design

#### Clustering
- **Hierarchical Clustering**: Building dendrograms
- **Image Segmentation**: Grouping similar pixels
- **Data Mining**: Finding clusters in datasets

#### Approximation Algorithms
- **TSP Approximation**: Christofides algorithm for traveling salesman
- ** Steiner Tree**: Approximation for network design
- **Facility Location**: Optimizing facility placement

#### Real-World Applications
- **Electrical Grids**: Minimizing wire length
- **Water Distribution**: Optimizing pipe networks
- **Circuit Design**: Minimizing connection costs

### Handling Special Cases

#### Disconnected Graphs
- **No MST**: If graph is disconnected
- **Forest**: MST becomes minimum spanning forest
- **Components**: Separate MST for each component

#### Negative Weights
- **Allowed**: MST algorithms work with negative weights
- **Zero Weights**: Still valid
- **Positive Weights**: Standard case

#### Dense vs Sparse Graphs
- **Dense Graphs**: Prim's algorithm often faster
- **Sparse Graphs**: Kruskal's algorithm more efficient
- **Hybrid Approaches**: Combine both strategies

### Optimizations and Variations

#### Boruvka's Algorithm
- **Parallel Approach**: Finds multiple edges simultaneously
- **Historical**: One of the earliest MST algorithms
- **Complexity**: O(E log V)

#### Reverse Delete Algorithm
- **Reverse Approach**: Start with all edges, remove expensive ones
- **Theoretical Interest**: Complements Kruskal's approach
- **Complexity**: O(E log E)

#### Randomized MST
- **Random Sampling**: Probabilistic edge selection
- **Approximation**: Faster for large graphs
- **Quality**: May not always find optimal MST

### Implementation Considerations

#### Union-Find Optimization
- **Path Compression**: Speeds up find operations
- **Union by Rank**: Prevents tall trees
- **Amortized Analysis**: Nearly constant time operations

#### Priority Queue Choices
- **Binary Heap**: Standard choice, good balance
- **Fibonacci Heap**: Theoretical improvement, complex implementation
- **Simple Array**: O(V²) time, simple for small graphs

#### Edge Representations
- **Edge List**: Good for Kruskal's algorithm
- **Adjacency List**: Standard for Prim's algorithm
- **Adjacency Matrix**: Useful for dense graphs with Prim

### Correctness Proofs

#### Kruskal's Correctness
- **Safe Edges**: Edges that don't form cycles are safe to add
- **Cut Property**: Ensures optimality at each step
- **Termination**: n-1 edges form a tree connecting all vertices

#### Prim's Correctness
- **Greedy Choice**: Closest vertex is always safe to add
- **Cut Property**: Maintains optimality invariant
- **Termination**: All vertices connected with minimum weight

### Performance Analysis

#### Time Complexity Summary
- **Kruskal**: O(E log E) with efficient union-find
- **Prim**: O((V + E) log V) with binary heap
- **Boruvka**: O(E log V) with multiple phases

#### Space Complexity
- **Kruskal**: O(V + E) for graph and union-find
- **Prim**: O(V + E) for graph and priority queue
- **Both**: O(E) for storing MST edges

### Common Issues and Solutions

#### Cycle Detection in Kruskal
- **Union-Find**: Efficient cycle detection
- **Without Union-Find**: DFS/BFS cycle check (slower)
- **Performance**: Union-Find essential for efficiency

#### Priority Queue in Prim
- **Decrease Key**: Binary heap doesn't support efficiently
- **Multiple Entries**: Allow multiple entries for same vertex
- **Lazy Deletion**: Skip outdated entries when dequeued

#### Graph Representations
- **Edge List**: Best for Kruskal's sorting
- **Adjacency List**: Standard for most graph algorithms
- **Adjacency Matrix**: Good for dense graphs

## Practice Tips

- Implement both Kruskal's and Prim's algorithms from scratch
- Compare their performance on different graph types
- Practice union-find optimizations for Kruskal
- Study the correctness proofs for both algorithms
- Apply MST to network design and clustering problems
- Handle edge cases like disconnected graphs and negative weights
- Learn to choose the appropriate algorithm for different scenarios
