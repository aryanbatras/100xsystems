---
title: "Undirected Graphs"
difficulty: "Theory"
tags: ["theory", "data-structures", "graphs", "undirected-graphs"]
---

## Undirected Graphs

### What are Undirected Graphs?

An undirected graph is a graph where edges have no direction. The edge (u,v) is identical to the edge (v,u), meaning the relationship between vertices is bidirectional.

### Key Characteristics

- **Bidirectional Edges**: Connections work both ways
- **Symmetric Relationships**: Edge (u,v) implies edge (v,u)
- **No Direction**: No concept of source and destination
- **Mutual Connections**: Vertices are equally connected

### Basic Properties

#### Degree of a Vertex
- **Definition**: Number of edges incident to a vertex
- **Formula**: deg(v) = number of neighbors
- **Sum of Degrees**: Always even (handshaking lemma)

#### Handshaking Lemma
- **Statement**: Sum of degrees of all vertices is even
- **Proof**: Each edge contributes 2 to the sum
- **Implication**: Number of odd-degree vertices is even

### Connectivity in Undirected Graphs

#### Connected Graph
- **Definition**: Path exists between every pair of vertices
- **Components**: Single connected component
- **Tree**: Connected acyclic graph

#### Disconnected Graph
- **Definition**: Multiple separate components
- **Components**: Independent subgraphs
- **Connectivity**: Within components only

#### Connected Components
- **Definition**: Maximal connected subgraphs
- **Properties**: No edges between different components
- **Counting**: Number of separate subgraphs

### Special Types of Undirected Graphs

#### Complete Graph (K_n)
- **Definition**: Every pair of vertices is connected
- **Edges**: n(n-1)/2 edges
- **Properties**: Maximum number of edges

#### Bipartite Graph
- **Definition**: Vertices divided into two disjoint sets
- **Edges**: Only between different sets
- **Properties**: No odd cycles

#### Tree
- **Definition**: Connected acyclic graph
- **Properties**: n-1 edges, unique paths
- **Types**: Spanning tree, minimum spanning tree

#### Cycle Graph
- **Definition**: Vertices connected in a cycle
- **Properties**: Regular degree 2
- **Even/Odd Cycles**: Different properties

### Graph Traversals for Undirected Graphs

#### Breadth-First Search (BFS)
- **Level Order**: Visits vertices by distance
- **Shortest Path**: Finds minimum edges between vertices
- **Applications**: Finding closest connections

#### Depth-First Search (DFS)
- **Exploration**: Goes deep before breadth
- **Backtracking**: Useful for exhaustive search
- **Applications**: Path finding, cycle detection

### Cycle Detection in Undirected Graphs

#### Using DFS
- **Back Edge**: Edge to already visited ancestor
- **Cycle Found**: When back edge detected
- **Algorithm**: Modified DFS with parent tracking

#### Using Union-Find
- **Union Operation**: Connect components
- **Find Operation**: Check connectivity
- **Cycle Detection**: Edge between same component

### Spanning Trees

#### Minimum Spanning Tree (MST)
- **Definition**: Subset of edges connecting all vertices with minimum total weight
- **Algorithms**: Kruskal's, Prim's
- **Properties**: Unique for distinct weights, n-1 edges

#### Properties of Spanning Trees
- **Connectivity**: Connects all vertices
- **Acyclic**: No cycles
- **Minimality**: Minimum edges for connectivity

### Coloring in Undirected Graphs

#### Graph Coloring
- **Definition**: Assignment of colors to vertices such that adjacent vertices have different colors
- **Chromatic Number**: Minimum colors needed
- **Applications**: Scheduling, register allocation

#### Bipartite Graph Coloring
- **Two Colors**: Always 2-colorable if bipartite
- **Odd Cycle**: Not 2-colorable
- **Algorithm**: BFS with color assignment

### Matching in Undirected Graphs

