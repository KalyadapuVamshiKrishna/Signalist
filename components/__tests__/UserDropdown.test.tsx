import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useRouter } from 'next/navigation'
import UserDropdown from '../UserDropdown'

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

jest.mock('../NavItems', () => {
  return function NavItems() {
    return <div data-testid="nav-items-mobile">NavItems Mock</div>
  }
})

jest.mock('@/components/ui/dropdown-menu', () => ({
  DropdownMenu: ({ children }: any) => <div data-testid="dropdown-menu">{children}</div>,
  DropdownMenuTrigger: ({ children, asChild }: any) => (
    <div data-testid="dropdown-trigger">{children}</div>
  ),
  DropdownMenuContent: ({ children, className, align, sideOffset }: any) => (
    <div data-testid="dropdown-content" className={className}>
      {children}
    </div>
  ),
  DropdownMenuLabel: ({ children }: any) => <div data-testid="dropdown-label">{children}</div>,
  DropdownMenuItem: ({ children, onClick, className }: any) => (
    <button data-testid="dropdown-item" onClick={onClick} className={className}>
      {children}
    </button>
  ),
  DropdownMenuSeparator: ({ className }: any) => (
    <hr data-testid="separator" className={className} />
  ),
}))

jest.mock('@/components/ui/avatar', () => ({
  Avatar: ({ children, className }: any) => (
    <div data-testid="avatar" className={className}>
      {children}
    </div>
  ),
  AvatarFallback: ({ children, className }: any) => (
    <div data-testid="avatar-fallback" className={className}>
      {children}
    </div>
  ),
}))

jest.mock('../ui/button', () => ({
  Button: ({ children, onClick, className, variant, ...props }: any) => (
    <button
      data-testid="button"
      onClick={onClick}
      className={className}
      data-variant={variant}
      {...props}
    >
      {children}
    </button>
  ),
}))

jest.mock('lucide-react', () => ({
  LogOut: () => <svg data-testid="logout-icon">LogOut</svg>,
}))

