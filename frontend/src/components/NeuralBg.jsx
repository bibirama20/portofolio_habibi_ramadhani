/* Animated neural-network SVG — purely decorative, no DOM events */
const NODES = [
  { x:  8, y: 18 }, { x: 22, y: 45 }, { x: 12, y: 72 },
  { x: 38, y:  9 }, { x: 50, y: 52 }, { x: 34, y: 83 },
  { x: 65, y: 22 }, { x: 74, y: 58 }, { x: 60, y: 80 },
  { x: 88, y: 14 }, { x: 93, y: 46 }, { x: 82, y: 76 },
  { x: 50, y: 28 }, { x: 25, y: 28 }, { x: 76, y: 88 },
  { x: 42, y: 68 }, { x: 15, y: 55 }, { x: 58, y: 10 },
]
const EDGES = [
  [0,1],[0,3],[0,13],[1,2],[1,4],[1,13],[1,16],
  [2,5],[2,16],[3,4],[3,6],[3,12],[3,17],[4,5],
  [4,7],[4,12],[4,15],[5,8],[5,15],[6,7],[6,9],
  [6,12],[7,8],[7,10],[7,11],[8,11],[8,14],[8,15],
  [9,10],[9,17],[10,11],[11,14],[12,17],[13,16],
]

export default function NeuralBg({ className = '' }) {
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      className={`absolute inset-0 w-full h-full pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      <defs>
        {/* Pulsing data-flow along edges */}
        <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#818cf8" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#818cf8" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Edges */}
      {EDGES.map(([a, b], i) => {
        const na = NODES[a], nb = NODES[b]
        const len = Math.hypot(nb.x - na.x, nb.y - na.y)
        return (
          <line key={i}
            x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
            stroke="url(#nodeGlow)"
            strokeWidth="0.15"
            strokeOpacity="0.35"
          >
            {/* Animated travelling dot */}
            <animate
              attributeName="stroke-dasharray"
              values={`0 ${len};${len} 0`}
              dur={`${3 + (i % 5)}s`}
              repeatCount="indefinite"
              begin={`${(i * 0.4) % 5}s`}
            />
          </line>
        )
      })}

      {/* Nodes */}
      {NODES.map((n, i) => (
        <g key={i}>
          {/* Outer glow pulse */}
          <circle cx={n.x} cy={n.y} r="0.7" fill="#6366f1" fillOpacity="0.12">
            <animate attributeName="r"    values="0.7;1.4;0.7" dur={`${2 + (i % 3)}s`} repeatCount="indefinite" begin={`${(i * 0.3) % 3}s`} />
            <animate attributeName="fill-opacity" values="0.12;0;0.12" dur={`${2 + (i % 3)}s`} repeatCount="indefinite" begin={`${(i * 0.3) % 3}s`} />
          </circle>
          {/* Inner dot */}
          <circle cx={n.x} cy={n.y} r="0.35" fill="#818cf8" fillOpacity="0.7">
            <animate attributeName="fill-opacity" values="0.7;1;0.7" dur={`${1.5 + (i % 4) * 0.5}s`} repeatCount="indefinite" begin={`${(i * 0.2) % 2}s`} />
          </circle>
        </g>
      ))}
    </svg>
  )
}
