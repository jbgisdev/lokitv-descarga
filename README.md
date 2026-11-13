# Loki TV - Landing Page de Descarga APK

Single Page Application (SPA) moderna, minimalista y responsiva dedicada exclusivamente a la descarga directa de la última versión oficial del APK de **Loki TV** para dispositivos Android (Smartphones, Tablets, Android TV, TV Box y Fire TV Stick).

## 🚀 Tecnologías
- **Framework:** React 18 + Vite + TypeScript
- **Estilos:** Tailwind CSS (Dark Mode, Glassmorphism, paleta de colores de Loki TV)
- **Iconografía:** Lucide React
- **Base de Datos:** Supabase (`app_settings` / `url_download_apk`)

## 🎨 Características UI/UX
- **Fondo con Efecto Blur:** Imagen promocional a pantalla completa con desenfoque suave (`blur`), oscurecimiento y destellos atmosféricos de marca.
- **Tarjeta Central Glassmorphism:** Réplica exacta del estilo y línea gráfica del portal administrativo (`lokitv-portal`), con sombras sutiles, bordes traslúcidos y logo de Loki TV con destello dinámico.
- **Botón de Descarga Reactivo:**
  - Consulta automática a Supabase al cargar la página.
  - Indicador de estado de carga (*"Obteniendo enlace..."*).
  - Descarga directa inmediata del archivo APK (`LokiTV.apk`).
  - Estado deshabilitado si el enlace no está disponible o no está configurado.
  - Alerta amigable con botón de reintento en caso de fallo de red.
- **Herramientas Adicionales:**
  - Botón para copiar enlace directo de descarga al portapapeles.
  - Generador de código QR para escaneo directo desde cámaras de móviles o televisores.
  - Guía rápida paso a paso para la instalación de APKs en Android y Android TV (incluyendo recomendación de la app *Downloader*).
  - Insignias de compatibilidad (Android TV, Fire Stick, Smartphones, Tablets).

## 💻 Comandos Disponibles

```bash
# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build

# Previsualizar la compilación de producción
npm run preview
```

## ⚙️ Variables de Entorno (.env)
```env
VITE_SUPABASE_URL=https://aznaipcwhdrsxxomlizd.supabase.co
VITE_SUPABASE_ANON_KEY=...
```

