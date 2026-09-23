// ui-strings.ts
export const UI_STRINGS = {
  es: {
    common: {
      searchPlaceholder: '¿Qué estás buscando, Coco?',
      addButton: 'Agregar al carrito',
      detailButton: 'Ver detalle',
    },
    products: {
      title: 'Nuestro Kiosko Digital',
      empty: 'No encontramos productos que coincidan.',
    }
  },
  en: {
    common: {
      searchPlaceholder: 'What are you looking for?',
      addButton: 'Add to cart',
      detailButton: 'View details',
    }
    // ...
  }
} as const; // El "as const" lo hace inmutable, como un @Value final