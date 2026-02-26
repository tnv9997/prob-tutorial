import React from 'react';

const COLORS = {
  red: '#EF4444',
  blue: '#3B82F6',
  green: '#22C55E',
  yellow: '#EAB308',
  orange: '#F97316',
  purple: '#8B5CF6',
  pink: '#EC4899',
  grey: '#9CA3AF',
};

function MarblesVisual({ params }) {
  const { red = 0, blue = 0, green = 0, highlight, labels } = params;
  const marbles = [];
  const addMarbles = (count, color, label) => {
    for (let i = 0; i < count; i++) {
      marbles.push({ color, label, id: `${color}-${i}` });
    }
  };
  addMarbles(red, COLORS.red, labels?.red || 'Red');
  addMarbles(blue, COLORS.blue, labels?.blue || 'Blue');
  if (green > 0) addMarbles(green, COLORS.green, labels?.green || 'Green');

  if (marbles.length === 0) return null;

  const cols = Math.min(8, marbles.length);
  const rows = Math.ceil(marbles.length / cols);
  const svgW = cols * 42 + 30;
  const svgH = rows * 42 + 70;

  // Build legend entries
  const legendItems = [];
  if (red > 0) legendItems.push({ color: COLORS.red, label: `${labels?.red || 'Red'}: ${red}` });
  if (blue > 0) legendItems.push({ color: COLORS.blue, label: `${labels?.blue || 'Blue'}: ${blue}` });
  if (green > 0) legendItems.push({ color: COLORS.green, label: `${labels?.green || 'Green'}: ${green}` });

  return (
    <svg viewBox={`0 0 ${svgW} ${svgH + 25}`} className="visual-svg" preserveAspectRatio="xMidYMid meet">
      {/* Bag outline */}
      <rect x="8" y="8" width={svgW - 16} height={rows * 42 + 50}
        rx="16" fill="#FEF3C7" stroke="#D97706" strokeWidth="2.5" />

      {marbles.map((m, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const cx = 28 + col * 42;
        const cy = 34 + row * 42;
        const isHighlighted = highlight === 'all' ||
          (highlight === 'red' && m.color === COLORS.red) ||
          (highlight === 'blue' && m.color === COLORS.blue) ||
          (highlight === 'green' && m.color === COLORS.green);

        return (
          <g key={m.id}>
            <circle cx={cx} cy={cy} r="15" fill={m.color}
              stroke={isHighlighted ? '#1F2937' : 'transparent'}
              strokeWidth={isHighlighted ? 3 : 0}
              opacity={isHighlighted ? 1 : 0.35} />
            {isHighlighted && (
              <circle cx={cx - 5} cy={cy - 5} r="3.5" fill="rgba(255,255,255,0.5)" />
            )}
          </g>
        );
      })}

      {/* Legend */}
      {legendItems.map((item, i) => (
        <g key={i}>
          <circle cx={15 + i * 100} cy={svgH + 12} r="6" fill={item.color} />
          <text x={25 + i * 100} y={svgH + 16} fontSize="10" fill="#4B5563">{item.label}</text>
        </g>
      ))}
    </svg>
  );
}

