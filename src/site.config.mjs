// ─────────────────────────────────────────────────────────────
// Tidy Home Picks — site-wide settings.
// Everything a non-developer may need to change lives here.
// ─────────────────────────────────────────────────────────────

export const SITE = {
  name: 'Tidy Home Picks',
  // Change this ONE line when a custom domain (.com) is connected.
  // Canonical tags, sitemap, Open Graph and JSON-LD all read from it.
  url: 'https://casa-organizada-5ub.pages.dev',
  tagline: 'Practical storage picks for real homes',
  description:
    'Practical, honest picks for organizing every room — kitchen, closet, garage, bathroom and more. We compare real Amazon listings by price, rating and use case.',
  locale: 'en_US',

  // Google Analytics 4 measurement ID, e.g. 'G-ABC123XYZ'. Empty = no analytics loaded.
  ga4Id: '',

  // Google Search Console verification token (only the content="..." value). Empty = no tag.
  googleSiteVerification: '',

  // Amazon Associates tracking ID, e.g. 'casaorganizada-20'.
  // Leave empty until the account is approved: links go to plain amazon.com/dp/ASIN.
  amazonTag: '',

  // Public contact e-mail shown on About / Privacy pages. Empty = hidden.
  contactEmail: 'vizamapi@gmail.com',

  author: {
    name: 'Victor Zamarioli Piazzi',
    shortName: 'Victor',
    role: 'Founder & editor',
    bio: 'Victor runs Tidy Home Picks. He researches every guide by comparing real, current Amazon listings — price, rating, review volume and what each product is actually built for — so you can pick the right organizer in minutes instead of hours.',
  },

  address: 'Victor Zamarioli Piazzi, Av. São Geraldo, Araraquara SP, Brasil',

  methodology:
    "How we pick: we compare real Amazon listings by price, rating, review volume and use case — we never recommend a product we haven't verified, and we re-check prices and ratings when we update a guide.",

  disclosure:
    "This post contains affiliate links. As an Amazon Associate, Tidy Home Picks earns from qualifying purchases — this doesn't affect our picks or cost you anything extra.",
};

// Categories drive breadcrumbs, category pages, related articles and illustrations.
// `match` is used to auto-detect the category from the slug/keyword when an
// article does not set `category` explicitly (so the publishing robot doesn't have to).
// Order matters: the first match wins.
export const CATEGORIES = [
  { id: 'garage', name: 'Garage', blurb: 'Bins, racks and wall systems for garages and basements.', match: /garage|pegboard|tote|basement|tool/ },
  { id: 'bathroom', name: 'Bathroom', blurb: 'Under-sink, counter and shower storage that actually fits.', match: /bathroom|under-sink|under sink|vanity|shower|medicine/ },
  { id: 'office', name: 'Home Office', blurb: 'Desk, cable and paper organizers for a calmer workspace.', match: /desk|office|cable|cord|file-organizer|file organizer|paper/ },
  { id: 'kids', name: 'Kids’ Rooms', blurb: 'Toy storage and kid-friendly systems that are easy to keep tidy.', match: /toy|kid|nursery|playroom/ },
  { id: 'kitchen', name: 'Kitchen & Pantry', blurb: 'Drawers, pantry containers, spice racks and fridge bins.', match: /kitchen|pantry|spice|refrigerator|fridge|lazy-susan|lazy susan|cabinet|food|silverware|utensil/ },
  { id: 'closet', name: 'Closet & Bedroom', blurb: 'Closet systems, shoe storage and over-the-door organizers.', match: /closet|shoe|wardrobe|jewelry|clothes|hanger|over-door|over-the-door|bedroom|under-bed|under bed|dresser/ },
  { id: 'home', name: 'Whole Home', blurb: 'Stackable bins, entryway hooks, labels and renter-friendly fixes.', match: /./ },
];

export function categoryFor(entry) {
  const explicit = entry?.data?.category;
  if (explicit) {
    const found = CATEGORIES.find((c) => c.id === explicit);
    if (found) return found;
  }
  const haystack = `${entry?.id ?? ''} ${entry?.data?.keyword ?? ''} ${entry?.data?.title ?? ''}`.toLowerCase();
  return CATEGORIES.find((c) => c.match.test(haystack)) ?? CATEGORIES[CATEGORIES.length - 1];
}
