# GTD Agency Web

Frontend en Astro conectado a WordPress como fuente de contenido, publicado como sitio estatico con rebuild automatico.

## Stack

- Astro 6
- React para componentes interactivos
- Tailwind CSS 4
- WordPress REST API
- Render Static Site u otro hosting estatico con deploy hook

## Variables

Crear `.env` local:

```env
WP_API_URL=http://wordpress.local
PUBLIC_SITE_URL=http://localhost:4321
PUBLIC_SITE_NAME=GTD Agency
PUBLIC_SITE_LOGO_TEXT=GTD
PUBLIC_SITE_TAGLINE=Galeria audiovisual
PUBLIC_SITE_LOCATION=Republica Dominicana
PUBLIC_SITE_DESCRIPTION=Galeria audiovisual de entrenamientos, marchas, desfiles y actividades militares en Republica Dominicana.
PUBLIC_OG_IMAGE=/og-image.jpg
PUBLIC_HOME_HERO_SLUG=home-hero
PUBLIC_HOME_PRESENTATION_SLUG=home-presentation
PUBLIC_HOME_OVERVIEW_PAGE_SLUG=home-overview
PUBLIC_HOME_FEATURED_PAGE_SLUG=home-featured
PUBLIC_HOME_RECENT_PAGE_SLUG=home-recent
PUBLIC_SHOW_DEMO_CONTENT=false
```

## Que administra el cliente desde WordPress

### Publicaciones del tipo `contenido_audiovisual`

- Galeria publica
- Ultimas publicaciones
- Paginas de detalle
- Carrusel destacado cuando la publicacion tenga `destacado = true`

### Slots especiales del home

Se controlan con publicaciones reservadas del tipo `contenido_audiovisual`:

- `home-hero`
- `home-presentation`

Estas publicaciones no salen en la galeria publica. Se usan solo para el home.

### Paginas editoriales

Se controlan con paginas normales de WordPress:

- `sobre-nosotros`
- `contacto`
- `privacidad`
- `terminos`
- `home-overview`
- `home-featured`
- `home-recent`

### WhatsApp y redes sociales

Ya no salen de variables de entorno.

Ahora el sitio los toma desde el contenido HTML de la pagina `contacto` en WordPress:

- primer enlace de WhatsApp reconocido = boton global, header y acciones de contacto
- enlaces de Facebook, Instagram, YouTube y TikTok = footer y pagina de contacto

Si la pagina `contacto` no tiene esos enlaces, el frontend no mostrara botones reales o mostrara placeholders segun la seccion.

## Desarrollo

```sh
npm install
npm run dev
```

## Build

```sh
npm run build
```

El resultado sale en `dist/`.

## Produccion

Flujo recomendado:

1. El cliente edita contenido en WordPress.
2. WordPress dispara el deploy hook del hosting.
3. El hosting reconstruye Astro.
4. La version publicada refleja el cambio sin tocar frontend.

Condicion importante:

- `WP_API_URL` debe apuntar a un WordPress publico y accesible desde el entorno de build.

Archivos utiles para deploy:

- [render.yaml](./render.yaml)
- [docs/wordpress-render-deploy-hook.php](./docs/wordpress-render-deploy-hook.php)
- [docs/wp-config.render-hook.example.php](./docs/wp-config.render-hook.example.php)
- [scripts/test-render-deploy-hook.ps1](./scripts/test-render-deploy-hook.ps1)

## Manuales

- [Manual del cliente WordPress](./docs/manual-cliente-wordpress.md)
- [Manual del developer para deploy, rebuild y dominio](./docs/manual-desarrollador-deploy.md)