describe('UserDropdown Component', () => {
  const mockPush = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    })
  })

  describe('Rendering', () => {
    it('should render without crashing', () => {
      render(<UserDropdown />)
      expect(screen.getByTestId('dropdown-menu')).toBeInTheDocument()
    })

    it('should render user avatar with correct initials', () => {
      render(<UserDropdown />)
      const avatarFallbacks = screen.getAllByTestId('avatar-fallback')
      expect(avatarFallbacks[0]).toHaveTextContent('J')
    })

    it('should render user name', () => {
      render(<UserDropdown />)
      const names = screen.getAllByText('John Doe')
      expect(names.length).toBeGreaterThan(0)
    })

    it('should render user email', () => {
      render(<UserDropdown />)
      const emails = screen.getAllByText('contact@vamshi.com')
      expect(emails.length).toBeGreaterThan(0)
    })

    it('should render logout button', () => {
      render(<UserDropdown />)
      expect(screen.getByText('Logout')).toBeInTheDocument()
    })

    it('should render logout icon', () => {
      render(<UserDropdown />)
      expect(screen.getByTestId('logout-icon')).toBeInTheDocument()
    })

    it('should render mobile navigation', () => {
      render(<UserDropdown />)
      expect(screen.getByTestId('nav-items-mobile')).toBeInTheDocument()
    })
  })

  describe('User Information Display', () => {
    it('should display correct user name', () => {
      render(<UserDropdown />)
      const nameElements = screen.getAllByText('John Doe')
      expect(nameElements.length).toBe(2)
    })

    it('should display correct user email', () => {
      render(<UserDropdown />)
      const emailElements = screen.getAllByText('contact@vamshi.com')
      expect(emailElements.length).toBe(2)
    })

    it('should extract first character of name for avatar', () => {
      render(<UserDropdown />)
      const avatarFallbacks = screen.getAllByTestId('avatar-fallback')
      avatarFallbacks.forEach(fallback => {
        expect(fallback).toHaveTextContent('J')
      })
    })

    it('should render two avatar instances (trigger and menu)', () => {
      render(<UserDropdown />)
      const avatars = screen.getAllByTestId('avatar')
      expect(avatars.length).toBe(2)
    })
  })

  describe('Dropdown Trigger', () => {
    it('should render trigger button with ghost variant', () => {
      render(<UserDropdown />)
      const button = screen.getByTestId('button')
      expect(button).toHaveAttribute('data-variant', 'ghost')
    })

    it('should have proper aria-label on trigger', () => {
      render(<UserDropdown />)
      const button = screen.getByTestId('button')
      expect(button).toHaveAttribute('aria-label', 'User menu')
    })

    it('should have proper styling classes on trigger', () => {
      render(<UserDropdown />)
      const button = screen.getByTestId('button')
      expect(button.className).toContain('flex')
      expect(button.className).toContain('items-center')
      expect(button.className).toContain('rounded-full')
    })

    it('should render user info in trigger', () => {
      render(<UserDropdown />)
      const button = screen.getByTestId('button')
      expect(button).toContainElement(screen.getAllByText('John Doe')[0])
    })
  })

  describe('Dropdown Content', () => {
    it('should render dropdown content', () => {
      render(<UserDropdown />)
      expect(screen.getByTestId('dropdown-content')).toBeInTheDocument()
    })

    it('should have proper width class on content', () => {
      render(<UserDropdown />)
      const content = screen.getByTestId('dropdown-content')
      expect(content.className).toContain('w-56')
    })

    it('should render dropdown label', () => {
      render(<UserDropdown />)
      expect(screen.getByTestId('dropdown-label')).toBeInTheDocument()
    })

    it('should render separators', () => {
      render(<UserDropdown />)
      const separators = screen.getAllByTestId('separator')
      expect(separators.length).toBeGreaterThan(0)
    })

    it('should render logout menu item', () => {
      render(<UserDropdown />)
      expect(screen.getByTestId('dropdown-item')).toBeInTheDocument()
    })
  })

  describe('Sign Out Functionality', () => {
    it('should call router.push on logout click', async () => {
      render(<UserDropdown />)
      const logoutButton = screen.getByText('Logout')
      
      fireEvent.click(logoutButton)
      
      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith('sign-in')
      })
    })

    it('should call router.push exactly once', async () => {
      render(<UserDropdown />)
      const logoutButton = screen.getByText('Logout')
      
      fireEvent.click(logoutButton)
      
      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledTimes(1)
      })
    })

    it('should navigate to sign-in page', async () => {
      render(<UserDropdown />)
      const logoutButton = screen.getByText('Logout')
      
      fireEvent.click(logoutButton)
      
      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith('sign-in')
      })
    })

    it('should handle async sign out', async () => {
      render(<UserDropdown />)
      const logoutButton = screen.getByText('Logout')
      
      await userEvent.click(logoutButton)
      
      expect(mockPush).toHaveBeenCalled()
    })
  })

  describe('Avatar Styling', () => {
    it('should have correct size classes on avatars', () => {
      render(<UserDropdown />)
      const avatars = screen.getAllByTestId('avatar')
      avatars.forEach(avatar => {
        expect(avatar.className).toContain('w-8')
        expect(avatar.className).toContain('h-8')
      })
    })

    it('should have yellow background on avatar fallback', () => {
      render(<UserDropdown />)
      const fallbacks = screen.getAllByTestId('avatar-fallback')
      fallbacks.forEach(fallback => {
        expect(fallback.className).toContain('bg-yellow-500')
      })
    })

    it('should have contrasting text color on avatar', () => {
      render(<UserDropdown />)
      const fallbacks = screen.getAllByTestId('avatar-fallback')
      fallbacks.forEach(fallback => {
        expect(fallback.className).toContain('text-yellow-900')
      })
    })

    it('should have proper font styling on avatar', () => {
      render(<UserDropdown />)
      const fallbacks = screen.getAllByTestId('avatar-fallback')
      fallbacks.forEach(fallback => {
        expect(fallback.className).toContain('text-sm')
        expect(fallback.className).toContain('font-bold')
      })
    })
  })

  describe('Responsive Design', () => {
    it('should hide user details on mobile with md:flex', () => {
      const { container } = render(<UserDropdown />)
      const userDetails = container.querySelector('.md\\:flex')
      expect(userDetails).toBeInTheDocument()
    })

    it('should hide logout icon on mobile with sm:block', () => {
      const { container } = render(<UserDropdown />)
      const logoutIcon = screen.getByTestId('logout-icon')
      expect(logoutIcon.parentElement?.className).toContain('sm:block')
    })

    it('should show mobile navigation with sm:hidden', () => {
      const { container } = render(<UserDropdown />)
      const mobileNav = container.querySelector('.sm\\:hidden')
      expect(mobileNav).toBeInTheDocument()
    })

    it('should hide separator on mobile with sm:block', () => {
      render(<UserDropdown />)
      const separators = screen.getAllByTestId('separator')
      const lastSeparator = separators[separators.length - 1]
      expect(lastSeparator.className).toContain('sm:block')
    })
  })

  describe('Dropdown Menu Styling', () => {
    it('should have proper text color on logout item', () => {
      render(<UserDropdown />)
      const logoutItem = screen.getByTestId('dropdown-item')
      expect(logoutItem.className).toContain('text-gray-100')
    })

    it('should have font styling on logout item', () => {
      render(<UserDropdown />)
      const logoutItem = screen.getByTestId('dropdown-item')
      expect(logoutItem.className).toContain('text-md')
      expect(logoutItem.className).toContain('font-medium')
    })

    it('should have hover and focus styles on logout item', () => {
      render(<UserDropdown />)
      const logoutItem = screen.getByTestId('dropdown-item')
      expect(logoutItem.className).toContain('focus:bg-transparent')
      expect(logoutItem.className).toContain('focus:text-yellow-500')
    })

    it('should have cursor pointer on logout item', () => {
      render(<UserDropdown />)
      const logoutItem = screen.getByTestId('dropdown-item')
      expect(logoutItem.className).toContain('cursor-pointer')
    })

    it('should have transition on logout item', () => {
      render(<UserDropdown />)
      const logoutItem = screen.getByTestId('dropdown-item')
      expect(logoutItem.className).toContain('transition-colors')
    })
  })

  describe('Accessibility', () => {
    it('should have accessible button element', () => {
      render(<UserDropdown />)
      const button = screen.getByRole('button', { name: /user menu/i })
      expect(button).toBeInTheDocument()
    })

    it('should have proper aria-label', () => {
      render(<UserDropdown />)
      const button = screen.getByTestId('button')
      expect(button).toHaveAttribute('aria-label', 'User menu')
    })

    it('should have keyboard accessible logout button', () => {
      render(<UserDropdown />)
      const logoutButton = screen.getByText('Logout').closest('button')
      expect(logoutButton).toBeInTheDocument()
    })

    it('should support keyboard navigation', async () => {
      const user = userEvent.setup()
      render(<UserDropdown />)
      
      const logoutButton = screen.getByText('Logout')
      await user.tab()
      
      expect(logoutButton).toBeInTheDocument()
    })
  })

  describe('Edge Cases', () => {
    it('should handle user with single character name', () => {
      render(<UserDropdown />)
      const fallbacks = screen.getAllByTestId('avatar-fallback')
      expect(fallbacks[0]).toHaveTextContent('J')
    })

    it('should handle missing router gracefully', () => {
      ;(useRouter as jest.Mock).mockReturnValue(null)
      
      expect(() => render(<UserDropdown />)).toThrow()
    })

    it('should handle multiple rapid clicks on logout', async () => {
      render(<UserDropdown />)
      const logoutButton = screen.getByText('Logout')
      
      fireEvent.click(logoutButton)
      fireEvent.click(logoutButton)
      fireEvent.click(logoutButton)
      
      await waitFor(() => {
        expect(mockPush).toHaveBeenCalled()
      })
    })
  })

  describe('User Data Structure', () => {
    it('should have hardcoded user object', () => {
      render(<UserDropdown />)
      expect(screen.getByText('John Doe')).toBeInTheDocument()
      expect(screen.getByText('contact@vamshi.com')).toBeInTheDocument()
    })

    it('should display user name in multiple locations', () => {
      render(<UserDropdown />)
      const names = screen.getAllByText('John Doe')
      expect(names.length).toBe(2)
    })

    it('should display user email in multiple locations', () => {
      render(<UserDropdown />)
      const emails = screen.getAllByText('contact@vamshi.com')
      expect(emails.length).toBe(2)
    })
  })

  describe('Layout Structure', () => {
    it('should have flex layout in user info sections', () => {
      const { container } = render(<UserDropdown />)
      const flexElements = container.querySelectorAll('.flex')
      expect(flexElements.length).toBeGreaterThan(0)
    })

    it('should align items properly', () => {
      const { container } = render(<UserDropdown />)
      const itemsCenterElements = container.querySelectorAll('.items-center')
      expect(itemsCenterElements.length).toBeGreaterThan(0)
    })

    it('should have proper gap between elements', () => {
      const { container } = render(<UserDropdown />)
      const gapElements = container.querySelectorAll('[class*="gap-"]')
      expect(gapElements.length).toBeGreaterThan(0)
    })
  })

  describe('Component Integration', () => {
    it('should render NavItems in mobile view', () => {
      render(<UserDropdown />)
      expect(screen.getByTestId('nav-items-mobile')).toBeInTheDocument()
    })

    it('should integrate with dropdown menu components', () => {
      render(<UserDropdown />)
      expect(screen.getByTestId('dropdown-menu')).toBeInTheDocument()
      expect(screen.getByTestId('dropdown-trigger')).toBeInTheDocument()
      expect(screen.getByTestId('dropdown-content')).toBeInTheDocument()
    })

    it('should integrate with avatar components', () => {
      render(<UserDropdown />)
      const avatars = screen.getAllByTestId('avatar')
      expect(avatars.length).toBe(2)
    })

    it('should integrate with button component', () => {
      render(<UserDropdown />)
      expect(screen.getByTestId('button')).toBeInTheDocument()
    })
  })
})