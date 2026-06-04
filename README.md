# MySite — Production Website Deployment Bundle

A complete, zero-dependency, production-ready website bundle with Docker containerization, automated CI/CD, and a full deployment checklist — ready to clone and ship.

## What's Included

| Category | Files |
|---|---|
| Frontend | index.html, css/main.css, js/app.js |
| Error pages | 404.html |
| SEO | robots.txt, sitemap.xml |
| Server | config/nginx.conf, config/.htaccess |
| Docker | Dockerfile, docker-compose.yml, config/nginx-docker.conf |
| CI/CD | .github/workflows/deploy.yml |
| Config | config/.env.example |
| Docs | docs/DEPLOYMENT_CHECKLIST.md |

## Quick Start

```bash
# 1. Clone
git clone https://github.com/Terryeteague/mysite-deployment-bundle.git
cd mysite-deployment-bundle

# 2. Set up environment
cp config/.env.example .env

# 3. Preview locally
python3 -m http.server 8080

# 4. Deploy
rsync -avz --delete --exclude='.env' ./ user@your-server.com:/var/www/mysite/public/
```

## Docker

```bash
# Development
docker compose --profile dev up

# Production
docker compose --profile prod up -d
```

## License

MIT - Built with Copilot Tasks - June 2026
