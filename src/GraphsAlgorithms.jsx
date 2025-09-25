import { useEffect } from "react";
import gsap from "gsap";

// BFS traversal function
const bfsTraversal = (root) => {
  const steps = [];
  const queue = [root];

  while (queue.length > 0) {
    const node = queue.shift();
    if (!node) continue;

    steps.push(node.id);

    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }

  return steps;
};

// TreeNode component
const TreeNode = ({ id, value, x, y }) => (
  <g id={`node-${id}`}>
    <circle cx={x} cy={y} r="25" fill="skyblue" />
    <text x={x} y={y} textAnchor="middle" dy=".3em">
      {value}
    </text>
  </g>
);

// Hardcoded binary tree
const tree = {
  id: 1,
  value: 1,
  left: {
    id: 2,
    value: 2,
    left: { id: 4, value: 4 },
    right: { id: 5, value: 5 },
  },
  right: {
    id: 3,
    value: 3,
    left: { id: 6, value: 6 },
    right: { id: 7, value: 7 },
  },
};

function App() {
  useEffect(() => {
    const steps = bfsTraversal(tree);

    const tl = gsap.timeline({ repeat: 0 });
    steps.forEach((id, i) => {
      tl.to(
        `#node-${id} circle`,
        {
          fill: "orange",
          scale: 1.2,
          duration: 0.5,
          yoyo: true,
          repeat: 1,
        },
        i * 0.7,
      ); // stagger animations
    });
  }, []);

  const renderTree = (node, x, y, level = 1) => {
    if (!node) return null;
    const gap = 200 / level;

    return (
      <>
        {node.left && (
          <line x1={x} y1={y} x2={x - gap} y2={y + 80} stroke="black" />
        )}
        {node.right && (
          <line x1={x} y1={y} x2={x + gap} y2={y + 80} stroke="black" />
        )}
        <TreeNode id={node.id} value={node.value} x={x} y={y} />
        {renderTree(node.left, x - gap, y + 80, level + 1)}
        {renderTree(node.right, x + gap, y + 80, level + 1)}
      </>
    );
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h2>BFS Tree Traversal Visualizer</h2>
      <svg width="100%" height="500">
        {renderTree(tree, 400, 50)}
      </svg>
    </div>
  );
}

export default App;
