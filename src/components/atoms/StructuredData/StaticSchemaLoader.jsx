import React from 'react'
import OrganizationSchema from './OrganizationSchema'
import LocalBusinessSchema from './LocalBusinessSchema'
import ProductSchema from './ProductSchema'

const StaticSchemaLoader = ({ schemas = [], currentLanguage, pagePath }) => {
  return (
    <>
      {schemas.includes('organization') && (
        <OrganizationSchema currentLanguage={currentLanguage} />
      )}
      {schemas.includes('localbusiness') && (
        <LocalBusinessSchema currentLanguage={currentLanguage} />
      )}
      {schemas.includes('product') && (
        <ProductSchema currentLanguage={currentLanguage} pagePath={pagePath} />
      )}
    </>
  )
}

StaticSchemaLoader.displayName = 'StaticSchemaLoader'

export default StaticSchemaLoader