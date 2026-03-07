---
title: "Directed Graph & Their Traversal"
difficulty: "Theory"
tags: ["theory", "data-structures", "graphs", "directed-graphs", "traversal"]
---

## Directed Graphs and Their Traversal

### What are Directed Graphs?

A directed graph (or digraph) is a graph where edges have direction. Each edge goes from one vertex to another, indicating a one-way relationship. The edge (u,v) means there is a directed edge from u to v, but not necessarily from v to u.

### Key Characteristics

- **Directed Edges**: Edges have direction (arrows)
- **Asymmetric Relationships**: (u,v) ≠ (v,u)
- **In-degree/Out-degree**: Number of incoming/outgoing edges
- **Path Direction**: Paths must follow edge directions

### Basic Properties

#### Degree Measures
- **Out-degree**: Number of outgoing edges from a vertex
- **In-degree**: Number of incoming edges to a vertex
- **Total Degree**: In-degree + out-degree
- **Source Vertex**: Vertex with in-degree 0
- **Sink Vertex**: Vertex with out-degree 0

#### Path and Reachability
- **Directed Path**: Sequence following edge directions
- **Reachability**: Whether one vertex can reach another
- **Strong Connectivity**: Mutual reachability between vertices

### Types of Directed Graphs

#### Strongly Connected Graph
- **Definition**: Every vertex is reachable from every other vertex
- **Properties**: Single strongly connected component
- **Condensation**: DAG of strongly connected components

#### Weakly Connected Graph
- **Definition**: Connected when ignoring edge directions
- **Properties**: Underlying undirected graph is connected
- **Components**: Weakly connected components

#### Directed Acyclic Graph (DAG)
- **Definition**: Directed graph with no cycles
- **Properties**: Topological ordering exists
- **Applications**: Task scheduling, dependency resolution

### Traversal Algorithms for Directed Graphs

#### Depth-First Search (DFS)
- **Traversal**: Follow directions, explore deeply
- **Stack Usage**: Explicit or implicit stack
- **Backtracking**: When no more outgoing edges

**Algorithm**:
```python
def dfs_directed(graph, vertex, visited):
    visited.add(vertex)
    print(vertex)  # Process vertex
    
    for neighbor in graph[vertex]:
        if neighbor not in visited:
            dfs_directed(graph, neighbor, visited)
```

#### Breadth-First Search (BFS)
- **Traversal**: Level by level following directions
- **Queue Usage**: FIFO queue for processing
- **Shortest Path**: In terms of number of edges

**Algorithm**:
```python
from collections import deque

def bfs_directed(graph, start):
    visited = set()
    queue = deque([start])
    visited.add(start)
    
    while queue:
        vertex = queue.popleft()
        print(vertex)  # Process vertex
        
        for neighbor in graph[vertex]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
```

### Special Traversal Concepts

#### Topological Sorting
- **Applicable**: Only for DAGs
- **Order**: Linear ordering of vertices
- **Property**: For every edge (u,v), u comes before v
- **Algorithm**: DFS or Kahn's algorithm

**Kahn's Algorithm**:
1. Calculate in-degrees
2. Initialize queue with vertices having in-degree 0
3. While queue not empty:
   - Remove vertex, add to result
   - Decrease in-degrees of neighbors
   - Add neighbors with in-degree 0 to queue

#### Strongly Connected Components (SCC)
- **Definition**: Maximal strongly connected subgraph
- **Algorithm**: Kosaraju's or Tarjan's algorithm
- **Kosaraju's Algorithm**:
  1. DFS to get finishing times
  2. Transpose graph
  3. DFS in order of decreasing finishing times

### Cycle Detection in Directed Graphs

#### Using DFS with Colors
- **White**: Unvisited
- **Gray**: Visiting (in current path)
- **Black**: Visited (finished)
- **Cycle**: Back edge to gray vertex

#### Algorithm
```python
def has_cycle(graph):
    visited = set()
    rec_stack = set()
    
    def dfs_cycle(vertex):
        visited.add(vertex)
        rec_stack.add(vertex)
        
        for neighbor in graph[vertex]:
            if neighbor not in visited:
                if dfs_cycle(neighbor):
                    return True
            elif neighbor in rec_stack:
                return True
        
        rec_stack.remove(vertex)
        return False
    
    for vertex in graph:
        if vertex not in visited:
            if dfs_cycle(vertex):
                return True
    return False
```

