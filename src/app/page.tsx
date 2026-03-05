import { Suspense } from 'react'
import Shell from './shell'

/** Loading skeleton — matches secondaryBackground so no flash on load. */
const LoadingSkeleton = () => (
  <div style={{ minHeight: '100vh', backgroundColor: '#F7F8FB', width: '100%' }} />
)

/** Home page — wraps Shell in Suspense for nuqs URL state hydration. */
const Home = () => (
  <Suspense fallback={<LoadingSkeleton />}>
    <Shell />
  </Suspense>
)

export default Home