#### Maximum Matching
- **Definition**: Largest set of edges without common vertices
- **Applications**: Assignment problems, network flow
- **Algorithms**: Blossom algorithm, Hopcroft-Karp

#### Perfect Matching
- **Definition**: Matching that covers all vertices
- **Conditions**: Hall's marriage theorem
- **Applications**: Bipartite matching problems

### Planar Graphs

#### Planarity
- **Definition**: Graph that can be drawn without edge crossings
- **Euler's Formula**: V - E + F = 2 for connected planar graphs
- **Kuratowski's Theorem**: Characterization of planar graphs

#### Planar Graph Properties
- **Edge Bound**: E ≤ 3V - 6 for V ≥ 3
- **Dual Graph**: Graph representing faces
- **Applications**: Circuit layout, graph drawing

### Graph Isomorphism

#### Isomorphic Graphs
- **Definition**: Graphs with same structure, different labeling
- **Properties**: Same number of vertices, edges, degree sequences
- **Testing**: NP-complete problem
- **Applications**: Pattern recognition, chemical structure matching

### Applications of Undirected Graphs

#### Social Networks
- **Friendship Graphs**: People as vertices, friendships as edges
- **Community Detection**: Finding social groups
- **Influence Propagation**: How information spreads

#### Transportation Networks
- **Road Networks**: Intersections as vertices, roads as edges
- **Railway Systems**: Stations and tracks
- **Airline Routes**: Airports and flight connections

#### Computer Networks
- **Local Area Networks**: Computers and connections
- **Internet Topology**: Routers and links
- **Wireless Networks**: Access points and coverage areas

#### Biological Networks
- **Protein Interaction Networks**: Proteins and interactions
- **Neural Networks**: Neurons and synapses
- **Ecological Networks**: Species and relationships

### Algorithms for Undirected Graphs

#### Kruskal's Algorithm
- **Purpose**: Find minimum spanning tree
- **Approach**: Sort edges, add if no cycle
- **Data Structure**: Union-Find for cycle detection

#### Prim's Algorithm
- **Purpose**: Find minimum spanning tree
- **Approach**: Grow tree from starting vertex
- **Data Structure**: Priority queue for edge selection

#### Dijkstra's Algorithm (for undirected graphs)
- **Purpose**: Find shortest paths from source
- **Approach**: Greedy selection of closest vertex
- **Data Structure**: Priority queue

#### Floyd-Warshall Algorithm
- **Purpose**: Find all-pairs shortest paths
- **Approach**: Dynamic programming
- **Complexity**: O(V³)

### Implementation Considerations

#### Adjacency List vs Matrix
- **Sparse Graphs**: Adjacency list preferred
- **Dense Graphs**: Adjacency matrix acceptable
- **Operations**: List better for traversal, matrix for edge checks

#### Memory Management
- **Dynamic Allocation**: For variable-sized graphs
- **Memory Efficiency**: Choose appropriate representation
- **Space Complexity**: O(V + E) for adjacency list

#### Error Handling
- **Invalid Vertices**: Check bounds
- **Self-Loops**: Handle based on requirements
- **Multiple Edges**: Decide policy

### Common Problems

#### Connectivity Problems
- **Connected Components**: DFS/BFS traversal
- **Articulation Points**: Vertices whose removal increases components
- **Bridges**: Edges whose removal increases components

#### Path Problems
- **Shortest Path**: BFS for unweighted, Dijkstra for weighted
- **All Paths**: DFS with backtracking
- **Hamiltonian Path**: NP-complete, approximation algorithms

#### Cycle Problems
- **Cycle Detection**: DFS with color marking
- **Cycle Finding**: DFS with parent tracking
- **Eulerian Circuit**: Graph with all even degrees

## Practice Tips

- Understand the differences from directed graphs
- Practice connectivity and component analysis
- Learn spanning tree algorithms thoroughly
- Study cycle detection and analysis
- Implement graph coloring algorithms
- Work with real-world undirected graph applications
