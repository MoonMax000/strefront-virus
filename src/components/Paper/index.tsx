import clsx from 'clsx';
import React, { FC } from 'react';

const Paper: FC<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = ({className, children, ...rest}) => {
    return (
        <div className={clsx(className, 'p-4 rounded-xl bg-blackedGray')}>
            {children}
        </div>
    );
};

export default Paper;