import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <Result
      status="404"
      title="404 - No encontrado"
      subTitle="La página que buscás no existe."
      extra={<Button type="primary" onClick={() => navigate("/")}>Ir al inicio</Button>}
    />
  );
}
