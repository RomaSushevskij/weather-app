import { memo } from 'react';

import style from './UserInfo.module.scss';

import { Button } from 'components/Button';
import { Nullable } from 'types';

type UserInfoProps = {
  email: Nullable<string>;
  name: Nullable<string>;
  onClickBtn?: () => void;
};
export const UserInfo = memo(({ email, name, onClickBtn }: UserInfoProps) => {
  return (
    <div className={style.userInfo}>
      <p>Account Google</p>
      <p>{name}</p>
      <p>{email}</p>
      <div className={style.signOutBtn}>
        <Button onClick={onClickBtn}>Sign out</Button>
      </div>
    </div>
  );
});
