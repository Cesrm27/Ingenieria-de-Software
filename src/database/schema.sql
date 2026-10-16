-- Modelo PostgreSQL de referencia para proyecto académico.
-- No es sistema listo para producción ni contempla lotes/vencimientos.
CREATE TABLE usuarios (
 id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
 nombre VARCHAR(120) NOT NULL,
 email VARCHAR(200) UNIQUE NOT NULL,
 clave_hash TEXT NOT NULL,
 rol VARCHAR(30) NOT NULL CHECK (rol IN ('admin','vendedor','almacen'))
);
CREATE TABLE productos (
 id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
 nombre VARCHAR(180) NOT NULL,
 precio NUMERIC(12,2) NOT NULL CHECK (precio >= 0),
 stock_minimo INTEGER NOT NULL DEFAULT 5 CHECK (stock_minimo >= 0),
 activo BOOLEAN NOT NULL DEFAULT TRUE
);
CREATE TABLE inventario (
 producto_id BIGINT PRIMARY KEY REFERENCES productos(id),
 cantidad INTEGER NOT NULL DEFAULT 0 CHECK (cantidad >= 0),
 reservada INTEGER NOT NULL DEFAULT 0 CHECK (reservada >= 0),
 CHECK (reservada <= cantidad)
);
CREATE TABLE ventas (
 id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
 usuario_id BIGINT REFERENCES usuarios(id),
 fecha TIMESTAMPTZ NOT NULL DEFAULT now(),
 total NUMERIC(12,2) NOT NULL CHECK (total >= 0)
);
CREATE TABLE detalle_venta (
 id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
 venta_id BIGINT NOT NULL REFERENCES ventas(id),
 producto_id BIGINT NOT NULL REFERENCES productos(id),
 cantidad INTEGER NOT NULL CHECK (cantidad > 0),
 precio NUMERIC(12,2) NOT NULL CHECK (precio >= 0)
);
CREATE TABLE pedidos (
 id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
 codigo VARCHAR(30) NOT NULL UNIQUE,
 estado VARCHAR(20) NOT NULL DEFAULT 'solicitado' CHECK (estado IN ('solicitado','preparado','entregado','cancelado')),
 fecha TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TABLE detalle_pedido (
 id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
 pedido_id BIGINT NOT NULL REFERENCES pedidos(id),
 producto_id BIGINT NOT NULL REFERENCES productos(id),
 cantidad INTEGER NOT NULL CHECK (cantidad > 0),
 precio NUMERIC(12,2) NOT NULL CHECK (precio >= 0)
);
CREATE TABLE movimientos (
 id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
 producto_id BIGINT NOT NULL REFERENCES productos(id),
 tipo VARCHAR(20) NOT NULL CHECK (tipo IN ('entrada','salida','ajuste')),
 cantidad INTEGER NOT NULL CHECK (cantidad > 0),
 fecha TIMESTAMPTZ NOT NULL DEFAULT now(),
 observacion TEXT
);
-- Los flujos de venta, reserva y entrega deben implementarse en transacciones
-- de servidor con bloqueos/aislamiento adecuados, no desde el cliente web.
