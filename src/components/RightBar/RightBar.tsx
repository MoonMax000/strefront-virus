'use client';
import React, { Dispatch, FC, SetStateAction } from 'react';
import QR from './icons/qr-gradient.svg';
import Cross from './icons/cross.svg';

interface Props {
  isCollapsed: boolean;
  setIsCollapsed: Dispatch<SetStateAction<boolean>>;
}

const RightBarButton: FC<Props> = ({ isCollapsed, setIsCollapsed }) => {
  const toogleOpen = () => {
    setIsCollapsed((prev) => !prev);
  };
  return (
    <div className='cursor-pointer w-fit' onClick={toogleOpen}>
      {isCollapsed ? <Cross /> : <QR />}
    </div>
  );
};

export default RightBarButton;
