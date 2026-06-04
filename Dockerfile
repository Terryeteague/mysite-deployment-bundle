# ============================================================
# Dockerfile — MySite Production Container
# ============================================================
# Multi-stage build:
#   Stage 1 (builder) — validate & prepare assets
#   Stage 2 (runtime) — minimal Nginx Alpine image
#
# Build:  docker build -t mysite:latest .
# Run:    docker run -p 80:80 mysite:latest
# ============================================================

# ── Stage 1: Builder ───────────────────────────────────────────────
FROM node:20-alpine AS builder

LABEL stage="builder"

WORKDIR /app

COPY . .

RUN test -f index.html      || (echo "ERROR: index.html missing"  && exit 1)
RUN test -f css/main.css    || (echo "ERROR: css/main.css missing" && exit 1)
RUN test -f js/app.js       || (echo "ERROR: js/app.js missing"    && exit 1)

RUN mkdir -p /build/css /build/js /build/assets /build/config
RUN cp index.html 404.html robots.txt sitemap.xml /build/ 2>/dev/null || cp index.html /build/
RUN cp css/main.css /build/css/
RUN cp js/app.js    /build/js/
RUN cp -r assets/.  /build/assets/ 2>/dev/null || true

# ── Stage 2: Runtime ───────────────────────────────────────────────
FROM nginx:1.27-alpine AS runtime

LABEL org.opencontainers.image.title="MySite" \
      org.opencontainers.image.description="Production website container" \
      org.opencontainers.image.version="1.0.0" \
      org.opencontainers.image.licenses="MIT"

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /build/ /usr/share/nginx/html/

COPY config/nginx-docker.conf /etc/nginx/conf.d/default.conf

RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost/health || exit 1

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
