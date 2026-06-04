# 🔐 Security Policy — MySite

Thank you for helping keep MySite and its users safe. This document explains our supported versions, how to report a vulnerability responsibly, and what you can expect after reporting.

---

## 📦 Supported Versions

Security fixes are applied to the **latest release only**. Older versions do not receive backports.

| Version | Supported |
|---|---|
| `main` (latest) | Actively maintained |
| Any tagged release < 1 month old | Patch if critical |
| Older releases | No longer supported |

---

## 🚨 Reporting a Vulnerability

**Please do NOT open a public GitHub Issue for security vulnerabilities.** Doing so exposes the flaw to everyone before it can be fixed.

### Preferred: GitHub Private Vulnerability Reporting

1. Go to the **Security** tab of this repository
2. Click **"Report a vulnerability"**
3. Fill in the details — GitHub keeps this completely private between you and the maintainers

### Alternative: Email

Send a detailed report to **security@mysite.com** with:
- A clear description of the vulnerability
- Steps to reproduce (a minimal proof-of-concept is ideal)
- The potential impact (what an attacker could achieve)
- Any suggested mitigations if you have them

**Encrypt sensitive reports** using our PGP key (available on request).

---

## Response Timeline

| Milestone | Target |
|---|---|
| Initial acknowledgement | Within **48 hours** |
| Severity assessment | Within **5 business days** |
| Patch or mitigation shipped | Within **30 days** for critical; **90 days** for others |
| Public disclosure | After patch is live and users have had time to update |

We follow **responsible disclosure** — we ask that you give us the agreed remediation window before publishing any details publicly.

---

## Recognition

We genuinely appreciate responsible disclosure. Reporters who follow this policy will be:

- **Credited** in the release notes and `CHANGELOG.md` (unless you prefer to remain anonymous)
- Listed in our **Hall of Thanks** in this document (below)
- Given advance notice of the public disclosure date

We do not currently offer a formal bug bounty program, but we will acknowledge significant finds prominently.

---

## Scope

**In scope — we want to hear about these:**
- Authentication or authorisation bypass
- Cross-site scripting (XSS) in any form
- Cross-site request forgery (CSRF)
- Server-side injection (SQL, command, template, etc.)
- Information disclosure (secrets, credentials, PII leaks)
- Insecure Direct Object References (IDOR)
- Security misconfiguration in `nginx.conf`, `.htaccess`, or `Dockerfile`
- Sensitive data exposed in `git` history or config files
- Broken access controls
- Dependency vulnerabilities with a realistic attack vector

**Out of scope — please don't report these:**
- Issues requiring physical access to a device
- Social engineering of maintainers or users
- Denial-of-service attacks (DoS / DDoS)
- Reports generated purely by automated scanners with no manual validation
- Missing `Secure` / `HttpOnly` flags on non-sensitive cookies
- Self-XSS (requires the victim to run their own malicious code)
- Clickjacking on pages with no sensitive actions
- Theoretical vulnerabilities with no realistic exploit path
- Issues in third-party services we don't control

---

## Our Security Commitments

As maintainers, we commit to:

- Keeping all dependencies up to date (monitored via Dependabot)
- Running `npm audit` on every CI build and fixing criticals before merging
- Never storing secrets in source code or `git` history
- Enforcing HTTPS, HSTS, and a strict CSP in all server configs
- Reviewing all PRs that touch security-sensitive files
- Rotating any exposed credentials within 24 hours of discovery

---

## Hall of Thanks

*No vulnerabilities have been reported yet. Yours could be the first!*

---

## Legal

Reporters acting in good faith under this policy will not face legal action from us. We will not initiate or support any legal proceedings against researchers who:

- Follow this responsible disclosure policy
- Avoid accessing, modifying, or deleting data that isn't theirs
- Do not disrupt service availability during testing
- Do not publicly disclose the vulnerability before we have patched it

---

*Last updated: June 4, 2026 · MySite Security Team · security@mysite.com*
