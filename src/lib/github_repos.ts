// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = true;

export interface GithubRepoResponse {
  private: boolean;
  name: string;
  html_url: string;
  created_at: string;
  pushed_at: string;
  language?: string;
}

export interface RepoDeets {
  name: string;
  url: string;
  created_at: Date;
  pushed_at: Date;
  language: string;
}

export async function load(): Promise<{
  repos: RepoDeets[];
}> {
  const response = await call_github();
  const repos = ((await response.json()) as GithubRepoResponse[])
    .filter((repo) => !repo.private)
    .map(
      (repo): RepoDeets => ({
        name: repo.name,
        url: repo.html_url,
        created_at: new Date(repo.created_at),
        pushed_at: new Date(repo.pushed_at),
        language: repo.language || "misc",
      }),
    )
    .sort((left, right) => {
      return left.pushed_at.valueOf() - right.pushed_at.valueOf();
    })
    .reverse();

  return {
    repos,
  };
}

async function call_github(): Promise<Response> {
  if (import.meta.env.VITE_GITHUB_API_TOKEN) {
    console.debug("Using token to fetch from github");
    return await fetch(`https://api.github.com/users/thenomadlad/repos`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_GITHUB_API_TOKEN}`,
      },
    });
  }

  return await fetch(`https://api.github.com/users/thenomadlad/repos`);
}
