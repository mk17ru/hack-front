import './App.css';
import StackTraceTable from './StackTraceTable';
import Diff from './Diff';
import Graphic from './Graphic';

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" Component={Diff}></Route>
          <Route path="/stackTrace" Component={StackTraceTable}></Route>
          <Route path="/graph" Component={Graphic}></Route>
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

function Header() {
  return (
    <header>
      <div className="flex_header">
        <div className="header_left">
          <Link to="/">Diff checker</Link>
        </div>
        <div className="header_right">
          <Link to="/stackTrace">StackTrace</Link>
        </div>
        <div className="header_right">
          <Link to="/graph">Graph</Link>
        </div>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer>
      <div>
        Made by Яндексоиды и Федя
      </div>
    </footer>
  )
}

export default App;
