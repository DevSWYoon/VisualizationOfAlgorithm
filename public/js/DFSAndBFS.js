const orderOfVisitTextElement = document.querySelector('.orderOfVisitText');

let visited = [];

let orderOfVisit = [];

document.getElementById("resetButton").addEventListener("click", () => {
    visited = [];
    orderOfVisit = [];

    console.log("resetDFSAndBFS");
});
document.getElementById("exeDFS").addEventListener("click", () => {
    const root = document.getElementById("rootNodeInput").value;

    drawGraph();
    visited = [];
    orderOfVisit = [];
    DFSAndBFS(root).then(r => console.log(r));
});

document.getElementById("exeBFS").addEventListener("click", () => {
    const root = document.getElementById("rootNodeInput").value;

    drawGraph();
    visited = [];
    orderOfVisit = [];
    bfs(root).then(r => console.log(r));
});

function outputOrderOfVisitText() {
    orderOfVisitTextElement.innerHTML = "ORDER OF VISIT : " + orderOfVisit.join(" -> ");
}

async function DFSAndBFS(node) {
    if (visited[node]) return;

    currentNodeTextElement.innerText = "Current Node : " + node;
    visited[node] = true;
    orderOfVisit.push(node);
    outputOrderOfVisitText();

    drawNode(node, nodeCoords[node].x, nodeCoords[node].y, "gray");

    await new Promise(resolve => setTimeout(resolve, delay));

    const neighbors = graph[node];
    for (let i = 0; i < neighbors.length; i++) {
        await delay();
        drawArrowBetweenNodes(node, neighbors[i], "gray", "red", "red");

        await DFSAndBFS(neighbors[i]);
        
        await delay();
        drawArrowBetweenNodes(node, neighbors[i], "gray", "gray", "gray");
    }
}

async function bfs(node) {
    let queue = [];

    queue.push({parent: null, cur: node});

    while (queue.length) {
        let cur = queue.shift();
        let parent = cur.parent, node = cur.cur;

        if (visited[node]) continue;

        currentNodeTextElement.innerText = "Current Node : " + node;
        visited[node] = true;
        orderOfVisit.push(node);
        outputOrderOfVisitText();

        await delay();
        if(parent !== null)
            drawArrowBetweenNodes(parent, node, "gray", "red", "red");

        const neighbors = graph[node];
        for (let i = 0; i < neighbors.length; i++) {
            queue.push({parent: node, cur: neighbors[i]});
        }

        await delay();
        if(parent !== null)
            drawArrowBetweenNodes(parent, node, "gray", "gray", "gray");
    }
}