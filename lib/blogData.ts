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
  },
  {
    "title": "Best Pasta in Rome 2025",
    "slug": "best-pasta-rome",
    "city": "Rome",
    "citySlug": "rome",
    "category": "Restaurants",
    "coverImage": "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=1200&q=80",
    "publishedAt": "2026-05-07",
    "readingTime": 6,
    "metaDescription": "Discover the best pasta in Rome 2025: legendary trattorias serving cacio e pepe, carbonara, and amatriciana the way Romans have loved them for generations.",
    "intro": "Rome doesn't just serve pasta — it elevates it to a quiet, daily ritual. From smoky guanciale-laced carbonara to the silken pull of cacio e pepe, the Eternal City's noodle traditions remain gloriously unshaken in 2025.",
    "body": "To eat pasta in Rome is to taste centuries of pragmatism turned into poetry. The city's four pillars — carbonara, cacio e pepe, amatriciana, and gricia — share a common DNA of pecorino romano, black pepper, and cured pork, yet each trattoria coaxes them into something singular. In the cobbled lanes of Trastevere, marble-topped tables still groan under tonnarelli twirled tableside in hollowed wheels of cheese, while in Testaccio, the old slaughterhouse quarter, butchers' offcuts continue to inspire some of the most soulful sauces in Italy.\n\nWhat makes 2025 a particularly thrilling year for Roman pasta is the balance the city has struck between reverence and quiet reinvention. A new generation of chefs has taken over family kitchens, sourcing heritage grains from Lazio's Tuscia hills and aging their guanciale longer for deeper, almost nutty richness. Yet the soul remains stubbornly old-school: hand-rolled rigatoni with the tooth to grip a sauce, eggs from the Castelli Romani so orange they stain the spoon, and pepper cracked at the moment of plating so its perfume hits you before the fork does. Reservations have become essential at the icons, but the reward is a meal that feels both timeless and urgent.\n\nBeyond the classics, look for seasonal flourishes that mark the Roman calendar — spring's pasta with carciofi alla romana, summer's bright tonnarelli with zucchini blossoms, autumn's earthy chestnut tagliatelle. The best meals often happen at lunch, when sunlight slants across paper-covered tables and a quartino of Frascati costs less than a cappuccino in Piazza Navona. Wherever you sit, watch how Romans eat: slowly, attentively, with a kind of relaxed devotion. Pasta here isn't a course — it's the point. The four addresses below are the ones I send friends to first, the trattorias and osterie where every twirl of the fork tells you exactly why this city has been feeding pilgrims, poets, and emperors for nearly three thousand years.",
    "places": [
      {
        "name": "Felice a Testaccio",
        "description": "The temple of tonnarelli cacio e pepe, theatrically tossed tableside until the pepper-flecked strands gleam. A Testaccio institution since 1936 with a waiting list that proves the hype is earned.",
        "address": "Via Mastro Giorgio, 29, 00153 Roma RM",
        "rating": 4.7,
        "image": "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=800&q=80",
        "citySlug": "rome",
        "placeSlug": undefined
      },
      {
        "name": "Roscioli",
        "description": "A salumeria-wine bar hybrid where the carbonara has reached near-mythic status thanks to obsessively sourced guanciale and golden Paolo Parisi eggs. Book weeks ahead for the intimate back room.",
        "address": "Via dei Giubbonari, 21, 00186 Roma RM",
        "rating": 4.6,
        "image": "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=800&q=80",
        "citySlug": "rome",
        "placeSlug": undefined
      },
      {
        "name": "Da Enzo al 29",
        "description": "A pocket-sized Trastevere trattoria with checkered tablecloths and a fiercely loyal following. The rigatoni all'amatriciana — sweet-tart tomato, crisp guanciale, sharp pecorino — is the platonic ideal.",
        "address": "Via dei Vascellari, 29, 00153 Roma RM",
        "rating": 4.6,
        "image": "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=800&q=80",
        "citySlug": "rome",
        "placeSlug": undefined
      },
      {
        "name": "Armando al Pantheon",
        "description": "A family-run classic just steps from the Pantheon, defying its tourist-zone address with serious cooking. Their gricia is a masterclass: glossy, peppery, and impossibly comforting.",
        "address": "Salita dei Crescenzi, 31, 00186 Roma RM",
        "rating": 4.5,
        "image": "https://images.unsplash.com/photo-1589227365533-cee630bd59bd?w=800&q=80",
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
    "publishedAt": "2026-05-08",
    "readingTime": 6,
    "metaDescription": "Discover the best pasta in Rome 2025 — from silky cacio e pepe to peppery carbonara at the Eternal City's most beloved trattorias and modern kitchens.",
    "intro": "Rome runs on pasta. From smoky guanciale-laced carbonara to glossy ribbons of cacio e pepe, the city's four cardinal pastas — carbonara, cacio e pepe, amatriciana, and gricia — define a culinary identity older than the cobblestones beneath your feet. These are the kitchens turning out the most unforgettable plates in 2025.",
    "body": "Pasta in Rome is less a dish than a doctrine. The pillars are sacred — guanciale never pancetta, pecorino romano never parmigiano, black pepper toasted until it perfumes the entire kitchen — and the best trattorias treat these rules with the reverence of liturgy. Step into a tiled dining room in Testaccio or Trastevere at lunchtime and you'll see waiters tossing tonnarelli tableside in wheels of cheese, the steam curling up toward sepia photographs of grandmothers who probably wrote the recipe. The pasta itself, often hand-cut that morning, has a toothsome bite that bottled brands simply cannot replicate.\n\nWhat makes the 2025 scene exciting is how Rome's pasta culture is evolving without abandoning its soul. A new generation of chefs is sourcing heritage grains from Lazio farms, fermenting their own guanciale, and reviving forgotten shapes like fieno di Canepina and rigatoni alla zozzona. Yet the soul-warming classics remain untouchable — a perfect carbonara is still a study in restraint, four ingredients negotiating creaminess without a drop of cream, the egg yolk emulsifying with starchy pasta water into liquid gold. Sit at a marble-topped table with a glass of Frascati and you understand why Romans rarely stray from their neighborhood favorites.\n\nBeyond the icons, look for amatriciana that balances tomato's sweetness with guanciale's funk, and gricia — carbonara's eggless older sibling — which separates the great kitchens from the merely good. The dining room buzz is loud, the wine pours generous, and the bread is for sopping up sauce, never for buttering. Whether you're chasing a quiet lunch in Monti or a long, late dinner in Prati, these four spots represent the soul of Roman pasta right now: rooted in tradition, sharpened by craft, and absolutely worth the queue.",
    "places": [
      {
        "name": "Roscioli",
        "description": "A salumeria-meets-restaurant where the carbonara has reached cult status, made with Tuscan egg yolks and 24-month aged pecorino. Book weeks ahead for the intimate marble-counter dining room.",
        "address": "Via dei Giubbonari 21, 00186 Roma RM",
        "rating": 4.7,
        "image": "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=800&q=80",
        "citySlug": "rome",
        "placeSlug": undefined
      },
      {
        "name": "Da Felice a Testaccio",
        "description": "The Testaccio institution where waiters toss tonnarelli cacio e pepe tableside with theatrical flourish. Family-run since 1936 and still the gold standard for the four Roman classics.",
        "address": "Via Mastro Giorgio 29, 00153 Roma RM",
        "rating": 4.6,
        "image": "https://images.unsplash.com/photo-1481931098730-318b6f776db0?w=800&q=80",
        "citySlug": "rome",
        "placeSlug": undefined
      },
      {
        "name": "Armando al Pantheon",
        "description": "A tiny, wood-paneled trattoria steps from the Pantheon, run by the Gargioli family for three generations. Their gricia and amatriciana are textbook examples of Roman restraint and depth.",
        "address": "Salita de' Crescenzi 31, 00186 Roma RM",
        "rating": 4.6,
        "image": "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=800&q=80",
        "citySlug": "rome",
        "placeSlug": undefined
      },
      {
        "name": "Trattoria Pennestri",
        "description": "An Ostiense favorite blending tradition with modern technique, where the rigatoni alla zozzona — a glorious mash-up of carbonara and amatriciana — has become a pilgrimage dish.",
        "address": "Via Giovanni da Empoli 5, 00154 Roma RM",
        "rating": 4.5,
        "image": "https://images.unsplash.com/photo-1546549032-9571cd6b27df?w=800&q=80",
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
    "publishedAt": "2026-05-09",
    "readingTime": 6,
    "metaDescription": "Discover the best pasta in Rome 2025: four iconic trattorias serving unforgettable carbonara, cacio e pepe, amatriciana, and gricia in the Eternal City.",
    "intro": "Rome is a city built on four sacred pastas: carbonara, cacio e pepe, amatriciana, and gricia. In 2025, the trattorias keeping these traditions alive are busier than ever, with locals and travelers crowding wooden tables for plates that taste like centuries of history. Here are four spots where Roman pasta reaches its glorious peak.",
    "body": "Few cities reward hunger like Rome. Walk any cobbled lane in Trastevere or Testaccio at lunchtime and you'll catch the perfume of guanciale crisping in iron pans, the sharp tang of Pecorino Romano grated over steaming bucatini, the whisper of black pepper toasted before it kisses a pool of starchy pasta water. Roman cooking is famously austere — five ingredients, maybe six — but the discipline is exactly the point. When the pasta is rolled fresh that morning, when the eggs come from a farm in Lazio, when the cheese has been aged just long enough, simplicity becomes something close to transcendence.\n\nThe four pillars of cucina romana — carbonara, cacio e pepe, amatriciana, and gricia — are deceptively easy to make and devilishly hard to perfect. The difference between a good carbonara and a great one is measured in seconds: pull the pan off the flame too late and the egg scrambles, too early and the sauce stays thin. Cacio e pepe demands a wrist trained over decades, emulsifying pecorino and pepper into a glossy cream with nothing but pasta water as a binder. The trattorias on this list have been doing it for so long that the technique has become muscle memory, passed from nonna to son to grandson behind the same scarred wooden counters.\n\nWhat makes 2025 a particularly good year to eat pasta in Rome is the renewed pride among younger chefs in keeping things stubbornly traditional. While other Italian cities chase trends, Rome doubles down on what already works. Order the rigatoni alla gricia at Felice and you're tasting a recipe essentially unchanged since the 1930s; the carbonara at Roscioli has launched a thousand imitators worldwide but still tastes best at the source. Pair any of these plates with a carafe of cold Frascati or a glass of Cesanese, finish with a wedge of crostata, and you'll understand why Romans have never felt the need to reinvent dinner.",
    "places": [
      {
        "name": "Salumeria Roscioli",
        "description": "A legendary deli-restaurant near Campo de' Fiori where the carbonara is considered by many critics to be the finest in Rome. The wine list runs deep and the burrata is shipped daily from Puglia.",
        "address": "Via dei Giubbonari, 21, 00186 Roma RM",
        "rating": 4.7,
        "image": "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800&q=80",
        "citySlug": "rome",
        "placeSlug": undefined
      },
      {
        "name": "Felice a Testaccio",
        "description": "The Testaccio institution famous for its theatrical tableside tossing of tonnarelli cacio e pepe. Booking weeks in advance is essential, and the rigatoni alla gricia is equally unmissable.",
        "address": "Via Mastro Giorgio, 29, 00153 Roma RM",
        "rating": 4.6,
        "image": "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=800&q=80",
        "citySlug": "rome",
        "placeSlug": undefined
      },
      {
        "name": "Da Enzo al 29",
        "description": "A tiny, perpetually packed Trastevere trattoria pouring out plates of amatriciana and carbonara with old-school Roman swagger. Expect a queue and tightly packed tables — and food worth every minute.",
        "address": "Via dei Vascellari, 29, 00153 Roma RM",
        "rating": 4.6,
        "image": "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=800&q=80",
        "citySlug": "rome",
        "placeSlug": undefined
      },
      {
        "name": "Armando al Pantheon",
        "description": "A family-run dining room steps from the Pantheon, serving classic Roman pasta since 1961. The tonnarelli cacio e pepe and abbacchio are textbook examples of the city's culinary canon.",
        "address": "Salita dei Crescenzi, 31, 00186 Roma RM",
        "rating": 4.6,
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
    "publishedAt": "2026-05-10",
    "readingTime": 6,
    "metaDescription": "Discover Rome's best pasta in 2025, from creamy cacio e pepe to silky carbonara at four iconic trattorias every food lover must visit.",
    "intro": "Rome runs on pasta. From smoky guanciale-laced carbonara to glossy cacio e pepe twirled tableside, the Eternal City turns simple ingredients into something close to magic. These four trattorias prove why Rome remains the undisputed capital of pasta in 2025.",
    "body": "Roman pasta is built on a holy trinity of pecorino romano, guanciale, and freshly cracked black pepper, but each kitchen interprets the canon a little differently. At its best, a plate of tonnarelli cacio e pepe arrives glossy and emulsified, the cheese clinging to each strand without a hint of clumping. Carbonara, when done right, is silky rather than scrambled, the egg yolks tempered against rendered guanciale fat until they cloak the rigatoni in golden cream. Amatriciana brings tomato into the mix, its tang cutting through the salty pork and sharp cheese, while gricia, the elder ancestor of them all, strips everything back to pasta, pepper, pork, and pecorino.\n\nThe trattorias listed below have spent decades perfecting these dishes, and the lines outside their doors testify to their staying power. Some sit tucked in the cobbled alleys of Trastevere, where ivy climbs the walls and grandmothers still roll dough in the back. Others hide in Testaccio, the working-class neighborhood that gave birth to so much of Roman cuisine, anchored by the old slaughterhouse where offal cuts shaped the city's most beloved recipes. What unites them is a stubborn devotion to tradition: no cream in the carbonara, no garlic in the cacio e pepe, no shortcuts ever.\n\nReservations are essential at all four, especially on weekends, and lunch is often the smarter bet if you want to linger over a carafe of Frascati without feeling rushed. Expect handwritten menus, paper tablecloths, and waiters who have seen it all. Order the house pasta, a glass of something local, and a simple puntarelle salad to cut the richness. Save room for a slice of crostata or, better yet, a tartufo nero around the corner at Tre Scalini. This is Rome on a fork, the kind of meal that explains why travelers keep coming back, year after year, plate after plate.",
    "places": [
      {
        "name": "Da Enzo al 29",
        "description": "A tiny Trastevere trattoria with a cult following, beloved for its perfect carbonara and rigatoni all'amatriciana. Expect a wait, but every minute pays off in flavor.",
        "address": "Via dei Vascellari, 29, 00153 Roma RM",
        "rating": 4.7,
        "image": "https://images.unsplash.com/photo-1473093226795-af9932fe5856?w=800&q=80",
        "citySlug": "rome",
        "placeSlug": undefined
      },
      {
        "name": "Roscioli Salumeria con Cucina",
        "description": "Part deli, part wine bar, part temple to Roman pasta, where the carbonara is famously made with three types of pork. The room hums with energy and the cellar runs deep.",
        "address": "Via dei Giubbonari, 21, 00186 Roma RM",
        "rating": 4.6,
        "image": "https://images.unsplash.com/photo-1546549032-9571cd6b27df?w=800&q=80",
        "citySlug": "rome",
        "placeSlug": undefined
      },
      {
        "name": "Felice a Testaccio",
        "description": "A Testaccio institution since 1936, where the tonnarelli cacio e pepe is tossed tableside into a glossy, peppery wonder. Booking ahead is non-negotiable.",
        "address": "Via Mastro Giorgio, 29, 00153 Roma RM",
        "rating": 4.5,
        "image": "https://images.unsplash.com/photo-1481931098730-318b6f776db0?w=800&q=80",
        "citySlug": "rome",
        "placeSlug": undefined
      },
      {
        "name": "Armando al Pantheon",
        "description": "A family-run gem just steps from the Pantheon, serving classic Roman pasta in an unfussy dining room since 1961. The gricia and abbacchio are quietly perfect.",
        "address": "Salita dei Crescenzi, 31, 00186 Roma RM",
        "rating": 4.6,
        "image": "https://images.unsplash.com/photo-1516685304081-de7947d419d5?w=800&q=80",
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
    "publishedAt": "2026-05-11",
    "readingTime": 6,
    "metaDescription": "Discover Rome's best pasta in 2025: from creamy cacio e pepe to silky carbonara at the city's most beloved trattorias and modern osterias.",
    "intro": "Rome is a city that lives and breathes pasta, where centuries-old recipes are still rolled out by hand each morning. In 2025, the eternal city's pasta scene is stronger than ever, balancing tradition with quiet innovation. Here are four spots where every forkful tells a story.",
    "body": "Pasta in Rome is a religion with four sacred texts: carbonara, cacio e pepe, amatriciana, and gricia. Each is built on humble ingredients—guanciale, pecorino romano, black pepper, eggs—yet demands the precision of a symphony conductor. The magic happens in the mantecatura, that frantic moment when starchy pasta water marries pecorino into a glossy, clinging sauce. Walk into any proper Roman trattoria around 1pm and you'll hear the rhythmic clatter of pans against burners, the hiss of guanciale crisping in its own amber fat, and the unmistakable chorus of locals arguing about whose nonna made it better.\n\nWhile tourist traps near the Spanish Steps drown perfectly good rigatoni in cream, the city's true pasta temples remain stubbornly devoted to the canon. In Testaccio, the working-class neighborhood that birthed much of this cuisine, you'll find tonnarelli so thick and chewy they practically bite back. Cross the river to Trastevere and you'll discover spots where the wine list is scribbled on butcher paper and the carbonara arrives molten, the egg yolk still glistening like sunset. A new generation of chefs is also playing thoughtfully with tradition—think aged pecorino from specific Lazio farms, or hand-cranked pasta extruded through bronze dies for that essential sauce-grabbing texture.\n\nWhat unites the best places isn't fancy plating or Instagram-worthy interiors—it's reverence. The waiters move with unhurried confidence, the pasta arrives steaming and unfussy, and the bill rarely shocks. Order a quartino of house white, tear into the bread basket, and watch Romans of all ages devour their plates with the same enthusiasm. Whether you're squeezed into a tiny vicolo trattoria or sitting beneath the vine-covered pergola of a Trastevere osteria, these four restaurants represent the absolute pinnacle of Roman pasta in 2025—places where the past is honored on every plate, and where you'll understand, finally, why this city has been obsessed with noodles for two thousand years.",
    "places": [
      {
        "name": "Roscioli Salumeria con Cucina",
        "description": "A legendary salumeria-restaurant hybrid where the carbonara is widely considered Rome's finest, made with three types of pecorino and prized guanciale. The wine cellar below is equally remarkable.",
        "address": "Via dei Giubbonari, 21/22, 00186 Roma RM",
        "rating": 4.7,
        "image": "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=800&q=80",
        "citySlug": "rome",
        "placeSlug": undefined
      },
      {
        "name": "Felice a Testaccio",
        "description": "An institution in Testaccio famous for its theatrical tableside tossing of tonnarelli cacio e pepe, finished with a flourish of cracked black pepper. Reservations are essential weeks in advance.",
        "address": "Via Mastro Giorgio, 29, 00153 Roma RM",
        "rating": 4.6,
        "image": "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=800&q=80",
        "citySlug": "rome",
        "placeSlug": undefined
      },
      {
        "name": "Da Enzo al 29",
        "description": "A tiny, fiercely traditional Trastevere trattoria where the amatriciana sings with sweet tomato and crisp guanciale. Expect a queue down the cobblestone street—it's worth every minute.",
        "address": "Via dei Vascellari, 29, 00153 Roma RM",
        "rating": 4.6,
        "image": "https://images.unsplash.com/photo-1481931098730-318b6f776db0?w=800&q=80",
        "citySlug": "rome",
        "placeSlug": undefined
      },
      {
        "name": "Armando al Pantheon",
        "description": "A family-run gem operating in the shadow of the Pantheon since 1961, serving impeccable gricia and rigatoni alla carbonara to politicians, locals, and lucky travelers alike.",
        "address": "Salita dei Crescenzi, 31, 00186 Roma RM",
        "rating": 4.5,
        "image": "https://images.unsplash.com/photo-1546549032-9571cd6b27df?w=800&q=80",
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
    "publishedAt": "2026-05-12",
    "readingTime": 6,
    "metaDescription": "Discover the best pasta in Rome 2025: from creamy cacio e pepe to crispy carbonara, our guide to the city's most unforgettable trattorias and tasting rooms.",
    "intro": "Rome lives and breathes pasta. From smoky carbonara in cobbled Trastevere alleys to silky cacio e pepe served in Testaccio's old slaughterhouse district, the Eternal City turns four simple ingredients into edible poetry. Here are the four spots redefining Roman pasta in 2025.",
    "body": "There's a particular alchemy that happens in a Roman kitchen when guanciale hits a hot pan. The fat renders, the pepper blooms, and within minutes a humble bowl of spaghetti becomes a love letter to centuries of tradition. Rome's pasta scene in 2025 is a fascinating tension between fierce preservation and quiet innovation — old-school trattorias still tossing tonnarelli in copper pans alongside young chefs reimagining amatriciana with heritage tomatoes and house-cured pork jowl. What unites them all is an unshakable devotion to the cinque paste: carbonara, cacio e pepe, amatriciana, gricia, and the often-overlooked pasta alla Norcina.\n\nThe best meals tend to happen far from the Trevi Fountain crowds. Walk into a Testaccio trattoria around 1 p.m. and you'll see Roman regulars in suits twirling rigatoni with the same focused reverence reserved for religious ceremony. Order the carbonara and watch as the server tilts the bowl, revealing that perfect glossy emulsion — egg yolk, pecorino, and rendered guanciale fat clinging to each ridge of pasta. No cream, ever. The pepper should crackle audibly between your molars. In 2025, several chefs are pushing the form: aged pecorino from small Lazio producers, hand-cranked bronze-die pasta drying on wooden racks, even smoked egg yolks for a deeper umami punch.\n\nBeyond the classics, Rome's pasta renaissance includes wild-boar pappardelle from Roman countryside game, sea urchin spaghettoni reflecting the city's overlooked Tyrrhenian coastline, and tonnarelli cacio e pepe finished tableside inside a wheel of Parmigiano. The wine lists are getting smarter too — natural Frascati, mineral Cesanese, and orange wines from Lazio's volcanic hills now share menus with grandmother's house red. Whether you're after a 12-euro plate at a checkered-tablecloth institution or a tasting menu pasta course at a Michelin-starred dining room, these four restaurants represent the very best of what Roman pasta can be right now.",
    "places": [
      {
        "name": "Roscioli",
        "description": "A legendary salumeria and restaurant where the carbonara has near-mythical status, made with 24-month Riserva pecorino and house-cured guanciale. Book weeks ahead — this is arguably Rome's most coveted pasta table.",
        "address": "Via dei Giubbonari, 21, 00186 Roma RM",
        "rating": 4.7,
        "image": "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=800&q=80",
        "citySlug": "rome",
        "placeSlug": undefined
      },
      {
        "name": "Felice a Testaccio",
        "description": "The tableside tossing of tonnarelli cacio e pepe here is pure theater, and the result is the creamiest, most pepper-forward version in the city. A Testaccio institution since 1936, still run by the Trivelloni family.",
        "address": "Via Mastro Giorgio, 29, 00153 Roma RM",
        "rating": 4.6,
        "image": "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=800&q=80",
        "citySlug": "rome",
        "placeSlug": undefined
      },
      {
        "name": "Armando al Pantheon",
        "description": "Tucked behind the Pantheon, this tiny family-run trattoria has been serving textbook Roman classics since 1961. The gricia and the abbacchio brodettato are reason enough to plan your trip around a reservation.",
        "address": "Salita dei Crescenzi, 31, 00186 Roma RM",
        "rating": 4.6,
        "image": "https://images.unsplash.com/photo-1481931098730-318b6f776db0?w=800&q=80",
        "citySlug": "rome",
        "placeSlug": undefined
      },
      {
        "name": "Trattoria Da Cesare al Casaletto",
        "description": "Worth the tram ride out of the center for what many critics call the best amatriciana in Rome — tangy, glossy, and singing with smoky guanciale. The fried starters and natural wine list are equally exceptional.",
        "address": "Via del Casaletto, 45, 00151 Roma RM",
        "rating": 4.5,
        "image": "https://images.unsplash.com/photo-1546549032-9571cd6b27df?w=800&q=80",
        "citySlug": "rome",
        "placeSlug": undefined
      }
    ]
  },
  {
    "title": "Best Hidden Bistros in Le Marais Paris",
    "slug": "hidden-bistros-marais-paris",
    "city": "Paris",
    "citySlug": "paris",
    "category": "Restaurants",
    "coverImage": "https://images.unsplash.com/photo-1502301103665-0b95cc738daf?w=1200&q=80",
    "publishedAt": "2026-05-13",
    "readingTime": 6,
    "metaDescription": "Discover Le Marais' best hidden bistros — cozy Parisian secrets serving unforgettable meals down cobblestone alleys and behind unmarked doors.",
    "intro": "On my third evening in Le Marais, I got beautifully lost. I had followed the scent of browned butter and rosemary down a rue so narrow my shoulders nearly grazed the limestone walls — and that's when I learned the secret of this neighborhood: the best meals in Paris hide behind doors that don't want to be found. What follows is the map I wish someone had pressed into my hand that night.",
    "body": "Le Marais wears two faces. By day, it belongs to the museum crowd and the boutique shoppers, all carrying tote bags and Berthillon cones. But after the golden hour, when the Place des Vosges empties and the lamps flicker on along Rue des Rosiers, the neighborhood exhales — and the real Marais reveals itself in a quieter rhythm of clinking glasses and rising laughter behind frosted windows. The bistros here aren't the ones with sandwich boards on the sidewalk; they're the ones where the menu is handwritten on butcher paper and the waiter remembers your wine before he remembers your name.\n\nWhat makes a Marais bistro hidden isn't always geography — sometimes it's just discretion. A faded green facade. A single bulb above an unmarked door. Inside, the air is thick with the perfume of confit shallots, the snap of a baguette crust, the sweet-iron tang of a rare entrecôte resting under a knob of melting Bordelaise. Tables are close enough that you'll absorb your neighbor's conversation along with their wine list recommendations, and the host's pour-over of a chilled Beaujolais will somehow feel like an act of generosity rather than commerce. These aren't restaurants chasing Michelin stars — they're rooms holding onto something older and more stubborn: the conviction that a good meal should slow time down.\n\nA few practical notes from a season of wandering: reservations matter more than ever, especially Thursday through Saturday, and most of these places book a week out for prime hours. Aim for the 7:30 seating if you want the soft electric hum of a half-full room, or the 9:30 if you prefer the boisterous late crowd of locals who've finally clocked out. Order the daily special — it's where the chef's mood and the morning's market collide. And when you finish, don't rush. Linger over a tarte fine and a digestif, watch the candle wax pool on the zinc bar, and let the Marais do what it does best: make you feel, just briefly, like you live here.",
    "places": [
      {
        "name": "Chez Janou",
        "description": "Tucked on a quiet corner near Place des Vosges, Chez Janou feels like a Provençal daydream stitched into Paris — sun-yellow walls, dried lavender, and over 80 varieties of pastis lining the bar. The terrace is the kind of place where two-hour lunches become four-hour afternoons. Order the legendary mousse au chocolat, ladled tableside from a vat the size of a small bathtub.",
        "address": "2 Rue Roger Verlomme, 75003 Paris",
        "rating": 4.5,
        "image": "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
        "citySlug": "paris",
        "placeSlug": undefined
      },
      {
        "name": "Robert et Louise",
        "description": "Step into this 17th-century stone room and you're greeted by a roaring open fire where steaks are seared on a grill that hasn't changed in fifty years. The atmosphere is rustic, smoky, gloriously unfussy — wooden benches, candle wax, and the murmur of regulars. The côte de boeuf for two, charred outside and rosy within, is the only thing to order.",
        "address": "64 Rue Vieille du Temple, 75003 Paris",
        "rating": 4.6,
        "image": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80",
        "citySlug": "paris",
        "placeSlug": undefined
      },
      {
        "name": "Breizh Café",
        "description": "Buried on Rue Vieille du Temple, this Breton outpost rewrites what you thought a crêpe could be — buckwheat galettes so lacy and crisp they shatter under the fork, paired with farmhouse ciders served in earthenware bowls. The room is small, wood-paneled, and almost monastically calm. Order the Complète with Bordier butter and a runny Cancale egg.",
        "address": "109 Rue Vieille du Temple, 75003 Paris",
        "rating": 4.4,
        "image": "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80",
        "citySlug": "paris",
        "placeSlug": undefined
      },
      {
        "name": "Le Mary Celeste",
        "description": "A horseshoe-shaped zinc bar, low golden light, and a small-plates menu that swings between French, Asian, and coastal seafood — Le Mary Celeste is where the neighborhood's chefs come on their nights off. The crowd buzzes, the cocktails are inventive, and the oysters arrive on crushed ice with house mignonette. Don't miss the seasonal ceviche and the truffle deviled eggs.",
        "address": "1 Rue Commines, 75003 Paris",
        "rating": 4.5,
        "image": "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80",
        "citySlug": "paris",
        "placeSlug": undefined
      },
      {
        "name": "Café des Musées",
        "description": "A textbook Parisian bistro hiding in plain sight — checkered floors, mirrored walls, chalkboard menu, and waiters in long white aprons who move like they've been doing this for decades. The kitchen takes classics seriously without taking them too solemnly. Come for the steak tartare hand-cut to order, or the slow-cooked bourguignon that tastes like someone's grandmother is still in charge.",
        "address": "49 Rue de Turenne, 75003 Paris",
        "rating": 4.4,
        "image": "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800&q=80",
        "citySlug": "paris",
        "placeSlug": undefined
      }
    ]
  },
  {
    "title": "Top 5 Natural Wine Bars in Paris 2025",
    "slug": "natural-wine-bars-paris",
    "city": "Paris",
    "citySlug": "paris",
    "category": "Bars",
    "coverImage": "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=1200&q=80",
    "publishedAt": "2026-05-13",
    "readingTime": 6,
    "metaDescription": "Discover Paris's best natural wine bars in 2025 — funky pours, candlelit rooms, and unforgettable bites from the 11th to Pigalle.",
    "intro": "It started with a glass of cloudy Chenin in a basement near République, poured by a tattooed sommelier who shrugged when I asked what it was. 'Just drink it,' she said. That single, unfiltered sip — wild, briny, almost alive — rewired my understanding of Parisian wine culture. In 2025, the city's natural wine scene isn't a trend; it's the heartbeat of how Paris drinks, eats, and gathers after dark.",
    "body": "Natural wine in Paris has always been about feeling — that slight lean over a zinc bar, candlelight catching the amber glow of an orange wine from the Jura, the faint scent of charcuterie and yeast hanging in the air. The new wave of bars à vins naturels skips the pretension entirely. Walk into any of them on a Tuesday night and you'll find a crowd of regulars, neighborhood cooks just off shift, and curious travelers, all leaning toward the same small chalkboard menu. Bottles arrive at the table dusty and unannounced, often poured by the very person who imported them from a tiny domaine in the Loire or Roussillon.\n\nWhat makes the 2025 scene different is the food. Where once a bar à vins meant a plate of saucisson and butter, today's spots are kitchen-driven, with chefs who match unfiltered glouglou wines to lacto-fermented vegetables, raw scallop with smoked cream, or wood-fired sourdough draped in cured duck. The smell hits before the door even closes behind you: caramelized onions, lees, woodsmoke, citrus zest. Order a glass of pét-nat — slightly cloudy, mischievously fizzy — and you'll understand why Parisians have all but abandoned the polished cocktail bar in favor of these rough-edged, joyful rooms.\n\nA tip from a local: arrive early, around 6:30 p.m., before the after-work tide rolls in. Most natural wine bars in Paris don't take reservations, and the best seats — those at the counter, where you can talk to the staff and watch glasses get filled with bottles you've never heard of — disappear fast. Bring cash for tips, an open mind for funky flavors, and don't be shy about asking for 'quelque chose de bizarre.' That's the password. From the buzzing alleys of the 11th arrondissement to a sleepy corner of Pigalle, here are the five natural wine bars defining how Paris drinks right now.",
    "places": [
      {
        "name": "Le Verre Volé",
        "description": "This Canal Saint-Martin institution still sets the bar for natural wine in Paris, with bottles lining every wall like a living library. The room is loud, warm, and smells faintly of garlic and grilled bread. Order the boudin noir with apple — it pairs heroically with a chilled glass of Gamay.",
        "address": "67 Rue de Lancry, 75010 Paris",
        "rating": 4.6,
        "image": "https://images.unsplash.com/photo-1567072379576-a8b6c5d5cfc8?w=800&q=80",
        "citySlug": "paris",
        "placeSlug": undefined
      },
      {
        "name": "Septime La Cave",
        "description": "The little sibling of Bertrand Grébaut's celebrated restaurant feels like a Parisian secret, even when it's packed. Stand at the marble counter with a glass of skin-contact Savagnin and nibble on cured mackerel or aged comté. The lighting is soft, the crowd impossibly chic, the vibe blissfully unhurried.",
        "address": "3 Rue Basfroi, 75011 Paris",
        "rating": 4.7,
        "image": "https://images.unsplash.com/photo-1528823872057-9c018a7a7553?w=800&q=80",
        "citySlug": "paris",
        "placeSlug": undefined
      },
      {
        "name": "La Buvette",
        "description": "Camille Fourmont's tiny jewel-box bar in the 11th glows like a lantern at night, with marble shelves stacked with goat cheeses and rare bottles. The white beans drowned in olive oil and lemon zest are legendary — order them with a glass of something orange and slightly oxidative. Expect to fall in love with the room before your second sip.",
        "address": "67 Rue Saint-Maur, 75011 Paris",
        "rating": 4.7,
        "image": "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
        "citySlug": "paris",
        "placeSlug": undefined
      },
      {
        "name": "Aux Deux Amis",
        "description": "A scuffed, neon-lit corner café by day that transforms into one of the rowdiest natural wine bars in Paris by night. The crowd spills onto Rue Oberkampf, glasses of pét-nat in hand, while inside the kitchen sends out beef tartare and razor clams in green sauce. It's chaotic, garlicky, and completely irresistible.",
        "address": "45 Rue Oberkampf, 75011 Paris",
        "rating": 4.5,
        "image": "https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=800&q=80",
        "citySlug": "paris",
        "placeSlug": undefined
      },
      {
        "name": "Le Bon Georges",
        "description": "Tucked into a quiet street near Pigalle, this bistro-meets-wine-bar champions tiny-production vignerons with a list that reads like a love letter to the French countryside. The room smells of butter and roasting bones; the steak frites is one of the best in Paris. Ask owner Benoît for a recommendation and brace yourself for something gloriously unexpected.",
        "address": "45 Rue Saint-Georges, 75009 Paris",
        "rating": 4.6,
        "image": "https://images.unsplash.com/photo-1525268323446-0505b6fe7778?w=800&q=80",
        "citySlug": "paris",
        "placeSlug": undefined
      }
    ]
  },
  {
    "title": "Best Street Food in Paris Under €5",
    "slug": "street-food-paris-under-5",
    "city": "Paris",
    "citySlug": "paris",
    "category": "Street Food",
    "coverImage": "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200&q=80",
    "publishedAt": "2026-05-13",
    "readingTime": 8,
    "metaDescription": "Discover the best street food in Paris under €5 — crepes, falafel, banh mi and bakery gems loved by locals, foodies and budget travelers.",
    "intro": "Paris has a reputation for being expensive, but eat like a local and you'll find some of the best bites in the city cost less than a metro ticket and a coffee combined. From flaky pastries grabbed on the way to the Marais to falafel pitas eaten standing on Rue des Rosiers, this guide is for tourists, couples and food lovers who'd rather skip the white tablecloths. Budget around €4–€5 per stop, and you can easily turn an afternoon walk into a full-on tasting tour.",
    "body": "## Why Paris Is Secretly a Street Food City\n\nForget the cliché of three-course bistro lunches. Most Parisians eat fast and well — a baguette sandwich on a bench, a galette folded into paper, a slice of pizza on the way to the métro. Done right, street food in Paris under 5 euros is not a compromise; it's the real local rhythm.\n\nThis guide focuses on five places that consistently deliver. They're not hidden secrets — locals know them, queues form — but they earn their reputation.\n\n## Quick Comparison Table\n\n| Place | Price | Best For | Google Rating | Atmosphere |\n|-------|-------|----------|---------------|------------|\n| L'As du Fallafel | €–€€ | Foodies, couples | 4.5 | Buzzing Marais classic |\n| Du Pain et des Idées | € | Solo travelers, pastry lovers | 4.6 | Old-school boulangerie |\n| Breizh Café (takeaway) | €€ | Couples, casual lunch | 4.4 | Modern Breton crêperie |\n| Chez Alain Miam Miam | € | Budget travelers, foodies | 4.7 | Market stall energy |\n| Pink Mamma Pizza Slice / Big Mamma street counters | €€ | Quick bite, tourists | 4.3 | Italian street vibe |\n\n## 1. L'As du Fallafel — The Marais Institution\n\nIf you've heard one name for cheap eats in Paris, it's this one. The falafel pita at L'As du Fallafel comes overstuffed with hot chickpea balls, fried eggplant, cabbage, harissa and tahini, all for around €8 if you sit, but **€6–€7 at the takeaway window** — and the smaller portion or hummus pita can drop close to €5.\n\nRue des Rosiers itself is half the experience: pedestrian, lined with vintage shops, packed on Sundays.\n\n**Pros:** Generous portions, fast queue, vegetarian-friendly.\n**Cons:** Closed Saturdays, sauce will end up on your shirt.\n**Best time:** Weekday around 2 pm, after the lunch rush.\n\n## 2. Du Pain et des Idées — Boulangerie Worth the Detour\n\nNear Canal Saint-Martin, this 19th-century bakery is the kind of place where you point at things you can't pronounce and walk out happy. The **escargot pistache-chocolat** sits around €4.50, and a slice of their *pavé* bread costs even less.\n\nThe interior — painted ceilings, mirrored counters — feels untouched since 1875. There's no seating, so people eat on the canal banks a few minutes away.\n\n**Pros:** Outstanding viennoiserie, photogenic shop.\n**Cons:** Closed weekends, can sell out by 4 pm.\n**Best for:** Solo wanderers and couples doing a slow morning.\n\n## 3. Breizh Café Takeaway — Crêpes Done Properly\n\nThe sit-down restaurant is a splurge, but Breizh Café runs takeaway windows where a simple butter-sugar or ham-and-cheese galette runs around €4–€5. Buckwheat batter, real Bordier butter, no shortcuts.\n\nGrab one on Rue Vieille du Temple and walk toward Place des Vosges. It's a small thing, but eating a hot galette while crossing the Marais on a grey afternoon is genuinely one of the better Paris memories you can buy for under five euros.\n\n**Pros:** Quality ingredients, quick service.\n**Cons:** Lines on weekends, sweet crêpes are smaller than you'd expect.\n\n## 4. Chez Alain Miam Miam — Marché des Enfants Rouges\n\nInside Paris's oldest covered market, Alain hand-builds enormous galette sandwiches with cheese, ham, mushrooms and herbs. The full sandwich is closer to €10, but his **half portion or simple cheese galette stays under €5**, and watching him work the pan is part of the show.\n\nThe market itself is worth wandering — Moroccan, Italian, Japanese stalls all under one roof.\n\n**Pros:** Atmosphere, generous fillings, friendly chef.\n**Cons:** Slow service (he chats with everyone), closed Mondays.\n**Best time:** Tuesday or Thursday around noon.\n\n## 5. Pizza by the Slice near Rue Montorgueil\n\nRue Montorgueil is the easiest food street in central Paris — pedestrian, lined with traiteurs, cheese shops and Italian counters. Several spots sell hot square slices for **€3.50–€4.50**. Quality varies, so look for places with a visible oven and a steady local queue.\n\nPair it with a €2 espresso at a counter bar and you've eaten lunch for under €7.\n\n**Pros:** Central, walkable, easy for picky eaters.\n**Cons:** Touristy in summer, slices reheated rather than fresh after 3 pm.\n\n## Local Tips\n\n- **Eat standing up.** In most bakeries, prices on the menu are lower *au comptoir* (at the counter) than seated.\n- **Avoid 1 pm sharp.** That's when office workers descend. Push lunch to 2 pm.\n- **Sunday strategy:** Many bakeries close. The Marais and Rue Montorgueil stay alive.\n- **Carry coins.** Smaller stalls sometimes balk at card payments under €10.\n- **Walk between stops.** The Marais, Canal Saint-Martin and Montorgueil are all under 25 minutes apart on foot.\n\n## FAQ\n\n**Is street food in Paris really under €5?**\nYes, if you stick to bakery items, half portions, falgrab counters and slices. Full sit-down meals will cost more.\n\n**What's the most iconic Paris street food?**\nThe jambon-beurre baguette and the Nutella crêpe — both easily under €5.\n\n**Where's the best area for cheap eats?**\nThe Marais (4th), around Canal Saint-Martin (10th) and Rue Montorgueil (2nd).\n\n**Is it safe to eat from street stalls in Paris?**\nGenerally yes. Hygiene standards are strict and most \"street food\" is actually counter food from established shops.\n\n## Final Take\n\nFor **couples**, do a Marais loop: Breizh Café galette, then L'As du Fallafel. For **solo travelers and pastry lovers**, head straight to Du Pain et des Idées. **Budget travelers** get the most mileage at Marché des Enfants Rouges, and **first-time tourists** will feel most at home grabbing a slice on Rue Montorgueil. None of it is fancy — and that's exactly the point.",
    "places": [
      {
        "name": "L'As du Fallafel",
        "description": "A Marais institution that's been feeding the falafel-pita crowd for decades. The takeaway window moves fast and portions are huge. Expect a queue, but it almost always moves quicker than it looks.",
        "address": "34 Rue des Rosiers, 75004 Paris, France",
        "rating": 4.5,
        "image": "https://images.unsplash.com/photo-1593504049359-74330189a345?w=800&q=80",
        "citySlug": "paris",
        "placeSlug": undefined
      },
      {
        "name": "Du Pain et des Idées",
        "description": "A historic boulangerie near Canal Saint-Martin with painted ceilings and a cult following for its escargot pastries. Everything is hand-shaped and the smell hits you from the street. No seating, which is half the charm.",
        "address": "34 Rue Yves Toudic, 75010 Paris, France",
        "rating": 4.6,
        "image": "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&q=80",
        "citySlug": "paris",
        "placeSlug": undefined
      },
      {
        "name": "Breizh Café",
        "description": "Modern Breton crêperie taken seriously, with proper buckwheat galettes and real Bordier butter. The takeaway counter offers simple versions at honest prices. Best eaten walking, while it's still hot.",
        "address": "109 Rue Vieille du Temple, 75003 Paris, France",
        "rating": 4.4,
        "image": "https://images.unsplash.com/photo-1519676867240-f03562e64548?w=800&q=80",
        "citySlug": "paris",
        "placeSlug": undefined
      },
      {
        "name": "Chez Alain Miam Miam",
        "description": "A tiny stall inside Marché des Enfants Rouges where Alain builds galette sandwiches one at a time. He chats, slices cheese, flips the pan — it's a show. Worth the wait if you're not in a rush.",
        "address": "Marché des Enfants Rouges, 39 Rue de Bretagne, 75003 Paris, France",
        "rating": 4.7,
        "image": "https://images.unsplash.com/photo-1565299543923-37dd37887442?w=800&q=80",
        "citySlug": "paris",
        "placeSlug": undefined
      },
      {
        "name": "Rue Montorgueil",
        "description": "A pedestrian food street lined with bakeries, cheese shops and Italian counters selling pizza by the slice. Quality varies stall to stall, so follow the local lunch crowd. Easy to combine several cheap bites in one walk.",
        "address": "Rue Montorgueil, 75002 Paris, France",
        "rating": 4.3,
        "image": "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80",
        "citySlug": "paris",
        "placeSlug": undefined
      }
    ]
  },
  {
    "title": "Most Beautiful Café Terraces in Paris",
    "slug": "cafe-terraces-paris",
    "city": "Paris",
    "citySlug": "paris",
    "category": "Cafés",
    "coverImage": "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200&q=80",
    "publishedAt": "2026-05-14",
    "readingTime": 8,
    "metaDescription": "Discover the most beautiful café terraces in Paris — from Saint-Germain classics to hidden rooftops loved by locals and couples.",
    "intro": "Paris doesn't really happen indoors. It happens on terraces — those rattan chairs lined up under awnings, espresso cups clinking next to glasses of natural wine, conversations drifting into the street. This guide is for travelers, couples, and food lovers who want to slow down and watch the city like Parisians do. Expect to spend between €4 for an espresso and €18 for a cocktail, depending on the arrondissement.",
    "body": "## Why Paris Café Terraces Feel Different\n\nThere's a reason UNESCO recognized the Parisian bistro terrace as cultural heritage. It's not about the coffee (which, honestly, is often average). It's about the ritual — sitting facing the street, never the wall, watching the city move.\n\nThe best terraces aren't always the most famous ones. Some of the prettiest are tucked behind churches or on rooftops most tourists walk past.\n\n## Quick Comparison\n\n| Café | Price | Best For | Rating | Atmosphere |\n|------|-------|----------|--------|------------|\n| Café de Flore | €€€ | Couples, classics | 4.3 | Literary, iconic |\n| Les Deux Magots | €€€ | Tourists, history | 4.4 | Old Paris elegance |\n| Café Kitsuné Palais Royal | €€ | Foodies, design lovers | 4.4 | Minimal, chic |\n| Le Consulat | €€ | Instagram, couples | 4.2 | Montmartre charm |\n| Café Charlot | €€ | Locals, brunch | 4.2 | Marais cool |\n\n## Café de Flore — Saint-Germain-des-Prés\n\nThe green awning on Boulevard Saint-Germain has barely changed since Sartre and de Beauvoir argued at the corner table. The terrace faces the boulevard directly, which is the entire point — you came to be seen, and to see.\n\n### Atmosphere\nWhite-jacketed waiters, marble tables, regulars reading Le Monde. It feels theatrical because it is.\n\n### Best time\nWeekday mornings around 9am. The light hits the terrace softly and you'll skip the tourist queue.\n\n**Pros:** Unbeatable people-watching, genuine old-Paris feel.\n**Cons:** Coffee is €6 and the food is overpriced for what it is.\n\nWalk five minutes to Église Saint-Sulpice afterwards.\n\n## Les Deux Magots — Saint-Germain-des-Prés\n\nDirectly across from Café de Flore, and the rivalry is real. The terrace here wraps around the corner and faces the Saint-Germain church, which is the better view in my opinion.\n\n### Who it's for\nFirst-time visitors who want the postcard experience without apologizing for it. Order the hot chocolate — it actually lives up to the hype.\n\n**Pros:** Iconic view, attentive service.\n**Cons:** Heavily touristic after 11am.\n\n## Café Kitsuné — Palais Royal\n\nTucked inside the arcades of the Jardin du Palais Royal, this tiny café spills out onto one of the most photogenic courtyards in Paris. The terrace is small — maybe ten chairs — but the setting does the work.\n\n### Atmosphere\nJapanese-French minimalism. Matcha lattes, perfectly pulled espressos, a quieter crowd than Saint-Germain.\n\n### Best time\nLate afternoon, when the sun cuts through the columns. Avoid Saturday — Parisians have figured this place out too.\n\n**Pros:** The location is unbeatable, coffee is genuinely good.\n**Cons:** Seating is limited and there's no real food menu.\n\nThe Buren columns are a two-minute walk.\n\n## Le Consulat — Montmartre\n\nThe pink-shuttered café at the corner of Rue Norvins is probably the most photographed terrace in Paris. Touristy? Absolutely. But on a quiet morning before the crowds climb up from Abbesses, it still has something.\n\n### Honest take\nThe food is forgettable and the prices reflect the location. Come for one coffee, take your photo, then walk to Place du Tertre or down to Rue des Abbesses for a better meal.\n\n**Pros:** Storybook setting, classic Montmartre.\n**Cons:** Average food, packed by 11am.\n\n## Café Charlot — Le Marais\n\nOn the corner of Rue de Bretagne, Charlot is where the Marais crowd lands for late brunches and early apéros. The terrace stretches along two sides of the building, red awning, wicker chairs, the whole thing.\n\n### Who it's for\nLocals who actually live here, plus visitors who want to feel part of the neighborhood rather than watching it.\n\n**Pros:** Reliable food, great for people-watching the Marais crowd.\n**Cons:** Service can be slow on weekends.\n\nMarché des Enfants Rouges is right next door — go before or after.\n\n## Local Tips\n\n- **Order at the bar** if you want the cheaper menu price. Terrace seats cost more in most cafés — it's printed on the menu.\n- **Avoid Sundays at Le Consulat and Café de Flore** unless you enjoy queues.\n- **Locals order** un café (espresso) or un noisette (espresso with a dash of milk), not lattes.\n- **No reservations** at most terraces — just show up and wait for a table to turn.\n- **Best walking loop:** Saint-Sulpice → Café de Flore → Les Deux Magots → Rue de Buci for dinner.\n\n## FAQ\n\n**What is the most famous café terrace in Paris?**\nCafé de Flore and Les Deux Magots in Saint-Germain-des-Prés are the two most iconic, sitting across from each other on Boulevard Saint-Germain.\n\n**Are Paris café terraces expensive?**\nThey can be. Expect €4–6 for an espresso on a terrace versus €2–3 at the bar inside. Tourist areas charge more.\n\n**Can you sit on a Paris café terrace without ordering food?**\nYes — a single coffee is enough to hold your table for an hour or more. That's the Parisian way.\n\n**When is the best season for café terraces in Paris?**\nLate April through October. Most terraces have heaters and glass walls in winter, but spring is when the city really comes alive outside.\n\n## Final Take\n\nFor couples, **Café Kitsuné** at Palais Royal wins on atmosphere. For the classic Paris experience, you can't skip **Café de Flore**. Budget travelers should head to **Café Charlot** and order at the bar. And if you only have one morning in Montmartre, **Le Consulat** is worth a single espresso — just don't expect a meal to remember.",
    "places": [
      {
        "name": "Café de Flore",
        "description": "The most literary terrace in Paris, with green awnings and white-jacketed waiters who've worked here for decades. The coffee is overpriced but the people-watching is unmatched. Come early to actually get a table on the boulevard side.",
        "address": "172 Boulevard Saint-Germain, 75006 Paris",
        "rating": 4.3,
        "image": "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=800&q=80",
        "citySlug": "paris",
        "placeSlug": undefined
      },
      {
        "name": "Les Deux Magots",
        "description": "Café de Flore's eternal rival, with a wraparound terrace facing Église Saint-Germain-des-Prés. The hot chocolate is genuinely worth ordering. Touristy but still atmospheric if you come before noon.",
        "address": "6 Place Saint-Germain des Prés, 75006 Paris",
        "rating": 4.4,
        "image": "https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=800&q=80",
        "citySlug": "paris",
        "placeSlug": undefined
      },
      {
        "name": "Café Kitsuné Palais Royal",
        "description": "A tiny Japanese-French café tucked under the arcades of the Palais Royal gardens. The terrace only fits a handful of tables but the setting is one of the prettiest in central Paris. Coffee here is actually excellent.",
        "address": "51 Galerie de Montpensier, 75001 Paris",
        "rating": 4.4,
        "image": "https://images.unsplash.com/photo-1497636577773-f1231844b336?w=800&q=80",
        "citySlug": "paris",
        "placeSlug": undefined
      },
      {
        "name": "Le Consulat",
        "description": "The pink-shuttered Montmartre corner you've seen on Instagram a hundred times. The food is forgettable and prices reflect the postcard view, but the terrace still has charm before the crowds arrive. Treat it as a coffee stop, not a meal.",
        "address": "18 Rue Norvins, 75018 Paris",
        "rating": 4.2,
        "image": "https://images.unsplash.com/photo-1431274172761-fca41d930114?w=800&q=80",
        "citySlug": "paris",
        "placeSlug": undefined
      },
      {
        "name": "Café Charlot",
        "description": "A Marais institution on the corner of Rue de Bretagne with a generous red-awning terrace. Locals come for long weekend brunches and early evening drinks. The food is solid, the crowd is stylish, and the location is perfect for exploring the neighborhood.",
        "address": "38 Rue de Bretagne, 75003 Paris",
        "rating": 4.2,
        "image": "https://images.unsplash.com/photo-1525610553991-2bede1a236e2?w=800&q=80",
        "citySlug": "paris",
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
