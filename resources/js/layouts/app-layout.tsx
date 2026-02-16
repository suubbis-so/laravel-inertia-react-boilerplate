import { TooltipProvider } from '@/components/ui/tooltip';
import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import type { AppLayoutProps } from '@/types';

export default ({ children, breadcrumbs, ...props }: AppLayoutProps) => (
    <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
        <TooltipProvider>
            <div className="z-50">{children}</div>
        </TooltipProvider>
    </AppLayoutTemplate>
);
