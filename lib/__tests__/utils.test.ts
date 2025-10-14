import { cn } from '../utils'

describe('cn utility function', () => {
  describe('Happy Path', () => {
    it('should merge multiple class names', () => {
      const result = cn('class1', 'class2', 'class3')
      expect(result).toBe('class1 class2 class3')
    })

    it('should handle Tailwind conflicting classes correctly', () => {
      const result = cn('px-2', 'px-4')
      expect(result).toBe('px-4')
    })

    it('should merge conditional classes', () => {
      const isActive = true
      const result = cn('base-class', isActive && 'active-class')
      expect(result).toBe('base-class active-class')
    })

    it('should handle object notation', () => {
      const result = cn({
        'class1': true,
        'class2': false,
        'class3': true,
      })
      expect(result).toBe('class1 class3')
    })

    it('should combine string and object notation', () => {
      const result = cn('base', { active: true, disabled: false })
      expect(result).toBe('base active')
    })
  })

  describe('Edge Cases', () => {
    it('should handle empty input', () => {
      const result = cn()
      expect(result).toBe('')
    })

    it('should handle null and undefined values', () => {
      const result = cn('class1', null, undefined, 'class2')
      expect(result).toBe('class1 class2')
    })

    it('should handle false and 0 values', () => {
      const result = cn('class1', false, 0, 'class2')
      expect(result).toBe('class1 class2')
    })

    it('should handle empty strings', () => {
      const result = cn('class1', '', 'class2')
      expect(result).toBe('class1 class2')
    })

    it('should handle array inputs', () => {
      const result = cn(['class1', 'class2'], 'class3')
      expect(result).toBe('class1 class2 class3')
    })

    it('should handle nested arrays', () => {
      const result = cn(['class1', ['class2', 'class3']])
      expect(result).toBe('class1 class2 class3')
    })
  })

  describe('Tailwind-specific Merging', () => {
    it('should merge conflicting padding classes', () => {
      const result = cn('p-2', 'p-4')
      expect(result).toBe('p-4')
    })

    it('should merge conflicting margin classes', () => {
      const result = cn('m-2', 'm-4')
      expect(result).toBe('m-4')
    })

    it('should merge conflicting background classes', () => {
      const result = cn('bg-red-500', 'bg-blue-500')
      expect(result).toBe('bg-blue-500')
    })

    it('should merge conflicting text color classes', () => {
      const result = cn('text-red-500', 'text-blue-500')
      expect(result).toBe('text-blue-500')
    })

    it('should keep non-conflicting classes', () => {
      const result = cn('px-2', 'py-4', 'px-6')
      expect(result).toBe('py-4 px-6')
    })

    it('should handle responsive variants', () => {
      const result = cn('p-2', 'md:p-4', 'lg:p-6')
      expect(result).toBe('p-2 md:p-4 lg:p-6')
    })

    it('should merge same responsive variant conflicts', () => {
      const result = cn('md:p-2', 'md:p-4')
      expect(result).toBe('md:p-4')
    })
  })

  describe('Complex Scenarios', () => {
    it('should handle complex component className merging', () => {
      const baseClasses = 'flex items-center justify-center'
      const conditionalClasses = cn(
        baseClasses,
        'text-white',
        { 'bg-blue-500': true, 'hover:bg-blue-600': true }
      )
      expect(conditionalClasses).toContain('flex')
      expect(conditionalClasses).toContain('items-center')
      expect(conditionalClasses).toContain('bg-blue-500')
    })

    it('should handle variant-based styling', () => {
      const variant = 'primary'
      const result = cn(
        'base-button',
        variant === 'primary' && 'bg-primary',
        variant === 'secondary' && 'bg-secondary'
      )
      expect(result).toBe('base-button bg-primary')
    })

    it('should merge classes from multiple sources', () => {
      const defaultClasses = 'px-4 py-2'
      const variantClasses = 'bg-blue-500 text-white'
      const userClasses = 'rounded-lg'
      const result = cn(defaultClasses, variantClasses, userClasses)
      expect(result).toBe('px-4 py-2 bg-blue-500 text-white rounded-lg')
    })
  })
})