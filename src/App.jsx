import { Route, Routes, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import ConsoleBoard from "./pages/ConsoleBoard"
import Outlets from "./pages/Outlets"
import { Outlet } from "./pages/Outlet"
import { ProductDashBoard } from "./pages/product-page/ProductDashBoard"
import Analytics from "./pages/product-page/Analytics"

function App() {

  return (
      <Routes>
        <Route path="/" element={<ConsoleBoard/>}>
          <Route path="" element={<Navigate to="/outlets" />} />
          <Route path="/outlets" element={<Outlets />} />
          <Route path="/products" element={<ProductDashBoard />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/outlets/:id" element={<Outlet />} />
        </Route>
        <Route path="/login" element={<Login/>}/>
      </Routes>
  )
}

export default App
