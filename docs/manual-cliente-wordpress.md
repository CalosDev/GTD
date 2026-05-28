# Manual del cliente - Gestion de contenido en WordPress

Este manual explica, paso por paso, como manejar el contenido de la web desde WordPress sin tocar el frontend.

## 1. Que puedes cambiar tu mismo

Desde WordPress puedes cambiar:

- Publicaciones de la galeria
- Imagenes y videos del home
- Imagenes destacadas de cada publicacion
- Textos principales del home
- Pagina "Sobre nosotros"
- Pagina "Contacto"
- Pagina "Politica de privacidad"
- Pagina "Terminos y condiciones"

No necesitas entrar al codigo para eso.

Importante:

- los cambios no salen en la web en el mismo segundo
- despues de publicar, la web espera que termine un rebuild automatico
- normalmente eso toma unos minutos

## 2. Que NO debes tocar

No debes cambiar por tu cuenta:

- Dominio
- Hosting
- DNS
- Variables `.env`
- Diseno general del frontend
- Menu principal del frontend Astro
- Logica de botones, filtros y animaciones
- Carpetas internas del frontend, como `public`, `src` o archivos de Astro

Las imagenes de contenido no se suben al frontend. Siempre se suben a WordPress y se asignan como `Imagen destacada`.

Si necesitas cambiar eso, se le pide al developer.

## 3. Antes de empezar

Necesitas:

1. Tu usuario y contrasena de WordPress
2. La URL de acceso al panel, por ejemplo:
   - `https://tuweb.com/wp-admin`
   - o `https://cms.tudominio.com/wp-admin`
3. Saber si vas a:
   - crear una publicacion nueva
   - editar una publicacion existente
   - cambiar una seccion fija del home
   - cambiar una pagina institucional

## 4. Entrar al panel de WordPress

1. Abre tu navegador.
2. Entra a la URL de administracion de WordPress.
3. Escribe tu usuario.
4. Escribe tu contrasena.
5. Haz clic en `Acceder`.

Si no puedes entrar:

1. Revisa que la URL sea correcta.
2. Revisa mayusculas y minusculas de la contrasena.
3. Si olvidaste la contrasena, usa `Has olvidado tu contrasena?`.
4. Si sigue fallando, avisa al developer.

## 5. Como esta organizado el contenido

La web tiene dos tipos principales de contenido:

### A. Publicaciones del tipo `contenido_audiovisual`

Sirven para:

- Galeria
- Publicaciones recientes
- Paginas individuales de contenido
- Carrusel de destacados
- Home hero
- Home presentation

### B. Paginas normales de WordPress

Sirven para:

- Sobre nosotros
- Contacto
- Privacidad
- Terminos
- Textos del home

## 6. Crear una publicacion nueva para la galeria

Usa este flujo cada vez que quieras subir una foto, un video o una publicacion nueva.

### Paso 1. Entrar al tipo de contenido correcto

1. En el menu izquierdo de WordPress, busca `Contenido audiovisual` o el nombre equivalente del tipo de contenido.
2. Haz clic en `Anadir nuevo`.

### Paso 2. Escribir el titulo

1. En el campo de titulo, escribe el nombre de la publicacion.
2. Ejemplos:
   - `Entrenamiento tactico abril`
   - `Marcha institucional 2026`
   - `Promocion de cadetes`

El titulo es lo que sale visible en la web.

### Paso 3. Revisar el slug

1. Debajo del titulo o en la configuracion lateral, revisa el `slug`.
2. El slug es la parte de la URL.
3. Debe ser corto, claro y sin errores.

Ejemplo:

- Titulo: `Marcha institucional 2026`
- Slug sugerido: `marcha-institucional-2026`

No uses:

- slugs larguisimos
- simbolos raros
- slugs repetidos

### Paso 4. Escribir la descripcion

1. En el editor principal, escribe la descripcion de la publicacion.
2. Ese texto se usa como resumen visible en cards, carruseles y detalle.

Escribe:

- que es el contenido
- de que fecha o actividad viene
- cualquier contexto breve util

### Paso 5. Elegir imagen destacada

1. En el panel derecho, busca `Imagen destacada`.
2. Haz clic en `Establecer imagen destacada`.
3. Sube una imagen nueva o elige una ya existente.
4. Confirma la seleccion.

