import SelectTheme from './SelectTheme';

const Header = () => {
  return (
    <header className='app-header'>
      {/* <div className='mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-4'>
        <a href='/' className='text-lg font-bold tracking-normal'>
          Тренажер Собеседований
        </a>
        <SelectTheme />
      </div> */}
      <div className='mx-auto flex max-w-6xl items-center justify-between gap-2 px-4 py-4 sm:gap-6 sm:px-5'>
        <a
          href='./'
          className='text-base font-bold tracking-normal sm:text-lg'>
          Тренажер Собеседований
        </a>
        <SelectTheme />
      </div>
    </header>
  );
};

export default Header;
