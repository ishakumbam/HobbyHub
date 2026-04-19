import { motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'

/** Inline mark — bowl + steam */
function BrandMark({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient
          id="navLogoGrad"
          x1="8"
          y1="6"
          x2="34"
          y2="36"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fff" stopOpacity="0.95" />
          <stop offset="1" stopColor="#fff" stopOpacity="0.75" />
        </linearGradient>
      </defs>
      <path
        d="M14 9c0-1.5 1-2.5 2-3.5M20 7c0-1.8 1.2-3 2.5-4M26 9c0-1.4.9-2.4 1.8-3.4"
        stroke="url(#navLogoGrad)"
        strokeWidth="1.75"
        strokeLinecap="round"
        opacity="0.9"
      />
      <path
        d="M10 18c0 7 4.5 12 10 12s10-5 10-12H10Z"
        stroke="url(#navLogoGrad)"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M10 18h20"
        stroke="url(#navLogoGrad)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M16 30h8"
        stroke="url(#navLogoGrad)"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.85"
      />
    </svg>
  )
}

const navLinkClass = ({ isActive }) =>
  `rounded-full px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-md-primary focus-visible:ring-offset-2 focus-visible:ring-offset-md-background ${
    isActive
      ? 'bg-md-secondary-container text-md-primary'
      : 'text-md-on-surface-variant hover:bg-md-primary/10'
  }`

export function Navbar() {
  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 280, damping: 30 }}
      className="sticky top-0 z-40"
    >
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-px bg-gradient-to-r from-transparent via-md-primary/35 to-transparent"
        aria-hidden
      />
      <div className="relative border-b border-md-outline/[0.12] bg-md-background/75 shadow-[0_4px_24px_-4px_rgba(28,27,31,0.07)] backdrop-blur-xl backdrop-saturate-150">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-3.5 sm:px-6 lg:px-8">
          <NavLink
            to="/"
            className="flex min-w-0 items-center gap-3.5 sm:gap-4"
          >
            <motion.div
              className="relative shrink-0"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 420, damping: 22 }}
            >
              <div
                className="absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-md-primary via-[#7c6aa8] to-md-tertiary opacity-90 blur-[1px]"
                aria-hidden
              />
              <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-md-primary to-[#4f3d7a] shadow-lg shadow-md-primary/25 ring-1 ring-white/25">
                <BrandMark className="h-7 w-7 text-white drop-shadow-sm" />
              </div>
            </motion.div>
            <div className="min-w-0">
              <p className="truncate font-medium leading-none tracking-tight text-md-on-surface">
                Hobby{' '}
                <span className="bg-gradient-to-r from-md-primary to-[#504178] bg-clip-text font-medium text-transparent">
                  Hub
                </span>
              </p>
              <p className="mt-1 hidden text-[0.6875rem] text-md-on-surface-variant sm:block">
                Feed · share · connect
              </p>
            </div>
          </NavLink>

          <nav
            className="flex flex-wrap items-center gap-2"
            aria-label="Main"
          >
            <NavLink to="/" className={navLinkClass} end>
              Feed
            </NavLink>
            <NavLink to="/posts/new" className={navLinkClass}>
              New post
            </NavLink>
          </nav>
        </div>
      </div>
    </motion.header>
  )
}
