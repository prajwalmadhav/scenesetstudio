import SEO from '../components/SEO'
import { Link } from 'react-router-dom'

const LAST_UPDATED = 'June 4, 2026'

const S = {
  page: {
    background: '#080808',
    color: '#F2F0EB',
    minHeight: '100dvh',
    padding: 'clamp(100px, 14vw, 160px) clamp(24px, 8vw, 120px) 80px',
    fontFamily: 'var(--font-body)',
  },
  inner: {
    maxWidth: '720px',
    margin: '0 auto',
  },
  eyebrow: {
    fontFamily: 'var(--font-body)',
    fontSize: '11px',
    fontWeight: 500,
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    color: 'rgba(212,0,30,0.9)',
    display: 'block',
    marginBottom: '16px',
  },
  h1: {
    fontFamily: 'var(--font-heading)',
    fontWeight: 800,
    fontSize: 'clamp(32px, 5vw, 52px)',
    color: '#F2F0EB',
    margin: '0 0 12px',
    lineHeight: 1.05,
  },
  meta: {
    fontSize: '13px',
    color: 'rgba(242,240,235,0.35)',
    marginBottom: '56px',
    display: 'block',
  },
  h2: {
    fontFamily: 'var(--font-heading)',
    fontWeight: 700,
    fontSize: '18px',
    color: '#F2F0EB',
    margin: '48px 0 12px',
  },
  p: {
    fontSize: '15px',
    lineHeight: 1.75,
    color: 'rgba(242,240,235,0.65)',
    margin: '0 0 16px',
  },
  ul: {
    paddingLeft: '20px',
    margin: '0 0 16px',
    color: 'rgba(242,240,235,0.65)',
    fontSize: '15px',
    lineHeight: 1.75,
  },
  rule: {
    border: 'none',
    borderTop: '1px solid rgba(255,255,255,0.07)',
    margin: '56px 0',
  },
  link: {
    color: '#D4001E',
    textDecoration: 'none',
  },
}

