import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Alert, Button, Card, Col, Empty, Input, Row, Spin, Typography } from "antd";
import { getItems } from "../services/api.js";

export default function Catalogo() {
  const [searchParams, setSearchParams] = useSearchParams();
  const buscar = searchParams.get("buscar") ?? "";

  // El input arranca con el valor de la URL y se resincroniza si ésta cambia.
  const [texto, setTexto] = useState(buscar);
  useEffect(() => setTexto(buscar), [buscar]);

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [intento, setIntento] = useState(0);

  useEffect(() => {
    let cancelado = false;
    async function cargar() {
      setLoading(true);
      setError(null);
      try {
        const data = await getItems(buscar);
        if (!cancelado) setItems(data);
      } catch (err) {
        if (!cancelado) setError(err);
      } finally {
        if (!cancelado) setLoading(false);
      }
    }
    cargar();
    return () => {
      cancelado = true;
    };
  }, [buscar, intento]);

  function onSearch(valor) {
    const limpio = valor.trim();
    setSearchParams(limpio ? { buscar: limpio } : {});
  }

  let contenido;
  if (loading) {
    contenido = (
      <div style={{ textAlign: "center", padding: 48 }}>
        <Spin size="large" />
      </div>
    );
  } else if (error) {
    contenido = (
      <Alert
        type="error"
        showIcon
        message="No pudimos cargar los productos"
        description="Revisá tu conexión o intentá de nuevo más tarde."
        action={<Button onClick={() => setIntento((n) => n + 1)}>Reintentar</Button>}
      />
    );
  } else if (items.length === 0) {
    contenido = <Empty description="No se encontraron productos" />;
  } else {
    contenido = (
      <Row gutter={[16, 16]}>
        {items.map((p) => (
          <Col key={p.id} xs={24} sm={12} md={8} lg={6}>
            <Card
              hoverable
              cover={
                <img
                  src={p.image}
                  alt={p.title}
                  style={{ height: 200, objectFit: "contain", padding: 16 }}
                />
              }
            >
              <Card.Meta
                title={p.title}
                description={`$${p.price} · ${p.category}`}
              />
              <Link to={`/catalogo/${p.id}`}>
                <Button type="link" style={{ paddingLeft: 0, marginTop: 8 }}>
                  Ver detalle
                </Button>
              </Link>
            </Card>
          </Col>
        ))}
      </Row>
    );
  }

  return (
    <>
      <Typography.Title level={2}>Catálogo</Typography.Title>
      <Input.Search
        placeholder="Buscar productos por nombre"
        allowClear
        enterButton="Buscar"
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        onSearch={onSearch}
        style={{ maxWidth: 480, marginBottom: 24 }}
      />
      {contenido}
    </>
  );
}
