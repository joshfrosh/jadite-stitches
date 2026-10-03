# JADITE STITCHES — Cloudflare project

This is the actual Cloudflare Worker project (not the earlier staging ZIP).

Already wired:
- Cloudflare D1 binding: `DB` -> `jadite-stitches-db`
- Cloudflare R2 binding: `MEDIA` -> `jadite-stitches-media`
- Product catalog, search, likes, cart, profile name/user ID
- WhatsApp and Instagram support links
- Dark/light mode
- Admin email allowlist foundation for:
  - joshuajoshfrosh@gmail.com
  - jaydeemperor17@gmail.com

Before first deploy:
1. Replace `REPLACE_WITH_YOUR_D1_DATABASE_ID` in `wrangler.jsonc`.
2. Run the SQL in `schema.sql` against `jadite-stitches-db`.
3. Deploy from GitHub/Cloudflare.
4. Configure Cloudflare Access for the admin area.
5. Add the final app icon/logo and admin upload UI in the next migration step.

The existing AppDeploy app should remain untouched until this Cloudflare version is fully tested.
