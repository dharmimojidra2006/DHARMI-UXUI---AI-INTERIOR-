import React, { useState } from 'react';
import { DrawingItem } from '../types';
import { Maximize2, Layers, Eye, Compass, ZoomIn } from 'lucide-react';

interface Props {
  drawings: DrawingItem[];
  projectTitle: string;
}

export const ArchitecturalDrawings: React.FC<Props> = ({ drawings, projectTitle }) => {
  const [activeDrawingIndex, setActiveDrawingIndex] = useState(0);
  const [showDimensions, setShowDimensions] = useState(true);
  const [showAnnotations, setShowAnnotations] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  if (!drawings || drawings.length === 0) return null;
  const current = drawings[activeDrawingIndex];

  return (
    <div className="bg-[#F3EBDD] dark:bg-[#18223A] border border-[#D9CBB1] dark:border-[#2A3759] p-6 lg:p-8 transition-colors duration-300">
      {/* Top Bar / Drawing Selector */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-[#D9CBB1] dark:border-[#2A3759] gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#802C43] dark:text-[#C45D77] uppercase tracking-wider mb-1">
            <span>Drawing {String(activeDrawingIndex + 1).padStart(2, '0')} / {String(drawings.length).padStart(2, '0')}</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#3D5288] dark:text-[#BFB299]">Scale {current.scale}</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#263D78] dark:text-[#EFE6D5] font-semibold">{current.type}</span>
          </div>
          <h4 className="text-xl font-serif-architectural text-[#263D78] dark:text-[#EFE6D5]">
            {current.title}
          </h4>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Drawing switcher buttons */}
          <div className="flex items-center bg-[#DFD2B8] dark:bg-[#1C2845] p-1">
            {drawings.map((dwg, idx) => (
              <button
                key={dwg.id}
                onClick={() => setActiveDrawingIndex(idx)}
                className={`px-3 py-1.5 text-xs font-mono transition-colors whitespace-nowrap cursor-pointer ${
                  activeDrawingIndex === idx
                    ? 'bg-[#263D78] dark:bg-[#EFE6D5] text-[#F3EBDD] dark:text-[#1C2D58] shadow-xs'
                    : 'text-[#3D5288] dark:text-[#BFB299] hover:text-[#263D78] dark:hover:text-[#EFE6D5]'
                }`}
              >
                {dwg.type} {idx + 1}
              </button>
            ))}
          </div>

          {/* Toggle Annotations */}
          <button
            onClick={() => setShowAnnotations(!showAnnotations)}
            className={`px-3 py-1.5 text-xs font-mono flex items-center gap-1.5 border transition-colors cursor-pointer ${
              showAnnotations
                ? 'bg-[#263D78] dark:bg-[#EFE6D5] text-[#F3EBDD] dark:text-[#1C2D58] border-[#263D78] dark:border-[#EFE6D5]'
                : 'bg-transparent text-[#3D5288] dark:text-[#BFB299] border-[#C7B697] dark:border-[#3A4B75] hover:border-[#263D78] dark:hover:border-[#EFE6D5]'
            }`}
            title="Toggle notes & text labels"
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Notes</span>
          </button>

          {/* Toggle Dimensions */}
          <button
            onClick={() => setShowDimensions(!showDimensions)}
            className={`px-3 py-1.5 text-xs font-mono flex items-center gap-1.5 border transition-colors cursor-pointer ${
              showDimensions
                ? 'bg-[#263D78] dark:bg-[#EFE6D5] text-[#F3EBDD] dark:text-[#1C2D58] border-[#263D78] dark:border-[#EFE6D5]'
                : 'bg-transparent text-[#3D5288] dark:text-[#BFB299] border-[#C7B697] dark:border-[#3A4B75] hover:border-[#263D78] dark:hover:border-[#EFE6D5]'
            }`}
            title="Toggle CAD dimension strings"
          >
            <Layers className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Dims</span>
          </button>

          {/* Fullscreen view */}
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 text-xs font-mono border border-[#C7B697] dark:border-[#3A4B75] hover:border-[#263D78] dark:hover:border-[#C45D77] text-[#263D78] dark:text-[#EFE6D5] transition-colors cursor-pointer"
            title="Toggle Expanded View"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Drawing Canvas Area */}
      <div
        data-cursor="zoom"
        className={`relative mt-6 bg-[#F8F3E8] dark:bg-[#101626] border border-[#D9CBB1] dark:border-[#2A3759] overflow-hidden transition-all duration-300 ${
        isFullscreen ? 'h-[640px]' : 'h-[440px]'
      }`}>
        {/* Subtle grid background */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-25 dark:opacity-25"
          style={{
            backgroundImage: `radial-gradient(#3D5288 0.75px, transparent 0.75px)`,
            backgroundSize: '24px 24px'
          }}
        />

        {/* North Arrow / Scale Datum Marker */}
        <div className="absolute top-4 right-4 z-10 flex items-center gap-3 bg-[#E9DFC9]/90 dark:bg-[#18223A]/90 backdrop-blur-xs px-3 py-1.5 border border-[#D9CBB1] dark:border-[#2A3759] text-[11px] font-mono text-[#3D5288] dark:text-[#BFB299]">
          <div className="flex items-center gap-1 text-[#263D78] dark:text-[#EFE6D5] font-semibold">
            <Compass className="w-3.5 h-3.5 text-[#802C43] dark:text-[#C45D77]" />
            <span>N</span>
          </div>
          <span aria-hidden="true" className="text-[#C7B697] dark:text-[#3A4B75]">|</span>
          <div className="flex items-center gap-1.5">
            <div className="w-12 h-1 bg-[#263D78] dark:bg-[#EFE6D5] relative">
              <span className="absolute -top-3.5 left-0 text-[9px]">0</span>
              <span className="absolute -top-3.5 right-0 text-[9px]">5m</span>
            </div>
          </div>
        </div>

        {/* SVG Drawing Renderer based on svgType */}
        <div className="w-full h-full flex items-center justify-center p-4">
          {current.svgType === 'ground-floor' && (
            <svg viewBox="0 0 800 500" className="w-full h-full max-h-full stroke-[#263D78] dark:stroke-[#EFE6D5] fill-none font-mono">
              {/* Outer structural masonry envelope */}
              <rect x="100" y="60" width="600" height="380" strokeWidth="2.5" className="fill-[#F3EBDD] dark:fill-[#141C30]" />
              
              {/* Interior structural partitions */}
              <line x1="280" y1="60" x2="280" y2="300" strokeWidth="2" strokeDasharray="none" />
              <line x1="280" y1="360" x2="280" y2="440" strokeWidth="2" />
              <line x1="100" y1="260" x2="280" y2="260" strokeWidth="1.5" />
              <line x1="480" y1="60" x2="480" y2="440" strokeWidth="2" />
              <line x1="480" y1="220" x2="700" y2="220" strokeWidth="1.5" />

              {/* Central Courtyard / Light Basin */}
              <rect x="320" y="110" width="120" height="220" strokeWidth="1.5" strokeDasharray="4 3" className="fill-[#E9DFC9] dark:fill-[#1C2845]" />
              <circle cx="380" cy="220" r="30" strokeWidth="1" strokeDasharray="3 3" className="stroke-[#802C43] dark:stroke-[#C45D77]" />

              {/* Architectural Columns */}
              {[
                [100, 60], [280, 60], [480, 60], [700, 60],
                [100, 260], [280, 260], [480, 220], [700, 220],
                [100, 440], [280, 440], [480, 440], [700, 440]
              ].map(([cx, cy], i) => (
                <rect key={i} x={cx - 6} y={cy - 6} width="12" height="12" className="fill-[#263D78] dark:fill-[#EFE6D5]" />
              ))}

              {/* Door Swings */}
              <path d="M 280 300 A 60 60 0 0 1 340 360" strokeWidth="1" strokeDasharray="2 2" className="stroke-[#5C6D9B] dark:stroke-[#988C75]" />
              <line x1="280" y1="360" x2="340" y2="360" strokeWidth="1" />

              <path d="M 480 340 A 50 50 0 0 1 530 390" strokeWidth="1" strokeDasharray="2 2" className="stroke-[#5C6D9B] dark:stroke-[#988C75]" />
              <line x1="480" y1="390" x2="530" y2="390" strokeWidth="1" />

              {/* Furniture / Seating layout representations */}
              <rect x="130" y="90" width="110" height="50" strokeWidth="1" className="stroke-[#5C6D9B] fill-[#F8F3E8] dark:fill-[#18223A]" />
              <circle cx="185" cy="115" r="14" strokeWidth="0.75" className="stroke-[#802C43] dark:stroke-[#C45D77]" />
              <rect x="520" y="90" width="140" height="90" strokeWidth="1" className="stroke-[#5C6D9B]" />
              <line x1="520" y1="135" x2="660" y2="135" strokeWidth="0.5" strokeDasharray="2 2" />

              {/* Stepped Water Basin Lines */}
              <line x1="330" y1="130" x2="430" y2="130" strokeWidth="0.8" className="stroke-[#3D5288] dark:stroke-[#BFB299]" />
              <line x1="330" y1="150" x2="430" y2="150" strokeWidth="0.8" className="stroke-[#3D5288] dark:stroke-[#BFB299]" />
              <line x1="330" y1="170" x2="430" y2="170" strokeWidth="0.8" className="stroke-[#3D5288] dark:stroke-[#BFB299]" />

              {/* CAD Dimensions Strings */}
              {showDimensions && (
                <g className="text-[10px] fill-[#3D5288] dark:fill-[#BFB299] stroke-[#5C6D9B] dark:stroke-[#6378AD]">
                  {/* Top horizontal dimension */}
                  <line x1="100" y1="35" x2="700" y2="35" strokeWidth="0.75" />
                  <line x1="100" y1="28" x2="100" y2="42" strokeWidth="0.75" />
                  <line x1="280" y1="28" x2="280" y2="42" strokeWidth="0.75" />
                  <line x1="480" y1="28" x2="480" y2="42" strokeWidth="0.75" />
                  <line x1="700" y1="28" x2="700" y2="42" strokeWidth="0.75" />
                  <text x="180" y="26" textAnchor="middle" stroke="none">5,400 mm</text>
                  <text x="380" y="26" textAnchor="middle" stroke="none">6,000 mm</text>
                  <text x="590" y="26" textAnchor="middle" stroke="none">6,600 mm</text>

                  {/* Left vertical dimension */}
                  <line x1="60" y1="60" x2="60" y2="440" strokeWidth="0.75" />
                  <line x1="53" y1="60" x2="67" y2="60" strokeWidth="0.75" />
                  <line x1="53" y1="260" x2="67" y2="260" strokeWidth="0.75" />
                  <line x1="53" y1="440" x2="67" y2="440" strokeWidth="0.75" />
                  <text x="45" y="165" textAnchor="middle" transform="rotate(-90 45 165)" stroke="none">6,000 mm</text>
                  <text x="45" y="355" textAnchor="middle" transform="rotate(-90 45 355)" stroke="none">5,400 mm</text>
                </g>
              )}

              {/* Text Annotations */}
              {showAnnotations && (
                <g className="text-[11px] fill-[#263D78] dark:fill-[#EFE6D5]">
                  <text x="190" y="180" textAnchor="middle" fontWeight="500">ZONE A: RECEPTION</text>
                  <text x="190" y="196" textAnchor="middle" className="text-[9px] fill-[#3D5288] dark:fill-[#BFB299]">LVL ± 0.00</text>

                  <text x="380" y="235" textAnchor="middle" fontWeight="500" className="fill-[#802C43] dark:fill-[#C45D77]">INTERNAL COURT / WATER BASIN</text>
                  <text x="380" y="250" textAnchor="middle" className="text-[9px] fill-[#3D5288] dark:fill-[#BFB299]">LVL - 0.450 (SUNKEN)</text>

                  <text x="590" y="130" textAnchor="middle" fontWeight="500">ZONE B: PRIMARY LOUNGE</text>
                  <text x="590" y="146" textAnchor="middle" className="text-[9px] fill-[#3D5288] dark:fill-[#BFB299]">LVL ± 0.00 · TEAK DECK</text>

                  <text x="590" y="330" textAnchor="middle" fontWeight="500">ZONE C: THERAPY VAULTS</text>
                  <text x="590" y="346" textAnchor="middle" className="text-[9px] fill-[#3D5288] dark:fill-[#BFB299]">LVL + 0.150 · LIME TADELAKT</text>
                </g>
              )}

              {/* Structural Section Cut Line Indicator */}
              <line x1="70" y1="240" x2="730" y2="240" strokeWidth="1" strokeDasharray="10 4 2 4" className="stroke-[#802C43] dark:stroke-[#C45D77]" />
              <polygon points="70,240 85,233 85,247" className="fill-[#802C43] dark:fill-[#C45D77]" />
              <polygon points="730,240 715,233 715,247" className="fill-[#802C43] dark:fill-[#C45D77]" />
              <text x="745" y="244" className="fill-[#802C43] dark:fill-[#C45D77] text-[10px] font-bold">A</text>
              <text x="55" y="244" className="fill-[#802C43] dark:fill-[#C45D77] text-[10px] font-bold">A</text>
            </svg>
          )}

          {current.svgType === 'section-cut' && (
            <svg viewBox="0 0 800 480" className="w-full h-full max-h-full stroke-[#263D78] dark:stroke-[#EFE6D5] fill-none font-mono">
              {/* Ground & Plinth Substructure */}
              <rect x="60" y="380" width="680" height="50" strokeWidth="2" className="fill-[#D9CBB1] dark:fill-[#1C2845]" />
              <line x1="60" y1="380" x2="740" y2="380" strokeWidth="2.5" />
              {/* Earth hatching */}
              {Array.from({ length: 22 }).map((_, i) => (
                <line key={i} x1={80 + i * 30} y1="390" x2={95 + i * 30} y2="420" strokeWidth="0.75" className="stroke-[#3D5288] dark:stroke-[#6378AD]" />
              ))}

              {/* Foundation Piers */}
              <rect x="120" y="340" width="60" height="40" strokeWidth="2" className="fill-[#263D78] dark:fill-[#EFE6D5]" />
              <rect x="360" y="340" width="60" height="40" strokeWidth="2" className="fill-[#263D78] dark:fill-[#EFE6D5]" />
              <rect x="600" y="340" width="60" height="40" strokeWidth="2" className="fill-[#263D78] dark:fill-[#EFE6D5]" />

              {/* Vertical Load-Bearing Walls */}
              <rect x="120" y="120" width="60" height="220" strokeWidth="2" className="fill-[#F3EBDD] dark:fill-[#18223A]" />
              <rect x="600" y="120" width="60" height="220" strokeWidth="2" className="fill-[#F3EBDD] dark:fill-[#18223A]" />

              {/* Central Vaulted Arch Structure */}
              <path d="M 180 160 Q 390 60 600 160" strokeWidth="2.5" className="fill-none" />
              <path d="M 180 140 Q 390 40 600 140" strokeWidth="1.5" strokeDasharray="3 3" />

              {/* Skylight opening at crown */}
              <rect x="360" y="38" width="60" height="25" strokeWidth="1.5" className="stroke-[#802C43] dark:stroke-[#C45D77] fill-[#F8F3E8] dark:fill-[#101626]" />
              <line x1="360" y1="38" x2="420" y2="63" strokeWidth="0.75" className="stroke-[#802C43] dark:stroke-[#C45D77]" />

              {/* Sunken Thermal Water Basin */}
              <path d="M 310 340 L 310 380 L 470 380 L 470 340 Z" strokeWidth="2" className="fill-[#263D78]/15 dark:fill-[#3D5288]/30" />
              <line x1="315" y1="360" x2="465" y2="360" strokeWidth="1" strokeDasharray="4 2" className="stroke-[#263D78] dark:stroke-[#8AA4EA]" />

              {/* Air & Daylight vectors */}
              <path d="M 390 65 L 390 320" strokeWidth="1" strokeDasharray="5 3" className="stroke-[#802C43] dark:stroke-[#C45D77]" />
              <polygon points="390,325 386,315 394,315" className="fill-[#802C43] dark:fill-[#C45D77]" />

              {/* Human Silhouette for Architectural Scale */}
              <g className="stroke-none fill-[#263D78] dark:fill-[#EFE6D5]">
                {/* Standing person */}
                <circle cx="230" cy="275" r="5" />
                <rect x="227" y="282" width="6" height="30" rx="2" />
                <line x1="228" y1="312" x2="228" y2="340" strokeWidth="2" className="stroke-[#263D78] dark:stroke-[#EFE6D5]" />
                <line x1="232" y1="312" x2="232" y2="340" strokeWidth="2" className="stroke-[#263D78] dark:stroke-[#EFE6D5]" />
              </g>

              {/* Dimension heights */}
              {showDimensions && (
                <g className="text-[10px] fill-[#3D5288] dark:fill-[#BFB299] stroke-[#5C6D9B] dark:stroke-[#6378AD]">
                  <line x1="80" y1="340" x2="80" y2="60" strokeWidth="0.75" />
                  <line x1="73" y1="340" x2="87" y2="340" strokeWidth="0.75" />
                  <line x1="73" y1="60" x2="87" y2="60" strokeWidth="0.75" />
                  <text x="65" y="200" textAnchor="middle" transform="rotate(-90 65 200)" stroke="none">CLEAR HEIGHT: 4,800 mm</text>

                  <line x1="700" y1="340" x2="700" y2="380" strokeWidth="0.75" />
                  <line x1="693" y1="340" x2="707" y2="340" strokeWidth="0.75" />
                  <line x1="693" y1="380" x2="707" y2="380" strokeWidth="0.75" />
                  <text x="720" y="365" stroke="none">POOL DEPTH: 450 mm</text>
                </g>
              )}

              {/* Annotations */}
              {showAnnotations && (
                <g className="text-[11px] fill-[#263D78] dark:fill-[#EFE6D5]">
                  <text x="390" y="28" textAnchor="middle" className="text-[10px] fill-[#802C43] dark:fill-[#C45D77] font-semibold">ZENITHAL SKYLIGHT REGISTER</text>
                  <text x="210" y="115" className="text-[10px]">ACOUSTIC LIME GROIN VAULT</text>
                  <text x="390" y="375" textAnchor="middle" className="text-[10px] fill-[#263D78] dark:fill-[#8AA4EA]">HEATED HYDROTHERAPY BASIN (36°C)</text>
                  <text x="630" y="115" className="text-[10px]">HISTORIC 600mm SANDSTONE MASONRY</text>
                </g>
              )}
            </svg>
          )}

          {current.svgType === 'zoning-flow' && (
            <svg viewBox="0 0 800 480" className="w-full h-full max-h-full stroke-[#263D78] dark:stroke-[#EFE6D5] fill-none font-mono">
              {/* Site Outline */}
              <polygon points="100,80 680,100 650,420 120,400" strokeWidth="2" className="fill-[#F3EBDD] dark:fill-[#18223A]" />

              {/* Microclimate Wind Flow Arrow */}
              <path d="M 60 240 C 220 200, 480 320, 720 260" strokeWidth="3" strokeDasharray="6 4" className="stroke-[#263D78] dark:stroke-[#8AA4EA]" />
              <polygon points="720,260 705,252 705,268" className="fill-[#263D78] dark:fill-[#8AA4EA]" />

              {/* Afternoon Solar Arc */}
              <path d="M 120 70 A 340 180 0 0 1 680 90" strokeWidth="2" strokeDasharray="3 3" className="stroke-[#802C43] dark:stroke-[#C45D77]" />
              <circle cx="280" cy="55" r="12" className="fill-[#E9DFC9] dark:fill-[#341A26] stroke-[#802C43] dark:stroke-[#C45D77]" />
              <circle cx="540" cy="65" r="10" className="fill-[#E9DFC9] dark:fill-[#341A26] stroke-[#802C43] dark:stroke-[#C45D77]" />

              {/* Zonal Volumes */}
              <circle cx="260" cy="240" r="85" strokeWidth="1.5" className="stroke-[#802C43] dark:stroke-[#C45D77] fill-[#802C43]/10 dark:fill-[#C45D77]/15" />
              <rect x="380" y="160" width="180" height="180" strokeWidth="1.5" className="stroke-[#3D5288] dark:stroke-[#BFB299] fill-[#D9CBB1]/45 dark:fill-[#2A3759]/50" />

              {/* Acoustic Buffer Perimeter */}
              <path d="M 120 370 Q 380 430 630 390" strokeWidth="6" strokeDasharray="2 6" className="stroke-[#3D5288] dark:stroke-[#8AA4EA]" />

              {showAnnotations && (
                <g className="text-[11px] fill-[#263D78] dark:fill-[#EFE6D5]">
                  <text x="260" y="235" textAnchor="middle" fontWeight="600" className="fill-[#802C43] dark:fill-[#C45D77]">CORE PUBLIC OTLA</text>
                  <text x="260" y="252" textAnchor="middle" className="text-[9px] fill-[#3D5288] dark:fill-[#BFB299]">High Footfall · Stepped Seating</text>

                  <text x="470" y="240" textAnchor="middle" fontWeight="600">FOOD ARTISAN ARCADE</text>
                  <text x="470" y="257" textAnchor="middle" className="text-[9px] fill-[#3D5288] dark:fill-[#BFB299]">Direct Service Back-Lane</text>

                  <text x="390" y="420" textAnchor="middle" className="text-[10px] fill-[#1C2D58] dark:fill-[#DDD1BC]">PERIMETER VEGETATIVE ACOUSTIC BUFFER</text>
                  <text x="640" y="280" className="text-[10px] fill-[#263D78] dark:fill-[#8AA4EA]">PREVAILING SW MONSOON WIND</text>
                  <text x="280" y="35" textAnchor="middle" className="text-[10px] fill-[#802C43] dark:fill-[#C45D77]">14:00 PEAK SOLAR RADIATION</text>
                </g>
              )}
            </svg>
          )}

          {current.svgType === 'furniture-joinery' && (
            <svg viewBox="0 0 800 480" className="w-full h-full max-h-full stroke-[#263D78] dark:stroke-[#EFE6D5] fill-none font-mono">
              {/* Orthographic Lounge Chair Views */}
              {/* Front Profile */}
              <rect x="100" y="160" width="18" height="200" strokeWidth="1.5" />
              <rect x="242" y="160" width="18" height="200" strokeWidth="1.5" />
              <path d="M 90 220 L 270 220" strokeWidth="2" />
              {/* Paper cord weave representation */}
              {Array.from({ length: 14 }).map((_, i) => (
                <line key={i} x1={118 + i * 9} y1="220" x2={118 + i * 9} y2="280" strokeWidth="0.8" className="stroke-[#802C43] dark:stroke-[#C45D77]" />
              ))}

              {/* Exploded Joint Detail on Right */}
              <rect x="440" y="180" width="140" height="28" strokeWidth="1.5" className="fill-[#F3EBDD] dark:fill-[#18223A]" />
              {/* Tenon tongue */}
              <rect x="580" y="186" width="35" height="16" strokeWidth="1.5" className="fill-[#D9CBB1] dark:fill-[#2A3759]" />
              {/* Mortise socket in vertical leg */}
              <rect x="650" y="130" width="30" height="140" strokeWidth="1.5" className="fill-[#F3EBDD] dark:fill-[#18223A]" />
              <rect x="650" y="186" width="16" height="16" strokeWidth="1" strokeDasharray="2 2" className="stroke-[#802C43] dark:stroke-[#C45D77]" />
              {/* Alignment Burgundy-Brass Dowel */}
              <circle cx="658" cy="194" r="5" strokeWidth="1.5" className="fill-[#A04A60] stroke-[#263D78] dark:stroke-[#EFE6D5]" />

              {/* Exploded alignment leader lines */}
              <line x1="615" y1="194" x2="650" y2="194" strokeWidth="1" strokeDasharray="3 3" className="stroke-[#802C43] dark:stroke-[#C45D77]" />

              {showAnnotations && (
                <g className="text-[11px] fill-[#263D78] dark:fill-[#EFE6D5]">
                  <text x="180" y="140" textAnchor="middle" fontWeight="600">ELEVATION 1:10</text>
                  <text x="560" y="100" textAnchor="middle" fontWeight="600">EXPLODED MORTISE-AND-TENON DETAIL 1:5</text>
                  <text x="440" y="240" className="text-[10px] fill-[#3D5288] dark:fill-[#BFB299]">WHITE OAK HORIZONTAL STRETCHER</text>
                  <text x="658" y="300" textAnchor="middle" className="text-[10px] fill-[#802C43] dark:fill-[#C45D77]">SOLID DOWEL LOCKING PIN (Ø10mm)</text>
                  <text x="180" y="315" textAnchor="middle" className="text-[9px] fill-[#802C43] dark:fill-[#C45D77]">3-PLY DANISH PAPER CORD WEAVE</text>
                </g>
              )}
            </svg>
          )}

          {current.svgType === 'spatial-wireframe' && (
            <svg viewBox="0 0 800 480" className="w-full h-full max-h-full stroke-[#263D78] dark:stroke-[#EFE6D5] fill-none font-mono">
              {/* UI Layout Grid Spec */}
              <rect x="80" y="50" width="640" height="380" strokeWidth="1.5" className="fill-[#F3EBDD] dark:fill-[#18223A]" />
              {/* Header Bar */}
              <line x1="80" y1="100" x2="720" y2="100" strokeWidth="1.2" />
              {/* Left Sidebar */}
              <line x1="240" y1="100" x2="240" y2="430" strokeWidth="1.2" />
              {/* Right Properties Panel */}
              <line x1="560" y1="100" x2="560" y2="430" strokeWidth="1.2" />

              {/* Moodboard Canvas Cards in Center */}
              <rect x="270" y="130" width="120" height="120" strokeWidth="1" className="stroke-[#3D5288] fill-[#E9DFC9] dark:fill-[#1C2845]" />
              <rect x="410" y="130" width="120" height="80" strokeWidth="1" className="stroke-[#3D5288] fill-[#E9DFC9] dark:fill-[#1C2845]" />
              <rect x="270" y="270" width="260" height="130" strokeWidth="1" className="stroke-[#3D5288] fill-[#E9DFC9] dark:fill-[#1C2845]" />

              {/* Data Rows in Left Sidebar */}
              {Array.from({ length: 6 }).map((_, i) => (
                <g key={i}>
                  <rect x="100" y={130 + i * 40} width="120" height="24" strokeWidth="0.8" className="stroke-[#C7B697] dark:stroke-[#3A4B75]" />
                  <circle cx="112" cy={142 + i * 40} r="4" className="fill-[#802C43] dark:fill-[#C45D77] stroke-none" />
                </g>
              ))}

              {showAnnotations && (
                <g className="text-[11px] fill-[#263D78] dark:fill-[#EFE6D5]">
                  <text x="160" y="80" fontWeight="600">MATERIA SPEC MATRIX v1.0</text>
                  <text x="100" y="120" className="text-[9px] fill-[#3D5288] dark:fill-[#BFB299]">TAXONOMY TREE (240+ SPECIMENS)</text>
                  <text x="400" y="260" textAnchor="middle" className="text-[10px] fill-[#802C43] dark:fill-[#C45D77]">2D TACTILE MOODBOARD VIEWPORT</text>
                  <text x="640" y="130" textAnchor="middle" className="text-[9px] fill-[#3D5288] dark:fill-[#BFB299]">LUSTER & KELVIN CONTROLS</text>
                </g>
              )}
            </svg>
          )}
        </div>

        {/* Bottom Drawing Meta Caption */}
        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] font-mono text-[#3D5288] dark:text-[#BFB299] bg-[#E9DFC9]/90 dark:bg-[#18223A]/90 backdrop-blur-xs px-3 py-1.5 border border-[#D9CBB1] dark:border-[#2A3759]">
          <span className="truncate max-w-[80%]">{current.caption}</span>
          <span className="hidden sm:inline shrink-0 text-[#802C43] dark:text-[#C45D77]">{projectTitle}</span>
        </div>
      </div>
    </div>
  );
};
