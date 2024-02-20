export interface DataItem {
  id: number;
  [key: string]: any;
}

export interface column {
  key: string;
  label: string;
  width: number;
  onFilter?: (value: string, record: any) => boolean;
  sorter?: (a: any, b: any) => number;
  sortDirections?: ["descend" | "ascend"];
  defaultSortOrder?: "descend" | "ascend";
}

export interface VirtualTableProps {
  data: any[];
  columns: column[];
  rowHeight?: number; // 每行的高度
  tableHeight?: number; // 表格的总高度
  pageSize?: number; // 每页显示的行数
}
