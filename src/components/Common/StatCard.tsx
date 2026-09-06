import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: { value: number; label: string };
  color?: string;
  className?: string;
}

export default function StatCard({ label, value, icon, trend, color = 'brand', className = '' }: StatCardProps) {
  const colorMap: Record<string, { bg: string; text: string; iconBg: string }> = {
    brand: { bg: 'bg-brand-500/10', text: 'text-brand-500', iconBg: 'bg-brand-500/20' },
    teal: { bg: 'bg-teal-500/10', text: 'text-teal-500', iconBg: 'bg-teal-500/20' },
    danger: { bg: 'bg-danger/10', text: 'text-danger', iconBg: 'bg-danger/20' },
    warning: { bg: 'bg-warning/10', text: 'text-warning', iconBg: 'bg-warning/20' },
    success: { bg: 'bg-success/10', text: 'text-success', iconBg: 'bg-success/20' },
    purple: { bg: 'bg-purple-500/10', text: 'text-purple-500', iconBg: 'bg-purple-500/20' },
    info: { bg: 'bg-info/10', text: 'text-info', iconBg: 'bg-info/20' },
  };

  const colors = colorMap[color] || colorMap.brand;

  return (
    <div className={`card-static p-5 ${className}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="stat-label">{label}</p>
          <p className="stat-value mt-1">{value}</p>
          {trend && (
            <div className="flex items-center gap-1 mt-2">
              {trend.value > 0 ? (
                <TrendingUp size={14} className="text-success" />
              ) : trend.value < 0 ? (
                <TrendingDown size={14} className="text-danger" />
              ) : (
                <Minus size={14} className="text-[var(--text-muted)]" />
              )}
              <span className={`text-xs font-medium ${
                trend.value > 0 ? 'text-success' : trend.value < 0 ? 'text-danger' : 'text-[var(--text-muted)]'
              }`}>
                {trend.value > 0 ? '+' : ''}{trend.value}% {trend.label}
              </span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-xl ${colors.iconBg} ${colors.text}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

export function MiniStatCard({ label, value, icon, color = 'brand' }: { label: string; value: string | number; icon: React.ReactNode; color?: string }) {
  const colorMap: Record<string, string> = {
    brand: 'text-brand-500',
    teal: 'text-teal-500',
    danger: 'text-danger',
    warning: 'text-warning',
    success: 'text-success',
    purple: 'text-purple-500',
  };

  return (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-surface-50 dark:bg-surface-800/50">
      <span className={colorMap[color] || 'text-brand-500'}>{icon}</span>
      <div>
        <p className="text-lg font-bold text-[var(--text-primary)]">{value}</p>
        <p className="text-xs text-[var(--text-muted)]">{label}</p>
      </div>
    </div>
  );
}
