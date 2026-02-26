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

function HistogramVisual({ params }) {
  const { intervals = [], highlight } = params;
  if (intervals.length === 0) return null;

  const maxCount = Math.max(...intervals.map(d => d.count));
  const barWidth = 60;
  const leftPad = 35;
  const chartWidth = leftPad + intervals.length * barWidth + 20;
  const chartHeight = 200;
  const maxBarHeight = 120;
  const barBase = chartHeight - 45;

  return (
    <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="visual-svg" preserveAspectRatio="xMidYMid meet">
      {/* Y-axis */}
      <line x1={leftPad - 2} y1={barBase - maxBarHeight - 5} x2={leftPad - 2} y2={barBase} stroke="#9CA3AF" strokeWidth="1.5" />
      {/* X-axis */}
      <line x1={leftPad - 2} y1={barBase} x2={chartWidth - 10} y2={barBase} stroke="#9CA3AF" strokeWidth="1.5" />
      {/* Y-axis label */}
      <text x="8" y={barBase - maxBarHeight / 2} textAnchor="middle" fontSize="9" fill="#6B7280"
        transform={`rotate(-90, 8, ${barBase - maxBarHeight / 2})`}>Frequency</text>

      {intervals.map((item, i) => {
        const x = leftPad + i * barWidth;
        const barH = Math.max(4, (item.count / maxCount) * maxBarHeight);
        const y = barBase - barH;
        const isHl = highlight != null && (highlight === item.label || highlight === i);

        return (
          <g key={i}>
            <rect x={x} y={y} width={barWidth} height={barH}
              fill={isHl ? '#3B82F6' : '#93C5FD'}
              stroke={isHl ? '#1D4ED8' : '#fff'}
              strokeWidth={isHl ? 2.5 : 1} />
            <text x={x + barWidth / 2} y={y - 5} textAnchor="middle"
              fontSize="11" fontWeight="700" fill={isHl ? '#1D4ED8' : '#1F2937'}>
              {item.count}
            </text>
            <text x={x + barWidth / 2} y={barBase + 13} textAnchor="middle"
              fontSize="8" fill="#4B5563" fontWeight="600">
              {item.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function CircleGraphVisual({ params }) {
  const { segments = [], highlight } = params;
  if (segments.length === 0) return null;

  const cx = 120, cy = 110, r = 90;
  let currentAngle = -Math.PI / 2;
  const paths = [];
  const labelElements = [];
  const defaultColors = ['#3B82F6', '#EF4444', '#22C55E', '#EAB308', '#8B5CF6', '#F97316', '#EC4899', '#14B8A6'];

  segments.forEach((seg, idx) => {
    const pct = seg.percent;
    if (pct <= 0) return;
    const angle = (pct / 100) * 2 * Math.PI;
    const x1 = cx + r * Math.cos(currentAngle);
    const y1 = cy + r * Math.sin(currentAngle);
    const x2 = cx + r * Math.cos(currentAngle + angle);
    const y2 = cy + r * Math.sin(currentAngle + angle);
    const largeArc = angle > Math.PI ? 1 : 0;
    const isHl = highlight && (highlight === seg.label || highlight === idx);
    const color = seg.color || defaultColors[idx % defaultColors.length];

    paths.push(
      <path key={idx}
        d={`M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${largeArc},1 ${x2},${y2} Z`}
        fill={color}
        stroke="#fff" strokeWidth="2"
        opacity={highlight != null && !isHl ? 0.3 : 1}
      />
    );

    // Percentage label at midpoint of arc
    const midAngle = currentAngle + angle / 2;
    const labelR = r * 0.65;
    labelElements.push(
      <text key={`lbl-${idx}`}
        x={cx + labelR * Math.cos(midAngle)}
        y={cy + labelR * Math.sin(midAngle) + 4}
        textAnchor="middle" fontSize="11" fontWeight="bold"
        fill="#fff" stroke="#00000044" strokeWidth="0.5">
        {pct}%
      </text>
    );

    currentAngle += angle;
  });

  const legendY = cy + r + 15;
  const legendCols = Math.min(3, segments.length);
  const colW = 80;

  return (
    <svg viewBox={`0 0 ${cx * 2} ${legendY + Math.ceil(segments.length / legendCols) * 16 + 5}`}
      className="visual-svg" preserveAspectRatio="xMidYMid meet">
      {paths}
      {labelElements}
      {/* Legend */}
      {segments.map((seg, i) => {
        const col = i % legendCols;
        const row = Math.floor(i / legendCols);
        const color = seg.color || defaultColors[i % defaultColors.length];
        return (
          <g key={`leg-${i}`}>
            <rect x={10 + col * colW} y={legendY + row * 16} width="10" height="10" rx="2" fill={color} />
            <text x={24 + col * colW} y={legendY + row * 16 + 9} fontSize="9" fill="#4B5563">
              {seg.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function BoxPlotVisual({ params }) {
  const { min, q1, median, q3, max, outliers = [], highlight } = params;
  if (min == null || max == null) return null;

  const svgW = 360, svgH = 100;
  const padL = 30, padR = 30;
  const plotW = svgW - padL - padR;
  const cy = 40;
  const boxH = 30;

  // Determine scale from min to max (including outliers)
  const allVals = [min, max, ...outliers];
  const scaleMin = Math.min(...allVals);
  const scaleMax = Math.max(...allVals);
  const range = scaleMax - scaleMin || 1;

  const xPos = (val) => padL + ((val - scaleMin) / range) * plotW;

  const hlMedian = highlight === 'median';
  const hlIQR = highlight === 'iqr';
  const hlRange = highlight === 'range';

  return (
    <svg viewBox={`0 0 ${svgW} ${svgH}`} className="visual-svg" preserveAspectRatio="xMidYMid meet">
      {/* Number line */}
      <line x1={padL} y1={cy + boxH / 2 + 15} x2={svgW - padR} y2={cy + boxH / 2 + 15}
        stroke="#D1D5DB" strokeWidth="1" />

      {/* Tick marks and labels */}
      {[scaleMin, q1, median, q3, scaleMax].map((val, i) => (
        <g key={i}>
          <line x1={xPos(val)} y1={cy + boxH / 2 + 12} x2={xPos(val)} y2={cy + boxH / 2 + 18}
            stroke="#6B7280" strokeWidth="1" />
          <text x={xPos(val)} y={cy + boxH / 2 + 30} textAnchor="middle"
            fontSize="10" fill="#374151">{val}</text>
        </g>
      ))}

      {/* Left whisker */}
      <line x1={xPos(min)} y1={cy} x2={xPos(q1)} y2={cy}
        stroke={hlRange ? '#2563EB' : '#374151'} strokeWidth="2" />
      <line x1={xPos(min)} y1={cy - 8} x2={xPos(min)} y2={cy + 8}
        stroke={hlRange ? '#2563EB' : '#374151'} strokeWidth="2" />

      {/* Right whisker */}
      <line x1={xPos(q3)} y1={cy} x2={xPos(max)} y2={cy}
        stroke={hlRange ? '#2563EB' : '#374151'} strokeWidth="2" />
      <line x1={xPos(max)} y1={cy - 8} x2={xPos(max)} y2={cy + 8}
        stroke={hlRange ? '#2563EB' : '#374151'} strokeWidth="2" />

      {/* Box */}
      <rect x={xPos(q1)} y={cy - boxH / 2} width={xPos(q3) - xPos(q1)} height={boxH}
        fill={hlIQR ? '#DBEAFE' : '#E5E7EB'}
        stroke={hlIQR ? '#2563EB' : '#374151'} strokeWidth={hlIQR ? 2.5 : 2} rx="2" />

      {/* Median line */}
      <line x1={xPos(median)} y1={cy - boxH / 2} x2={xPos(median)} y2={cy + boxH / 2}
        stroke={hlMedian ? '#DC2626' : '#DC2626'} strokeWidth={hlMedian ? 3 : 2} />

      {/* Outliers */}
      {outliers.map((val, i) => (
        <circle key={`out-${i}`} cx={xPos(val)} cy={cy} r="4"
          fill="none" stroke="#EF4444" strokeWidth="2" />
      ))}

      {/* Labels above */}
      <text x={xPos(min)} y={cy - boxH / 2 - 8} textAnchor="middle" fontSize="8" fill="#6B7280">Min</text>
      <text x={xPos(q1)} y={cy - boxH / 2 - 8} textAnchor="middle" fontSize="8" fill="#6B7280">Q1</text>
      <text x={xPos(median)} y={cy - boxH / 2 - 8} textAnchor="middle" fontSize="8" fill="#DC2626" fontWeight="bold">Med</text>
      <text x={xPos(q3)} y={cy - boxH / 2 - 8} textAnchor="middle" fontSize="8" fill="#6B7280">Q3</text>
      <text x={xPos(max)} y={cy - boxH / 2 - 8} textAnchor="middle" fontSize="8" fill="#6B7280">Max</text>
    </svg>
  );
}

function StemLeafVisual({ params }) {
  const { stems = [], highlight } = params;
  if (stems.length === 0) return null;

  const rowH = 20;
  const svgW = 280;
  const svgH = stems.length * rowH + 50;
  const stemX = 60;
  const dividerX = 80;

  return (
    <svg viewBox={`0 0 ${svgW} ${svgH}`} className="visual-svg" preserveAspectRatio="xMidYMid meet">
      {/* Header */}
      <text x={stemX - 10} y="16" textAnchor="end" fontSize="11" fontWeight="bold" fill="#374151">Stem</text>
      <text x={dividerX + 8} y="16" textAnchor="start" fontSize="11" fontWeight="bold" fill="#374151">Leaf</text>
      <line x1={dividerX} y1="4" x2={dividerX} y2={svgH - 5} stroke="#374151" strokeWidth="1.5" />
      <line x1="10" y1="22" x2={svgW - 10} y2="22" stroke="#D1D5DB" strokeWidth="1" />

      {stems.map((row, i) => {
        const y = 40 + i * rowH;
        const isHl = highlight != null && highlight === row.stem;
        return (
          <g key={i}>
            <text x={stemX - 10} y={y} textAnchor="end" fontSize="13"
              fontWeight={isHl ? 'bold' : '600'} fill={isHl ? '#2563EB' : '#374151'}>
              {row.stem}
            </text>
            <text x={dividerX + 8} y={y} textAnchor="start" fontSize="13"
              fontWeight={isHl ? 'bold' : 'normal'} fill={isHl ? '#2563EB' : '#374151'}
              letterSpacing="3">
              {row.leaves.join(' ')}
            </text>
          </g>
        );
      })}

      {/* Key */}
      <text x="10" y={svgH - 5} fontSize="9" fill="#6B7280">
        Key: 5 | 3 = 53
      </text>
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
    case 'histogram': return <HistogramVisual params={params} />;
    case 'circle_graph': return <CircleGraphVisual params={params} />;
    case 'box_plot': return <BoxPlotVisual params={params} />;
    case 'stem_leaf': return <StemLeafVisual params={params} />;
    default: return null;
  }
}
