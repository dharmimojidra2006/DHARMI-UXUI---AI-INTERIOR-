import React from 'react';
import { Maximize2 } from 'lucide-react';

export interface CoverThumbnailCard {
  id: string;
  plate: string;
  label: string;
  subtitle?: string;
  imageUrl?: string;
  isTechnical?: boolean;
  isPortraitAmbient?: boolean;
  svgBadgeType?: string;
  onClick: () => void;
}

export interface CoverMetaItem {
  label: string;
  value: string;
}

interface Props {
  projectNumber: string;
  categoryLabel: string;
  yearOrPeriod?: string;
  universityLabel?: string;
  location: string;
  projectType?: string;
  title: string;
  subtitle: string;
  description: string;
  metaItems?: CoverMetaItem[];
  scopeTags?: string[];
  coverPlate: {
    plate?: string;
    label?: string;
    caption?: string;
    imageUrl: string;
    isPortraitAmbient?: boolean;
    onClick: () => void;
  };
  thumbnailStripTitle?: string;
  thumbnails?: CoverThumbnailCard[];
}

export const CaseStudyCoverHeader: React.FC<Props> = ({
  projectNumber,
  categoryLabel,
  location,
  projectType,
  title,
  subtitle,
  description,
  metaItems,
  coverPlate,
}) => {
  const resolvedProjectType =
    projectType ||
    metaItems?.find((m) =>
      m.label.toLowerCase().includes('typology') ||
      m.label.toLowerCase().includes('type') ||
      m.label.toLowerCase().includes('theme') ||
      m.label.toLowerCase().includes('programme') ||
      m.label.toLowerCase().includes('mechanism')
    )?.value ||
    categoryLabel;

  return (
    <section
      id="cover"
      className="pb-12 mb-12 border-b border-[#D9CBB1] dark:border-[#2A3759]"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* LEFT COLUMN: Clean Essential Project Introduction */}
        <div className="lg:col-span-6 space-y-5">
          {/* Project Number & Category */}
          <div className="flex flex-wrap items-baseline gap-2.5 text-xs font-mono uppercase tracking-[0.16em] text-[#802C43] dark:text-[#C45D77]">
            <span className="text-3xl sm:text-4xl font-serif-architectural font-light leading-none">
              {projectNumber}
            </span>
            <span aria-hidden="true">/</span>
            <span className="font-semibold">{categoryLabel}</span>
          </div>

          {/* Title & Short Subtitle */}
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-[2.65rem] font-serif-architectural font-light text-[#263D78] dark:text-[#EFE6D5] leading-[1.1] tracking-tight text-balance">
              {title}
            </h1>
            <p className="text-sm sm:text-base font-serif-architectural italic text-[#802C43] dark:text-[#C45D77] mt-2 leading-snug">
              {subtitle}
            </p>
          </div>

          {/* Brief 2–3 Line Introduction */}
          <p className="text-sm sm:text-[15px] text-[#1C2D58] dark:text-[#DDD1BC] font-light leading-relaxed max-w-xl line-clamp-3">
            {description}
          </p>

          {/* Essential Info: Location & Project Type */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#D9CBB1]/80 dark:border-[#2A3759]/80 text-xs font-mono max-w-xl">
            <div>
              <span className="text-[10px] uppercase tracking-[0.16em] text-[#5C6D9B] dark:text-[#988C75] block mb-1">
                Location
              </span>
              <span className="text-[#263D78] dark:text-[#EFE6D5] font-medium leading-snug block">
                {location}
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-[0.16em] text-[#5C6D9B] dark:text-[#988C75] block mb-1">
                Project Type
              </span>
              <span className="text-[#263D78] dark:text-[#EFE6D5] font-medium leading-snug block">
                {resolvedProjectType}
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Single Clean Attractive Cover Image */}
        <div className="lg:col-span-6">
          <div
            onClick={coverPlate.onClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                coverPlate.onClick();
              }
            }}
            data-cursor="zoom"
            aria-label={`Enlarge ${title} cover image`}
            className="relative bg-[#F3EBDD] dark:bg-[#18223A] border border-[#D9CBB1] dark:border-[#2A3759] hover:border-[#802C43] dark:hover:border-[#C45D77] p-2.5 sm:p-3 transition-colors duration-300 cursor-pointer group"
          >
            <div className="relative aspect-[16/10] w-full bg-[#E3D7BF]/80 dark:bg-[#141C30] overflow-hidden border border-[#D9CBB1]/70 dark:border-[#2A3759] flex items-center justify-center">
              {coverPlate.isPortraitAmbient && (
                <img
                  src={coverPlate.imageUrl}
                  alt=""
                  aria-hidden="true"
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover object-center scale-110 blur-xl opacity-45 dark:opacity-35 pointer-events-none select-none"
                />
              )}
              <img
                src={coverPlate.imageUrl}
                alt={`${title} cover visual`}
                referrerPolicy="no-referrer"
                className={
                  coverPlate.isPortraitAmbient
                    ? 'relative z-10 h-full w-auto max-w-full object-contain transition-transform duration-500 ease-out group-hover:scale-[1.02]'
                    : 'relative z-10 w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.03]'
                }
              />

              {/* Subtle Hover Enlarge Indicator */}
              <div className="absolute bottom-3 right-3 z-20 inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#F3EBDD]/90 dark:bg-[#18223A]/90 border border-[#D9CBB1] dark:border-[#3A4B75] text-[10px] font-mono uppercase tracking-wider text-[#263D78] dark:text-[#EFE6D5] opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                <span>Expand</span>
                <Maximize2 className="w-3 h-3 text-[#802C43] dark:text-[#C45D77]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
