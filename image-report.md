# CityTaste — Image System Report

_Generated: 2026-05-20T15:17:46.534Z_

## Summary

| Metric | Value |
|--------|-------|
| Total places | 151 |
| Manifest entries | 151 |
| Coverage | 100% |
| WebP files | 844 |
| Total storage | 73.6 MB |
| Avg per place | 499 KB |

## By City

| City | Places | Covered | Hero ✓ | Thumb ✓ | Gallery avg |
|------|--------|---------|--------|---------|-------------|
| Paris | 30 | 30/30 | 30 | 30 | 4 |
| Barcelona | 31 | 31/31 | 31 | 31 | 4 |
| Rome | 30 | 30/30 | 30 | 30 | 4 |
| Marrakech | 60 | 60/60 | 60 | 60 | 3 |

## Missing Places

All 151 places have local images. ✅

## Image Sources

- **unsplash**: 151 places

## Commands

```bash
# Process all places
npx tsx scripts/image-pipeline.ts

# Validate
npx tsx scripts/image-validate.ts

# Re-run single city
npx tsx scripts/image-pipeline.ts --city paris
```