### Directed Graph Algorithms

#### Shortest Path Algorithms
- **Dijkstra's Algorithm**: Non-negative weights
- **Bellman-Ford Algorithm**: Negative weights allowed
- **Floyd-Warshall Algorithm**: All-pairs shortest paths

#### Minimum Spanning Tree
- **Not Applicable**: MST is for undirected graphs
- **Alternative**: Minimum cost arborescence

#### Maximum Flow
- **Ford-Fulkerson Method**: Augmenting path algorithm
- **Edmonds-Karp Algorithm**: BFS-based implementation
- **Applications**: Network flow problems

### Connectivity in Directed Graphs

#### Strongly Connected Components
- **Mutual Reachability**: Every pair mutually reachable
- **Condensation Graph**: DAG of SCCs
- **Applications**: Program analysis, web page ranking

#### Weakly Connected Components
- **Undirected Connectivity**: Ignore directions
- **Properties**: Same as undirected components
- **Applications**: Basic connectivity analysis

### Applications of Directed Graphs

#### Compiler Design
- **Control Flow Graphs**: Program flow representation
- **Dependency Graphs**: Variable dependencies
- **Call Graphs**: Function call relationships

#### Web and Networks
- **Web Graph**: Pages as vertices, links as directed edges
- **Citation Networks**: Papers and citations
- **Social Networks**: Following relationships

#### Scheduling and Dependencies
- **Task Scheduling**: Task dependencies
- **Build Systems**: File dependencies
- **Project Management**: Activity precedence

#### Transportation
- **One-way Streets**: Traffic direction
- **Flight Routes**: Directed flight connections
- **Supply Chain**: Material flow direction

#### Biology and Chemistry
- **Regulatory Networks**: Gene regulation directions
- **Metabolic Pathways**: Reaction directions
- **Food Webs**: Predator-prey relationships

### Implementation Considerations

#### Adjacency List Representation
- **Space Efficient**: O(V + E) space
- **Traversal**: Easy to iterate outgoing edges
- **In-degree**: Requires separate tracking

#### Adjacency Matrix Representation
- **Space**: O(V²) space
- **Edge Check**: O(1) time
- **Dense Graphs**: More suitable

#### Incidence Matrix
- **Space**: O(V × E) space
- **Edge Information**: Detailed edge information
- **Complex Operations**: More complex traversals

### Common Problems

#### Topological Sorting Problems
- **Course Prerequisites**: Course dependency ordering
- **Task Scheduling**: Task execution order
- **Deadlock Detection**: Resource allocation cycles

#### Cycle Detection Problems
- **Deadlock Prevention**: Resource allocation graphs
- **Circular Dependencies**: Module import cycles
- **Event Scheduling**: Temporal constraint cycles

#### Path Finding Problems
- **Network Routing**: Packet routing in networks
- **Workflow Management**: Process flow optimization
- **Dependency Resolution**: Package installation order

### Performance Analysis

#### Time Complexity
- **DFS/BFS**: O(V + E)
- **Topological Sort**: O(V + E)
- **SCC Detection**: O(V + E)
- **Cycle Detection**: O(V + E)

#### Space Complexity
- **Adjacency List**: O(V + E)
- **Adjacency Matrix**: O(V²)
- **Traversal**: O(V) for visited arrays

### Advanced Concepts

#### Transitive Closure
- **Definition**: Matrix showing reachability between all pairs
- **Computation**: Floyd-Warshall or DFS-based
- **Applications**: Database query optimization

#### Strongly Connected Components Applications
- **2-SAT Problems**: Boolean satisfiability
- **Model Checking**: System verification
- **Web Page Ranking**: Page importance calculation

#### Directed Graph Coloring
- **Acyclic Coloring**: No two adjacent vertices same color
- **Feedback Vertex Set**: Minimum vertices to remove for acyclicity

## Practice Tips

- Understand the asymmetry of directed relationships
- Practice topological sorting on DAGs
- Learn cycle detection algorithms thoroughly
- Study strongly connected components
- Implement directed graph traversal algorithms
- Work with real-world directed graph applications
