import {
  CellFill,
  Workbook,
  WorkbookFormat,
  WorkbookSaveOptions,
} from "igniteui-react-excel";
import { saveAs } from "file-saver";

export default function Save() {
  const download = async () => {
    return new Promise<null>((resolve, reject) => {
      const workbook = new Workbook(WorkbookFormat.Excel2007);
      // new Workbook()の時点ではシートが存在しないのでシートを追加
      const sheet = workbook.worksheets().add("シート");
      // A1セルに値を設定
      sheet.rows(0).cells(0).value = "Hello World";

      // A2セルに値を設定
      sheet.rows(1).cells(0).value = "こんにちは！";

      // A1セルに背景色を設定
      const cellFill = CellFill.createSolidFill("Cyan");
      sheet.rows(0).cells(0).cellFormat.fill = cellFill;

      // A2セルに背景色を設定
      sheet.rows(1).cells(0).cellFormat.fill = cellFill;

      const opt = new WorkbookSaveOptions();
      opt.type = "blob";

      workbook.save(
        opt,
        (d) => {
          const fileExt = ".xlsx";
          const fileName = `ファイル名変えた${fileExt}`;
          saveAs(d as Blob, fileName);
          resolve(null);
        },
        (e) => {
          reject(e);
        }
      );
    });
  };
  return (
    <>
      <h2>編集・出力</h2> <button onClick={download}>ダウンロード</button>
    </>
  );
}
