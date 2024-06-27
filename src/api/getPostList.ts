import api from '@/_lib/fetcher';

export default async function getPostList(orderBy: string, keyword: string) {
  const data = await api.get({ endpoint: `/post?orderby=${orderBy}&keyword=${keyword}` });

  return data;
}