function DiceVisual({ params }) {
  const { highlight = [], total = 6 } = params;
  const dotPositions = {
    1: [[25, 25]],
    2: [[13, 13], [37, 37]],
    3: [[13, 13], [25, 25], [37, 37]],
    4: [[13, 13], [37, 13], [13, 37], [37, 37]],
    5: [[13, 13], [37, 13], [25, 25], [13, 37], [37, 37]],
    6: [[13, 13], [37, 13], [13, 25], [37, 25], [13, 37], [37, 37]],
  };

  const dieSize = 52;
  const gap = 8;
  const svgW = 6 * dieSize + 5 * gap + 20;
  const svgH = dieSize + 20;

  return (
    <svg viewBox={`0 0 ${svgW} ${svgH}`} className="visual-svg" preserveAspectRatio="xMidYMid meet">
      {[1, 2, 3, 4, 5, 6].map(face => {
        const x = 10 + (face - 1) * (dieSize + gap);
        const isHighlighted = highlight.includes(face);
        return (
          <g key={face}>
            <rect x={x} y="10" width={dieSize} height={dieSize} rx="9"
              fill={isHighlighted ? '#DBEAFE' : '#fff'}
              stroke={isHighlighted ? '#2563EB' : '#D1D5DB'}
              strokeWidth={isHighlighted ? 2.5 : 1.5} />
            {dotPositions[face].map((pos, i) => (
              <circle key={i}
                cx={x + pos[0] * dieSize / 50}
                cy={10 + pos[1] * dieSize / 50}
                r="4.5"
                fill={isHighlighted ? '#1D4ED8' : '#374151'} />
            ))}
            {/* Face number label below */}
            <text x={x + dieSize / 2} y={dieSize + 8} textAnchor="middle" fontSize="9" fill="#9CA3AF">
              {face}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function SpinnerVisual({ params }) {
  const { sections = [], highlight } = params;
  const total = sections.reduce((s, sec) => s + sec.count, 0);
  if (total === 0) return null;

  const cx = 110, cy = 110, r = 90;
  let currentAngle = -Math.PI / 2;
  const paths = [];
  const sectionLabels = [];

  sections.forEach(sec => {
    for (let i = 0; i < sec.count; i++) {
      const angle = (2 * Math.PI) / total;
      const x1 = cx + r * Math.cos(currentAngle);
      const y1 = cy + r * Math.sin(currentAngle);
      const x2 = cx + r * Math.cos(currentAngle + angle);
      const y2 = cy + r * Math.sin(currentAngle + angle);
      const largeArc = angle > Math.PI ? 1 : 0;
      const isHighlighted = highlight === sec.color;
      const color = COLORS[sec.color] || sec.color;

      // Label position at midpoint of arc
      const midAngle = currentAngle + angle / 2;
      const labelR = r * 0.6;
      sectionLabels.push({
        x: cx + labelR * Math.cos(midAngle),
        y: cy + labelR * Math.sin(midAngle),
        color: sec.color,
        highlighted: isHighlighted,
      });

      paths.push(
        <path key={`${sec.color}-${i}`}
          d={`M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${largeArc},1 ${x2},${y2} Z`}
          fill={color}
          stroke="#fff" strokeWidth="2.5"
          opacity={highlight && !isHighlighted ? 0.25 : 1}
        />
      );
      currentAngle += angle;
    }
  });

  return (
    <svg viewBox="0 0 220 240" className="visual-svg" preserveAspectRatio="xMidYMid meet">
      {paths}
      <circle cx={cx} cy={cy} r="10" fill="#fff" stroke="#333" strokeWidth="2" />
      {/* Arrow */}
      <polygon points={`${cx},${cy - r - 14} ${cx - 7},${cy - r + 4} ${cx + 7},${cy - r + 4}`}
        fill="#333" />
      {/* Legend */}
      {sections.map((sec, i) => (
        <g key={i}>
          <rect x={10 + i * 55} y="225" width="12" height="12" rx="2" fill={COLORS[sec.color] || sec.color} />
          <text x={26 + i * 55} y="235" fontSize="10" fill="#4B5563">{sec.color}: {sec.count}</text>
        </g>
      ))}
    </svg>
  );
}

function CardsVisual({ params }) {
  const { hearts = 0, spades = 0, highlight } = params;
  const cards = [];
  for (let i = 0; i < hearts; i++) cards.push({ suit: 'hearts', symbol: '\u2665', color: '#DC2626' });
  for (let i = 0; i < spades; i++) cards.push({ suit: 'spades', symbol: '\u2660', color: '#1F2937' });

  if (cards.length === 0) return null;

  const perRow = Math.min(10, cards.length);
  const rows = Math.ceil(cards.length / perRow);
  const cardW = 38;
  const cardH = 56;
  const gap = 4;
  const svgW = perRow * (cardW + gap) + 20;
  const svgH = rows * (cardH + gap) + 30;

  return (
    <svg viewBox={`0 0 ${svgW} ${svgH}`} className="visual-svg" preserveAspectRatio="xMidYMid meet">
      {cards.map((card, i) => {
        const col = i % perRow;
        const row = Math.floor(i / perRow);
        const x = 10 + col * (cardW + gap);
        const y = 10 + row * (cardH + gap);
        const isHl = highlight === card.suit;
        return (
          <g key={i}>
            <rect x={x} y={y} width={cardW} height={cardH} rx="5"
              fill={isHl ? '#FEF3C7' : '#fff'}
              stroke={isHl ? '#D97706' : '#D1D5DB'}
              strokeWidth={isHl ? 2.5 : 1} />
            <text x={x + cardW / 2} y={y + cardH / 2 + 8} textAnchor="middle" fontSize="24"
              fill={card.color} opacity={isHl ? 1 : 0.35}>
              {card.symbol}
            </text>
          </g>
        );
      })}
      {/* Legend */}
      <text x="10" y={svgH - 4} fontSize="10" fill="#6B7280">
        {'\u2665'} Hearts: {hearts}  {'\u2660'} Spades: {spades}
      </text>
    </svg>
  );
}

function TreeVisual({ params }) {
  const { levels = 2, labels = [], highlight } = params;
  if (levels < 1 || labels.length === 0) return null;

  // Calculate width needed based on total leaf nodes
  const branchCounts = labels.map(l => l.length);
  const totalLeaves = branchCounts.reduce((a, b) => a * b, 1);
  const leafSpacing = 50;
  const width = Math.max(300, totalLeaves * leafSpacing + 60);
  const height = levels * 90 + 60;
  const elements = [];

  function drawLevel(level, parentX, parentY, pathSoFar, rangeStart, rangeEnd) {
    if (level >= levels || level >= labels.length) return;
    const branches = labels[level];
    const rangeSize = rangeEnd - rangeStart;
    const branchWidth = rangeSize / branches.length;

    branches.forEach((label, i) => {
      const x = rangeStart + branchWidth * i + branchWidth / 2;
      const y = parentY + 80;
      const path = pathSoFar + label;
      const isHighlighted = highlight && path === highlight;

      elements.push(
        <line key={`line-${level}-${i}-${parentX.toFixed(1)}`}
          x1={parentX} y1={parentY + 8} x2={x} y2={y - 18}
          stroke={isHighlighted ? '#2563EB' : '#CBD5E1'}
          strokeWidth={isHighlighted ? 3 : 1.5} />
      );

      // Probability label on branch
      const midX = (parentX + x) / 2;
      const midY = (parentY + 8 + y - 18) / 2;
      elements.push(
        <text key={`prob-${level}-${i}-${parentX.toFixed(1)}`}
          x={midX + (x > parentX ? 8 : -8)} y={midY}
          textAnchor="middle" fontSize="9" fill="#6B7280">
          1/{branches.length}
        </text>
      );

      elements.push(
        <g key={`node-${level}-${i}-${parentX.toFixed(1)}`}>
          <circle cx={x} cy={y} r="18"
            fill={isHighlighted ? '#DBEAFE' : '#F3F4F6'}
            stroke={isHighlighted ? '#2563EB' : '#CBD5E1'}
            strokeWidth={isHighlighted ? 2.5 : 1.5} />
          <text x={x} y={y + 5} textAnchor="middle" fontSize="11"
            fontWeight={isHighlighted ? 'bold' : '600'}
            fill={isHighlighted ? '#1D4ED8' : '#374151'}>
            {label}
          </text>
        </g>
      );

      drawLevel(level + 1, x, y, path, rangeStart + branchWidth * i, rangeStart + branchWidth * (i + 1));
    });
  }

  drawLevel(0, width / 2, 30, '', 0, width);

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="visual-svg" preserveAspectRatio="xMidYMid meet">
      {/* Root node */}
      <circle cx={width / 2} cy={30} r="6" fill="#6366F1" />
      <text x={width / 2} y={22} textAnchor="middle" fontSize="10" fill="#6366F1" fontWeight="bold">Start</text>
      {elements}
    </svg>
  );
}

function FrequencyTableVisual({ params }) {
  const { data = [], highlight } = params;
  if (data.length === 0) return null;

  const maxCount = Math.max(...data.map(d => d.count));
  const barWidth = 54;
  const gap = 12;
  const leftPad = 20;
  const chartWidth = leftPad + data.length * (barWidth + gap) + 20;
  const chartHeight = 180;
  const maxBarHeight = 110;
  const barBase = chartHeight - 40;

  return (
    <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="visual-svg" preserveAspectRatio="xMidYMid meet">
      {/* Base line */}
      <line x1={leftPad - 5} y1={barBase} x2={chartWidth - 10} y2={barBase} stroke="#D1D5DB" strokeWidth="1.5" />

      {data.map((item, i) => {
        const x = leftPad + i * (barWidth + gap);
        const barH = Math.max(4, (item.count / maxCount) * maxBarHeight);
        const y = barBase - barH;
        const isHl = highlight && (highlight === item.label || highlight.toLowerCase() === item.label.toLowerCase());

        return (
          <g key={i}>
            <rect x={x} y={y} width={barWidth} height={barH} rx="4"
              fill={isHl ? '#3B82F6' : '#93C5FD'}
              stroke={isHl ? '#1D4ED8' : 'transparent'}
              strokeWidth={isHl ? 2.5 : 0} />
            <text x={x + barWidth / 2} y={y - 6} textAnchor="middle"
              fontSize="12" fontWeight="700" fill={isHl ? '#1D4ED8' : '#1F2937'}>
              {item.count}
            </text>
            <text x={x + barWidth / 2} y={barBase + 15} textAnchor="middle"
              fontSize="10" fill="#4B5563" fontWeight="600">
              {item.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function DiceSumTableVisual({ params }) {
  const { targetSum, highlight = [] } = params;
  const cellSize = 32;
  const offset = 38;
  const svgW = offset + 6 * cellSize + 12;
  const svgH = offset + 6 * cellSize + 12;

  return (
    <svg viewBox={`0 0 ${svgW} ${svgH}`} className="visual-svg" preserveAspectRatio="xMidYMid meet">
      {/* Title */}
      <text x={offset + 3 * cellSize} y="14" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#374151">
        Die 2 →
      </text>
      <text x="12" y={offset + 3 * cellSize} textAnchor="middle" fontSize="11" fontWeight="bold" fill="#374151"
        transform={`rotate(-90, 12, ${offset + 3 * cellSize})`}>
        Die 1 →
      </text>

      {/* Column headers */}
      {[1, 2, 3, 4, 5, 6].map(col => (
        <text key={`h${col}`} x={offset + (col - 1) * cellSize + cellSize / 2} y={offset - 6}
          textAnchor="middle" fontSize="11" fontWeight="bold" fill="#6366F1">{col}</text>
      ))}
      {/* Row headers */}
      {[1, 2, 3, 4, 5, 6].map(row => (
        <text key={`r${row}`} x={offset - 10} y={offset + (row - 1) * cellSize + cellSize / 2 + 4}
          textAnchor="middle" fontSize="11" fontWeight="bold" fill="#6366F1">{row}</text>
      ))}

      {/* Grid cells */}
      {[1, 2, 3, 4, 5, 6].map(row =>
        [1, 2, 3, 4, 5, 6].map(col => {
          const sum = row + col;
          const isHl = highlight.some(p => p[0] === row && p[1] === col) || (highlight.length === 0 && sum === targetSum);
          const x = offset + (col - 1) * cellSize;
          const y = offset + (row - 1) * cellSize;
          return (
            <g key={`${row}-${col}`}>
              <rect x={x} y={y} width={cellSize} height={cellSize}
                fill={isHl ? '#DBEAFE' : sum === targetSum ? '#FEF9C3' : '#fff'}
                stroke="#D1D5DB" strokeWidth="1" rx="2" />
              <text x={x + cellSize / 2} y={y + cellSize / 2 + 5}
                textAnchor="middle" fontSize="12"
                fill={isHl ? '#1D4ED8' : '#374151'}
                fontWeight={isHl ? 'bold' : 'normal'}>
                {sum}
              </text>
            </g>
          );
        })
      )}
    </svg>
  );
}

export default function Visual({ type, params }) {
  if (!type || !params) return null;

  switch (type) {
    case 'marbles': return <MarblesVisual params={params} />;
    case 'dice': return <DiceVisual params={params} />;
    case 'spinner': return <SpinnerVisual params={params} />;
    case 'cards': return <CardsVisual params={params} />;
    case 'tree': return <TreeVisual params={params} />;
    case 'table':
      if (params.type === 'dice_sum') return <DiceSumTableVisual params={params} />;
      if (params.type === 'frequency') return <FrequencyTableVisual params={params} />;
      return null;
    default: return null;
  }
}
