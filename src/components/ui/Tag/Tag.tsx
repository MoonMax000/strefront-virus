import clsx from 'clsx';
import React from 'react';

type TagType = 'red' | 'moonless' | 'purple';

interface TagProps {
  type: TagType;
  children: React.ReactNode;
  className?: string;
}

interface TagStyle {
  backgroundColor: string;
}

const tagStyles: Record<TagType, TagStyle> = {
  red: {
    backgroundColor: 'bg-red',
  },
  moonless: {
    backgroundColor: 'bg-moonlessNight',
  },
  purple: { backgroundColor: 'bg-regaliaPurple' },
};

export const Tag: React.FC<TagProps> = ({ type, children, className }) => {
  const { backgroundColor } = tagStyles[type];

  return (
    <div className={clsx(`rounded-[4px] px-2 py-[2px] `, backgroundColor, className)}>
      {children}
    </div>
  );
};
