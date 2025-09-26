import React from 'react';
import { CalculatorDefinition } from '../data/calculators';
import { PrefetchLink } from './PrefetchLink';

export const CalculatorCard: React.FC<{ calculator: CalculatorDefinition }> = ({ calculator }) => {
  return (
    <article className="card flex flex-col justify-between gap-4">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          {calculator.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-700 dark:bg-primary-900/40 dark:text-primary-200">
              {tag}
            </span>
          ))}
        </div>
        <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{calculator.name}</h3>
        <p className="text-sm text-slate-600 dark:text-slate-300">{calculator.description}</p>
      </div>
      <PrefetchLink
        to={`/calculator/${calculator.slug}`}
        className="btn-primary w-full justify-center"
        prefetch={() => import('../pages/CalculatorDetail')}
      >
        Open calculator
      </PrefetchLink>
    </article>
  );
};
