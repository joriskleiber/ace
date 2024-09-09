import React, { FC } from 'react';
import { IconAlertCircle } from '@tabler/icons-react';

export const NotificationsContainer: FC<{ children?: React.ReactNode }> = ({ children }) => (
    <div className="absolute w-full h-full flex flex-row justify-center z-40 pointer-events-none">
        {children}
    </div>
);

export const Notification: FC<{ children?: React.ReactNode }> = ({ children }) => (
    <div className="absolute bg-navy-lighter flex flex-row rounded-md shadow-md drop">
        <div className="h-full bg-navy-lightest px-2.5 py-2.5 rounded-l-md">
            <IconAlertCircle size={32} strokeWidth={1.5} className="text-teal" />
        </div>

        <div className="flex flex-row items-center px-5">
            {children}
        </div>
    </div>
);
