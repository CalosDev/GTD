# Manual del developer - Deploy, rebuild y dominio

Este manual es para ti como developer. Explica como publicar esta web, como dejar el rebuild automatico desde WordPress y como moverla a dominio real sin depender de SSR.

## 1. Arquitectura actual recomendada

La arquitectura recomendada para este proyecto es:

- Frontend: Astro static build
- Hosting frontend: Static Site en Render o equivalente
- CMS: WordPress publico con REST API accesible
- Actualizacion de contenido: rebuild automatico por deploy hook

Conclusion tecnica:

- el frontend ya no necesita Node.js en produccion
- no conviene SSR para esta web
- cada cambio de contenido en WordPress debe disparar un nuevo build

## 2. Por que esta arquitectura es la adecuada aqui

Este sitio no necesita HTML distinto por usuario ni logica por request.

Con static + rebuild automatico ganas:

- menos puntos de falla en produccion
- deploy mas barato y simple
- mejor cache del frontend
- menos dependencia directa de que WordPress responda en cada visita
- dominio y SSL mas simples de operar

Lo que sacrificas:

- el cambio no aparece en el mismo segundo
- aparece cuando termina el rebuild

En la practica, para este tipo de web eso es mejor tradeoff.

## 3. Requisitos previos

Antes de desplegar, confirma esto:

1. El proyecto compila localmente:

```sh
npm install
npm run build
```

2. WordPress ya es publico.

Debes poder abrir estas rutas:

```txt
https://cms.tudominio.com/wp-json/wp/v2/pages
https://cms.tudominio.com/wp-json/wp/v2/contenido_audiovisual
```

3. En WordPress existen al menos estos slugs:

- `home-hero`
- `home-presentation`
- `home-overview`
- `home-featured`
- `home-recent`
- `sobre-nosotros`
- `contacto`
- `privacidad`
- `terminos`

Los slugs `home-hero` y `home-presentation` deben ser entradas del tipo `contenido_audiovisual`, no assets del frontend. Sus imagenes deben salir de `Imagen destacada` en WordPress.

4. El repo ya esta en GitHub, GitLab o Bitbucket.

## 4. Variables de entorno

Estas variables deben existir en el hosting del frontend:

