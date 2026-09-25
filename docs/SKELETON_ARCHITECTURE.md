# Skeleton Architecture

## Data Layer

Shared domain contracts live in `src/types/`. Mock fixtures and generators live in `src/lib/mockData/` and can depend on shared types, but not on components.

```text
src/types/
├── auth.ts
├── booking-escrow.ts
├── escrow.ts
└── hotel.ts

src/lib/mockData/
├── index.ts
├── apartments.ts
├── escrows.ts
├── hotels.ts
└── messages.ts
```

Hotel cards use `HotelCardData`, derived from `HotelListing` with `toHotelCard`.