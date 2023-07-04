import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Browser } from "./constants";
import { Home, Http404 } from "./pages";

export default function App() {
  <BrowserRouter>
    <Routes>
      <Route path={Browser.ROOT} element={<Home />}></Route>
      <Route path={Browser.HTTP_404} element={<Http404 />}></Route>
      <Route path={Browser.ASTERICK} element={<Http404 />}></Route>
    </Routes>
  </BrowserRouter>;
}
