# Design Guidelines — realcpmcalculator.com

## Principles

Clean and minimal. Every element earns its place. No decoration for decoration's sake.

## What to avoid

- No purple-to-pink gradients
- No glassmorphism or frosted-glass effects
- No decorative blobs or background shapes
- No large hero illustrations
- No card shadows that scream "SaaS landing page"
- No animated counters or entrance animations

## Typography

- System font stack: `-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif`
- Body: 16px / 1.6 line height
- H1: 2rem–2.5rem, font-weight 700
- H2: 1.5rem, font-weight 600
- H3: 1.125rem, font-weight 600
- Monospace for formula display: `ui-monospace, 'Cascadia Code', 'Source Code Pro', monospace`

## Color philosophy

Two modes: light and dark. Both use CSS custom properties defined on `:root` and `.dark`.
No Tailwind arbitrary colors — use the CSS variables.

### Light
- Page background: #ffffff
- Subtle sections: #f8fafc
- Border: #e2e8f0
- Body text: #0f172a
- Muted text: #64748b
- Accent (links, buttons, focus): #2563eb — a clear, professional blue
- Success: #16a34a
- Error: #dc2626

### Dark
- Page background: #0f172a (Slate 900)
- Subtle sections: #1e293b (Slate 800)
- Border: #334155 (Slate 700)
- Body text: #f1f5f9
- Muted text: #94a3b8
- Accent: #3b82f6

## Layout

- Max content width: 768px centered (prose) / 1024px for page shell
- Horizontal padding: 1rem at mobile, 1.5rem at sm, 2rem at md
- Section vertical spacing: 3rem–4rem
- Calculator card: white / dark-elevated background, 1px border, 0.5rem radius

## Calculator UI

- Label above input, always — never placeholder-only
- Error messages: small text in error red, directly below the field
- Results: visually distinct section — light blue tint in light mode, dark navy in dark mode
- Formula display: monospace, slightly smaller text, subtle background
- Buttons: solid accent color, minimum 44px height, full radius on mobile

## Ad slots

- Reserved height: top slot `min-h-[90px]`, mid slot `min-h-[250px]`
- Subtle background to indicate the reserved space
- No fake placeholder text ("Advertisement")
- Do not style them to look like content

## Tone

Professional but human. Not startup-bro. Not corporate. Write like someone who actually
runs paid media campaigns and built this because the existing tools were frustrating.
