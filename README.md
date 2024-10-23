# SpookyBites 🎃👻

## Descripción

**SpookyBites** es una aplicación web que permite a los usuarios subir fotos de los ingredientes secretos que utilizan en sus recetas de Halloween, aplicar efectos espeluznantes a las imágenes y compartir sus creaciones con la comunidad. Los usuarios también pueden votar por las recetas más creativas y descargar las imágenes procesadas para compartirlas en redes sociales.

---

## Funcionalidades

- Subida de recetas con imágenes de platos temáticos de Halloween.
- Selección de ingredientes terroríficos.
- Almacenamiento y gestión de imágenes mediante [Cloudinary](https://cloudinary.com/).

---

## Requisitos

- Node.js (v14 o superior)
- Cuenta en Cloudinary (para el manejo de imágenes)
- API Key de Cloudinary

---

## Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/tu-usuario/spookybites.git
   cd spookybites
   ```

2. Instala las dependencias:

   ```bash
   pnpm install
   ```

3. Crea un archivo .env en el directorio raíz y agrega tus credenciales de Cloudinary:

   ```makefile
   CLOUDINARY_CLOUD_NAME=tu_cloud_name
   CLOUDINARY_API_KEY=tu_api_key
   CLOUDINARY_API_SECRET=tu_api_secret
   ```

4. Inicia el servidor local:
   ```bash
   pnpm run dev
   ```
