import { useTheme } from '../context/ThemeContext';

interface BarChartProps {
  data: { label: string; value: number }[];
}

const lightColors = ['#86b6ef', '#3987e5', '#1c5cab'];
const darkColors = ['#86b6ef', '#3987e5', '#184f95'];

export default function BarChart({ data }: BarChartProps) {
  const { theme } = useTheme();
  const colors = theme === 'dark' ? darkColors : lightColors;
  const max = Math.max(...data.map((d) => d.value), 1);

  return (
    <div className="chart">
      {data.map((item, i) => (
        <div className="chart-row" key={item.label}>
          <span className="chart-label">{item.label}</span>
          <div className="chart-track">
            <div
              className="chart-bar"
              style={{
                width: `${(item.value / max) * 100}%`,
                background: colors[i % colors.length],
              }}
              title={`${item.label}: ${item.value} đầu sách`}
            />
          </div>
          <span className="chart-value">{item.value}</span>
        </div>
      ))}
    </div>
  );
}
