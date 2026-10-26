import { useTheme } from '../context/ThemeContext';

interface GroupedItem {
  label: string;
  borrowed: number;
  available: number;
}

interface GroupedBarChartProps {
  data: GroupedItem[];
}

export default function GroupedBarChart({ data }: GroupedBarChartProps) {
  const { theme } = useTheme();
  const borrowedColor = theme === 'dark' ? '#184f95' : '#1c5cab';
  const availableColor = '#86b6ef';
  const max = Math.max(...data.flatMap((d) => [d.borrowed, d.available]), 1);

  return (
    <div className="chart">
      <div className="stacked-legend">
        <span>
          <i style={{ background: availableColor }} />
          Còn lại
        </span>
        <span>
          <i style={{ background: borrowedColor }} />
          Đang mượn
        </span>
      </div>

      <div className="grouped-plot">
        {data.map((item) => (
          <div className="grouped-group" key={item.label}>
            <div className="grouped-pair">
              <div className="grouped-col">
                <span className="grouped-value">{item.available}</span>
                <div
                  className="grouped-bar"
                  style={{
                    height: `${(item.available / max) * 100}%`,
                    background: availableColor,
                  }}
                  title={`${item.label}: ${item.available} bản còn lại`}
                />
              </div>
              <div className="grouped-col">
                <span className="grouped-value">{item.borrowed}</span>
                <div
                  className="grouped-bar"
                  style={{
                    height: `${(item.borrowed / max) * 100}%`,
                    background: borrowedColor,
                  }}
                  title={`${item.label}: ${item.borrowed} bản đang mượn`}
                />
              </div>
            </div>
            <span className="grouped-label">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
