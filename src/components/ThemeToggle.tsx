import React from 'react';
import { useTheme } from '../context/ThemeContext';

interface Props {
  className?: string;
}

export const ThemeToggle: React.FC<Props> = ({ className = '' }) => {
  const { isDark, setTheme } = useTheme();

  return (
    <div
      role="group"
      aria-label="Color theme switcher"
      className={`inline-flex items-center border border-[#C7B697] dark:border-[#3A4B75] bg-[#F3EBDD]/90 dark:bg-[#18223A]/90 backdrop-blur-md p-0.5 transition-colors duration-300 shrink-0 ${className}`}
    >
      <button
        type="button"
        onClick={() => setTheme('light')}
        aria-pressed={!isDark}
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.14em] transition-all duration-200 whitespace-nowrap cursor-pointer ${
          !isDark
            ? 'bg-[#263D78] text-[#F3EBDD] shadow-2xs'
            : 'text-[#BFB299] hover:text-[#EFE6D5]'
        }`}
      >
        <span>LIGHT MODE</span>
        <span aria-hidden="true" className={!isDark ? 'text-[#E598AC]' : 'opacity-70'}>
          ☀
        </span>
      </button>

      <button
        type="button"
        onClick={() => setTheme('dark')}
        aria-pressed={isDark}
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.14em] transition-all duration-200 whitespace-nowrap cursor-pointer ${
          isDark
            ? 'bg-[#EFE6D5] text-[#1C2D58] shadow-2xs'
            : 'text-[#3D5288] hover:text-[#802C43]'
        }`}
      >
        <span>DARK MODE</span>
        <span aria-hidden="true" className={isDark ? 'text-[#802C43]' : 'opacity-70'}>
          ☾
        </span>
      </button>
    </div>
  );
};
