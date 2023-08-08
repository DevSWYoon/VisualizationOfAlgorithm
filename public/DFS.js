const visited = {};

async function dfs(node) {
    if (visited[node]) return;

    visited[node] = true;
    drawGraph();

    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(node.charCodeAt(0) * 40, 50, 10, 0, 2 * Math.PI);
    ctx.fill();

    await new Promise(resolve => setTimeout(resolve, delay));

    const neighbors = graph[node];
    for (let i = 0; i < neighbors.length; i++) {
        await dfs(neighbors[i]);
    }
}