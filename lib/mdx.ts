import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import { rehype } from 'rehype'
import rehypePrettyCode from 'rehype-pretty-code'

export interface PageMeta {
  title: string
  description?: string
  slug: string
  slugAsParams: string
  [key: string]: any
}

export interface Page {
  meta: PageMeta
  content: string
  slug: string
  slugAsParams: string
  title: string
  description?: string
}

export interface Post extends Page {
  date: string
  image?: string
  authors?: string[]
  categories?: string[]
  published?: boolean
}

// Get all MDX files from a directory
export function getMDXFiles(dir: string): string[] {
  const dirPath = path.join(process.cwd(), 'content', dir)
  
  if (!fs.existsSync(dirPath)) {
    return []
  }
  
  return fs.readdirSync(dirPath).filter(file => 
    file.endsWith('.mdx') || file.endsWith('.md')
  )
}

// Get page data from MDX file
export async function getPageFromSlug(dir: string, slug: string): Promise<Page | null> {
  const fileName = `${slug}.mdx`
  const filePath = path.join(process.cwd(), 'content', dir, fileName)
  
  if (!fs.existsSync(filePath)) {
    // Try with .md extension
    const mdPath = path.join(process.cwd(), 'content', dir, `${slug}.md`)
    if (!fs.existsSync(mdPath)) {
      return null
    }
  }
  
  const fileContent = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(fileContent)
  
  return {
    meta: {
      ...data,
      slug,
      slugAsParams: slug,
    } as PageMeta,
    content,
    slug,
    slugAsParams: slug,
    title: data.title || slug,
    description: data.description,
  }
}

// Get all pages from a directory
export async function getAllPages(dir: string): Promise<Page[]> {
  const files = getMDXFiles(dir)
  
  const pages = await Promise.all(
    files.map(async (file) => {
      const slug = file.replace(/\.(mdx|md)$/, '')
      return getPageFromSlug(dir, slug)
    })
  )
  
  return pages.filter((page): page is Page => page !== null)
}

// Get all blog posts
export async function getAllPosts(): Promise<Post[]> {
  const files = getMDXFiles('blog')
  
  const posts = await Promise.all(
    files.map(async (file) => {
      const slug = file.replace(/\.(mdx|md)$/, '')
      const page = await getPageFromSlug('blog', slug)
      
      if (!page) return null
      
      return {
        ...page,
        date: page.meta.date || new Date().toISOString(),
        image: page.meta.image,
        authors: page.meta.authors || [],
        categories: page.meta.categories || [],
        published: page.meta.published !== false,
      } as Post
    })
  )
  
  return posts
    .filter((post): post is Post => post !== null && post.published !== false)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

// Process MDX content
export async function processContent(content: string) {
  const processedContent = await remark()
    .use(remarkGfm)
    .process(content)
  
  return processedContent.toString()
}