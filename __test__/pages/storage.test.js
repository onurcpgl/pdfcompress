function isPdfFile(file) {
  const pdfPattern = /\.pdf$/i // i harfi büyük-küçük harf duyarlılığı olmadan eşleştirme yapar
  return pdfPattern.test(file.name)
}

describe('isPdfFile', () => {
  it('returns true for files with .pdf extension', () => {
    const file = { name: 'example.pdf' }
    expect(isPdfFile(file)).toBe(true)
  })

  it('returns false for files with other extensions', () => {
    const file1 = { name: 'example.txt' }
    const file2 = { name: 'example.docx' }
    expect(isPdfFile(file1)).toBe(false)
    expect(isPdfFile(file2)).toBe(false)
  })

  it('is not case sensitive', () => {
    const file = { name: 'example.PDF' }
    expect(isPdfFile(file)).toBe(true)
  })
})
