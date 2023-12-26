import React, { useState } from "react";
import { IgrSpreadsheet } from "igniteui-react-spreadsheet";
import { ExcelUtility } from "../ExcelUtility";
import { Worksheet } from "igniteui-react-excel";

export default function Template() {
  const spreadsheetRef = React.useRef<IgrSpreadsheet>(null);

  interface FormData {
    name: string;
    age: string;
    hobby: string;
    [key: string]: string; // Add an index signature
  }

  const [formData, setFormData] = useState<FormData>({
    name: "",
    age: "",
    hobby: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // {{ }} で囲まれているかどうか
  const isTemplate = (str: string) => {
    return str.startsWith("{{") && str.endsWith("}}");
  };

  // {{ }} の削除
  const trimBrackets = (str: string) => {
    return str.slice(2).slice(0, -2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const workSheet = spreadsheetRef.current!.workbook.sheets(0) as Worksheet;
    const row = workSheet.rows().count;
    for (let index = 0; index < row; index++) {
      const cellValue = workSheet.rows(index).cells(1).value;
      if (cellValue && isTemplate(cellValue)) {
        const key = trimBrackets(cellValue);
        workSheet.rows(index).cells(1).value = formData[key];
      }
    }
  };

  // 初期ロード時にテンプレートExcelファイルを読み込みます
  React.useEffect(() => {
    ExcelUtility.loadFromUrl("Template1220.xlsx").then((w) => {
      spreadsheetRef.current!.workbook = w;
    });
  }, []);

  return (
    <>
      <h2>テンプレート</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
        />
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          placeholder="Age"
        />
        <input
          type="text"
          name="hobby"
          value={formData.hobby}
          onChange={handleChange}
          placeholder="Hobby"
        />
        <button type="submit">Submit</button>
      </form>
      <div style={{ height: "700px" }}>
        <IgrSpreadsheet height="100%" ref={spreadsheetRef} />
      </div>
    </>
  );
}