```env
WP_API_URL=https://cms.tudominio.com
PUBLIC_SITE_URL=https://www.tudominio.com
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

Reglas criticas:

- `WP_API_URL` nunca debe quedar en `.local`
- `PUBLIC_SITE_URL` debe ser la URL final del frontend
- `PUBLIC_SHOW_DEMO_CONTENT` debe quedar en `false`
- no versionar imagenes de contenido del cliente dentro de `public/media` o carpetas similares

Las imagenes de contenido viven en WordPress, normalmente bajo `wp-content/uploads`, y Astro las consume por REST durante el build.

## 5. Deploy del frontend en Render Static Site

### Paso 1. Crear el servicio

Tienes dos caminos:

- usar el dashboard manualmente
- usar el blueprint del repo en [render.yaml](../render.yaml)

1. Entra a [Render](https://render.com).
2. Haz clic en `New`.
3. Elige `Blueprint` si vas a importar `render.yaml`, o `Static Site` si lo haras manual.
4. Conecta el repositorio.
5. Selecciona este proyecto.

### Paso 2. Configuracion recomendada

Usa:

- Build Command:

```sh
npm install && npm run build
```

- Publish Directory:

```txt
dist
```

- Branch:
  - `main` o la rama que uses para produccion

### Paso 3. Variables de entorno

1. Ve a `Environment`.
2. Carga todas las variables anteriores.
3. Guarda.

### Paso 4. Primer deploy

1. Crea el servicio.
2. Espera a que el build termine.
3. Abre la URL temporal `onrender.com`.

## 6. Rebuild automatico cuando el cliente cambia WordPress

Este es el punto clave.

La web es estatica. Por tanto, para reflejar cambios de WordPress necesitas:

1. un deploy hook del hosting
2. un disparador en WordPress cuando cambia contenido relevante

### 6.1. Crear el deploy hook en Render

1. Entra al Static Site.
2. Ve a `Settings`.
3. Busca `Deploy Hook`.
4. Copia la URL secreta.

Esa URL sera algo parecido a:

```txt
https://api.render.com/deploy/srv-xxxxxxxx?key=xxxxxxxx
```

No la publiques ni la subas al repo.

### 6.2. Conectar WordPress al deploy hook

Tienes dos opciones razonables:

#### Opcion A. Plugin de automatizacion o webhooks

Usa un plugin que permita enviar `POST` al guardar una entrada o pagina.

Requisitos:

- que permita filtrar por tipo de contenido
- que permita excluir autosaves y revisiones
- que permita apuntar a la URL del deploy hook

#### Opcion B. MU plugin o snippet propio

Deje un snippet base aqui:

- [docs/wordpress-render-deploy-hook.php](./wordpress-render-deploy-hook.php)

Recomendacion:

- ponerlo como MU plugin
- guardar la URL del hook en `wp-config.php`
- no meter la URL secreta dentro del repo

### 6.3. Donde poner la URL secreta en WordPress

En `wp-config.php` del WordPress:

```php
define('GTD_RENDER_DEPLOY_HOOK_URL', 'https://api.render.com/deploy/srv-xxxx?key=xxxx');
```

No metas esa URL hardcodeada dentro del tema si puedes evitarlo.

Ejemplo listo para copiar:

- [docs/wp-config.render-hook.example.php](./wp-config.render-hook.example.php)

### 6.4. Que cambios deben disparar rebuild

Dispara rebuild cuando cambie:

- cualquier `contenido_audiovisual`
- cualquiera de estas paginas:
  - `sobre-nosotros`
  - `contacto`
  - `privacidad`
  - `terminos`
  - `home-overview`
  - `home-featured`
  - `home-recent`

Tambien debe dispararse si una entrada publicada pasa a borrador, se despublica, se manda a papelera o se elimina.

Nota sobre imagenes:

- Cambiar la `Imagen destacada` de una entrada o pagina monitoreada dispara rebuild porque se guarda esa entrada o pagina.
- Cambiar solo un archivo en `Medios` puede no disparar rebuild con el snippet actual.
- Si el cliente reemplaza una imagen desde la biblioteca de `Medios`, debe actualizar tambien la entrada o pagina que la usa.
- Si se necesita soporte para rebuild por edicion de attachments, agregalo deliberadamente al hook y valida que no dispare builds excesivos.

No hace falta dispararlo por:

- revisiones
- autosaves
- borradores no publicados
- cambios de otros tipos de contenido no usados por esta web

### 6.5. Tiempo esperado de actualizacion

El flujo real sera:

1. El cliente publica o actualiza en WordPress.
2. WordPress llama el deploy hook.
3. Render ejecuta un nuevo build.
4. El cambio aparece en la web al terminar el deploy.

Es normal que tarde algunos minutos. No es instantaneo.

## 7. Verificacion despues del deploy

Despues del primer deploy, revisa:

1. `/`
2. `/galeria`
3. `/sobre-nosotros`
4. `/contacto`
5. `/privacidad`
6. `/terminos`
7. un detalle real, por ejemplo `/contenido/cadetes`
8. `404`

Tambien valida:

- que no haya imagenes rotas
- que los slugs especiales no aparezcan en galeria
- que hero y presentacion sigan usando sus slots reservados
- que las imagenes visibles del home salgan desde WordPress, no desde archivos agregados al frontend
- que WhatsApp y redes salgan desde la pagina `contacto`

## 8. Prueba real del rebuild automatico

Haz esta prueba completa:

1. Abre la web publicada.
2. Elige una pagina visible en home o galeria.
3. En WordPress cambia un texto corto de esa entrada.
4. Guarda y publica.
5. Confirma que WordPress haya ejecutado el hook.
6. Espera a que Render termine el deploy.
7. Recarga la web publicada.
8. Verifica que el cambio aparezca.

Si quieres probar el hook sin tocar WordPress, puedes dispararlo manualmente con:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\test-render-deploy-hook.ps1 -DeployHookUrl "https://api.render.com/deploy/srv-xxxx?key=xxxx"
```

