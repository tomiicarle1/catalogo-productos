import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Alert, Button, Card, Descriptions, Result, Skeleton, Tag, Typography } from "antd";
import { esNoEncontrado, getItemById } from "../services/api.js";

export default function Detalle() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [noEncontrado, setNoEncontrado] = useState(false);
  const [intento, setIntento] = useState(0);

  useEffect(() => {
    let cancelado = false;
    async function cargar() {
      setLoading(true);
      setError(null);
      setNoEncontrado(false);
      setItem(null);
      try {
        const data = await getItemById(id);
        if (!cancelado) setItem(data);
      } catch (err) {
        if (cancelado) return;
        if (esNoEncontrado(err)) setNoEncontrado(true);
        else setError(err);
      } finally {
        if (!cancelado) setLoading(false);
      }
    }
    cargar();
    return () => {
      cancelado = true;
    };
  }, [id, intento]);

  const volver = () => navigate("/catalogo");

  if (loading) return <Skeleton active avatar paragraph={{ rows: 6 }} />;

  if (noEncontrado) {
    return (
      <Result
        status="404"
        title="Elemento no encontrado"
        subTitle={`No existe un producto con el id "${id}".`}
        extra={<Button type="primary" onClick={volver}>Volver al catálogo</Button>}
      />
    );
  }

  if (error) {
    return (
      <Alert
        type="error"
        showIcon
        message="No pudimos cargar el producto"
        description="Revisá tu conexión o intentá de nuevo más tarde."
        action={
          <>
            <Button onClick={() => setIntento((n) => n + 1)}>Reintentar</Button>{" "}
            <Button onClick={volver}>Volver</Button>
          </>
        }
      />
    );
  }

  return (
    <>
      <Button onClick={volver} style={{ marginBottom: 16 }}>Volver</Button>
      <Card>
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
          <img
            src={item.image}
            alt={item.title}
            style={{ width: 280, maxWidth: "100%", objectFit: "contain" }}
          />
          <div style={{ flex: 1, minWidth: 260 }}>
            <Typography.Title level={3}>{item.title}</Typography.Title>
            <Tag color="blue">{item.category}</Tag>
            <Typography.Paragraph style={{ marginTop: 16 }}>
              {item.description}
            </Typography.Paragraph>
            <Descriptions column={1} size="small">
              <Descriptions.Item label="Precio">${item.price}</Descriptions.Item>
              <Descriptions.Item label="Puntuación">
                {item.rating?.rate} ({item.rating?.count} opiniones)
              </Descriptions.Item>
            </Descriptions>
          </div>
        </div>
      </Card>
    </>
  );
}
