// Страница «Кружки», собирается из декларативной схемы
import React from 'react';
import { PageScaffold } from '../../components/page-scaffold';
import { clubsPageSchema } from '../../config/pages/clubs';

export const ClubsPage: React.FC = () => {
  return <PageScaffold schema={clubsPageSchema} />;
};
