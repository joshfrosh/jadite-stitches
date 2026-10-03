export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Let Cloudflare serve the website files
    return env.ASSETS.fetch(request);
  }
};
