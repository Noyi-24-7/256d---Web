import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { NuqsAdapter } from 'nuqs/adapters/next/app'

/** Delight — custom local font family with all 9 weights. */
const delight = localFont({
  src: [
    { path: '../../public/fonts/delight/delight-thin.otf', weight: '100' },
    { path: '../../public/fonts/delight/delight-extralight.otf', weight: '200' },
    { path: '../../public/fonts/delight/delight-light.otf', weight: '300' },
    { path: '../../public/fonts/delight/delight-regular.otf', weight: '400' },
    { path: '../../public/fonts/delight/delight-medium.otf', weight: '500' },
    { path: '../../public/fonts/delight/delight-semibold.otf', weight: '600' },
    { path: '../../public/fonts/delight/delight-bold.otf', weight: '700' },
    { path: '../../public/fonts/delight/delight-extrabold.otf', weight: '800' },
    { path: '../../public/fonts/delight/delight-black.otf', weight: '900' },
  ],
  variable: '--font-delight',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Lightning to UPI bridge - 256d',
  description: 'Instant Payments from Bitcoin to UPI',
}

/**
 * RootLayout — top-level Next.js app layout.
 *
 * Injects the Delight font CSS variable and loads icon fonts:
 * - Material Symbols Rounded (arrow_back, chevron_right, lock, content_paste, qr_code_scanner)
 * - Font Awesome 6 Free (fa-circle-question, fa-hourglass-start)
 */
const RootLayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <html lang='en' className={delight.variable}>
      <head>
        <link
          rel='stylesheet'
          href='https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200'
        />
        <link
          rel='stylesheet'
          href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css'
          crossOrigin='anonymous'
          referrerPolicy='no-referrer'
        />
      </head>
      <body style={{ fontFamily: 'var(--font-delight), ui-sans-serif, system-ui, sans-serif' }}>
        <NuqsAdapter>{children}</NuqsAdapter>
      </body>
    </html>
  )
}

export default RootLayout
