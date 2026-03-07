---
title: "Depth First"
difficulty: "Theory"
tags: ["theory", "data-structures", "graphs", "depth-first-search", "dfs"]
---

## Depth First Search (DFS)

### Overview

Depth-First Search (DFS) is a fundamental graph traversal algorithm that explores a graph by going as deep as possible along each branch before backtracking. It uses a stack data structure (either explicitly or through recursion) to keep track of vertices to visit.

### Key Characteristics

- **Exploration Strategy**: Deep before wide
- **Stack-based**: Uses LIFO structure
- **Backtracking**: Returns to previous vertices when stuck
- **Path Finding**: Can find paths in mazes and graphs

### DFS Algorithm

#### Recursive Implementation

**Algorithm**:
1. Mark current vertex as visited
2. Process the current vertex
3. For each unvisited neighbor:
   - Recursively call DFS on that neighbor
4. Backtrack to previous vertex

**Code**:
```python
def dfs_recursive(graph, vertex, visited):
    visited.add(vertex)
    print(vertex)  # Process vertex
    
    for neighbor in graph[vertex]:
        if neighbor not in visited:
            dfs_recursive(graph, neighbor, visited)
```

#### Iterative Implementation

**Algorithm**:
1. Create a stack and push starting vertex
2. Mark starting vertex as visited
3. While stack is not empty:
   - Pop vertex from stack
   - Process the vertex
   - Push unvisited neighbors to stack

**Code**:
```python
def dfs_iterative(graph, start):
    visited = set()
    stack = [start]
    
    while stack:
        vertex = stack.pop()
        if vertex not in visited:
            visited.add(vertex)
            print(vertex)  # Process vertex
            
            # Add unvisited neighbors
            for neighbor in graph[vertex]:
                if neighbor not in visited:
                    stack.append(neighbor)
```

### DFS Properties

#### Time Complexity
- **O(V + E)**: Each vertex and edge is processed once
- **Sparse Graphs**: Closer to O(V)
- **Dense Graphs**: Closer to O(V²)

#### Space Complexity
- **Recursive**: O(V) for call stack (worst case)
- **Iterative**: O(V) for stack and visited set
- **Path Storage**: Additional space for storing paths

### Applications of DFS

#### Graph Traversal
- **Connected Components**: Find all connected parts
- **Path Finding**: Determine if path exists between vertices
- **Maze Solving**: Navigate through maze structures

#### Cycle Detection
- **Undirected Graphs**: Use parent tracking
- **Directed Graphs**: Use color marking (white/gray/black)
- **Topological Sorting**: For DAGs

#### Topological Sorting
- **DAG Requirement**: Graph must be acyclic
- **Order**: Linear ordering of vertices
- **Algorithm**: DFS with finishing time recording

#### Strongly Connected Components
- **Kosaraju's Algorithm**: Two DFS passes
- **Tarjan's Algorithm**: Single DFS with stack
- **Applications**: Compiler optimizations, web graphs

### DFS Tree and Classification of Edges

#### DFS Tree
- **Tree Edges**: Edges used in DFS traversal
- **Back Edges**: Edges to ancestors in DFS tree
- **Forward Edges**: Edges to descendants (directed graphs)
- **Cross Edges**: Edges between different branches

#### Edge Classification
- **Tree Edges**: Part of DFS spanning tree
- **Back Edges**: Indicate cycles in undirected graphs
- **Forward Edges**: From ancestor to descendant
- **Cross Edges**: Between different subtrees

### DFS Timestamps

#### Discovery and Finishing Times
- **Discovery Time**: When vertex is first visited
- **Finishing Time**: When vertex processing is complete
- **Time Interval**: [discovery, finishing] for each vertex

#### Applications of Timestamps
- **Topological Sorting**: Sort by decreasing finishing time
- **Bridge Finding**: Identify articulation points
- **2-SAT Problems**: Satisfiability solving

### DFS in Different Graph Types

#### Undirected Graphs
- **Connectivity**: Find connected components
- **Cycles**: Detect using back edges to parent
- **Bipartite Checking**: Color with two colors

