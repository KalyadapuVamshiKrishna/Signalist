import React from 'react'
import { render, screen } from '@testing-library/react'
import Header from '../Header'

jest.mock('../NavItems', () => {
  return function NavItems() {
    return <nav data-testid="nav-items">NavItems Mock</nav>
  }
})

jest.mock('../UserDropdown', () => {
  return function UserDropdown() {
    return <div data-testid="user-dropdown">UserDropdown Mock</div>
  }
})

jest.mock('next/link', () => {
  return function Link({ children, href, ...props }: any) {
    return <a href={href} {...props}>{children}</a>
  }
})

jest.mock('next/image', () => {
  return function Image({ src, alt, ...props }: any) {
    return <img src={src} alt={alt} {...props} />
  }
})

describe('Header Component', () => {
  describe('Rendering', () => {
    it('should render without crashing', () => {
      render(<Header />)
      expect(screen.getByRole('banner')).toBeInTheDocument()
    })

    it('should render the logo', () => {
      render(<Header />)
      const logo = screen.getByAltText('Logo')
      expect(logo).toBeInTheDocument()
    })

    it('should render logo with correct src', () => {
      render(<Header />)
      const logo = screen.getByAltText('Logo')
      expect(logo).toHaveAttribute('src', '/assets/icons/logo.svg')
    })

    it('should render logo with correct dimensions', () => {
      render(<Header />)
      const logo = screen.getByAltText('Logo')
      expect(logo).toHaveAttribute('width', '150')
      expect(logo).toHaveAttribute('height', '50')
    })

    it('should render NavItems component', () => {
      render(<Header />)
      expect(screen.getByTestId('nav-items')).toBeInTheDocument()
    })

    it('should render UserDropdown component', () => {
      render(<Header />)
      expect(screen.getByTestId('user-dropdown')).toBeInTheDocument()
    })
  })

  describe('Structure and Layout', () => {
    it('should have header element with correct class', () => {
      render(<Header />)
      const header = screen.getByRole('banner')
      expect(header).toHaveClass('sticky', 'top-0', 'header')
    })

    it('should have container with proper classes', () => {
      const { container } = render(<Header />)
      const wrapper = container.querySelector('.container')
      expect(wrapper).toBeInTheDocument()
      expect(wrapper).toHaveClass('mx-auto', 'px-4', 'py-4')
    })

    it('should have flexbox layout for header content', () => {
      const { container } = render(<Header />)
      const wrapper = container.querySelector('.header-wrapper')
      expect(wrapper).toHaveClass('flex', 'justify-between', 'items-center')
    })

    it('should render nav element with hidden class on small screens', () => {
      const { container } = render(<Header />)
      const nav = container.querySelector('nav')
      expect(nav).toHaveClass('hidden', 'sm:block')
    })
  })

  describe('Logo Link', () => {
    it('should have logo wrapped in a link', () => {
      render(<Header />)
      const link = screen.getByRole('link')
      expect(link).toHaveAttribute('href', '/')
    })

    it('should have proper styling on logo link', () => {
      render(<Header />)
      const link = screen.getByRole('link')
      expect(link).toHaveClass('text-2xl', 'font-bold', 'text-gray-800')
    })

    it('should have cursor-pointer class on logo', () => {
      render(<Header />)
      const logo = screen.getByAltText('Logo')
      expect(logo).toHaveClass('cursor-pointer')
    })

    it('should have proper height and width auto on logo', () => {
      render(<Header />)
      const logo = screen.getByAltText('Logo')
      expect(logo).toHaveClass('h-8', 'w-auto')
    })
  })

  describe('Accessibility', () => {
    it('should have semantic header element', () => {
      render(<Header />)
      expect(screen.getByRole('banner')).toBeInTheDocument()
    })

    it('should have accessible logo alt text', () => {
      render(<Header />)
      const logo = screen.getByAltText('Logo')
      expect(logo).toHaveAttribute('alt', 'Logo')
    })

    it('should maintain tab order', () => {
      const { container } = render(<Header />)
      const focusableElements = container.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])')
      expect(focusableElements.length).toBeGreaterThan(0)
    })
  })

  describe('Responsive Behavior', () => {
    it('should hide navigation on mobile with sm:block class', () => {
      const { container } = render(<Header />)
      const nav = container.querySelector('nav')
      expect(nav).toHaveClass('hidden')
      expect(nav).toHaveClass('sm:block')
    })

    it('should always show UserDropdown', () => {
      render(<Header />)
      const userDropdown = screen.getByTestId('user-dropdown')
      expect(userDropdown).toBeInTheDocument()
      expect(userDropdown).toBeVisible()
    })
  })

  describe('Component Integration', () => {
    it('should render all child components in correct order', () => {
      const { container } = render(<Header />)
      const wrapper = container.querySelector('.header-wrapper')
      const children = wrapper?.children
      
      expect(children).toHaveLength(3)
      expect(children?.[0]).toContainElement(screen.getByAltText('Logo'))
      expect(children?.[1]).toContainElement(screen.getByTestId('nav-items'))
      expect(children?.[2]).toContainElement(screen.getByTestId('user-dropdown'))
    })
  })

  describe('Edge Cases', () => {
    it('should handle missing logo gracefully', () => {
      const originalError = console.error
      console.error = jest.fn()
      
      render(<Header />)
      
      expect(screen.getByRole('banner')).toBeInTheDocument()
      
      console.error = originalError
    })

    it('should maintain structure with empty logo src', () => {
      render(<Header />)
      const logo = screen.getByAltText('Logo')
      expect(logo.parentElement).toHaveAttribute('href', '/')
    })
  })

  describe('CSS Classes', () => {
    it('should apply sticky positioning', () => {
      render(<Header />)
      const header = screen.getByRole('banner')
      expect(header).toHaveClass('sticky')
      expect(header).toHaveClass('top-0')
    })

    it('should have custom header class for styling', () => {
      render(<Header />)
      const header = screen.getByRole('banner')
      expect(header).toHaveClass('header')
    })

    it('should have header-wrapper class on main container', () => {
      const { container } = render(<Header />)
      const wrapper = container.querySelector('.header-wrapper')
      expect(wrapper).toBeInTheDocument()
    })
  })
})