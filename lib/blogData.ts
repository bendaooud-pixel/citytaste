export interface BlogPlace {
  name: string;
  description: string;
  address: string;
  rating: number;
  image: string;
  citySlug: string;
  placeSlug?: string;
}

export interface BlogArticle {
  title: string;
  slug: string;
  city: string;
  citySlug: string;
  category: string;
  coverImage: string;
  publishedAt: string;
  readingTime: number;
  intro: string;
  body: string;
  places: BlogPlace[];
  metaDescription: string;
}

const articles: BlogArticle[] = [
  {
    title: "Best Cafés in Paris 2025",
    slug: "best-cafes-paris",
    city: "Paris",
    citySlug: "paris",
    category: "Cafés",
    coverImage:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80",
    publishedAt: "2025-03-10",
    readingTime: 6,
    metaDescription:
      "Discover the best cafés in Paris for 2025 — from classic zinc-counter espresso bars in Saint-Germain to specialty third-wave roasters in the 10th arrondissement.",
    intro:
      "Paris has been the world capital of café culture since the 18th century, and in 2025 the scene has never been more exciting. Whether you're after a slow morning croissant and café crème, a laptop-friendly afternoon corner, or a natural-wine aperitif by dusk, these are the addresses every coffee lover should know.",
    body: `Paris cafés are not merely places to drink coffee — they are institutions. The word *café* entered the French language in the 1680s when the first coffeehouses opened near the Palais-Royal, and ever since the city has perfected the art of lingering over a small cup.

Today the scene spans three distinct generations. The traditional *bistrot-café* — zinc counter, mirrored walls, a single espresso machine — remains the soul of neighbourhood life. Then came the Australian-influenced specialty-coffee wave of the early 2010s, bringing single-origin pour-overs and flat whites. Most recently, a new guard of Parisian roasters has emerged that does everything in-house, sourcing directly from farms in Ethiopia, Colombia, and Guatemala.

What unites all three is the French insistence on taking your time. Unlike the grab-and-go culture that dominates London or New York, a Parisian café seat is yours for as long as you need it. Order once, stay all afternoon — no one will hurry you out.`,
    places: [
      {
        name: "Café de Flore",
        description:
          "The most legendary café in Paris, where Simone de Beauvoir and Jean-Paul Sartre argued philosophy over café crèmes. Still serves the best croissant in Saint-Germain.",
        address: "172 Boulevard Saint-Germain, 75006 Paris",
        rating: 4.5,
        image:
          "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80",
        citySlug: "paris",
      },
      {
        name: "Ten Belles",
        description:
          "The café that launched the Parisian specialty-coffee revolution. Single-origin espresso, house-baked pastries, and a sun-drenched terrace on Canal Saint-Martin.",
        address: "10 Rue de la Grange aux Belles, 75010 Paris",
        rating: 4.6,
        image:
          "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800&q=80",
        citySlug: "paris",
      },
      {
        name: "Café Procope",
        description:
          "Founded in 1686 and never closed since, this is the oldest café in Paris. Voltaire, Rousseau, and Benjamin Franklin all drank here. Today it serves classic French cuisine.",
        address: "13 Rue de l'Ancienne Comédie, 75006 Paris",
        rating: 4.3,
        image:
          "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=800&q=80",
        citySlug: "paris",
      },
      {
        name: "Café Oberkampf",
        description:
          "A neighbourhood favourite in the 11th: Belleville-roasted coffee, excellent tartines, and a crowd of young Parisians who actually live in the area.",
        address: "3 Rue Neuve Popincourt, 75011 Paris",
        rating: 4.4,
        image:
          "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80",
        citySlug: "paris",
      },
      {
        name: "Télescope",
        description:
          "Tiny, precise, and fiercely focused on quality. Télescope serves some of the most carefully extracted espresso in the city, steps from the Palais-Royal.",
        address: "5 Rue Villedo, 75001 Paris",
        rating: 4.7,
        image:
          "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80",
        citySlug: "paris",
      },
      {
        name: "Café de la Paix",
        description:
          "A grand Second-Empire café facing the Opéra Garnier, with gilded ceilings and an oyster bar. More museum than café — but a genuine Paris experience.",
        address: "5 Place de l'Opéra, 75009 Paris",
        rating: 4.2,
        image:
          "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
        citySlug: "paris",
      },
    ],
  },
  {
    title: "Best Halal Restaurants in Paris",
    slug: "best-halal-restaurants-paris",
    city: "Paris",
    citySlug: "paris",
    category: "Halal",
    coverImage:
      "https://images.unsplash.com/photo-1544025162-d76694265947?w=1200&q=80",
    publishedAt: "2025-04-02",
    readingTime: 7,
    metaDescription:
      "A curated guide to the best halal restaurants in Paris — from couscous royale in Barbès to contemporary French-Moroccan fusion in the Marais.",
    intro:
      "Paris is home to one of Europe's most vibrant halal dining scenes. From traditional Maghrebi couscous restaurants to modern fusion bistros, the city offers a remarkable range of certified halal options that stand comfortably alongside the finest Parisian tables.",
    body: `France has the largest Muslim population in Western Europe, and Paris has long been the crossroads of North African, Middle Eastern, and Sub-Saharan culinary traditions. But the halal restaurant scene of 2025 is something new: chefs trained at Michelin-starred kitchens are opening restaurants that apply French technique to halal ingredients, producing dishes that feel entirely at home in the city's dining culture.

The 18th and 19th arrondissements remain the heartland of traditional Algerian, Moroccan, and Tunisian cooking, with family-run restaurants serving harira, mechoui, and bastilla that rival anything you'd find in Marrakech or Algiers. Meanwhile, the 11th and the Marais have become home to a new generation of halal bistros where the menu might read coq au vin (with halal poulet fermier) followed by makroud with salted caramel.

Look for the official ARGML or AVS certification logos displayed at the entrance — these are the two most rigorous certification bodies in France.`,
    places: [
      {
        name: "Le Souk",
        description:
          "Atmospheric Moroccan restaurant in the Marais with low tables, brass lanterns, and a tagine selection that changes weekly. The pastilla au pigeon is exceptional.",
        address: "1 Rue Keller, 75011 Paris",
        rating: 4.6,
        image:
          "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&q=80",
        citySlug: "paris",
      },
      {
        name: "La Maison de l'Aubrac",
        description:
          "Certified halal brasserie in the 8th serving prime French beef — the entrecôte with bone marrow butter is the most ordered dish in the house.",
        address: "37 Rue Marbeuf, 75008 Paris",
        rating: 4.5,
        image:
          "https://images.unsplash.com/photo-1546833998-877b37c2e5c6?w=800&q=80",
        citySlug: "paris",
      },
      {
        name: "Waly-Fay",
        description:
          "West African cuisine in the 11th, with mafé, thieboudienne, and yassa poulet. A cult favourite among Parisians seeking bold West African flavours.",
        address: "6 Rue Godefroy Cavaignac, 75011 Paris",
        rating: 4.4,
        image:
          "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80",
        citySlug: "paris",
      },
      {
        name: "Chez Hamid",
        description:
          "The best couscous royale in Barbès — a vast platter of lamb merguez, chicken, and vegetables with a rich broth ladled tableside. Packed every Friday.",
        address: "68 Boulevard de la Chapelle, 75018 Paris",
        rating: 4.7,
        image:
          "https://images.unsplash.com/photo-1476224203421-9ac39bcb3b42?w=800&q=80",
        citySlug: "paris",
      },
      {
        name: "Biondi",
        description:
          "Modern halal Argentine-Italian steakhouse in the 11th. The best Argentine-cut beef in Paris, grilled over quebracho wood with chimichurri.",
        address: "18 Rue de la Forge Royale, 75011 Paris",
        rating: 4.8,
        image:
          "https://images.unsplash.com/photo-1558030006-450675393462?w=800&q=80",
        citySlug: "paris",
      },
      {
        name: "Le Baratin",
        description:
          "A neighbourhood bistro in Belleville serving halal-certified French classics — steak tartare, beef cheek, and a celebrated wine list that pairs perfectly.",
        address: "3 Rue Jouye-Rouve, 75020 Paris",
        rating: 4.3,
        image:
          "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
        citySlug: "paris",
      },
    ],
  },
  {
    title: "Best Brunch Spots in Barcelona",
    slug: "best-brunch-barcelona",
    city: "Barcelona",
    citySlug: "barcelona",
    category: "Brunch",
    coverImage:
      "https://images.unsplash.com/photo-1543352634-a1c51d9f1fa7?w=1200&q=80",
    publishedAt: "2025-04-15",
    readingTime: 5,
    metaDescription:
      "The best brunch in Barcelona in 2025 — late-morning patatas bravas, avocado toast with Catalan olive oil, and bottomless mimosas in the Gothic Quarter and Gràcia.",
    intro:
      "Barcelona has enthusiastically adopted brunch culture without abandoning its own traditions. The result is a wonderfully hybrid meal: you might find pan con tomate alongside eggs Benedict, or a glass of cava in place of prosecco. These are the spots doing it best.",
    body: `Barcelona's relationship with late-morning eating is complex. Traditional Catalan culture revolves around a light breakfast and a heavy midday lunch, but the influx of international residents and a thriving hospitality scene has produced a new class of brunch-centric restaurants that are entirely their own thing — neither Anglo-American nor Spanish, but something genuinely Barcelonan.

The best brunch spots in the city share a few qualities: natural light (Barcelona's architects seem constitutionally incapable of building a dark room), local ingredients from the Boqueria or the Mercat de Santa Caterina, and a relaxed pace that respects the city's unhurried rhythms. Tables turn slowly here — a feature, not a bug.

Expect to queue on weekends at any of the addresses below. Go early (10:00–11:00) or late (13:30+) to avoid the longest waits.`,
    places: [
      {
        name: "Federal Café",
        description:
          "The café that brought Australian brunch culture to Barcelona. The avocado toast with Catalan extra-virgin olive oil and chilli flakes has been imitated but never bettered.",
        address: "Carrer del Parlament, 39, 08015 Barcelona",
        rating: 4.6,
        image:
          "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&q=80",
        citySlug: "barcelona",
      },
      {
        name: "Brunch & Cake",
        description:
          "Bright, plant-filled dining room in Eixample serving health-forward brunch plates — açaí bowls, smashed avocado, and the best banana bread in the city.",
        address: "Carrer d'Enric Granados, 19, 08007 Barcelona",
        rating: 4.5,
        image:
          "https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=800&q=80",
        citySlug: "barcelona",
      },
      {
        name: "Bar Calders",
        description:
          "A Sant Antoni institution. Arrive before noon for pinxtos and cava, or go later for their legendary patatas bravas and huevos rotos with jamón ibérico.",
        address: "Carrer del Parlament, 25, 08015 Barcelona",
        rating: 4.7,
        image:
          "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&q=80",
        citySlug: "barcelona",
      },
      {
        name: "Café Emma",
        description:
          "Hidden in the Gothic Quarter, this charming café serves French-influenced brunch — croque madame, crêpes with honey and walnuts, and excellent filter coffee.",
        address: "Carrer dels Banys Nous, 16, 08002 Barcelona",
        rating: 4.4,
        image:
          "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=800&q=80",
        citySlug: "barcelona",
      },
      {
        name: "Nomad Coffee",
        description:
          "Barcelona's finest specialty roastery also has a café in El Born. The filter coffee is outstanding, and the weekend brunch menu pairs well with their single-origin selections.",
        address: "Passatge Sert, 12, 08003 Barcelona",
        rating: 4.8,
        image:
          "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80",
        citySlug: "barcelona",
      },
      {
        name: "Flax & Kale",
        description:
          "Barcelona's landmark healthy-eating restaurant, with a vast skylit dining room in the Raval. The brunch menu focuses on vegetable-forward dishes with global influences.",
        address: "Carrer dels Tallers, 74B, 08001 Barcelona",
        rating: 4.5,
        image:
          "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80",
        citySlug: "barcelona",
      },
    ],
  },
  {
    title: "Cheap Eats in Paris: The Budget Food Guide",
    slug: "cheap-eats-paris",
    city: "Paris",
    citySlug: "paris",
    category: "Budget",
    coverImage:
      "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=1200&q=80",
    publishedAt: "2025-02-20",
    readingTime: 8,
    metaDescription:
      "Eat brilliantly in Paris without breaking the bank. Our budget food guide covers the best cheap eats — from €2 baguettes to €12 set lunches at neighbourhood bistros.",
    intro:
      "Paris has a reputation for expensive dining — and while the city certainly has its share of €300 tasting menus, it also has some of the best cheap food in Europe. With the right knowledge, you can eat extraordinarily well for under €15 a meal.",
    body: `The secret to eating cheaply in Paris is the same as the secret to eating well: go where the locals go. Tourist menus near the Eiffel Tower are expensive and mediocre; a plat du jour at a neighbourhood bistro in the 20th will cost €13 and be genuinely delicious.

A few principles to keep in mind. The boulangerie is your best friend — a fresh baguette costs under €2 everywhere in Paris (legally, as boulangeries with a licence artisanale are price-regulated), and combined with a wedge of cheese from a nearby fromagerie, it constitutes a fine lunch for under €6. The marché (outdoor market) is your second ally — most arrondissements have at least one weekly market where you can assemble a picnic for very little.

For sit-down meals, the formule (set menu) at lunch is the great French equaliser. Many restaurants that charge €40+ in the evening offer a two-course lunch for €14–17, and the quality is identical — the kitchen is the same kitchen.

Finally: the 10th, 11th, 13th, and 18th arrondissements consistently offer the best value. The 6th and 8th are generally the most expensive.`,
    places: [
      {
        name: "L'As du Fallafel",
        description:
          "The most famous falafel in Paris, and justifiably so. A stuffed pita with crispy falafels, tahini, and harissa costs €8 and is a complete meal. Queue down the Rue des Rosiers.",
        address: "34 Rue des Rosiers, 75004 Paris",
        rating: 4.7,
        image:
          "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=800&q=80",
        citySlug: "paris",
      },
      {
        name: "Marché d'Aligre",
        description:
          "The best covered market in Paris for cheap, high-quality produce. The outdoor section has North African vendors selling spices, olives, and dried fruit at very low prices.",
        address: "Place d'Aligre, 75012 Paris",
        rating: 4.5,
        image:
          "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=800&q=80",
        citySlug: "paris",
      },
      {
        name: "Bouillon Chartier",
        description:
          "A historic bouillon (worker's restaurant) operating since 1896. Steak-frites, roast chicken, and profiteroles — all at prices that feel like 1980. Cash only, communal tables.",
        address: "7 Rue du Faubourg Montmartre, 75009 Paris",
        rating: 4.4,
        image:
          "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
        citySlug: "paris",
      },
      {
        name: "Chez Alain Miam Miam",
        description:
          "A crêperie hidden in the Marché des Enfants Rouges. Alain hand-folds the most spectacular buckwheat crêpes in Paris — with eggs, cheese, and whatever the market had that morning.",
        address: "39 Rue de Bretagne, 75003 Paris",
        rating: 4.8,
        image:
          "https://images.unsplash.com/photo-1519676867240-f03562e64548?w=800&q=80",
        citySlug: "paris",
      },
      {
        name: "Dong Huong",
        description:
          "The best pho in Paris, in Belleville's Chinatown. A massive bowl of brisket pho with all the trimmings costs €11. Always busy, always worth the wait.",
        address: "14 Rue Louis Bonnet, 75011 Paris",
        rating: 4.6,
        image:
          "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=800&q=80",
        citySlug: "paris",
      },
      {
        name: "Le Petit Vendôme",
        description:
          "A no-frills sandwich shop two minutes from the Madeleine that somehow escapes the tourist markup. The jambon-beurre on a Poilâne sourdough is €6 and worth every centime.",
        address: "8 Rue des Capucines, 75002 Paris",
        rating: 4.3,
        image:
          "https://images.unsplash.com/photo-1509722747041-616f39b57569?w=800&q=80",
        citySlug: "paris",
      },
      {
        name: "Krishna Bhavan",
        description:
          "Paris's best South Indian vegetarian restaurant, in the Passage Brady. A thali with three curries, rice, and naan bread costs €13 and will defeat even the hungriest visitor.",
        address: "24 Rue Cail, 75010 Paris",
        rating: 4.5,
        image:
          "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=80",
        citySlug: "paris",
      },
    ],
  },
  {
    title: "Romantic Restaurants in Paris for 2025",
    slug: "romantic-restaurants-paris",
    city: "Paris",
    citySlug: "paris",
    category: "Romantic",
    coverImage:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80",
    publishedAt: "2025-01-28",
    readingTime: 6,
    metaDescription:
      "The most romantic restaurants in Paris for a special dinner in 2025 — candlelit bistros, Seine-side terraces, and discreet corners in Saint-Germain.",
    intro:
      "Paris didn't become the world's most romantic city by accident. The soft light, the narrow streets, the food — everything conspires toward intimacy. These are the restaurants that do it best.",
    body: `Romance in a Paris restaurant is about more than candlelight and red roses (though both help). It's about pace: a meal that unfolds across three hours, with conversation between each course and no pressure to vacate the table. It's about the quality of attention — a waiter who remembers your wine preference halfway through the meal. And it's about the food itself, which should be good enough to warrant genuine silence between bites.

The restaurants below range from grand occasions requiring weeks of advance booking to neighbourhood bistros you might wander into on a whim. What they share is that quality of intimacy that Paris, at its best, always delivers.

A note on booking: for any special occasion at the top addresses, book at least three weeks in advance. For the more casual options, same-week reservations are usually possible on weekdays.`,
    places: [
      {
        name: "Le Grand Véfour",
        description:
          "A First Empire jewel under the arcades of the Palais-Royal. The dining room has barely changed since Napoleon dined here with Joséphine. Classic haute cuisine.",
        address: "17 Rue de Beaujolais, 75001 Paris",
        rating: 4.8,
        image:
          "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=800&q=80",
        citySlug: "paris",
      },
      {
        name: "Tour d'Argent",
        description:
          "Overlooking Notre-Dame from the sixth floor, with the most storied cellar in France. The pressed duck (caneton numéroté) has been the signature dish since 1890.",
        address: "15 Quai de la Tournelle, 75005 Paris",
        rating: 4.7,
        image:
          "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=800&q=80",
        citySlug: "paris",
      },
      {
        name: "Septime",
        description:
          "The most sought-after reservation in Paris. Bertrand Grébaut's natural-wine-driven bistro in the 11th produces market-sourced menus that feel both spontaneous and perfectly composed.",
        address: "80 Rue de Charonne, 75011 Paris",
        rating: 4.9,
        image:
          "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
        citySlug: "paris",
      },
      {
        name: "Le Chateaubriand",
        description:
          "Iñaki Aizpitarte's legendary neo-bistro. The five-course set menu changes daily depending on what arrived at the market that morning. No phone bookings — book online at exactly 7 days ahead.",
        address: "129 Avenue Parmentier, 75011 Paris",
        rating: 4.7,
        image:
          "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80",
        citySlug: "paris",
      },
      {
        name: "Brasserie Lipp",
        description:
          "The great brasserie of Saint-Germain — unchanged since the 1950s, with its ceramic tiles and leather banquettes. The choucroute garnie is the thing to order.",
        address: "151 Boulevard Saint-Germain, 75006 Paris",
        rating: 4.4,
        image:
          "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
        citySlug: "paris",
      },
      {
        name: "Frenchie",
        description:
          "Gregory Marchand's bistro in the Rue du Nil, where market-fresh ingredients meet technique learned at Fifteen and Gramercy Tavern. Book months in advance.",
        address: "5 Rue du Nil, 75002 Paris",
        rating: 4.8,
        image:
          "https://images.unsplash.com/photo-1546833998-877b37c2e5c6?w=800&q=80",
        citySlug: "paris",
      },
    ],
  },
  {
    title: "Best Patisseries in Paris: The 2025 Guide",
    slug: "best-patisseries-paris",
    city: "Paris",
    citySlug: "paris",
    category: "Patisseries",
    coverImage:
      "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=1200&q=80",
    publishedAt: "2025-03-25",
    readingTime: 7,
    metaDescription:
      "The best patisseries in Paris for 2025 — from Pierre Hermé's iconic ispahan to the next generation of pastry chefs reinventing the mille-feuille.",
    intro:
      "French patisserie is arguably the most technically demanding culinary discipline in the world, and Paris is where it reaches its highest expression. These are the addresses — from legendary maisons to exciting newcomers — that every pastry lover needs to visit.",
    body: `The French pastry tradition rests on a paradox: the product must look effortlessly perfect while concealing enormous technical labour. A well-made croissant involves three days of work — laminating, resting, folding — before it reaches the oven. A Pierre Hermé macaron contains eleven separate components. The casual beauty of a Paris patisserie window is, in fact, the result of hundreds of hours of practice and refinement.

In 2025, the scene is split between the great maisons — Ladurée, Fauchon, Pierre Hermé — that have been defining French pastry for decades, and a new generation of pâtissiers who trained under these masters and are now opening their own shops. The newcomers tend to be less sweet, more seasonal, and more personal: you'll find flavours that reference their childhoods in Vietnam, Morocco, or Martinique.

What to try if you can only order one thing: the croissant is the acid test of any boulangerie or patisserie. It should be deeply golden (almost mahogany at the tips), flaky in the outer layers and honeycomb-soft inside, with a pronounced butteriness that doesn't tip into greasiness.`,
    places: [
      {
        name: "Pierre Hermé",
        description:
          "The 'Picasso of pastry' — Pierre Hermé reinvented the macaron and created the ispahan (rose, lychee, raspberry) that is now one of the most imitated pastries in the world.",
        address: "72 Rue Bonaparte, 75006 Paris",
        rating: 4.8,
        image:
          "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80",
        citySlug: "paris",
      },
      {
        name: "Ladurée",
        description:
          "The original macaron house, operating since 1862. The double-decker tearoom on the Rue Royale is one of the great Parisian interiors. Their seasonal collections are always spectacular.",
        address: "16 Rue Royale, 75008 Paris",
        rating: 4.7,
        image:
          "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=800&q=80",
        citySlug: "paris",
      },
      {
        name: "Du Pain et des Idées",
        description:
          "Christophe Vasseur's extraordinary boulangerie-patisserie in the Canal Saint-Martin neighbourhood. The escargot (swirled pastry with pistachio and praline) is unmissable. Closed weekends.",
        address: "34 Rue Yves Toudic, 75010 Paris",
        rating: 4.9,
        image:
          "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&q=80",
        citySlug: "paris",
      },
      {
        name: "Stohrer",
        description:
          "The oldest patisserie in Paris (1730), founded by Louis XV's pastry chef. They invented the baba au rhum here. The shop has been a monument historique since 1984.",
        address: "51 Rue Montorgueil, 75002 Paris",
        rating: 4.6,
        image:
          "https://images.unsplash.com/photo-1464454709131-ffd692591ee5?w=800&q=80",
        citySlug: "paris",
      },
      {
        name: "Gâteaux Thoumieux",
        description:
          "Jean-François Piège's patisserie near the Invalides, where pastry chef Sebastien Gaudard creates architectural layer cakes and tarts that are almost too beautiful to eat.",
        address: "58 Rue Saint-Dominique, 75007 Paris",
        rating: 4.7,
        image:
          "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=800&q=80",
        citySlug: "paris",
      },
      {
        name: "Yann Couvreur Pâtisserie",
        description:
          "Yann Couvreur's shop in the 10th is the patisserie the next generation is talking about. His millefeuille — with vanilla cream and candied lemon — is a modern classic.",
        address: "23 Rue des Vinaigriers, 75010 Paris",
        rating: 4.8,
        image:
          "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80",
        citySlug: "paris",
      },
    ],
  },
  {
    title: "Unmissable Monuments in Paris: A Foodie's Guide",
    slug: "monuments-paris",
    city: "Paris",
    citySlug: "paris",
    category: "Sightseeing",
    coverImage:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80",
    publishedAt: "2025-02-05",
    readingTime: 6,
    metaDescription:
      "Paris's greatest monuments — and the best places to eat near each one. Visit the Eiffel Tower, the Louvre, Notre-Dame, and Sainte-Chapelle with a meal plan in hand.",
    intro:
      "The monuments of Paris are the reason most visitors come — but the meals you eat near them can be just as memorable. We've paired each of the city's great landmarks with a nearby restaurant, café, or boulangerie worth going out of your way for.",
    body: `The great mistake tourists make in Paris is treating monuments and food as separate categories of experience. In reality, the city's geography means that every great building is within a short walk of excellent food. The challenge is knowing where to go.

This guide is arranged as a loose walking itinerary, moving from the Île de la Cité westward. You could cover all five monuments in a single long day if you start early, or spread them across two or three days with more leisurely meal breaks.

One practical note: the tourist density around Paris's top monuments is real, and restaurants immediately adjacent to them often depend on foot traffic rather than quality to fill their tables. The addresses we recommend are all within a short walk but positioned away from the tourist corridors.`,
    places: [
      {
        name: "Tour Eiffel — Café de l'Homme",
        description:
          "Facing the Eiffel Tower across the Trocadéro, this elegant brasserie offers the best view of the tower in Paris (especially at night) with food that is genuinely good.",
        address: "17 Place du Trocadéro, 75016 Paris",
        rating: 4.4,
        image:
          "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=800&q=80",
        citySlug: "paris",
      },
      {
        name: "Louvre — Café Marly",
        description:
          "Under the Richelieu wing of the Louvre, with glass walls facing the glass pyramid. French brasserie classics — steak tartare, croque monsieur — in a genuinely beautiful setting.",
        address: "93 Rue de Rivoli, 75001 Paris",
        rating: 4.5,
        image:
          "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&q=80",
        citySlug: "paris",
      },
      {
        name: "Notre-Dame — Les Deux Palais",
        description:
          "A classic Paris brasserie on the Île de la Cité, two minutes from Notre-Dame. The formule déjeuner (€18, two courses) is one of the city's best-value lunches.",
        address: "3 Boulevard du Palais, 75001 Paris",
        rating: 4.3,
        image:
          "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80",
        citySlug: "paris",
      },
      {
        name: "Sainte-Chapelle — Boulangerie Gosselin",
        description:
          "On the Rue Saint-Honoré, five minutes from the Palais de Justice. Baguette tradition at €1.20, perfect pain au chocolat, and excellent sandwiches for a budget lunch.",
        address: "125 Rue Saint-Honoré, 75001 Paris",
        rating: 4.6,
        image:
          "https://images.unsplash.com/photo-1594818379496-da1e345b0ded?w=800&q=80",
        citySlug: "paris",
      },
      {
        name: "Arc de Triomphe — Le 8ème by Apicius",
        description:
          "A refined brasserie in the 8th, a short walk down the Champs-Élysées. The lunch formule represents genuine value in an expensive neighbourhood.",
        address: "20 Rue d'Artois, 75008 Paris",
        rating: 4.4,
        image:
          "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&q=80",
        citySlug: "paris",
      },
    ],
  },
  {
    title: "Best Rooftop Bars in Barcelona",
    slug: "rooftop-bars-barcelona",
    city: "Barcelona",
    citySlug: "barcelona",
    category: "Bars",
    coverImage:
      "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=1200&q=80",
    publishedAt: "2025-05-01",
    readingTime: 5,
    metaDescription:
      "The best rooftop bars in Barcelona for 2025 — 360° views of the city and the Mediterranean, sunset aperitivos, and cold cava above the Eixample skyline.",
    intro:
      "Barcelona's skyline — a dense patchwork of modernista towers and flat roofs, with the mountains behind and the sea ahead — is one of the most beautiful in Europe. These rooftop bars make the most of it.",
    body: `Barcelona's rooftop bar scene has exploded in the last decade, driven by the city's long warm season (evenings are pleasant from April through October) and an increasingly sophisticated hospitality industry. The best addresses offer not just views but genuinely good drinks programmes — proper vermut hour (from 12:00–14:00, the sacred Barcelona aperitivo ritual), craft cocktails, and an expanding selection of natural Catalan wines.

The key distinction to make is between hotel rooftops and standalone bars. Hotel rooftops (W, Grand Hotel Central, Ohla) generally offer the most polished service and the most spectacular views, but at a price premium and a dress code that can feel restrictive. Standalone rooftops in the Eixample and Poblenou tend to be less polished but more authentically Barcelonan — cheaper, louder, and with a local crowd rather than a tourist one.

For sunset, arrive 30 minutes before the projected sunset time. The golden light on Gaudí's city is extraordinary, and tables with direct western views fill fast.`,
    places: [
      {
        name: "Eclipse Bar — Hotel W Barcelona",
        description:
          "On the 26th floor of the sail-shaped W hotel, with uninterrupted 270° views of the Mediterranean and the city skyline. The best rooftop cocktails in Barcelona.",
        address: "Plaça de la Rosa dels Vents, 1, 08039 Barcelona",
        rating: 4.6,
        image:
          "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80",
        citySlug: "barcelona",
      },
      {
        name: "La Isabela Terrace — Grand Hotel Central",
        description:
          "The infinity pool and terrace bar at this Gothic Quarter hotel offers views of the cathedral and the old city. Excellent vermouth selection and tapas menu.",
        address: "Via Laietana, 30, 08003 Barcelona",
        rating: 4.7,
        image:
          "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
        citySlug: "barcelona",
      },
      {
        name: "Bar Calders Terrace",
        description:
          "Not the most famous rooftop, but the most local: an open terrace above a Sant Antoni bar with views across the Eixample and cold cañas for €3.",
        address: "Carrer del Parlament, 25, 08015 Barcelona",
        rating: 4.5,
        image:
          "https://images.unsplash.com/photo-1485872299829-c673f5194813?w=800&q=80",
        citySlug: "barcelona",
      },
      {
        name: "Sky Bar — Ohla Barcelona",
        description:
          "On the rooftop of the boutique Ohla hotel, with a jacuzzi pool and a cocktail menu that changes seasonally. The views of the Gothic Quarter and Sant Pere are superb.",
        address: "Via Laietana, 49, 08003 Barcelona",
        rating: 4.6,
        image:
          "https://images.unsplash.com/photo-1543549049-3ddc500e5cb1?w=800&q=80",
        citySlug: "barcelona",
      },
      {
        name: "Terraza del Raval",
        description:
          "A hidden gem on a converted warehouse roof in El Raval. Local DJs, natural Catalan wine, and views of the Macba and the Raval rooftops for a younger, arts-scene crowd.",
        address: "Carrer dels Àngels, 8, 08001 Barcelona",
        rating: 4.4,
        image:
          "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800&q=80",
        citySlug: "barcelona",
      },
      {
        name: "La Dolce Viteza",
        description:
          "Poblenou's answer to the rooftop bar craze: a relaxed terrace above a modernist industrial building, with Aperol spritzes and Catalan charcuterie boards.",
        address: "Rambla del Poblenou, 44, 08005 Barcelona",
        rating: 4.3,
        image:
          "https://images.unsplash.com/photo-1510627489930-0c1b0bfb6785?w=800&q=80",
        citySlug: "barcelona",
      },
    ],
  },
  {
    "title": "Best Pasta in Rome 2025",
    "slug": "best-pasta-rome",
    "city": "Rome",
    "citySlug": "rome",
    "category": "Restaurants",
    "coverImage": "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=1200&q=80",
    "publishedAt": "2026-05-06",
    "readingTime": 6,
    "metaDescription": "Discover the best pasta in Rome 2025 — from creamy carbonara to silky cacio e pepe at four iconic trattorias every food lover must try this year.",
    "intro": "Rome breathes pasta like no other city on earth. From smoky guanciale-laced carbonara to peppery cacio e pepe glistening under trattoria lights, the Eternal City's noodle obsession is alive and well in 2025. Here are four legendary spots where every forkful tells a story.",
    "body": "There is a particular magic to eating pasta in Rome that no cookbook can capture. It begins with the clatter of cutlery in a centuries-old dining room, the swirl of steam rising from a copper pan, and the unmistakable scent of guanciale crisping in its own amber fat. Roman pasta is a study in restraint — five ingredients, often fewer, transformed through technique and timing into something transcendent. The four pillars are sacred: carbonara, cacio e pepe, amatriciana, and gricia. Each has its temple, its high priest of mantecatura, and its devoted pilgrims lining up around cobblestoned corners.\n\nWhat makes 2025 such an exciting year for Roman pasta is the way classic trattorias are doubling down on tradition while a new generation refines technique to dazzling precision. The pecorino is grated finer, the pasta water more carefully reserved, the rigatoni sourced from artisan bronze-die producers in Gragnano. You'll find octogenarian nonnas hand-rolling tonnarelli in Trastevere kitchens just a few blocks from young chefs experimenting with aged guanciale and heritage grains. The result is a city where you can eat the same dish four nights in a row and have four entirely different revelations.\n\nTo eat well in Rome, you must wander. Skip the menus printed in six languages near the Trevi Fountain and head into Testaccio, Trastevere, and the quiet lanes of Monti. Order the house red in a carafe, tear the bread, and let the waiter guide you. Don't ask for parmesan — pecorino romano is king here, and adding cream to carbonara remains a culinary felony. Below are four restaurants that consistently deliver the kind of pasta moment that makes you close your eyes mid-bite. They range from white-tablecloth refinement to checkered-cloth chaos, but each one captures something essential about why Rome remains, indisputably, the greatest pasta city on the planet.",
    "places": [
      {
        "name": "Roscioli",
        "description": "An iconic salumeria-restaurant where the carbonara has reached near-mythical status among Rome's food cognoscenti. Book weeks ahead for a seat among hanging hams and shelves of cured glory.",
        "address": "Via dei Giubbonari, 21, 00186 Roma RM",
        "rating": 4.7,
        "image": "https://images.unsplash.com/photo-1516100882582-96c3a05fe590?w=800&q=80",
        "citySlug": "rome",
        "placeSlug": undefined
      },
      {
        "name": "Felice a Testaccio",
        "description": "The legendary home of tonnarelli cacio e pepe, mixed tableside with theatrical flourish. A Testaccio institution where the pasta is as unfussy as it is unforgettable.",
        "address": "Via Mastro Giorgio, 29, 00153 Roma RM",
        "rating": 4.6,
        "image": "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=800&q=80",
        "citySlug": "rome",
        "placeSlug": undefined
      },
      {
        "name": "Da Enzo al 29",
        "description": "A tiny, perpetually packed Trastevere trattoria serving some of the most honest carbonara and amatriciana in the city. Expect a wait, embrace the chaos, and leave smiling.",
        "address": "Via dei Vascellari, 29, 00153 Roma RM",
        "rating": 4.6,
        "image": "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=800&q=80",
        "citySlug": "rome",
        "placeSlug": undefined
      },
      {
        "name": "Armando al Pantheon",
        "description": "Family-run since 1961 and just steps from the Pantheon, Armando defies its touristy address with deeply traditional Roman pasta executed flawlessly. The gricia alone is worth the trip.",
        "address": "Salita dei Crescenzi, 31, 00186 Roma RM",
        "rating": 4.5,
        "image": "https://images.unsplash.com/photo-1481931098730-318b6f776db0?w=800&q=80",
        "citySlug": "rome",
        "placeSlug": undefined
      }
    ]
  },
  {
    "title": "Best Pasta in Rome 2025",
    "slug": "best-pasta-rome",
    "city": "Rome",
    "citySlug": "rome",
    "category": "Restaurants",
    "coverImage": "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=1200&q=80",
    "publishedAt": "2026-05-06",
    "readingTime": 6,
    "metaDescription": "Discover the best pasta in Rome 2025: from silky cacio e pepe to crispy guanciale carbonara at the Eternal City's most beloved trattorias and osterias.",
    "intro": "Rome runs on pasta. From smoky carbonara to peppery cacio e pepe, the city's four classic primi are religion here, and 2025 is shaping up to be a banner year for both old-guard trattorias and a new wave of pasta makers honoring tradition with modern finesse.",
    "body": "Roman pasta is built on humble ingredients elevated by technique and time. Guanciale crisped to a glassy snap, Pecorino Romano grated into clouds, black pepper toasted until floral, and starchy pasta water emulsified with patient wrist work — these are the pillars of cucina romana. The four pillars — carbonara, cacio e pepe, gricia, and amatriciana — read like a single recipe with variations, each one a study in how three or four ingredients can become something transcendent. Rigatoni, tonnarelli, and spaghettoni are the preferred shapes, their grooves and heft built to grip every drop of sauce.\n\nThe scene in 2025 is thrillingly varied. Trastevere and Testaccio still anchor the traditionalist crowd, where decades-old family-run trattorias serve plates that taste exactly as they did in your nonna's dreams. Meanwhile, a younger generation of chefs in Prati, Pigneto, and Monti are sourcing heritage grains, dry-aging guanciale in-house, and fermenting their own pecorino brines. The result is a city where you can eat a perfectly orthodox carbonara at lunch and an experimental pasta tasting menu by dinner — both equally Roman in spirit. Reservations have become essential, especially for weekend dinners; the best spots fill up weeks in advance.\n\nWhat truly sets Roman pasta apart is the ritual of eating it. A proper plate arrives steaming, dressed at the last moment, and is meant to be devoured immediately — no Instagram-worthy delays. Pair it with a carafe of crisp Frascati or a glass of Cesanese, finish with a wedge of crostata, and you understand why Romans guard their pasta traditions so fiercely. Whether you're chasing the perfect carbonara, hunting for hand-rolled tonnarelli, or simply looking for a neighborhood spot to call your own, the four restaurants below represent the very best of what Rome's pasta scene has to offer right now. Bring an appetite, leave your low-carb intentions at home, and prepare to understand pasta in a way you never have before.",
    "places": [
      {
        "name": "Roscioli Salumeria con Cucina",
        "description": "An iconic deli-restaurant near Campo de' Fiori serving what many call Rome's definitive carbonara, made with 24-month Pecorino and crispy guanciale. The intimate dining room and curated wine list make every meal feel like a celebration.",
        "address": "Via dei Giubbonari, 21, 00186 Roma RM",
        "rating": 4.7,
        "image": "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=800&q=80",
        "citySlug": "rome",
        "placeSlug": undefined
      },
      {
        "name": "Felice a Testaccio",
        "description": "A Testaccio institution since 1936, famous for its theatrical tableside tossing of tonnarelli cacio e pepe. The pasta is silky, peppery perfection, and the rigatoni all'amatriciana is equally beloved.",
        "address": "Via Mastro Giorgio, 29, 00153 Roma RM",
        "rating": 4.6,
        "image": "https://images.unsplash.com/photo-1548940740-204726a19be3?w=800&q=80",
        "citySlug": "rome",
        "placeSlug": undefined
      },
      {
        "name": "Da Enzo al 29",
        "description": "A pocket-sized trattoria in Trastevere that has earned cult status for its uncompromising classics and ingredients sourced from small Lazio producers. Expect a queue, but the carbonara and gricia are worth every minute.",
        "address": "Via dei Vascellari, 29, 00153 Roma RM",
        "rating": 4.6,
        "image": "https://images.unsplash.com/photo-1481931098730-318b6f776db0?w=800&q=80",
        "citySlug": "rome",
        "placeSlug": undefined
      },
      {
        "name": "Armando al Pantheon",
        "description": "A family-run gem just steps from the Pantheon, run by the Gargioli family for three generations. Their cacio e pepe and rigatoni con la pajata are textbook examples of cucina romana done with quiet mastery.",
        "address": "Salita de' Crescenzi, 31, 00186 Roma RM",
        "rating": 4.5,
        "image": "https://images.unsplash.com/photo-1556761223-4c4282c73f77?w=800&q=80",
        "citySlug": "rome",
        "placeSlug": undefined
      }
    ]
  }
];

export function getAllArticles(): BlogArticle[] {
  return articles.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getArticleBySlug(slug: string): BlogArticle | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getArticlesByCity(citySlug: string): BlogArticle[] {
  return articles.filter((a) => a.citySlug === citySlug);
}
