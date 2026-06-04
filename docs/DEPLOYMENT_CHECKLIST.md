# Deployment Checklist - MySite
> Complete every item before going live. Check off each box as you go.

---

## Pre-Deployment: Code & Assets

- [ ] All HTML validates without errors (validator.w3.org)
- [ ] CSS passes lint checks - no unused rules, no broken references
- [ ] JavaScript has no console errors or warnings in browser DevTools
- [ ] All images are compressed (WebP/AVIF preferred, max 200 KB each)
- [ ] All internal links resolve correctly - no 404s
- [ ] Favicon (/assets/favicon.svg) is present
- [ ] title tags are unique and descriptive on every page
- [ ] meta description is filled in on every page (50-160 chars)
- [ ] Open Graph tags (og:title, og:description, og:image, og:url) present
- [ ] robots.txt is present and correctly configured
- [ ] sitemap.xml is generated and up to date
- [ ] No test data, placeholder text (Lorem ipsum), or TODO comments remain
- [ ] .env.example is up to date; .env is NOT committed to git

---

## Security

- [ ] HTTPS enforced - HTTP redirects to HTTPS (301)
- [ ] SSL/TLS certificate is valid (Let's Encrypt or paid CA)
- [ ] HSTS header (Strict-Transport-Security) is set
- [ ] X-Frame-Options: SAMEORIGIN header is set
- [ ] X-Content-Type-Options: nosniff header is set
- [ ] Content-Security-Policy header is configured
- [ ] Referrer-Policy header is set
- [ ] Directory listing is disabled (Options -Indexes)
- [ ] .env, .git, and config files are blocked from public access
- [ ] All form inputs are validated server-side (not just client-side)
- [ ] CSRF protection is enabled on all POST endpoints
- [ ] Rate limiting is configured on API endpoints
- [ ] Dependencies audited: npm audit shows 0 high/critical issues
- [ ] Passwords and secrets are NOT hardcoded anywhere in the codebase

---

## Performance

- [ ] Lighthouse score >= 90 in all four categories (Performance, Accessibility, Best Practices, SEO)
- [ ] All CSS and JS files are minified
- [ ] Images use modern formats (WebP/AVIF) with fallbacks
- [ ] img tags include width, height, and loading=lazy (below the fold)
- [ ] Critical CSS is inlined or preloaded
- [ ] Web fonts use font-display: swap
- [ ] Gzip / Brotli compression is enabled on the server
- [ ] Browser caching headers (Cache-Control, Expires) are correctly set
- [ ] No render-blocking scripts (use defer or async)
- [ ] Time to First Byte (TTFB) < 600 ms

---

## Accessibility (WCAG 2.1 AA)

- [ ] All images have descriptive alt text (or alt="" for decorative images)
- [ ] Color contrast ratio >= 4.5:1 for body text, >= 3:1 for large text
- [ ] All interactive elements are keyboard accessible (Tab, Enter, Space, Escape)
- [ ] Visible focus styles are present on all focusable elements
- [ ] Skip-to-content link is present and functional
- [ ] ARIA roles, labels, and aria-live regions are correctly applied
- [ ] Forms have associated label elements for every input
- [ ] Error messages are announced to screen readers (role=alert)
- [ ] Page lang attribute is set on html element
- [ ] Tested with at least one screen reader (NVDA, VoiceOver, or JAWS)

---

## SEO

- [ ] Canonical URL tag (link rel=canonical) is on every page
- [ ] Structured data (JSON-LD) is valid (search.google.com/test/rich-results)
- [ ] sitemap.xml submitted to Google Search Console
- [ ] robots.txt allows crawling of all public pages
- [ ] No broken external links
- [ ] Page load speed tested on mobile (PageSpeed Insights)

---

## Server & Infrastructure

- [ ] Nginx or Apache config tested (nginx -t or apachectl configtest)
- [ ] All environment variables are populated in the production .env
- [ ] Firewall rules allow only ports 80, 443 (and 22 for SSH)
- [ ] SSH root login is disabled; key-based auth is enforced
- [ ] Fail2ban or similar brute-force protection is active
- [ ] Automated backups are configured and tested
- [ ] Health-check endpoint (/health or /ping) returns HTTP 200
- [ ] Uptime monitoring is configured (e.g., UptimeRobot, Better Uptime)
- [ ] Error logging is active and log rotation is configured
- [ ] Server timezone is set to UTC

---

## Go-Live

- [ ] DNS records updated (A/AAAA/CNAME pointing to new server)
- [ ] DNS TTL lowered to 300 s before cutover; restored after
- [ ] Old server kept live until DNS fully propagated (24-48 h)
- [ ] CDN cache purged (if applicable)
- [ ] Smoke-test all critical paths in production after deployment
- [ ] Analytics tracking verified (GA/Plausible receiving events)
- [ ] Contact form tested end-to-end in production
- [ ] 404 and 500 error pages verified
- [ ] Team notified; deployment logged with timestamp and deployer name

---

## Post-Deployment (First 24 Hours)

- [ ] Monitor error logs for unexpected spikes
- [ ] Verify SSL certificate auto-renewal is scheduled (certbot renew --dry-run)
- [ ] Check Core Web Vitals in Google Search Console
- [ ] Confirm backup ran successfully after first night
- [ ] Review server resource usage (CPU, RAM, disk)

---

*Last updated: June 2026 | MySite Deployment Bundle*
