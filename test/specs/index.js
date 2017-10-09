import fetchIntercept from '../../src/index.js'

describe('fetch()', () => {
    it('should globally available', () => {
        expect(fetch).toEqual(jasmine.any(Function))
    })
    it('should fetch data', async (done) => {
        const data = await fetch('https://www.google.com/')
        const text = await data.text()
        expect(text.length).toBeGreaterThan(0)
        done()
    })
    it('should intercept fetch calls', async (done) => {
        const intercept = () => Promise.resolve('world')
        fetchIntercept.use('/hello', intercept)
        const data = await fetch('https://www.google.com/hello')
        expect(data).toBe('world')
        done()
    })
})
