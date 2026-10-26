import { useMemo } from 'react';
import { useAppSelector } from '../store/hooks';
import BarChart from '../components/BarChart';
import GroupedBarChart from '../components/GroupedBarChart';
import type { Category } from '../types';

const categories: Category[] = ['CNTT', 'Kinh tế', 'Ngoại ngữ'];

export default function Stats() {
  const books = useAppSelector((s) => s.books.items);
  const borrowed = useAppSelector((s) => s.books.borrowed);

  const countByCategory = useMemo(() => {
    return categories.map((c) => ({
      label: c,
      value: books.filter((b) => b.category === c).length,
    }));
  }, [books]);

  const stockByCategory = useMemo(() => {
    return categories.map((c) => {
      const sach = books.filter((b) => b.category === c);
      const conLai = sach.reduce((sum, b) => sum + b.available, 0);
      const tong = sach.reduce((sum, b) => sum + b.total, 0);
      return { label: c, borrowed: tong - conLai, available: conLai };
    });
  }, [books]);

  const tongBanCon = useMemo(
    () => books.reduce((sum, b) => sum + b.available, 0),
    [books]
  );

  const soSachHet = useMemo(
    () => books.filter((b) => b.available === 0).length,
    [books]
  );

  const chiTiet = useMemo(() => {
    return categories.map((c) => {
      const sach = books.filter((b) => b.category === c);
      const tongBan = sach.reduce((sum, b) => sum + b.total, 0);
      const conLai = sach.reduce((sum, b) => sum + b.available, 0);
      return {
        label: c,
        dauSach: sach.length,
        tongBan,
        conLai,
        dangMuon: tongBan - conLai,
      };
    });
  }, [books]);

  return (
    <div>
      <h2>Thống kê</h2>

      <ul className="stats-list">
        <li>
          <span className="stats-number">{books.length}</span>
          <span className="stats-label">Tổng đầu sách</span>
        </li>
        <li>
          <span className="stats-number">{tongBanCon}</span>
          <span className="stats-label">Bản sách còn lại</span>
        </li>
        <li>
          <span className="stats-number">{borrowed.length}</span>
          <span className="stats-label">Sách đang mượn</span>
        </li>
        <li>
          <span className="stats-number">{soSachHet}</span>
          <span className="stats-label">Đầu sách đã hết</span>
        </li>
      </ul>

      <div className="chart-grid">
        <section>
          <h3 className="chart-title">Tình trạng bản sách theo thể loại</h3>
          <GroupedBarChart data={stockByCategory} />
        </section>
        <section>
          <h3 className="chart-title">Số đầu sách theo thể loại</h3>
          <BarChart data={countByCategory} />
        </section>
      </div>

      <h3 className="chart-title">Chi tiết theo thể loại</h3>
      <table className="stats-table">
        <thead>
          <tr>
            <th>Thể loại</th>
            <th>Đầu sách</th>
            <th>Tổng bản</th>
            <th>Còn lại</th>
            <th>Đang mượn</th>
          </tr>
        </thead>
        <tbody>
          {chiTiet.map((row) => (
            <tr key={row.label}>
              <td>{row.label}</td>
              <td>{row.dauSach}</td>
              <td>{row.tongBan}</td>
              <td>{row.conLai}</td>
              <td>{row.dangMuon}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
