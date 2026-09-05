export const CATEGORY_LABELS = {
  Food: 'Еда',
  Transport: 'Транспорт',
  Shopping: 'Покупки',
  Utilities: 'Коммунальные услуги',
  Health: 'Здоровье',
  Entertainment: 'Развлечения',
  Other: 'Другое',
};

export const getCategoryLabel = (category) => CATEGORY_LABELS[category] ?? category;
