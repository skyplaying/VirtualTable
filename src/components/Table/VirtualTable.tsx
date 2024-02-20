import React, { useState, useEffect, useRef } from "react";
import Pagination from "../Pagination";
import { VirtualTableProps } from "./interface";
import "./index.css";

const VirtualTable = (props: VirtualTableProps) => {
  const {
    data,
    columns,
    rowHeight = 40,
    tableHeight = 300,
    pageSize = 10,
  } = props;
  const [visibleData, setVisibleData] = useState([] as any[]);
  const [scrollTop, setScrollTop] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageSize, setCurrentPageSize] = useState(pageSize);
  const [currentPageData, setCurrentPageData] = useState([] as any[]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  };

  // 缓冲区大小
  const buffer = 5;
  const visibleCount = Math.ceil(tableHeight / rowHeight);
  const startIndex = Math.max(0, Math.floor(scrollTop / rowHeight) - buffer);
  const endIndex = Math.min(
    data.length,
    startIndex + visibleCount + buffer * 2
  );

  const tbodyRef = useRef<HTMLDivElement>(null);

  //是否虚拟滚动
  const isVirtual = currentPageSize > 200;

  // 计算总高度并设置占位
  const totalHeight = data.length * rowHeight;
  const paddingTop = startIndex * rowHeight;
  let paddingBottom = totalHeight - endIndex * rowHeight;

  useEffect(() => {
    if (isVirtual) {
      setVisibleData(data.slice(startIndex, endIndex));
    }
  }, [scrollTop, data, startIndex, endIndex]);

  //切换页码
  useEffect(() => {
    if (isVirtual) {
    } else {
      setCurrentPageData(
        data.slice(
          (currentPage - 1) * currentPageSize,
          currentPage * currentPageSize
        )
      );
    }
    if (tbodyRef.current) {
      tbodyRef.current.scrollTop = 0;
    }
  }, [currentPage, currentPageSize, data]);

  return (
    <>
      <div>
        <div className="thead">
          {columns.map((col) => (
            <div
              key={col.key}
              style={{
                width: `${col.width}px`,
              }}
            >
              {col.label}
            </div>
          ))}
        </div>

        {/* 虚拟滚动和正常滚动 */}
        {isVirtual ? (
          <div
            className="tbody"
            style={{ height: `${tableHeight}px`, overflowY: "auto" }}
            ref={tbodyRef}
            onScroll={handleScroll}
          >
            <div style={{ paddingTop, paddingBottom }}>
              {visibleData.map((row, index) => (
                <div
                  className="tr"
                  key={index}
                  style={{ height: `${rowHeight}px` }}
                >
                  {columns.map((col: { key: string; width: number }) => (
                    <div
                      className="td"
                      key={col.key}
                      style={{ width: col.width }}
                    >
                      {row[col.key]}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div
            className="tbody"
            style={{ height: `${tableHeight}px`, overflowY: "auto" }}
            ref={tbodyRef}
          >
            {currentPageData.map((row, index) => (
              <div
                className="tr"
                key={index}
                style={{ height: `${rowHeight}px` }}
              >
                {columns.map((col: { key: string; width: number }) => (
                  <div
                    className="td"
                    key={col.key}
                    style={{ width: col.width }}
                  >
                    {row[col.key]}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
      <Pagination
        total={data.length}
        pageSize={currentPageSize}
        current={currentPage}
        onChange={(page, pageSize) => {
          setCurrentPage(page);
          setCurrentPageSize(pageSize);
        }}
      />
    </>
  );
};

export default VirtualTable;
