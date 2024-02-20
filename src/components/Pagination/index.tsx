import React, { useState } from "react";
import Select from "../Select";
import "./index.css";

interface PaginationProps {
  total: number;
  pageSize: number;
  current: number;
  onChange: (page: number, pageSize: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  total,
  pageSize,
  current,
  onChange,
}) => {
  const totalPage = Math.ceil(total / pageSize);

  const [toPage, setToPage] = useState(1);

  const [currentPageSize, setCurrentPageSize] = useState(pageSize);

  const handlePrev = () => {
    onChange(current - 1, currentPageSize);
  };

  const handleNext = () => {
    onChange(current + 1, currentPageSize);
  };

  const handlePageClick = () => {
    onChange(toPage, currentPageSize);
  };

  const onPageInputChange = (e: { target: { value: string } }) => {
    let value;
    //只能为正整数
    if (e.target.value.match(/^[1-9]\d*$/)) {
      value = e.target.value;
    } else {
      value = 1;
    }
    //不可超出范围
    if (Number(value) > totalPage) {
      value = totalPage;
    }
    setToPage(Number(value));
  };

  const selectPageOptions = [
    { value: "10", label: "10条/页" },
    { value: "20", label: "20条/页" },
    { value: "10000", label: "10000条/页" },
  ];

  return (
    <div className="pagination">
      <button onClick={handlePrev} disabled={current === 1}>
        上一页
      </button>
      <span>
        {current} / {totalPage}
      </span>
      <button onClick={handleNext} disabled={current === totalPage}>
        下一页
      </button>
      {/* 选择多少条一页 */}
      <Select
        options={selectPageOptions}
        value={currentPageSize.toString()}
        onChange={(value) => {
          onChange(1, Number(value));
          setCurrentPageSize(Number(value));
        }}
      />
      {/* 跳转到具体页数 */}
      <input type="text" value={toPage} onChange={onPageInputChange} />
      <button onClick={handlePageClick}> 跳转</button>
    </div>
  );
};

export default Pagination;
