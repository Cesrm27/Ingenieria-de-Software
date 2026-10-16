# Backend — pendiente de implementación

Definir tecnología con el equipo (ej. Node.js/Express o Python/FastAPI) antes de generar código de servidor.

## API propuesta
- `POST /auth/login`
- `GET /products`
- `POST /sales`
- `POST /pickup-orders`
- `GET /pickup-orders/:code`
- `PATCH /pickup-orders/:id/status`
- `GET /inventory`
- `POST /inventory/movements`
- `GET /reports/summary`

Requisitos de implementación: autorización por rol en servidor, transacciones atómicas de stock y reservas, validación de entradas, manejo de errores, contraseñas con hash seguro y pruebas automatizadas.

**No hay API implementada en esta entrega.**
