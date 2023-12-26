import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Load from "./pages/load";
import Save from "./pages/save";

import { IgrExcelModule } from "igniteui-react-excel";
import { IgrSpreadsheetModule } from "igniteui-react-spreadsheet";
import Template from "./pages/template";

IgrExcelModule.register();
IgrSpreadsheetModule.register();

function App() {
  return (
    <Router>
      <Link to="/">読み込み</Link>
      <br />
      <Link to="/save">編集・出力</Link>
      <br />
      <Link to="/template">template</Link>

      <Routes>
        <Route path="/" element={<Load />} />
        <Route path="/save" element={<Save />} />
        <Route path="/template" element={<Template />} />
      </Routes>
    </Router>
  );
}

export default App;
