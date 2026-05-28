# Rohit Kalyan Kandulapati

Static personal website for [rohitkalyan.in](https://rohitkalyan.in), designed for GitHub Pages.

## Deploying on GitHub Pages

1. Push this repository to GitHub.
2. In the repository settings, enable GitHub Pages from the `main` branch and root folder.
3. Keep the `CNAME` file in the repository root so GitHub Pages serves the custom domain.
4. Add the required DNS records for `rohitkalyan.in` at your domain provider:
   - Apex domain: `A` records to GitHub Pages IPs `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, and `185.199.111.153`.
   - `www` subdomain: `CNAME` record pointing to your GitHub Pages hostname, usually `<username>.github.io`.
