let visited = [];

document.getElementById("exeDFS").addEventListener("click", () => {
    const root = document.getElementById("rootNodeInput").value;

    drawGraph();
    visited = [];
    dfs(root).then(r => console.log(r));
});

document.getElementById("exeBFS").addEventListener("click", () => {
    const root = document.getElementById("rootNodeInput").value;

    drawGraph();
    visited = [];
    bfs(root).then(r => console.log(r));
});

async function dfs(node) {
    if (visited[node]) return;

    visited[node] = true;
    drawNode(node, nodeCoords[node].x, nodeCoords[node].y, "gray");

    await new Promise(resolve => setTimeout(resolve, delay));

    const neighbors = graph[node];
    for (let i = 0; i < neighbors.length; i++) {
        await delay();
        drawArrowBetweenNodes(node, neighbors[i], "gray", "red", "red");

        await dfs(neighbors[i]);
        await delay();

        drawArrowBetweenNodes(node, neighbors[i], "gray", "gray", "gray");
    }
}

async function bfs(node) {
    let queue = [];

    queue.push({parent: node, cur: node});

    while (queue.length) {
        let cur = queue.shift();
        let parent = cur.parent, node = cur.cur;

        if (visited[node]) continue;
        visited[node] = true;

        await delay();
        drawArrowBetweenNodes(parent, node, "gray", "red", "red");

        const neighbors = graph[node];
        for (let i = 0; i < neighbors.length; i++) {
            queue.push({parent: node, cur: neighbors[i]});
        }

        await delay();
        drawArrowBetweenNodes(parent, node, "gray", "gray", "gray");
    }
}