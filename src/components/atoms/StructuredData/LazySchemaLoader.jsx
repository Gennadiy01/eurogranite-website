import { lazy, Suspense, memo } from 'react';

// Lazy load Schema компонентів для покращення performance
const OrganizationSchema = lazy(() => import('./OrganizationSchema'));
const LocalBusinessSchema = lazy(() => import('./LocalBusinessSchema'));
const ProductSchema = lazy(() => import('./ProductSchema'));
const BreadcrumbSchema = lazy(() => import('./BreadcrumbSchema'));

const LazySchemaLoader = memo(({ schemas = [], currentLanguage, pagePath }) => {
  return (
    <Suspense fallback={null}>
      {schemas.includes('organization') && (
        <OrganizationSchema currentLanguage={currentLanguage} />
      )}
      {schemas.includes('localbusiness') && (
        <LocalBusinessSchema currentLanguage={currentLanguage} />
      )}
      {schemas.includes('product') && (
        <ProductSchema currentLanguage={currentLanguage} />
      )}
      {schemas.includes('breadcrumb') && (
        <BreadcrumbSchema currentLanguage={currentLanguage} pagePath={pagePath} />
      )}
    </Suspense>
  );
});

LazySchemaLoader.displayName = 'LazySchemaLoader';

export default LazySchemaLoader;