import React from 'react';
import { Skeleton } from 'antd';

export const Loading = ({ className }: { className?: string }) => {
    return <Skeleton active className={className} />;
};
