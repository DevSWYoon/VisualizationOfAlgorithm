let graph = [[]];

function drawGraph() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let node in graph) {
        const neighbors = graph[node];
        for (let i = 0; i < neighbors.length; i++) {
            const neighbor = neighbors[i];
            drawLine(node.charCodeAt(0) * 40, 50, neighbor.charCodeAt(0) * 40, 250);
        }

        ctx.fillStyle = "blue";
        ctx.font = "bold 12px Arial";
        ctx.fillText(node, node.charCodeAt(0) * 40 - 5, 40); // 노드 번호를 텍스트로 표시
    }
}

