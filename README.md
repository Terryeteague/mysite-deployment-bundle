# 🚀 Machine Design AI — Production Website Deployment Bundle

> A complete, zero-dependency, production-ready website bundle with Docker containerization, automated CI/CD, and a full deployment checklist — ready to clone and ship.

![Status](https://img.shields.io/badge/status-production--ready-4ade80?style=flat-square)
![License](https://img.shields.io/badge/license-MIT-6366f1?style=flat-square)
![Dependencies](https://img.shields.io/badge/dependencies-0-06b6d4?style=flat-square)
![Docker](https://img.shields.io/badge/docker-nginx%201.27--alpine-0ea5e9?style=flat-square&logo=docker)
![CI/CD](https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-f97316?style=flat-square&logo=githubactions)

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Complete File Structure](#-complete-file-structure)
- [Quick Start](#-quick-start)
- [Docker Usage](#-docker-usage)
- [CI/CD Pipeline](#-cicd-pipeline)
- [Server Configuration](#-server-configuration)
- [Environment Variables](#-environment-variables)
- [Customisation](#-customisation)
- [SEO Files](#-seo-files)
- [Deployment Options](#-deployment-options)
- [Pre-Launch Checklist](#-pre-launch-checklist)
- [Troubleshooting](#-troubleshooting)
- [License](#-license)

---

## 🌐 Overview

Machine Design AI is a hand-crafted, framework-free website bundle built for teams who want maximum control with minimum overhead. Every file is production-hardened, thoroughly commented, and ready to drop into any hosting environment — from a bare VPS to a fully containerised cloud pipeline.

### What's included

| Category | Files | Highlights |
|---|---|---|
| **Frontend** | `index.html`, `css/main.css`, `js/app.js` | Semantic HTML5, CSS design tokens, vanilla JS modules |
| **Error pages** | `404.html` | Animated, self-contained, no external deps |
| **SEO** | `robots.txt`, `sitemap.xml` | Crawler rules, sitemap with priorities, bot blocklist |
| **Server** | `config/nginx.conf`, `config/.htaccess` | HTTPS, HSTS, CSP, gzip, caching — both Apache & Nginx |
| **Docker** | `Dockerfile`, `docker-compose.yml`, `config/nginx-docker.conf` | Multi-stage build, dev + prod + Traefik profiles |
| **CI/CD** | `.github/workflows/deploy.yml` | Lint → Build → Staging → Production + Slack alerts |
| **Config** | `config/.env.example` | All environment variables documented and templated |
| **Docs** | `docs/DEPLOYMENT_CHECKLIST.md` | 100+ item pre/post-launch checklist |

---

## 📁 Complete File Structure

```
machinedesignai/
├── index.html
├── 404.html
├── robots.txt
├── sitemap.xml
├── README.md
│
├── css/
│   └── main.css
│
├── js/
│   └── app.js
│
├── config/
│   ├── nginx.conf
│   ├── nginx-docker.conf
│   ├── .htaccess
│   └── .env.example
│
├── docs/
│   └── DEPLOYMENT_CHECKLIST.md
│
├── Dockerfile
└── docker-compose.yml
    └── .github/
        └── workflows/
            └── deploy.yml
```

---

## ⚡ Quick Start

### Prerequisites
- A modern browser (for local preview)
- Docker ≥ 24.0 (for containerised workflow)
- Git

### 1. Clone the repository
```bash
git clone https://github.com/Terryeteague/mysite-deployment-bundle.git
cd mysite-deployment-bundle
```

### 2. Set up environment variables
```bash
cp config/.env.example .env
nano .env
```

### 3. Preview locally (no Docker required)
```bash
python3 -m http.server 8080
```
Open http://localhost:8080 in your browser.

### 4. Deploy to production
```bash
rsync -avz --delete \
  --exclude='.env' \
  --exclude='.git' \
  --exclude='node_modules' \
  ./ deploy@your-server.com:/var/www/mdai/public/
```

---

## 🐳 Docker Usage

The bundle ships with a **multi-stage Dockerfile** that keeps the final image lean (≈25 MB using Nginx Alpine).

### Profiles

| Profile | Command | Purpose |
|---|---|---|
| `dev` | `docker compose --profile dev up` | Hot-reload dev server on port 8080 |
| `prod` | `docker compose --profile prod up -d` | Nginx + Traefik with auto-SSL |
| `tools` | Add `--profile tools` | Watchtower auto-update container |

### Development
```bash
docker compose --profile dev up
```

### Production (with auto-SSL via Traefik)
```bash
docker compose --profile prod up -d
docker compose ps
docker compose logs -f web
curl http://localhost/health
```

---

## 🔄 CI/CD Pipeline

The GitHub Actions workflow at `.github/workflows/deploy.yml` runs four jobs automatically on every push.

### Pipeline Overview

```
Push to dev  ──► Lint & Validate ──► Build & Push Image ──► Deploy to Staging
Push to main ──► Lint & Validate ──► Build & Push Image ──► Deploy to Production
Pull Request ──► Lint & Validate (no deploy)
```

### Required GitHub Secrets

| Secret | Description |
|---|---|
| `SSH_HOST` | Production server IP or hostname |
| `SSH_USER` | SSH username |
| `SSH_PRIVATE_KEY` | Full private key content |
| `SSH_PORT` | SSH port (optional, defaults to 22) |
| `STAGING_HOST` | Staging server IP or hostname |
| `SLACK_WEBHOOK` | Slack incoming webhook URL (optional) |

---

## 🖥️ Server Configuration

### Nginx (bare-metal / VPS)

```bash
sudo cp config/nginx.conf /etc/nginx/sites-available/machinedesignai.conf
sudo ln -s /etc/nginx/sites-available/machinedesignai.conf /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

**SSL Certificate (Let's Encrypt)**
```bash
sudo certbot --nginx -d machinedesignai.com -d www.machinedesignai.com
```

---

## 🔐 Environment Variables

| Variable | Required | Description |
|---|---|---|
| `APP_NAME` | ✅ | Display name of the site |
| `APP_ENV` | ✅ | `development`, `staging`, or `production` |
| `APP_URL` | ✅ | Full URL e.g. `https://machinedesignai.com` |
| `APP_DEBUG` | ✅ | `false` in production |
| `SMTP_HOST` / `SMTP_USER` / `SMTP_PASS` | For email | SMTP credentials |
| `SESSION_SECRET` / `CSRF_SECRET` | ✅ | Random 64-char strings |
| `CORS_ORIGINS` | ✅ | Comma-separated allowed origins |

---

## 🎨 Customisation

### Brand Colors

```css
:root {
  --color-primary:     #6366f1;
  --color-accent:      #06b6d4;
  --color-bg:          #0f172a;
  --color-bg-card:     #1e293b;
  --color-text:        #f1f5f9;
  --color-text-muted:  #94a3b8;
}
```

### Domain Name

```bash
grep -rl "machinedesignai.com" . | xargs sed -i 's/machinedesignai.com/yourdomain.com/g'
```

---

## 🔍 SEO Files

- **`robots.txt`** — Blocks `/admin/`, `/api/`, `/config/`, scrapers; points to sitemap
- **`sitemap.xml`** — All public URLs with priorities and change frequencies

Submit sitemap at: https://machinedesignai.com/sitemap.xml

---

## 🌍 Deployment Options

| Method | Best for | Complexity |
|---|---|---|
| **rsync to VPS** | Simple sites | 🟢 Low |
| **Docker + docker-compose** | Repeatable deploys | 🟡 Medium |
| **GitHub Actions + Docker** | Automated CI/CD | 🟡 Medium |
| **Netlify / Vercel** | Instant deploys, global CDN | 🟢 Low |
| **AWS S3 + CloudFront** | Enterprise scale | 🔴 High |

---

## ✅ Pre-Launch Checklist

**Code & Assets**
- [ ] HTML validates at `validator.w3.org`
- [ ] `favicon.svg` replaced with your own

**Security**
- [ ] HTTPS enforced, HSTS header set
- [ ] `.env` is NOT committed to git

**SEO**
- [ ] `sitemap.xml` submitted to Google Search Console
- [ ] 404 page verified at `https://machinedesignai.com/nonexistent`

---

## 🛠️ Troubleshooting

### Nginx returns 403 Forbidden
```bash
sudo chown -R www-data:www-data /var/www/mdai/public
sudo chmod -R 755 /var/www/mdai/public
```

### Docker container exits immediately
```bash
docker logs mdai-prod
```

### GitHub Actions deploy failing
```bash
ssh deploy@YOUR_SERVER_IP "ls -la /var/www/mdai"
```

---

## 📄 License

MIT — free to use, modify, and distribute for personal and commercial projects.

Copyright (c) 2026 Machine Design AI Assistant

---

<div align="center">

**Machine Design AI Assistant** · Built with Copilot Tasks · June 2026

</div>
