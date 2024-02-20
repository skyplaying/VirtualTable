import React, { useState, useEffect, useRef, useCallback } from "react";
import { faker } from "@faker-js/faker";
import Table from "./index";
import { column } from "./interface";

// 定义列的信息
const columns: column[] = [
  {
    key: "id",
    label: "ID",
    width: 300,
    defaultSortOrder: "ascend",
    sorter: (a, b) => a.id - b.id,
  },
  { key: "name", label: "Name", width: 300 },
  { key: "email", label: "Email", width: 300 },
  { key: "phone", label: "Phone", width: 300 },
  { key: "address", label: "Address", width: 300 },
];

const generateRandomData = () => {
  // 生成不重复的假数据，这里假设有10000条记录，每条记录有5个字段
  const uniqueData = new Set();
  let i = 0;
  while (uniqueData.size < 10000) {
    i++;
    const fakeData = {
      id: i,
      name: faker.person.fullName(),
      email: faker.internet.email(),
      address: faker.location.streetAddress(),
      phone: faker.phone.number(),
    };

    uniqueData.add(JSON.stringify(fakeData));
  }

  const uniqueDataArray = Array.from(uniqueData).map((data) =>
    JSON.parse(data as any)
  );
  return uniqueDataArray;
};

const PerformanceTest: React.FC = () => {
  const [data, setData] = useState(generateRandomData());
  const [updateCount, setUpdateCount] = useState(0);
  const startTimeRef = useRef<number | null>(null);

  // 处理压力测试的回调函数
  const handleStressTest = useCallback(() => {
    // 当压力测试开始时，记录当前时间
    startTimeRef.current = performance.now();

    // 模拟快速数据更新（排序和过滤等）
    for (let i = 0; i < 10; i++) {
      setData((prevData) => {
        // 实现快速更新数据的逻辑（例如排序）
        // 确保创建数据的新副本以触发重新渲染
        return [...prevData].sort(() => Math.random() - 0.5);
      });
    }

    // 更新计数器以跟踪测试次数
    setUpdateCount((prevCount) => prevCount + 1);
  }, []);

  // 使用 useEffect 监听更新计数器，测量测试时间
  useEffect(() => {
    // 测量压力测试的执行时间
    const endTime = performance.now();
    const elapsedTime = endTime - (startTimeRef.current || 0);
    console.log(
      `压力测试 ${updateCount} 完成，耗时 ${elapsedTime.toFixed(2)} 毫秒。`
    );
  }, [updateCount]);

  return (
    <div>
      <button onClick={handleStressTest}>执行压力测试</button>
      <Table
        data={data}
        columns={columns}
        rowHeight={50}
        tableHeight={300}
        pageSize={10000}
      />
    </div>
  );
};

export default PerformanceTest;
