import { useMemo, useState } from "react";
import { formatContentDate } from "../lib/dates";

export default function GalleryFilters({ contents }) {
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid");

  const rawFilters = [
    "Todos",
    "Fotos",
    "Videos",
    ...Array.from(new Set(contents.map((item) => item.category))),
  ];

  const getFilterCount = (filter) => {
    if (filter === "Todos") {
      return contents.length;
    }

    if (filter === "Fotos") {
      return contents.filter((item) => item.type === "imagen").length;
    }

    if (filter === "Videos") {
      return contents.filter((item) => item.type === "video").length;
    }

    return contents.filter((item) => item.category === filter).length;
  };

  const filters = rawFilters.filter((filter) => {
    return filter === "Todos" || getFilterCount(filter) > 0;
  });

  const filteredContents = useMemo(() => {
    let result = contents;

    if (activeFilter === "Fotos") {
      result = result.filter((item) => item.type === "imagen");
    } else if (activeFilter === "Videos") {
      result = result.filter((item) => item.type === "video");
    } else if (activeFilter !== "Todos") {
      result = result.filter((item) => item.category === activeFilter);
    }

    if (searchTerm.trim()) {
      const query = searchTerm.toLowerCase();

      result = result.filter((item) => {
        return (
          item.title.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query) ||
          item.location.toLowerCase().includes(query)
        );
      });
    }

    return result;
  }, [activeFilter, searchTerm, contents]);

  return (
    <div>
      <div className="rounded-lg border border-white/[0.08] bg-[#101315] p-4">
        <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-zinc-600">
              Explorador
            </p>
            <p className="mt-1 text-sm text-zinc-500">
              <span className="font-bold text-white">{filteredContents.length}</span> de{" "}
              <span className="font-bold text-white">{contents.length}</span> contenidos
            </p>
          </div>

          <div className="flex w-full gap-2 md:w-auto">
            <button
              type="button"
              aria-pressed={viewMode === "grid"}
              onClick={() => setViewMode("grid")}
              className={`min-h-10 flex-1 rounded-lg px-4 text-sm font-bold transition md:flex-none ${
                viewMode === "grid"
                  ? "bg-[#00e0c7] text-black"
                  : "border border-white/[0.08] bg-white/[0.04] text-zinc-400 hover:text-white"
              }`}
            >
              Grid
            </button>

            <button
              type="button"
              aria-pressed={viewMode === "list"}
              onClick={() => setViewMode("list")}
              className={`min-h-10 flex-1 rounded-lg px-4 text-sm font-bold transition md:flex-none ${
                viewMode === "list"
                  ? "bg-[#00e0c7] text-black"
                  : "border border-white/[0.08] bg-white/[0.04] text-zinc-400 hover:text-white"
              }`}
            >
              Lista
            </button>
          </div>
        </div>

        <div className="mt-4 grid gap-3 lg:grid-cols-[minmax(280px,420px)_1fr] lg:items-start">
          <input
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Buscar por título, categoría o ubicación..."
            className="min-h-12 w-full rounded-lg border border-white/[0.08] bg-black/40 px-4 text-sm font-medium text-white outline-none transition placeholder:text-zinc-600 focus:border-[#00e0c7]/60"
          />

          <div className="flex flex-wrap gap-2 lg:justify-end">
            {filters.map((filter) => {
              const isActive = activeFilter === filter;
              const count = getFilterCount(filter);

              return (
                <button
                  key={filter}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActiveFilter(filter)}
                  className={`min-h-10 rounded-lg px-3 text-xs font-black uppercase tracking-[0.12em] transition ${
                    isActive
                      ? "bg-[#00e0c7] text-black"
                      : "border border-white/[0.08] bg-white/[0.035] text-zinc-500 hover:border-[#00e0c7]/40 hover:text-white"
                  }`}
                >
                  <span>{filter}</span>
                  <span className="ml-2 opacity-60">{count}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between text-sm text-zinc-500">
        <p>
          Filtro activo: <span className="font-bold text-[#00e0c7]">{activeFilter}</span>
        </p>

        {searchTerm.trim() && (
          <button
            type="button"
            onClick={() => setSearchTerm("")}
            className="rounded-lg border border-white/[0.08] px-3 py-2 text-xs font-bold text-zinc-400 transition hover:text-white"
          >
            Limpiar búsqueda
          </button>
        )}
      </div>

      {viewMode === "grid" ? (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredContents.map((item) => (
            <GalleryGridCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="mt-8 grid gap-4">
          {filteredContents.map((item) => (
            <GalleryListCard key={item.id} item={item} />
          ))}
        </div>
      )}

      {filteredContents.length === 0 && (
        <div className="mt-10 rounded-lg border border-white/[0.08] bg-[#101315] p-10 text-center">
          <h3 className="text-2xl font-black text-white">
            Aún no hay contenido para mostrar
          </h3>

          <p className="mt-3 text-zinc-500">
            Prueba con otro filtro o ajusta la búsqueda.
          </p>
        </div>
      )}
    </div>
  );
}

function GalleryGridCard({ item }) {
  return (
    <article className="group overflow-hidden rounded-lg border border-white/[0.08] bg-[#101315] transition duration-300 hover:-translate-y-1 hover:border-[#00e0c7]/40 hover:shadow-2xl hover:shadow-[#00e0c7]/5">
      <a
        href={`/contenido/${item.slug}`}
        className="block rounded-lg"
        aria-label={`Ver contenido: ${item.title}`}
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-zinc-950">
          <img
            src={item.image}
            alt={item.title}
            loading="lazy"
            decoding="async"
            width="600"
            height="450"
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>

          <div className="absolute left-3 top-3 flex flex-wrap gap-2">
            <span className="rounded-md border border-white/10 bg-black/70 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-white backdrop-blur">
              {item.type === "video" ? "Video" : "Foto"}
            </span>

            {item.featured && (
              <span className="rounded-md bg-[#00e0c7] px-3 py-1 text-[11px] font-black uppercase tracking-[0.14em] text-black">
                Destacado
              </span>
            )}
          </div>

          <div className="absolute bottom-4 left-4 right-4">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#00e0c7]">
              {item.category}
            </p>

            <h3 className="mt-2 line-clamp-2 text-xl font-black leading-tight text-white">
              {item.title}
            </h3>
          </div>
        </div>

        <div className="p-5">
          <p className="line-clamp-2 min-h-12 text-sm leading-6 text-zinc-400">
            {item.description}
          </p>

          <div className="mt-5 flex items-center justify-between gap-4 border-t border-white/[0.08] pt-4 text-xs text-zinc-500">
            <span className="line-clamp-1">{item.location}</span>
            <span className="shrink-0">{formatContentDate(item.date)}</span>
          </div>
        </div>
      </a>
    </article>
  );
}

function GalleryListCard({ item }) {
  return (
    <article className="group overflow-hidden rounded-lg border border-white/[0.08] bg-[#101315] transition duration-300 hover:border-[#00e0c7]/40">
      <a
        href={`/contenido/${item.slug}`}
        className="grid gap-5 rounded-lg p-4 md:grid-cols-[220px_1fr] md:items-center"
        aria-label={`Ver contenido: ${item.title}`}
      >
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-zinc-950">
          <img
            src={item.image}
            alt={item.title}
            loading="lazy"
            decoding="async"
            width="500"
            height="360"
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />

          <div className="absolute left-3 top-3 rounded-md bg-black/70 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-white backdrop-blur">
            {item.type === "video" ? "Video" : "Foto"}
          </div>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#00e0c7]">
            {item.category}
          </p>

          <h3 className="mt-3 text-2xl font-black leading-tight text-white">
            {item.title}
          </h3>

          <p className="mt-3 line-clamp-2 text-sm leading-6 text-zinc-500">
            {item.description}
          </p>

          <div className="mt-5 flex flex-wrap gap-3 text-xs text-zinc-600">
            <span>{item.location}</span>
            <span>|</span>
            <span>{formatContentDate(item.date)}</span>
            {item.featured && (
              <>
                <span>|</span>
                <span className="font-bold text-[#00e0c7]">Destacado</span>
              </>
            )}
          </div>
        </div>
      </a>
    </article>
  );
}
