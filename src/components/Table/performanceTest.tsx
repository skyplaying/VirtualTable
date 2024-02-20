import React, { useState } from "react";
import { faker } from "@faker-js/faker";
import Table from "./index";
import { column } from "./interface";

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
  const [data] = useState(generateRandomData());
  return (
    <div>
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
