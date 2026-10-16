# Cómo montar el Kanban en GitHub

1. Crear el repositorio y subir esta carpeta (ver instrucciones en raíz).
2. En GitHub, abrir **Projects > New project > Board** (según interfaz de su cuenta).
3. Nombrar `InkaFarma | Gestión de ventas, recojo e inventario`.
4. Configurar campo `Status`: Backlog, Por hacer, En progreso, En revisión, Hecho.
5. Configurar campo `Priority`: Alta, Media, Baja; opcional `Target date`.
6. En el repositorio, crear labels: `analisis`, `documentacion`, `frontend`, `backend`, `database`, `ventas`, `pedidos`, `inventario`, `testing`, `gestion`, `entrega`.
7. Crear Issues usando el contenido de `kanban/issues/` o copiar las filas del `kanban/backlog.csv`.
8. Añadir Issues al proyecto y asignar responsables y prioridades. No todos deben iniciar en 'Por hacer'.
9. Vincular el proyecto al repositorio desde la pestaña `Projects`, si aparece la opción de vincular.
10. Límite WIP recomendado: 2 tareas en progreso por persona. Revisar el tablero al menos dos veces por semana.

## Políticas de transición
- **Backlog -> Por hacer:** descripción y criterios claros; tarea priorizada.
- **Por hacer -> En progreso:** responsable identificado.
- **En progreso -> En revisión:** entregable + evidencia + PR si implica código.
- **En revisión -> Hecho:** criterios cumplidos, revisión y pruebas según corresponda.

## Automatización opcional
GitHub CLI (`gh`) permite crear Issues automáticamente desde archivos, previa autenticación y configuración de un repositorio remoto. El script `kanban/importar_issues.py` prepara comandos como ayuda y **no los ejecuta** sin `--execute`. Requiere `gh` instalado, permiso de escritura y haber hecho `gh auth login`. Agregar Issues al Project y configurar campos se hace por separado en GitHub.