O usando variable de entorno:

```powershell
$env:RENDER_DEPLOY_HOOK_URL="https://api.render.com/deploy/srv-xxxx?key=xxxx"
powershell -ExecutionPolicy Bypass -File .\scripts\test-render-deploy-hook.ps1
```

Si no aparece:

1. revisa logs del build
2. revisa que `WP_API_URL` sea correcto
3. revisa que el hook se haya disparado
4. revisa que el contenido editado sea uno de los tipos monitoreados

## 9. Dominio real

Escenario recomendado:

- Frontend: `www.tudominio.com`
- WordPress: `cms.tudominio.com`

### Paso 1. Agregar dominio en Render

1. Entra al Static Site.
2. Ve a `Settings`.
3. Abre `Custom Domains`.
4. Agrega:
   - `www.tudominio.com`
   - opcionalmente `tudominio.com`

### Paso 2. Crear DNS

Render te dira los registros exactos. Configuralos en tu proveedor DNS:

- Cloudflare
- Namecheap
- GoDaddy
- Hostinger
- otro

### Paso 3. Esperar propagacion

Espera a que el dominio resuelva correctamente.

### Paso 4. Confirmar SSL

Valida:

- que abra por `https`
- que no haya advertencias de certificado
- que `PUBLIC_SITE_URL` coincida con la URL final

## 10. Si usas Cloudflare

Si la validacion inicial falla:

1. deja temporalmente el registro en `DNS only`
2. espera a que Render valide el dominio
3. luego decides si activas proxy

## 11. Cuando necesitas redeploy

Necesitas redeploy cuando cambias:

- codigo Astro
- estilos
- componentes
- layout
- variables de entorno
- configuracion del build

Tambien necesitas deploy por contenido WordPress, pero ese deploy debe ser automatico via hook.

## 12. Checklist tecnico antes de entregar

1. `npm run build` pasa localmente
2. el Static Site termina deploy sin errores
3. `WP_API_URL` apunta al WordPress real
4. el deploy hook responde
5. WordPress dispara rebuild al publicar
6. no hay contenido demo visible
7. hero correcto
8. presentacion correcta
9. destacados correctos
10. recientes correctos
11. galeria correcta
12. paginas editoriales correctas
13. detalle de contenido correcto
14. dominio y SSL correctos
15. no hay imagenes de contenido del cliente versionadas en el repo

## 13. Problemas comunes

### Problema: el frontend despliega pero sale vacio

Revisa:

- `WP_API_URL`
- acceso del entorno de build a WordPress
- endpoints REST
- firewall o plugin de seguridad

### Problema: el cliente publica y no cambia la web

Revisa:

- si el hook realmente se disparo
- si el deploy arranco en Render
- si el build paso
- si el contenido modificado era relevante para esta web

### Problema: WordPress dispara demasiados deploys

Revisa:

- autosaves
- revisiones
- duplicidad de hooks
- ausencia de throttling

El snippet base ya incluye protecciones para eso.

### Problema: el detalle `/contenido/...` da 404

Revisa:

- que la entrada este publicada
- que el slug exista en WordPress
- que el ultimo build haya corrido despues de crearla

En static esto es normal: una URL nueva no existe hasta el siguiente rebuild.

## 14. Responsabilidades

### Cliente

Maneja:

- contenido
- textos
- imagenes
- videos
- destacados
- paginas editoriales

### Developer

Maneja:

- codigo
- deploy
- rebuild hook
- dominio
- DNS
- SSL
- incidencias tecnicas