La imagen destacada es obligatoria para que la publicacion se vea bien en la web.

Importante:

- Si quieres cambiar la imagen visible en la web, cambia la `Imagen destacada` de la publicacion.
- No basta con subir una imagen nueva a `Medios` si no la asignas a una publicacion o pagina.
- Despues de elegir la imagen destacada, haz clic en `Actualizar` o `Publicar`.

## 7. Llenar los campos personalizados de la publicacion

La publicacion tiene campos extra que alimentan la web.

### Campo `tipo_contenido`

Debes elegir uno:

- `imagen`
- `video`

Usa `imagen` para:

- fotos
- banners
- imagenes de actividades

Usa `video` para:

- clips
- reels
- videos subidos como archivo o enlace

### Campo `url_video`

Usalo solo si el contenido es video.

Pon aqui:

- una URL directa a un `.mp4`, `.webm` o `.ogg`
- o un enlace externo si ese es el formato que te entregaron

Importante:

- Si el video se usara en el home y quieres autoplay de fondo, la URL debe ser directa a archivo de video.
- Si pones un enlace de YouTube, TikTok o Instagram, la web usara la imagen destacada como visual principal.

### Campo `fecha_evento`

1. Pon la fecha del evento si existe ese campo.
2. Si no la pones, la web puede usar la fecha de publicacion de WordPress.

### Campo `ubicacion`

1. Escribe la ubicacion real del contenido.
2. Ejemplos:
   - `Santo Domingo`
   - `Republica Dominicana`
   - `Base central`

### Campo `destacado`

Este campo es muy importante.

Si lo activas:

- la publicacion puede entrar al carrusel `Contenido destacado` del home

Si no lo activas:

- seguira saliendo en galeria y recientes
- pero no tendra prioridad para el carrusel destacado

## 8. Elegir categoria

1. En la barra lateral, busca `Categorias`.
2. Marca la categoria correcta.

Ejemplos:

- Entrenamientos
- Marchas
- Desfiles
- Promociones
- Actividades

La categoria ayuda a:

- ordenar la galeria
- mostrar filtros
- mostrar contenido relacionado

## 9. Publicar la publicacion

1. Revisa titulo.
2. Revisa slug.
3. Revisa descripcion.
4. Revisa imagen destacada.
5. Revisa categoria.
6. Revisa tipo de contenido.
7. Revisa ubicacion y fecha.
8. Si todo esta bien, haz clic en `Publicar`.

## 10. Editar una publicacion ya existente

1. Ve a `Contenido audiovisual`.
2. Busca la publicacion por titulo.
3. Haz clic en `Editar`.
4. Cambia lo que necesites.
5. Haz clic en `Actualizar`.

## 11. Como cambiar el hero principal del home

El hero principal del home no se cambia desde el codigo. Se cambia desde una publicacion reservada.

### Publicacion reservada

- Slug obligatorio: `home-hero`

### Como encontrarla

1. Ve a `Contenido audiovisual`.
2. Usa el buscador.
3. Busca `home-hero`.
4. Entra a editar esa publicacion.

### Que controla esta publicacion

Controla:

- imagen o video de fondo del hero
- texto grande principal del hero
- descripcion corta del hero
- categoria y ubicacion visibles arriba del hero

### Que debes cambiar dentro

1. `Titulo`: sera el texto principal grande del hero.
2. `Descripcion`: sera el texto corto debajo del titulo.
3. `Imagen destacada`: sera el fondo si es imagen.
4. `tipo_contenido`: `imagen` o `video`.
5. `url_video`: solo si es video.
6. `ubicacion`: se muestra junto al contexto del hero.
7. `categoria`: tambien se usa en la etiqueta superior.

### Reglas importantes

- El slug debe seguir siendo `home-hero`.
- No conviertas esta publicacion en una publicacion normal de galeria.
- No cambies el slug a otro nombre.
- Para cambiar la imagen del hero, reemplaza la `Imagen destacada` de esta publicacion.
- No subas la imagen del hero a Astro ni al frontend.
- Despues de cambiar la imagen, haz clic en `Actualizar`.

## 12. Como cambiar la seccion de presentacion del home

Tambien se controla con una publicacion reservada.

### Publicacion reservada

- Slug obligatorio: `home-presentation`

### Que controla

Controla:

