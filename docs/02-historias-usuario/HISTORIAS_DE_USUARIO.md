# Historias de usuario priorizadas

| ID | Historia | Prioridad |
|---|---|---|
| HU-01 | Como vendedor quiero buscar productos para atender rápido una venta. | Alta |
| HU-02 | Como vendedor quiero registrar una venta con validación de stock para evitar cantidades negativas. | Alta |
| HU-03 | Como cliente quiero solicitar un pedido para recojo y obtener un código. | Alta |
| HU-04 | Como encargado quiero cambiar el estado del pedido para informar su preparación. | Alta |
| HU-05 | Como encargado quiero confirmar entrega una sola vez para evitar errores. | Alta |
| HU-06 | Como encargado quiero registrar entradas de productos para actualizar existencias. | Alta |
| HU-07 | Como administrador quiero ver alertas de stock mínimo para programar reabastecimiento. | Media |
| HU-08 | Como administrador quiero consultar reportes resumidos para evaluar operaciones. | Media |
| HU-09 | Como administrador quiero controlar accesos por rol para proteger operaciones. | Alta |

## Ejemplo de aceptación de HU-02
**Dado** un producto con stock disponible 4, **cuando** intento vender 5, **entonces** la operación se rechaza y el stock no cambia.

**Dado** un producto con stock disponible 4, **cuando** vendo 2, **entonces** la venta se registra y el stock disponible queda en 2.

Para el detalle por tarea revisar `kanban/issues/`.
