const nodeRadius = 15;

const parentTextElement = document.getElementById("parentNodeInput");
const childTextElement = document.getElementById("childNodeInput");
const parentXInputTextElement = document.getElementById("parentXInput");
const parentYInputTextElement = document.getElementById("parentYInput");
const childXInputTextElement = document.getElementById("childXInput");
const childYInputTextElement = document.getElementById("childYInput");

let graph = {};
let nodeCoords = {};
document.getElementById("addNodeButton").addEventListener("click", () => {
    const parent = parentTextElement.value;
    const child = childTextElement.value;

    addNode(parent, child);

    parentTextElement.value = "";
    childTextElement.value = "";
});

document.getElementById("resetButton").addEventListener("click", () => {
    graph = {};
    nodeCoords = {};
    drawGraph();
});

function getRandomCoordinates() {
    const x = Math.floor(Math.random() * (canvas.width - 4 * nodeRadius)) + nodeRadius * 2;
    const y = Math.floor(Math.random() * (canvas.height - 4 * nodeRadius)) + nodeRadius * 2;

    return { x, y };
}

function assignCoordinatesToNodes(node) {
    if(!nodeCoords[node]) {
        nodeCoords[node] = getRandomCoordinates();
    }
}
function addNode(parent, child) {
    if(!graph[parent]) {
        graph[parent] = [];
    }

    console.log(graph);

    if(!graph[child]) {
        graph[child] = [];
    }

    if(!graph[parent].includes(child)) {
        graph[parent].push(child);
        drawGraph();
    } else {
        alert("해당 노드를 추가할 수 없습니다.")
    }
}

function drawNode(node, x, y, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, nodeRadius, 0, 2 * Math.PI);
    ctx.fill();

    ctx.fillStyle = "white";
    ctx.font = "bold 12px Arial";
    ctx.fillText(node, x - 5, y + 5);
}

function drawGraph() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid('lightgray');

    for (let node in graph) {
        const neighbors = graph[node];
        assignCoordinatesToNodes(node);

        for (let i = 0; i < neighbors.length; i++) {
            const neighbor = neighbors[i];
            assignCoordinatesToNodes(neighbor);

            if(node !== neighbor)
                drawArrow(nodeCoords[node].x, nodeCoords[node].y, nodeCoords[neighbor].x, nodeCoords[neighbor].y);
            else
                drawLoop(nodeCoords[node].x, nodeCoords[node].y, nodeRadius);
        }

        drawNode(node, nodeCoords[node].x, nodeCoords[node].y, "red");
    }
}

assignCoordinatesToNodes();
drawGraph();

