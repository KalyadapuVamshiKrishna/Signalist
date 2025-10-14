import React from 'react'
import { render, screen } from '@testing-library/react'
import { usePathname } from 'next/navigation'
import NavItems from '../NavItems'
import { NAV_ITEMs } from '@/constants'

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}))

jest.mock('next/link', () => {
  return function Link({ children, href, className, ...props }: any) {
    return (
      <a href={href} className={className} {...props}>
        {children}
      </a>
    )
  }
})

describe('NavItems Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Rendering', () => {
    it('should render without crashing', () => {
      ;(usePathname as jest.Mock).mockReturnValue('/')
      render(<NavItems />)
      expect(screen.getByRole('list')).toBeInTheDocument()
    })

    it('should render all navigation items', () => {
      ;(usePathname as jest.Mock).mockReturnValue('/')
      render(<NavItems />)
      
      NAV_ITEMs.forEach(item => {
        expect(screen.getByText(item.title)).toBeInTheDocument()
      })
    })

    it('should render correct number of list items', () => {
      ;(usePathname as jest.Mock).mockReturnValue('/')
      render(<NavItems />)
      
      const listItems = screen.getAllByRole('listitem')
      expect(listItems).toHaveLength(NAV_ITEMs.length)
    })

    it('should render links with correct href attributes', () => {
      ;(usePathname as jest.Mock).mockReturnValue('/')
      render(<NavItems />)
      
      NAV_ITEMs.forEach(item => {
        const link = screen.getByRole('link', { name: item.title })
        expect(link).toHaveAttribute('href', item.href)
      })
    })
  })

  describe('Active State - Root Path', () => {
    it('should mark Dashboard as active when on root path', () => {
      ;(usePathname as jest.Mock).mockReturnValue('/')
      render(<NavItems />)
      
      const dashboardLink = screen.getByRole('link', { name: 'Dashboard' })
      expect(dashboardLink).toHaveClass('text-gray-200')
    })

    it('should not mark Search as active when on root path', () => {
      ;(usePathname as jest.Mock).mockReturnValue('/')
      render(<NavItems />)
      
      const searchLink = screen.getByRole('link', { name: 'Search' })
      expect(searchLink).not.toHaveClass('text-gray-200')
    })

    it('should not mark Watchlist as active when on root path', () => {
      ;(usePathname as jest.Mock).mockReturnValue('/')
      render(<NavItems />)
      
      const watchlistLink = screen.getByRole('link', { name: 'Watchlist' })
      expect(watchlistLink).not.toHaveClass('text-gray-200')
    })
  })

  describe('Active State - Search Path', () => {
    it('should mark Search as active when on /search', () => {
      ;(usePathname as jest.Mock).mockReturnValue('/search')
      render(<NavItems />)
      
      const searchLink = screen.getByRole('link', { name: 'Search' })
      expect(searchLink).toHaveClass('text-gray-200')
    })

    it('should mark Search as active when on /search/query', () => {
      ;(usePathname as jest.Mock).mockReturnValue('/search/query')
      render(<NavItems />)
      
      const searchLink = screen.getByRole('link', { name: 'Search' })
      expect(searchLink).toHaveClass('text-gray-200')
    })

    it('should not mark Dashboard as active when on /search', () => {
      ;(usePathname as jest.Mock).mockReturnValue('/search')
      render(<NavItems />)
      
      const dashboardLink = screen.getByRole('link', { name: 'Dashboard' })
      expect(dashboardLink).not.toHaveClass('text-gray-200')
    })
  })

  describe('Active State - Watchlist Path', () => {
    it('should mark Watchlist as active when on /watchlist', () => {
      ;(usePathname as jest.Mock).mockReturnValue('/watchlist')
      render(<NavItems />)
      
      const watchlistLink = screen.getByRole('link', { name: 'Watchlist' })
      expect(watchlistLink).toHaveClass('text-gray-200')
    })

    it('should mark Watchlist as active when on /watchlist/detail', () => {
      ;(usePathname as jest.Mock).mockReturnValue('/watchlist/detail')
      render(<NavItems />)
      
      const watchlistLink = screen.getByRole('link', { name: 'Watchlist' })
      expect(watchlistLink).toHaveClass('text-gray-200')
    })
  })

  describe('isActive Function Logic', () => {
    it('should only match exact path for root', () => {
      ;(usePathname as jest.Mock).mockReturnValue('/dashboard')
      render(<NavItems />)
      
      const dashboardLink = screen.getByRole('link', { name: 'Dashboard' })
      expect(dashboardLink).not.toHaveClass('text-gray-200')
    })

    it('should match paths starting with non-root hrefs', () => {
      ;(usePathname as jest.Mock).mockReturnValue('/search/results/page-2')
      render(<NavItems />)
      
      const searchLink = screen.getByRole('link', { name: 'Search' })
      expect(searchLink).toHaveClass('text-gray-200')
    })

    it('should handle undefined pathname gracefully', () => {
      ;(usePathname as jest.Mock).mockReturnValue(undefined)
      
      expect(() => render(<NavItems />)).not.toThrow()
    })

    it('should handle null pathname gracefully', () => {
      ;(usePathname as jest.Mock).mockReturnValue(null)
      
      expect(() => render(<NavItems />)).not.toThrow()
    })
  })

  describe('Styling', () => {
    it('should have base navigation styles', () => {
      ;(usePathname as jest.Mock).mockReturnValue('/')
      render(<NavItems />)
      
      const list = screen.getByRole('list')
      expect(list).toHaveClass('flex', 'space-x-6', 'sm:flex-row', 'p-2')
    })

    it('should have proper gap classes', () => {
      ;(usePathname as jest.Mock).mockReturnValue('/')
      render(<NavItems />)
      
      const list = screen.getByRole('list')
      expect(list).toHaveClass('gap-3', 'sm:gap-10')
    })

    it('should have font and color classes', () => {
      ;(usePathname as jest.Mock).mockReturnValue('/')
      render(<NavItems />)
      
      const list = screen.getByRole('list')
      expect(list).toHaveClass('font-medium', 'text-gray-500')
    })

    it('should apply hover styles to all links', () => {
      ;(usePathname as jest.Mock).mockReturnValue('/')
      render(<NavItems />)
      
      const links = screen.getAllByRole('link')
      links.forEach(link => {
        expect(link).toHaveClass('hover:text-yellow-500', 'transition-colors')
      })
    })

    it('should apply active class only to active link', () => {
      ;(usePathname as jest.Mock).mockReturnValue('/search')
      render(<NavItems />)
      
      const searchLink = screen.getByRole('link', { name: 'Search' })
      const dashboardLink = screen.getByRole('link', { name: 'Dashboard' })
      
      expect(searchLink).toHaveClass('text-gray-200')
      expect(dashboardLink).not.toHaveClass('text-gray-200')
    })
  })

  describe('Accessibility', () => {
    it('should use semantic list structure', () => {
      ;(usePathname as jest.Mock).mockReturnValue('/')
      render(<NavItems />)
      
      expect(screen.getByRole('list')).toBeInTheDocument()
      expect(screen.getAllByRole('listitem')).toHaveLength(NAV_ITEMs.length)
    })

    it('should have keyboard navigable links', () => {
      ;(usePathname as jest.Mock).mockReturnValue('/')
      render(<NavItems />)
      
      const links = screen.getAllByRole('link')
      links.forEach(link => {
        expect(link).toBeInTheDocument()
      })
    })
  })

  describe('Edge Cases', () => {
    it('should handle empty pathname', () => {
      ;(usePathname as jest.Mock).mockReturnValue('')
      render(<NavItems />)
      
      expect(screen.getByRole('list')).toBeInTheDocument()
    })

    it('should handle pathname with trailing slash', () => {
      ;(usePathname as jest.Mock).mockReturnValue('/search/')
      render(<NavItems />)
      
      const searchLink = screen.getByRole('link', { name: 'Search' })
      expect(searchLink).toBeInTheDocument()
    })

    it('should handle pathname with query parameters', () => {
      ;(usePathname as jest.Mock).mockReturnValue('/search?q=test')
      render(<NavItems />)
      
      const searchLink = screen.getByRole('link', { name: 'Search' })
      expect(searchLink).toHaveClass('text-gray-200')
    })

    it('should handle completely different pathname', () => {
      ;(usePathname as jest.Mock).mockReturnValue('/unknown-path')
      render(<NavItems />)
      
      const links = screen.getAllByRole('link')
      links.forEach(link => {
        expect(link).not.toHaveClass('text-gray-200')
      })
    })

    it('should handle case-sensitive paths correctly', () => {
      ;(usePathname as jest.Mock).mockReturnValue('/Search')
      render(<NavItems />)
      
      const searchLink = screen.getByRole('link', { name: 'Search' })
      expect(searchLink).not.toHaveClass('text-gray-200')
    })
  })

  describe('Dynamic Updates', () => {
    it('should update active state when pathname changes', () => {
      const { rerender } = render(<NavItems />)
      ;(usePathname as jest.Mock).mockReturnValue('/')
      
      let dashboardLink = screen.getByRole('link', { name: 'Dashboard' })
      expect(dashboardLink).toHaveClass('text-gray-200')
      
      ;(usePathname as jest.Mock).mockReturnValue('/search')
      rerender(<NavItems />)
      
      dashboardLink = screen.getByRole('link', { name: 'Dashboard' })
      const searchLink = screen.getByRole('link', { name: 'Search' })
      
      expect(dashboardLink).not.toHaveClass('text-gray-200')
      expect(searchLink).toHaveClass('text-gray-200')
    })
  })

  describe('Integration with Constants', () => {
    it('should render items from NAV_ITEMs constant', () => {
      ;(usePathname as jest.Mock).mockReturnValue('/')
      render(<NavItems />)
      
      expect(screen.getByText('Dashboard')).toBeInTheDocument()
      expect(screen.getByText('Search')).toBeInTheDocument()
      expect(screen.getByText('Watchlist')).toBeInTheDocument()
    })

    it('should respect order from NAV_ITEMs constant', () => {
      ;(usePathname as jest.Mock).mockReturnValue('/')
      render(<NavItems />)
      
      const links = screen.getAllByRole('link')
      expect(links[0]).toHaveTextContent('Dashboard')
      expect(links[1]).toHaveTextContent('Search')
      expect(links[2]).toHaveTextContent('Watchlist')
    })
  })
})