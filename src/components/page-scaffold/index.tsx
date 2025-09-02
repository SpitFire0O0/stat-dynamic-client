// Простой «сборщик страниц»: принимает схему и отрисовывает секции с виджетами.
import React, { Suspense } from 'react';
import type { WidgetId } from '../../lib/WidgetRegistry';
import { WidgetRegistry } from '../../lib/WidgetRegistry';

// Описание одной секции страницы
export interface SectionSpec {
  id: string;        // уникальный идентификатор секции
  title?: string;    // заголовок секции
  widget: WidgetId;  // идентификатор виджета из реестра
  data?: any;        // данные, пробрасываемые в виджет
}

// Схема страницы: заголовок + набор секций
export interface PageSchema {
  title?: string;
  sections: SectionSpec[];
}

export const PageScaffold: React.FC<{ schema: PageSchema }> = ({ schema }) => {
  return (
    <div className="p-6 space-y-6">
      {schema.title && (
        <h1 className="text-xl font-bold" style={{ color: 'var(--primary-color)' }}>{schema.title}</h1>
      )}
      {schema.sections.map((s) => {
        const Cmp = WidgetRegistry[s.widget];
        if (!Cmp) return null;
        return (
          <section key={s.id} className="space-y-2">
            {s.title && <h2 className="text-lg font-semibold">{s.title}</h2>}
            <Suspense fallback={<div>Загрузка...</div>}>
              <Cmp data={s.data} />
            </Suspense>
          </section>
        );
      })}
    </div>
  );
};
