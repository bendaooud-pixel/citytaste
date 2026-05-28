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
          "https://images.unsplash.com/photo-1428550443830-190057dc8098?w=800&q=80",
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
          "https://images.unsplash.com/photo-1431274172761-fcdab704f457?w=800&q=80",
        citySlug: "barcelona",
      },
      {
        name: "Café Emma",
        description:
          "Hidden in the Gothic Quarter, this charming café serves French-influenced brunch — croque madame, crêpes with honey and walnuts, and excellent filter coffee.",
        address: "Carrer dels Banys Nous, 16, 08002 Barcelona",
        rating: 4.4,
        image:
          "https://images.unsplash.com/photo-1434648957308-5e6a859697e8?w=800&q=80",
        citySlug: "barcelona",
      },
      {
        name: "Nomad Coffee",
        description:
          "Barcelona's finest specialty roastery also has a café in El Born. The filter coffee is outstanding, and the weekend brunch menu pairs well with their single-origin selections.",
        address: "Passatge Sert, 12, 08003 Barcelona",
        rating: 4.8,
        image:
          "https://images.unsplash.com/photo-1439393161192-32360eb753f1?w=800&q=80",
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
          "https://images.unsplash.com/photo-1440427810006-0e4109fd4abe?w=800&q=80",
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
      "https://images.unsplash.com/photo-1442512595132-0d0bdf1b4f4f?w=1200&q=80",
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
          "https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=800&q=80",
        citySlug: "paris",
      },
      {
        name: "Septime",
        description:
          "The most sought-after reservation in Paris. Bertrand Grébaut's natural-wine-driven bistro in the 11th produces market-sourced menus that feel both spontaneous and perfectly composed.",
        address: "80 Rue de Charonne, 75011 Paris",
        rating: 4.9,
        image:
          "https://images.unsplash.com/photo-1473976345543-9ffc928e648d?w=800&q=80",
        citySlug: "paris",
      },
      {
        name: "Le Chateaubriand",
        description:
          "Iñaki Aizpitarte's legendary neo-bistro. The five-course set menu changes daily depending on what arrived at the market that morning. No phone bookings — book online at exactly 7 days ahead.",
        address: "129 Avenue Parmentier, 75011 Paris",
        rating: 4.7,
        image:
          "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=800&q=80",
        citySlug: "paris",
      },
      {
        name: "Brasserie Lipp",
        description:
          "The great brasserie of Saint-Germain — unchanged since the 1950s, with its ceramic tiles and leather banquettes. The choucroute garnie is the thing to order.",
        address: "151 Boulevard Saint-Germain, 75006 Paris",
        rating: 4.4,
        image:
          "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80",
        citySlug: "paris",
      },
      {
        name: "Frenchie",
        description:
          "Gregory Marchand's bistro in the Rue du Nil, where market-fresh ingredients meet technique learned at Fifteen and Gramercy Tavern. Book months in advance.",
        address: "5 Rue du Nil, 75002 Paris",
        rating: 4.8,
        image:
          "https://images.unsplash.com/photo-1477414348463-c0eb7f1359b6?w=800&q=80",
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
      "https://images.unsplash.com/photo-1478391679764-b2d8b3cd1e94?w=1200&q=80",
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
          "https://images.unsplash.com/photo-1483695028939-5bb13f8648b0?w=800&q=80",
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
          "https://images.unsplash.com/photo-1492136344046-866c85e0bf04?w=800&q=80",
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
          "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800&q=80",
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
          "https://images.unsplash.com/photo-1503453776591-b4548af666a2?w=800&q=80",
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
    "coverImage": "https://images.unsplash.com/photo-1507048331197-7d4ac70811cf?w=1200&q=80",
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
        "image": "https://images.unsplash.com/photo-1507914372368-b2b085b925a1?w=800&q=80",
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
        "image": "https://images.unsplash.com/photo-1508088405209-fbd63b6a4f50?w=800&q=80",
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
    "coverImage": "https://images.unsplash.com/photo-1509024644558-2f56ce76c490?w=1200&q=80",
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
        "image": "https://images.unsplash.com/photo-1516997121675-4c2d1684aa3e?w=800&q=80",
        "citySlug": "rome",
        "placeSlug": undefined
      },
      {
        "name": "Roscioli",
        "description": "A salumeria-wine bar hybrid where the carbonara has reached near-mythic status thanks to obsessively sourced guanciale and golden Paolo Parisi eggs. Book weeks ahead for the intimate back room.",
        "address": "Via dei Giubbonari, 21, 00186 Roma RM",
        "rating": 4.6,
        "image": "https://images.unsplash.com/photo-1518309542094-645272814997?w=800&q=80",
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
    "coverImage": "https://images.unsplash.com/photo-1519996529931-28324d5a630e?w=1200&q=80",
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
        "image": "https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=800&q=80",
        "citySlug": "rome",
        "placeSlug": undefined
      },
      {
        "name": "Da Felice a Testaccio",
        "description": "The Testaccio institution where waiters toss tonnarelli cacio e pepe tableside with theatrical flourish. Family-run since 1936 and still the gold standard for the four Roman classics.",
        "address": "Via Mastro Giorgio 29, 00153 Roma RM",
        "rating": 4.6,
        "image": "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800&q=80",
        "citySlug": "rome",
        "placeSlug": undefined
      },
      {
        "name": "Armando al Pantheon",
        "description": "A tiny, wood-paneled trattoria steps from the Pantheon, run by the Gargioli family for three generations. Their gricia and amatriciana are textbook examples of Roman restraint and depth.",
        "address": "Salita de' Crescenzi 31, 00186 Roma RM",
        "rating": 4.6,
        "image": "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&q=80",
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
    "coverImage": "https://images.unsplash.com/photo-1524396309943-e03f5249f002?w=1200&q=80",
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
        "image": "https://images.unsplash.com/photo-1526255623073-e260b1281e09?w=800&q=80",
        "citySlug": "rome",
        "placeSlug": undefined
      },
      {
        "name": "Da Enzo al 29",
        "description": "A tiny, perpetually packed Trastevere trattoria pouring out plates of amatriciana and carbonara with old-school Roman swagger. Expect a queue and tightly packed tables — and food worth every minute.",
        "address": "Via dei Vascellari, 29, 00153 Roma RM",
        "rating": 4.6,
        "image": "https://images.unsplash.com/photo-1526743904158-7a5c3f119c6d?w=800&q=80",
        "citySlug": "rome",
        "placeSlug": undefined
      },
      {
        "name": "Armando al Pantheon",
        "description": "A family-run dining room steps from the Pantheon, serving classic Roman pasta since 1961. The tonnarelli cacio e pepe and abbacchio are textbook examples of the city's culinary canon.",
        "address": "Salita dei Crescenzi, 31, 00186 Roma RM",
        "rating": 4.6,
        "image": "https://images.unsplash.com/photo-1528975604071-b4dc52a2d18c?w=800&q=80",
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
    "coverImage": "https://images.unsplash.com/photo-1529108083258-dc5eb1a89f4c?w=1200&q=80",
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
        "image": "https://images.unsplash.com/photo-1531594652722-292a43e752b4?w=800&q=80",
        "citySlug": "rome",
        "placeSlug": undefined
      },
      {
        "name": "Felice a Testaccio",
        "description": "A Testaccio institution since 1936, where the tonnarelli cacio e pepe is tossed tableside into a glossy, peppery wonder. Booking ahead is non-negotiable.",
        "address": "Via Mastro Giorgio, 29, 00153 Roma RM",
        "rating": 4.5,
        "image": "https://images.unsplash.com/photo-1532081000137-2bd921a97119?w=800&q=80",
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
    "coverImage": "https://images.unsplash.com/photo-1534483509719-3feaee7c30da?w=1200&q=80",
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
        "image": "https://images.unsplash.com/photo-1534533632875-2477db97088d?w=800&q=80",
        "citySlug": "rome",
        "placeSlug": undefined
      },
      {
        "name": "Felice a Testaccio",
        "description": "An institution in Testaccio famous for its theatrical tableside tossing of tonnarelli cacio e pepe, finished with a flourish of cracked black pepper. Reservations are essential weeks in advance.",
        "address": "Via Mastro Giorgio, 29, 00153 Roma RM",
        "rating": 4.6,
        "image": "https://images.unsplash.com/photo-1536419598693-94435e7f9757?w=800&q=80",
        "citySlug": "rome",
        "placeSlug": undefined
      },
      {
        "name": "Da Enzo al 29",
        "description": "A tiny, fiercely traditional Trastevere trattoria where the amatriciana sings with sweet tomato and crisp guanciale. Expect a queue down the cobblestone street—it's worth every minute.",
        "address": "Via dei Vascellari, 29, 00153 Roma RM",
        "rating": 4.6,
        "image": "https://images.unsplash.com/photo-1536521728101-e6625ea331b7?w=800&q=80",
        "citySlug": "rome",
        "placeSlug": undefined
      },
      {
        "name": "Armando al Pantheon",
        "description": "A family-run gem operating in the shadow of the Pantheon since 1961, serving impeccable gricia and rigatoni alla carbonara to politicians, locals, and lucky travelers alike.",
        "address": "Salita dei Crescenzi, 31, 00186 Roma RM",
        "rating": 4.5,
        "image": "https://images.unsplash.com/photo-1537029064159-7726fabb5cd7?w=800&q=80",
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
    "coverImage": "https://images.unsplash.com/photo-1537799943037-f5da89a65689?w=1200&q=80",
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
        "image": "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800&q=80",
        "citySlug": "rome",
        "placeSlug": undefined
      },
      {
        "name": "Felice a Testaccio",
        "description": "The tableside tossing of tonnarelli cacio e pepe here is pure theater, and the result is the creamiest, most pepper-forward version in the city. A Testaccio institution since 1936, still run by the Trivelloni family.",
        "address": "Via Mastro Giorgio, 29, 00153 Roma RM",
        "rating": 4.6,
        "image": "https://images.unsplash.com/photo-1539657523674-fbd149b04c13?w=800&q=80",
        "citySlug": "rome",
        "placeSlug": undefined
      },
      {
        "name": "Armando al Pantheon",
        "description": "Tucked behind the Pantheon, this tiny family-run trattoria has been serving textbook Roman classics since 1961. The gricia and the abbacchio brodettato are reason enough to plan your trip around a reservation.",
        "address": "Salita dei Crescenzi, 31, 00186 Roma RM",
        "rating": 4.6,
        "image": "https://images.unsplash.com/photo-1540189549336-e6e99eb4b951?w=800&q=80",
        "citySlug": "rome",
        "placeSlug": undefined
      },
      {
        "name": "Trattoria Da Cesare al Casaletto",
        "description": "Worth the tram ride out of the center for what many critics call the best amatriciana in Rome — tangy, glossy, and singing with smoky guanciale. The fried starters and natural wine list are equally exceptional.",
        "address": "Via del Casaletto, 45, 00151 Roma RM",
        "rating": 4.5,
        "image": "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?w=800&q=80",
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
        "image": "https://images.unsplash.com/photo-1541643600914-78b084683702?w=800&q=80",
        "citySlug": "paris",
        "placeSlug": undefined
      },
      {
        "name": "Robert et Louise",
        "description": "Step into this 17th-century stone room and you're greeted by a roaring open fire where steaks are seared on a grill that hasn't changed in fifty years. The atmosphere is rustic, smoky, gloriously unfussy — wooden benches, candle wax, and the murmur of regulars. The côte de boeuf for two, charred outside and rosy within, is the only thing to order.",
        "address": "64 Rue Vieille du Temple, 75003 Paris",
        "rating": 4.6,
        "image": "https://images.unsplash.com/photo-1543349689-9a4d426bee8e?w=800&q=80",
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
        "image": "https://images.unsplash.com/photo-1545418314-7ce0b9b53901?w=800&q=80",
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
    "coverImage": "https://images.unsplash.com/photo-1547398847-19d7560a6257?w=1200&q=80",
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
        "image": "https://images.unsplash.com/photo-1548270311-3a9e56a480ff?w=800&q=80",
        "citySlug": "paris",
        "placeSlug": undefined
      },
      {
        "name": "Breizh Café",
        "description": "Modern Breton crêperie taken seriously, with proper buckwheat galettes and real Bordier butter. The takeaway counter offers simple versions at honest prices. Best eaten walking, while it's still hot.",
        "address": "109 Rue Vieille du Temple, 75003 Paris, France",
        "rating": 4.4,
        "image": "https://images.unsplash.com/photo-1548787060-36a662d4d04a?w=800&q=80",
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
    "coverImage": "https://images.unsplash.com/photo-1550254804-3c9bf594a0a5?w=1200&q=80",
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
        "image": "https://images.unsplash.com/photo-1551913902-c92207136625?w=800&q=80",
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
  },
  {
    "title": "Best Japanese Restaurants in Paris",
    "slug": "japanese-restaurants-paris",
    "city": "Paris",
    "citySlug": "paris",
    "category": "Restaurants",
    "coverImage": "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=1200&q=80",
    "publishedAt": "2026-05-14",
    "readingTime": 8,
    "metaDescription": "Discover the best Japanese restaurants in Paris — from Rue Sainte-Anne ramen spots to hidden sushi counters loved by locals and food enthusiasts.",
    "intro": "Paris and Japan share a quiet love affair that goes back decades. Around Rue Sainte-Anne, Opéra and the smaller streets of the 2nd arrondissement, you'll find an entire micro-Tokyo where ramen shops, izakayas and discreet omakase counters sit side by side. This guide is for tourists, couples and food lovers looking for something more memorable than a brasserie — with options for every budget, from a €15 ramen bowl to a €120 tasting menu.",
    "body": "## Why Paris Has Such a Strong Japanese Food Scene\n\nThe Japanese community settled around Opéra in the 1970s and slowly turned Rue Sainte-Anne into the city's unofficial Little Tokyo. Today, the quality is genuinely high — many chefs trained in Tokyo or Osaka, and ingredients are flown in weekly. You'll wait in line for the best ramen, but it's usually worth it.\n\nExpect to spend around €15–25 for a casual ramen lunch, €40–70 for a proper izakaya dinner, and €100+ for sushi omakase.\n\n## Quick Comparison Table\n\n| Restaurant | Price | Best For | Rating | Atmosphere |\n|---|---|---|---|---|\n| Kodawari Ramen Tsukiji | €€ | Foodies, solo travelers | 4.5 | Tokyo fish market replica |\n| Sanukiya | € | Budget travelers | 4.4 | Casual udon canteen |\n| Higuma | € | Tourists, quick meals | 4.3 | No-frills, fast, smoky |\n| Aki | €€ | Couples, foodies | 4.5 | Cozy izakaya warmth |\n| Jin | €€€€ | Special occasions | 4.7 | Refined sushi counter |\n\n## The Restaurants Worth Your Time\n\n### Kodawari Ramen Tsukiji — A Tokyo Fish Market in the 6th\n\nStepping into Kodawari Tsukiji feels like walking onto a film set. The team rebuilt a slice of Tokyo's old Tsukiji market inside — fake fish stalls, hanging lanterns, vintage signs. It's theatrical but never tacky. The seafood-based ramen is rich without being heavy, and the chashu is genuinely good. Come right at opening (around 11:45 am) or expect a 30-minute wait.\n\n**Best for:** Solo travelers, anyone curious about ramen done seriously.\n**Downside:** Tables are tight and it gets loud at peak hours.\n\n### Sanukiya — Udon Done Right\n\nIf ramen feels too rich, Sanukiya on Rue Sainte-Anne is the move. Thick, chewy sanuki-style udon noodles, made fresh daily. The tempura is light and crisp — locals usually order the curry udon or the cold bukkake udon in summer. Lunch hits €12–15, which is rare value in central Paris.\n\n**Best for:** Budget travelers and lunch breaks between sightseeing.\n**Downside:** Often a queue, no reservations.\n\n### Higuma — The Old-School Classic\n\nHiguma has been on Rue Sainte-Anne forever, and the open kitchen with chefs flipping gyoza behind a counter is part of the charm. It's not refined and it's not trying to be. The set menu (gyoza + ramen + rice) is filling and cheap. Expect smoke, speed, and a bit of chaos.\n\n**Best for:** Tourists who want an authentic, unfussy first ramen.\n**Downside:** Service is rushed — this isn't a place to linger.\n\n### Aki — The Couples' Pick\n\nA few doors down from Higuma, Aki is warmer and more intimate. It leans izakaya: grilled skewers, okonomiyaki, sake by the carafe. The okonomiyaki here is one of the best in Paris — properly fluffy, with that sweet-savory sauce. Dim lighting, wooden interior, easy to spend two hours here.\n\n**Best for:** Couples and small groups wanting a relaxed dinner.\n**Downside:** Reservations strongly recommended, especially Friday and Saturday.\n\n### Jin — Sushi at Its Most Serious\n\nJin holds a Michelin star and it shows. Chef Takuya Watanabe works behind a small counter in the 1st arrondissement, serving omakase with fish flown in from Japan. Each piece is built deliberately — sometimes with a brush of soy, sometimes with yuzu zest. The tasting menu starts around €145 at lunch and climbs from there.\n\n**Best for:** Anniversaries, milestone dinners, sushi obsessives.\n**Downside:** Pricey, and you'll need to book weeks ahead.\n\n## Local Tips\n\n- **Avoid the 12:30–1:30 pm rush** on Rue Sainte-Anne. Either arrive at opening or after 2 pm.\n- **Locals order the tsukemen** at Kodawari when it's cold — dipping noodles, deeper flavor.\n- **Cash isn't always king** — most places take card, but smaller spots like Higuma prefer cash for small bills.\n- **Walk Rue Sainte-Anne end to end** before choosing. You'll spot grocery stores, matcha cafés and pastry shops worth a detour.\n- **Sunday closures are common** — always check before heading over.\n\n## FAQ\n\n**Where is the Japanese district in Paris?**\nAround Rue Sainte-Anne, between Opéra and Pyramides metro stations, in the 1st and 2nd arrondissements.\n\n**Which is the best ramen in Paris?**\nKodawari Tsukiji and its sister Kodawari Yokochō are widely considered the top ramen spots, with Higuma as the old-school favorite.\n\n**Are Japanese restaurants in Paris expensive?**\nNot necessarily. A great ramen runs €15–20. Sushi omakase, however, can reach €150+.\n\n**Do I need to book in advance?**\nFor Jin, yes — weeks ahead. For Aki, a few days. Ramen spots are walk-in only.\n\n**Is Rue Sainte-Anne worth visiting just for the food?**\nAbsolutely. It's one of the most concentrated and authentic Japanese food streets in Europe.\n\n## Final Take\n\nIf you're traveling on a budget, Sanukiya and Higuma deliver the most for the price. Couples should head to Aki for a slow, candlelit evening. Foodies hunting the best bowl will love Kodawari Tsukiji's theatrical setting. And for a once-in-a-trip splurge, Jin is the sushi experience worth saving up for. Whichever you pick, you're getting a side of Paris most visitors never bother to find.",
    "places": [
      {
        "name": "Kodawari Ramen Tsukiji",
        "description": "A ramen shop styled like Tokyo's old Tsukiji fish market, complete with lanterns and faux stalls. The seafood-based broth is genuinely excellent and the staging is more fun than gimmicky. Expect a queue at peak hours.",
        "address": "12 Rue de Richelieu, 75001 Paris, France",
        "rating": 4.5,
        "image": "https://images.unsplash.com/photo-1623341214825-9f4f963727da?w=800&q=80",
        "citySlug": "paris",
        "placeSlug": undefined
      },
      {
        "name": "Sanukiya",
        "description": "A casual udon canteen serving thick, hand-pulled sanuki noodles on Rue Sainte-Anne. The tempura is light and the curry udon is a winter favorite. Great value for central Paris.",
        "address": "9 Rue d'Argenteuil, 75001 Paris, France",
        "rating": 4.4,
        "image": "https://images.unsplash.com/photo-1618841557871-b4664fbf0cb3?w=800&q=80",
        "citySlug": "paris",
        "placeSlug": undefined
      },
      {
        "name": "Higuma",
        "description": "A long-standing classic on Rue Sainte-Anne with an open kitchen and a steady stream of regulars. The set menu of gyoza, ramen and rice is cheap, filling and unapologetically old-school. Expect noise, smoke and quick service.",
        "address": "32 bis Rue Sainte-Anne, 75001 Paris, France",
        "rating": 4.3,
        "image": "https://images.unsplash.com/photo-1557872943-16a5ac26437e?w=800&q=80",
        "citySlug": "paris",
        "placeSlug": undefined
      },
      {
        "name": "Aki",
        "description": "An intimate izakaya known for its fluffy okonomiyaki and warm wooden interior. The grilled skewers and sake list make it a strong pick for a relaxed dinner. Reservations are strongly recommended on weekends.",
        "address": "11 bis Rue Sainte-Anne, 75001 Paris, France",
        "rating": 4.5,
        "image": "https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?w=800&q=80",
        "citySlug": "paris",
        "placeSlug": undefined
      },
      {
        "name": "Jin",
        "description": "A Michelin-starred sushi counter in the 1st arrondissement where Chef Takuya Watanabe builds each piece with precision. Fish is flown in from Japan and the omakase is paced like a quiet ceremony. Not cheap, but unforgettable.",
        "address": "6 Rue de la Sourdière, 75001 Paris, France",
        "rating": 4.7,
        "image": "https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=800&q=80",
        "citySlug": "paris",
        "placeSlug": undefined
      }
    ]
  },
  {
    "title": "Top Vegan Restaurants in Paris 2025",
    "slug": "vegan-restaurants-paris",
    "city": "Paris",
    "citySlug": "paris",
    "category": "Restaurants",
    "coverImage": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1200&q=80",
    "publishedAt": "2026-05-15",
    "readingTime": 8,
    "metaDescription": "Discover the best vegan restaurants in Paris 2025 — from cozy bistros to plant-based fine dining, with local tips and honest reviews.",
    "intro": "Paris isn't the first city that comes to mind when you think 'vegan capital', but the scene has quietly exploded in the last few years. From plant-based bistros in the Marais to refined tasting menus near Saint-Germain, there's now a real range for travelers, couples, and food lovers on a budget. This guide is for anyone who wants to eat well in Paris without compromising — expect to spend anywhere from €15 for a lunch bowl to €90 for a full vegan tasting experience.",
    "body": "## Vegan Restaurants in Paris at a Glance\n\n| Restaurant | Price | Best For | Rating | Atmosphere |\n|---|---|---|---|---|\n| ONA (sister spot) / Le Potager du Marais | €€ | Couples, foodies | 4.5 | Cozy bistro |\n| Wild & The Moon | € | Budget travelers | 4.3 | Bright, healthy café |\n| Abattoir Végétal | €€ | Brunch lovers | 4.4 | Industrial-chic |\n| 42 Degrés | €€€ | Special occasions | 4.6 | Raw, refined |\n| Hank Vegan Burger | € | Quick eats | 4.4 | Casual, fast |\n\n## Le Potager du Marais\n\nTucked on a narrow street near the Centre Pompidou, Le Potager du Marais has been doing vegan French classics long before it was trendy. It's small — maybe 20 seats — and the tables are close enough that you'll overhear your neighbor's conversation, which is part of the charm.\n\nThe menu leans traditional: bourguignon made with seitan, vegan tartiflette, crème brûlée that genuinely works. It's the kind of place where you taste familiar French flavors in unfamiliar form.\n\n**Best time to visit:** Weekday evenings around 7pm before the rush.\n**Pros:** Authentic French dishes, friendly service.\n**Cons:** Tight space, reservations essential.\n**Nearby:** Walk over to Rue des Rosiers or the Pompidou afterward.\n\n## Wild & The Moon\n\nWild & The Moon has multiple locations across Paris, but the one on Rue Charlot in the Marais is the one I'd point a first-timer to. It's bright, plant-filled, and built for the morning crowd grabbing cold-pressed juices and matcha bowls before work.\n\nThe food is organic, mostly raw or lightly cooked, and clearly designed for people who care about ingredients. Prices are reasonable for Paris — a hearty bowl runs around €13-15.\n\n**Best for:** Solo travelers, quick healthy lunch, takeaway.\n**Pros:** Fast, fresh, consistent quality.\n**Cons:** Not a romantic dinner spot — more of a daytime place.\n\n## Abattoir Végétal\n\nIn the 18th arrondissement, near Montmartre, Abattoir Végétal is a brunch destination people actually plan their Sundays around. The space is open, with raw wood, hanging plants, and that slightly noisy hum of a packed weekend room.\n\nThe weekend brunch is the highlight — pancakes, scrambled tofu, sourdough toasts done properly. Expect to wait 20-30 minutes on Saturdays if you don't reserve.\n\n**Best time:** Weekday lunch if you hate crowds, Sunday brunch if you don't mind them.\n**Pros:** Generous portions, great coffee.\n**Cons:** Service can slow down when it's busy.\n**Nearby:** Walk up to Sacré-Cœur or wander Rue des Abbesses.\n\n## 42 Degrés\n\nThis is the splurge pick. 42 Degrés is one of the only fine-dining raw vegan restaurants in Paris, and the tasting menu is a genuine event — multiple courses, wine pairings, the works. It sits in the 9th arrondissement, not far from Galeries Lafayette.\n\nThe concept (nothing heated above 42°C) sounds gimmicky on paper, but the execution is precise. Dishes are layered, textured, and beautifully plated. Not cheap — expect €70-100 per person with drinks.\n\n**Best for:** Couples, anniversaries, food obsessives.\n**Pros:** Inventive, unforgettable plating.\n**Cons:** Pricey; portions are refined, not filling.\n\n## Hank Vegan Burger\n\nFor the budget travelers and quick-lunch crowd, Hank in the 3rd arrondissement is reliable. Burgers are around €12, fries are good, and the queue moves fast. It's not fine dining — it's exactly what it claims to be.\n\nThe space is small and casual, mostly takeaway-friendly. Grab one and walk five minutes to Square du Temple to eat outside in warmer months.\n\n**Best for:** Lunch, families, anyone craving comfort food.\n**Pros:** Affordable, filling, central.\n**Cons:** Limited seating inside.\n\n## Local Tips\n\n- **Reserve ahead** for Le Potager du Marais and 42 Degrés — both are small and book up days in advance.\n- **Avoid the 1-3pm lunch rush** if you want a quieter experience. Parisians eat late.\n- Most vegan spots cluster in the **Marais (3rd/4th)** and **Montmartre (18th)**. Plan walks accordingly.\n- Wild & The Moon is great for **breakfast takeaway** before a long day of sightseeing.\n- Many places close on Sundays or Mondays — always check ahead.\n\n## FAQ\n\n**Is Paris vegan-friendly in 2025?**\nMuch more than five years ago. Most neighborhoods now have at least one fully vegan spot, and many traditional cafés offer plant-based options.\n\n**What's the average price for a vegan meal in Paris?**\nLunch runs €12-18, dinner €25-40, and tasting menus can reach €80-100.\n\n**Which area has the most vegan restaurants?**\nThe Marais (3rd and 4th arrondissements) has the highest concentration, followed by Montmartre.\n\n**Do I need to book in advance?**\nFor smaller spots like Le Potager du Marais and 42 Degrés, yes. Casual places like Hank and Wild & The Moon take walk-ins.\n\n## Final Thoughts\n\nIf you're traveling as a **couple**, book 42 Degrés for a memorable night or Le Potager du Marais for something cozier. **Budget travelers** should head to Hank or Wild & The Moon. **Brunch lovers** can't go wrong with Abattoir Végétal. Paris has finally caught up — and eating vegan here no longer means compromising on the experience.",
    "places": [
      {
        "name": "Le Potager du Marais",
        "description": "A tiny vegan bistro serving plant-based versions of French classics in the heart of the Marais. The space is intimate and slightly cramped, but the food more than makes up for it. Reservations are essential, especially on weekends.",
        "address": "26 Rue Saint-Paul, 75004 Paris, France",
        "rating": 4.5,
        "image": "https://images.unsplash.com/photo-1552432010-6a42a36dc127?w=800&q=80",
        "citySlug": "paris",
        "placeSlug": undefined
      },
      {
        "name": "Wild & The Moon",
        "description": "A bright, plant-filled café serving organic juices, bowls, and pastries. Perfect for a quick healthy lunch or grab-and-go breakfast before sightseeing. Multiple locations, but Rue Charlot has the best vibe.",
        "address": "55 Rue Charlot, 75003 Paris, France",
        "rating": 4.3,
        "image": "https://images.unsplash.com/photo-1553742198-6eea5ac42a24?w=800&q=80",
        "citySlug": "paris",
        "placeSlug": undefined
      },
      {
        "name": "Abattoir Végétal",
        "description": "A spacious vegan brunch spot in Montmartre with industrial design and serious weekend crowds. Generous portions, great coffee, and the kind of menu that converts skeptics. Best visited mid-week to avoid the rush.",
        "address": "61 Rue Ramey, 75018 Paris, France",
        "rating": 4.4,
        "image": "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&q=80",
        "citySlug": "paris",
        "placeSlug": undefined
      },
      {
        "name": "42 Degrés",
        "description": "A refined raw vegan restaurant offering an inventive tasting menu near Galeries Lafayette. Every plate is carefully designed and full of texture. Pricey but worth it for a special evening out.",
        "address": "109 Rue du Faubourg Poissonnière, 75009 Paris, France",
        "rating": 4.6,
        "image": "https://images.unsplash.com/photo-1554907984-15263bfd63bd?w=800&q=80",
        "citySlug": "paris",
        "placeSlug": undefined
      },
      {
        "name": "Hank Vegan Burger",
        "description": "A small, casual burger joint in the Marais doing reliable vegan comfort food. Lines move fast and the burgers genuinely satisfy. A solid lunch stop if you're exploring the area on foot.",
        "address": "55 Rue des Archives, 75003 Paris, France",
        "rating": 4.4,
        "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80",
        "citySlug": "paris",
        "placeSlug": undefined
      }
    ]
  },
  {
    "title": "Best Late Night Food in Paris",
    "slug": "late-night-food-paris",
    "city": "Paris",
    "citySlug": "paris",
    "category": "Nightlife",
    "coverImage": "https://images.unsplash.com/photo-1555425748-f780612e5634?w=1200&q=80",
    "publishedAt": "2026-05-16",
    "readingTime": 8,
    "metaDescription": "Where to eat late night in Paris: bistros, brasseries and onion soup spots open after midnight, picked for couples, foodies and budget travelers.",
    "intro": "Paris doesn't really shut down at midnight — it just shifts gears. Once the dinner crowd clears out, the city quietly opens a second door: smoky brasseries near Les Halles, all-night bistros in Pigalle, and tiny counters where cab drivers and night-shift cooks share a table. This guide is for travelers who land late, couples wandering home from a bar, and food lovers who refuse to settle for hotel snacks.",
    "body": "## Late Night Food in Paris: Quick Comparison\n\n| Place | Price | Best for | Rating | Atmosphere |\n|-------|-------|----------|--------|------------|\n| Au Pied de Cochon | €€€ | Classic brasserie experience | 4.3 | Old-school, lively, 24/7 |\n| Le Tambour | €€ | Night owls & solo travelers | 4.2 | Quirky, smoky, locals only |\n| Chez Denise (La Tour de Montlhéry) | €€€ | Foodies who love red meat | 4.5 | Loud, tightly packed, joyful |\n| L'As du Fallafel | € | Budget travelers | 4.5 | Casual takeaway, busy street |\n| Café Charbon | €€ | Couples & late drinks | 4.2 | Belle Époque, low light |\n\n## Au Pied de Cochon — The 24-Hour Brasserie Near Les Halles\n\nOpen non-stop since 1947, Au Pied de Cochon is the obvious answer when it's 3 AM and you want something proper. The onion soup gratinée is the order most tables go for, and yes, it's as rich as you'd hope after a long night.\n\nThe room feels theatrical — red banquettes, white tablecloths, waiters in long aprons moving fast. It's touristy, no point pretending otherwise, but the kitchen still takes itself seriously.\n\n**Best time to visit:** between 1 AM and 4 AM, when the energy peaks and the dinner crowd is long gone. Couples and curious travelers tend to love it. Downside: prices climb quickly if you add wine and oysters.\n\nNearby: Église Saint-Eustache and the Westfield Forum des Halles are just a short walk away.\n\n## Le Tambour — A Pigalle-Style Bistro Hidden in the 2nd\n\nLe Tambour looks like a bistro built out of flea-market finds: old metro signs, mismatched chairs, a bar that never seems to close. Kitchen runs until around 5 AM, which is rare even in Paris.\n\nThe menu is unfussy — steak frites, confit de canard, omelets. Nothing reinvented, everything dependable. The crowd is a mix of regulars, chefs after service, and a few lost tourists who clearly weren't expecting the noise.\n\nGo if you want a real late-night Paris bistro feel. Skip it if you need quiet, or if you're not comfortable with cigarette smoke drifting in from the terrace.\n\n## Chez Denise (La Tour de Montlhéry) — Where Cooks Eat After Work\n\nThis is the kind of place Anthony Bourdain talked about and that Parisians still keep coming back to. Open until around 5 AM most nights, Chez Denise serves enormous portions of beef, marrow bones, and country pâté.\n\nTables are pushed together, the lighting is yellow, and the waiters somehow remember everyone. Reservations are essential — even at 1 AM on a Tuesday.\n\nNot the spot for light eaters or anyone avoiding red meat. But if you want a meal that feels like a slice of 1970s Paris, it's hard to beat.\n\nNearby: Rue Montorgueil, perfect for an early-morning walk after dinner.\n\n## L'As du Fallafel — The Marais After Midnight\n\nOpen later than most casual spots in the Marais (until around 1 AM, later on weekends), L'As du Fallafel is where you go when you want to spend ten euros and feel completely satisfied. The pita is stuffed almost too generously — eggplant, cabbage, hummus, harissa.\n\nThe queue moves fast. Eat standing on Rue des Rosiers, or take it toward Place des Vosges if it's not raining.\n\nIdeal for budget travelers and solo wanderers. Cons: it's not open through the deep hours, so plan ahead.\n\n## Café Charbon — Late Drinks and Plates in Oberkampf\n\nCafé Charbon is technically a café, but the kitchen serves until late and the bar runs past 2 AM most nights. The Belle Époque interior — high ceilings, antique mirrors, warm bulbs — makes it one of the more atmospheric late spots in the 11th.\n\nCouples come here for a glass of wine and a charcuterie board after a concert at Nouveau Casino next door. It gets loud on weekends, so weeknights feel more intimate.\n\nNearby streets: Rue Oberkampf and Rue Saint-Maur, full of small bars worth exploring.\n\n## Local Tips for Eating Late in Paris\n\n- **Reserve when you can.** Even at midnight, places like Chez Denise fill up.\n- **Metro stops around 1:15 AM** on weeknights. Plan a Noctilien bus or a short walk.\n- **Locals usually order** onion soup, steak tartare, or a simple omelet — not elaborate dishes — after midnight.\n- **Avoid Champs-Élysées late-night spots.** Most are tourist traps with inflated prices.\n- **Cash still helps** at some older bistros, especially after 2 AM.\n\n## FAQ: Late Night Food in Paris\n\n**What time do restaurants close in Paris?**\nMost kitchens close around 10:30–11 PM. For anything later, head to brasseries near Les Halles, Pigalle, or Oberkampf.\n\n**Is Paris safe to walk at night for food?**\nThe central arrondissements (1st, 2nd, 3rd, 4th, 11th) are generally safe and well-lit until late. Stay aware around Châtelet and Gare du Nord.\n\n**Where can I eat after 2 AM in Paris?**\nAu Pied de Cochon (24/7), Le Tambour, and Chez Denise are the most reliable options.\n\n**Are there cheap late-night options?**\nYes — L'As du Fallafel, kebab shops on Rue Saint-Denis, and bakeries that open around 5 AM.\n\n## Final Thoughts\n\nFor couples, **Café Charbon** offers the most romantic late atmosphere. For foodies, **Chez Denise** is unmatched. Tourists wanting the full Paris brasserie show should head straight to **Au Pied de Cochon**. Budget travelers can't go wrong with **L'As du Fallafel**, and night owls will feel at home at **Le Tambour**. Whichever you choose, late-night Paris rewards anyone willing to stay up a little longer than the guidebooks suggest.",
    "places": [
      {
        "name": "Au Pied de Cochon",
        "description": "A 24-hour brasserie that has been feeding night owls near Les Halles since 1947. Famous for its onion soup and pig trotters, it has the kind of red-banquette theatrics that still feel genuine. Touristy, yes, but the kitchen hasn't slipped.",
        "address": "6 Rue Coquillière, 75001 Paris, France",
        "rating": 4.3,
        "image": "https://images.unsplash.com/photo-1555529771-122e5d9f2341?w=800&q=80",
        "citySlug": "paris",
        "placeSlug": undefined
      },
      {
        "name": "Le Tambour",
        "description": "A flea-market style bistro in the 2nd that keeps its kitchen open until around 5 AM. Expect steak frites, confit de canard, and a crowd of chefs and regulars. Loud, smoky on the terrace, and unmistakably local.",
        "address": "41 Rue Montmartre, 75002 Paris, France",
        "rating": 4.2,
        "image": "https://images.unsplash.com/photo-1555992828-35627f3b373f?w=800&q=80",
        "citySlug": "paris",
        "placeSlug": undefined
      },
      {
        "name": "Chez Denise (La Tour de Montlhéry)",
        "description": "A tightly packed Les Halles institution where waiters remember faces and portions are enormous. Beef, marrow bones, and country pâté dominate the menu, served until around 5 AM. The kind of place Parisian cooks come to after their own shifts.",
        "address": "5 Rue des Prouvaires, 75001 Paris, France",
        "rating": 4.5,
        "image": "https://images.unsplash.com/photo-1556764420-e37ef4cdfa5c?w=800&q=80",
        "citySlug": "paris",
        "placeSlug": undefined
      },
      {
        "name": "L'As du Fallafel",
        "description": "The Marais classic that fills pita bread to bursting with eggplant, hummus, and harissa. Open later than most casual spots on Rue des Rosiers, with a queue that moves surprisingly fast. Cheap, filling, and consistently good.",
        "address": "34 Rue des Rosiers, 75004 Paris, France",
        "rating": 4.5,
        "image": "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&q=80",
        "citySlug": "paris",
        "placeSlug": undefined
      },
      {
        "name": "Café Charbon",
        "description": "A Belle Époque café-bar in Oberkampf with antique mirrors, warm lighting, and a kitchen that runs late. Couples come here for charcuterie and wine after concerts next door. Weeknights are quieter and noticeably more romantic.",
        "address": "109 Rue Oberkampf, 75011 Paris, France",
        "rating": 4.2,
        "image": "https://images.unsplash.com/photo-1556816214-fda351e4a7fb?w=800&q=80",
        "citySlug": "paris",
        "placeSlug": undefined
      }
    ]
  },
  {
    "title": "Montmartre's Quiet Food Spots Locals Actually Use",
    "slug": "montmartre-food-hidden-gems",
    "city": "Paris",
    "citySlug": "paris",
    "category": "Restaurants",
    "coverImage": "https://images.unsplash.com/photo-1558384041-dc2d20aacae6?w=1200&q=80",
    "publishedAt": "2026-05-17",
    "readingTime": 8,
    "metaDescription": "Skip the Place du Tertre tourist traps. Five Montmartre restaurants where Parisians actually eat, with dishes, prices and honest tips.",
    "intro": "It's a Tuesday in February, raining sideways on Rue Lepic, and the line outside the crêpe stand near Place du Tertre is still twelve people deep. None of them are French. Montmartre has two food scenes running in parallel: the one selling €18 onion soup to coach tours, and the one tucked three streets over where the butcher knows the chef by name. This guide is for travelers who want the second one — small rooms, real cooking, mid-range prices, and the kind of meal you'll still talk about in October.",
    "body": "## Why Paris for Montmartre food hidden gems\n\nMontmartre sits on a hill in the 18th arrondissement, and the higher you climb past Abbesses, the better the food gets and the fewer souvenir shops you see. Expect to spend €25-45 per person at lunch, €40-70 at dinner. Spring and early autumn are best — winter is moody but many smaller places close for two weeks in February.\n\n| Place | Price | Best For | Vibe |\n|-------|-------|----------|------|\n| Le Coq Rico | €€€ | Roast chicken obsessives | Bright, slightly formal |\n| Bouillon Pigalle | € | Budget classics | Loud, fast, no booking |\n| Le Relais Gascon | €€ | Giant salads, late lunch | Casual, two floors |\n| La Mascotte | €€€ | Seafood, old-school Paris | Brasserie, 1889 tiles |\n| Hardware Société | €€ | Brunch done properly | Aussie-French, sunny room |\n\n## Detailed Reviews\n\n### 1. Le Coq Rico\n\nAntoine Westermann turned a whole building on Rue Lepic into a temple for poultry, and the result is less gimmicky than it sounds. You order a bird — Bresse hen, guinea fowl, Challans duck — and it arrives carved, with the carcass brought out separately so nothing is wasted. The dining room is calm and well-lit, which in Montmartre is rarer than it should be.\n\nThe **whole roast chicken for two** runs around €98 and yes, that's a lot for chicken, but you'll understand by the second bite.\n\n**Best for:** A proper dinner that isn't trying to be trendy\n**Local tip:** Sit at the counter if you're solo — they do a half-bird option there that isn't on the main menu.\n\n### 2. Bouillon Pigalle\n\nThis is the cheap Paris bistro experience everyone keeps promising you and rarely delivers. Starters from €2.50, mains under €13, and the wait outside can hit 45 minutes at 8pm on a Saturday. No reservations, ever — they're firm about it.\n\nThe **œuf mayo** is €1.90 and genuinely good. Skip the desserts and walk five minutes for ice cream instead.\n\n**Best for:** Travelers watching the budget who still want the white-tablecloth feel\n**Local tip:** Show up at 11:45am or 2:30pm to walk straight in. The 7-9pm window is brutal.\n\n### 3. Le Relais Gascon\n\nA two-floor place on Rue des Abbesses that's been doing the same enormous garlic-potato-topped salads for decades. The **salade Gasconne** with warm potatoes, garlic, and gizzards is the move — confit de canard works too if salads feel wrong for dinner. Expect around €16-22 for a main.\n\nIt's not refined, the wine list is short, and the upstairs room feels a bit cramped. But it's open late, the staff are quick, and you'll leave full enough to skip breakfast.\n\n**Best for:** A late lunch after walking the hill\n**Local tip:** Ask for a table downstairs — the upstairs gets warm in summer and the music is louder.\n\n### 4. La Mascotte\n\nOpen since 1889 on the corner of Rue des Abbesses and Rue des Martyrs, this is where the neighborhood old guard goes for oysters and choucroute. The tiled floor, the brass, the slightly grumpy waiters in long aprons — none of it is staged.\n\nThe **plateau de fruits de mer** is the order, around €45 for a solid selection. Lunch menus from €28 are better value than dinner if you're price-sensitive.\n\n**Best for:** A long Sunday lunch with someone you actually want to talk to\n**Local tip:** Reserve the terrace in summer but don't bother in winter — the inside is the whole point.\n\n### 5. Hardware Société\n\nA Melbourne import on Rue des Trois Frères, right under Sacré-Cœur, which on paper should be a disaster — and isn't. The brunch is genuinely well-executed: poached eggs that aren't rubbery, proper flat whites, and a **baked eggs in tomato** dish that's worth the €17.\n\nWeekend mornings are a scrum. The room is small, sunlight pours in, and they won't take reservations for groups under four.\n\n**Best for:** Brunch travelers who've had enough of dry croissants\n**Local tip:** Go Tuesday or Wednesday around 10am — same menu, no wait, and you'll still beat the Sacré-Cœur crowds afterwards.\n\n## Local Tips for Montmartre food hidden gems\n\n- Avoid anywhere on Place du Tertre. Photos of plastic menus in five languages are a red flag — walk three streets downhill instead.\n- For dinner reservations, book 4-7 days ahead for Coq Rico and La Mascotte. The others are walk-in or short notice.\n- Order the house wine by the pichet (carafe) — €8-14 and almost always decent. Bottle lists at small Montmartre places are marked up hard.\n- Combine lunch at Le Relais Gascon with a walk down Rue Lepic to Café des Deux Moulins (the Amélie one) — fine for a coffee, mediocre for food.\n\n## FAQ\n\n### Q: Is Montmartre worth eating in or should I go elsewhere?\nA: It's worth it if you stay off the main tourist streets. The blocks around Rue des Abbesses, Rue des Martyrs, and lower Rue Lepic have more good restaurants per square meter than most arrondissements. Place du Tertre, on the other hand, you can confidently skip.\n\n### Q: How much should I budget for dinner in Montmartre?\nA: Plan €30-45 per person at a place like Le Relais Gascon or Hardware Société, €60-80 at La Mascotte or Le Coq Rico with wine. Bouillon Pigalle can land you under €20 including a glass of wine, which is rare in central Paris.\n\n### Q: Where should I eat in Montmartre as a solo traveler?\nA: Bouillon Pigalle has communal-feeling tables and zero awkwardness about eating alone. Le Coq Rico's counter is the best high-end option for one. Avoid the brasseries on Place du Tertre — you'll get the worst table and the slowest service.\n\n## The Verdict\n\n**Best for couples:** La Mascotte, especially a corner banquette on a Sunday at 1pm.\n**Best for budget:** Bouillon Pigalle, no contest — just commit to the off-peak timing.\n**Best for first-timers:** Le Relais Gascon hits the classic Paris bistro register without the markup.\n**Best for locals (or feeling like one):** Le Coq Rico for a real meal, Hardware Société for a midweek brunch when the neighborhood is quiet.",
    "places": [
      {
        "name": "Le Coq Rico",
        "description": "A bright, slightly formal dining room dedicated almost entirely to poultry, run by chef Antoine Westermann. The whole roast birds — Bresse hen, Challans duck, guinea fowl — are carved tableside and served with their jus, with the carcass brought out for nibbling. It's expensive for chicken, but the sourcing and execution justify it.",
        "address": "98 Rue Lepic, 75018 Paris",
        "rating": 4.5,
        "image": "https://images.unsplash.com/photo-1592417817038-d13fd7342605?w=800&q=80",
        "citySlug": "paris",
        "placeSlug": undefined
      },
      {
        "name": "Bouillon Pigalle",
        "description": "Loud, fast, and packed from open to close, this is the modern reboot of the classic Paris bouillon. Starters from €2.50 and mains under €13 mean you can eat a three-course French meal for the price of a sandwich elsewhere. The trade-off is no reservations and a queue that can hit 45 minutes at peak times.",
        "address": "22 Boulevard de Clichy, 75018 Paris",
        "rating": 4.2,
        "image": "https://images.unsplash.com/photo-1558416167-29269886c836?w=800&q=80",
        "citySlug": "paris",
        "placeSlug": undefined
      },
      {
        "name": "Le Relais Gascon",
        "description": "A two-floor neighborhood spot on Rue des Abbesses serving Gascon classics with no pretension. The signature is an enormous warm salad topped with sautéed garlic potatoes — order the Gasconne with gizzards. Décor is dated and the upstairs gets warm in summer, but portions are generous and service is quick.",
        "address": "6 Rue des Abbesses, 75018 Paris",
        "rating": 4.3,
        "image": "https://images.unsplash.com/photo-1558442240-6b455d590e15?w=800&q=80",
        "citySlug": "paris",
        "placeSlug": undefined
      },
      {
        "name": "La Mascotte",
        "description": "A brasserie open since 1889 with original tiles, brass details, and waiters in long white aprons who've worked there longer than most chefs have been cooking. The seafood platter and choucroute are the standout orders — old-school cooking with no reinvention. Dinner is pricey; the lunch menu from €28 is a better deal.",
        "address": "52 Rue des Abbesses, 75018 Paris",
        "rating": 4.3,
        "image": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
        "citySlug": "paris",
        "placeSlug": undefined
      },
      {
        "name": "Hardware Société",
        "description": "An Australian-run café tucked on a stepped street below Sacré-Cœur, serving the city's most consistent brunch. The baked eggs in tomato sauce and the flat whites are both better than they need to be given the location. The room is small and weekends are chaotic — go midweek.",
        "address": "10 Rue Lamarck, 75018 Paris",
        "rating": 4.4,
        "image": "https://images.unsplash.com/photo-1560053608-13721b16a167?w=800&q=80",
        "citySlug": "paris",
        "placeSlug": undefined
      }
    ]
  },
  {
    "title": "48 Hours Food Guide in Marrakech",
    "slug": "48-hours-food-guide-marrakech",
    "city": "Marrakech",
    "citySlug": "marrakech",
    "category": "Restaurants",
    "coverImage": "https://images.unsplash.com/photo-1597212618440-806262de4f0b?w=1200&q=80",
    "publishedAt": "2026-05-15",
    "readingTime": 9,
    "metaDescription": "The only 48-hour Marrakech food guide you need — from harira at dawn to rooftop cocktails at midnight, with exact addresses and honest tips.",
    "intro": "Forty-eight hours in Marrakech is both too short and exactly right. Too short because the medina keeps revealing new layers the longer you stay. Exactly right because two days — done properly — will take you from a bowl of harira at a street canteen to dinner in a candlelit riad palace, via a rooftop at sunset, a hammam scrub, and at least three glasses of freshly squeezed orange juice. This guide is for travelers who want to eat like someone who lives here, not someone passing through.",
    "body": "## Why Marrakech for a 48-hour food trip\n\nMarrakech operates on two food tracks: the medina, where everything from a dirham pastry to a €200 tasting menu exists within a ten-minute walk, and Gueliz, the French-built new city where Moroccan cooking meets European brasserie culture. The best 48-hour strategy is to eat almost entirely in the medina, with one Gueliz breakfast and one rooftop sunset drink outside the walls. Budget €40–80 per person per day depending on how many riads you eat in.\n\n| Place | Price | Best For | Vibe |\n|-------|-------|----------|------|\n| Hadj Mustapha | € | Morning harira | Local canteen, no frills |\n| Café des Épices | € | Rooftop lunch break | Souk views, slow pacing |\n| Nomad | €€ | Sunset dinner | Modern Moroccan, terrace |\n| Dar Yacout | €€€€ | Ceremonial feast | Palace, theatrical |\n| Jemaa el-Fna stalls | € | Late-night street food | Chaotic, unforgettable |\n\n## Detailed Reviews\n\n### 1. Hadj Mustapha\n\nStart day one here at 8am. The harira — Morocco's thick tomato, lentil and chickpea soup — arrives in a clay bowl with a wedge of lemon and a stack of msemen pancakes. The room is a canteen with plastic chairs and a TV showing Al Jazeera. You will be the only tourist.\n\nThe **harira and msemen** costs around €1.50 and is one of the best breakfasts in Africa.\n\n**Best for:** Anyone who wants to eat breakfast like a Marrakchi resident\n**Local tip:** Come before 9am — by 10am the msemen runs out.\n\n### 2. Café des Épices\n\nPosition yourself on the third-floor rooftop of Café des Épices for lunch after a morning in the souks. The view over Rahba Lakdima — the spice square — is exactly what Marrakech looks like in your imagination before you arrive. Order the tagine and a fresh juice and take your time.\n\nThe **chicken tagine with preserved lemon** is around €8 and is honest, well-spiced cooking.\n\n**Best for:** A medina lunch with views and no rush\n**Local tip:** The top floor fills up first — go straight upstairs when you arrive.\n\n### 3. Nomad\n\nFor evening dinner on day one, Nomad is the best-balanced option in the medina — the rooftop views, the contemporary Moroccan cooking and the pricing all work together. The lamb merguez with preserved lemon and the bastilla with almonds are the dishes to order.\n\nExpect around **€25–35 per person** including drinks.\n\n**Best for:** First dinner in Marrakech — good food, great views, accessible price\n**Local tip:** Reserve the rooftop table 24 hours ahead. Ground floor walk-ins are usually fine.\n\n### 4. Dar Yacout\n\nOn evening two, surrender to the theatrical dinner at Dar Yacout. It begins on the roof with an aperitif watching the Koutoubia minaret light up against the darkening sky, then descends through candlelit courtyards to a dining room lined with Moorish plasterwork. The feast — bastilla, three tagines, couscous, dessert — takes two hours.\n\n**€60–80 per person** for the full experience with wine.\n\n**Best for:** The definitive Marrakech palace dining experience\n**Local tip:** Book at least 3 days ahead. Request a table in the main courtyard room, not the annexe.\n\n### 5. Jemaa el-Fna at Night\n\nAfter dinner, walk to the square. By 9pm, 100 food stalls have replaced the daytime snake charmers — smoke rising from grills, vendors calling from every direction. Order merguez, kefta, snails, or just stand and watch. It's overwhelming and completely worth it.\n\nExpect to spend **€5–10** if you eat at the stalls.\n\n**Best for:** The full sensory overload of Marrakech at its most alive\n**Local tip:** Stall 14 and Stall 32 are consistently recommended by locals for their kefta. Avoid anyone who grabs your arm to pull you toward their stall.\n\n## Local Tips for 48-hour Marrakech food\n\n- Freshly squeezed orange juice from the Jemaa el-Fna vendors costs €0.60 and is genuinely extraordinary. Drink three.\n- Pâtisserie des Princes on Rue Bab Agnaou is the best pastry stop — chebakia and cornes de gazelle for almost nothing.\n- Avoid restaurants directly on Jemaa el-Fna itself. Walk one street back for the same dishes at half the price.\n- All the good medina restaurants require navigation through unmarked alleys. Download maps.me offline before you arrive.\n\n## FAQ\n\n### Q: Is it safe to eat street food at Jemaa el-Fna?\nA: Yes, with normal judgment. The high-turnover stalls with lots of locals eating are fine. Avoid anything that's been sitting out visibly. The orange juice and the freshly grilled kefta are universally safe.\n\n### Q: How much should I budget for food in Marrakech per day?\nA: €25–40 gets you excellent local food — harira breakfasts, souk lunches, a good dinner. €60–80 covers one riad restaurant dinner. €100+ is for palace experiences like Dar Yacout or La Mamounia brunch.\n\n### Q: Do Marrakech restaurants serve alcohol?\nA: Many riad restaurants and upscale places do; traditional local cafés and halal restaurants don't. Nomad, Le Salama and Café Arabe all serve wine and cocktails.\n\n## The Verdict\n\n**Best for couples:** Dar Yacout for the theatrical dinner, Le Jardin for a romantic garden lunch.\n**Best for budget:** Hadj Mustapha for breakfast, Café des Épices for lunch, Jemaa el-Fna stalls for dinner — full day under €20.\n**Best for first-timers:** Nomad hits every note — location, views, food quality and accessible price.\n**Best for locals (or feeling like one):** Hadj Mustapha at 8am, then the Rahba Lakdima spice market, then Café des Épices rooftop.",
    "places": [
      {
        "name": "Hadj Mustapha",
        "description": "The most famous harira and msemen spot in the medina — a no-frills local canteen where Marrakchi residents queue every morning. The thick soup and fresh pancakes cost almost nothing and taste better than anything in a tourist restaurant.",
        "address": "Rue Riad Zitoun el Kedim, Medina, Marrakech",
        "rating": 4.7,
        "image": "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=800&q=80",
        "citySlug": "marrakech",
        "placeSlug": "hadj-mustapha"
      },
      {
        "name": "Café des Épices",
        "description": "A three-floor café overlooking the Rahba Lakdima spice market. The rooftop terrace has the best lunch views in the medina — tagines and fresh juices served without the tourist markup.",
        "address": "75 Rahba Lakdima, Medina, Marrakech",
        "rating": 4.5,
        "image": "https://images.unsplash.com/photo-1568358877056-8ad1ab4ee4ec?w=800&q=80",
        "citySlug": "marrakech",
        "placeSlug": "cafe-des-epices"
      },
      {
        "name": "Nomad",
        "description": "A modern Moroccan restaurant with a rooftop terrace overlooking the medina. Dishes reinvent traditional recipes with contemporary technique — the bastilla with almonds and merguez with preserved lemon are both exceptional.",
        "address": "1 Derb Aarjane, Rahba Lakdima, Medina, Marrakech",
        "rating": 4.6,
        "image": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80",
        "citySlug": "marrakech",
        "placeSlug": "nomad"
      },
      {
        "name": "Dar Yacout",
        "description": "A legendary palace restaurant where dinner is a full theatrical production — rooftop aperitifs, candlelit salons, and a ceremonial procession of bastilla, tagines and couscous. The building is a 1930s riad of extraordinary beauty.",
        "address": "79 Sidi Ahmed Soussi, Medina, Marrakech",
        "rating": 4.7,
        "image": "https://images.unsplash.com/photo-1560053608-13721b16a167?w=800&q=80",
        "citySlug": "marrakech",
        "placeSlug": "dar-yacout"
      },
      {
        "name": "Jemaa el-Fna",
        "description": "The UNESCO-listed square transforms into a vast open-air restaurant every evening — hundreds of food stalls, smoke from a hundred grills, vendors calling from every direction. One of the great street food spectacles on earth.",
        "address": "Place Jemaa el-Fna, Medina, Marrakech",
        "rating": 4.8,
        "image": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
        "citySlug": "marrakech",
        "placeSlug": "jemaa-el-fna"
      }
    ]
  },
  {
    "title": "Where to Eat Near Jemaa el-Fna",
    "slug": "where-to-eat-jemaa-el-fna",
    "city": "Marrakech",
    "citySlug": "marrakech",
    "category": "Restaurants",
    "coverImage": "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=1200&q=80",
    "publishedAt": "2026-05-16",
    "readingTime": 7,
    "metaDescription": "Skip the tourist traps on Jemaa el-Fna — five restaurants within 10 minutes of the square where the food is actually good.",
    "intro": "Every guidebook tells you to eat on Jemaa el-Fna. Most of them are right about the atmosphere and wrong about the food. The stalls are worth one visit for the spectacle. For a proper meal, you want the streets just behind the square — within five minutes of the evening noise but insulated from the most aggressive touts. These five places are all within ten minutes of Jemaa el-Fna and all serve food worth sitting down for.",
    "body": "## Why eat near Jemaa el-Fna\n\nJemaa el-Fna sits at the southern edge of the medina souks — it's the geographic center of tourist Marrakech, which means the restaurants immediately surrounding it are mostly overpriced and mediocre. The good food is one to three streets back: small riad restaurants, local canteens and rooftops that have views without the tourist premium. Budget €10–40 depending on whether you're eating at a canteen or a riad.\n\n| Place | Price | Best For | Vibe |\n|-------|-------|----------|------|\n| Le Salama | €€€ | Rooftop views of the square | Elegant, cocktails available |\n| Pâtisserie des Princes | € | Post-dinner pastries | Counter service, very local |\n| Hadj Mustapha | € | Authentic harira breakfast | Canteen, early morning |\n| Terrasse des Épices | €€ | Lunch with medina views | Relaxed rooftop |\n| Riad Kniza Restaurant | €€€€ | Ceremonial Moroccan feast | Intimate palace dining |\n\n## Detailed Reviews\n\n### 1. Le Salama\n\nLe Salama is four floors of Moroccan opulence on Rue des Banques, 90 seconds from the square's northeast corner. The rooftop bar has an unobstructed view of Jemaa el-Fna and is the best seat in Marrakech for watching the evening transformation. The restaurant floors below serve refined Moroccan classics — the slow-cooked lamb shoulder and the chicken bastilla are both excellent.\n\n**Budget: €35–50 per person** for dinner with cocktails.\n\n**Best for:** Watching Jemaa el-Fna from above while eating a real meal\n**Local tip:** Arrive at the rooftop 45 minutes before sunset and order drinks. Move to a dinner table once it gets dark.\n\n### 2. Pâtisserie des Princes\n\nOn Rue Bab Agnaou, two minutes from the square, this is the most celebrated traditional patisserie in Marrakech. It's not a sit-down restaurant — you queue at the counter, point at the chebakia and cornes de gazelle, and pay almost nothing. The freshly squeezed orange juice here costs €0.70.\n\n**Pastries: €0.30–1.50 each.** Order six.\n\n**Best for:** Post-dinner pastries and juice before or after the evening square visit\n**Local tip:** Combine with a post-dinner walk around the dark medina streets — the neighbourhood changes completely at 10pm.\n\n### 3. Hadj Mustapha\n\nFive minutes southeast of the square. For breakfast, this is the most authentic experience you'll find near Jemaa el-Fna — harira soup, msemen pancakes and mint tea at a plastic table among residents going to work. Nothing for tourists, nothing pretending to be anything other than what it is.\n\n**Breakfast for two: under €5.**\n\n**Best for:** The real local breakfast experience near the square\n**Local tip:** Before 9am the msemen is still warm from the griddle. After 10am you may find it's gone.\n\n### 4. Terrasse des Épices\n\nA ten-minute walk north through the souks, Terrasse des Épices is above Souk Cherifia with rooftop views over the medina. The menu is simple — tagines, salads, fresh juices — and the pace is deliberately slow. An excellent lunch spot after a morning shopping for lanterns and leather goods.\n\n**Lunch: €12–18 per person.**\n\n**Best for:** A slow lunch break during souk exploration\n**Local tip:** The afternoon breeze on the top terrace makes it the coolest lunch spot in the medina in summer.\n\n### 5. Riad Kniza Restaurant\n\nThe most serious Moroccan food near Jemaa el-Fna, inside one of the city's finest riads near Bab Doukkala. The bastilla au pigeon is the dish that defines ceremonial Moroccan cooking — paper-thin pastry, spiced pigeon, almonds and icing sugar. A meal here is an occasion, not just dinner.\n\n**Dinner: €50–70 per person.**\n\n**Best for:** A proper ceremonial Moroccan meal for a special evening\n**Local tip:** Book three or four days ahead. Request the courtyard table — the fountain and carved plasterwork are part of the experience.\n\n## Local Tips for eating near Jemaa el-Fna\n\n- Walk away from anyone who approaches you on the square offering to show you a restaurant. The real good places don't need touts.\n- The orange juice vendors on Jemaa el-Fna are the exception to the tourist-trap rule — the juice is genuinely good and costs almost nothing.\n- For a cheap dinner, the medina streets running east off the square — Rue Riad Zitoun el Kedim — have local canteens with tagines for €4–6.\n- Eat dinner late by Moroccan standards — 8:30–9:30pm is when locals eat and when the square is at its most alive.\n\n## FAQ\n\n### Q: Is the food on Jemaa el-Fna safe to eat?\nA: The high-turnover stalls are fine — grilled meats, snails, fresh juice. Avoid anything that has been sitting out. The spectacle is worth experiencing once even if the food is not exceptional.\n\n### Q: What's the best restaurant with a view of Jemaa el-Fna?\nA: Le Salama on Rue des Banques has the best rooftop view of the square and the best food. It's worth the higher price for an evening when you want to watch the square from above.\n\n### Q: Are there halal restaurants near Jemaa el-Fna?\nA: The vast majority of restaurants in the medina are halal — Morocco is 99% Muslim and pork and alcohol are not the norm. Hadj Mustapha, Terrasse des Épices and the square stalls are all halal.\n\n## The Verdict\n\n**Best for couples:** Le Salama rooftop at sunset — order cocktails and watch the square transform.\n**Best for budget:** Jemaa el-Fna stalls for the spectacle, then Hadj Mustapha next morning for the best €1.50 breakfast in Africa.\n**Best for first-timers:** Le Salama for the view first, then walk down to the square after dinner.\n**Best for locals (or feeling like one):** Hadj Mustapha at 8am, Pâtisserie des Princes at night.",
    "places": [
      {
        "name": "Le Salama",
        "description": "Four floors of Moroccan elegance on Rue des Banques with a rooftop terrace overlooking Jemaa el-Fna. The view at sunset is exceptional; the slow-cooked lamb and bastilla are both worth ordering.",
        "address": "40 Rue des Banques, Medina, Marrakech",
        "rating": 4.6,
        "image": "https://images.unsplash.com/photo-1597212618440-806262de4f0b?w=800&q=80",
        "citySlug": "marrakech",
        "placeSlug": "le-salama"
      },
      {
        "name": "Pâtisserie des Princes",
        "description": "The most celebrated traditional patisserie in Marrakech — counter service only, queue at the glass case and point. Chebakia, cornes de gazelle and €0.70 fresh orange juice. Mandatory.",
        "address": "32 Rue Bab Agnaou, Medina, Marrakech",
        "rating": 4.6,
        "image": "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
        "citySlug": "marrakech",
        "placeSlug": "patisserie-des-princes"
      },
      {
        "name": "Hadj Mustapha",
        "description": "The authentic local breakfast spot near Jemaa el-Fna — harira soup and msemen at a plastic table among residents going to work. The most genuine food experience you will find near the square.",
        "address": "Rue Riad Zitoun el Kedim, Medina, Marrakech",
        "rating": 4.7,
        "image": "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800&q=80",
        "citySlug": "marrakech",
        "placeSlug": "hadj-mustapha"
      },
      {
        "name": "Terrasse des Épices",
        "description": "A relaxed rooftop restaurant above Souk Cherifia serving simple Moroccan plates and fresh juices. The afternoon breeze and souk views make it the best slow lunch spot in the medina.",
        "address": "15 Souk Cherifia, Sidi Abdelaziz, Medina, Marrakech",
        "rating": 4.5,
        "image": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80",
        "citySlug": "marrakech",
        "placeSlug": "terrasse-des-epices"
      },
      {
        "name": "Riad Kniza Restaurant",
        "description": "The most serious Moroccan cuisine near Jemaa el-Fna — ceremonial cooking inside one of the city's finest riads. The bastilla au pigeon is the benchmark dish for traditional Marrakchi hospitality.",
        "address": "34 Derb l'Hotel, Bab Doukkala, Medina, Marrakech",
        "rating": 4.9,
        "image": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80",
        "citySlug": "marrakech",
        "placeSlug": "riad-kniza-restaurant"
      }
    ]
  },
  {
    "title": "Best Sunset Terraces in Marrakech",
    "slug": "best-sunset-terraces-marrakech",
    "city": "Marrakech",
    "citySlug": "marrakech",
    "category": "Bars",
    "coverImage": "https://images.unsplash.com/photo-1568358877056-8ad1ab4ee4ec?w=1200&q=80",
    "publishedAt": "2026-05-17",
    "readingTime": 7,
    "metaDescription": "Five sunset terraces in Marrakech ranked honestly — from the Koutoubia view at Kabana to the panoramic sweep at Es Saadi. With timings and honest prices.",
    "intro": "Marrakech at sunset is one of the great travel experiences — the Koutoubia minaret silhouetted against an orange sky, the Atlas Mountains turning purple behind the palm groves, the calls to prayer layering across the medina from a dozen mosques. To see all of this you need to be on a rooftop. Not all rooftops are equal. These five are the best — with different views, different price points and different vibes.",
    "body": "## Why Marrakech for sunset terraces\n\nMarrakech's geography — the walled medina surrounded by a flat palm grove with the Atlas Mountains 60km south — creates one of the most dramatic urban sunset panoramas in the world. The Koutoubia minaret is the focal point: every good rooftop in the medina has a line on it. The best arrive by 6pm in summer, 5pm in winter. Drinks typically run €8–15 a cocktail at the higher-end spots.\n\n| Place | Price | Best For | Vibe |\n|-------|-------|----------|------|\n| Sky Bar at Es Saadi | €€€ | Panoramic 360° views | Smart, DJ evenings |\n| Le Salama Rooftop | €€€ | Jemaa el-Fna at dusk | Elegant, cocktail-forward |\n| Kabana Rooftop | €€ | Koutoubia close-up | Casual, accessible |\n| Kosybar | €€ | Badi Palace and storks | Jazz nights, character |\n| Rooftop at Nomad | €€ | Medina roofscape | Relaxed, halal-friendly |\n\n## Detailed Reviews\n\n### 1. Sky Bar at Es Saadi\n\nThe highest rooftop bar in Marrakech, on top of the Es Saadi hotel in Hivernage. The 360° panorama takes in the Atlas Mountains to the south, the Koutoubia to the east and the Menara Gardens to the west — a sweep you cannot see from any single medina rooftop. The crowd dresses up and the cocktails are well-made if expensive.\n\n**Cocktails: €14–18.** Dress code enforced after 9pm.\n\n**Best for:** The widest panoramic view in Marrakech\n**Local tip:** Arrive 45 minutes before sunset and take a corner table. The mountain views disappear once the sky darkens.\n\n### 2. Le Salama Rooftop\n\nThe rooftop terrace at Le Salama on Rue des Banques is three floors above street level with a clear sightline over the rooftops to Jemaa el-Fna below and the Koutoubia beyond. Watching the square come alive from above — the food stalls assembling, the smoke rising — while drinking a Moroccan gin cocktail is one of the best moments Marrakech offers.\n\n**Cocktails: €10–14.** Dinner menu available if you stay.\n\n**Best for:** Watching Jemaa el-Fna transform at dusk from above\n**Local tip:** The southeast corner of the terrace has the best angle on the square. It fills fast — arrive early.\n\n### 3. Kabana Rooftop\n\nOn Rue de la Kasbah in the southern medina, Kabana is the most accessible rooftop for a Koutoubia view — the minaret is close enough to photograph without a telephoto lens and the crowd is relaxed. Less fashionable than Sky Bar but less expensive and less effort to reach from the medina.\n\n**Cocktails: €8–12.** Food menu runs until late.\n\n**Best for:** A relaxed Koutoubia sunset without formality or high prices\n**Local tip:** The terrace fills quickly after 5:30pm — walk-ins are fine before 5pm, after that it gets competitive for tables.\n\n### 4. Kosybar\n\nOn Place des Ferblantiers in the southern medina, Kosybar has a rooftop terrace overlooking the ruins of El Badi Palace — with real live storks nesting on the ancient walls. The storks make it unique. Jazz evenings run most Thursdays and the cocktails are good. A more characterful choice than the view-focused bars.\n\n**Cocktails: €9–13.** Jazz evenings from 8pm most Thursdays.\n\n**Best for:** Character and uniqueness — the stork-nested palace walls are unlike anything else\n**Local tip:** The Thursday jazz evenings draw a local crowd and are worth planning around. Arrive before 7pm for a table.\n\n### 5. Rooftop at Nomad\n\nThe most accessible rooftop in the central medina — halal-friendly (excellent mocktails), genuine medina roofscape views, and a kitchen that stays open so you can turn sunset drinks into dinner. The Atlas Mountains are visible on clear days. Less dramatic than Es Saadi but far more convenient for medina-based travelers.\n\n**Mocktails/soft drinks: €4–7. Dinner: €25–35.**\n\n**Best for:** A halal-friendly sunset spot with good food available\n**Local tip:** The northwest corner of the rooftop catches the last light. If you want the Atlas Mountain view, ask for a south-facing table.\n\n## Local Tips for Marrakech sunset terraces\n\n- Sunset in Marrakech falls between 6:30pm (winter) and 8:30pm (summer). Adjust your arrival time accordingly — Google the exact sunset time for your visit date.\n- Most terraces have a one-drink minimum or will push you off the table if you don't order. Budget for at least two drinks per person.\n- The Koutoubia minaret lights up at dusk — the illuminated minaret against the dark sky is the classic Marrakech evening image.\n- Rooftop terrace covers can appear suddenly in hot weather — request an open-air table explicitly when you arrive.\n\n## FAQ\n\n### Q: Which Marrakech rooftop has the best view of the Koutoubia?\nA: Kabana Rooftop is closest and most direct. Le Salama has a slightly more distant view but the combination with Jemaa el-Fna below is more dramatic.\n\n### Q: Do Marrakech rooftop bars require reservations?\nA: Sky Bar at Es Saadi is worth booking, especially Friday and Saturday evenings. The others are generally walk-in before 6pm — after that, arrival time determines whether you get a view table.\n\n### Q: Are there alcohol-free rooftop options in Marrakech?\nA: Nomad's rooftop is fully halal-friendly with excellent fresh juice and mocktail options. Terrasse des Épices also serves non-alcoholic drinks only.\n\n## The Verdict\n\n**Best for couples:** Le Salama rooftop at sunset with cocktails and the Jemaa el-Fna transformation below.\n**Best for budget:** Nomad rooftop — great views, honest prices, food available.\n**Best for first-timers:** Kabana Rooftop — Koutoubia view, central location, no formality.\n**Best for locals (or feeling like one):** Kosybar on a Thursday jazz evening — the stork palace setting and the local crowd are genuinely special.",
    "places": [
      {
        "name": "Sky Bar at Es Saadi",
        "description": "The highest rooftop in Marrakech with a 360° panorama spanning the Atlas Mountains, the Koutoubia minaret and the Menara Gardens. Smart crowd, well-made cocktails, dress code enforced.",
        "address": "Rue Ibrahim El Mazini, Hivernage, Marrakech",
        "rating": 4.6,
        "image": "https://images.unsplash.com/photo-1597212618440-806262de4f0b?w=800&q=80",
        "citySlug": "marrakech",
        "placeSlug": "sky-bar-es-saadi"
      },
      {
        "name": "Le Salama",
        "description": "A rooftop terrace on Rue des Banques with a sightline directly over Jemaa el-Fna — the view of the square assembling for the evening, from above, is one of the great Marrakech experiences.",
        "address": "40 Rue des Banques, Medina, Marrakech",
        "rating": 4.6,
        "image": "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800&q=80",
        "citySlug": "marrakech",
        "placeSlug": "le-salama"
      },
      {
        "name": "Kabana Rooftop",
        "description": "The most accessible Koutoubia-view rooftop in the southern medina — casual, reasonably priced, and close enough to the minaret to photograph it properly. Good cocktails and a food menu.",
        "address": "65 Rue de la Kasbah, Medina, Marrakech",
        "rating": 4.5,
        "image": "https://images.unsplash.com/photo-1482632322416-818e7e3e58ce?w=800&q=80",
        "citySlug": "marrakech",
        "placeSlug": "kabana-rooftop"
      },
      {
        "name": "Kosybar",
        "description": "A rooftop café-bar on Place des Ferblantiers overlooking El Badi Palace ruins and the stork nests on the ancient walls. Thursday jazz evenings draw a local crowd. Cocktails are good.",
        "address": "47 Place des Ferblantiers, Medina, Marrakech",
        "rating": 4.5,
        "image": "https://images.unsplash.com/photo-1516997121675-4c2d1684aa3e?w=800&q=80",
        "citySlug": "marrakech",
        "placeSlug": "kosybar"
      },
      {
        "name": "Rooftop at Nomad",
        "description": "The best halal-friendly rooftop in the central medina — mocktails, medina roofscape views and a full dinner menu. Accessible, relaxed and one of the most honest value terraces in Marrakech.",
        "address": "1 Derb Aarjane, Rahba Lakdima, Medina, Marrakech",
        "rating": 4.7,
        "image": "https://images.unsplash.com/photo-1543007631-283050bb3e8c?w=800&q=80",
        "citySlug": "marrakech",
        "placeSlug": "rooftop-nomad"
      }
    ]
  },
  {
    "title": "Best African Restaurants in Paris",
    "slug": "african-restaurants-paris",
    "city": "Paris",
    "citySlug": "paris",
    "category": "Restaurants",
    "coverImage": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200&q=80",
    "publishedAt": "2026-05-19",
    "readingTime": 8,
    "metaDescription": "Where to eat the best African food in Paris: Senegalese thieboudienne, Ethiopian injera, North African tagines and where Parisians actually book.",
    "intro": "Paris eats West African food the way it eats couscous: weekly, without fanfare, often after midnight. The best plates aren't in the 1st arrondissement — they're up in Château Rouge, out in Belleville, or tucked behind a bus stop in the 11th. This guide is for travelers who'd rather queue for a steaming bowl of mafé than book another bistro. Five places, all real, all worth the métro ride.",
    "body": "## Why Paris for African Restaurants\n\nParis has been cooking African food for over sixty years, and the map shows it: Senegalese kitchens in the 18th, Ethiopian dining rooms around République, Ivorian maquis in the 20th. Expect to spend €15–€35 per person, more if you order grilled fish. Go any season, but Sunday lunch is when the rooms fill with regulars and the kitchens hit their stride.\n\n| Place | Price | Best For | Vibe |\n|-------|-------|----------|------|\n| Le Petit Dakar | €€ | Senegalese classics | Warm, neighborhood |\n| Godjo | €€ | Ethiopian shared plates | Candlelit, date-night |\n| Waly Fay | €€€ | West African dinner out | Stylish, lively |\n| BMK Paris-Bamako | € | Quick Malian lunch | Canteen, casual |\n| Le 404 | €€€ | North African evening | Dim, packed, loud |\n\n## Detailed Reviews\n\n### 1. Le Petit Dakar\n\nThe Marais doesn't shout about this Senegalese dining room next to the Galerie 38 Saint-Paul, but it should. The room is small, the walls are red, and the **thieboudienne** (rice and fish in tomato broth) arrives in a heavy iron pot you'll want to scrape clean. Service can drag when the room is full — order a bissap while you wait and don't fight it.\n\n**Best for:** travelers who want a proper Senegalese meal without leaving central Paris\n**Local tip:** Friday lunch is when they serve the thieb at its best — the rice has had all morning to soak up the broth.\n\n### 2. Godjo\n\nGodjo has been doing Ethiopian food near rue Mouffetard since long before injera became a Pinterest object. You eat with your hands off a shared metal platter; the **vegetarian combo** for two is the easiest entry point and lets you taste five stews at once. The space is tight and the tables wobble, but the honey wine and the candlelight do most of the work.\n\n**Best for:** a low-key date or a vegetarian dinner that doesn't feel like a compromise\n**Local tip:** Book ahead for Saturday — there are maybe twelve tables and the regulars know it.\n\n### 3. Waly Fay\n\nA proper sit-down West African restaurant in the 11th, with low lighting, jazz on the speakers, and a crowd that mixes locals from the quartier with diaspora regulars. Order the **mafé** (peanut stew with beef) or the grilled dorade with attiéké — both have been on the menu for years and neither has slipped. It's the priciest place on this list and you can feel it on the bill, but the room earns it.\n\n**Best for:** a night out when you want African food served with wine and proper plates\n**Local tip:** Ask for a table at the back near the bar — the front tables get drafty when the door opens.\n\n### 4. BMK Paris-Bamako\n\nBMK started as a takeaway window in the 10th and grew into a small canteen near Gare du Nord. Plastic trays, Malian playlists, and a chalkboard menu that changes — but the **poulet yassa** and the **mafé** are always there, both around €12. It's loud at lunch, the seating is communal, and you'll be in and out in forty minutes.\n\n**Best for:** a fast, cheap, honest plate before a Eurostar or a long walk through the 10th\n**Local tip:** Skip the dessert and walk five minutes to rue du Faubourg-Saint-Denis for coffee instead.\n\n### 5. Le 404\n\nMourad Mazouz's North African restaurant has been packing the rue des Gravilliers since the late nineties, and it still feels like walking into someone's slightly theatrical Marrakech living room. The **lamb tagine with prunes and almonds** is the order; the couscous royale is fine but oversized. Reservations are essential, the music gets loud after 9pm, and the bill can climb fast if you let the waiter steer the wine.\n\n**Best for:** a group dinner with atmosphere, or a first night in Paris when you want something memorable\n**Local tip:** Sit upstairs if you can — the downstairs room is louder and the kitchen pass runs hot.\n\n## Local Tips for African Restaurants in Paris\n\n- Château Rouge (Métro line 4) is the densest African neighborhood in the city — come on a Saturday morning for the market, then eat lunch nearby.\n- Most Senegalese kitchens take time. If you're in a hurry, go to BMK; if you want to linger, go to Le Petit Dakar or Waly Fay.\n- Bissap (hibiscus) and ginger juice are usually homemade and much better than the wine list at the cheaper spots.\n- Combine a meal at Godjo with a walk down rue Mouffetard, and a meal at Waly Fay with a drink afterwards on rue Oberkampf.\n\n## FAQ\n\n### Q: Where is the best Senegalese food in Paris?\nA: Le Petit Dakar in the Marais and Waly Fay in the 11th are the two reference points, with Waly Fay being more polished and Le Petit Dakar more homestyle. For a cheaper Malian-Senegalese crossover, BMK near Gare du Nord does a solid yassa for under €15.\n\n### Q: Do I need to book ahead for these restaurants?\nA: Yes for Le 404, Godjo and Waly Fay, especially Thursday through Saturday — they're small or popular or both. Le Petit Dakar and BMK take walk-ins, though BMK at lunch can mean a ten-minute wait for a tray.\n\n### Q: What's the best African restaurant in Paris for a first-timer?\nA: Godjo, because Ethiopian shared platters are forgiving and fun to eat with hands, and the room is welcoming without being touristy. If you want something more familiar, the tagines at Le 404 are a safer entry point.\n\n## The Verdict\n\nBest for couples: **Godjo** — candlelight, shared plates, honey wine. Best for budget: **BMK Paris-Bamako** — a full Malian plate for €12 and out the door fast. Best for first-timers: **Le 404** — atmosphere does half the work and the tagines deliver. Best for locals: **Waly Fay**, where the regulars at the bar will outlast you.",
    "places": [
      {
        "name": "Le Petit Dakar",
        "description": "A small red-walled Senegalese dining room tucked next to a gallery in the Marais. The thieboudienne arrives in a heavy iron pot and the bissap is made in-house. Service can lag when the room fills up, but the food is the real thing.",
        "address": "6 Rue Elzévir, 75003 Paris",
        "rating": 4.5,
        "image": "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&q=80",
        "citySlug": "paris",
        "placeSlug": undefined
      },
      {
        "name": "Godjo",
        "description": "A candlelit Ethiopian restaurant near rue Mouffetard where you eat with your hands off shared metal platters. The vegetarian combo for two is the easiest way in and shows off five stews at once. Tables are tight and a little wobbly, which somehow adds to it.",
        "address": "8 Rue de l'Arbalète, 75005 Paris",
        "rating": 4.6,
        "image": "https://images.unsplash.com/photo-1567337710282-00832b415979?w=800&q=80",
        "citySlug": "paris",
        "placeSlug": undefined
      },
      {
        "name": "Waly Fay",
        "description": "A stylish West African restaurant in the 11th with low light, jazz on the speakers and a loyal local crowd. The mafé and grilled dorade with attiéké have been on the menu for years and still deliver. It's the priciest spot here and you'll notice on the bill.",
        "address": "6 Rue Godefroy Cavaignac, 75011 Paris",
        "rating": 4.4,
        "image": "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80",
        "citySlug": "paris",
        "placeSlug": undefined
      },
      {
        "name": "BMK Paris-Bamako",
        "description": "A Malian canteen near Gare du Nord serving plastic-tray lunches under €15. The poulet yassa and mafé are always on, and the room runs on a fast, loud rhythm. Communal seating, no frills, and you're in and out in forty minutes.",
        "address": "14 Rue de la Fidélité, 75010 Paris",
        "rating": 4.3,
        "image": "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&q=80",
        "citySlug": "paris",
        "placeSlug": undefined
      },
      {
        "name": "Le 404",
        "description": "Mourad Mazouz's long-running North African restaurant in a 16th-century building on rue des Gravilliers. Lamb tagine with prunes is the dish to order; the room hums and the music climbs after 9pm. Reservations are essential and the wine list can run up the bill quickly.",
        "address": "69 Rue des Gravilliers, 75003 Paris",
        "rating": 4.4,
        "image": "https://images.unsplash.com/photo-1535850452425-140ee4a8dbae?w=800&q=80",
        "citySlug": "paris",
        "placeSlug": undefined
      }
    ]
  },
  {
    "title": "Top Cheese Shops in Paris",
    "slug": "cheese-shops-paris",
    "city": "Paris",
    "citySlug": "paris",
    "category": "Markets",
    "coverImage": "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=1200&q=80",
    "publishedAt": "2026-05-20",
    "readingTime": 8,
    "metaDescription": "The best fromageries in Paris, from Marie-Anne Cantin's aged Comté to Laurent Dubois' showstoppers. Real addresses, honest takes, what to actually buy.",
    "intro": "Walk past any decent Parisian fromagerie around 11am on a Saturday and you'll smell it before you see it — that warm, barnyard funk drifting onto the sidewalk. Paris doesn't invent cheese, but it curates it better than anywhere else: cheesemongers here age their own wheels in basement caves and argue about humidity like sommeliers argue about vintages. This guide is for travelers who want to bring home a chunk of real Brie de Meaux instead of the rubber stuff at Charles de Gaulle. Five shops, all reachable on foot from central neighborhoods, all run by people who actually know their suppliers.",
    "body": "## Why Paris for cheese shops paris\n\nParis has roughly 250 fromageries inside the périphérique, and the best ones double as affineurs — meaning they buy young cheese from farms and finish the aging in their own cellars. Expect to spend €25-50 for a generous selection of four or five cheeses. Spring and autumn are peak seasons because that's when raw-milk cheeses hit their stride.\n\n| Place | Price | Best For | Vibe |\n|-------|-------|----------|------|\n| Marie-Anne Cantin | €€€ | Classic French wheels | Old-school, formal |\n| Laurent Dubois | €€€€ | Showpiece cheeses | Refined, artistic |\n| Androuet | €€ | One-stop selection | Welcoming, central |\n| Fromagerie Beaufils | €€ | Neighborhood feel | Casual, friendly |\n| La Fromagerie Goncourt | €€€ | Natural wine pairing | Modern, hip |\n\n## Detailed Reviews\n\n### 1. Marie-Anne Cantin\n\nMarie-Anne took over from her father Christian in the 80s and still personally selects every wheel that comes through the door. The shop near the Eiffel Tower is small, slightly austere, and the staff don't suffer fools — but ask one genuine question about Saint-Nectaire and you'll get a 10-minute lecture. Her **Comté aged 30 months** is the benchmark by which I judge every other Comté. Prices are not cheap, but you're paying for cheeses that were turned by hand in her caves on rue de Lourmel.\n\n**Best for:** Travelers serious about traditional raw-milk cheese\n**Local tip:** Go on Tuesday or Friday morning when fresh deliveries arrive. Skip Saturday afternoons — it's a scrum.\n\n### 2. Laurent Dubois\n\nDubois is a Meilleur Ouvrier de France, which is roughly the cheese equivalent of a Michelin star, and his Maubert-Mutualité shop looks the part — glass cases, theatrical lighting, cheeses arranged like jewelry. He's known for stuffed and layered creations: think **Mont d'Or with truffles** or a Roquefort layered with fig paste. Some find this gimmicky; I find it delicious about 70% of the time. The classics are also faultless, especially the Brie de Meaux Dongé.\n\n**Best for:** Foodies who want a showpiece for a dinner party\n**Local tip:** The stuffed Fourme d'Ambert with Sauternes-soaked raisins travels well if you're flying out the same day.\n\n### 3. Androuet\n\nAndrouet has been around since 1909 and now operates several locations across the city — the one on rue Mouffetard is the most enjoyable to visit because the street itself is worth the trip. They're less obsessive than Cantin but more approachable, and their selection covers everything from goat cheeses to Swiss alpine wheels. The **Époisses** here is consistently at peak ripeness, which is harder to find than you'd think.\n\n**Best for:** First-timers who want range without intimidation\n**Local tip:** They'll vacuum-pack for travel — ask at the counter, no extra charge.\n\n### 4. Fromagerie Beaufils\n\nTucked into the 20th arrondissement, Beaufils feels like the neighborhood shop everyone wishes they had. The owners are chatty, the prices are 15-20% lower than the Left Bank fromageries, and the quality holds up. Their **Saint-Marcellin** is creamy enough to eat with a spoon and comes from a tiny producer in the Rhône-Alpes.\n\n**Best for:** Budget-conscious travelers staying in eastern Paris\n**Local tip:** Combine with a walk through Père Lachaise — the shop is a 12-minute stroll from the main gate.\n\n### 5. La Fromagerie Goncourt\n\nClément Brossault opened this place in the 11th in 2014 and immediately attracted the natural wine crowd. The space is minimalist, almost Scandinavian, and the selection leans toward small producers you won't see anywhere else. Try the **Tomme de Brebis** from the Pyrenees — it has a nutty, almost caramel finish that pairs absurdly well with a glass of Beaujolais.\n\n**Best for:** Travelers who also want a wine recommendation\n**Local tip:** Closed Mondays. The shop fills up fast on Saturday around noon when locals stock up for Sunday lunch.\n\n## Local Tips for cheese shops paris\n\n- Ask for cheese **à déguster ce soir** (to eat tonight) and the fromager will pick wheels at perfect ripeness rather than ones that need to sit\n- Bring a cooler bag if you're shop-hopping in summer — Paris cheese shops rarely give you ice\n- Don't buy more than 4-5 cheeses at once; the flavors blur on the palate and you'll waste the subtler ones\n- Rue Mouffetard, rue Cler, and rue des Martyrs are three market streets where you can hit a fromagerie, a wine shop, and a bakery within 200 meters\n\n## FAQ\n\n### Q: Can I bring cheese back to the US from Paris?\nA: Hard and semi-hard cheeses aged over 60 days are generally allowed in checked or carry-on luggage. Soft raw-milk cheeses like Camembert or Époisses are technically prohibited by the FDA — most travelers risk it with vacuum-packed pieces, but officially it's not permitted.\n\n### Q: How much should I budget for a good cheese tasting at home?\nA: For two people, €30-40 buys a serious spread — about 600g total across four cheeses. Add a baguette (€1.50) and a bottle of wine from a nearby caviste (€12-18) and you've got dinner.\n\n### Q: Which cheese shop is best if I only have time for one?\nA: If you want the most quintessentially Parisian experience, go to Marie-Anne Cantin. If you want variety and ease, Androuet on rue Mouffetard. If you're staying in the Marais or eastern Paris, La Fromagerie Goncourt is closer and equally excellent.\n\n## The Verdict\n\n**Best for couples:** La Fromagerie Goncourt — pair the cheese with a natural wine from next door and you've planned the evening. **Best for budget:** Fromagerie Beaufils delivers serious quality without the Left Bank markup. **Best for first-timers:** Androuet on rue Mouffetard is welcoming, central, and the staff speak English without making you feel like a tourist. **Best for locals (and the seriously obsessed):** Marie-Anne Cantin, full stop — nobody in Paris ages Comté better.",
    "places": [
      {
        "name": "Marie-Anne Cantin",
        "description": "A small, formal shop near the Eiffel Tower run by one of the most respected affineurs in France. Marie-Anne ages her own cheeses in cellars beneath the shop, and her 30-month Comté is a benchmark. The atmosphere can feel slightly intimidating for first-timers, but the quality justifies the prices.",
        "address": "12 Rue du Champ de Mars, 75007 Paris, France",
        "rating": 4.8,
        "image": "https://images.unsplash.com/photo-1452195100486-9cc805987862?w=800&q=80",
        "citySlug": "paris",
        "placeSlug": undefined
      },
      {
        "name": "Laurent Dubois",
        "description": "A Meilleur Ouvrier de France-certified fromager whose Maubert shop looks like a cheese jewelry display. Specializes in elaborate stuffed and layered cheeses like Mont d'Or with truffles. Some creations veer into gimmick territory, but the classic selection is faultless.",
        "address": "47 Ter Boulevard Saint-Germain, 75005 Paris, France",
        "rating": 4.7,
        "image": "https://images.unsplash.com/photo-1559561853-08451507cbe7?w=800&q=80",
        "citySlug": "paris",
        "placeSlug": undefined
      },
      {
        "name": "Androuet",
        "description": "An institution dating to 1909 with several Paris locations, the rue Mouffetard branch is the most enjoyable to visit. Strong on classics with consistently well-aged Époisses and Brie. Less obsessive than Cantin and more welcoming for travelers still finding their cheese vocabulary.",
        "address": "134 Rue Mouffetard, 75005 Paris, France",
        "rating": 4.6,
        "image": "https://images.unsplash.com/photo-1486297678162-eb2a19b0a4ac?w=800&q=80",
        "citySlug": "paris",
        "placeSlug": undefined
      },
      {
        "name": "Fromagerie Beaufils",
        "description": "A chatty, unpretentious neighborhood shop in the 20th arrondissement with prices noticeably lower than the Left Bank competition. Their Saint-Marcellin from a small Rhône-Alpes producer is exceptionally creamy. The location is a hike from central tourist zones but worth combining with Père Lachaise.",
        "address": "118 Rue de Belleville, 75020 Paris, France",
        "rating": 4.7,
        "image": "https://images.unsplash.com/photo-1505575967455-40e256f73376?w=800&q=80",
        "citySlug": "paris",
        "placeSlug": undefined
      },
      {
        "name": "La Fromagerie Goncourt",
        "description": "A minimalist, modern fromagerie in the 11th arrondissement that draws the natural wine crowd. The selection leans toward small producers you won't find at bigger shops, including a remarkable Pyrenees Tomme de Brebis. Closed Mondays and packed on Saturday lunchtimes when locals stock up.",
        "address": "1 Rue Abel Rabaud, 75011 Paris, France",
        "rating": 4.8,
        "image": "https://images.unsplash.com/photo-1543363136-3fdb62e11be9?w=800&q=80",
        "citySlug": "paris",
        "placeSlug": undefined
      }
    ]
  },
  {
    "title": "Best Crêperies in Paris",
    "slug": "creperies-paris",
    "city": "Paris",
    "citySlug": "paris",
    "category": "Street Food",
    "coverImage": "https://images.unsplash.com/photo-1519676867240-f03562e64548?w=1200&q=80",
    "publishedAt": "2026-05-21",
    "readingTime": 8,
    "metaDescription": "Where to eat the best crêpes and galettes in Paris — five real spots tested by a local, from Montparnasse classics to Breton hideouts.",
    "intro": "Walk out of Gare Montparnasse and the smell hits you before you see anything — buckwheat batter on hot cast iron, butter going brown, a whisper of cider. Paris has been Brittany's southern outpost since the 1960s, when Breton families moved here for work and brought their crêperies with them. This guide is for travelers who want the real thing — proper galettes with crispy edges, not the soggy Nutella discs sold near the Eiffel Tower. Five places, all tested, all worth the métro ride.",
    "body": "## Why Paris for crêperies\n\nMost of the city's best crêperies cluster around Montparnasse, where Breton immigrants settled near the train line from Quimper. Expect to pay €10-16 for a savory galette and €7-12 for a sweet crêpe, with a bowl of cider adding €4-6. Lunch service (12-2pm) is calmer than dinner, and the cider tastes better in autumn when the new pressing arrives.\n\n| Place | Price | Best For | Vibe |\n|-------|-------|----------|------|\n| Breizh Café | €€€ | Modern galettes | Polished, busy |\n| Crêperie Josselin | €€ | Classic Breton | Wood-panelled, loud |\n| Little Breizh | €€ | Quality ingredients | Tiny, warm |\n| Au P'tit Grec | € | Street crêpes | Stand-and-eat |\n| West Country Girl | €€ | Date night | Cozy, dim |\n\n## Detailed Reviews\n\n### 1. Breizh Café\n\nBertrand Larcher trained in Tokyo before opening this in the Marais, and it shows — the galettes are precise, the buckwheat is organic, and the menu credits the farmers. Order the **Complète** with smoked herring and you'll understand why people queue. The downside: it's expensive for what is, structurally, a pancake, and the Marais branch gets packed by 12:30 with no walk-ins after that.\n\n**Best for:** First-timers who want to taste what a galette can actually be\n**Local tip:** Book the Odéon location instead of the Marais one — same kitchen, half the wait.\n\n### 2. Crêperie Josselin\n\nRue du Montparnasse is wall-to-wall crêperies and most are tourist traps, but Josselin is the one Bretons themselves point to. The dining room is dark wood, the servers are brisk to the point of brusque, and the galettes arrive enormous and properly lacy at the edges. Get the **galette complète** (ham, egg, cheese) with a bowl — yes, a ceramic bowl — of dry cider from Fouesnant.\n\n**Best for:** The full old-school Breton experience\n**Local tip:** They don't take reservations and close Mondays. Show up at 12:15 sharp or after 2pm.\n\n### 3. Little Breizh\n\nTucked on a quiet street near Saint-Germain, this one is run by a young couple who source flour from a specific mill in Finistère. The space holds maybe 25 people and feels like a friend's kitchen. Try the **Saint-Yves** — andouille sausage, mustard, and emmental — which sounds wrong and tastes right.\n\n**Best for:** Travelers who care about provenance and don't mind sitting elbow-to-elbow\n**Local tip:** Closed Sunday and Monday. Lunch slots vanish first; call rather than email.\n\n### 4. Au P'tit Grec\n\nNot technically a crêperie and not technically Breton — it's a Greek-run takeaway window on Rue Mouffetard that makes the city's best street crêpes. The crêpes are huge, folded into a cone, and stuffed with whatever you want. Get the **goat cheese, honey and walnut** for €7 and eat it walking down the market street.\n\n**Best for:** Budget travelers and late-night cravings\n**Local tip:** The queue at 1pm Saturday is brutal. Go Tuesday evening when Mouffetard is quieter.\n\n### 5. West Country Girl\n\nA small spot near Oberkampf with checkered tablecloths, candlelight, and a chef from Quimper who takes the cider list seriously — there are eight by the glass. The galettes lean traditional but the sweet crêpes get creative; the **salted butter caramel** with a scoop of Bordier ice cream is the one to order. It feels like a date restaurant without trying to be one.\n\n**Best for:** Couples, or anyone who wants a proper sit-down dinner\n**Local tip:** Sunday brunch is underrated and easier to book than dinner.\n\n## Local Tips for crêperies in Paris\n\n- Galette means buckwheat and savory; crêpe means wheat and sweet. Order one of each — that's how Bretons actually eat.\n- Cider is served in ceramic bowls, not glasses, and you drink it through the meal, not before. Dry (brut) pairs better than sweet (doux).\n- Avoid any crêperie within 300 meters of the Eiffel Tower or Sacré-Cœur. The batter is pre-made and the prices are double.\n- Combine a Montparnasse crêpe lunch with a walk through Cimetière du Montparnasse and a coffee at La Rotonde afterwards.\n\n## FAQ\n\n### Q: What's the difference between a crêpe and a galette in Paris?\nA: A galette is made with buckwheat flour, is always savory, and comes from Brittany's tradition of using buckwheat because wheat didn't grow well there. A crêpe uses wheat flour and is sweet. A real Breton meal is one galette followed by one crêpe.\n\n### Q: Do I need to book a crêperie in Paris?\nA: For Breizh Café, Little Breizh and West Country Girl — yes, especially Friday and Saturday nights. Josselin doesn't take bookings, and Au P'tit Grec is a takeaway window. Lunch is generally easier than dinner across the board.\n\n### Q: Where's the best crêperie for families with kids?\nA: Crêperie Josselin handles families well — the room is loud enough that nobody minds, portions are huge and easy to split, and kids love the cider bowls (filled with water or juice for them). Au P'tit Grec is also great for picky eaters who just want Nutella.\n\n## The Verdict\n\n**Best for couples:** West Country Girl — candlelight, good cider, and dessert that justifies a second bottle.\n**Best for budget:** Au P'tit Grec — a proper meal for under €10, eaten on the move.\n**Best for first-timers:** Breizh Café — the cleanest introduction to what a modern galette tastes like.\n**Best for locals (or feeling like one):** Crêperie Josselin — no frills, no reservations, just the way it's been done for fifty years.",
    "places": [
      {
        "name": "Breizh Café",
        "description": "A polished, slightly self-serious crêperie in the Marais where every ingredient is traced back to a specific Breton farm. The galettes are precise and the cider list is the deepest in Paris, with rare bottles from small Normandy producers. It's pricier than it has any right to be and the queues at lunch can wreck your afternoon plans.",
        "address": "109 Rue Vieille du Temple, 75003 Paris",
        "rating": 4.5,
        "image": "https://images.unsplash.com/photo-1565299543923-37dd37887442?w=800&q=80",
        "citySlug": "paris",
        "placeSlug": undefined
      },
      {
        "name": "Crêperie Josselin",
        "description": "The Montparnasse institution Bretons themselves recommend, with dark wood walls and servers who've been there for decades. Galettes arrive massive, properly crisp at the edges, and the dry cider comes in ceramic bowls as tradition demands. No reservations, closed Mondays, and the noise level at 8pm is not for quiet conversations.",
        "address": "67 Rue du Montparnasse, 75014 Paris",
        "rating": 4.4,
        "image": "https://images.unsplash.com/photo-1607330289024-1535c6b4e1c1?w=800&q=80",
        "citySlug": "paris",
        "placeSlug": undefined
      },
      {
        "name": "Little Breizh",
        "description": "A tiny Saint-Germain crêperie run by a young couple obsessive about their Finistère flour supplier. The room seats around 25 and feels like eating in someone's kitchen, with the chef visible through the pass. Closed two days a week and bookings disappear fast — don't show up hoping for a walk-in.",
        "address": "11 Rue Grégoire de Tours, 75006 Paris",
        "rating": 4.6,
        "image": "https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=800&q=80",
        "citySlug": "paris",
        "placeSlug": undefined
      },
      {
        "name": "Au P'tit Grec",
        "description": "A Greek-run takeaway window on Rue Mouffetard that, against all logic, makes the best street crêpes in Paris. The crêpes are enormous, folded into a cone, and stuffed generously for under €10. The queue on weekend afternoons is genuinely painful — go on a weeknight or accept your fate.",
        "address": "68 Rue Mouffetard, 75005 Paris",
        "rating": 4.5,
        "image": "https://images.unsplash.com/photo-1554503885-d80df3b53963?w=800&q=80",
        "citySlug": "paris",
        "placeSlug": undefined
      },
      {
        "name": "West Country Girl",
        "description": "A candlelit spot off Oberkampf with checkered tablecloths and a chef from Quimper who curates eight ciders by the glass. The savory galettes stay traditional but desserts get playful — the salted butter caramel crêpe with Bordier ice cream is the reason to come. It's small, so weekend dinners book out a week ahead.",
        "address": "6 Passage Saint-Ambroise, 75011 Paris",
        "rating": 4.5,
        "image": "https://images.unsplash.com/photo-1521305916504-4a1121188589?w=800&q=80",
        "citySlug": "paris",
        "placeSlug": undefined
      }
    ]
  },
  {
    "title": "Most Instagrammable Restaurants in Paris",
    "slug": "instagrammable-restaurants-paris",
    "city": "Paris",
    "citySlug": "paris",
    "category": "Restaurants",
    "coverImage": "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=1200&q=80",
    "publishedAt": "2026-05-22",
    "readingTime": 8,
    "metaDescription": "Five Paris restaurants that actually look as good as they taste — from a pink tearoom in Saint-Germain to a glass garden in the Marais.",
    "intro": "Paris has a strange relationship with photogenic restaurants. The most photographed rooms are sometimes the worst plates, and the prettiest courtyards often hide a €38 club sandwich. This guide is for travelers who want both — somewhere worth posting and somewhere worth eating — across five neighborhoods you can actually walk between.",
    "body": "## Why Paris for instagrammable restaurants paris\n\nParis built its café culture in the 19th century and never really stopped renovating it. Expect to spend €25–€60 a head at the places below, more if you order wine. Spring and early autumn are kindest to the terraces; January and August are when half the city closes.\n\n| Place | Price | Best For | Vibe |\n|-------|-------|----------|------|\n| Café de Flore | €€€ | Coffee + people-watching | Wood-paneled classic |\n| Carette | €€ | Pastries with a view | Trocadéro elegance |\n| Girafe | €€€€ | Sunset dinner | Art deco glamour |\n| Le Tout-Paris | €€€€ | Brunch with a Seine view | Penthouse drama |\n| Ladurée Royale | €€ | Tea and macarons | Versailles-meets-boudoir |\n\n## Detailed Reviews\n\n### 1. Café de Flore\n\nThe green-and-white awning on Boulevard Saint-Germain has been photographed roughly a billion times, and yet the room inside still works — red leather banquettes, brass railings, waiters in long white aprons who genuinely don't care if you're famous. Sit upstairs if you actually want to hear the person across from you. The **omelette au fromage** is €17 and surprisingly good; the hot chocolate is the real reason to come.\n\n**Best for:** solo travelers, writers, anyone romanticizing their life\n**Local tip:** Go on a weekday around 3pm — mornings are tourist-packed, evenings get loud, and that mid-afternoon window is when regulars reclaim the place.\n\n### 2. Carette\n\nThe Trocadéro location has the view — direct sightline to the Eiffel Tower from the terrace, which is exactly why it's full by 10am on weekends. Inside, it's all marble tables, mirrored walls, and pastel macarons stacked in the window. Service can be brisk to the point of rude if you don't speak French, but the **millefeuille** is one of the better ones in the city.\n\n**Best for:** first-time visitors who want the Eiffel shot without the crowds of Trocadéro plaza\n**Local tip:** Skip the brunch (overpriced at €42) and come for afternoon tea instead. The Place des Vosges branch is quieter if Trocadéro feels too touristed.\n\n### 3. Girafe\n\nInside the Palais de Chaillot, with a terrace that frames the Eiffel Tower like a postcard. The dining room is a 1930s fantasy — emerald banquettes, brass detailing, low lighting that flatters everyone. It's a seafood restaurant first, scene second, and the **plateau de fruits de mer** is genuinely excellent, though you'll pay €90+ for it.\n\n**Best for:** anniversaries, proposals, anyone trying to impress\n**Local tip:** Book the 7pm seating in summer to catch golden hour on the terrace. Lunch is significantly cheaper than dinner and gets the same view.\n\n### 4. Le Tout-Paris\n\nOn the seventh floor of Cheval Blanc Paris, overlooking the Pont Neuf and the Seine. The room is done in cream and gold with curved banquettes and enormous windows — daylight does most of the work, photographically. The food is solid bistro standards dressed up; the **œufs mimosa** are charming and the steak frites is fine but you're paying for the view.\n\n**Best for:** brunch with someone you want to surprise\n**Local tip:** Sunday brunch books out three weeks ahead. Reserve a table by the window or don't bother — the interior tables miss the entire point.\n\n### 5. Ladurée Royale\n\nThe original 1862 tearoom on rue Royale is still the prettiest of all the Ladurée locations — frescoed ceilings, gold leaf, that specific shade of pistachio green that defined the brand. The salon upstairs feels like eating inside a jewelry box. The macarons are exactly what they are; the **Saint-Honoré rose-framboise** is the move if you're actually hungry.\n\n**Best for:** an afternoon break between Place de la Concorde and the Madeleine\n**Local tip:** The Champs-Élysées branch gets the tourists; this one gets the actual Parisians shopping nearby. Tuesday and Wednesday afternoons are calmest.\n\n## Local Tips for instagrammable restaurants paris\n\n- Book online two to three weeks ahead for Girafe and Le Tout-Paris — walk-ins almost never work at either.\n- Natural light peaks between 10am and 2pm in most Paris dining rooms; if photos matter, aim for lunch over dinner.\n- Order a coffee and a pastry rather than a full meal at the famous cafés — you'll save €30 and get the same atmosphere.\n- Combine Carette with a walk down Avenue Kléber, or Girafe with the Cité de l'Architecture museum next door — both are 10 minutes from the Eiffel Tower without the chaos.\n\n## FAQ\n\n### Q: Do I need to reserve at these Paris restaurants in advance?\nA: Girafe and Le Tout-Paris yes, two to three weeks ahead minimum, especially for weekends. Café de Flore, Carette and Ladurée don't take reservations for the café areas — just show up and expect a short wait at peak hours.\n\n### Q: How much should I budget per person at these spots?\nA: A coffee and pastry at Café de Flore or Ladurée runs €12–€18. Lunch at Carette is €25–€35. Dinner at Girafe or Le Tout-Paris realistically lands at €80–€120 per person with one glass of wine.\n\n### Q: Which one is best for a solo traveler who wants to take photos without feeling awkward?\nA: Café de Flore, easily. Solo diners are normal there, the staff don't rush you, and the upstairs room has good light all afternoon. Bring a book and you'll blend in completely.\n\n## The Verdict\n\nFor couples, **Girafe** is hard to beat — the view, the room, the slow pace of dinner all work together. Budget travelers should head to **Café de Flore** for an afternoon coffee or **Ladurée Royale** for tea and a single pastry. First-timers get the most out of **Carette** for the Eiffel proximity, and locals quietly keep going back to **Le Tout-Paris** for Sunday brunch when someone else is paying.",
    "places": [
      {
        "name": "Café de Flore",
        "description": "A wood-paneled Saint-Germain institution with red leather banquettes and waiters in long white aprons. The upstairs room is quieter and gets soft afternoon light through the tall windows. Be warned: the ground floor terrace is a tourist gauntlet, and prices reflect the postcard more than the plate.",
        "address": "172 Boulevard Saint-Germain, 75006 Paris",
        "rating": 4.4,
        "image": "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=800&q=80",
        "citySlug": "paris",
        "placeSlug": undefined
      },
      {
        "name": "Carette Trocadéro",
        "description": "Marble tables, mirrored walls and a terrace pointed straight at the Eiffel Tower. The pastry case in the window is the most photographed in the 16th arrondissement, and the millefeuille earns it. Service can feel hurried, especially if you arrive without a reservation on a Saturday.",
        "address": "4 Place du Trocadéro et du 11 Novembre, 75116 Paris",
        "rating": 4.3,
        "image": "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
        "citySlug": "paris",
        "placeSlug": undefined
      },
      {
        "name": "Girafe",
        "description": "A 1930s-styled seafood restaurant inside the Palais de Chaillot with emerald banquettes and a terrace that frames the Eiffel Tower. The plateau de fruits de mer is genuinely excellent, though dinner climbs past €100 a head quickly. Reservations open a month ahead and the prime terrace tables vanish first.",
        "address": "1 Place du Trocadéro et du 11 Novembre, 75116 Paris",
        "rating": 4.5,
        "image": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
        "citySlug": "paris",
        "placeSlug": undefined
      },
      {
        "name": "Le Tout-Paris",
        "description": "On the seventh floor of Cheval Blanc with curved cream banquettes and enormous windows facing the Pont Neuf and the Seine. Daylight does most of the heavy lifting, and the bistro menu is competent rather than memorable. You're paying for the view — accept that and you'll have a great time.",
        "address": "8 Quai du Louvre, 75001 Paris",
        "rating": 4.4,
        "image": "https://images.unsplash.com/photo-1592861956120-e524fc739696?w=800&q=80",
        "citySlug": "paris",
        "placeSlug": undefined
      },
      {
        "name": "Ladurée Rue Royale",
        "description": "The original 1862 salon with frescoed ceilings, gold leaf, and that signature pistachio green throughout. Upstairs feels like eating inside a jewelry box, and Parisians actually still come here between errands. The macarons are what they are — the Saint-Honoré rose-framboise is the better order if you want something memorable.",
        "address": "16 Rue Royale, 75008 Paris",
        "rating": 4.4,
        "image": "https://images.unsplash.com/photo-1464195244916-405fa0a82545?w=800&q=80",
        "citySlug": "paris",
        "placeSlug": undefined
      }
    ]
  },
  {
    "title": "Best Lebanese Food in Paris",
    "slug": "lebanese-food-paris",
    "city": "Paris",
    "citySlug": "paris",
    "category": "Restaurants",
    "coverImage": "https://images.unsplash.com/photo-1542367592-8849eb950fd8?w=1200&q=80",
    "publishedAt": "2026-05-23",
    "readingTime": 8,
    "metaDescription": "Where to eat real Lebanese food in Paris: 5 tested spots from cheap shawarma to white-tablecloth mezze, with prices and local tips.",
    "intro": "Walk down Rue de Bretagne on a Saturday afternoon and you'll smell the garlic toum and charcoal before you see the queue. Paris has had a serious Lebanese community since the 1970s, and the city's mezze scene now runs from €8 takeaway sandwiches in the 9th to candle-lit kibbeh tastings in the Marais. This guide is for anyone who wants the real thing — proper labneh, smoky baba ghanoush, lamb that pulls apart — without paying tourist tax. Budget anywhere from €12 for lunch to €60 for a proper sit-down feast.",
    "body": "## Why Paris for lebanese food paris\n\nLebanese food landed in Paris with the civil war exodus and never left, settling mostly around the 8th, 9th and the Marais. The best places are family-run, second generation now, and they cook the way Beirut cooked before the city's restaurants got fancy. Lunch is the smart move — most spots do a €15-20 formule that would cost €35 at dinner.\n\n| Place | Price | Best For | Vibe |\n|-------|-------|----------|------|\n| Liza | €€€ | Date night | Beirut-chic dining room |\n| Chez Marianne | €€ | First-timers | Bustling Marais corner |\n| Al Dar | €€€ | Sunday family lunch | Classic white-tablecloth |\n| Noura | €€ | Quick proper meal | Polished brasserie |\n| Comptoir Libanais | € | Cheap and fast | Counter and stools |\n\n## Detailed Reviews\n\n### 1. Liza\n\nLiza Soughayar opened this place in 2005 and it still feels like the most thought-out Lebanese room in Paris — geometric tiles, low lighting, a crowd that's half Beiruti expats and half Parisians on a third date. The food is modern but rooted: try the **kafta bel kerez**, lamb meatballs in sour cherry sauce, which sounds wrong and tastes incredible. Service can drift when it's full on a Friday, so book the early seating.\n\n**Best for:** couples, anniversary dinners\n**Local tip:** the weekday lunch menu at €29 is the same kitchen for half the dinner price.\n\n### 2. Chez Marianne\n\nThe corner of Rue des Hospitalières-Saint-Gervais has been Chez Marianne since 1978, and yes it's technically a Jewish-Middle Eastern hybrid, but the Lebanese mezze platter is what people queue for. You pick **between 4 and 12 items** from the counter — get the hummus, the houmous au cumin, the spicy carrots, the falafel. Sit inside if it's cold; the terrace is great but the waiters forget you exist.\n\n**Best for:** first-time visitors who want variety on one plate\n**Local tip:** skip the dinner rush — go at 3pm when the tourists clear and the falafel is still being fried fresh.\n\n### 3. Al Dar\n\nAl Dar has two locations but the one on Rue Frédéric Sauton near Notre-Dame is the original, running since 1987. This is where Lebanese families come for a proper Sunday lunch — three generations at one table, ten little plates, no rush. Order the **mezze découverte for two** (€58) and the grilled lamb chops; the raw kibbeh nayyeh is exceptional if you eat that sort of thing.\n\n**Best for:** a long lunch, groups of four or more\n**Local tip:** reservations are essential on Sundays after 1pm. The traiteur next door does the same food to take away for half the price.\n\n### 4. Noura\n\nNoura is the polished one — five locations across Paris, the Avenue Marceau flagship being the most serious. It's not cool, it's not buzzy, but the cooking is rock-solid and consistent in a way the trendier places aren't. The **chicken shish taouk** with garlic toum is the benchmark; their fattoush is properly sour with sumac.\n\n**Best for:** business lunch, reliable dinner when you don't want surprises\n**Local tip:** the Marceau branch has a takeaway counter at the front — same kitchen, sandwiches around €9, eat them on a bench at Place de l'Alma.\n\n### 5. Comptoir Libanais\n\nNot to be confused with the UK chain — this is a small counter spot on Rue Saint-Marc in the 2nd, run by a Lebanese couple who do everything themselves. Lunch is built around **manakish** (the Lebanese flatbread) topped with za'atar, cheese, or spiced lamb, plus a few mezze of the day. There are maybe twelve seats and no atmosphere to speak of, but a manakish + labneh + mint tea lunch comes in under €15.\n\n**Best for:** solo lunch, budget eating, takeaway\n**Local tip:** go before 12:30 or after 2pm — the office crowd from nearby Bourse fills it solid for an hour.\n\n## Local Tips for lebanese food paris\n\n- Order **arak** with mezze, not wine — it's the proper pairing and most places have a decent house version for €6 a glass.\n- Friday and Saturday dinners need booking at Liza and Al Dar at least three days ahead; Chez Marianne doesn't take reservations so go early or late.\n- Skip the main courses at mezze-focused places and order more small plates instead — that's how Lebanese people actually eat.\n- Combine Chez Marianne with a walk through the Marais and a stop at Rue des Rosiers; Al Dar pairs naturally with a Notre-Dame and Île Saint-Louis afternoon.\n\n## FAQ\n\n### Q: What's the best neighborhood in Paris for Lebanese food?\nA: The Marais (4th arrondissement) has the highest concentration of casual spots, while the 8th and 16th hold the more upscale restaurants like Noura and Liza. For cheap and authentic, look around Rue Saint-Marc and the lower 9th.\n\n### Q: How much does a Lebanese meal in Paris cost?\nA: A counter-style lunch with manakish or a shawarma sandwich runs €10-15. A proper sit-down mezze dinner for two with drinks lands between €70 and €120 depending on the place. Liza and Al Dar are the priciest of the five here.\n\n### Q: Which Lebanese restaurant in Paris is best for vegetarians?\nA: Chez Marianne, easily — the mezze platter lets you pick 8-12 vegetarian items, all made in-house. Liza also has a strong vegetarian mezze selection, and most Lebanese restaurants will happily build a meat-free spread if you ask.\n\n## The Verdict\n\nFor couples, **Liza** wins on atmosphere and modern cooking. Budget travelers should head straight to **Comptoir Libanais** for a €15 manakish lunch. First-timers get the most variety at **Chez Marianne**, and locals who know what they want book a Sunday table at **Al Dar**.",
    "places": [
      {
        "name": "Liza",
        "description": "A design-forward Beirut-in-Paris room with geometric tiles, low lighting and a mixed crowd of Lebanese expats and Parisian regulars. The kitchen does modern Lebanese without losing the soul — the kafta bel kerez, lamb in sour cherry sauce, is the dish to order. Service slows noticeably during the Friday rush, so the early seating is the smarter pick.",
        "address": "14 Rue de la Banque, 75002 Paris",
        "rating": 4.5,
        "image": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80",
        "citySlug": "paris",
        "placeSlug": undefined
      },
      {
        "name": "Chez Marianne",
        "description": "A Marais corner institution since 1978, half Jewish deli and half Lebanese mezze counter, always busy and slightly chaotic. The draw is the build-your-own platter of 4 to 12 items — the hummus, cumin chickpeas and spicy carrots are the standouts. The terrace looks great but the inside service is faster and warmer.",
        "address": "2 Rue des Hospitalières-Saint-Gervais, 75004 Paris",
        "rating": 4.3,
        "image": "https://images.unsplash.com/photo-1540914124281-342587941389?w=800&q=80",
        "citySlug": "paris",
        "placeSlug": undefined
      },
      {
        "name": "Al Dar",
        "description": "Old-school white-tablecloth Lebanese cooking near Notre-Dame, running since 1987 and still pulling in three-generation Lebanese family lunches. The mezze découverte for two is the move, and the raw kibbeh nayyeh is some of the best in the city. The dining room is dated in a comforting way, not a stylish one.",
        "address": "8-10 Rue Frédéric Sauton, 75005 Paris",
        "rating": 4.4,
        "image": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&q=80",
        "citySlug": "paris",
        "placeSlug": undefined
      },
      {
        "name": "Noura",
        "description": "The polished, reliable choice — a small chain whose Avenue Marceau flagship serves consistently excellent Lebanese classics without much surprise or flair. The shish taouk with garlic toum is benchmark-good and the fattoush is properly tangy with sumac. The room is corporate-elegant rather than charming, which suits a business lunch.",
        "address": "21 Avenue Marceau, 75116 Paris",
        "rating": 4.2,
        "image": "https://images.unsplash.com/photo-1562967914-608f82629710?w=800&q=80",
        "citySlug": "paris",
        "placeSlug": undefined
      },
      {
        "name": "Comptoir Libanais",
        "description": "A tiny owner-run counter spot in the 2nd with maybe twelve seats and zero pretension. The focus is manakish — Lebanese flatbreads topped with za'atar, cheese or spiced lamb — plus a rotating handful of mezze. There's no atmosphere to speak of, but a full lunch with mint tea comes in under €15, which in central Paris is borderline miraculous.",
        "address": "12 Rue Saint-Marc, 75002 Paris",
        "rating": 4.4,
        "image": "https://images.unsplash.com/photo-1561651823-34feb02250e4?w=800&q=80",
        "citySlug": "paris",
        "placeSlug": undefined
      }
    ]
  },
  {
    "title": "Top Boulangeries in Paris Ranked 2025",
    "slug": "best-boulangeries-paris",
    "city": "Paris",
    "citySlug": "paris",
    "category": "Bakeries",
    "coverImage": "https://images.unsplash.com/photo-1568254183919-78a4f43a2877?w=1200&q=80",
    "publishedAt": "2026-05-24",
    "readingTime": 8,
    "metaDescription": "The 5 best boulangeries in Paris in 2025 — where locals actually queue, what to order, and which baguettes are worth the detour.",
    "intro": "It's 7:45am on a Tuesday in the 11th and there's already a line of seven people, none of them tourists, all waiting for bread that won't be out of the oven for another six minutes. That's Paris in a nutshell — the city takes its loaves personally. This guide is for travelers who'd rather skip the Instagram bakery with the pink awning and eat what neighbors eat. Five boulangeries, real addresses, honest notes on what's worth the queue.",
    "body": "## Why Paris for best boulangeries paris\n\nParis runs an annual competition for the city's best baguette — the winner supplies the Élysée Palace for a year, which tells you how seriously this is taken. Most neighborhoods have one boulangerie everyone agrees on, and locals will defend theirs against the next arrondissement over. Budget is friendly: a baguette de tradition runs €1.30–€1.60, viennoiseries €1.80–€4.50. Go early — by 1pm the good stuff is gone.\n\n| Place | Price | Best For | Vibe |\n|-------|-------|----------|------|\n| Du Pain et des Idées | €€ | Pastries, escargots | Old-school, photogenic |\n| Boulangerie Utopie | €€ | Inventive viennoiseries | Quiet, modern, 11th |\n| Poilâne | €€€ | Sourdough miche | Historic, tourist-aware |\n| Maison Landemaine | € | Daily baguette | Reliable neighborhood |\n| Tout Autour du Pain | €€ | Award-winning baguette | Marais, low-key |\n\n## Detailed Reviews\n\n### 1. Du Pain et des Idées\n\nChristophe Vasseur's bakery on Rue Yves Toudic looks like a film set — and basically is one, with the original 1889 painted ceiling still intact. The **escargot pistache-chocolat** is the calling card, a snail-shaped pastry filled with pistachio cream and chunks of chocolate. It's closed weekends, which catches a lot of visitors off guard. Expect a 10–15 minute queue around 10am on a Friday.\n\n**Best for:** pastry lovers willing to plan around weekday hours\n**Local tip:** Order the **pavé du puits d'amour** if it's on — caramelized puff pastry, harder to find than the escargots and arguably better.\n\n### 2. Boulangerie Utopie\n\nTucked on Rue Jean-Pierre Timbaud, Utopie looks more like a design studio than a bakery — black storefront, minimal signage, no fuss. They lean experimental: squid ink baguette, charcoal-bamboo brioche, a matcha financier that actually tastes like matcha. The downside is consistency — some days the **chocolat noisette** brioche is transcendent, other days slightly dry.\n\n**Best for:** travelers staying in the 11th who want something less postcard, more Paris-now\n**Local tip:** Go Saturday morning around 9:30 — Sundays the line stretches down the block.\n\n### 3. Poilâne\n\nThe Rue du Cherche-Midi shop has been turning out its signature **miche** — a 1.9kg sourdough round stamped with a cursive P — since 1932. It's not cheap (around €11 for a quarter loaf), and yes, every food writer who's ever visited Paris has written about it. But the bread genuinely keeps for a week and improves on day two. The shop also sells **punitions**, small butter cookies given free with most orders.\n\n**Best for:** first-timers who want one classic Paris bread experience\n**Local tip:** The basement wood-fired oven is visible through a window inside — ask politely and they'll usually let you peek.\n\n### 4. Maison Landemaine\n\nThere are several Landemaine locations around the city — the one on Rue de Clichy in the 9th is the easiest to combine with a Pigalle wander. It's the bakery Parisians grab on the way home from work: solid **baguette de tradition**, dependable croissants, sandwiches under €7. Nothing here will rewrite your idea of bread, but the quality is consistent in a way smaller bakeries sometimes aren't.\n\n**Best for:** budget travelers, picnic supplies, breakfast on the move\n**Local tip:** Their **flan pâtissier** is one of the best in the city for under €4 — get it cold, late afternoon.\n\n### 5. Tout Autour du Pain\n\nBenjamin Turquier won the Grand Prix de la Baguette de Tradition in 2017 and his Marais shop on Rue des Filles du Calvaire still trades on that reputation — deservedly. The crust shatters properly, the crumb has those uneven holes that signal a long fermentation. It's a working neighborhood bakery, not a destination, which is part of the appeal. Service can be brisk to the point of rude if you dither.\n\n**Best for:** baguette purists, Marais wanderers\n**Local tip:** Ask for it **bien cuite** (well-baked) — the darker crust is how locals here order it.\n\n## Local Tips for best boulangeries paris\n\n- Most boulangeries bake baguettes twice daily — morning batch around 7am, afternoon around 4pm. Hit those windows for the warmest bread.\n- Sundays are tricky: many bakeries close, and those open often run out by noon. Du Pain et des Idées is closed all weekend.\n- A **baguette de tradition** (€1.30+) is hand-shaped and uses better flour than a standard **baguette ordinaire** (€1.10). Always pay the extra 20 cents.\n- Combine Poilâne with a walk through the 6th — the Jardin du Luxembourg is a 10-minute stroll east, perfect for a bread-and-cheese bench lunch.\n\n## FAQ\n\n### Q: Which Paris bakery has won the best baguette in Paris award recently?\nA: Recent winners include Tharshan Selvarajah (2024, Rue Boursault) and Xavier Netry of Utopie (2022). The annual Grand Prix is judged each spring and winners supply the Élysée Palace.\n\n### Q: How early should I show up to avoid the queue?\nA: For Du Pain et des Idées, before 9am or after 2pm on weekdays. Most neighborhood boulangeries are quietest between 10am and 11:30am — after the commuter rush, before lunch.\n\n### Q: What's the best boulangerie in Paris for someone who only has one morning?\nA: Du Pain et des Idées if it's a weekday — it covers pastries, bread, and the most photogenic interior in one stop. If it's a weekend, swap in Poilâne or Tout Autour du Pain.\n\n## The Verdict\n\nBest for couples: **Du Pain et des Idées** for the 19th-century interior and a shared escargot on a bench by Canal Saint-Martin. Best for budget: **Maison Landemaine** — under €10 buys breakfast for two. Best for first-timers: **Poilâne**, because the miche genuinely lives up to its reputation. Best for locals (or anyone pretending to be one): **Tout Autour du Pain** for the baguette, **Boulangerie Utopie** for everything else.",
    "places": [
      {
        "name": "Du Pain et des Idées",
        "description": "A 19th-century bakery near Canal Saint-Martin with original painted ceilings and tiled walls intact. Christophe Vasseur's escargot pistache-chocolat and pavé du puits d'amour are the standouts, made with long fermentation and serious butter. Closed weekends, which means weekday mornings get crowded fast.",
        "address": "34 Rue Yves Toudic, 75010 Paris",
        "rating": 4.7,
        "image": "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80",
        "citySlug": "paris",
        "placeSlug": undefined
      },
      {
        "name": "Boulangerie Utopie",
        "description": "A minimalist black-fronted bakery in the 11th that takes risks — squid ink baguettes, charcoal brioches, matcha financiers. The pastries are precise and often inventive, the kind locals show off to visiting friends. Quality varies day to day, but the highs are very high.",
        "address": "20 Rue Jean-Pierre Timbaud, 75011 Paris",
        "rating": 4.6,
        "image": "https://images.unsplash.com/photo-1517433367423-c7e5b0f35086?w=800&q=80",
        "citySlug": "paris",
        "placeSlug": undefined
      },
      {
        "name": "Poilâne",
        "description": "A Left Bank institution since 1932, famous for its 1.9kg sourdough miche stamped with a cursive P and baked in a basement wood-fired oven. The shop hands out small butter punitions cookies with most orders, a touch that still charms after nine decades. Prices are high and the place knows its reputation, but the bread genuinely improves on day two.",
        "address": "8 Rue du Cherche-Midi, 75006 Paris",
        "rating": 4.6,
        "image": "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&q=80",
        "citySlug": "paris",
        "placeSlug": undefined
      },
      {
        "name": "Maison Landemaine",
        "description": "A dependable mini-chain Parisians grab from on the way home — solid baguettes, good croissants, sandwiches under €7. The Rue de Clichy branch is handy for anyone exploring Pigalle or the 9th. The flan pâtissier is quietly one of the best in the city for the price.",
        "address": "26 Rue de Clichy, 75009 Paris",
        "rating": 4.4,
        "image": "https://images.unsplash.com/photo-1600398137711-5798c6f86c5c?w=800&q=80",
        "citySlug": "paris",
        "placeSlug": undefined
      },
      {
        "name": "Tout Autour du Pain",
        "description": "Benjamin Turquier's Marais bakery, where the 2017 Grand Prix de la Baguette de Tradition win still echoes through every loaf. It's a brisk neighborhood operation — no frills, no Instagram styling, just a properly shattering crust and an open crumb. Service can be curt if you're slow to order.",
        "address": "134 Rue de Turenne, 75003 Paris",
        "rating": 4.5,
        "image": "https://images.unsplash.com/photo-1534620808146-d33bb39128b2?w=800&q=80",
        "citySlug": "paris",
        "placeSlug": undefined
      }
    ]
  },
  {
    "title": "Best Food Markets in Paris by Neighbourhood",
    "slug": "food-markets-paris-neighbourhood",
    "city": "Paris",
    "citySlug": "paris",
    "category": "Markets",
    "coverImage": "https://images.unsplash.com/photo-1573246123716-6b1782bfc499?w=1200&q=80",
    "publishedAt": "2026-05-25",
    "readingTime": 8,
    "metaDescription": "From Marché d'Aligre to Rue Mouffetard, here's where Parisians actually shop — by neighbourhood, with prices and what to skip.",
    "intro": "It's Sunday, 10am, and the line at the cheese stall on Rue de Bretagne is already six deep. Locals are arguing about ripeness, kids are eating croissants out of paper bags, and someone's dog is staring at a whole rotisserie chicken. This guide is for travelers who'd rather skip the Champs-Élysées and spend a morning where Parisians actually buy their dinner. Below: five markets across five neighbourhoods, what to order, and what to leave on the shelf.",
    "body": "## Why Paris for food markets by neighbourhood\n\nParis has around 80 open-air and covered markets, and each arrondissement has its own rhythm. Most run mornings only (7am-2pm-ish) and shut Mondays — that's the single rule that trips up visitors. Budget around €15-25 for a serious picnic for two, more if you're getting oysters.\n\n| Place | Price | Best For | Vibe |\n|-------|-------|----------|------|\n| Marché d'Aligre | € | Daily shopping, cheap produce | Loud, mixed, real |\n| Marché des Enfants Rouges | €€ | Lunch on the go | Crowded, photogenic |\n| Marché Bastille | €€ | Saturday browsing | Long, sprawling, touristy in spots |\n| Rue Mouffetard | €€ | Pedestrian street market | Old Paris, sloped, charming |\n| Marché Président Wilson | €€€ | High-end ingredients | Polished, 16th arr. crowd |\n\n## Detailed Reviews\n\n### 1. Marché d'Aligre (12th)\n\nThis is the one I send friends to first. It's actually three markets in one — an outdoor produce strip on Rue d'Aligre, a covered hall (Marché Beauvau) with butchers and cheesemongers, and a flea market in the square. Prices drop sharply after 1pm when vendors start clearing stock, and the shouting gets louder.\n\nGrab a dozen oysters from **Le Baron Rouge** next door and eat them standing at a wine barrel on the pavement — €12 for six fines de claires, plus a glass of Muscadet. The downside: it gets packed on Sundays and the cobblestones are brutal in heels.\n\n**Best for:** travelers who want the real Paris market experience without the gloss\n**Local tip:** Go Sunday morning, then walk to Le Baron Rouge around noon for oysters before they sell out.\n\n### 2. Marché des Enfants Rouges (3rd)\n\nThe oldest covered market in Paris, dating to 1615, tucked behind a green gate on Rue de Bretagne. These days it's more lunch canteen than grocery run — about 70% of the stalls sell prepared food. Expect Moroccan tagines, Japanese bento, Lebanese mezze, and a famous Italian counter where the queue moves slowly.\n\n**Chez Alain Miam Miam** does the sandwich everyone Instagrams — €13, worth it once, but you'll wait 30+ minutes on a Saturday. Skip it if you're hungry; go for the Moroccan stall **Le Traiteur Marocain** instead, where a plate of couscous runs €12 with no queue.\n\n**Best for:** a relaxed Marais lunch when you don't want to commit to a restaurant\n**Local tip:** Closed Mondays. Arrive before 12:30pm or after 2pm — peak is unbearable.\n\n### 3. Marché Bastille (11th)\n\nThe biggest open-air market in Paris stretches along Boulevard Richard Lenoir from Bastille to Richard-Lenoir métro. Thursday and Sunday mornings only. It's where east-side Parisians stock up — fishmongers shouting prices, Tunisian bakeries selling warm bricks of bread, and a couple of stalls doing rotisserie chicken with potatoes cooked underneath in the chicken fat (€13 for a whole bird).\n\nThe further north you walk, the better the produce and the lower the prices. The Bastille end has more tourist-trap charcuterie at €40/kg.\n\n**Best for:** Sunday picnic supplies before walking to Place des Vosges\n**Local tip:** Look for the **rotisserie potatoes** — ask for \"les pommes de terre dessous,\" the ones under the chickens.\n\n### 4. Rue Mouffetard (5th)\n\nNot a market in the formal sense — it's a sloped pedestrian street lined with shops and a few stalls at the bottom near Saint-Médard. Hemingway wrote about it; the tourists found out; some of the magic faded. But the cheesemonger **Androuet** at no. 134 is still excellent, and the Greek place with the gyros is a Tuesday-night ritual for Sorbonne students.\n\nMornings (Tuesday-Sunday) are the only time it functions as a proper food street. By 3pm it tilts toward cheap restaurants and stag parties.\n\n**Best for:** first-time visitors who want a Paris street market without leaving the tourist zone\n**Local tip:** Skip the crêpe stands at the top. Walk down to **Le Verre à Pied** at no. 118 for a glass of wine — same crowd since 1960.\n\n### 5. Marché Président Wilson (16th)\n\nWednesday and Saturday mornings on Avenue du Président Wilson, between Trocadéro and Iéna. This is where chefs shop. Joël Robuchon used to. The legendary vegetable grower **Joël Thiébault** built his name here selling 200+ heirloom varieties to Michelin kitchens.\n\nIt's not cheap — €8 for a punnet of strawberries is normal — but the quality is on another level. The downside is the crowd: a lot of 16th-arrondissement money, a lot of elbows, and almost no English spoken.\n\n**Best for:** food obsessives, cooks renting an Airbnb with a kitchen\n**Local tip:** Saturday is busier but has more stalls. Go at 9am sharp before the chefs clear out the best produce.\n\n## Local Tips for food markets paris neighbourhood\n\n- Bring a cloth bag and small bills — many vendors hate breaking €50 notes and plastic bags cost extra\n- Almost every market is closed Mondays; Aligre and Mouffetard open Tuesday-Sunday, Bastille only runs Thursday and Sunday\n- Order by weight in grams (\"deux cents grammes\" = 200g) — pointing works fine, but learning \"une tranche\" (a slice) helps at charcuterie counters\n- Combine Marché d'Aligre with a walk through the Coulée Verte René-Dumont, the elevated park that starts five minutes away\n\n## FAQ\n\n### Q: What day should I avoid visiting Paris markets?\nA: Mondays — almost every market is closed, including Aligre, Enfants Rouges, and Mouffetard. Tuesday through Sunday mornings are safe bets, with Sunday being the busiest and most atmospheric.\n\n### Q: How much should I budget for a market picnic in Paris?\nA: For two people, €20-30 covers a baguette, cheese, charcuterie, fruit, and a bottle of wine. Add €15 if you want oysters or a rotisserie chicken. Markets like Président Wilson run 30-40% higher than Aligre.\n\n### Q: Which Paris market is best for first-time visitors?\nA: Marché des Enfants Rouges if you want lunch and Marais charm; Marché d'Aligre if you want to feel like you've stepped into how Parisians actually live. Skip Rue Mouffetard unless you're already in the 5th.\n\n## The Verdict\n\n**Best for couples:** Marché des Enfants Rouges, then a walk through the northern Marais.\n**Best for budget:** Marché d'Aligre — the cheapest serious market in central Paris.\n**Best for first-timers:** Rue Mouffetard, because it's easy to combine with the Latin Quarter.\n**Best for locals (and aspiring ones):** Marché Président Wilson on a Saturday at 9am sharp.",
    "places": [
      {
        "name": "Marché d'Aligre",
        "description": "A loud, three-part market that locals treat as their weekly pantry restock. The covered Beauvau hall handles meat and cheese while the outdoor stalls on Rue d'Aligre slash prices after 1pm. It can feel chaotic and the cobblestones are punishing, but no other Paris market feels this lived-in.",
        "address": "Place d'Aligre, 75012 Paris",
        "rating": 4.6,
        "image": "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=800&q=80",
        "citySlug": "paris",
        "placeSlug": undefined
      },
      {
        "name": "Marché des Enfants Rouges",
        "description": "The oldest covered market in Paris, opened in 1615, now mostly devoted to lunch counters. Moroccan, Japanese, Italian and Lebanese stalls share a tight space behind a green gate on Rue de Bretagne. Charming on a quiet Tuesday, miserable on a Saturday at 1pm.",
        "address": "39 Rue de Bretagne, 75003 Paris",
        "rating": 4.4,
        "image": "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80",
        "citySlug": "paris",
        "placeSlug": undefined
      },
      {
        "name": "Marché Bastille",
        "description": "The largest open-air market in Paris, running Thursday and Sunday mornings along Boulevard Richard Lenoir. Fishmongers shout, rotisseries spin, and the north end has the better produce. The Bastille end caters more to tourists, with charcuterie prices to match.",
        "address": "Boulevard Richard Lenoir, 75011 Paris",
        "rating": 4.5,
        "image": "https://images.unsplash.com/photo-1555992336-fb0d29498b13?w=800&q=80",
        "citySlug": "paris",
        "placeSlug": undefined
      },
      {
        "name": "Rue Mouffetard",
        "description": "A sloped pedestrian street in the 5th that functions as a market in the mornings (Tuesday-Sunday) and a cheap restaurant strip at night. The shops at the top are tourist bait, but Androuet's cheese counter and Le Verre à Pied still feel like 1960. Go early or skip it.",
        "address": "Rue Mouffetard, 75005 Paris",
        "rating": 4.3,
        "image": "https://images.unsplash.com/photo-1534723452862-4c874018d66d?w=800&q=80",
        "citySlug": "paris",
        "placeSlug": undefined
      },
      {
        "name": "Marché Président Wilson",
        "description": "The market where Michelin chefs shop on Wednesday and Saturday mornings near Trocadéro. Joël Thiébault's heirloom vegetable stall is the headline draw, with rare varieties you won't find elsewhere in Paris. Prices reflect the 16th-arrondissement address, and English is rarely spoken.",
        "address": "Avenue du Président Wilson, 75116 Paris",
        "rating": 4.6,
        "image": "https://images.unsplash.com/photo-1506617420156-8e4536971650?w=800&q=80",
        "citySlug": "paris",
        "placeSlug": undefined
      }
    ]
  },
  {
    "title": "Michelin Star Restaurants in Paris Worth It",
    "slug": "michelin-paris-worth-it",
    "city": "Paris",
    "citySlug": "paris",
    "category": "Fine Dining",
    "coverImage": "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80",
    "publishedAt": "2026-05-26",
    "readingTime": 8,
    "metaDescription": "Five Michelin-starred Paris restaurants that actually justify the bill — honest picks from a local, with dishes, prices and booking tips.",
    "intro": "Paris has roughly 130 Michelin-starred restaurants, which means at least half of them coast on the badge. The ones below don't. This guide is for travelers who'd rather spend €180 on one extraordinary lunch than three forgettable bistro dinners — and who want to know, before booking, whether the room feels stiff, the portions feel mean, or the sommelier feels human. I've eaten at all five within the past year.",
    "body": "## Why Paris for Michelin Dining Worth the Splurge\n\nParis fine dining clusters in the 1st, 7th and 8th — old money neighborhoods near the Tuileries, the Eiffel Tower and the Champs. Lunch menus run €90–€180; dinner climbs fast past €300. Spring and early autumn are the smartest seasons: peak produce, and chefs are back from August closures.\n\n| Place | Price | Best For | Vibe |\n|-------|-------|----------|------|\n| Septime | €115 lunch | First serious splurge | Relaxed, loud, fun |\n| Le Clarence | €190 lunch | Wine obsessives | Hôtel particulier, hushed |\n| Arpège | €175 lunch | Vegetable lovers | Intimate, intense |\n| Plénitude | €320 dinner | Special occasion | Glittering, view of Pont Neuf |\n| Le Cinq | €210 lunch | Classical French peak | Gilded, formal |\n\n## Detailed Reviews\n\n### 1. Septime\n\nBertrand Grébaut's restaurant in the 11th is the rare one-star where nobody's whispering. The room is plywood and concrete, the staff wear t-shirts, and the tasting menu changes weekly based on what arrives from small Île-de-France farms. The trout with sorrel cream is a signature for a reason — they've been refining it since 2011.\n\nReservations open exactly three weeks ahead at 10am Paris time and vanish in minutes.\n\n**Best for:** First-timers who think Michelin means stuffy.\n**Local tip:** Lunch is half the price of dinner and you get the same kitchen. Try for a Wednesday — Mondays the team is still warming up.\n\n### 2. Le Clarence\n\nTwo stars, hidden inside a 19th-century mansion off the Champs-Élysées, owned by the Dillon family of Château Haut-Brion. That detail matters: the wine list is one of the most serious in France, with Bordeaux pours you won't see elsewhere by the glass. Chef Christophe Pelé cooks in layers — expect a single langoustine to arrive with five sauces, each one earned.\n\nThe dining rooms feel like a private home, which is charming until the table next to you starts a business deal at full volume.\n\n**Best for:** Anyone who reads wine lists for pleasure.\n**Local tip:** Ask for a table in the smaller salon on the second floor, not the main room. The wine pairing is genuinely worth the €150 supplement here — rare thing to say.\n\n### 3. Arpège\n\nAlain Passage turned his three-star restaurant vegetable-forward in 2001 and has been quietly leading French cuisine ever since. The famous beetroot in salt crust, carved tableside, sounds gimmicky and isn't — it tastes like the platonic ideal of a vegetable. Meat and fish exist on the menu but feel like afterthoughts.\n\nThe room is small, beige, and the prices induce a flinch: à la carte easily passes €400 per person. The lunch menu at €175 is the only sane entry point.\n\n**Best for:** People who've eaten enough foie gras for one lifetime.\n**Local tip:** Skip dinner, do lunch, and request the seasonal vegetable garden menu specifically when booking. Don't go in winter — the produce drives the kitchen.\n\n### 4. Plénitude (Cheval Blanc Paris)\n\nArnaud Donckele's three-star is inside the Cheval Blanc hotel on the Seine, looking straight at Pont Neuf. The cooking is built around sauces — Donckele is obsessed, and dishes arrive with two or three poured tableside from antique silver. The signature **\"Précieuse\"** sauce, a riff on beurre blanc with citrus and herbs, has its own small cult.\n\nIt's expensive in a way that even other Michelin diners side-eye: €390 for the chef's menu, before wine. Service is flawless but the room is so quiet you can hear cutlery from four tables away.\n\n**Best for:** Anniversary, proposal, or a deal you just closed.\n**Local tip:** Book for sunset — the light on the river through those windows does more work than any decor.\n\n### 5. Le Cinq\n\nInside the Four Seasons George V, three stars under Christian Le Squer. This is the most classically French of the five — gold leaf, oversized flower arrangements by Jeff Leatham, the kind of room where you instinctively sit up straighter. The grand marnier soufflé is non-negotiable for dessert.\n\nIt can feel like dining inside a wedding cake, and the clientele skews heavily international, but the kitchen is technically untouchable. The €210 lunch menu is one of the best-value three-star meals in the city.\n\n**Best for:** Travelers who want the full classical French experience without apologies.\n**Local tip:** The cheese trolley alone justifies the price of admission. Ask for the Beaufort d'alpage if it's on.\n\n## Local Tips for Michelin Paris Dining\n\n- Lunch menus run 40–50% cheaper than dinner with the same kitchen — book lunch and walk it off in the Tuileries after.\n- Reserve 6–8 weeks ahead for three-stars, 3 weeks for one-stars. Septime opens reservations exactly 21 days in advance at 10am sharp.\n- Skip the wine pairing at Septime and Arpège (mark-ups are steep) — order a single bottle. Do take pairings at Le Clarence and Plénitude.\n- Combine Arpège with a walk along Rue de Varenne and a stop at the Rodin Museum two blocks away.\n\n## FAQ\n\n### Q: Are Michelin restaurants in Paris really worth the money?\nA: Three-stars at dinner often aren't — you're paying for theater. But lunch menus at one and two-stars (Septime, Le Clarence) frequently deliver better food than dinner at trendy bistros, for similar money.\n\n### Q: How far in advance do I need to book?\nA: For three-stars like Plénitude and Le Cinq, 6–8 weeks minimum, sometimes more for weekend dinners. Septime is famously the hardest — reservations open exactly 3 weeks ahead online and disappear within minutes.\n\n### Q: What's the best Michelin restaurant in Paris for a first-timer on a budget?\nA: Septime's €115 lunch is the answer. You get serious one-star cooking, a relaxed room, and you won't feel underdressed in nice jeans. Just plan three weeks ahead.\n\n## The Verdict\n\n**Best for couples:** Plénitude at sunset — the river view does half the seduction.\n**Best for budget:** Septime lunch at €115, no contest.\n**Best for first-timers:** Le Cinq — it's the classical Parisian fantasy executed properly.\n**Best for locals (and repeat visitors):** Arpège in May, when the vegetables hit their peak.",
    "places": [
      {
        "name": "Septime",
        "description": "A 40-seat one-star in the 11th where the staff wear t-shirts and nobody whispers. The weekly tasting menu is built around small Île-de-France farms, and the trout with sorrel cream has been refined since 2011. Booking is genuinely brutal — reservations open three weeks ahead and vanish in minutes.",
        "address": "80 Rue de Charonne, 75011 Paris",
        "rating": 4.7,
        "image": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
        "citySlug": "paris",
        "placeSlug": undefined
      },
      {
        "name": "Le Clarence",
        "description": "Two stars inside a 19th-century mansion off the Champs-Élysées, owned by the family behind Château Haut-Brion. Christophe Pelé layers his plates with multiple sauces, and the wine list is one of the most serious in Paris. The intimate salon setting can backfire when a neighboring table conducts business at full volume.",
        "address": "31 Avenue Franklin D. Roosevelt, 75008 Paris",
        "rating": 4.8,
        "image": "https://images.unsplash.com/photo-1592861956120-e524fc739696?w=800&q=80",
        "citySlug": "paris",
        "placeSlug": undefined
      },
      {
        "name": "Arpège",
        "description": "Alain Passard's three-star has been vegetable-forward since 2001, quietly shaping modern French cooking ever since. The beetroot baked in salt crust and carved tableside tastes like the platonic ideal of a vegetable. Prices are eye-watering à la carte — the €175 lunch is the only sensible way in.",
        "address": "84 Rue de Varenne, 75007 Paris",
        "rating": 4.7,
        "image": "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800&q=80",
        "citySlug": "paris",
        "placeSlug": undefined
      },
      {
        "name": "Plénitude",
        "description": "Arnaud Donckele's three-star inside the Cheval Blanc hotel, with a straight-on view of Pont Neuf. The cooking is sauce-obsessed, with two or three poured tableside from antique silver, and the Précieuse sauce has its own quiet cult following. Service is immaculate but the room is so hushed you'll hear cutlery from four tables over.",
        "address": "8 Quai du Louvre, 75001 Paris",
        "rating": 4.9,
        "image": "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80",
        "citySlug": "paris",
        "placeSlug": undefined
      },
      {
        "name": "Le Cinq",
        "description": "Three stars under Christian Le Squer inside the Four Seasons George V, with gold leaf, oversized florals and a clientele that skews international. The cooking is the most classically French on this list — the grand marnier soufflé is non-negotiable. It can feel like dining inside a wedding cake, but the €210 lunch menu is one of the best three-star deals in town.",
        "address": "31 Avenue George V, 75008 Paris",
        "rating": 4.8,
        "image": "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=800&q=80",
        "citySlug": "paris",
        "placeSlug": undefined
      }
    ]
  },
  {
    "title": "Best Sushi in Paris 2025",
    "slug": "best-sushi-paris",
    "city": "Paris",
    "citySlug": "paris",
    "category": "Restaurants",
    "coverImage": "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=1200&q=80",
    "publishedAt": "2026-05-27",
    "readingTime": 8,
    "metaDescription": "Where to eat real sushi in Paris in 2025: five honest picks from a 12-seat omakase counter to a reliable Rue Sainte-Anne lunch.",
    "intro": "Paris doesn't have Tokyo's fish market, and most of the city's sushi is bad — sad supermarket trays and conveyor-belt chains pretending to be Japanese. But a small group of chefs, mostly trained in Japan, are quietly doing serious work between Opéra and the Marais. This guide is for travelers who'd rather skip the tourist-trap maki and spend their euros on a proper edomae counter, or at least a clean, well-sourced lunch set.",
    "body": "## Why Paris for best sushi paris\n\nThe heart of Japanese Paris sits around **Rue Sainte-Anne** in the 2nd arrondissement, a five-minute walk from the Palais Royal. Expect to spend anywhere from €25 for a solid lunch chirashi to €280 for a full omakase. Spring and autumn are easiest for walk-ins; December books out weeks ahead.\n\n| Place | Price | Best For | Vibe |\n|-------|-------|----------|------|\n| Jin | €180–€280 | Special-occasion omakase | Hushed, formal counter |\n| Sushi B | €120–€200 | Refined date night | Tiny, eight-seat |\n| Blueprint by Yamamoto | €90–€150 | Modern edomae | Bright, design-forward |\n| Aki | €25–€45 | Quick reliable lunch | Casual, busy |\n| Kinugawa Vendôme | €70–€140 | Business dinner | Polished, old-school |\n\n## Detailed Reviews\n\n### 1. Jin\n\nThis is the closest Paris gets to a Ginza counter, and it has the Michelin star to match. Chef Takuya Watanabe flies fish in from Toyosu twice a week, and the rice — seasoned with red vinegar — is the real reason to come. Service is so quiet you can hear the knife.\n\nThe room only seats fourteen, and the staff occasionally tip into stiffness, especially if you arrive late. Order the **otoro nigiri** and the **steamed abalone** if it's on that night's menu.\n\n**Best for:** anniversaries, sushi obsessives, anyone who's been to Sukiyabashi Jiro and wants the Paris equivalent\n**Local tip:** Lunch omakase is roughly €180 vs €280 at dinner — same chef, same fish, smaller course count. Book three weeks out.\n\n### 2. Sushi B\n\nTucked on a quiet corner near Square Louvois, Sushi B feels like a secret even though it's also Michelin-starred. Eight seats, one chef, a counter of pale hinoki wood. The pacing is slow on purpose.\n\nThe **kohada** (gizzard shad) here is some of the best outside Japan — properly cured, not just sliced raw. Wines by the glass are limited, so commit to the sake pairing or bring cash for the bottle list.\n\n**Best for:** couples who want intimacy without theatrics\n**Local tip:** Request a corner seat when booking — the middle two stools get crowded elbows on a full night.\n\n### 3. Blueprint by Yamamoto\n\nChef Kenta Yamamoto opened this place after years at the more traditional Sushi Yoshinaga, and it shows in the looser format. There's a tasting menu, but you can also order à la carte at the counter, which most omakase places won't let you do.\n\nThe room is brighter and younger than Jin or Sushi B, with a small natural-wine list that actually works with the food. Try the **aji nigiri with grated ginger and chive** — a signature.\n\n**Best for:** a first proper sushi dinner in Paris, or anyone tired of stiff service\n**Local tip:** Tuesday and Wednesday nights are noticeably calmer; Fridays the room gets loud fast.\n\n### 4. Aki\n\nAki is the lunch spot every Japanese expat in Paris already knows. It's not a destination omakase — it's a packed canteen on Rue Sainte-Anne that does honest sushi sets for under €30. There's almost always a line by 12:15.\n\nGo for the **chirashi don** with salmon, tuna and yellowtail, or the grilled mackerel set if you want something hot. Skip the California rolls — they exist on the menu, but no one who eats here orders them.\n\n**Best for:** solo travelers, budget lunches, jet-lagged arrivals\n**Local tip:** Arrive before 12 or after 2. Cash speeds things up, though they take cards now.\n\n### 5. Kinugawa Vendôme\n\nKinugawa has been around since the 80s, which in Paris sushi terms makes it ancient. The Vendôme branch was redesigned a few years back and now looks more like a quiet hotel restaurant than a sushi-ya. The fish is consistent rather than thrilling.\n\nWhat you're paying for is reliability and the address — five minutes from Place Vendôme, easy for a pre-theatre dinner. The **black cod miso** is the dish to get; the nigiri selection is fine but not the strength.\n\n**Best for:** business dinners, older relatives, anyone who wants a tablecloth\n**Local tip:** Lunch bento sets at €48 are the smart-value move. Avoid the cocktail menu — overpriced and forgettable.\n\n## Local Tips for best sushi paris\n\n- Book the serious counters (Jin, Sushi B) at least two weeks ahead — they release tables on a rolling basis, often on Mondays.\n- Mondays many Japanese restaurants in Paris are closed; Aki opens, most of the omakase spots do not.\n- If you're spending real money, do lunch instead of dinner — same chef, often 30–40% cheaper.\n- Combine a Rue Sainte-Anne meal with a walk through the **Galerie Vivienne** passage and an espresso at **Café Kitsuné** in the Palais Royal gardens.\n\n## FAQ\n\n### Q: Is sushi in Paris worth it or should I wait until Tokyo?\nA: For everyday sushi, wait. For omakase at Jin or Sushi B, Paris is genuinely competitive — both chefs trained in Japan and source from Toyosu. You'll pay 20–30% more than Tokyo for similar quality.\n\n### Q: How far in advance do I need to book the top spots?\nA: Jin and Sushi B want two to three weeks for weekend dinners, less for weekday lunches. Blueprint and Kinugawa usually have tables within a few days. Aki doesn't take reservations.\n\n### Q: Where should I go for sushi if I'm vegetarian?\nA: None of these are great for strict vegetarians — sushi in Paris leans hard on fish. Blueprint is the most flexible and will build a vegetable-focused counter menu if you ask when booking.\n\n## The Verdict\n\n**Best for couples:** Sushi B, for the eight-seat quiet and the kohada.\n**Best for budget:** Aki — a €28 chirashi that beats most €60 sushi sets in town.\n**Best for first-timers:** Blueprint by Yamamoto, modern enough not to feel intimidating, serious enough to remember.\n**Best for locals:** Jin at lunch, when the regulars come in and the chef talks more.",
    "places": [
      {
        "name": "Jin",
        "description": "A hushed fourteen-seat counter behind a discreet door near the Tuileries, Jin holds one of only a handful of Michelin stars given to sushi in Europe. Chef Watanabe's red-vinegar rice and twice-weekly Toyosu shipments are the draw, especially the otoro nigiri. Service can verge on chilly if you arrive late, and the bill climbs fast at dinner.",
        "address": "6 Rue de la Sourdière, 75001 Paris",
        "rating": 4.8,
        "image": "https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=800&q=80",
        "citySlug": "paris",
        "placeSlug": undefined
      },
      {
        "name": "Sushi B",
        "description": "An eight-seat hinoki counter on a quiet corner near Square Louvois, Sushi B trades theatrics for precision and slow pacing. The kohada here rivals anything outside Japan, and the room feels like a secret even with a Michelin star. The wine-by-glass list is thin — go sake or bottle.",
        "address": "5 Rue Rameau, 75002 Paris",
        "rating": 4.7,
        "image": "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800&q=80",
        "citySlug": "paris",
        "placeSlug": undefined
      },
      {
        "name": "Blueprint by Yamamoto",
        "description": "A bright, design-forward sushi-ya from chef Kenta Yamamoto with a looser format than most Paris omakase rooms. You can order à la carte at the counter, and the natural-wine list actually pairs with the food. The aji nigiri with ginger and chive is the signature; Tuesday nights are the calmest.",
        "address": "10 Rue Saint-Marc, 75002 Paris",
        "rating": 4.6,
        "image": "https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=800&q=80",
        "citySlug": "paris",
        "placeSlug": undefined
      },
      {
        "name": "Aki",
        "description": "The packed Rue Sainte-Anne canteen every Japanese expat in Paris already knows about, with a line out the door by 12:15. Honest sushi sets and a chirashi don under €30, plus hot dishes like grilled mackerel for cold days. The California rolls on the menu are not why anyone comes.",
        "address": "11 bis Rue Sainte-Anne, 75001 Paris",
        "rating": 4.4,
        "image": "https://images.unsplash.com/photo-1607301405390-d831c242f59b?w=800&q=80",
        "citySlug": "paris",
        "placeSlug": undefined
      },
      {
        "name": "Kinugawa Vendôme",
        "description": "A Paris institution since the 80s, now redesigned to feel more like a hotel restaurant than a sushi counter. Five minutes from Place Vendôme, it's the reliable pick for business dinners and tablecloth nights rather than thrilling fish. The black cod miso is the dish to order; the €48 lunch bento is the smart-value move.",
        "address": "9 Rue du Mont Thabor, 75001 Paris",
        "rating": 4.3,
        "image": "https://images.unsplash.com/photo-1564489563601-c53cfc451e93?w=800&q=80",
        "citySlug": "paris",
        "placeSlug": undefined
      }
    ]
  },
  {
    "title": "Top Cocktail Bars in Paris",
    "slug": "cocktail-bars-paris",
    "city": "Paris",
    "citySlug": "paris",
    "category": "Bars",
    "coverImage": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=1200&q=80",
    "publishedAt": "2026-05-28",
    "readingTime": 8,
    "metaDescription": "Five Paris cocktail bars worth your evening — from speakeasies in Pigalle to riverside terraces. Real prices, honest tips, no fluff.",
    "intro": "It's a Tuesday at 9pm in Pigalle, and there's already a line outside an unmarked door on Rue Frochot. Paris doesn't do cocktail bars like London or New York — they're smaller, quieter, and the bartenders usually have opinions. This guide is for travelers who'd rather skip the Champs-Élysées tourist traps and drink where the industry crowd actually goes after their shifts. Expect to pay €14–22 per drink, and yes, that's worth it when the bar is doing it right.",
    "body": "## Why Paris for cocktail bars paris\n\nParis quietly built one of Europe's best cocktail scenes over the last fifteen years, mostly concentrated around Pigalle, the 11th, and pockets of the Marais. Most bars open around 6pm and get serious after 10. Budget €15–20 per drink at the good places, and book ahead on weekends — these rooms are small.\n\n| Place | Price | Best For | Vibe |\n|-------|-------|----------|------|\n| Little Red Door | €18 | Concept cocktails | Dark, intimate |\n| Candelaria | €14 | After-work crowd | Hidden speakeasy |\n| Bisou | €16 | No-menu experience | Cozy, conversational |\n| Le Syndicat | €15 | French spirits only | Graffiti-covered dive |\n| Danico | €17 | Italian-leaning drinks | Elegant courtyard |\n\n## Detailed Reviews\n\n### 1. Little Red Door\n\nThis Haut-Marais bar has been on the World's 50 Best Bars list for years now, and the team rebuilds the menu around a fresh concept every eighteen months. The current iteration ties each drink to a French artisan — a beekeeper, a salt harvester, a cheesemaker. The room is small and low-lit, with a long banquette down one wall. It can feel a bit serious if you're just looking for a casual round.\n**Best for:** Drink nerds and curious solo travelers who want to chat with the bartender.\n**Local tip:** Go on a Monday or Tuesday around 7pm — by 10pm on a Friday you'll wait 40 minutes for a seat.\n\n### 2. Candelaria\n\nWalk into what looks like a taqueria on Rue de Saintonge, push through the back door, and you're in one of the original Paris speakeasies. It opened in 2011 and still pulls a sharp crowd of locals, expats, and off-duty bartenders. The mezcal list is genuinely good, and the **Guêpe Verte** (tequila, agave, cucumber, coriander, chili) has been on the menu since day one for good reason.\n**Best for:** A first proper cocktail in Paris, especially if you're staying in the Marais.\n**Local tip:** Order tacos from the front taqueria and bring them to the bar — staff are fine with it and you'll need food by drink three.\n\n### 3. Bisou\n\nNo menu. You tell the bartender what you like — spirits, flavors, mood — and they build something. It sounds gimmicky until you're sitting at the bar in this tiny Boulevard des Filles du Calvaire room watching them work with fresh herbs and fruit pulled from baskets behind the counter.\n**Best for:** Couples and anyone tired of reading 30-page cocktail menus.\n**Local tip:** Be specific. \"Something refreshing\" gets you a generic answer; \"gin, floral, not too sweet, a little bitter\" gets you something memorable.\n\n### 4. Le Syndicat\n\nThe storefront is covered in flyposters and looks closed — that's intentional. Inside, the rule is strict: only French spirits. Calvados, Cognac, Armagnac, Chartreuse, lesser-known stuff from Brittany and the Jura. The bartenders are good at translating that into drinks that don't feel like a chemistry experiment.\n**Best for:** Drinkers who already know their negroni and want something new.\n**Local tip:** The bar is in a sketchy stretch of the 10th near Strasbourg-Saint-Denis — take a cab back if you stay past midnight.\n\n### 5. Danico\n\nTucked inside the Galerie Vivienne passage, Danico has the prettiest setting of the five — a green-tiled bar, a glass-roofed courtyard, and Italian-influenced drinks from Nico de Soto's team. Order the **Mary Pickford** or anything involving their house-made cordials. It draws a more dressed-up crowd than the Marais bars, leaning fashion and finance.\n**Best for:** A date night or a drink before dinner in the 2nd.\n**Local tip:** The covered passage closes around 10pm, so enter from the Rue des Petits-Champs side after that.\n\n## Local Tips for cocktail bars paris\n\n- Book ahead for Friday and Saturday — Little Red Door and Bisou take reservations through their websites, and walk-ins after 9pm rarely work.\n- Tipping isn't required but rounding up €1–2 per drink is normal and noticed.\n- Skip the \"signature\" cocktails at hotel bars on the Champs-Élysées — you'll pay €25 for something worse than what Candelaria charges €14 for.\n- Combine Little Red Door and Candelaria in one night — they're a seven-minute walk apart in the Marais.\n- Most bars don't serve real food, just snacks. Eat dinner first or you'll regret it.\n\n## FAQ\n\n### Q: How much does a cocktail cost in Paris?\nA: Expect €14–18 at a good cocktail bar, €20–22 at the high end like Little Red Door's seasonal menu. Hotel bars and tourist areas charge €22–28 for comparable or worse drinks. Tap water comes free with any order — just ask for une carafe d'eau.\n\n### Q: Do Paris cocktail bars require reservations?\nA: Most don't strictly require them, but the well-known ones fill up fast on Thursday through Saturday. Little Red Door, Bisou, and Danico all take online bookings and it's worth doing 2–3 days ahead. Le Syndicat and Candelaria are walk-in only — arrive before 8pm if you want a seat.\n\n### Q: What's the best cocktail bar in Paris for first-time visitors?\nA: Candelaria is the easiest entry point — central Marais location, no dress code, English-speaking staff, and you can grab tacos before or during. If you want something more polished and you're already comfortable with cocktail bars, go to Little Red Door instead.\n\n## The Verdict\n\nFor couples, **Bisou** wins — the no-menu format gets people talking, and the room is small enough to feel like your own. Budget travelers should aim for **Candelaria**, where €14 buys you a drink that holds up against anywhere in the city. First-timers should start at **Little Red Door** for the concept menu, then walk over to **Candelaria** to keep the night going. And if you want to drink where Paris bartenders drink on their nights off, that's **Le Syndicat**, no question.",
    "places": [
      {
        "name": "Little Red Door",
        "description": "A dimly lit Haut-Marais bar that consistently ranks among the world's best, with a small banquette-lined room that feels more like a private apartment than a cocktail destination. The team reinvents the entire menu every eighteen months around a single theme — recent iterations have spotlighted French artisans and natural raw materials. Service can lean serious, so it's not the place for a loud catch-up with friends.",
        "address": "60 Rue Charlot, 75003 Paris",
        "rating": 4.7,
        "image": "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&q=80",
        "citySlug": "paris",
        "placeSlug": undefined
      },
      {
        "name": "Candelaria",
        "description": "Push through the back door of an unassuming taqueria on Rue de Saintonge and you'll find one of Paris's original speakeasy-style cocktail bars, open since 2011. The mezcal and tequila lineup is unusually deep for Paris, and the Guêpe Verte has been on the menu since opening for good reason. It gets loud and packed after 10pm on weekends — go early if you want to actually talk.",
        "address": "52 Rue de Saintonge, 75003 Paris",
        "rating": 4.6,
        "image": "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800&q=80",
        "citySlug": "paris",
        "placeSlug": undefined
      },
      {
        "name": "Bisou",
        "description": "A tiny room on Boulevard des Filles du Calvaire with no menu — you tell the bartender what you want and they build it from fresh herbs, fruits, and a deep back bar. The bartenders are genuinely skilled at turning vague descriptions into precise drinks, which makes this feel more collaborative than most cocktail experiences. The flip side: if you can't articulate what you like, you might end up with something generic.",
        "address": "15 Boulevard du Temple, 75003 Paris",
        "rating": 4.7,
        "image": "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=800&q=80",
        "citySlug": "paris",
        "placeSlug": undefined
      },
      {
        "name": "Le Syndicat",
        "description": "The flypostered facade looks abandoned — that's the point. Inside, the rule is strict French spirits only: Calvados, Cognac, Armagnac, Chartreuse, and obscure regional eaux-de-vie turned into seriously good cocktails. The location near Strasbourg-Saint-Denis is rough at night, so plan your way home before you sit down.",
        "address": "51 Rue du Faubourg Saint-Denis, 75010 Paris",
        "rating": 4.5,
        "image": "https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=800&q=80",
        "citySlug": "paris",
        "placeSlug": undefined
      },
      {
        "name": "Danico",
        "description": "Hidden inside the 19th-century Galerie Vivienne, Danico has the most beautiful setting of any cocktail bar in central Paris, with a green-tiled bar and glass-roofed courtyard. The menu leans Italian thanks to founder Nico de Soto, with house-made cordials and refined twists on classics like the Mary Pickford. It draws a more polished, dressed-up crowd than the Marais bars.",
        "address": "6 Rue Vivienne, 75002 Paris",
        "rating": 4.6,
        "image": "https://images.unsplash.com/photo-1525268323446-0505b6fe7778?w=800&q=80",
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
