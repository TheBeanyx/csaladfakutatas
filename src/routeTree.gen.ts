/* eslint-disable */
// @ts-nocheck
// noinspection JSUnusedGlobalSymbols
import { Route as rootRouteImport } from './routes/__root'
import { Route as SzolgaltatasokRouteImport } from './routes/szolgaltatasok'
import { Route as RolamRouteImport } from './routes/rolam'
import { Route as KapcsolatRouteImport } from './routes/kapcsolat'
import { Route as IdopontRouteImport } from './routes/idopont'
import { Route as CsaladfaRouteImport } from './routes/csaladfa'
import { Route as AuthRouteImport } from './routes/auth'
import { Route as IndexRouteImport } from './routes/index'
import { Route as AuthenticatedRouteImport } from './routes/_authenticated'
import { Route as AuthenticatedAdminRouteImport } from './routes/_authenticated/_admin'
import { Route as AuthenticatedFiokRouteImport } from './routes/_authenticated/fiok'
import { Route as AuthenticatedUzenetekRouteImport } from './routes/_authenticated/uzenetek'
import { Route as AuthenticatedAdminIndexRouteImport } from './routes/_authenticated/_admin/index'
import { Route as AuthenticatedAdminIdopontokRouteImport } from './routes/_authenticated/_admin/idopontok'
import { Route as AuthenticatedAdminUzenetekRouteImport } from './routes/_authenticated/_admin/uzenetek'
import { Route as AuthenticatedAdminCsaladfaRouteImport } from './routes/_authenticated/_admin/csaladfa'

