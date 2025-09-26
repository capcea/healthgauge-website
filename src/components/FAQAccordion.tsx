import React, { useState } from 'react';
import { FAQItem } from '../data/calculators';

export const FAQAccordion: React.FC<{ faq: FAQItem[] }> = ({ faq }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  return (
    <div className="space-y-3">
      {faq.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={item.question} className="rounded-2xl border border-slate-200 bg-white/70 p-4 dark:border-slate-800 dark:bg-slate-900/70">
            <button
              type="button"
              className="flex w-full items-center justify-between text-left text-base font-semibold text-slate-900 dark:text-white"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
            >
              {item.question}
              <span aria-hidden>{isOpen ? '−' : '+'}</span>
            </button>
            {isOpen && <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{item.answer}</p>}
          </div>
        );
      })}
    </div>
  );
};
