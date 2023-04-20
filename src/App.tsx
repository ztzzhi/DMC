import { HashRouter, BrowserRouter } from "react-router-dom"
import AppRouter from "./router"
import "./App.css"
import "@/assets/css/reset.css"
import "@/assets/css/global.less"
function App() {
  return (
    <div className="mainContainer">
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </div>
  )
}

export default App
