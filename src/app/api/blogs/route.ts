import { NextResponse } from "next/server";

const HASHNODE_ENDPOINT = "https://gql.hashnode.com";
const HASHNODE_HOST = "amitdewanganblog.hashnode.dev";

const postsQuery = `
  query PublicationPosts($host: String!, $first: Int!, $after: String) {
    publication(host: $host) {
      posts(first: $first, after: $after) {
        edges {
          node {
            id
            title
            brief
            url
            publishedAt
            readTimeInMinutes
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
`;

type HashnodePost = {
  id: string;
  title: string;
  brief: string;
  url: string;
  publishedAt: string;
  readTimeInMinutes: number;
};

type HashnodeResponse = {
  data?: {
    publication: {
      posts: {
        edges: Array<{ node: HashnodePost }>;
        pageInfo: { hasNextPage: boolean; endCursor: string | null };
      };
    } | null;
  };
  errors?: Array<{ message: string }>;
};

export async function GET() {
  try {
    const posts: HashnodePost[] = [];
    let after: string | null = null;
    let hasNextPage = true;

    while (hasNextPage) {
      const response = await fetch(HASHNODE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: postsQuery,
          variables: { host: HASHNODE_HOST, first: 20, after },
        }),
        next: { revalidate: 3600 },
      });

      if (!response.ok) {
        throw new Error(`Hashnode request failed with ${response.status}`);
      }

      const result = (await response.json()) as HashnodeResponse;

      if (result.errors?.length) {
        throw new Error(result.errors[0].message);
      }

      const connection = result.data?.publication?.posts;
      if (!connection) {
        throw new Error("Hashnode publication was not found");
      }

      posts.push(...connection.edges.map(({ node }) => node));
      hasNextPage = connection.pageInfo.hasNextPage;
      after = connection.pageInfo.endCursor;

      if (hasNextPage && !after) {
        throw new Error("Hashnode returned an invalid pagination cursor");
      }
    }

    return NextResponse.json(posts);
  } catch (error) {
    console.error("Unable to fetch Hashnode posts:", error);
    return NextResponse.json(
      { error: "Unable to load blogs right now." },
      { status: 502 },
    );
  }
}
