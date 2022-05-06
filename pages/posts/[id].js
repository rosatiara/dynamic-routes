import Layout from '../../components/layout';
import { getAllPostIds, getPostData } from '../../lib/posts';

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

export async function getStaticProps ({params}) {
  // fetch necessary data for the post using params.id
  const postData = getPostData(params.id)
  return {
    props: {
      postData
    }
  }

}

export default function Post({postData}) {
  return (
    <Layout>
    {postData.title}
    <br />
    {postData.id}
    <br />
    {postData.date}
  </Layout>
  )
  
}

