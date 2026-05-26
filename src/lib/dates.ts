export function formatContentDate(value?: string) {
  if (!value) {
    return "";
  }

  const isoDateOnlyMatch = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);

  if (isoDateOnlyMatch) {
    const [, year, month, day] = isoDateOnlyMatch;
    const dateOnly = new Date(Number(year), Number(month) - 1, Number(day));

    if (!Number.isNaN(dateOnly.getTime())) {
      return dateOnly.toLocaleDateString("es-DO");
    }
  }

  const directDate = new Date(value);

  if (!Number.isNaN(directDate.getTime())) {
    return directDate.toLocaleDateString("es-DO");
  }

  const compactMatch = value.match(/^(\d{4})(\d{2})(\d{2})$/);

  if (compactMatch) {
    const [, year, month, day] = compactMatch;
    const compactDate = new Date(Number(year), Number(month) - 1, Number(day));

    if (!Number.isNaN(compactDate.getTime())) {
      return compactDate.toLocaleDateString("es-DO");
    }
  }

  const slashMatch = value.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);

  if (slashMatch) {
    const [, day, month, year] = slashMatch;
    const slashDate = new Date(Number(year), Number(month) - 1, Number(day));

    if (!Number.isNaN(slashDate.getTime())) {
      return slashDate.toLocaleDateString("es-DO");
    }
  }

  return value;
}
