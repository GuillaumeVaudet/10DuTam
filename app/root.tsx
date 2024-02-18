import { Links, LiveReload, Meta, Outlet, Scripts } from '@remix-run/react'
import { Layout } from './components/Layout'
import appStyles from './styles/app.css'
import { cssBundleHref } from '@remix-run/css-bundle'
import favicon from './assets/Logo.svg'
import resetStyles from './styles/reset.css'
import { useNonce } from '@shopify/hydrogen'

export function links() {
  return [
    ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),
    { rel: 'stylesheet', href: resetStyles },
    { rel: 'stylesheet', href: appStyles },
    {
      rel: 'preconnect',
      href: 'https://cdn.shopify.com',
    },
    {
      rel: 'preconnect',
      href: 'https://shop.app',
    },
    { rel: 'icon', type: 'image/svg+xml', href: favicon },
  ]
}

export default function App() {
  const nonce = useNonce()
  return (
    <html lang="fr">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Layout>
          <Outlet />
        </Layout>
        <LiveReload nonce={ nonce } />
        <Scripts nonce={ nonce } />
      </body>
    </html>
  )
}
