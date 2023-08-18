const nodesTextElement = document.querySelector('.nodesText');

const parentTextElement = document.getElementById("parentNodeInput");
const childTextElement = document.getElementById("childNodeInput");

const parentCoordsTextElement = document.getElementById("parentCoordsInput");
const childCoordsTextElement = document.getElementById("childCoordsInput");

const currentNodeTextElement = document.getElementById("currentNodeText");

let graph = {};
let nodeCoords = {};

let scale = 10;

document.getElementById("resetButton").addEventListener("click", () => {
    graph = {};
    nodeCoords = {};
    drawGraph();

    console.log("resetGraph");
});
document.getElementById("addNodeButton").addEventListener("click", () => {
    const parent = parentTextElement.value;
    const child = childTextElement.value;

    const parentCoords = parentCoordsTextElement.value;
    const childCoords = childCoordsTextElement.value;

    const parentCoordsMatch = parentCoords.match(/\((-?\d+),\s*(-?\d+)\)/);
    const childCoordsMatch = childCoords.match(/\((-?\d+),\s*(-?\d+)\)/);

    if(parentCoordsMatch) {
        assignCoordinatesToNodes(parent, { x: parseInt(parentCoordsMatch[1], 6) * scale, y: parseInt(parentCoordsMatch[2], 6) * scale });

        console.log(parentCoordsMatch[1], parentCoordsMatch[2]);
    } else {
        assignCoordinatesToNodes(parent);
    }

    if(childCoordsMatch) {
        assignCoordinatesToNodes(child, { x: parseInt(childCoordsMatch[1], 6) * scale, y: parseInt(childCoordsMatch[2], 6) * scale });

        console.log(childCoordsMatch[1], childCoordsMatch[2]);
    } else {
        assignCoordinatesToNodes(child);
    }

    addNode(parent, child);

    parentTextElement.value = "";
    childTextElement.value = "";

    parentCoordsTextElement.value = "";
    childCoordsTextElement.value = "";
});

document.getElementById("randomNodesButton").addEventListener("click", () => {
    const numNodes = Math.floor(Math.random() * 10) + 5;

    for(let i = 0; i < numNodes; i++) {
        const parent = String.fromCharCode(65 + i);

        assignCoordinatesToNodes(parent);

        const numChildren = Math.floor(Math.random() * 3) + 1;

        for(let j = 0; j < numChildren; j++) {
            const child = String.fromCharCode(65 + Math.floor(Math.random() * numNodes));

            assignCoordinatesToNodes(child);

            addNode(parent, child, true);
        }
    }

    drawGraph();
});

function outputNodesText() {
    //output nodes & there's child nodes
    let nodesText = "";
    for(let node in graph) {
        nodesText += `${node} : ${graph[node].join(", ")}<br>`;
    }
    nodesTextElement.innerHTML = "NODES : <br>" + nodesText;
}

function getRandomCoordinates() {
    const x = Math.floor(Math.random() * (canvas.width - 4 * nodeRadius)) + nodeRadius * 2;
    const y = Math.floor(Math.random() * (canvas.height - 4 * nodeRadius)) + nodeRadius * 2;

    console.log(x, y);
    return { x, y };
}

function assignCoordinatesToNodes(node, coords = getRandomCoordinates()) {
    if(!nodeCoords[node]) {
        nodeCoords[node] = coords;
    }
}
function addNode(parent, child, isRandom = false) {
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
    } else if(!isRandom){
        alert("해당 노드를 추가할 수 없습니다.")
    }

    outputNodesText();
}

function drawArrowBetweenNodes(node1, node2, node1Color, node2Color, arrowColor) {
    if(node1 !== node2) {
        drawArrow(nodeCoords[node1].x, nodeCoords[node1].y, nodeCoords[node2].x, nodeCoords[node2].y, arrowColor);
    } else {
        drawLoop(nodeCoords[node1].x, nodeCoords[node1].y, arrowColor);
    }
    drawNode(node1, nodeCoords[node1].x, nodeCoords[node1].y, node1Color);
    drawNode(node2, nodeCoords[node2].x, nodeCoords[node2].y, node2Color);
}

function drawGraph() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid('lightgray');

    for (let node in graph) {
        const neighbors = graph[node];

        for (let i = 0; i < neighbors.length; i++) {
            const neighbor = neighbors[i];

            if(node !== neighbor)
                drawArrow(nodeCoords[node].x, nodeCoords[node].y, nodeCoords[neighbor].x, nodeCoords[neighbor].y);
            else
                drawLoop(nodeCoords[node].x, nodeCoords[node].y);
        }
    }

    for (let node in graph) {
        drawNode(node, nodeCoords[node].x, nodeCoords[node].y, 'red');
    }
}

drawGrid('lightgray');
