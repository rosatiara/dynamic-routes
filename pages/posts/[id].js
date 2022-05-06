import Layout from '../../components/layout';
import { getAllPostIds } from '../../lib/posts';

export async function getStaticPaths() {
  // return a list of possible value for id
  const paths = getAllPostIds()
  return {
    paths, 
    // paths = contains the array of known paths returned
    // by `getAllPostIds() which include the params defined by [id].js
    fallback: false,
  }
}

export default function Post() {
  return <Layout>...</Layout>;
}

export async function getStaticProps ({}) {
  // fetch necessary data for the post using params.id
}