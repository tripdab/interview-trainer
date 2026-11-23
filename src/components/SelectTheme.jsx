import { useEffect, useRef, useState } from 'react';

const THEME_KEY = 'react-trainer:theme';

const THEME_OPTIONS = [
  { value: 'system', label: 'Системная' },
  { value: 'light', label: 'Светлая' },
  { value: 'dark', label: 'Тёмная' },
];

function getInitialThemeMode() {
  return localStorage.getItem(THEME_KEY) || 'system';
}

function getSystemPrefersDark() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

const SelectTheme = () => {
  const [themeMode, setThemeMode] = useState(getInitialThemeMode);
  const [systemPrefersDark, setSystemPrefersDark] = useState(
    getSystemPrefersDark,
  );
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Изменение темы страницы на основе состояния themeMode или системной темы
  useEffect(() => {
    const shouldUseDarkTheme =
      themeMode === 'dark' ||
      (themeMode === 'system' && systemPrefersDark);
    document.documentElement.classList.toggle(
      'dark',
      shouldUseDarkTheme,
    );

    localStorage.setItem(THEME_KEY, themeMode);
  }, [themeMode, systemPrefersDark]);

  // Прослушка изменения системной темы
  useEffect(() => {
    const mediaQuery = window.matchMedia(
      '(prefers-color-scheme: dark)',
    );
    const handleChange = (event) =>
      setSystemPrefersDark(event.matches);

    mediaQuery.addEventListener('change', handleChange);

    return () =>
      mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Закрытие меню при клике вне компонента или нажатии Escape
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const currentLabel =
    THEME_OPTIONS.find((option) => option.value === themeMode)
      ?.label || 'Системная';

  return (
    <div ref={dropdownRef} className='relative inline-block'>
      <button
        type='button'
        aria-haspopup='listbox'
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
        className='flex shrink-0 cursor-pointer items-center gap-2 rounded-full border border-line bg-transparent px-3 py-1.5 text-sm font-medium outline-none transition-colors hover:border-ink sm:gap-3 sm:py-2 sm:pl-4 sm:pr-3.5 sm:text-base dark:border-zinc-700 dark:hover:border-paper'>
        <span>{currentLabel}</span>

        <svg
          className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
          strokeWidth='2'>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M19 9l-7 7-7-7'
          />
        </svg>
      </button>

      {isOpen && (
        <ul
          role='listbox'
          className='absolute right-0 z-50 mt-2 w-36 overflow-hidden rounded-2xl border border-line bg-white py-1 shadow-lg dark:border-zinc-700 dark:bg-zinc-900'>
          {THEME_OPTIONS.map((option) => {
            const isSelected = option.value === themeMode;
            return (
              <li
                key={option.value}
                role='option'
                aria-selected={isSelected}>
                <button
                  type='button'
                  onClick={() => {
                    setThemeMode(option.value);
                    setIsOpen(false);
                  }}
                  className={`flex w-full cursor-pointer items-center justify-between px-4 py-2 text-left text-sm transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800 ${
                    isSelected ? 'font-semibold' : 'font-normal'
                  }`}>
                  <span>{option.label}</span>
                  {isSelected && <span>✓</span>}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default SelectTheme;