- imagen o video de la seccion presentacion
- titulo principal de esa seccion
- descripcion principal de esa seccion
- categoria visible como etiqueta
- ubicacion visible en el bloque visual

### Que debes editar

1. `Titulo`
2. `Descripcion`
3. `Imagen destacada`
4. `tipo_contenido`
5. `url_video`
6. `ubicacion`
7. `categoria`

### Regla critica

- No cambies el slug `home-presentation`.
- Para cambiar la imagen de esta seccion, reemplaza la `Imagen destacada` de `home-presentation`.
- Despues de cambiar la imagen, haz clic en `Actualizar`.

## 13. Como cambiar los textos fijos del home

Hay tres paginas especiales que controlan textos del home.

### Pagina `home-overview`

Controla la seccion:

- `Lo que cubrimos`

Que se toma de esa pagina:

- `Titulo` = titulo principal de la seccion
- `Extracto` = resumen corto de la seccion
- `Contenido` = cuerpo completo de la seccion, si lo llenas

Si el contenido de la pagina esta lleno, la web mostrara ese contenido en lugar de las tarjetas por defecto.

### Pagina `home-featured`

Controla la seccion:

- `Contenido destacado`

Que se toma:

- `Titulo`
- `Extracto`

### Pagina `home-recent`

Controla la seccion:

- `Ultimas publicaciones`

Que se toma:

- `Titulo`
- `Extracto`

### Como editar estas paginas

1. Ve a `Paginas`.
2. Busca por slug o por titulo.
3. Entra a editar.
4. Cambia titulo, extracto o contenido.
5. Haz clic en `Actualizar`.

## 14. Como cambiar la pagina Sobre nosotros

### Pagina que debes editar

- Slug: `sobre-nosotros`

### Que controla

Controla:

- titulo principal de la pagina
- resumen inicial
- cuerpo editorial completo

### Que debes llenar

1. `Titulo`
2. `Extracto`
3. `Contenido`

Consejo:

- En el contenido puedes usar subtitulos, parrafos, listas y enlaces.

## 15. Como cambiar la pagina Contacto

### Pagina que debes editar

- Slug: `contacto`

### Que controla

Controla:

- titulo principal de la pagina
- resumen inicial
- bloque editorial extra antes de las opciones de contacto
- enlace principal de WhatsApp si lo pones dentro del contenido
- enlaces globales de Facebook, Instagram, YouTube y TikTok si los pones dentro del contenido

### Como funciona ahora

La web detecta automaticamente dentro del contenido de la pagina `contacto`:

- el primer enlace de WhatsApp valido
- el primer enlace de Facebook
- el primer enlace de Instagram
- el primer enlace de YouTube
- el primer enlace de TikTok

Esos enlaces se usan tambien en:

- header
- footer
- boton flotante de WhatsApp
- botones de acciones de contacto

### Que debes editar

1. `Titulo`
2. `Extracto`
3. `Contenido`

### Como poner WhatsApp correctamente

Dentro del contenido de la pagina `contacto`, agrega un enlace que apunte a WhatsApp.

Ejemplos validos:

- `https://wa.me/18095551234`
- `https://wa.me/18095551234?text=Hola`
- `https://api.whatsapp.com/send?phone=18095551234`

Recomendacion:

1. Escribe un texto visible como `Escribenos por WhatsApp`.
2. Seleccionalo.
3. Haz clic en `Insertar enlace`.
4. Pega la URL de WhatsApp.
5. Guarda la pagina.

### Como poner redes sociales correctamente

Dentro del contenido de la pagina `contacto`, agrega enlaces normales a cada red.

Ejemplos:

- `https://facebook.com/tucuenta`
- `https://instagram.com/tucuenta`
- `https://youtube.com/@tucanal`
- `https://tiktok.com/@tucuenta`

No importa si estan en lista, botones o parrafos. La web detecta la URL.

## 16. Como cambiar Privacidad y Terminos

### Paginas

- `privacidad`
- `terminos`

### Que debes editar

1. Entra a `Paginas`.
2. Busca `privacidad` o `terminos`.
3. Edita `Titulo` si hace falta.
4. Edita el `Contenido`.
5. Haz clic en `Actualizar`.

## 17. Como subir imagenes correctamente

Antes de subir una imagen:

