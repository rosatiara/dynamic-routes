import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import {remark} from 'remark'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'posts')

export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map(fileName => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '')

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Combine the data with the id
    return {
      id,
      ...matterResult.data
    }
  })
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

//  function to get all post ids
export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  // Returns an array of object like params.id
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/,''),
      }
    }
  })
}

// Fetch necessary data to render the post with the given `id`

// async function to enable asynchronous
export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`) 
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents)

  // use remark to convert markdown into HTML string :D
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)
  const contentHtml = processedContent.toString()

  // combine the data with the id!
  return {
    id,
    contentHtml,
    ...matterResult.data
  }
}