#### Directed Graphs
- **Strong Connectivity**: Mutual reachability
- **Topological Order**: Linear ordering for DAGs
- **Cycle Detection**: Back edges to gray vertices

#### Weighted Graphs
- **Same Algorithm**: Weights don't affect traversal order
- **Path Costs**: Can compute path weights during traversal
- **Minimum Spanning Tree**: Not directly applicable

### Advanced DFS Techniques

#### Iterative Deepening DFS (IDDFS)
- **Combination**: BFS breadth with DFS depth
- **Memory Efficient**: Limited depth prevents stack overflow
- **Optimal**: Finds shortest path in unweighted graphs

#### Bidirectional DFS
- **Two Searches**: From start and target simultaneously
- **Reduced Space**: Meet in the middle
- **Large Graphs**: More efficient for large state spaces

#### DFS with Backtracking
- **Exploration**: Try different paths
- **Pruning**: Eliminate invalid paths early
- **Applications**: N-Queens, Sudoku, maze solving

### Implementation Considerations

#### Stack Overflow Prevention
- **Iterative Version**: Use explicit stack for large graphs
- **Depth Limits**: Set maximum depth for iterative deepening
- **Memory Monitoring**: Track stack usage

#### Visited Tracking
- **Hash Set**: O(1) lookup for sparse graphs
- **Boolean Array**: O(1) access for dense vertex sets
- **Bit Vector**: Memory-efficient for large graphs

#### Recursion vs Iteration
- **Recursive**: Simpler, natural for tree-like structures
- **Iterative**: Better for deep graphs, avoids stack overflow
- **Hybrid**: Recursive with iterative for specific cases

### Common DFS Problems

#### Path Finding
- **Single Path**: Find any path from source to destination
- **All Paths**: Enumerate all possible paths
- **Shortest Path**: Not guaranteed, use BFS instead

#### Component Analysis
- **Connected Components**: DFS from each unvisited vertex
- **Biconnected Components**: Vertices not in any cycle
- **Articulation Points**: Vertices whose removal increases components

#### Graph Coloring
- **2-Coloring**: Check if bipartite
- **Chromatic Number**: Minimum colors needed
- **Register Allocation**: Compiler optimization

### Performance Optimization

#### Early Termination
- **Goal-directed**: Stop when target found
- **Pruning**: Avoid exploring unnecessary branches
- **Heuristics**: Guide search towards promising areas

#### Memory Optimization
- **Visited Array Reuse**: Reuse for multiple DFS calls
- **Path Compression**: Store only necessary path information
- **Lazy Evaluation**: Defer computation until needed

#### Parallel DFS
- **Multiple Threads**: Explore different branches concurrently
- **Load Balancing**: Distribute work evenly
- **Synchronization**: Coordinate between threads

### Debugging DFS

#### Common Issues
- **Infinite Loops**: Missing visited check
- **Stack Overflow**: Deep recursion on large graphs
- **Wrong Traversal Order**: Incorrect neighbor processing
- **Memory Leaks**: Not cleaning up data structures

#### Testing Strategies
- **Small Graphs**: Test on known small examples
- **Edge Cases**: Empty graph, single vertex, disconnected graph
- **Correctness**: Verify traversal visits all reachable vertices
- **Performance**: Check time and space usage

### DFS Variants

#### Preorder DFS
- **Visit on Entry**: Process vertex before children
- **Tree Construction**: Useful for copying structures
- **Expression Evaluation**: Prefix notation

#### Postorder DFS
- **Visit on Exit**: Process vertex after children
- **Dependency Resolution**: Children before parents
- **Memory Cleanup**: Safe deletion order

#### Inorder DFS (for Trees)
- **Left-Root-Right**: Binary search tree ordering
- **Sorted Output**: Produces sorted sequence
- **Expression Trees**: Infix evaluation

## Practice Tips

- Implement both recursive and iterative DFS versions
- Practice on different graph representations (adjacency list/matrix)
- Understand edge classification in DFS trees
- Learn to detect cycles using DFS
- Study applications in path finding and connectivity
- Debug DFS implementations systematically
- Compare DFS with BFS for different problem types
