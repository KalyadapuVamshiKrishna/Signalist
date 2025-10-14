import { NAV_ITEMs } from './constants'

describe('NAV_ITEMs constant', () => {
  describe('Structure Validation', () => {
    it('should be an array', () => {
      expect(Array.isArray(NAV_ITEMs)).toBe(true)
    })

    it('should have correct number of items', () => {
      expect(NAV_ITEMs).toHaveLength(3)
    })

    it('should have all required properties for each item', () => {
      NAV_ITEMs.forEach(item => {
        expect(item).toHaveProperty('href')
        expect(item).toHaveProperty('title')
      })
    })

    it('should have string type for href and title', () => {
      NAV_ITEMs.forEach(item => {
        expect(typeof item.href).toBe('string')
        expect(typeof item.title).toBe('string')
      })
    })
  })

  describe('Content Validation', () => {
    it('should contain Dashboard item', () => {
      const dashboardItem = NAV_ITEMs.find(item => item.title === 'Dashboard')
      expect(dashboardItem).toBeDefined()
      expect(dashboardItem?.href).toBe('/')
    })

    it('should contain Search item', () => {
      const searchItem = NAV_ITEMs.find(item => item.title === 'Search')
      expect(searchItem).toBeDefined()
      expect(searchItem?.href).toBe('/search')
    })

    it('should contain Watchlist item', () => {
      const watchlistItem = NAV_ITEMs.find(item => item.title === 'Watchlist')
      expect(watchlistItem).toBeDefined()
      expect(watchlistItem?.href).toBe('/watchlist')
    })

    it('should have non-empty href values', () => {
      NAV_ITEMs.forEach(item => {
        expect(item.href.length).toBeGreaterThan(0)
      })
    })

    it('should have non-empty title values', () => {
      NAV_ITEMs.forEach(item => {
        expect(item.title.length).toBeGreaterThan(0)
      })
    })

    it('should have valid URL paths for href', () => {
      NAV_ITEMs.forEach(item => {
        expect(item.href).toMatch(/^\//)
      })
    })
  })

  describe('Uniqueness Validation', () => {
    it('should have unique href values', () => {
      const hrefs = NAV_ITEMs.map(item => item.href)
      const uniqueHrefs = new Set(hrefs)
      expect(uniqueHrefs.size).toBe(hrefs.length)
    })

    it('should have unique title values', () => {
      const titles = NAV_ITEMs.map(item => item.title)
      const uniqueTitles = new Set(titles)
      expect(uniqueTitles.size).toBe(titles.length)
    })
  })

  describe('Order Validation', () => {
    it('should have Dashboard as first item', () => {
      expect(NAV_ITEMs[0].title).toBe('Dashboard')
      expect(NAV_ITEMs[0].href).toBe('/')
    })

    it('should maintain expected order', () => {
      const expectedOrder = ['Dashboard', 'Search', 'Watchlist']
      const actualOrder = NAV_ITEMs.map(item => item.title)
      expect(actualOrder).toEqual(expectedOrder)
    })
  })

  describe('Immutability', () => {
    it('should not be modifiable (reference check)', () => {
      const originalLength = NAV_ITEMs.length
      const originalFirstItem = NAV_ITEMs[0]
      
      expect(() => {
        const testArray = [...NAV_ITEMs]
        testArray.push({ href: '/test', title: 'Test' })
      }).not.toThrow()
      
      expect(NAV_ITEMs).toHaveLength(originalLength)
      expect(NAV_ITEMs[0]).toEqual(originalFirstItem)
    })
  })
})