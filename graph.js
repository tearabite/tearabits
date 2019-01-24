var Queue = require('./queue').Queue;

class Graph {
    constructor () {
        this.adjacencyList = new Map();
    }

    /**
     * Get the number of nodes (vertices) in the graph.
     */
    get size () {
        return this.adjacencyList.length;
    }

    /**
     * Adds a node to the graph.
     * @param {*} node The node to add to the graph.
     */
    addNode (node) {
        this.adjacencyList.set(node, new Set());;
    }

    /**
     * Removes the node from the graph.
     * @param {*} node The node to remove from the graph.
     */
    removeNode (node) {
        this.adjacencyList.delete(node);
    }

    /**
     * Adds an edge (link) between two nodes in the graph.
     * @param {*} firstNode The first endpoint of the edge.
     * @param {*} secondNode The second endpoint of the edge.
     */
    addEdge (firstNode, secondNode) {
        if (!this.adjacencyList.has(firstNode)) {
            this.addNode(firstNode);
        }

        if (!this.adjacencyList.has(secondNode)) {
            this.addNode(secondNode);
        }

        this.adjacencyList.get(firstNode).add(secondNode);
        this.adjacencyList.get(secondNode).add(firstNode);
    }

    /**
     * Remove the edge between two nodes in the graph.
     * @param {*} firstNode The first endpoint of the edge.
     * @param {*} secondNode The second endpoint of the edge.
     */
    removeEdge (firstNode, secondNode) {
        if (this.adjacencyList.has(firstNode)) {
            this.adjacencyList[firstNode].delete(secondNode);
        }

        if (this.adjacencyList.has(secondNode)) {
            this.adjacencyList.delete(firstNode);
        }
    }

     /**
     * Print a breadth-first traversal of the graph starting at the specified node.
     * @param {*} start The node within the graph at which to start the traversal.
     */
    bft (start) {
        const that = this;

        console.log(`\nBreadth First Traversal - Start: ${start} ---------\n`)

        // The visited array prevents visiting vertices more than once.
        const visited = Array(this.size).fill(false);

        // A queue (FIFO) is used to store the nodes we have yet to visit. Putting them into
        // a queue allows us to return to them later. This is the primary difference between a
        // depth first a breadth first traversal.
        const queue = new Queue();

        // The traversal array is where the result will be stored. This is the output of this function.
        const traversal = [];

        // Breadth-first traversal means that all the child nodes (elements of that nodes adjacency list)
        // are visited before moving on to visiting their children. All nodes at a certain depth are visited
        // before traversing deeper into the graph.
        const visit = function (vertex) {
            // Push the current vertex to the traversal result array.
            traversal.push(vertex);

            // Mark down that we've visited this node so that we don't visit it again.
            visited[vertex] = true;

            // Add every child of this node that has not already been visited to the queue.
            let adj = that.getAdjacentVertices(vertex);
            adj.forEach(v => {
                if (!visited[v]) {
                    visited[v] = true;
                    queue.enqueue(v)
                }
            });
        }

        // Seed the queue with the start node.
        queue.enqueue(start);

        // As long as there are still nodes in the queue, keep visiting them.
        while (!queue.isEmpty) {
            const currentVertex = queue.dequeue();
            visit(currentVertex);
        }

        console.log(`[${traversal.join('] -> [')}]`);
        console.log('\n--------------------------------------------')
    }

    /**
     * Print a depth-first traversal of the graph starting at the specified node.
     * @param {*} start The node within the graph at which to start the traversal.
     */
    dft (start) {
        const that = this;

        console.log(`\nDepth First Traversal - Start: ${start} -----------\n`)

        // The visited array prevents visiting vertices more than once.
        const visited = Array(this.size).fill(false);

        // The traversal array is where the result will be stored. This is the output of this function.
        const traversal = [];

        // Depth first traversal means that when a vertex is visited, its children will be visited recursively.
        // When a vertex has no children (a leaf), traversal moves to the next sibling of the current vertex.
        const visit = function (vertex) {
            // Push the current vertex to the traversal result array.
            traversal.push(vertex);

            // Mark down that we've visited this node so that we don't visit it again.
            visited[vertex] = true;

            // Visit every child that has not already been visited.
            let adj = that.getAdjacentVertices(vertex);
            adj.forEach(v => {
                if (!visited[v]) {
                    visited[v] = true;
                    visit(v);
                }
            });
        }

        // Kick of the graph recursion by visiting the starting node.
        visit(start);

        console.log(`[${traversal.join('] -> [')}]`);
        console.log('\n--------------------------------------------')
    }

    /**
     * Prints the adjacency list for each vertex in the graph in the order they were added.
     * */
    print() {
        console.log('\nGRAPH --------------------------------------\n')
        let iterator = this.adjacencyList.keys();
        let key = iterator.next();
        while (!key.done) {
            const adj = this.getAdjacentVertices(key.value);
            console.log(`[${key.value}] -> [ ${adj.join(' ],[ ')} ]`)
            key = iterator.next();
        }
        console.log('\n--------------------------------------------')
    }

    /**
     * Get the list of nodes adjacent to the given node.
     * @param {*} vertex The node for which to retrieve the list of adjacent nodes.
     */
    getAdjacentVertices(vertex) {
        return Array.from(this.adjacencyList.get(vertex));
    }
}
module.exports.Graph = Graph;

// Test Graph Implementation
const graph = new Graph();
graph.addEdge('A', 'B');
graph.addEdge('A', 'D');
graph.addEdge('A', 'E');

graph.addEdge('B', 'C');

graph.addEdge('D', 'E');

graph.addEdge('E', 'F');
graph.addEdge('E', 'C');

graph.addEdge('C', 'F');

graph.print();
graph.bft('A');
graph.dft('A');