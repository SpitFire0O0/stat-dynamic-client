import React from 'react';
import { entities, type EntityId } from '../../admin/config/entities';
import { useNavigate } from 'react-router-dom';
import { RoleSwitcher } from '../../components/dev/role-switcher';
import { MockSwitcher } from '../../components/dev/mock-switcher';

export const AdminCrudHome: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold">Админка — CRUD сущности</h1>
        <div className="flex items-center gap-3">
          <MockSwitcher />
          <RoleSwitcher />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(entities).map(([id, cfg]) => (
          <button
            key={id}
            className="p-4 text-left border rounded-md hover:shadow transition"
            onClick={() => navigate(`/admin/crud/${id as EntityId}`)}
          >
            <div className="font-semibold">{cfg.title}</div>
            <div className="text-xs text-gray-500 mt-1">{cfg.basePath}</div>
          </button>
        ))}
      </div>
    </div>
  );
};