1. Revisa que no este borrosa.
2. Revisa que no tenga marcas o textos accidentales si no deben verse.
3. Revisa que tenga buena orientacion.
4. Revisa que pese razonablemente.

Buenas practicas:

- usar imagenes claras
- evitar imagenes extremadamente pequenas
- evitar recortes donde no se vea el sujeto principal

### Como reemplazar una imagen que ya aparece en la web

1. Ve a la publicacion o pagina que controla esa imagen.
2. Entra a editar.
3. Cambia la `Imagen destacada`.
4. Haz clic en `Actualizar`.
5. Espera el rebuild automatico.
6. Revisa la web.

No hagas solo esto:

- subir una imagen nueva en `Medios`
- reemplazar un archivo desde la biblioteca
- borrar una imagen antigua

Eso puede no actualizar la web si no guardas tambien la publicacion o pagina que usa esa imagen.

## 18. Como subir videos correctamente

Antes de usar un video:

1. Confirma si sera:
   - video de publicacion normal
   - video del hero
   - video de presentacion
2. Si va en home con autoplay, pide una URL directa al archivo.
3. Si solo tienes un enlace externo, asegurate de poner imagen destacada buena.

## 19. Como revisar si el cambio salio bien

Despues de publicar o actualizar:

1. Espera unos minutos a que la web se reconstruya.
2. Abre la web publica.
3. Recarga la pagina.
4. Revisa la seccion exacta que cambiaste.
5. Comprueba:
   - que el texto salga bien
   - que la imagen no este rota
   - que la categoria sea correcta
   - que la ubicacion sea correcta
   - que el boton lleve al lugar esperado
   - que el contenido destacado solo muestre lo que marcaste como destacado

## 20. Errores comunes

### Error: el cambio no aparece

Revisa:

1. que hiciste clic en `Actualizar` o `Publicar`
2. que la pagina o publicacion este en estado `Publicado`
3. que el slug no haya cambiado por error
4. que la imagen destacada exista
5. que no estes editando otra entrada parecida
6. que ya hayan pasado unos minutos desde la publicacion
7. que no hayas cambiado solo la biblioteca de `Medios` sin actualizar la publicacion correspondiente

Si despues de esperar sigue sin verse, avisa al developer porque puede haber fallado el rebuild automatico.

### Error: el hero cambio en una publicacion que no era

Probablemente editaste la publicacion con slug:

- `home-hero`

Revisa si realmente querias cambiar el hero.

### Error: la presentacion cambio y no queria

Probablemente editaste la publicacion:

- `home-presentation`

### Error: una publicacion no entra al carrusel destacado

Revisa:

1. que tenga `destacado` activado
2. que tenga imagen destacada
3. que este publicada

### Error: una publicacion del home aparece en la galeria

Eso no deberia pasar. Si pasa, avisa al developer.

## 21. Orden recomendado para trabajar

Si vas a actualizar una campana o una tanda nueva de contenido, hazlo en este orden:

1. Subir imagenes y videos a Medios
2. Crear o editar publicaciones del tipo `contenido_audiovisual`
3. Asignar `Imagen destacada` a cada publicacion
4. Marcar destacados
5. Actualizar `home-hero` si el home principal cambia
6. Actualizar `home-presentation` si esa seccion cambia
7. Actualizar `home-overview`, `home-featured` y `home-recent` si el texto cambia
8. Esperar unos minutos
9. Revisar la web publica

## 22. Checklist final antes de cerrar sesion

Antes de salir de WordPress, confirma:

1. Todas las publicaciones nuevas estan publicadas
2. Los slugs especiales siguen intactos:
   - `home-hero`
   - `home-presentation`
   - `home-overview`
   - `home-featured`
   - `home-recent`
   - `sobre-nosotros`
   - `contacto`
   - `privacidad`
   - `terminos`
3. Las imagenes destacadas correctas estan puestas
4. Los destacados correctos estan marcados
5. La web publica se ve bien

## 23. Cuando debes pedir ayuda al developer

Debes pedir ayuda si quieres:

- cambiar diseno
- cambiar colores
- cambiar menu principal
- cambiar botones globales
- cambiar dominio
- mover el sitio a otro hosting
- conectar nuevas redes o sistemas
- agregar una seccion nueva que no existe
- resolver errores tecnicos de carga

En resumen:

- contenido = tu lo manejas desde WordPress
- estructura tecnica = la maneja el developer
