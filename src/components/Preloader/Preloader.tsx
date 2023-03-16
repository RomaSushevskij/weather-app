import { memo } from 'react';

import style from './Preloader.module.scss';

import sputnikIcon from 'assets/sputnik.svg';

export const Preloader = memo(() => {
  return (
    <div className={style.preloader}>
      <div className={style.icon}>
        <img src={sputnikIcon} alt="Sputnik" />
      </div>
    </div>
  );
});
