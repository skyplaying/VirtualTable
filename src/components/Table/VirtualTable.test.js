import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import VirtualTable from './VirtualTable';

// 模拟数据生成函数
const generateMockData = (size) => {
  return Array.from({ length: size }, (_, index) => ({
    id: index,
    name: `Item ${index}`,
    value: `Value ${index}`,
  }));
};

// 模拟列配置
const columns = [
  { key: 'id', label: 'ID', width: 50 },
  { key: 'name', label: 'Name', width: 100 },
  { key: 'value', label: 'Value', width: 100 },
];

describe('VirtualTable Performance Test', () => {
  it('should handle fast data updates', async () => {
    const mockData = generateMockData(10000); // 生成10000条模拟数据
    const { container } = render(
      <VirtualTable data={mockData} columns={columns} />
    );

    // 模拟排序操作，这里仅示例，实际操作可能需要调整
    const sortedData = [...mockData].sort((a, b) => a.id - b.id);

    const startTime = performance.now();
    // 更新组件数据
    render(<VirtualTable data={sortedData} columns={columns} />, {
      container,
    });
    const endTime = performance.now();

    console.log(`Data update took ${endTime - startTime} milliseconds`);

    // 检查第一行数据是否正确
    const firstRow = container.querySelector('.tr');
    expect(firstRow).toHaveTextContent('Item 0');

    // 性能断言：确保性能满足预期，这里的阈值需要根据实际情况调整
    expect(endTime - startTime).toBeLessThan(200); // 假设我们期望更新在200毫秒内完成
  });
  it('should correctly filter data', async () => {
    const mockData = generateMockData(10000);
    const { container } = render(
      <VirtualTable data={mockData} columns={columns} />
    );

    // 模拟筛选操作
    const filteredData = mockData.filter(item => item.name.includes('Item 5'));

    const startTime = performance.now();
    // 更新组件数据为筛选后的结果
    render(<VirtualTable data={filteredData} columns={columns} />, {
      container,
    });
    const endTime = performance.now();

    console.log(`Data filtering took ${endTime - startTime} milliseconds`);

    // 检查筛选后的数据是否正确显示
    const firstMatch = container.querySelector('.tr');
    expect(firstMatch).toHaveTextContent('Item 5');

    expect(endTime - startTime).toBeLessThan(200); // 假设我们期望筛选在200毫秒内完成
  });
});
