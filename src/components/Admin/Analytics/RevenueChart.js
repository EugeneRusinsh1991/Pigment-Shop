/**
 * RevenueChart.js
 *
 * Revenue line chart with horizontal/vertical grid lines and Y-axis labels.
 * Uses a fixed viewBox without preserveAspectRatio distortion.
 */
import { Platform, View } from 'react-native';
import { Text } from '../../Text';
import styles from './AnalyticsStyles';

const isWeb = Platform.OS === 'web';

// Chart dimensions (fixed coordinate space)
const SVG_W = 620;
const SVG_H = 160;
const PAD_LEFT = 52;   // room for Y labels
const PAD_RIGHT = 12;
const PAD_TOP = 12;
const PAD_BOTTOM = 24; // room for X labels inside SVG
const PLOT_W = SVG_W - PAD_LEFT - PAD_RIGHT;
const PLOT_H = SVG_H - PAD_TOP - PAD_BOTTOM;

function findMax(data) {
  const max = Math.max(...data.map((d) => d.value));
  return max === 0 ? 1 : max;
}

function niceMax(rawMax) {
  if (rawMax === 0) return 1;
  const magnitude = Math.pow(10, Math.floor(Math.log10(rawMax)));
  const normalized = rawMax / magnitude;
  let nice;
  if (normalized <= 1.5) nice = 1.5;
  else if (normalized <= 2) nice = 2;
  else if (normalized <= 3) nice = 3;
  else if (normalized <= 5) nice = 5;
  else nice = 10;
  return nice * magnitude;
}

function niceLabel(value) {
  if (value === 0) return '$0';
  if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `$${(value / 1000).toFixed(value % 1000 === 0 ? 0 : 1)}k`;
  return `$${Math.round(value)}`;
}

function toPlotY(value, max) {
  return PAD_TOP + PLOT_H - (value / max) * PLOT_H;
}

function toPlotX(index, total) {
  if (total === 1) return PAD_LEFT + PLOT_W / 2;
  return PAD_LEFT + (index / (total - 1)) * PLOT_W;
}

export default function RevenueChart({ revenueData = [] }) {
  if (revenueData.length === 0) {
    return (
      <View style={{ height: 180, justifyContent: 'center', alignItems: 'center' }}>
        <Text variant="body2" color="secondary">No data</Text>
      </View>
    );
  }

  const rawMax = findMax(revenueData);
  const max = niceMax(rawMax);
  const n = revenueData.length;

  // Y grid levels: 0%, 25%, 50%, 75%, 100%
  const yLevels = [0, 0.25, 0.5, 0.75, 1].map((f) => ({
    value: max * f,
    y: toPlotY(max * f, max),
  }));

  // Build point coordinates
  const pts = revenueData.map((d, i) => ({
    x: toPlotX(i, n),
    y: toPlotY(d.value, max),
    label: d.label,
  }));

  const linePath = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');
  const fillPath = `${linePath} L ${pts[pts.length - 1].x.toFixed(1)} ${(PAD_TOP + PLOT_H).toFixed(1)} L ${PAD_LEFT} ${(PAD_TOP + PLOT_H).toFixed(1)} Z`;

  // X labels: show first, last, and evenly spaced (up to ~6 total)
  const labelStep = Math.max(1, Math.ceil(n / 6));
  const xLabelIndices = new Set([0, n - 1]);
  for (let i = labelStep; i < n - 1; i += labelStep) xLabelIndices.add(i);

  return (
    <View style={styles.svgWrapper}>
      {isWeb ? (
        <svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${SVG_W} ${SVG_H}`}
          preserveAspectRatio="xMidYMid meet"
          style={{ display: 'block' }}
        >
          <defs>
            <linearGradient id="revenueGrad2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Horizontal grid lines + Y labels */}
          {yLevels.map(({ value, y }, idx) => (
            <g key={idx}>
              <line
                x1={PAD_LEFT} y1={y.toFixed(1)}
                x2={PAD_LEFT + PLOT_W} y2={y.toFixed(1)}
                stroke={value === 0 ? '#CBD5E1' : '#E2E8F0'}
                strokeWidth="1"
                strokeDasharray={value === 0 ? undefined : '4 3'}
              />
              <text
                x={(PAD_LEFT - 6).toFixed(1)} y={(y + 3.5).toFixed(1)}
                fontSize="9" fill="#94a3b8" textAnchor="end"
              >
                {niceLabel(value)}
              </text>
            </g>
          ))}

          {/* Vertical grid lines */}
          {pts.map((p, i) => (
            <line
              key={i}
              x1={p.x.toFixed(1)} y1={PAD_TOP}
              x2={p.x.toFixed(1)} y2={(PAD_TOP + PLOT_H).toFixed(1)}
              stroke="#F1F5F9" strokeWidth="1"
            />
          ))}

          {/* Area fill */}
          <path d={fillPath} fill="url(#revenueGrad2)" />

          {/* Line */}
          <path d={linePath} fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

          {/* Dots */}
          {pts.map((p, i) => (
            <circle key={i} cx={p.x.toFixed(1)} cy={p.y.toFixed(1)} r="2.5" fill="#10B981" />
          ))}

          {/* X labels inside SVG */}
          {pts.map((p, i) =>
            xLabelIndices.has(i) ? (
              <text
                key={i}
                x={p.x.toFixed(1)}
                y={(SVG_H - 4).toFixed(1)}
                fontSize="9"
                fill="#94a3b8"
                textAnchor={i === 0 ? 'start' : i === n - 1 ? 'end' : 'middle'}
              >
                {p.label}
              </text>
            ) : null
          )}
        </svg>
      ) : (
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <View style={{ flexDirection: 'row', alignItems: 'flex-end', height: PLOT_H }}>
            {revenueData.map((d, i) => {
              const barH = max === 0 ? 4 : Math.max(4, (d.value / max) * PLOT_H);
              return (
                <View key={i} style={{ flex: 1, marginLeft: i === 0 ? 0 : 2, alignItems: 'center' }}>
                  <View style={{ width: 6, height: barH, backgroundColor: '#10B981', borderRadius: 3 }} />
                </View>
              );
            })}
          </View>
        </View>
      )}
    </View>
  );
}