const SzolgaltatasokRoute = SzolgaltatasokRouteImport.update({ id: '/szolgaltatasok', path: '/szolgaltatasok', getParentRoute: () => rootRouteImport } as any)
const RolamRoute = RolamRouteImport.update({ id: '/rolam', path: '/rolam', getParentRoute: () => rootRouteImport } as any)
const KapcsolatRoute = KapcsolatRouteImport.update({ id: '/kapcsolat', path: '/kapcsolat', getParentRoute: () => rootRouteImport } as any)
const IdopontRoute = IdopontRouteImport.update({ id: '/idopont', path: '/idopont', getParentRoute: () => rootRouteImport } as any)
const CsaladfaRoute = CsaladfaRouteImport.update({ id: '/csaladfa', path: '/csaladfa', getParentRoute: () => rootRouteImport } as any)
const AuthRoute = AuthRouteImport.update({ id: '/auth', path: '/auth', getParentRoute: () => rootRouteImport } as any)
const IndexRoute = IndexRouteImport.update({ id: '/', path: '/', getParentRoute: () => rootRouteImport } as any)
const AuthenticatedRoute = AuthenticatedRouteImport.update({ id: '/_authenticated', getParentRoute: () => rootRouteImport } as any)
const AuthenticatedAdminRoute = AuthenticatedAdminRouteImport.update({ id: '/_admin', getParentRoute: () => AuthenticatedRoute } as any)
const AuthenticatedFiokRoute = AuthenticatedFiokRouteImport.update({ id: '/fiok', path: '/fiok', getParentRoute: () => AuthenticatedRoute } as any)
const AuthenticatedUzenetekRoute = AuthenticatedUzenetekRouteImport.update({ id: '/uzenetek', path: '/uzenetek', getParentRoute: () => AuthenticatedRoute } as any)
const AuthenticatedAdminIndexRoute = AuthenticatedAdminIndexRouteImport.update({ id: '/admin/', path: '/admin/', getParentRoute: () => AuthenticatedAdminRoute } as any)
const AuthenticatedAdminIdopontokRoute = AuthenticatedAdminIdopontokRouteImport.update({ id: '/admin/idopontok', path: '/admin/idopontok', getParentRoute: () => AuthenticatedAdminRoute } as any)
const AuthenticatedAdminUzenetekRoute = AuthenticatedAdminUzenetekRouteImport.update({ id: '/admin/uzenetek', path: '/admin/uzenetek', getParentRoute: () => AuthenticatedAdminRoute } as any)
const AuthenticatedAdminCsaladfaRoute = AuthenticatedAdminCsaladfaRouteImport.update({ id: '/admin/csaladfa', path: '/admin/csaladfa', getParentRoute: () => AuthenticatedAdminRoute } as any)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/auth': typeof AuthRoute
  '/csaladfa': typeof CsaladfaRoute
  '/idopont': typeof IdopontRoute
  '/kapcsolat': typeof KapcsolatRoute
  '/rolam': typeof RolamRoute
  '/szolgaltatasok': typeof SzolgaltatasokRoute
  '/fiok': typeof AuthenticatedFiokRoute
  '/uzenetek': typeof AuthenticatedUzenetekRoute
  '/admin': typeof AuthenticatedAdminIndexRoute
  '/admin/idopontok': typeof AuthenticatedAdminIdopontokRoute
  '/admin/uzenetek': typeof AuthenticatedAdminUzenetekRoute
  '/admin/csaladfa': typeof AuthenticatedAdminCsaladfaRoute
}
export interface FileRoutesByTo extends FileRoutesByFullPath {}
export interface FileRoutesById {
  __root__: typeof rootRouteImport
  '/': typeof IndexRoute
  '/auth': typeof AuthRoute
  '/csaladfa': typeof CsaladfaRoute
  '/idopont': typeof IdopontRoute
  '/kapcsolat': typeof KapcsolatRoute
  '/rolam': typeof RolamRoute
  '/szolgaltatasok': typeof SzolgaltatasokRoute
  '/_authenticated': typeof AuthenticatedRouteWithChildren
  '/_authenticated/_admin': typeof AuthenticatedAdminRouteWithChildren
  '/_authenticated/fiok': typeof AuthenticatedFiokRoute
  '/_authenticated/uzenetek': typeof AuthenticatedUzenetekRoute
  '/_authenticated/_admin/': typeof AuthenticatedAdminIndexRoute
  '/_authenticated/_admin/idopontok': typeof AuthenticatedAdminIdopontokRoute
  '/_authenticated/_admin/uzenetek': typeof AuthenticatedAdminUzenetekRoute
  '/_authenticated/_admin/csaladfa': typeof AuthenticatedAdminCsaladfaRoute
}
export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/auth' | '/csaladfa' | '/idopont' | '/kapcsolat' | '/rolam' | '/szolgaltatasok' | '/fiok' | '/uzenetek' | '/admin' | '/admin/idopontok' | '/admin/uzenetek' | '/admin/csaladfa'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/auth' | '/csaladfa' | '/idopont' | '/kapcsolat' | '/rolam' | '/szolgaltatasok' | '/fiok' | '/uzenetek' | '/admin' | '/admin/idopontok' | '/admin/uzenetek' | '/admin/csaladfa'
  id: '__root__' | '/' | '/auth' | '/csaladfa' | '/idopont' | '/kapcsolat' | '/rolam' | '/szolgaltatasok' | '/_authenticated' | '/_authenticated/_admin' | '/_authenticated/fiok' | '/_authenticated/uzenetek' | '/_authenticated/_admin/' | '/_authenticated/_admin/idopontok' | '/_authenticated/_admin/uzenetek' | '/_authenticated/_admin/csaladfa'
  fileRoutesById: FileRoutesById
}
export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AuthRoute: typeof AuthRoute
  CsaladfaRoute: typeof CsaladfaRoute
  IdopontRoute: typeof IdopontRoute
  KapcsolatRoute: typeof KapcsolatRoute
  RolamRoute: typeof RolamRoute
  SzolgaltatasokRoute: typeof SzolgaltatasokRoute
  AuthenticatedRoute: typeof AuthenticatedRouteWithChildren
}

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/szolgaltatasok': { id: '/szolgaltatasok'; path: '/szolgaltatasok'; fullPath: '/szolgaltatasok'; preLoaderRoute: typeof SzolgaltatasokRouteImport; parentRoute: typeof rootRouteImport }
    '/rolam': { id: '/rolam'; path: '/rolam'; fullPath: '/rolam'; preLoaderRoute: typeof RolamRouteImport; parentRoute: typeof rootRouteImport }
    '/kapcsolat': { id: '/kapcsolat'; path: '/kapcsolat'; fullPath: '/kapcsolat'; preLoaderRoute: typeof KapcsolatRouteImport; parentRoute: typeof rootRouteImport }
    '/idopont': { id: '/idopont'; path: '/idopont'; fullPath: '/idopont'; preLoaderRoute: typeof IdopontRouteImport; parentRoute: typeof rootRouteImport }
    '/csaladfa': { id: '/csaladfa'; path: '/csaladfa'; fullPath: '/csaladfa'; preLoaderRoute: typeof CsaladfaRouteImport; parentRoute: typeof rootRouteImport }
    '/auth': { id: '/auth'; path: '/auth'; fullPath: '/auth'; preLoaderRoute: typeof AuthRouteImport; parentRoute: typeof rootRouteImport }
    '/': { id: '/'; path: '/'; fullPath: '/'; preLoaderRoute: typeof IndexRouteImport; parentRoute: typeof rootRouteImport }
    '/_authenticated': { id: '/_authenticated'; path: ''; fullPath: ''; preLoaderRoute: typeof AuthenticatedRouteImport; parentRoute: typeof rootRouteImport }
    '/_authenticated/_admin': { id: '/_authenticated/_admin'; path: ''; fullPath: ''; preLoaderRoute: typeof AuthenticatedAdminRouteImport; parentRoute: typeof AuthenticatedRoute }
    '/_authenticated/fiok': { id: '/_authenticated/fiok'; path: '/fiok'; fullPath: '/fiok'; preLoaderRoute: typeof AuthenticatedFiokRouteImport; parentRoute: typeof AuthenticatedRoute }
    '/_authenticated/uzenetek': { id: '/_authenticated/uzenetek'; path: '/uzenetek'; fullPath: '/uzenetek'; preLoaderRoute: typeof AuthenticatedUzenetekRouteImport; parentRoute: typeof AuthenticatedRoute }
    '/_authenticated/_admin/': { id: '/_authenticated/_admin/'; path: '/admin'; fullPath: '/admin'; preLoaderRoute: typeof AuthenticatedAdminIndexRouteImport; parentRoute: typeof AuthenticatedAdminRoute }
    '/_authenticated/_admin/idopontok': { id: '/_authenticated/_admin/idopontok'; path: '/admin/idopontok'; fullPath: '/admin/idopontok'; preLoaderRoute: typeof AuthenticatedAdminIdopontokRouteImport; parentRoute: typeof AuthenticatedAdminRoute }
    '/_authenticated/_admin/uzenetek': { id: '/_authenticated/_admin/uzenetek'; path: '/admin/uzenetek'; fullPath: '/admin/uzenetek'; preLoaderRoute: typeof AuthenticatedAdminUzenetekRouteImport; parentRoute: typeof AuthenticatedAdminRoute }
    '/_authenticated/_admin/csaladfa': { id: '/_authenticated/_admin/csaladfa'; path: '/admin/csaladfa'; fullPath: '/admin/csaladfa'; preLoaderRoute: typeof AuthenticatedAdminCsaladfaRouteImport; parentRoute: typeof AuthenticatedAdminRoute }
  }
}

