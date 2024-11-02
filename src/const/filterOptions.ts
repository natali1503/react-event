import { IFilterOption } from '../types/IFilterOption';

export const filterOptions: IFilterOption[] = [
  {
    title: 'Кому мы помогаем',
    options: [
      { label: 'Пенсионеры', prop: 'person' },
      { label: 'Дома престарелых', prop: 'organization' },
    ],
  },
  {
    title: 'Чем мы помогаем',
    options: [
      { label: 'Вещи', prop: 'material' },
      { label: 'Финансирование', prop: 'finance' },
    ],
  },
  {
    accordion: {
      accordionTitle: 'Волонтерство',
      items: [
        {
          title: 'Специализация',
          options: [
            { label: 'Квалифицированная', prop: 'professional' },
            { label: 'Не требует профессии', prop: 'common' },
          ],
        },
        {
          title: 'Формат',
          options: [
            { label: 'Онлайн', prop: 'true' },
            { label: 'Офлайн', prop: 'false' },
          ],
        },
        {
          title: 'Необходимо волонтеров',
          options: [
            { label: 'Группа', prop: 'group' },
            { label: 'Один', prop: 'single' },
          ],
        },
      ],
    },
  },
];
