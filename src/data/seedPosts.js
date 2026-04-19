/** Unsplash — direct image URLs for demo posts */
const U = (id) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=82`

/**
 * Sample posts for an empty board (all assigned to current session so you can edit/delete).
 */
export function createSeedPosts(authorId) {
  const day = (n) =>
    new Date(Date.now() - n * 86400000).toISOString()

  return [
    {
      id: 'seed-post-01',
      title: 'Sunday farmers market haul',
      content:
        'Tomatoes were absurdly good this week — planning a big salad and a slow sauce. What would you cook first?',
      imageUrl: U('photo-1546069901-ba9599a7e63c'),
      createdAt: day(1),
      upvotes: 42,
      authorId,
      comments: [
        {
          id: 'seed-c-1',
          text: 'That basil is calling for caprese stacks.',
          createdAt: day(1),
        },
      ],
    },
    {
      id: 'seed-post-02',
      title: 'Neapolitan pizza night',
      content:
        'Finally getting leopard spots on the crust. 500°F floor temp made the difference.',
      imageUrl: U('photo-1574071318508-1cdbab80d002'),
      createdAt: day(2),
      upvotes: 128,
      authorId,
      comments: [],
    },
    {
      id: 'seed-post-03',
      title: 'First ramen bowl of fall',
      content:
        'Tonkotsu broth simmered all afternoon. Worth every minute.',
      imageUrl: U('photo-1569718212165-3a8278d5f624'),
      createdAt: day(0),
      upvotes: 89,
      authorId,
      comments: [
        {
          id: 'seed-c-2',
          text: 'That color on the broth is perfect.',
          createdAt: day(0),
        },
      ],
    },
    {
      id: 'seed-post-04',
      title: 'Grilled salmon + herb salad',
      content:
        'Skin stayed crisp. Lemon dill butter at the very end — non‑negotiable.',
      imageUrl: U('photo-1467003909585-2f8a72700288'),
      createdAt: day(3),
      upvotes: 56,
      authorId,
      comments: [],
    },
    {
      id: 'seed-post-05',
      title: 'Backyard BBQ spread',
      content:
        'Brisket hit 203°F internal, wrapped at the stall. Resting in the cooler changed the texture.',
      imageUrl: U('photo-1555939594-58d7cb561ad1'),
      createdAt: day(4),
      upvotes: 201,
      authorId,
      comments: [],
    },
    {
      id: 'seed-post-06',
      title: 'Birthday brunch table',
      content:
        'Croissants from the bakery + lots of berries. Keeping it simple.',
      imageUrl: U('photo-1615937657715-bc7b4b7962c1'),
      createdAt: day(5),
      upvotes: 34,
      authorId,
      comments: [],
    },
    {
      id: 'seed-post-07',
      title: 'Cast iron steak test',
      content:
        'Reverse sear on a thick ribeye. Thermometer beats guessing every time.',
      imageUrl: U('photo-1544025162-d76694265947'),
      createdAt: day(2),
      upvotes: 73,
      authorId,
      comments: [],
    },
    {
      id: 'seed-post-08',
      title: 'One‑pan chicken & veg',
      content:
        'High heat, minimal fuss — dinner in under an hour including cleanup.',
      imageUrl: U('photo-1582735689369-4fe89db7114c'),
      createdAt: day(1),
      upvotes: 61,
      authorId,
      comments: [],
    },
    {
      id: 'seed-post-09',
      title: 'Coastal fish tacos',
      content:
        'Quick slaw, lime crema, and grilled fish — fold and eat standing at the counter.',
      imageUrl: U('photo-1589302168068-964664d93dc0'),
      createdAt: day(6),
      upvotes: 47,
      authorId,
      comments: [],
    },
    {
      id: 'seed-post-10',
      title: 'Bánh mì prep line',
      content:
        'Pickles from last week, chicken off the grill, cilantro from the windowsill.',
      imageUrl: U('photo-1556910103-1c02745aae4d'),
      createdAt: day(3),
      upvotes: 92,
      authorId,
      comments: [],
    },
    {
      id: 'seed-post-11',
      title: 'Poke bowl lunch',
      content:
        'Tried a new rice-to-veg ratio — more crunch, less heavy for midday.',
      imageUrl: U('photo-1543352634-a1c51d9f1fa7'),
      createdAt: day(0),
      upvotes: 154,
      authorId,
      comments: [],
    },
    {
      id: 'seed-post-12',
      title: 'French onion soup weather',
      content:
        'Onions cooked down for an hour until they look like mahogany. Gruyère cap is mandatory.',
      imageUrl: U('photo-1547592166-23ac45744acd'),
      createdAt: day(7),
      upvotes: 67,
      authorId,
      comments: [],
    },
  ]
}