interface AuthenticatedAdminRouteChildren {
  AuthenticatedAdminIndexRoute: typeof AuthenticatedAdminIndexRoute
  AuthenticatedAdminIdopontokRoute: typeof AuthenticatedAdminIdopontokRoute
  AuthenticatedAdminUzenetekRoute: typeof AuthenticatedAdminUzenetekRoute
  AuthenticatedAdminCsaladfaRoute: typeof AuthenticatedAdminCsaladfaRoute
}
const AuthenticatedAdminRouteChildren: AuthenticatedAdminRouteChildren = {
  AuthenticatedAdminIndexRoute,
  AuthenticatedAdminIdopontokRoute,
  AuthenticatedAdminUzenetekRoute,
  AuthenticatedAdminCsaladfaRoute,
}
const AuthenticatedAdminRouteWithChildren = AuthenticatedAdminRoute._addFileChildren(AuthenticatedAdminRouteChildren)

interface AuthenticatedRouteChildren {
  AuthenticatedAdminRoute: typeof AuthenticatedAdminRouteWithChildren
  AuthenticatedFiokRoute: typeof AuthenticatedFiokRoute
  AuthenticatedUzenetekRoute: typeof AuthenticatedUzenetekRoute
}
const AuthenticatedRouteChildren: AuthenticatedRouteChildren = {
  AuthenticatedAdminRoute: AuthenticatedAdminRouteWithChildren,
  AuthenticatedFiokRoute,
  AuthenticatedUzenetekRoute,
}
const AuthenticatedRouteWithChildren = AuthenticatedRoute._addFileChildren(AuthenticatedRouteChildren)

const rootRouteChildren: RootRouteChildren = {
  IndexRoute,
  AuthRoute,
  CsaladfaRoute,
  IdopontRoute,
  KapcsolatRoute,
  RolamRoute,
  SzolgaltatasokRoute,
  AuthenticatedRoute: AuthenticatedRouteWithChildren,
}
export const routeTree = rootRouteImport._addFileChildren(rootRouteChildren)._addFileTypes<FileRouteTypes>()
