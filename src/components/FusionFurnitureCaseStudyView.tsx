import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { ProjectCaseStudy, FusionFurnitureDrawingItem } from '../types';
import { Maximize2 } from 'lucide-react';
import { CaseStudyCoverHeader } from './CaseStudyCoverHeader';
import { DrawingLightbox } from './DrawingLightbox';

interface Props {
  project: ProjectCaseStudy;
  prevProject: ProjectCaseStudy;
  nextProject: ProjectCaseStudy;
  onSelectProject: (p: ProjectCaseStudy) => void;
}

export const FusionFurnitureCaseStudyView: React.FC<Props> = ({
  project,
  prevProject,
  nextProject,
  onSelectProject,
}) => {
  const study = project.fusionFurnitureCaseStudy;

  // Interactive filter states
  const [regionFilter, setRegionFilter] = useState<'all' | 'Punjab' | 'Goa'>('all');
  const [joineryFilter, setJoineryFilter] = useState<
    'all' | 'structural' | 'roof' | 'seating' | 'suspension'
  >('all');
  const [drawingGalleryTab, setDrawingGalleryTab] = useState<
    'all' | 'working' | 'joinery' | 'sketches'
  >('all');
  const [transformationMode, setTransformationMode] = useState<'swing' | 'seating'>('swing');

  // Lightbox state across all drawings, sketches, joinery plates & renders
  const [lightboxDrawingId, setLightboxDrawingId] = useState<string | null>(null);

  const technicalGalleryItems: FusionFurnitureDrawingItem[] = useMemo(() => {
    if (!study) return [];
    const joineryItems: FusionFurnitureDrawingItem[] = [];
    study.joineryDetails.forEach((j) => {
      joineryItems.push({
        id: j.id,
        plate: j.plate,
        title: j.title,
        subtitle: j.summary,
        imageUrl: j.imageUrl,
        category: 'joinery',
        annotations: j.whyItWorks,
      });
      if (j.secondaryImageUrl) {
        joineryItems.push({
          id: `${j.id}-assembly`,
          plate: `${j.plate} · Detail`,
          title: `${j.title} — Assembly View`,
          subtitle: `${j.categoryLabel}: structural assembly diagram`,
          imageUrl: j.secondaryImageUrl,
          category: 'joinery',
        });
      }
      if (j.referencePhotoUrl) {
        joineryItems.push({
          id: `${j.id}-ref`,
          plate: `${j.plate} · Ref`,
          title: `${j.title} — Reference Detail`,
          subtitle: `Extracted sheet reference illustrating ${j.title.toLowerCase()}`,
          imageUrl: j.referencePhotoUrl,
          category: 'joinery',
        });
      }
    });

    const sketchItems: FusionFurnitureDrawingItem[] = [
      study.conceptSketchSheet,
      ...study.developmentStages.map((s) => ({
        id: s.drawingId,
        plate: `Sketch ${s.step}`,
        title: s.title,
        subtitle: s.description,
        imageUrl: s.imageUrl,
        category: 'sketch' as const,
        annotations: s.notes,
      })),
    ];

    return [study.workingDrawing, ...sketchItems, ...joineryItems];
  }, [study]);

  const allLightboxDrawings: FusionFurnitureDrawingItem[] = useMemo(() => {
    if (!study) return [];
    const inspirationPlates: FusionFurnitureDrawingItem[] = study.inspirations.map((insp) => ({
      id: insp.id,
      plate: `Inspiration ${insp.number}`,
      title: `${insp.title} (${insp.region})`,
      subtitle: insp.description,
      imageUrl: insp.imageUrl,
      category: 'inspiration',
    }));

    const materialPlates: FusionFurnitureDrawingItem[] = study.materials.map((mat, idx) => ({
      id: mat.id,
      plate: `Material 0${idx + 1}`,
      title: `${mat.name} — ${mat.application}`,
      subtitle: mat.description,
      imageUrl: mat.imageUrl,
      category: 'material',
    }));

    return [
      ...study.finalRenders,
      ...technicalGalleryItems,
      ...inspirationPlates,
      ...materialPlates,
    ];
  }, [study, technicalGalleryItems]);

  const openLightbox = (drawingId: string) => {
    setLightboxDrawingId(drawingId);
  };

  if (!study) return null;

  const indexSections = [
    { id: 'ff-intro', label: '01. Project Introduction & Brief' },
    { id: 'ff-concept', label: '02. Concept & Inspiration' },
    { id: 'ff-development', label: '03. Design Development' },
    { id: 'ff-drawings', label: '04. Technical Drawings & Dimensions' },
    { id: 'ff-joinery', label: '05. Joinery & Construction' },
    { id: 'ff-materials', label: '06. Material & Colour Palette' },
    { id: 'ff-final', label: '07. Final Furniture Design' },
  ];

  const filteredInspirations =
    regionFilter === 'all'
      ? study.inspirations
      : study.inspirations.filter((i) => i.region === regionFilter);

  const filteredJoinery =
    joineryFilter === 'all'
      ? study.joineryDetails
      : study.joineryDetails.filter((j) => j.category === joineryFilter);

  const filteredTechnicalDrawings = technicalGalleryItems.filter((item) => {
    if (drawingGalleryTab === 'all') return true;
    if (drawingGalleryTab === 'working') return item.category === 'working-drawing';
    if (drawingGalleryTab === 'joinery') return item.category === 'joinery';
    if (drawingGalleryTab === 'sketches') return item.category === 'sketch';
    return true;
  });

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="space-y-14">
      {/* EDITORIAL COVER: TOP METADATA + LEFT BRIEF + RIGHT COMPACT COVER + BOTTOM THUMBNAILS */}
      <CaseStudyCoverHeader
        projectNumber={project.number}
        categoryLabel={project.categoryLabel}
        yearOrPeriod={project.year}
        location={project.location}
        title={project.title}
        subtitle={study.subHeader}
        description={project.summary}
        metaItems={[
          { label: 'Cultural Dialogue', value: 'Punjab × Goa Heritage Fusion' },
          { label: 'Functional Mechanism', value: '2-in-1 Hanging Jhula ↔ Low Floor Seating' },
          { label: 'Envelope Dimensions', value: '1750 × 1350 × 2150 mm' },
        ]}
        scopeTags={project.scope}
        coverPlate={{
          plate: study.finalRenders[0].plate,
          label: study.finalRenders[0].title,
          caption: study.finalRenders[0].subtitle,
          imageUrl: study.finalRenders[0].imageUrl,
          isPortraitAmbient: true,
          onClick: () => openLightbox(study.finalRenders[0].id),
        }}
        thumbnailStripTitle="Alternate Configuration, Working Drawing, Concept Sketches & Joinery Details"
        thumbnails={[
          {
            id: study.finalRenders[1].id,
            plate: study.finalRenders[1].plate,
            label: 'Low Floor Seating',
            subtitle: study.finalRenders[1].title,
            imageUrl: study.finalRenders[1].imageUrl,
            isPortraitAmbient: true,
            onClick: () => openLightbox(study.finalRenders[1].id),
          },
          {
            id: study.workingDrawing.id,
            plate: study.workingDrawing.plate,
            label: 'Working Drawing (mm)',
            subtitle: study.workingDrawing.title,
            imageUrl: study.workingDrawing.imageUrl,
            isTechnical: true,
            onClick: () => openLightbox(study.workingDrawing.id),
          },
          {
            id: study.conceptSketchSheet.id,
            plate: study.conceptSketchSheet.plate,
            label: 'Concept Sketch Sheet',
            subtitle: study.conceptSketchSheet.title,
            imageUrl: study.conceptSketchSheet.imageUrl,
            isTechnical: true,
            onClick: () => openLightbox(study.conceptSketchSheet.id),
          },
          {
            id: study.joineryDetails[1].id,
            plate: study.joineryDetails[1].plate,
            label: 'Exploded Joinery Detail',
            subtitle: study.joineryDetails[1].title,
            imageUrl: study.joineryDetails[1].imageUrl,
            isTechnical: true,
            onClick: () => openLightbox(study.joineryDetails[1].id),
          },
        ]}
      />

      {/* TWO-COLUMN MONOGRAPH LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Sticky Sidebar Index */}
        <aside className="hidden lg:block lg:col-span-3">
          <div className="sticky top-20 border-l border-[#D9CBB1] dark:border-[#2A3759] pl-5 space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-[#802C43] dark:text-[#C45D77] block">
              Case Study Sequence
            </span>
            <nav className="space-y-1.5 text-xs font-mono">
              {indexSections.map((sec) => (
                <button
                  key={sec.id}
                  type="button"
                  onClick={() => scrollToSection(sec.id)}
                  className="block w-full text-left text-[#3D5288] dark:text-[#BFB299] hover:text-[#802C43] dark:hover:text-[#EFE6D5] transition-colors py-1 truncate cursor-pointer"
                >
                  {sec.label}
                </button>
              ))}
            </nav>

            <button
              type="button"
              onClick={() => openLightbox(allLightboxDrawings[0]?.id || study.finalRenders[0].id)}
              className="w-full text-left pt-6 border-t border-[#D9CBB1] dark:border-[#2A3759] text-xs font-mono text-[#5C6D9B] dark:text-[#988C75] hover:text-[#802C43] dark:hover:text-[#C45D77] space-y-1 cursor-pointer transition-colors group"
            >
              <p className="text-[#263D78] dark:text-[#EFE6D5] group-hover:text-[#802C43] dark:group-hover:text-[#C45D77] font-medium transition-colors">
                Extracted Plates
              </p>
              <p>Inspirations · Sketches · Working Drawing · Joinery Details · Materials · Renders</p>
            </button>
          </div>
        </aside>

        {/* Main Sequential Monograph Narrative */}
        <div className="lg:col-span-9 space-y-24">
          {/* 01. PROJECT INTRODUCTION */}
          <motion.section
            id="ff-intro"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="scroll-mt-24 border-b border-[#D9CBB1] dark:border-[#2A3759] pb-16"
          >
            <div className="flex items-center gap-2 text-xs font-mono text-[#802C43] dark:text-[#C45D77] uppercase tracking-wider mb-3">
              <span>01</span>
              <span aria-hidden="true">·</span>
              <span>Project Introduction & Brief</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif-architectural text-[#263D78] dark:text-[#EFE6D5] font-light mb-8 text-balance">
              Combining Punjabi Royal Craftsmanship with Goan Coastal Traditions
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-10">
              <div className="md:col-span-7 space-y-6">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#5C6D9B] dark:text-[#988C75] block mb-2">
                    Project Brief
                  </span>
                  <p className="text-lg sm:text-xl text-[#1C2D58] dark:text-[#EFE6D5] font-light leading-relaxed">
                    {study.projectBrief}
                  </p>
                </div>

                <div className="border-t border-[#D9CBB1] dark:border-[#2A3759] pt-5">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#5C6D9B] dark:text-[#988C75] block mb-2">
                    Design Intent
                  </span>
                  <p className="text-base text-[#1C2D58] dark:text-[#DDD1BC] font-light leading-relaxed">
                    {study.designIntent}
                  </p>
                </div>
              </div>

              <div className="md:col-span-5 bg-[#F3EBDD] dark:bg-[#141C30] border border-[#D9CBB1] dark:border-[#2A3759] p-5 sm:p-6 space-y-4 text-xs font-mono">
                <div>
                  <span className="text-[#5C6D9B] dark:text-[#988C75] uppercase block mb-0.5">Concept Title</span>
                  <span className="text-[#263D78] dark:text-[#EFE6D5] font-semibold">{study.conceptHeadline}</span>
                </div>
                <div className="pt-3 border-t border-[#D9CBB1] dark:border-[#2A3759]">
                  <span className="text-[#5C6D9B] dark:text-[#988C75] uppercase block mb-0.5">Cultural Origins</span>
                  <span className="text-[#263D78] dark:text-[#EFE6D5]">Punjab & Goa, India</span>
                </div>
                <div className="pt-3 border-t border-[#D9CBB1] dark:border-[#2A3759]">
                  <span className="text-[#5C6D9B] dark:text-[#988C75] uppercase block mb-0.5">Primary Structural Typology</span>
                  <span className="text-[#802C43] dark:text-[#C45D77] font-semibold">2-in-1 Traditional Jhula & Detached Floor Seating</span>
                </div>
                <div className="pt-3 border-t border-[#D9CBB1] dark:border-[#2A3759]">
                  <span className="text-[#5C6D9B] dark:text-[#988C75] uppercase block mb-0.5">Specified Timber & Craft</span>
                  <span className="text-[#263D78] dark:text-[#EFE6D5]">Sheesham · Teak · Cane Weaving · Relief Carving</span>
                </div>
              </div>
            </div>

            {/* Purpose & Functionality */}
            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-[#5C6D9B] dark:text-[#988C75] mb-4">
                Functional Requirements & Dual-Purpose Architecture
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {study.purposes.map((purpose, idx) => (
                  <div
                    key={idx}
                    className="border border-[#D9CBB1] dark:border-[#2A3759] bg-[#F3EBDD] dark:bg-[#18223A] p-5 flex flex-col justify-between gap-3"
                  >
                    <span className="text-xs font-mono text-[#802C43] dark:text-[#C45D77] font-semibold tabular-nums">
                      0{idx + 1}
                    </span>
                    <p className="text-sm text-[#1C2D58] dark:text-[#DDD1BC] leading-relaxed font-light">
                      {purpose}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* 02. CONCEPT AND DESIGN INSPIRATION */}
          <motion.section
            id="ff-concept"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="scroll-mt-24 border-b border-[#D9CBB1] dark:border-[#2A3759] pb-16"
          >
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-3">
              <div className="flex items-center gap-2 text-xs font-mono text-[#802C43] dark:text-[#C45D77] uppercase tracking-wider">
                <span>02</span>
                <span aria-hidden="true">·</span>
                <span>Concept & Cultural Inspiration</span>
              </div>
              <span className="text-xs font-mono text-[#5C6D9B] dark:text-[#988C75]">
                Punjab × Goa Cultural Storytelling
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-serif-architectural text-[#263D78] dark:text-[#EFE6D5] font-light mb-8 text-balance">
              {study.conceptHeadline}
            </h2>

            {/* Concept Statement */}
            <div className="bg-[#F3EBDD] dark:bg-[#141C30] border border-[#D9CBB1] dark:border-[#2A3759] p-6 sm:p-10 mb-10">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#802C43] dark:text-[#C45D77] block mb-4">
                Concept Brief
              </span>
              <blockquote className="text-xl sm:text-2xl md:text-3xl font-serif-architectural italic text-[#263D78] dark:text-[#EFE6D5] font-light leading-relaxed">
                “{study.conceptBrief}”
              </blockquote>
            </div>

            {/* Regional Inspiration Filter */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b border-[#D9CBB1] dark:border-[#2A3759]">
              <h3 className="text-xs font-mono uppercase tracking-wider text-[#263D78] dark:text-[#EFE6D5] font-semibold">
                Design Inspiration & Cultural References (6 Sources)
              </h3>
              <div className="flex items-center gap-1 bg-[#DFD2B8] dark:bg-[#1C2845] p-1">
                {(['all', 'Punjab', 'Goa'] as const).map((region) => (
                  <button
                    key={region}
                    type="button"
                    onClick={() => setRegionFilter(region)}
                    className={`px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      regionFilter === region
                        ? 'bg-[#263D78] dark:bg-[#EFE6D5] text-[#F3EBDD] dark:text-[#1C2D58]'
                        : 'text-[#3D5288] dark:text-[#BFB299] hover:text-[#263D78] dark:hover:text-[#EFE6D5]'
                    }`}
                  >
                    {region === 'all' ? 'All Influences (6)' : `${region} (3)`}
                  </button>
                ))}
              </div>
            </div>

            {/* 6 Cultural Inspiration Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {filteredInspirations.map((insp) => (
                <div
                  key={insp.id}
                  onClick={() => openLightbox(insp.id)}
                  className="bg-[#F3EBDD] dark:bg-[#18223A] border border-[#D9CBB1] dark:border-[#2A3759] hover:border-[#802C43]/60 dark:hover:border-[#C45D77]/60 p-4 flex flex-col sm:flex-row gap-5 cursor-pointer group transition-colors"
                >
                  <div className="sm:w-36 shrink-0 bg-[#F8F3E8] dark:bg-[#1E2A47] border border-[#D9CBB1] dark:border-[#2A3759] p-2 flex items-center justify-center overflow-hidden">
                    <img
                      src={insp.imageUrl}
                      alt={insp.title}
                      referrerPolicy="no-referrer"
                      className="max-h-36 w-auto max-w-full object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="text-[11px] font-mono text-[#802C43] dark:text-[#C45D77] font-semibold uppercase">
                          {insp.number}. {insp.region}
                        </span>
                        <Maximize2 className="w-3.5 h-3.5 text-[#5C6D9B] dark:text-[#988C75] group-hover:text-[#802C43] dark:group-hover:text-[#C45D77] shrink-0" />
                      </div>
                      <h4 className="text-lg font-serif-architectural font-semibold text-[#263D78] dark:text-[#EFE6D5] mb-2">
                        {insp.title}
                      </h4>
                      <p className="text-xs text-[#3D5288] dark:text-[#BFB299] leading-relaxed">
                        {insp.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 11-Row Architectural & Cultural Motif Detailing Matrix */}
            <div className="bg-[#F3EBDD] dark:bg-[#141C30] border border-[#D9CBB1] dark:border-[#2A3759] p-5 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#D9CBB1] dark:border-[#2A3759] mb-4">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#802C43] dark:text-[#C45D77] block">
                    Motif Translation Schedule
                  </span>
                  <h3 className="text-xl font-serif-architectural font-light text-[#263D78] dark:text-[#EFE6D5]">
                    Small Detailing & Motif Explanation (11 Elements)
                  </h3>
                </div>
                <span className="text-xs font-mono text-[#5C6D9B] dark:text-[#988C75]">
                  Extracted Verbatim From Presentation Sheet
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-[#C7B697] dark:border-[#3A4B75] text-[11px] font-mono uppercase tracking-wider text-[#5C6D9B] dark:text-[#988C75]">
                      <th className="py-2.5 pr-4 font-medium">Furniture Detail</th>
                      <th className="py-2.5 pr-4 font-medium">Inspiration</th>
                      <th className="py-2.5 font-medium">Purpose in the Design</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#D9CBB1] dark:divide-[#2A3759]">
                    {study.motifTable.map((row, idx) => (
                      <tr key={idx} className="hover:bg-[#F8F3E8]/70 dark:hover:bg-[#1C2845]/70 transition-colors">
                        <td className="py-3 pr-4 font-medium text-[#263D78] dark:text-[#EFE6D5] whitespace-nowrap">
                          {row.detail}
                        </td>
                        <td className="py-3 pr-4 text-[#802C43] dark:text-[#C45D77] font-mono text-xs">
                          {row.inspiration}
                        </td>
                        <td className="py-3 text-[#1C2D58] dark:text-[#DDD1BC] font-light">
                          {row.purpose}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.section>

          {/* 03. DESIGN DEVELOPMENT */}
          <motion.section
            id="ff-development"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="scroll-mt-24 border-b border-[#D9CBB1] dark:border-[#2A3759] pb-16"
          >
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-3">
              <div className="flex items-center gap-2 text-xs font-mono text-[#802C43] dark:text-[#C45D77] uppercase tracking-wider">
                <span>03</span>
                <span aria-hidden="true">·</span>
                <span>Design Development & Functional Evolution</span>
              </div>
              <span className="text-xs font-mono text-[#5C6D9B] dark:text-[#988C75]">
                Initial Sketches → Structural Iteration → 2-in-1 Transformation
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif-architectural text-[#263D78] dark:text-[#EFE6D5] font-light mb-8 text-balance">
              From Pencil Ideation to Dual-Purpose Mechanism
            </h2>

            {/* Master Original Sketchbook Study */}
            <div
              onClick={() => openLightbox(study.conceptSketchSheet.id)}
              className="bg-[#F3EBDD] dark:bg-[#18223A] border border-[#D9CBB1] dark:border-[#2A3759] hover:border-[#802C43]/60 dark:hover:border-[#C45D77]/60 p-4 sm:p-6 cursor-pointer group transition-colors mb-8"
            >
              <div className="flex items-center justify-between text-xs font-mono text-[#5C6D9B] dark:text-[#988C75] pb-3 border-b border-[#D9CBB1] dark:border-[#2A3759]">
                <span>
                  <strong className="text-[#802C43] dark:text-[#C45D77]">{study.conceptSketchSheet.plate}</strong>
                  <span className="mx-2">·</span>
                  <span className="text-[#263D78] dark:text-[#EFE6D5] font-semibold">{study.conceptSketchSheet.title}</span>
                </span>
                <span className="flex items-center gap-1.5 text-[#263D78] dark:text-[#EFE6D5] group-hover:text-[#802C43] dark:group-hover:text-[#C45D77] shrink-0">
                  <span>Inspect Sketches</span>
                  <Maximize2 className="w-3.5 h-3.5" />
                </span>
              </div>
              <div className="py-4 bg-[#F8F3E8] dark:bg-[#1E2A47] px-2 overflow-hidden flex justify-center">
                <img
                  src={study.conceptSketchSheet.imageUrl}
                  alt={study.conceptSketchSheet.title}
                  referrerPolicy="no-referrer"
                  className="w-full max-h-[520px] object-contain transition-transform duration-500 group-hover:scale-[1.01]"
                />
              </div>
              <p className="pt-3 border-t border-[#D9CBB1] dark:border-[#2A3759] text-xs text-[#3D5288] dark:text-[#BFB299] leading-relaxed">
                {study.conceptSketchSheet.subtitle}
              </p>
            </div>

            {/* 4-Step Individual Sketch Evolution Sequence */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              {study.developmentStages.map((stage) => (
                <div
                  key={stage.step}
                  onClick={() => openLightbox(stage.drawingId)}
                  className="bg-[#F3EBDD] dark:bg-[#18223A] border border-[#D9CBB1] dark:border-[#2A3759] hover:border-[#802C43]/60 dark:hover:border-[#C45D77]/60 p-4 flex flex-col justify-between cursor-pointer group transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-mono text-[#5C6D9B] dark:text-[#988C75] pb-2.5 border-b border-[#D9CBB1] dark:border-[#2A3759]">
                      <span>
                        <strong className="text-[#802C43] dark:text-[#C45D77]">Step {stage.step}</strong> · {stage.phase}
                      </span>
                      <Maximize2 className="w-3.5 h-3.5 text-[#5C6D9B] dark:text-[#988C75] group-hover:text-[#802C43] dark:group-hover:text-[#C45D77] shrink-0" />
                    </div>
                    <div className="py-3 flex items-center justify-center bg-[#F8F3E8] dark:bg-[#1E2A47] my-3 overflow-hidden px-2">
                      <img
                        src={stage.imageUrl}
                        alt={stage.title}
                        referrerPolicy="no-referrer"
                        className="max-h-60 w-auto max-w-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                      />
                    </div>
                    <h3 className="text-lg font-serif-architectural font-semibold text-[#263D78] dark:text-[#EFE6D5] mb-1.5">
                      {stage.title}
                    </h3>
                    <p className="text-xs text-[#3D5288] dark:text-[#BFB299] leading-relaxed mb-3">
                      {stage.description}
                    </p>
                  </div>
                  <div className="pt-2.5 border-t border-[#D9CBB1] dark:border-[#2A3759] flex flex-wrap gap-1.5">
                    {stage.notes.map((note, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 bg-[#F8F3E8] dark:bg-[#141C30] border border-[#D9CBB1] dark:border-[#2A3759] text-[10px] font-mono text-[#3D5288] dark:text-[#BFB299]"
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Interactive 2-in-1 Transformation Mechanism Switcher */}
            <div className="bg-[#F3EBDD] dark:bg-[#141C30] border border-[#D9CBB1] dark:border-[#2A3759] p-6 sm:p-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-[#D9CBB1] dark:border-[#2A3759] mb-6">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#802C43] dark:text-[#C45D77] block mb-1">
                    Functional Innovation · The 2-in-1 Furniture
                  </span>
                  <h3 className="text-2xl font-serif-architectural font-light text-[#263D78] dark:text-[#EFE6D5]">
                    {study.twoInOneHeadline}
                  </h3>
                </div>
                <div className="flex items-center gap-1 bg-[#DFD2B8] dark:bg-[#1C2845] p-1 self-start">
                  <button
                    type="button"
                    onClick={() => setTransformationMode('swing')}
                    className={`px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      transformationMode === 'swing'
                        ? 'bg-[#263D78] dark:bg-[#EFE6D5] text-[#F3EBDD] dark:text-[#1C2D58]'
                        : 'text-[#3D5288] dark:text-[#BFB299] hover:text-[#263D78] dark:hover:text-[#EFE6D5]'
                    }`}
                  >
                    Mode 01: Hanging Jhula
                  </button>
                  <button
                    type="button"
                    onClick={() => setTransformationMode('seating')}
                    className={`px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      transformationMode === 'seating'
                        ? 'bg-[#263D78] dark:bg-[#EFE6D5] text-[#F3EBDD] dark:text-[#1C2D58]'
                        : 'text-[#3D5288] dark:text-[#BFB299] hover:text-[#263D78] dark:hover:text-[#EFE6D5]'
                    }`}
                  >
                    Mode 02: Detached Low Seating
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div
                  onClick={() =>
                    openLightbox(
                      transformationMode === 'swing'
                        ? study.finalRenders[0].id
                        : study.finalRenders[1].id
                    )
                  }
                  className="md:col-span-6 bg-[#F8F3E8] dark:bg-[#1E2A47] border border-[#D9CBB1] dark:border-[#2A3759] hover:border-[#802C43]/60 dark:hover:border-[#C45D77]/60 p-3 flex items-center justify-center cursor-pointer group transition-colors"
                >
                  <img
                    src={
                      transformationMode === 'swing'
                        ? study.finalRenders[0].imageUrl
                        : study.finalRenders[1].imageUrl
                    }
                    alt={
                      transformationMode === 'swing'
                        ? study.finalRenders[0].title
                        : study.finalRenders[1].title
                    }
                    referrerPolicy="no-referrer"
                    className="max-h-80 w-auto max-w-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>
                <div className="md:col-span-6 space-y-4">
                  <span className="text-xs font-mono text-[#802C43] dark:text-[#C45D77] uppercase tracking-wider block">
                    {transformationMode === 'swing'
                      ? 'Configuration A · Suspended Under Canopy'
                      : 'Configuration B · Chains Detached'}
                  </span>
                  <p className="text-base text-[#1C2D58] dark:text-[#EFE6D5] font-light leading-relaxed">
                    {transformationMode === 'swing'
                      ? study.twoInOnePrimaryNote
                      : study.twoInOneSecondaryNote}
                  </p>
                  <div className="border-t border-[#D9CBB1] dark:border-[#2A3759] pt-3 text-xs font-mono text-[#3D5288] dark:text-[#BFB299]">
                    {transformationMode === 'swing'
                      ? 'Suspended via twin 11 mm chains & top-beam metal eye bolts · 480 mm under-seat floor clearance.'
                      : 'Circular 950 mm cane seat rests independently on four turned Charpai legs with arched Ghumat backrest.'}
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* 04. FURNITURE DRAWINGS AND TECHNICAL DETAILS */}
          <motion.section
            id="ff-drawings"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="scroll-mt-24 border-b border-[#D9CBB1] dark:border-[#2A3759] pb-16"
          >
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-3">
              <div className="flex items-center gap-2 text-xs font-mono text-[#802C43] dark:text-[#C45D77] uppercase tracking-wider">
                <span>04</span>
                <span aria-hidden="true">·</span>
                <span>Furniture Drawings & Technical Details</span>
              </div>
              <span className="text-xs font-mono text-[#5C6D9B] dark:text-[#988C75]">
                All Dimensions in Millimeters (mm) · Click Any Plate to Enlarge
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif-architectural text-[#263D78] dark:text-[#EFE6D5] font-light mb-8 text-balance">
              Working Drawing, Dimensional Schedule & Technical Plate Gallery
            </h2>

            {/* Primary Large Working Drawing Card */}
            <div
              onClick={() => openLightbox(study.workingDrawing.id)}
              className="bg-[#F3EBDD] dark:bg-[#18223A] border border-[#D9CBB1] dark:border-[#2A3759] hover:border-[#802C43]/60 dark:hover:border-[#C45D77]/60 p-4 sm:p-6 cursor-pointer group transition-colors mb-8"
            >
              <div className="flex items-center justify-between text-xs font-mono text-[#5C6D9B] dark:text-[#988C75] pb-3 border-b border-[#D9CBB1] dark:border-[#2A3759]">
                <span>
                  <strong className="text-[#802C43] dark:text-[#C45D77]">{study.workingDrawing.plate}</strong>
                  <span className="mx-2">·</span>
                  <span className="text-[#263D78] dark:text-[#EFE6D5] font-semibold">{study.workingDrawing.title}</span>
                </span>
                <span className="flex items-center gap-1.5 text-[#263D78] dark:text-[#EFE6D5] group-hover:text-[#802C43] dark:group-hover:text-[#C45D77] shrink-0">
                  <span>Inspect Full Resolution (mm)</span>
                  <Maximize2 className="w-3.5 h-3.5" />
                </span>
              </div>
              <div className="py-6 bg-[#F8F3E8] dark:bg-[#1E2A47] flex justify-center overflow-hidden">
                <img
                  src={study.workingDrawing.imageUrl}
                  alt={study.workingDrawing.title}
                  referrerPolicy="no-referrer"
                  className="max-h-[640px] w-auto max-w-full object-contain transition-transform duration-500 group-hover:scale-[1.01]"
                />
              </div>
              <p className="pt-3 border-t border-[#D9CBB1] dark:border-[#2A3759] text-xs text-[#3D5288] dark:text-[#BFB299] leading-relaxed">
                {study.workingDrawing.subtitle}
              </p>
            </div>

            {/* Extracted Dimensions Schedule */}
            <div className="bg-[#F3EBDD] dark:bg-[#141C30] border border-[#D9CBB1] dark:border-[#2A3759] p-5 sm:p-6 mb-10">
              <div className="flex items-center justify-between pb-3 border-b border-[#D9CBB1] dark:border-[#2A3759] mb-4">
                <span className="text-xs font-mono uppercase tracking-wider text-[#263D78] dark:text-[#EFE6D5] font-semibold">
                  Annotated Furniture Dimensions Schedule (Extracted From Working Drawing)
                </span>
                <span className="text-[11px] font-mono text-[#5C6D9B] dark:text-[#988C75]">13 Callouts (mm)</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {study.dimensionsMm.map((dim, idx) => (
                  <div
                    key={idx}
                    className="bg-[#F8F3E8] dark:bg-[#18223A] border border-[#D9CBB1] dark:border-[#2A3759] p-3 space-y-1"
                  >
                    <span className="text-[10px] font-mono uppercase text-[#5C6D9B] dark:text-[#988C75] block">
                      {dim.label}
                    </span>
                    <span className="text-sm font-mono font-semibold text-[#263D78] dark:text-[#EFE6D5] tabular-nums block">
                      {dim.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Separate Filterable Technical Drawing Gallery */}
            <div className="space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#D9CBB1] dark:border-[#2A3759]">
                <h3 className="text-xs font-mono uppercase tracking-wider text-[#263D78] dark:text-[#EFE6D5] font-semibold">
                  Complete Technical Drawing & Detail Gallery ({filteredTechnicalDrawings.length} Plates)
                </h3>
                <div className="flex items-center gap-1 bg-[#DFD2B8] dark:bg-[#1C2845] p-1 overflow-x-auto no-scrollbar">
                  {[
                    { id: 'all', label: 'All Technical Plates' },
                    { id: 'working', label: 'Working Drawing' },
                    { id: 'sketches', label: 'Sections & Sketches' },
                    { id: 'joinery', label: 'Exploded Joinery' },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() =>
                        setDrawingGalleryTab(tab.id as 'all' | 'working' | 'joinery' | 'sketches')
                      }
                      className={`px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        drawingGalleryTab === tab.id
                          ? 'bg-[#263D78] dark:bg-[#EFE6D5] text-[#F3EBDD] dark:text-[#1C2D58]'
                          : 'text-[#3D5288] dark:text-[#BFB299] hover:text-[#263D78] dark:hover:text-[#EFE6D5]'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredTechnicalDrawings.map((item) => (
                  <div
                    key={`gal-${item.id}`}
                    onClick={() => openLightbox(item.id)}
                    className="bg-[#F3EBDD] dark:bg-[#18223A] border border-[#D9CBB1] dark:border-[#2A3759] hover:border-[#802C43]/60 dark:hover:border-[#C45D77]/60 p-3.5 flex flex-col justify-between cursor-pointer group transition-colors"
                  >
                    <div className="flex items-center justify-between text-[11px] font-mono text-[#5C6D9B] dark:text-[#988C75] pb-2 border-b border-[#D9CBB1] dark:border-[#2A3759]">
                      <span className="truncate pr-2">
                        <strong className="text-[#802C43] dark:text-[#C45D77]">{item.plate}</strong>
                      </span>
                      <Maximize2 className="w-3.5 h-3.5 text-[#5C6D9B] dark:text-[#988C75] group-hover:text-[#802C43] dark:group-hover:text-[#C45D77] shrink-0" />
                    </div>
                    <div className="py-3 flex items-center justify-center bg-[#F8F3E8] dark:bg-[#1E2A47] my-2.5 overflow-hidden h-52">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        referrerPolicy="no-referrer"
                        className="max-h-full w-auto max-w-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                      />
                    </div>
                    <div className="pt-2 border-t border-[#D9CBB1] dark:border-[#2A3759]">
                      <h4 className="text-sm font-serif-architectural font-semibold text-[#263D78] dark:text-[#EFE6D5] truncate">
                        {item.title}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* 05. JOINERY AND CONSTRUCTION DETAILS */}
          <motion.section
            id="ff-joinery"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="scroll-mt-24 border-b border-[#D9CBB1] dark:border-[#2A3759] pb-16"
          >
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-3">
              <div className="flex items-center gap-2 text-xs font-mono text-[#802C43] dark:text-[#C45D77] uppercase tracking-wider">
                <span>05</span>
                <span aria-hidden="true">·</span>
                <span>Joinery & Construction Details</span>
              </div>
              <span className="text-xs font-mono text-[#5C6D9B] dark:text-[#988C75]">
                Exploded Joinery Diagrams · Annotations Preserved
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif-architectural text-[#263D78] dark:text-[#EFE6D5] font-light mb-6 text-balance">
              Structural Connections, Wood Joinery & Chain Suspension Engineering
            </h2>

            {/* Category Tabs */}
            <div className="flex items-center gap-1 bg-[#DFD2B8] dark:bg-[#1C2845] p-1 overflow-x-auto no-scrollbar mb-8">
              {[
                { id: 'all', label: 'All Joinery (6)' },
                { id: 'structural', label: 'Frame & Pillars (3)' },
                { id: 'roof', label: 'Roof Frame (1)' },
                { id: 'seating', label: 'Circular Seat (1)' },
                { id: 'suspension', label: 'Eye Bolt Suspension (1)' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() =>
                    setJoineryFilter(
                      tab.id as 'all' | 'structural' | 'roof' | 'seating' | 'suspension'
                    )
                  }
                  className={`px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    joineryFilter === tab.id
                      ? 'bg-[#263D78] dark:bg-[#EFE6D5] text-[#F3EBDD] dark:text-[#1C2D58]'
                      : 'text-[#3D5288] dark:text-[#BFB299] hover:text-[#263D78] dark:hover:text-[#EFE6D5]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Joinery Detail Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredJoinery.map((joint) => (
                <div
                  key={joint.id}
                  className="bg-[#F3EBDD] dark:bg-[#18223A] border border-[#D9CBB1] dark:border-[#2A3759] p-5 flex flex-col justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-mono text-[#5C6D9B] dark:text-[#988C75] pb-3 border-b border-[#D9CBB1] dark:border-[#2A3759]">
                      <span className="text-[#802C43] dark:text-[#C45D77] font-semibold uppercase">
                        {joint.plate} · {joint.categoryLabel}
                      </span>
                      <button
                        type="button"
                        onClick={() => openLightbox(joint.id)}
                        className="flex items-center gap-1 text-[#263D78] dark:text-[#EFE6D5] hover:text-[#802C43] dark:hover:text-[#C45D77] cursor-pointer"
                      >
                        <span>Enlarge</span>
                        <Maximize2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Primary Exploded Joinery Drawing */}
                    <div
                      onClick={() => openLightbox(joint.id)}
                      className="my-4 p-2 bg-[#F8F3E8] dark:bg-[#1E2A47] border border-[#D9CBB1] dark:border-[#2A3759] flex items-center justify-center cursor-pointer group overflow-hidden"
                    >
                      <img
                        src={joint.imageUrl}
                        alt={joint.title}
                        referrerPolicy="no-referrer"
                        className="max-h-60 w-auto max-w-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                      />
                    </div>

                    <h3 className="text-xl font-serif-architectural font-semibold text-[#263D78] dark:text-[#EFE6D5] mb-2">
                      {joint.title}
                    </h3>
                    <p className="text-xs text-[#3D5288] dark:text-[#BFB299] leading-relaxed mb-4">
                      {joint.summary}
                    </p>

                    {/* Why It Works */}
                    <div className="bg-[#F8F3E8] dark:bg-[#141C30] border border-[#D9CBB1] dark:border-[#2A3759] p-3.5 space-y-1.5 mb-3">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#802C43] dark:text-[#C45D77] block">
                        Why It Works
                      </span>
                      <ul className="space-y-1 text-xs text-[#1C2D58] dark:text-[#DDD1BC]">
                        {joint.whyItWorks.map((reason, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-[#802C43] dark:text-[#C45D77] font-mono">·</span>
                            <span>{reason}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Components + Secondary / Reference Thumbnails */}
                  <div className="pt-3 border-t border-[#D9CBB1] dark:border-[#2A3759] space-y-3">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="text-[10px] font-mono uppercase text-[#5C6D9B] dark:text-[#988C75] mr-1">
                        Components:
                      </span>
                      {joint.components.map((comp, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 bg-[#F8F3E8] dark:bg-[#141C30] border border-[#D9CBB1] dark:border-[#2A3759] text-[10px] font-mono text-[#263D78] dark:text-[#EFE6D5]"
                        >
                          {comp}
                        </span>
                      ))}
                    </div>

                    {(joint.secondaryImageUrl || joint.referencePhotoUrl) && (
                      <div className="grid grid-cols-2 gap-2.5 pt-2">
                        {joint.secondaryImageUrl && (
                          <button
                            type="button"
                            onClick={() => openLightbox(`${joint.id}-assembly`)}
                            className="bg-[#F8F3E8] dark:bg-[#141C30] border border-[#D9CBB1] dark:border-[#2A3759] hover:border-[#802C43] dark:hover:border-[#C45D77] p-2 text-left cursor-pointer group"
                          >
                            <img
                              src={joint.secondaryImageUrl}
                              alt={`${joint.title} assembly`}
                              referrerPolicy="no-referrer"
                              className="h-20 w-full object-contain"
                            />
                            <span className="block text-[10px] font-mono text-[#3D5288] dark:text-[#BFB299] group-hover:text-[#802C43] dark:group-hover:text-[#C45D77] mt-1 truncate">
                              View Unlabeled Assembly →
                            </span>
                          </button>
                        )}
                        {joint.referencePhotoUrl && (
                          <button
                            type="button"
                            onClick={() => openLightbox(`${joint.id}-ref`)}
                            className="bg-[#F8F3E8] dark:bg-[#141C30] border border-[#D9CBB1] dark:border-[#2A3759] hover:border-[#802C43] dark:hover:border-[#C45D77] p-2 text-left cursor-pointer group"
                          >
                            <img
                              src={joint.referencePhotoUrl}
                              alt={`${joint.title} reference`}
                              referrerPolicy="no-referrer"
                              className="h-20 w-full object-contain"
                            />
                            <span className="block text-[10px] font-mono text-[#3D5288] dark:text-[#BFB299] group-hover:text-[#802C43] dark:group-hover:text-[#C45D77] mt-1 truncate">
                              Inspect Sheet Reference →
                            </span>
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* 06. MATERIAL AND COLOUR PALETTE */}
          <motion.section
            id="ff-materials"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="scroll-mt-24 border-b border-[#D9CBB1] dark:border-[#2A3759] pb-16"
          >
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-3">
              <div className="flex items-center gap-2 text-xs font-mono text-[#802C43] dark:text-[#C45D77] uppercase tracking-wider">
                <span>06</span>
                <span aria-hidden="true">·</span>
                <span>Material & Finish Brief</span>
              </div>
              <span className="text-xs font-mono text-[#5C6D9B] dark:text-[#988C75]">
                Sheesham · Teak · Cane Weaving · Carved Wood Finish
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif-architectural text-[#263D78] dark:text-[#EFE6D5] font-light mb-8 text-balance">
              Original Material Selection & Regional Colour Palette
            </h2>

            {/* 4 Material Swatch Photograph Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
              {study.materials.map((mat) => (
                <div
                  key={mat.id}
                  onClick={() => openLightbox(mat.id)}
                  className="bg-[#F3EBDD] dark:bg-[#18223A] border border-[#D9CBB1] dark:border-[#2A3759] hover:border-[#802C43]/60 dark:hover:border-[#C45D77]/60 p-5 flex items-start gap-5 cursor-pointer group transition-colors"
                >
                  <div className="w-24 h-24 shrink-0 bg-[#F8F3E8] dark:bg-[#1E2A47] border border-[#D9CBB1] dark:border-[#2A3759] p-1.5 flex items-center justify-center overflow-hidden">
                    <img
                      src={mat.imageUrl}
                      alt={mat.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="min-w-0 space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-3 h-3 border border-[#C7B697] dark:border-[#3A4B75] shrink-0"
                        style={{ backgroundColor: mat.colorHex }}
                      />
                      <span className="text-[11px] font-mono text-[#802C43] dark:text-[#C45D77] uppercase font-semibold">
                        {mat.application}
                      </span>
                    </div>
                    <h3 className="text-lg font-serif-architectural font-semibold text-[#263D78] dark:text-[#EFE6D5]">
                      {mat.name}
                    </h3>
                    <p className="text-xs text-[#3D5288] dark:text-[#BFB299] leading-relaxed">
                      {mat.description}
                    </p>
                    <span className="block text-[10px] font-mono text-[#5C6D9B] dark:text-[#988C75] pt-1">
                      Finish: {mat.finishTone}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Colour Palette Bar */}
            <div className="bg-[#F3EBDD] dark:bg-[#141C30] border border-[#D9CBB1] dark:border-[#2A3759] p-5 sm:p-6">
              <span className="text-xs font-mono uppercase tracking-wider text-[#5C6D9B] dark:text-[#988C75] block mb-4">
                Synthesised Material Colour Palette
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {study.colourPalette.map((swatch, idx) => (
                  <div key={idx} className="bg-[#F8F3E8] dark:bg-[#18223A] border border-[#D9CBB1] dark:border-[#2A3759] p-3 space-y-2">
                    <div
                      className="w-full h-12 border border-[#C7B697] dark:border-[#3A4B75]"
                      style={{ backgroundColor: swatch.hex }}
                    />
                    <div className="text-xs font-serif-architectural font-semibold text-[#263D78] dark:text-[#EFE6D5] leading-snug">
                      {swatch.name}
                    </div>
                    <p className="text-[11px] text-[#3D5288] dark:text-[#BFB299] leading-snug">
                      {swatch.role}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* 07. FINAL FURNITURE DESIGN */}
          <motion.section
            id="ff-final"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="scroll-mt-24 pb-8"
          >
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-3">
              <div className="flex items-center gap-2 text-xs font-mono text-[#802C43] dark:text-[#C45D77] uppercase tracking-wider">
                <span>07</span>
                <span aria-hidden="true">·</span>
                <span>Final Furniture Design Outcome</span>
              </div>
              <span className="text-xs font-mono text-[#5C6D9B] dark:text-[#988C75]">
                Original 3D Renders · Click Any View to Enlarge
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif-architectural text-[#263D78] dark:text-[#EFE6D5] font-light mb-8 text-balance">
              Royal Breeze Swing — Two Forms, One Heritage Object
            </h2>

            {/* Asymmetric Large Final Renders */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch mb-8">
              <div
                onClick={() => openLightbox(study.finalRenders[0].id)}
                className="lg:col-span-7 bg-[#F3EBDD] dark:bg-[#18223A] border border-[#D9CBB1] dark:border-[#2A3759] hover:border-[#802C43]/60 dark:hover:border-[#C45D77]/60 p-4 sm:p-5 flex flex-col justify-between cursor-pointer group transition-colors"
              >
                <div className="flex items-center justify-between text-[11px] font-mono text-[#5C6D9B] dark:text-[#988C75] pb-3 border-b border-[#D9CBB1] dark:border-[#2A3759]">
                  <span>
                    <strong className="text-[#802C43] dark:text-[#C45D77]">{study.finalRenders[0].plate}</strong> · Full Hanging Jhula
                  </span>
                  <Maximize2 className="w-3.5 h-3.5 text-[#5C6D9B] dark:text-[#988C75] group-hover:text-[#802C43] dark:group-hover:text-[#C45D77]" />
                </div>
                <div className="my-auto py-4 bg-[#E3D7BF] dark:bg-[#141C30] flex items-center justify-center overflow-hidden">
                  <img
                    src={study.finalRenders[0].imageUrl}
                    alt={study.finalRenders[0].title}
                    referrerPolicy="no-referrer"
                    className="max-h-[520px] w-auto max-w-full object-contain transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                </div>
                <p className="pt-3 border-t border-[#D9CBB1] dark:border-[#2A3759] text-xs text-[#3D5288] dark:text-[#BFB299] leading-relaxed">
                  {study.twoInOnePrimaryNote}
                </p>
              </div>

              <div className="lg:col-span-5 flex flex-col gap-6">
                <div
                  onClick={() => openLightbox(study.finalRenders[1].id)}
                  className="bg-[#F3EBDD] dark:bg-[#18223A] border border-[#D9CBB1] dark:border-[#2A3759] hover:border-[#802C43]/60 dark:hover:border-[#C45D77]/60 p-4 sm:p-5 flex flex-col justify-between cursor-pointer group transition-colors flex-1"
                >
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#5C6D9B] dark:text-[#988C75] pb-3 border-b border-[#D9CBB1] dark:border-[#2A3759]">
                    <span>
                      <strong className="text-[#802C43] dark:text-[#C45D77]">{study.finalRenders[1].plate}</strong> · Low Floor Seating
                    </span>
                    <Maximize2 className="w-3.5 h-3.5 text-[#5C6D9B] dark:text-[#988C75] group-hover:text-[#802C43] dark:group-hover:text-[#C45D77]" />
                  </div>
                  <div className="my-auto py-4 bg-[#E3D7BF] dark:bg-[#141C30] flex items-center justify-center overflow-hidden">
                    <img
                      src={study.finalRenders[1].imageUrl}
                      alt={study.finalRenders[1].title}
                      referrerPolicy="no-referrer"
                      className="max-h-[340px] w-auto max-w-full object-contain transition-transform duration-700 group-hover:scale-[1.02]"
                    />
                  </div>
                  <p className="pt-3 border-t border-[#D9CBB1] dark:border-[#2A3759] text-xs text-[#3D5288] dark:text-[#BFB299] leading-relaxed">
                    {study.twoInOneSecondaryNote}
                  </p>
                </div>

                {/* Construction & Ornament Highlights */}
                <div className="bg-[#F3EBDD] dark:bg-[#18223A] border border-[#D9CBB1] dark:border-[#2A3759] p-5 space-y-3">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#802C43] dark:text-[#C45D77] block">
                    Construction & Craft Highlights
                  </span>
                  <div className="grid grid-cols-2 gap-3">
                    <div
                      onClick={() => openLightbox(study.workingDrawing.id)}
                      className="bg-[#F8F3E8] dark:bg-[#1E2A47] border border-[#D9CBB1] dark:border-[#2A3759] hover:border-[#802C43] dark:hover:border-[#C45D77] p-2 cursor-pointer"
                    >
                      <img
                        src={study.workingDrawing.imageUrl}
                        alt="Working Drawing Detail"
                        referrerPolicy="no-referrer"
                        className="h-24 w-full object-contain"
                      />
                      <span className="block text-[10px] font-mono text-[#3D5288] dark:text-[#BFB299] mt-1 truncate">
                        Full Working Drawing (mm)
                      </span>
                    </div>
                    <div
                      onClick={() => openLightbox('ff-join-02')}
                      className="bg-[#F8F3E8] dark:bg-[#1E2A47] border border-[#D9CBB1] dark:border-[#2A3759] hover:border-[#802C43] dark:hover:border-[#C45D77] p-2 cursor-pointer"
                    >
                      <img
                        src={study.joineryDetails[1].imageUrl}
                        alt="Mortise & Tenon Joinery"
                        referrerPolicy="no-referrer"
                        className="h-24 w-full object-contain"
                      />
                      <span className="block text-[10px] font-mono text-[#3D5288] dark:text-[#BFB299] mt-1 truncate">
                        Pillar-Beam Dowel Joinery
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Bottom Next / Previous Project Navigation */}
          <div className="border-t border-[#D9CBB1] dark:border-[#2A3759] pt-12 flex flex-col sm:flex-row items-center justify-between gap-6">
            <button
              type="button"
              onClick={() => {
                onSelectProject(prevProject);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full sm:w-auto text-left group border border-[#D9CBB1] dark:border-[#2A3759] hover:border-[#263D78] dark:hover:border-[#EFE6D5] p-4 transition-colors cursor-pointer"
            >
              <span className="text-[11px] font-mono text-[#5C6D9B] dark:text-[#988C75] uppercase block mb-1">
                ← Previous Project
              </span>
              <span className="text-base font-serif-architectural text-[#263D78] dark:text-[#EFE6D5] group-hover:text-[#802C43] dark:group-hover:text-[#C45D77] transition-colors">
                {prevProject.number} — {prevProject.title}
              </span>
            </button>

            <button
              type="button"
              onClick={() => {
                onSelectProject(nextProject);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full sm:w-auto text-right group border border-[#D9CBB1] dark:border-[#2A3759] hover:border-[#263D78] dark:hover:border-[#EFE6D5] p-4 transition-colors cursor-pointer"
            >
              <span className="text-[11px] font-mono text-[#5C6D9B] dark:text-[#988C75] uppercase block mb-1">
                Next Project →
              </span>
              <span className="text-base font-serif-architectural text-[#263D78] dark:text-[#EFE6D5] group-hover:text-[#802C43] dark:group-hover:text-[#C45D77] transition-colors">
                {nextProject.number} — {nextProject.title}
              </span>
            </button>
          </div>
        </div>
      </div>

      <DrawingLightbox
        items={allLightboxDrawings}
        activeId={lightboxDrawingId}
        onSelectId={setLightboxDrawingId}
        onClose={() => setLightboxDrawingId(null)}
      />
    </div>
  );
};
