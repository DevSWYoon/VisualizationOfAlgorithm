let visited = [];

document.getElementById("exeDFS").addEventListener("click", () => {
    const root = document.getElementById("rootNodeInput").value;

    drawGraph();
    visited = [];
    dfs(root).then(r => console.log(r));
});
async function dfs(node) {
    if (visited[node]) return;

    visited[node] = true;
    drawNode(node, nodeCoords[node].x, nodeCoords[node].y, "gray");

    await new Promise(resolve => setTimeout(resolve, delay));

    const neighbors = graph[node];
    for (let i = 0; i < neighbors.length; i++) {
        await delay();
        drawArrow(nodeCoords[node].x, nodeCoords[node].y, nodeCoords[neighbors[i]].x, nodeCoords[neighbors[i]].y, "red");
        await dfs(neighbors[i]);
        await delay();
        drawArrow(nodeCoords[node].x, nodeCoords[node].y, nodeCoords[neighbors[i]].x, nodeCoords[neighbors[i]].y, "blue");
    }
}