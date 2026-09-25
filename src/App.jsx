import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom'

import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import ProtectedRoute from './components/Common/ProtectedRoute'
import AppLayout from './components/Layout/AppLayout'
import Products from './pages/Products'
import CreateProduct from './pages/CreateProduct'
import ProductDetails from './pages/ProductDetails'
import EditProduct from './pages/EditProduct'
import AIProductGenerator from './pages/AIProductGenerator'
import AISearch from './pages/AISearch'
import Register from './pages/Register'

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public routes */}
        <Route
          path="/login"
          element={<Login />}
        />
        <Route
  path="/register"
  element={<Register />}
/>

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>

            <Route
              path="/dashboard"
              element={<Dashboard />}
            />
              <Route
               path="/products"
                element={<Products />}
              />
              <Route
                path="/products/create"
                element={<CreateProduct />}
            />
            <Route
              path="/products/:id"
             element={<ProductDetails />}
              />
              <Route
            path="/products/:id/edit"
             element={<EditProduct />}
          />
          <Route
  path="/ai"
  element={<AIProductGenerator />}
/>

<Route
  path="/ai/search"
  element={<AISearch />}
/>
          </Route>
        </Route>

        {/* Default route */}
        <Route
          path="/"
          element={<Navigate to="/dashboard" replace />}
        />

        {/* Unknown routes */}
        <Route
          path="*"
          element={<Navigate to="/dashboard" replace />}
        />

      </Routes>
    </BrowserRouter>
  )
}

export default App