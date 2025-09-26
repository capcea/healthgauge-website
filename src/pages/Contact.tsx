import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLanguage } from '../providers/LanguageProvider';
import { SEO } from '../components/SEO';

const schema = z.object({
  name: z.string().min(2, 'Please enter your full name'),
  email: z.string().email('Enter a valid email'),
  message: z.string().min(10, 'Tell us a bit more about your project'),
});

const Component: React.FC = () => {
  const { dictionary } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema) });

  const onSubmit = handleSubmit((data) => {
    console.info('contact submission', data);
    setSubmitted(true);
    reset();
  });

  return (
    <>
      <SEO title="Contact Health Gauge" description="Reach the Health Gauge team for partnerships, calculator integrations, or editorial opportunities." url="/contact" />
      <section className="py-16">
        <div className="mx-auto max-w-3xl space-y-6 px-4">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white">{dictionary.contact.title}</h1>
          <p className="text-lg text-slate-600 dark:text-slate-300">{dictionary.contact.subtitle}</p>
          <form onSubmit={onSubmit} className="card space-y-5" noValidate>
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                {dictionary.contact.name}
              </label>
              <input
                id="name"
                type="text"
                {...register('name')}
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:border-slate-700 dark:bg-slate-900"
              />
              {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>}
            </div>
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                {dictionary.contact.email}
              </label>
              <input
                id="email"
                type="email"
                {...register('email')}
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:border-slate-700 dark:bg-slate-900"
              />
              {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
            </div>
            <div>
              <label htmlFor="message" className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                {dictionary.contact.message}
              </label>
              <textarea
                id="message"
                rows={5}
                {...register('message')}
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:border-slate-700 dark:bg-slate-900"
              />
              {errors.message && <p className="mt-1 text-xs text-red-600">{errors.message.message}</p>}
            </div>
            <button
              type="submit"
              className="btn-primary"
              disabled={isSubmitting}
            >
              {dictionary.contact.submit}
            </button>
            {submitted && (
              <p className="text-sm font-semibold text-primary-600">{dictionary.contact.success}</p>
            )}
          </form>
        </div>
      </section>
    </>
  );
};

export { Component };
export default Component;
