// Глобальные настройки приложения (не зависят от ролей).
// Здесь сконцентрированы пороги статусов и прочие универсальные параметры.

export const GlobalConfig = {
  thresholds: {
    // Порог по невыполненным ДЗ: >=2 — жёлтый, >=3 — красный
    homeworkMissedYellow: 2,
    homeworkMissedRed: 3,
    // Порог по пропускам занятий: >=2 — жёлтый, >=3 — красный
    absenceYellow: 2,
    absenceRed: 3,
  },
} as const;

