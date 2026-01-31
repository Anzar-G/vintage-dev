'use client';

import { useMemo, useState, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  X,
  ExternalLink,
  Github,
  ChevronLeft,
  ChevronRight,
  } from 'lucide-react';
import { projects, projectCategories } from '@/data/projects';
import { Project } from '@/types';
import { cn } from '@/lib/utils';

const BLUR_DATA =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzAwIiBoZWlnaHQ9IjQ3NSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4=';

function ProjectCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800/50">
      <div className="aspect-video animate-pulse bg-slate-200 dark:bg-slate-700" />
      <div className="space-y-3 p-6">
        <div className="h-5 w-3/4 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
        <div className="h-4 w-full animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
        <div className="flex gap-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-6 w-16 animate-pulse rounded-full bg-slate-200 dark:bg-slate-700"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function ProjectCard({
  project,
  onClick,
}: {
  project: Project;
  onClick: () => void;
}) {
  const imgSrc =
    project.thumbnail ||
    project.image ||
    project.images?.[0] ||
    'https://placehold.co/700x475/7c3aed/ffffff?text=Project';
  const tech = project.tech_stack || project.tech || [];

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="group cursor-pointer overflow-hidden rounded-xl border border-slate-200 bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-strong dark:border-slate-700 dark:bg-slate-800/50 dark:hover:shadow-strong"
      onClick={onClick}
    >
      <div className="relative aspect-video overflow-hidden bg-slate-100 dark:bg-slate-700">
        <Image
          src={imgSrc}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          placeholder="blur"
          blurDataURL={BLUR_DATA}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2 text-white opacity-0 transition-opacity group-hover:opacity-100">
          <span className="text-sm font-medium">Lihat detail</span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="font-display text-lg font-semibold text-slate-900 dark:text-slate-100">
          {project.title}
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-slate-600 dark:text-slate-400">
          {project.description}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {tech.slice(0, 4).map((t) => (
            <span
              key={t}
              className="rounded-full bg-primary-100 px-3 py-1 text-xs font-medium text-primary-700 dark:bg-primary-900/50 dark:text-primary-300"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const [imgIndex, setImgIndex] = useState(0);
  const images = project.images?.length
    ? project.images
    : project.image
      ? [project.image]
      : [project.thumbnail || project.image || 'https://placehold.co/700x475/7c3aed/ffffff?text=Project'];
  const tech = project.tech_stack || project.tech || [];

  const goPrev = () => setImgIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  const goNext = () => setImgIndex((i) => (i === images.length - 1 ? 0 : i + 1));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" aria-hidden />
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.95 }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full bg-white/90 p-2 text-slate-700 shadow-lg transition hover:bg-white dark:bg-slate-800 dark:text-slate-200"
          aria-label="Tutup"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="relative aspect-video bg-slate-100 dark:bg-slate-800">
          <Image
            src={images[imgIndex] || images[0]}
            alt={`${project.title} screenshot ${imgIndex + 1}`}
            fill
            className="object-contain"
            sizes="(max-width: 896px) 100vw, 896px"
          />
          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  goPrev();
                }}
                className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
                aria-label="Gambar sebelumnya"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  goNext();
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
                aria-label="Gambar berikutnya"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
              <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1">
                {images.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setImgIndex(i);
                    }}
                    className={cn(
                      'h-2 rounded-full transition-all',
                      i === imgIndex ? 'w-6 bg-white' : 'w-2 bg-white/50 hover:bg-white/70',
                    )}
                    aria-label={`Gambar ${i + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        <div className="p-6 md:p-8">
          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-slate-100 md:text-3xl">
            {project.title}
          </h2>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            {project.full_description || project.description}
          </p>
          {project.challenge_solution && (
            <div className="mt-6">
              <h4 className="font-semibold text-slate-900 dark:text-slate-100">
                Tantangan & Solusi
              </h4>
              <p className="mt-1 text-slate-600 dark:text-slate-400">
                {project.challenge_solution}
              </p>
            </div>
          )}
          {project.testimonial && (
            <blockquote className="mt-6 border-l-4 border-primary-500 pl-4 italic text-slate-600 dark:text-slate-400">
              &ldquo;{project.testimonial}&rdquo;
              {project.client_name && (
                <footer className="mt-2 not-italic text-slate-500">
                  — {project.client_name}
                </footer>
              )}
            </blockquote>
          )}
          <div className="mt-6 flex flex-wrap gap-2">
            {tech.map((t) => (
              <span
                key={t}
                className="rounded-full bg-primary-100 px-3 py-1 text-sm font-medium text-primary-700 dark:bg-primary-900/50 dark:text-primary-300"
              >
                {t}
              </span>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700"
              >
                <ExternalLink className="h-4 w-4" />
                Live Demo
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Portfolio() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [selected, setSelected] = useState<Project | null>(null);
  const [loading] = useState(false);

  const filtered = useMemo(() => {
    let list = projects;
    const cat = category === 'all' ? null : category;
    if (cat) {
      list = list.filter(
        (p) =>
          p.category === cat ||
          (Array.isArray(p.category_list) && p.category_list.includes(cat)),
      );
    }
    const q = search.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          (p.tech && p.tech.some((t) => t.toLowerCase().includes(q))) ||
          (p.tech_stack && p.tech_stack.some((t) => t.toLowerCase().includes(q))),
      );
    }
    return list;
  }, [search, category]);

  const openModal = useCallback((p: Project) => setSelected(p), []);
  const closeModal = useCallback(() => setSelected(null), []);

  return (
    <section id="portfolio" className="scroll-mt-20 py-16 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-10"
      >
        <h2 className="font-display text-section font-bold tracking-tight text-slate-900 dark:text-slate-100">
          Portfolio
        </h2>
        <p className="mt-2 max-w-2xl text-slate-600 dark:text-slate-400">
          Beberapa project yang telah dikerjakan: landing page, web app, e-commerce, dan aplikasi.
        </p>
      </motion.div>

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            placeholder="Cari project (nama, tech...)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-10 pr-4 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
            aria-label="Cari project"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {projectCategories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setCategory(cat.id)}
              className={cn(
                'rounded-full px-4 py-2 text-sm font-medium transition-colors',
                category === cat.id
                  ? 'bg-primary-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600',
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <ProjectCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.length === 0 ? (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full py-12 text-center text-slate-500"
              >
                Tidak ada project yang cocok.
              </motion.p>
            ) : (
              filtered.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onClick={() => openModal(project)}
                />
              ))
            )}
          </AnimatePresence>
        </div>
      )}

      <AnimatePresence>
        {selected && (
          <ProjectModal project={selected} onClose={closeModal} />
        )}
      </AnimatePresence>
    </section>
  );
}
