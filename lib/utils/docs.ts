import fs from 'fs'
import path from 'path'

export function isDocumentNew(href: string): boolean {
  try {
    // Convert href to file path
    const docPath = href.replace('/docs', '').replace(/^\//, '') || 'index'
    const filePath = path.join(process.cwd(), 'content', 'docs', `${docPath}.mdx`)

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return false
    }

    // Get file stats
    const stats = fs.statSync(filePath)
    const fileCreatedDate = stats.birthtime

    // Calculate if file was created within last 2 weeks (14 days)
    const twoWeeksAgo = new Date()
    twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14)

    return fileCreatedDate > twoWeeksAgo
  } catch (error) {
    console.error('Error checking if document is new:', error)
    return false
  }
}

export function getRecentDocuments(): string[] {
  try {
    const docsDir = path.join(process.cwd(), 'content', 'docs')
    const recentDocs: string[] = []

    // Recursively find all .mdx files
    function findMDXFiles(dir: string): void {
      const files = fs.readdirSync(dir)

      for (const file of files) {
        const filePath = path.join(dir, file)
        const stats = fs.statSync(filePath)

        if (stats.isDirectory()) {
          findMDXFiles(filePath)
        } else if (file.endsWith('.mdx')) {
          const twoWeeksAgo = new Date()
          twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14)

          if (stats.birthtime > twoWeeksAgo) {
            // Convert file path to href
            const relativePath = path.relative(path.join(process.cwd(), 'content', 'docs'), filePath)
            const href = '/docs/' + relativePath.replace('.mdx', '').replace(/\\/g, '/')
            recentDocs.push(href === '/docs/index' ? '/docs' : href)
          }
        }
      }
    }

    findMDXFiles(docsDir)
    return recentDocs
  } catch (error) {
    console.error('Error getting recent documents:', error)
    return []
  }
}