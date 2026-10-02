import { NavLink, useLocation } from "react-router-dom";
import { Layout, Menu } from "antd";

const { Header } = Layout;

export default function Navbar() {
  const { pathname } = useLocation();
  const activa = pathname.startsWith("/catalogo") ? "/catalogo" : pathname === "/" ? "/" : "";

  const items = [
    { key: "/", label: <NavLink to="/" end>Home</NavLink> },
    { key: "/catalogo", label: <NavLink to="/catalogo">Catálogo</NavLink> },
  ];

  return (
    <Header style={{ display: "flex", alignItems: "center" }}>
      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={[activa]}
        items={items}
        style={{ flex: 1, minWidth: 0 }}
      />
    </Header>
  );
}
