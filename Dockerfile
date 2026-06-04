# ============================================================
# Dockerfile — Machine Design AI Production Container
# ============================================================
# Multi-stage build:
#   Stage 1 (builder) — validate & prepare assets
#   Stage 2 (runtime) — minimal Nginx Alpine image
#
# Build:  docker build -t mdai:latest .
# Run:    docker run -p 80:80 -p 443:443 mdai:latest
# ============================================================

# ── Stage 1: Builder
FROM node:20-alpine AS builder

LABEL stage="builder"

WORKDIR /app

# Copy all source files
COPY . .

# Validate that required files exist
RUN test -f index.html      || (echo "ERROR: index.html missing"  && exit 1)
RUN test -f css/main.css    || (echo "ERROR: css/main.css missing" && exit 1)
RUN test -f js/app.js       || (echo "ERROR: js/app.js missing"    && exit 1)

# Copy assets to build directory
RUN mkdir -p /build/css /build/js /build/assets /build/config
RUN cp index.html 404.html robots.txt sitemap.xml /build/ 2>/dev/null || cp index.html /build/
RUN cp css/main.css /build/css/
RUN cp js/app.js    /build/js/
RUN cp -r assets/.  /build/assets/ 2>/dev/null || true

# ── Stage 2: Runtime
FROM nginx:1.27-alpine AS runtime

LABEL org.opencontainers.image.title="Machine Design AI" \
      org.opencontainers.image.description="Production website container" \
      org.opencontainers.image.version="1.0.0" \
      org.opencontainers.image.licenses="MIT"

# Remove default Nginx content
RUN rm -rf /usr/share/nginx/html/*

# Copy built assets from builder
COPY --from=builder /build/ /usr/share/nginx/html/

# Copy custom Nginx config for the container
COPY config/nginx-docker.conf /etc/nginx/conf.d/default.conf

# Tighten file permissions
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html

# Health check — Nginx responds on port 80
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost/health || exit 1

# Run Nginx in the foreground
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