export default function PrivacyPolicy() {
  return (
    <>
      <SEO
        title="Privacy Policy | Scene Set Studio"
        description="How Scene Set Studio collects, uses, and protects your personal information."
      />

      <div style={S.page}>
        <div style={S.inner}>

          <span style={S.eyebrow}>Legal</span>
          <h1 style={S.h1}>Privacy Policy</h1>
          <span style={S.meta}>Last updated: {LAST_UPDATED}</span>

          <p style={S.p}>
            Scene Set Studio ("we," "us," "our") is a creative and marketing agency based in Ontario, Canada.
            This policy explains what personal information we collect when you visit{' '}
            <strong style={{ color: '#F2F0EB' }}>scenesetstudio.com</strong>, how we use it, who we share it with,
            and your rights under Canada's <em>Personal Information Protection and Electronic Documents Act</em> (PIPEDA)
            and, where applicable, the EU General Data Protection Regulation (GDPR).
          </p>

          <hr style={S.rule} />

          <h2 style={S.h2}>1. Information We Collect</h2>

          <p style={S.p}><strong style={{ color: '#F2F0EB' }}>Contact form.</strong> When you submit the "Start a Project" form we collect:</p>
          <ul style={S.ul}>
            <li>Full name</li>
            <li>Email address</li>
            <li>Phone number (optional)</li>
            <li>Company name (optional)</li>
            <li>Project details and message</li>
            <li>Budget range and monthly revenue range (selected from pre-set options)</li>
          </ul>
          <p style={S.p}>This information is used solely to respond to your inquiry and assess project fit.</p>

          <p style={S.p}><strong style={{ color: '#F2F0EB' }}>Analytics.</strong> We use Google Analytics 4 (measurement ID: <code>G-EPPL079Y8W</code>) to understand how visitors use the site — pages visited, time on site, referral source, and device type. This service collects your IP address and sets persistent cookies in your browser. Data is processed by Google LLC on servers in the United States.</p>

          <p style={S.p}><strong style={{ color: '#F2F0EB' }}>Meta Pixel.</strong> We use the Meta Pixel (pixel ID: <code>4261559950796787</code>) operated by Meta Platforms, Inc. This tracks page views and contact form submissions ("Lead" events) on this site, allowing us to measure the effectiveness of advertising on Facebook and Instagram and to build retargeting audiences. Meta may set cookies and use device identifiers. Data is processed by Meta Platforms, Inc. on servers in the United States. If you submit the contact form, a "Lead" conversion event is sent to Meta.</p>

          <p style={S.p}><strong style={{ color: '#F2F0EB' }}>Microsoft Clarity.</strong> We use Microsoft Clarity (project ID: <code>x1lm0sc1jm</code>) operated by Microsoft Corporation to record anonymised session replays and generate heatmaps showing how visitors interact with the site. Clarity does not collect personally identifiable information and does not use cross-site tracking cookies. Data is processed by Microsoft Corporation. See{' '}
            <a href="https://privacy.microsoft.com/en-us/privacystatement" target="_blank" rel="noopener noreferrer" style={S.link}>Microsoft's Privacy Statement</a>.
          </p>

          <p style={S.p}><strong style={{ color: '#F2F0EB' }}>Fonts.</strong> This site loads typefaces from Google Fonts (fonts.googleapis.com). When your browser requests a font, Google receives your IP address and user-agent string. No cookie is set by this request.</p>

          <h2 style={S.h2}>2. How We Use Your Information</h2>
          <ul style={S.ul}>
            <li>To respond to project inquiries and proposals</li>
            <li>To improve website content and user experience (analytics)</li>
            <li>We do not use your data for unsolicited marketing</li>
            <li>We do not sell or rent your data to any third party</li>
          </ul>

          <h2 style={S.h2}>3. Third-Party Services</h2>

          <p style={S.p}><strong style={{ color: '#F2F0EB' }}>Web3Forms.</strong> Contact form submissions are routed through Web3Forms (web3forms.com) to deliver your message to our inbox. Web3Forms acts as a data processor. Your submission data is transmitted securely over HTTPS and is not stored long-term by Web3Forms. See their privacy policy at{' '}
            <a href="https://web3forms.com/privacy" target="_blank" rel="noopener noreferrer" style={S.link}>web3forms.com/privacy</a>.
          </p>

          <p style={S.p}><strong style={{ color: '#F2F0EB' }}>Google Analytics 4</strong> (measurement ID: <code>G-EPPL079Y8W</code>). Operated by Google LLC, 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA. Data is transferred to and processed in the United States under Google's standard contractual clauses. You can opt out via the{' '}
            <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" style={S.link}>Google Analytics opt-out browser add-on</a>.
          </p>

          <p style={S.p}><strong style={{ color: '#F2F0EB' }}>Meta Pixel</strong> (pixel ID: <code>4261559950796787</code>). Operated by Meta Platforms, Inc., 1 Meta Way, Menlo Park, CA 94025, USA. Data is processed in the United States. You can manage your Meta ad preferences and opt out of interest-based advertising at{' '}
            <a href="https://www.facebook.com/ads/preferences" target="_blank" rel="noopener noreferrer" style={S.link}>facebook.com/ads/preferences</a>.
          </p>

          <p style={S.p}><strong style={{ color: '#F2F0EB' }}>Microsoft Clarity</strong> (project ID: <code>x1lm0sc1jm</code>). Operated by Microsoft Corporation, One Microsoft Way, Redmond, WA 98052, USA. Clarity uses anonymised session data and does not build cross-site tracking profiles. See{' '}
            <a href="https://privacy.microsoft.com/en-us/privacystatement" target="_blank" rel="noopener noreferrer" style={S.link}>Microsoft's Privacy Statement</a>.
          </p>

          <p style={S.p}><strong style={{ color: '#F2F0EB' }}>Google Fonts.</strong> Operated by Google LLC. Fonts are loaded at page render. If you prefer not to have your IP transmitted to Google, you can disable Google Fonts via a browser extension such as uBlock Origin.</p>

          <h2 style={S.h2}>4. Cookies & Local Storage</h2>
          <p style={S.p}>We use the following browser storage:</p>
          <ul style={S.ul}>
            <li><strong style={{ color: '#F2F0EB' }}>Session storage — preloader flag</strong> (<code>sss_loaded</code>): suppresses the intro animation on repeat visits within the same tab. Cleared when you close the tab. No personal data.</li>
            <li><strong style={{ color: '#F2F0EB' }}>Google Analytics</strong> (<code>_ga</code>, <code>_ga_EPPL079Y8W</code>): persistent cookies with a 2-year lifespan. Identify your browser anonymously for traffic analytics. Set by Google LLC.</li>
            <li><strong style={{ color: '#F2F0EB' }}>Meta Pixel</strong> (<code>_fbp</code>, <code>_fbc</code>): persistent cookies set by Meta Platforms. Used to track page views and form conversions, and to enable retargeting on Facebook and Instagram. Lifespan up to 90 days. You can opt out at <a href="https://www.facebook.com/ads/preferences" target="_blank" rel="noopener noreferrer" style={S.link}>facebook.com/ads/preferences</a>.</li>
            <li><strong style={{ color: '#F2F0EB' }}>Microsoft Clarity</strong>: uses session and local storage to record anonymised user interactions (clicks, scrolls, heatmaps). Does not store personally identifiable information. Data is not shared with advertisers.</li>
          </ul>
          <p style={S.p}>You can delete or block any of these cookies at any time through your browser settings. Note that blocking analytics or pixel cookies may reduce the accuracy of our website data but will not affect your ability to use the site.</p>

          <h2 style={S.h2}>5. Data Retention</h2>
          <p style={S.p}>Contact form inquiries are retained in our inbox for as long as necessary to fulfil the business relationship, and deleted upon request. Google Analytics data is retained for 14 months (the minimum configurable period).</p>

          <h2 style={S.h2}>6. Your Rights</h2>
          <p style={S.p}>Under PIPEDA (and GDPR where applicable) you have the right to:</p>
          <ul style={S.ul}>
            <li>Access the personal information we hold about you</li>
            <li>Request correction of inaccurate information</li>
            <li>Request deletion of your personal information</li>
            <li>Withdraw consent for Google Analytics using the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" style={S.link}>opt-out browser add-on</a></li>
            <li>Opt out of Meta personalised advertising at <a href="https://www.facebook.com/ads/preferences" target="_blank" rel="noopener noreferrer" style={S.link}>facebook.com/ads/preferences</a></li>
            <li>Block or delete any cookies via your browser settings</li>
          </ul>
          <p style={S.p}>To exercise any of these rights, email us at{' '}
            <a href="mailto:team@scenesetstudio.com" style={S.link}>team@scenesetstudio.com</a>.
            We will respond within 30 days.
          </p>

          <h2 style={S.h2}>7. Security</h2>
          <p style={S.p}>All data transmitted through this site uses HTTPS (TLS encryption). We do not store payment information. Our infrastructure is hosted on Netlify's CDN, which maintains SOC 2 compliance.</p>

          <h2 style={S.h2}>8. Children's Privacy</h2>
          <p style={S.p}>This site is not directed at children under 16. We do not knowingly collect personal information from minors.</p>

          <h2 style={S.h2}>9. Changes to This Policy</h2>
          <p style={S.p}>We may update this policy periodically. The "Last updated" date at the top of this page will reflect any changes. Continued use of the site after an update constitutes acceptance of the revised policy.</p>

          <h2 style={S.h2}>10. Contact</h2>
          <p style={S.p}>
            Scene Set Studio<br />
            Ontario, Canada<br />
            <a href="mailto:team@scenesetstudio.com" style={S.link}>team@scenesetstudio.com</a><br />
            <a href="tel:+16138702919" style={S.link}>+1 613 870 2919</a>
          </p>

          <hr style={S.rule} />

          <p style={{ ...S.p, fontSize: '13px' }}>
            <Link to="/" style={S.link}>← Back to home</Link>
          </p>

        </div>
      </div>
    </>
  )
}
