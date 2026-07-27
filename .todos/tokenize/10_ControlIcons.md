# TODO: Tokenize inline styles — ControlIcons

**File:** `src/components/Icons/ControlIcons.js`

## Issues
- [ ] L29, L40, L53, L65, L77, L88, L99, L110, L122, L134, L145, L158, L171, L183 — SVG `strokeWidth="2"` / `"2.5"` hardcoded — extract to icon token
- [ ] All SVG usages — `viewBox="0 0 24 24"` hardcoded — consider icon constant/token
- [ ] L34, L46, L59, L71, L82, L93, L104, L116, L128, L139, L152, L165, L177, L189 — `style={getTextStyle(color, size, style)}` — verify helper builds from tokens only
