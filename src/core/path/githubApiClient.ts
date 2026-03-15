import { GitHubFile } from './pathTypes';

export class GitHubApiClient {
  private token: string;
  private username: string;
  private repo: string;
  private branch: string;

  constructor() {
    this.token = process.env.GITHUB_TOKEN || '';
    this.username = process.env.GITHUB_USERNAME || '';
    this.repo = process.env.GITHUB_REPO_PATH || '';
    this.branch = process.env.GITHUB_BRANCH || 'main';

    if (!this.token || !this.username || !this.repo) {
      throw new Error('GitHub credentials not configured');
    }
  }

  private async fetchFromGitHub(url: string): Promise<Response> {
    const response = await fetch(url, {
      headers: {
        'Authorization': `token ${this.token}`,
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': '100xSystems-Path-App'
      }
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }

    return response;
  }

  async downloadRepositoryAsTarball(): Promise<ArrayBuffer> {
    const url = `https://api.github.com/repos/${this.username}/${this.repo}/tarball/${this.branch}`;
    
    try {
      const response = await this.fetchFromGitHub(url);
      const arrayBuffer = await response.arrayBuffer();
      return arrayBuffer;
    } catch (error) {
      console.error('Error downloading repository tarball:', error);
      throw error;
    }
  }

  async repositoryExists(): Promise<boolean> {
    try {
      const url = `https://api.github.com/repos/${this.username}/${this.repo}`;
      const response = await this.fetchFromGitHub(url);
      return response.ok;
    } catch (error) {
      console.error('Repository check failed:', error);
      return false;
    }
  }
}
