import React, { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z, ZodType } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { findCalculatorBySlug, calculatorRegistry } from '../data/calculators';
import { SEO } from '../components/SEO';
import { FAQAccordion } from '../components/FAQAccordion';
import { AdSlot } from '../components/AdSlot';
import { CalculatorCard } from '../components/CalculatorCard';

const Component: React.FC = () => {
  const { slug } = useParams();
  const calculator = slug ? findCalculatorBySlug(slug) : undefined;

  const schema = useMemo(() => {
    if (!calculator) return z.object({});
    const shape: Record<string, z.ZodTypeAny> = {};
    calculator.inputs.forEach((field) => {
      if (field.type === 'number') {
        let rule = z.coerce.number({ invalid_type_error: `${field.label} is required` });
        if (typeof field.min === 'number') {
          rule = rule.min(field.min, `${field.label} must be at least ${field.min}`);
        }
        if (typeof field.max === 'number') {
          rule = rule.max(field.max, `${field.label} must be at most ${field.max}`);
        }
        shape[field.name] = rule;
      } else {
        shape[field.name] = z.string().min(1, `${field.label} is required`);
      }
    });
    return z.object(shape);
  }, [calculator]);

  type FormValues = Record<string, number | string>;

  const form = useForm<FormValues>({
    resolver: zodResolver(schema as ZodType<FormValues>),
    mode: 'onBlur',
  });

  const [submittedResult, setSubmittedResult] = useState<ReturnType<NonNullable<typeof calculator>['compute']> | null>(null);

  if (!calculator) {
    return (
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Calculator not found</h1>
          <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">
            The calculator you were looking for has moved or does not exist.
          </p>
        </div>
      </section>
    );
  }

  const related = calculatorRegistry.filter((item) => item.slug !== calculator.slug && item.tags.some((tag) => calculator.tags.includes(tag))).slice(0, 3);

  const onSubmit = form.handleSubmit((values) => {
    const result = calculator.compute(values);
    setSubmittedResult(result);
  });

  const formatted = submittedResult ? calculator.formatResult(submittedResult) : null;

  return (
    <>
      <SEO
        title={`${calculator.name} calculator`}
        description={calculator.description}
        url={`/calculator/${calculator.slug}`}
        schema={{
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: calculator.name,
          applicationCategory: 'HealthApplication',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
          },
        }}
      />
      <section className="py-16">
        <div className="mx-auto max-w-5xl px-4">
          <div className="mb-10 grid gap-8 lg:grid-cols-[2fr,1fr]">
            <div className="space-y-6">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  {calculator.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-primary-100 px-3 py-1 text-xs font-semibold text-primary-700 dark:bg-primary-900/40 dark:text-primary-200">
                      {tag}
                    </span>
                  ))}
                </div>
                <h1 className="mt-4 text-4xl font-bold text-slate-900 dark:text-white">{calculator.name}</h1>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{calculator.description}</p>
              </div>

              <form onSubmit={onSubmit} className="space-y-6" noValidate>
                <fieldset className="card space-y-4">
                  <legend className="text-lg font-semibold text-slate-900 dark:text-white">Inputs</legend>
                  {calculator.inputs.map((field) => (
                    <div key={field.name} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label htmlFor={field.name} className="text-sm font-medium text-slate-700 dark:text-slate-200">
                          {field.label}
                        </label>
                        {field.helperText && <span className="text-xs text-slate-500 dark:text-slate-400">{field.helperText}</span>}
                      </div>
                      {field.type === 'number' ? (
                        <input
                          id={field.name}
                          type="number"
                          step={field.step}
                          min={field.min}
                          max={field.max}
                          {...form.register(field.name, { valueAsNumber: true })}
                          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:border-slate-700 dark:bg-slate-900"
                        />
                      ) : (
                        <select
                          id={field.name}
                          {...form.register(field.name)}
                          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:border-slate-700 dark:bg-slate-900"
                        >
                          <option value="">Select...</option>
                          {field.options?.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      )}
                      {form.formState.errors[field.name]?.message && (
                        <p className="text-xs text-red-600">{String(form.formState.errors[field.name]?.message)}</p>
                      )}
                    </div>
                  ))}
                  <button type="submit" className="btn-primary">
                    Calculate
                  </button>
                </fieldset>
              </form>

              {formatted && (
                <div className="card space-y-4">
                  <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Results</h2>
                  <p className="text-2xl font-bold text-primary-600 dark:text-primary-300">{formatted.title}</p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {formatted.items.map((item) => (
                      <div key={item.label} className="rounded-xl border border-slate-200 bg-white/70 p-4 text-sm dark:border-slate-800 dark:bg-slate-900/70">
                        <p className="text-xs uppercase tracking-wide text-slate-500">{item.label}</p>
                        <p className="text-lg font-semibold text-slate-900 dark:text-white">{item.value}</p>
                      </div>
                    ))}
                  </div>
                  {formatted.insights && (
                    <ul className="list-disc space-y-2 pl-5 text-sm text-slate-600 dark:text-slate-300">
                      {formatted.insights.map((insight) => (
                        <li key={insight}>{insight}</li>
                      ))}
                    </ul>
                  )}
                </div>
              )}

              <section className="card space-y-4">
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white">How it works</h2>
                <p className="text-sm text-slate-600 dark:text-slate-300">{calculator.explanation}</p>
                <div className="rounded-lg bg-slate-900 px-4 py-3 text-sm font-mono text-primary-200">
                  {calculator.formula}
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white">FAQ</h2>
                <FAQAccordion faq={calculator.faq} />
              </section>
            </div>
            <aside className="space-y-6">
              <AdSlot slotId="3333333333" className="w-full" />
              <div className="card space-y-4">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Related calculators</h2>
                <div className="space-y-4">
                  {related.map((item) => (
                    <CalculatorCard key={item.slug} calculator={item} />
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
};

export { Component };
export default Component;
