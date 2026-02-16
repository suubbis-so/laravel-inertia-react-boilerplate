import { createInertiaApp } from '@inertiajs/react';
import { configureEcho } from '@laravel/echo-react';
import i18n from 'i18next';

import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { initReactI18next } from 'react-i18next';
import { initializeTheme } from './hooks/use-appearance';

import '../css/app.css';

configureEcho({
    broadcaster: 'reverb',
});

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    resolve: (name) =>
        resolvePageComponent(
            `./pages/${name}.tsx`,
            import.meta.glob('./pages/**/*.tsx'),
        ),
    setup({ el, App, props }) {
        const initialProps = props.initialPage.props as unknown as {
            locale: string;
            translations: Record<string, string>;
        };

        i18n.use(initReactI18next).init({
            resources: {
                [initialProps.locale]: {
                    translation: initialProps.translations,
                },
            },
            lng: initialProps.locale,
            fallbackLng: 'en',
            interpolation: {
                escapeValue: false,
            },
        });

        const root = createRoot(el);

        root.render(
            <StrictMode>
                <App {...props} />
            </StrictMode>,
        );
    },
    progress: {
        color: '#4B5563',
    },
});

// This will set light / dark mode on load...
initializeTheme();
