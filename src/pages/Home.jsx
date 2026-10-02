import { Typography, Button } from "antd";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div style={{ textAlign: "center", padding: "48px 0" }}>
      <Typography.Title>Catálogo de productos</Typography.Title>
      <Typography.Paragraph>
        Explorá productos de ropa, joyería y electrónica traídos en tiempo real
        desde la Fake Store API. Buscá por nombre y entrá al detalle de cada uno.
      </Typography.Paragraph>
      <Button type="primary" size="large" onClick={() => navigate("/catalogo")}>
        Ver catálogo
      </Button>
    </div>
  );
}
