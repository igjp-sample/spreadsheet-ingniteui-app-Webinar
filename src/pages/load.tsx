import React from "react";
import { IgrSpreadsheet } from "igniteui-react-spreadsheet";
import { ExcelUtility } from "../ExcelUtility";

export default function Load() {
  const spreadsheetRef = React.useRef<IgrSpreadsheet>(null);

  // 初期ロード時にテンプレートExcelファイルを読み込みます
  React.useEffect(() => {
    ExcelUtility.loadFromUrl("TaskBook.xlsx").then((w) => {
      spreadsheetRef.current!.workbook = w;
    });
  }, []);

  return (
    <>
      <h2>読み込み</h2>
      <div style={{ height: "700px" }}>
        <IgrSpreadsheet height="100%" ref={spreadsheetRef} />
      </div>
    </>
  );
}
