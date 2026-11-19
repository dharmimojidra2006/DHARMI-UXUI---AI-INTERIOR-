import { ProjectCaseStudy } from '../types';

export const PROJECTS: ProjectCaseStudy[] = [
  {
    id: 'rc-spa-retreat',
    number: '01',
    title: 'Adaptive Reuse: Spa & Wellness Retreat',
    subtitle: 'Existing Heritage Building Transformation | Ahmedabad, Gujarat',
    category: 'adaptive-reuse',
    categoryLabel: 'Adaptive Reuse / Spa & Wellness Retreat',
    location: 'Mirzapur, Ahmedabad, Gujarat',
    year: '',
    heroImage: '/assets/aistudio/image_d3f5a247.png',
    summary: 'Adaptive reuse of the existing R.C. College of Commerce building in Mirzapur, Ahmedabad, into a Spa and Wellness Retreat—retaining the building’s historic character while accommodating spa and therapy rooms, yoga and meditation spaces, hydrotherapy, a café, and relaxation areas.',
    scope: [
      'Project Brief & Concept Brief',
      'Space Planning & Design Development',
      'Mood Board & Material Atmosphere',
      'Ground & First Floor Rendered Plans',
      'Sections AA’–DD’ & 3D Interior Views'
    ],

    introduction: 'The project involved the adaptive reuse of the existing R.C. College of Commerce building in Mirzapur, Ahmedabad, into a Spa and Wellness Retreat. The task was to study the existing structure, its surroundings, climatic conditions, and architectural features to identify its potential and limitations.',

    designBrief: {
      clientOrContext: '01 | Adaptive Reuse: Spa & Wellness Retreat — R.C. College of Commerce, Mirzapur, Ahmedabad',
      challenge: 'Retaining the existing architectural character of the heritage building while adapting its spaces to meet functional, environmental, and user requirements for a wellness retreat.',
      objectives: [
        'Study the existing structure, its surroundings, climatic conditions, and architectural features to identify potential and limitations.',
        'Accommodate wellness facilities including spa and therapy rooms, yoga and meditation spaces, hydrotherapy, a café, and relaxation areas.',
        'Respond to local climate, natural light, ventilation, and user needs to create a comfortable, calm, and restorative environment.'
      ]
    },

    siteContext: {
      locationDetails: 'Existing R.C. College of Commerce building in Mirzapur, Ahmedabad, Gujarat.',
      microclimate: 'Design responds to local climatic conditions, existing architectural features, natural light, and ventilation.',
      culturalContext: 'Heritage brick façade, arched windows, domed corner towers, and shaded verandahs retained as the architectural vessel.'
    },

    research: {
      methodology: 'Case-study learnings and site analysis studying the existing structure, surroundings, climatic conditions, and architectural features.',
      insights: [
        'Identifying structural potential and limitations across Ground Floor and First Floor footprints.',
        'Organising spaces into spa and therapy, meditation and yoga, hydrotherapy, landscape and open areas, café and lounge, and services.'
      ]
    },

    userStudy: [
      {
        role: 'Wellness & Spa Guests',
        needs: 'Calm, comfortable, and restorative wellness experiences connected with light, water, and open landscape.',
        spatialResponse: 'Dedicated Spa / Massage Area, Swimming Pool, Meditation Space, Zen Garden, Restaurant, and Deluxe Rooms.'
      }
    ],

    conceptDevelopment: {
      primaryMetaphor: 'The concept focuses on transforming the existing R.C. College building into a Spa and Wellness Retreat through adaptive reuse.',
      spatialPrinciples: [
        'Wellness Programme spanning spa and therapy rooms, yoga and meditation spaces, hydrotherapy, a café, and relaxation areas.',
        'Zoning & Space Distribution organising therapy, meditation, hydrotherapy, landscape and open areas, café and lounge, and services.',
        'Responsive design shaped around existing building structure, site conditions, climate, natural light, ventilation, and user requirements.'
      ]
    },

    ideation: {
      explorations: [
        'Mood Board combining biophilic hydrotherapy imagery with brick, stone, lime plaster, warm timber, and botanical foliage.',
        'Ground & First Floor rendered planning connecting heritage wings with Villa 01, Villa 02, Swimming Pool, Spa / Massage Area, Meditation Space, and Zen Garden.',
        'Architectural Sections AA’, BB’, CC’, and DD’ plus 3D interior visualisations for Spa Room, Restaurant, and Deluxe Room.'
      ],
      evolution: 'Progressed from documenting the existing R.C. College site and climatic context to mood board curation, two-level spatial planning, sections, and 3D views.'
    },

    zoning: {
      publicToPrivateRatio: 'Spa & Therapy · Meditation & Yoga · Hydrotherapy · Landscape & Open Areas · Café & Lounge · Services',
      zones: [
        { name: 'Spa & Therapy', percentage: 25, description: 'Dedicated spa / massage pavilion and treatment suites.' },
        { name: 'Meditation, Yoga & Zen Garden', percentage: 20, description: 'Meditation Space and landscaped Zen Garden framed by existing trees.' },
        { name: 'Hydrotherapy & Swimming Pool', percentage: 20, description: 'Central Swimming Pool deck connecting the heritage building and wellness pavilions.' },
        { name: 'Café, Lounge & Guest Suites', percentage: 35, description: 'Café / restaurant dining, relaxation areas, and accommodation including Villa 01, Villa 02 & Deluxe Rooms.' }
      ]
    },

    spatialPlanning: {
      circulationConcept: 'The existing building layout was adapted to accommodate the proposed wellness activities, illustrating the distribution of spaces and their connection within the building and open grounds.',
      keyTransitions: [
        'Arrival into the main R.C. College heritage building and central octagonal courtyard atrium.',
        'Garden threshold opening toward the Swimming Pool deck, Villa 01 & Villa 02, Spa / Massage Area, Meditation Space, and Zen Garden.'
      ]
    },

    materialPalette: [
      { name: 'Exposed Clay Brick & Stone', category: 'Envelope & Structure', description: 'Original red brick character complemented by textured natural stone walls and paving.', finish: 'Natural Aged Matte', colorHex: '#9C4B33' },
      { name: 'Textured Lime Plaster', category: 'Interior Walls', description: 'Tactile light neutral plaster surfaces shown across the Spa Room and Deluxe Room.', finish: 'Raw Hand-Trowelled', colorHex: '#DDD6CA' },
      { name: 'Warm Fluted Timber', category: 'Millwork & Battens', description: 'Vertical wood slats, massage tables, vanity cabinetry, and dining furnishings.', finish: 'Oiled Timber', colorHex: '#7D4E32' },
      { name: 'Living Botanical Foliage', category: 'Biophilic Landscape', description: 'Green walls, courtyards, planters, and mature site trees framing wellness spaces.', finish: 'Natural Foliage', colorHex: '#4E6B47' }
    ],

    furnitureAndLighting: {
      lightingStrategy: 'Daylight modulation paired with warm linear wall sconces in Spa Rooms and pendant drops in the Restaurant.',
      keyPieces: [
        'Twin timber massage tables with dark vanity cabinetry and freestanding stone soaking tubs in the Spa Room',
        'Square and long group dining tables with upholstered seating in the Restaurant',
        'Deluxe Suite bed with sofa seating, double vanity, glazed bathtub garden, and balcony firepit lounge'
      ],
      fixtures: ['Warm cylindrical wall sconces', 'Suspended restaurant filament pendants', 'Brass sanitaryware & blackened steel framing']
    },

    technicalDrawings: [],

    visualizations: [
      { perspective: 'Section AA’', caption: 'Full longitudinal section through the R.C. College wing, central atrium courtyard tree, and ground/upper wellness rooms.', imageUrl: '/assets/rc-spa-extracted/section_aa.png' },
      { perspective: 'Ground Floor Rendered Plan', caption: 'Adaptive reuse layout integrating the main heritage building, swimming pool, villas, spa pavilion, meditation space, and Zen garden.', imageUrl: '/assets/rc-spa-extracted/plan_ground_floor.png' },
      { perspective: 'Spa Room 3D View', caption: 'Therapy room with vertical timber battens, planted green wall, daylight window, and exposed brick.', imageUrl: '/assets/rc-spa-extracted/view_spa_01.png' },
      { perspective: 'Deluxe Room Exterior Lounge', caption: 'Brick courtyard balcony featuring curved seating around a firepit opening into the Deluxe suite.', imageUrl: '/assets/rc-spa-extracted/view_deluxe_02_firepit.png' }
    ],

    finalDesign: {
      description: 'The proposed wellness retreat adapts the existing R.C. College of Commerce building in Mirzapur, Ahmedabad, balancing heritage preservation with calm, climate-responsive wellness environments.',
      deliverables: [
        'Project Brief & Concept Brief',
        'Space Planning & Design Development (Steps 1–4)',
        '7 Existing Site & Heritage Building Photographs',
        'Material & Atmosphere Mood Board',
        'Ground Floor & First Floor Rendered Plans',
        'Sections AA’, BB’, CC’ & DD’',
        '3D Views — Spa Room, Restaurant & Deluxe Room'
      ]
    },

    reflection: {
      learnings: 'Studying an existing structure, its climate, and architectural character to adapt educational halls into calm, restorative wellness environments.',
      academicSignificance: '01 | Adaptive Reuse: Spa & Wellness Retreat — Mirzapur, Ahmedabad'
    },

    adaptiveReuseCaseStudy: {
      subHeader: 'Existing Heritage Building Transformation | Ahmedabad, Gujarat',
      projectBrief: 'The project involved the adaptive reuse of the existing R.C. College of Commerce building in Mirzapur, Ahmedabad, into a Spa and Wellness Retreat. The task was to study the existing structure, its surroundings, climatic conditions, and architectural features to identify its potential and limitations. Based on this analysis, the building was adapted to accommodate wellness facilities such as spa and therapy rooms, yoga and meditation spaces, a café, and relaxation areas. The design focused on retaining the existing character of the building while modifying the spaces to meet functional, environmental, and user requirements.',
      conceptBrief: 'The concept focuses on transforming the existing R.C. College building into a Spa and Wellness Retreat through adaptive reuse. Based on the case-study learnings and site analysis, the design responds to the local climate, existing architectural features, natural light, ventilation, and user needs to create a comfortable, calm, and restorative environment while making effective use of the existing structure.',
      spacePlanning: [
        {
          number: '1',
          title: 'Wellness Programme',
          description: 'The existing educational building was planned to accommodate wellness functions, including spa and therapy rooms, yoga and meditation spaces, hydrotherapy, a café, and relaxation areas.'
        },
        {
          number: '2',
          title: 'Zoning & Space Distribution',
          description: 'The spaces were organised according to their functions, including spa and therapy, meditation and yoga, hydrotherapy, landscape and open areas, café and lounge, and services.'
        },
        {
          number: '3',
          title: 'Ground & First Floor Planning',
          description: 'The existing building layout was adapted to accommodate the proposed wellness activities. The floor plans illustrate the distribution of spaces and their connection within the building.'
        },
        {
          number: '4',
          title: 'Design Development',
          description: 'The design process considered the existing building structure, site conditions, climate, natural light, ventilation, and user requirements while developing the proposed wellness retreat.'
        }
      ],
      sitePhotos: [
        {
          id: 'rc-site-01',
          plate: 'Site 01',
          title: 'R.C. College Heritage Front Façade & Corner Tower',
          subtitle: 'Existing exposed red brick institutional elevation with arched openings and domed minaret tower',
          imageUrl: '/assets/rc-spa-extracted/site_01_facade.png',
          category: 'site-photo'
        },
        {
          id: 'rc-site-02',
          plate: 'Site 02',
          title: 'Brick Clock Tower & Arched Staircase Core',
          subtitle: 'Vertical brick masonry detailing framed by mature campus canopy',
          imageUrl: '/assets/rc-spa-extracted/site_02_tower.png',
          category: 'site-photo'
        },
        {
          id: 'rc-site-03',
          plate: 'Site 03',
          title: 'Two-Storey Arched Verandah Elevations',
          subtitle: 'Weathered brick arcades and shaded colonnade balconies facing the grounds',
          imageUrl: '/assets/rc-spa-extracted/site_03_colonnade.png',
          category: 'site-photo'
        },
        {
          id: 'rc-site-04',
          plate: 'Site 04',
          title: 'Plinth Steps & Ground-Level Masonry Arches',
          subtitle: 'Existing stepped plinth and wrought-iron arched window grilles in red brick',
          imageUrl: '/assets/rc-spa-extracted/site_04_arches.png',
          category: 'site-photo'
        },
        {
          id: 'rc-site-05',
          plate: 'Site 05',
          title: 'Polygonal End Bay & Campus Open Ground',
          subtitle: 'Full-height arched bays opening onto the surrounding open campus courtyard',
          imageUrl: '/assets/rc-spa-extracted/site_05_bay.png',
          category: 'site-photo'
        },
        {
          id: 'rc-site-06',
          plate: 'Site 06',
          title: 'Existing Outbuilding & Mature Root Growth',
          subtitle: 'Secondary weathered perimeter structure studied during site documentation',
          imageUrl: '/assets/rc-spa-extracted/site_06_ruin.png',
          category: 'site-photo'
        },
        {
          id: 'rc-site-07',
          plate: 'Site 07',
          title: 'Original Classroom & Interior Arcade Passage',
          subtitle: 'Existing internal wall thickness, arched openings, and blackboard classroom shell',
          imageUrl: '/assets/rc-spa-extracted/site_07_verandah.png',
          category: 'site-photo'
        }
      ],
      moodboard: {
        id: 'rc-moodboard',
        plate: 'Board M.01',
        title: 'Spa & Wellness Retreat Mood Board',
        subtitle: 'Biophilic water sanctuaries, apothecary shelves, tactile lime plaster, woven linen, warm timber, terracotta brick, stone paving, and botanical foliage swatches',
        imageUrl: '/assets/rc-spa-extracted/moodboard_rc_spa.png',
        category: 'moodboard'
      },
      plans: {
        ground: {
          drawing: {
            id: 'rc-plan-ground',
            plate: 'Plan 01',
            title: 'Ground Floor Rendered Plan',
            subtitle: 'Adapted R.C. College ground layout (dining, reception courtyard, wellness wings), Swimming Pool, Villa 01 & Villa 02, Spa / Massage Area, Meditation Space, Zen Garden & section cut lines AA’–DD’',
            imageUrl: '/assets/rc-spa-extracted/plan_ground_floor.png',
            category: 'floor-plan'
          },
          annotations: [
            'Main Heritage Wing (Reception Atrium, Dining & Kitchen, Consultation & Therapy Rooms)',
            'Swimming Pool & Timber Deck',
            'Villa 01 & Villa 02 (Linear Plunge-Pool Suites)',
            'Spa / Massage Area Courtyard Cluster',
            'Meditation Space',
            'Zen Garden & Entry Parking',
            'Section Cut Markers: AA’, BB’, CC’, DD’'
          ]
        },
        first: {
          drawing: {
            id: 'rc-plan-first',
            plate: 'Plan 02',
            title: 'First Floor Rendered Plan',
            subtitle: 'Upper heritage wing converted into private guest suites opening onto perimeter verandahs overlooking the double-height central atrium, Swimming Pool, Spa / Massage Area & Meditation Space',
            imageUrl: '/assets/rc-spa-extracted/plan_first_floor.png',
            category: 'floor-plan'
          },
          annotations: [
            'First Floor Guest Suites & Verandah Galleries',
            'Central Atrium Void',
            'Villa 01 & Villa 02',
            'Swimming Pool',
            'Spa / Massage Area',
            'Meditation Space',
            'Zen Garden'
          ]
        }
      },
      sections: [
        {
          id: 'rc-sec-aa',
          plate: 'Section AA’',
          title: 'Section AA’ — Full Longitudinal Section',
          subtitle: 'Cut across the full width of the R.C. College heritage building showing ground-floor café/dining and therapy wings, double-height central atrium tree, upper-floor suites beneath truss roofs, and the meditation pavilion',
          imageUrl: '/assets/rc-spa-extracted/section_aa.png',
          category: 'section'
        },
        {
          id: 'rc-sec-bb',
          plate: 'Section BB’',
          title: 'Section BB’ — Pavilions & Swimming Pool Section',
          subtitle: 'Transverse cut through the modern low-rise Spa / Massage Area and Swimming Pool basin framed by existing boundary trees',
          imageUrl: '/assets/rc-spa-extracted/section_bb.png',
          category: 'section'
        },
        {
          id: 'rc-sec-cc',
          plate: 'Section CC’',
          title: 'Section CC’ — Heritage Wing & Villa Cut',
          subtitle: 'Cross-section through the café/kitchen ground wing, upper guest bedrooms, heritage domed tower silhouette in elevation, and diagonal Villa block',
          imageUrl: '/assets/rc-spa-extracted/section_cc.png',
          category: 'section'
        },
        {
          id: 'rc-sec-dd',
          plate: 'Section DD’',
          title: 'Section DD’ — Central Atrium, Pool & Pavilion Cut',
          subtitle: 'Transverse cut through the double-height central atrium with courtyard tree and arched glazing alongside the Swimming Pool umbrellas and Villa pavilion',
          imageUrl: '/assets/rc-spa-extracted/section_dd.png',
          category: 'section'
        }
      ],
      interiorViews: {
        spaRoom: [
          {
            id: 'rc-spa-01',
            plate: 'Spa 01',
            title: 'Twin Treatment Suite & Herbal Apothecary Console',
            subtitle: 'Wooden massage beds dressed in crisp linen, timber wall slats with cascading greenery, natural daylight window, and exposed brick',
            imageUrl: '/assets/rc-spa-extracted/view_spa_01.png',
            category: 'spa-view'
          },
          {
            id: 'rc-spa-02',
            plate: 'Spa 02',
            title: 'En-Suite Wet Room & Stone Soaking Tub',
            subtitle: 'Freestanding carved stone tub against heritage brick walls, fluted dark vanity, circular mirror with mosaic inlay, and glass shower enclosure',
            imageUrl: '/assets/rc-spa-extracted/view_spa_02.png',
            category: 'spa-view'
          },
          {
            id: 'rc-spa-03',
            plate: 'Spa 03',
            title: 'Biophilic Feature Wall & Warm Wall Sconces',
            subtitle: 'Elevated perspective showcasing rhythmic vertical timber battens, botanical vine installation, and brass cylindrical wall lights',
            imageUrl: '/assets/rc-spa-extracted/view_spa_03.png',
            category: 'spa-view'
          },
          {
            id: 'rc-spa-04',
            plate: 'Spa 04',
            title: 'Sectional Perspective — Wet Zone & Treatment Room',
            subtitle: 'Cutaway 3D view showing spatial flow between the botanical mosaic washroom and main couple’s massage room',
            imageUrl: '/assets/rc-spa-extracted/view_spa_04.png',
            category: 'spa-view'
          },
          {
            id: 'rc-spa-05',
            plate: 'Spa 05',
            title: 'Daylit Massage Beds & Plaster Textures',
            subtitle: 'Side perspective highlighting the angled timber massage bed joinery, stone flagstone floor, and rough-trowelled plaster',
            imageUrl: '/assets/rc-spa-extracted/view_spa_05.png',
            category: 'spa-view'
          }
        ],
        restaurant: [
          {
            id: 'rc-rest-01',
            plate: 'Restaurant 01',
            title: 'Wellness Restaurant — Warm Earthy Dining Hall',
            subtitle: 'Full-height arched bays framing the heritage brick-and-plaster envelope with cluster tables and brass pendant lighting',
            imageUrl: '/assets/rc-spa-extracted/view_restaurant_01.png',
            category: 'restaurant-view'
          },
          {
            id: 'rc-rest-02',
            plate: 'Restaurant 02',
            title: 'Daylit Courtyard Dining Gallery',
            subtitle: 'Tall vertical window apertures casting angled sunlight across group and couple seating arrangements',
            imageUrl: '/assets/rc-spa-extracted/view_restaurant_02.png',
            category: 'restaurant-view'
          }
        ],
        deluxePlan: {
          id: 'rc-deluxe-plan',
          plate: 'Suite Plan',
          title: 'Deluxe Room Rendered Axonometric Layout',
          subtitle: 'Integrated sleeping zone, lounge sofa, study nook, double-basin bath, private planted open-to-sky tub court, and outdoor firepit terrace',
          imageUrl: '/assets/rc-spa-extracted/view_deluxe_plan.png',
          category: 'deluxe-plan'
        },
        deluxeRoom: [
          {
            id: 'rc-deluxe-01',
            plate: 'Deluxe 01',
            title: 'Lofty Living & Dressing Zone',
            subtitle: 'Double-height exposed brick and textured stone interior with floor lamps, sofa lounge, and tufted bench',
            imageUrl: '/assets/rc-spa-extracted/view_deluxe_01.png',
            category: 'deluxe-view'
          },
          {
            id: 'rc-deluxe-02',
            plate: 'Deluxe 02',
            title: 'Private Walled Patio & Firepit Lounge',
            subtitle: 'Brick-enclosed balcony terrace with curved banquette seating centered on an outdoor firepit beside floor-to-ceiling sliding glass',
            imageUrl: '/assets/rc-spa-extracted/view_deluxe_02_firepit.png',
            category: 'deluxe-view'
          },
          {
            id: 'rc-deluxe-03',
            plate: 'Deluxe 03',
            title: 'Bedroom Night Lighting Study',
            subtitle: 'Warm linear bedside pendants, textured stone headboard wall, brick side piers, and botanical framed artwork',
            imageUrl: '/assets/rc-spa-extracted/view_deluxe_03_bedroom_night.png',
            category: 'deluxe-view'
          },
          {
            id: 'rc-deluxe-04',
            plate: 'Deluxe 04',
            title: 'Open-to-Sky Private Bathtub Garden',
            subtitle: 'Freestanding white soaking tub nestled amidst dense foliage and planter boxes within brick privacy walls',
            imageUrl: '/assets/rc-spa-extracted/view_deluxe_04_bath_above.png',
            category: 'deluxe-view'
          },
          {
            id: 'rc-deluxe-05',
            plate: 'Deluxe 05',
            title: 'Glazed Threshold to Garden Bathtub',
            subtitle: 'Full-height sliding glass view connecting the timber dressing shelves into the sunlit planted bath court',
            imageUrl: '/assets/rc-spa-extracted/view_deluxe_05_bath_glass.png',
            category: 'deluxe-view'
          },
          {
            id: 'rc-deluxe-06',
            plate: 'Deluxe 06',
            title: 'Daylit Deluxe Bedroom Interior',
            subtitle: 'Natural daylight flooding from the balcony sliding doors across the stone headboard wall, rug, and study corner',
            imageUrl: '/assets/rc-spa-extracted/view_deluxe_06_bedroom_day.png',
            category: 'deluxe-view'
          },
          {
            id: 'rc-deluxe-07',
            plate: 'Deluxe 07',
            title: 'Upper Balcony Elevation & Brick Massing',
            subtitle: 'Exterior perspective of the private suite terrace with glass balustrade and curved seating in warm sunlight',
            imageUrl: '/assets/rc-spa-extracted/view_deluxe_07_balcony.png',
            category: 'deluxe-view'
          }
        ]
      }
    }
  },
  {
    id: 'market-mindfulness',
    number: '02',
    title: 'Adaptive Reuse: From Market to Mindfulness',
    subtitle: 'Existing Fruit Market Transformation | Manek Chowk, Ahmedabad',
    category: 'adaptive-reuse',
    categoryLabel: 'Adaptive Reuse / Wellness & Retail',
    location: 'Manek Chowk, Ahmedabad',
    year: '',
    heroImage: '/assets/aistudio/image_9cfe9635.png',
    summary: 'Adaptive reuse of the existing fruit market at Manek Chowk, Ahmedabad, transforming its busy market environment into a calm space for meditation, spa and relaxation, alongside a sustainable retail store offering candles and scented items made from discarded flowers from the nearby flower market.',
    scope: [
      'Project Brief & Concept Brief',
      'Space Planning & Design Development',
      'Manek Chowk Heritage Documentation',
      'CAD Floor Plan (A–A’ & B–B’)',
      'Architectural Sections AA’ & BB’'
    ],

    introduction: 'The project involved reimagining the existing fruit market at Manek Chowk, Ahmedabad, through adaptive reuse. The task was to select a new function for the space, transforming its busy market environment into a place for meditation, spa and relaxation, along with a sustainable retail store.',

    designBrief: {
      clientOrContext: '02 | Adaptive Reuse: From Market to Mindfulness — Existing Fruit Market, Manek Chowk, Ahmedabad',
      challenge: 'Transforming a chaotic market environment into a calm space for wellness and mindful experiences while respecting the existing coffered structural bay grid and historic brick envelope.',
      objectives: [
        'Transform the busy Manek Chowk fruit market into a place for meditation, spa and relaxation, along with a sustainable retail store.',
        'Repurpose the central area between the surrounding market spaces as a quiet meditation zone under the clerestory monitor skylight.',
        'Link the nearby flower market’s waste stream with the sustainable retail store through candles and scented items crafted from discarded flowers.'
      ]
    },

    siteContext: {
      locationDetails: 'Existing covered fruit market structure at Manek Chowk, Old Ahmedabad.',
      microclimate: 'Existing coffered concrete grid slab, perimeter brick colonnade arches, and raised central clerestory skylight dome channeling zenithal daylight.',
      culturalContext: 'Embedded within Manek Chowk’s active fruit and nearby flower market ecosystem.'
    },

    research: {
      methodology: 'On-site photographic documentation of the historic brick façade, coffered structural bays, central skylight dome, and daily fruit market activity.',
      insights: [
        'The existing coffered column-and-beam structure naturally establishes clear structural bays separating peripheral rooms from the tall central hall.',
        'The central raised clerestory monitor filters natural daylight into the heart of the market, making it ideal for quiet meditation.'
      ]
    },

    userStudy: [
      {
        role: 'Meditation & Spa Visitors',
        needs: 'Quietness, relaxation, and calm mindfulness separated from surrounding street chaos.',
        spatialResponse: 'Central meditation sanctuary flanked by private spa treatment rooms and green court edges.'
      },
      {
        role: 'Sustainable Retail Patrons',
        needs: 'Direct street accessibility and curated display of locally upcycled botanical goods.',
        spatialResponse: 'Arched retail shelving galleries offering wellness products and candles made from discarded flowers.'
      }
    ],

    conceptDevelopment: {
      primaryMetaphor: 'The concept focuses on transforming a chaotic market environment into a calm space for wellness and mindful experiences. The design introduces a meditation area within the central space, alongside spa facilities and a retail store offering wellness products, including candles and scented items made from discarded flowers from the nearby flower market.',
      spatialPrinciples: [
        'Meditation Zoning: Repurposing the central area between surrounding market spaces as a place for quietness and relaxation.',
        'Spa & Wellness Facilities: Dedicated treatment suites and wet facilities carved within the structural grid.',
        'Sustainable Retail Store: Closing the circular loop by upcycling discarded flowers from the nearby flower market into candles and scented goods.'
      ]
    },

    ideation: {
      explorations: [
        'Documenting existing heritage market structure: red-brick arched elevation, coffered ceiling beams, and clerestory skylight.',
        'Zoning CAD floor plan separating Spa Suite (left wing), Central Meditation Sanctuary, and Sustainable Retail Store (right wing).',
        'Longitudinal and transverse sections AA’ & BB’ calibrating human scale, clerestory height (7000 mm), and arched retail cabinetry (1600 mm).'
      ],
      evolution: 'Evolved from observing the bustling fruit and flower trade in Manek Chowk to weaving calm meditation, spa therapy, and floral-upcycling retail into the existing heritage frame.'
    },

    zoning: {
      publicToPrivateRatio: 'Meditation Zoning · Spa & Wellness Facilities · Sustainable Retail Store',
      zones: [
        { name: 'Meditation Zoning (Central Sanctuary)', percentage: 40, description: 'Central zone beneath the raised skylight monitor dedicated to quietness and mindfulness.' },
        { name: 'Spa & Wellness Facilities', percentage: 30, description: 'Private therapy rooms, washrooms, and tranquil treatment suites along the left structural bay.' },
        { name: 'Sustainable Retail Store', percentage: 30, description: 'Arched display alcoves presenting botanical candles and scented wellness items from discarded market flowers.' }
      ]
    },

    spatialPlanning: {
      circulationConcept: 'Clear axial and perimeter circulation threads through existing structural columns, guiding visitors from active market thresholds into serene spa, meditation, and sustainable retail zones.',
      keyTransitions: [
        'Transition from historic brick market street into landscaped forecourt and arched retail galleries.',
        'Compression-to-release threshold entering the central daylit meditation sanctuary beneath the raised clerestory.'
      ]
    },

    materialPalette: [
      { name: 'Aged Market Brick & Coffered Concrete', category: 'Existing Structure', description: 'Retained masonry walls, arched window bays, and deep concrete ceiling coffers.', finish: 'Raw Weathered Matte', colorHex: '#A6543D' },
      { name: 'Lime & Clay Plaster', category: 'Interior Envelope', description: 'Soft earth-toned plaster surfaces framing calm daylight across the meditation sanctuary.', finish: 'Hand-Trowelled Matte', colorHex: '#D8CFC2' },
      { name: 'Warm Natural Timber & Linen', category: 'Furnishings & Cushions', description: 'Minimalist wooden benches, meditation mats, and textured floor cushions.', finish: 'Natural Matte', colorHex: '#C5AD91' },
      { name: 'Botanical Florals & Beeswax', category: 'Upcycled Retail Craft', description: 'Dried petals and recycled florals from the neighbouring market transformed into candles.', finish: 'Artisanal Organic', colorHex: '#8E9B77' }
    ],

    furnitureAndLighting: {
      lightingStrategy: 'Zenithal daylight admitted through the existing central skylight dome, paired with warm pendant luminaires over the meditation plinth.',
      keyPieces: [
        'Minimalist floor cushions in the central meditation sanctuary',
        'Private spa treatment bed and changing suite fixtures',
        'Arched modular retail shelving displays (1600 mm module)'
      ],
      fixtures: ['Central skylight monitor daylighting', 'Suspended dome pendant lights in meditation hall']
    },

    technicalDrawings: [],

    visualizations: [
      { perspective: 'Meditation Sanctuary Atmosphere', caption: 'Minimalist sunlit sanctuary with floor cushions and lime-washed walls.', imageUrl: '/assets/market-mindfulness-extracted/photo_05_meditation_room.png' },
      { perspective: 'Architectural CAD Plan', caption: 'Adaptive reuse layout with key dimensions and section lines A–A’ and B–B’.', imageUrl: '/assets/market-mindfulness-extracted/plan_manek_chowk.png' },
      { perspective: 'Section AA’', caption: 'Section cutting through spa suite, double-height central clerestory hall, and greenery.', imageUrl: '/assets/market-mindfulness-extracted/section_aa.png' },
      { perspective: 'Section BB’', caption: 'Section through landscaped lounge, central meditation zone, and arched retail displays.', imageUrl: '/assets/market-mindfulness-extracted/section_bb.png' }
    ],

    finalDesign: {
      description: 'The proposal reimagines Manek Chowk’s fruit market as a calm civic sanctuary combining meditation, spa wellness facilities, and a circular botanical retail store.',
      deliverables: [
        'Project Brief & Concept Brief',
        'Space Planning & Design Development (Meditation, Spa, Sustainable Retail)',
        '6 Documentation & Atmospheric Reference Photographs',
        'Dimensioned CAD Plan with Section Cut Lines A–A’ & B–B’',
        'Architectural Sections AA’ & BB’'
      ]
    },

    reflection: {
      learnings: 'Adaptive reuse in dense historic markets requires listening to existing structural bays, daylight monitors, and local circular economies such as flower-market waste streams.',
      academicSignificance: '02 | Adaptive Reuse: From Market to Mindfulness — Manek Chowk, Ahmedabad'
    },

    marketMindfulnessCaseStudy: {
      subHeader: 'Existing Fruit Market Transformation | Manek Chowk, Ahmedabad',
      projectBrief: 'The project involved reimagining the existing fruit market at Manek Chowk, Ahmedabad, through adaptive reuse. The task was to select a new function for the space, transforming its busy market environment into a place for meditation, spa and relaxation, along with a sustainable retail store.',
      conceptBrief: 'The concept focuses on transforming a chaotic market environment into a calm space for wellness and mindful experiences. The design introduces a meditation area within the central space, alongside spa facilities and a retail store offering wellness products, including candles and scented items made from discarded flowers from the nearby flower market.',
      spacePlanning: [
        {
          number: '1',
          title: 'Meditation Zoning',
          description: 'The central area between the surrounding market spaces is repurposed as a meditation zone, introducing a place for quietness and relaxation within the existing market environment.'
        },
        {
          number: '2',
          title: 'Spa & Wellness Facilities',
          description: 'Dedicated spaces accommodate spa treatments and wellness activities as part of the proposed adaptive reuse.'
        },
        {
          number: '3',
          title: 'Sustainable Retail Store',
          description: 'The retail space brings together wellness products and items created through the reuse of discarded flowers, linking the nearby flower market\'s waste stream with the new programme.'
        }
      ],
      existingMarketPhotos: [
        {
          id: 'mm-site-03',
          plate: 'Site 01',
          title: 'Historic Red-Brick Market Façade',
          subtitle: 'Existing Manek Chowk elevation featuring pointed brick arches and street market awnings',
          imageUrl: '/assets/market-mindfulness-extracted/photo_03_brick_facade.png',
          category: 'market-photo'
        },
        {
          id: 'mm-site-01',
          plate: 'Site 02',
          title: 'Existing Coffered Ceiling & Column Bay',
          subtitle: 'Original structural concrete waffle beams and heritage capital columns inside the market hall',
          imageUrl: '/assets/market-mindfulness-extracted/photo_01_ceiling_grid.png',
          category: 'market-photo'
        },
        {
          id: 'mm-site-02',
          plate: 'Site 03',
          title: 'Central Clerestory Skylight Dome',
          subtitle: 'Existing raised central monitor lantern filtering natural zenithal light over the hall',
          imageUrl: '/assets/market-mindfulness-extracted/photo_02_skylight_dome.png',
          category: 'market-photo'
        },
        {
          id: 'mm-site-04',
          plate: 'Site 04',
          title: 'Active Manek Chowk Fruit Market Context',
          subtitle: 'Existing bustling fruit market vendor stall studied prior to adaptive reuse',
          imageUrl: '/assets/market-mindfulness-extracted/photo_04_fruit_market.png',
          category: 'market-photo'
        }
      ],
      moodPhotos: [
        {
          id: 'mm-mood-01',
          plate: 'Atmosphere 01',
          title: 'Central Meditation Sanctuary',
          subtitle: 'Calm curved meditation hall with indirect cove illumination, woven rattan seating, and crystal sound bowls',
          imageUrl: '/assets/aistudio/image_4bae0b0e.png',
          category: 'mood-photo'
        },
        {
          id: 'mm-mood-02',
          plate: 'Atmosphere 02',
          title: 'Sustainable Botanical Retail Display',
          subtitle: 'Botanical fragrance counter displaying brass atomizer bells, dried florals from the nearby market, and warm backlit retail shelves',
          imageUrl: '/assets/aistudio/image_2e0acf3b.png',
          category: 'mood-photo'
        }
      ],
      plan: {
        drawing: {
          id: 'mm-cad-plan',
          plate: 'CAD Plan',
          title: 'Adaptive Reuse Ground Plan — Manek Chowk',
          subtitle: 'Dimensioned architectural CAD layout integrating Spa treatment rooms (left bay), Central Meditation Zone, organic landscape court, and Retail Zone with section cuts A–A’ and B–B’',
          imageUrl: '/assets/market-mindfulness-extracted/plan_manek_chowk.png',
          category: 'cad-plan'
        },
        dimensions: ['3346 mm', '5200 mm', '5100 mm', '6850 mm', '12688 mm', '4350 mm'],
        annotations: [
          'Left Bay: Spa Treatment Suite, Reception Desk & Restrooms (3346 · 5200 · 5200)',
          'Central Zone: Meditation Sanctuary Framed by Existing Structural Column Grid (5100 · 6850)',
          'East Perimeter: Landscaped Planting & Organic Water/Garden Pocket',
          'Lower Hall & Right Bay: Open Entry Forecourt & Retail Zone (12688 · 4350)',
          'Section Cut Lines: A — A’ and B — B’'
        ]
      },
      sections: [
        {
          drawing: {
            id: 'mm-sec-aa',
            plate: 'Section AA’',
            title: 'Section AA’ — Spa Suite, Central Clerestory Hall & Green Perimeter',
            subtitle: 'Cut through left spa treatment bay, existing coffered slab (7000 mm ceiling height), raised central skylight lantern, and interior greenery',
            imageUrl: '/assets/market-mindfulness-extracted/section_aa.png',
            category: 'section'
          },
          dimensions: ['7000 mm clear structural height', '2951 mm bay callout', '2000 mm & 500 mm interior datum levels']
        },
        {
          drawing: {
            id: 'mm-sec-bb',
            plate: 'Section BB’',
            title: 'Section BB’ — Lounge Court, Meditation Focal Wall & Arched Retail Store',
            subtitle: 'Cut showing indoor tree seating lounge (150 mm plinth), central meditation zone with sculptural panel & pendant lights, and arched botanical retail shelving (1600 mm module)',
            imageUrl: '/assets/market-mindfulness-extracted/section_bb.png',
            category: 'section'
          },
          dimensions: ['1600 mm arched retail shelving height', '150 mm central plinth & step levels', '950 mm seating datum']
        }
      ]
    }
  },

  {
    id: 'kitchen-interior',
    number: '03',
    title: 'Kitchen Interior Design',
    subtitle: 'Parallel Galley Kitchen Layout, Materiality & Product Specification',
    category: 'residential',
    categoryLabel: 'Residential / Kitchen Interior Design',
    location: 'Self-Defined Residential Studio Space',
    year: '',
    heroImage: '/assets/aistudio/download__7__eb916b79.jpg',
    summary: 'A kitchen interior design project developing an efficient, well-organised parallel galley kitchen with clear millimeter-level zoning, CAD and rendered plans and elevations, cohesive green marble and wood finishes, and specified appliances and hardware.',
    scope: [
      'Project Brief & Concept Brief',
      'Mood Board & Material Selection',
      'CAD Plans & Elevations A–B (mm)',
      'Rendered Plans & Elevations A–B',
      'Kitchen Fixtures & Product Schedule'
    ],

    introduction: 'The project involved selecting a specific kitchen design style and developing a kitchen layout within a self-defined space. The task included understanding spatial requirements, planning the kitchen layout, and selecting suitable materials and finishes to create a functional and visually cohesive design.',

    designBrief: {
      clientOrContext: '03 | Kitchen Interior Design — Parallel Galley Kitchen',
      challenge: 'Organising wet preparation, cooking, cold storage, and appliance counters within a compact parallel galley envelope while maintaining smooth workflow clearances and concealed hydraulic and pull-out storage.',
      objectives: [
        'Understand spatial requirements across cooking, preparation, washing, and pantry zones in a self-defined space.',
        'Develop an efficient parallel galley kitchen layout with detailed lower, upper, and hydraulic cabinet zoning.',
        'Coordinate countertop platforms, cabinet laminates, wall cladding, flooring, hardware, and branded kitchen appliances.'
      ]
    },

    siteContext: {
      locationDetails: 'Self-defined parallel galley kitchen geometry dimensioned in millimeters (`ALL MEASUREMENTS ARE IN MM`).',
      microclimate: 'Parallel counter walls incorporating framed backsplash aperture, chimney ducting above cooktop, and zenithal recessed ceiling planes.',
      culturalContext: 'Daily cooking workflow balancing dedicated microwave/oven, 4-burner stove, integrated sink, coffee preparation station, and side-by-side smart refrigerator.'
    },

    research: {
      methodology: 'Ergonomic galley zoning across three plan layers (Layout Plan, Plan with Lower Cabinets, Plan with Lower & Upper Cabinets) paired with Elevations A and B.',
      insights: [
        'Countertop heights calibrated at 787 mm (Elevation A) and 757 mm (Elevation B) within a 2438 mm clear ceiling height.',
        'Upper cabinets detailed at 400 mm depth and 871 mm height to preserve unobstructed working sightlines above the marble counter.'
      ]
    },

    userStudy: [
      {
        role: 'Primary Cooking & Prep User',
        needs: 'Direct triangulation between stove, integrated sink, refrigerator, and pull-out condiments without crossing paths.',
        spatialResponse: 'Triangular work zone connecting Microwave (600 mm), Elica Hob/Stove (1200 mm bay), Integrated Sink (900 mm bay), and parallel Samsung Fridge (1000 × 650 mm).'
      },
      {
        role: 'Organized Storage & Appliance User',
        needs: 'Dedicated base pull-outs for heavy pots, spices, oils, dishes, waste bin, and coffee bar equipment.',
        spatialResponse: 'Segmented base cabinetry including 300 mm rollout spice & oil, 400 mm rollout bin, 600 mm dishwasher bay, 700 mm corner pantry, and dedicated espresso counter.'
      }
    ],

    conceptDevelopment: {
      primaryMetaphor: 'The concept focuses on creating an efficient and well-organised galley kitchen, with parallel work areas designed to support smooth movement and everyday cooking activities. The selected materials and finishes complement the chosen kitchen style while balancing functionality and aesthetics.',
      spatialPrinciples: [
        'Parallel Galley Work Triangle connecting primary hot, wet, and cold stations seamlessly.',
        'Multi-Tier Storage Planning dividing lower drawers/pull-outs from upper and hydraulic overhead cabinets.',
        'Material Contrast uniting rich green and black stone surfaces with warm wooden/cream laminates and brushed hardware.'
      ]
    },

    ideation: {
      explorations: [
        'Material & atmospheric moodboard pairing deep emerald stone tiles, walnut grain, amber pendant glass, and brushed bronze fittings.',
        'Three progressive CAD plans isolating base fixtures, lower cabinet bays, and overhead 400 mm cabinets.',
        'CAD and rendered Elevations A & B plus a 9-item Material & Product Specification Schedule.'
      ],
      evolution: 'Progressed from conceptual moodboarding and millimeter-dimensioned CAD drafting (Elevations A & B) into full material-rendered plans, elevations, and fixture scheduling.'
    },

    zoning: {
      publicToPrivateRatio: 'Galley Wall A (Cooking, Microwave & Wet Zone) · Central Passage · Galley Wall B (Refrigerator, Coffee Bar & Upper Storage)',
      zones: [
        { name: 'Elevation A — Hot & Wet Work Wall', percentage: 50, description: 'Microwave/Oven (600 mm), 4-Burner Stove & Chimney Hood (1200 mm), Integrated Sink & Dishwasher bay (900 + 600 mm), and Pantry (700 mm).' },
        { name: 'Elevation B — Cold Storage & Beverage Wall', percentage: 50, description: 'Samsung Side-by-Side Refrigerator (1000 × 650 mm), Coffee/Espresso counter, lower jar/plate drawers, and upper hydraulic cabinets.' }
      ]
    },

    spatialPlanning: {
      circulationConcept: 'Unobstructed central corridor between facing 609 mm–650 mm deep counters supporting smooth movement during everyday cooking.',
      keyTransitions: [
        'Hot-to-wet alignment along Elevation A: Oven (600) → Hob (1200) → Rollout Spice & Oil (300) → Sink (900) → Dishwasher (600).',
        'Cold storage to dry prep along Elevation B: Plate Drawers (500/300/300) → Fridge (1000 × 650) → Jars & Plates (300/500/700) → Coffee Machine.'
      ]
    },

    materialPalette: [
      { name: 'Green Granite / Black Marble Platform', category: 'Countertop Platform', description: 'Durable veined natural stone platform specified across both galley work counters.', finish: 'Polished Natural Stone', colorHex: '#2F4639' },
      { name: 'Wooden Laminate / Cream Acrylic Laminate', category: 'Upper & Lower Cabinets', description: 'Warm timber-grain laminate (Rendered Sheet) paired with cream acrylic laminate option (CAD Sheet).', finish: 'Laminate Finish', colorHex: '#B88D63' },
      { name: 'Granite / Cladding Tile', category: 'Wall Cladding & Backsplash', description: 'Veined green granite and textured stone tile backsplash protecting high-use cooking walls.', finish: 'Stone & Ceramic Cladding', colorHex: '#3A5344' },
      { name: 'Italian Marble', category: 'Flooring', description: 'Bright white veined Italian marble tiles defining the central galley circulation floor.', finish: 'Honed / Polished Marble', colorHex: '#EAE7E1' },
      { name: 'Silver Handle & Brushed Bronze Faucet', category: 'Hardware & Fittings', description: 'Linear silver cabinet/drawer handles paired with hydraulic upper lifts and gooseneck faucet.', finish: 'Brushed Metallic', colorHex: '#A6A8AB' }
    ],

    furnitureAndLighting: {
      lightingStrategy: 'Layered warm pendant drops and concealed under-cabinet illumination across stone backsplash surfaces.',
      keyPieces: [
        'Upper hydraulic overhead cabinets (871 mm height, 400 mm depth)',
        'Segmented lower drawers for dishes, pots, jars, and plates',
        '300 mm rollout spice & oil pull-out and 400 mm rollout waste bin'
      ],
      fixtures: ['Samsung Smart Refrigerator (1000 × 650 mm)', 'Elica 4-Burner Stove (1195 × 594 mm)', 'Agaro Oven (600 × 600 mm)', 'Integrated Sink (600 × 460 mm)']
    },

    technicalDrawings: [],

    visualizations: [
      { perspective: 'Kitchen Mood Board', caption: 'Material, colour, lighting, furniture, and bronze hardware curation.', imageUrl: '/assets/kitchen-extracted/moodboard_kitchen.png' },
      { perspective: 'Rendered Elevation A', caption: 'Cooking and washing wall with Elica chimney, Agaro oven, green granite counter, and wood cabinets.', imageUrl: '/assets/kitchen-extracted/rendered_elevation_a.png' },
      { perspective: 'Rendered Elevation B', caption: 'Samsung smart fridge, coffee bar counter, open shelving, and wooden laminate cabinetry.', imageUrl: '/assets/kitchen-extracted/rendered_elevation_b.png' },
      { perspective: 'Rendered Plan', caption: 'Complete galley layout with green granite counter, Italian marble floor, hob, oven, sink, and fridge.', imageUrl: '/assets/kitchen-extracted/rendered_plan_01_layout.png' }
    ],

    finalDesign: {
      description: 'The completed galley kitchen balances ergonomic workflow planning with tactile stone and wood finishes alongside fully scheduled kitchen appliances and fittings.',
      deliverables: [
        'Project Brief & Concept Brief',
        'Kitchen Material & Atmosphere Mood Board',
        '3 CAD Floor & Cabinet Plans (mm)',
        'CAD Elevations A & B with Technical Callouts',
        '3 Rendered Plans & Rendered Elevations A–B',
        '9-Item Material & Product Specification Schedule'
      ]
    },

    reflection: {
      learnings: 'Developing both architectural CAD documentation and material/product schedules demonstrated how precise cabinet widths (300–1200 mm) and real appliance footprints govern everyday kitchen ergonomics.',
      academicSignificance: '03 | Kitchen Interior Design — Parallel Galley Kitchen'
    },

    kitchenCaseStudy: {
      subHeader: 'Parallel Galley Kitchen Design | Materials, CAD Documentation & Product Schedule',
      projectBrief: 'The project involved selecting a specific kitchen design style and developing a kitchen layout within a self-defined space. The task included understanding spatial requirements, planning the kitchen layout, and selecting suitable materials and finishes to create a functional and visually cohesive design.',
      conceptBrief: 'The concept focuses on creating an efficient and well-organised galley kitchen, with parallel work areas designed to support smooth movement and everyday cooking activities. The selected materials and finishes complement the chosen kitchen style while balancing functionality and aesthetics.',
      designIntent: 'By aligning wet preparation, primary cooking, cold storage, and beverage utilities along two parallel counters, the design establishes an effortless work triangle while layering durable natural stone surfaces with warm cabinetry and concealed storage hardware.',
      objectives: [
        'Develop an efficient parallel galley layout in a self-defined residential kitchen envelope.',
        'Organise lower base cabinets, pull-out spice/oil drawers, waste bins, pantry, and upper hydraulic cabinets with exact millimeter dimensions.',
        'Pair cohesive countertop, cabinet, backsplash, and flooring finishes with scheduled branded kitchen fixtures and appliances.'
      ],
      moodboard: {
        id: 'kit-moodboard',
        plate: 'Mood Board',
        title: 'Kitchen Design Mood Board & Sensory Palette',
        subtitle: 'Emerald stone wall tiles, grained walnut cabinetry, brushed bronze gooseneck faucet & knurled pulls, amber blown-glass pendants, Italian stone vessels & walnut counter stool',
        imageUrl: '/assets/kitchen-extracted/moodboard_kitchen.png',
        category: 'moodboard'
      },
      cadPlans: [
        {
          id: 'kit-cad-plan-01',
          plate: 'CAD Plan 01',
          title: 'Kitchen Floor Plan — Layout & Work Triangle',
          subtitle: 'Parallel galley counters showing Microwave (600), Hob/Cooktop (1200), Sink (900), Fridge (1000 × 650), espresso/appliance zone (530 · 355), and Elevation A / B markers',
          imageUrl: '/assets/kitchen-extracted/cad_plan_01_layout.png',
          category: 'cad-plan'
        },
        {
          id: 'kit-cad-plan-02',
          plate: 'CAD Plan 02',
          title: 'Plan with Lower Cabinets — Storage & Pull-Out Zoning',
          subtitle: 'Detailed base cabinet breakdown: Dish (600), Pots (500), Rollout Spice & Oils (300), Dishwasher (600), Rollout Bin (400), Pantry (700), Drawers/Plates (500 · 300 · 300), Jars (300), Plates (500), Cabinets (700)',
          imageUrl: '/assets/kitchen-extracted/cad_plan_02_lower.png',
          category: 'cad-plan'
        },
        {
          id: 'kit-cad-plan-03',
          plate: 'CAD Plan 03',
          title: 'Plan with Lower & Upper Cabinets',
          subtitle: 'Full overhead cabinet alignment at 400 mm depth spanning Drawers/Plates (500 · 600 · 350) beside Fridge and Jars/Plates/Cabinets (500 · 450 · 1000)',
          imageUrl: '/assets/kitchen-extracted/cad_plan_03_upper_lower.png',
          category: 'cad-plan'
        }
      ],
      cadElevations: [
        {
          id: 'kit-cad-elev-a',
          plate: 'Elevation A (CAD)',
          title: 'Elevation A — Cooking, Microwave & Washing Wall',
          subtitle: '2438 mm clear ceiling height, 787 mm platform height; Microwave, Chimney Hood above Hob, Sink & Faucet, Black marble platform, Silver handle & Cream acrylic laminate callouts',
          imageUrl: '/assets/kitchen-extracted/cad_elevation_a.png',
          category: 'cad-elevation'
        },
        {
          id: 'kit-cad-elev-b',
          plate: 'Elevation B (CAD)',
          title: 'Elevation B — Refrigerator, Beverage Station & Hydraulic Cabinets',
          subtitle: '1778 mm upper fridge datum, 871 mm upper cabinet height, 757 mm platform height; espresso station, Hydrolic cabinates, Cream acrylic laminate, Wall cladding, Black marble platform & Silver handle',
          imageUrl: '/assets/kitchen-extracted/cad_elevation_b.png',
          category: 'cad-elevation'
        }
      ],
      renderedPlans: [
        {
          id: 'kit-ren-plan-01',
          plate: 'Rendered Plan 01',
          title: 'Rendered Kitchen Floor Plan',
          subtitle: 'Galley layout rendered with veined green granite countertops, white Italian marble flooring, 4-burner hob, oven bay, integrated sink & fridge footprint',
          imageUrl: '/assets/kitchen-extracted/rendered_plan_01_layout.png',
          category: 'rendered-plan'
        },
        {
          id: 'kit-ren-plan-02',
          plate: 'Rendered Plan 02',
          title: 'Rendered Plan with Upper Cabinets',
          subtitle: 'Ceiling-level view highlighting warm wooden laminate upper cabinet runs reflected above the green granite counter and Italian marble floor',
          imageUrl: '/assets/kitchen-extracted/rendered_plan_02_upper.png',
          category: 'rendered-plan'
        },
        {
          id: 'kit-ren-plan-03',
          plate: 'Rendered Plan 03',
          title: 'Rendered Plan with Lower Cabinets',
          subtitle: 'Base-level stone platform segmentation and module joints paired across both parallel galley counters',
          imageUrl: '/assets/kitchen-extracted/rendered_plan_03_lower.png',
          category: 'rendered-plan'
        }
      ],
      renderedElevations: [
        {
          id: 'kit-ren-elev-a',
          plate: 'Rendered Elevation A',
          title: 'Rendered Elevation A — Stove, Chimney, Oven & Integrated Sink Wall',
          subtitle: 'Wooden laminate base drawers, green granite counter & lower backsplash, textured cream wall, framed window openings, chimney hood, microwave & brass faucet',
          imageUrl: '/assets/kitchen-extracted/rendered_elevation_a.png',
          category: 'rendered-elevation'
        },
        {
          id: 'kit-ren-elev-b',
          plate: 'Rendered Elevation B',
          title: 'Rendered Elevation B — Smart Fridge, Coffee Counter & Open Display Shelving',
          subtitle: 'Central black Samsung refrigerator framed by wooden upper & lower cabinetry, open crockery & bottle display shelves with trailing greenery, and espresso machine counter',
          imageUrl: '/assets/kitchen-extracted/rendered_elevation_b.png',
          category: 'rendered-elevation'
        }
      ],
      materials: [
        {
          id: 'mat-green-granite',
          name: 'Green Granite',
          application: 'Counter top platform (Rendered Plans)',
          stageNote: 'Schedule S.NO 1',
          imageUrl: '/assets/kitchen-extracted/swatch_green_granite.png',
          colorHex: '#2E4537'
        },
        {
          id: 'mat-black-marble',
          name: 'Black Marble',
          application: 'Counter top platform (CAD Plans & Elevations)',
          stageNote: 'CAD Material Specification',
          imageUrl: '/assets/kitchen-extracted/swatch_black_marble.png',
          colorHex: '#4B5056'
        },
        {
          id: 'mat-wooden-laminate',
          name: 'Wooden Laminate',
          application: 'Upper & lower cabinets (Rendered Plans)',
          stageNote: 'Schedule S.NO 2',
          imageUrl: '/assets/kitchen-extracted/swatch_wooden_laminate.png',
          colorHex: '#B68A5C'
        },
        {
          id: 'mat-cream-acrylic',
          name: 'Cream Acrylic Laminate',
          application: 'Upper & lower cabinets (CAD Plans & Elevations)',
          stageNote: 'CAD Material Specification',
          imageUrl: '/assets/kitchen-extracted/swatch_cream_acrylic.png',
          colorHex: '#E9E6DF'
        },
        {
          id: 'mat-granite-cladding',
          name: 'Granite Wall Cladding',
          application: 'Backsplash & wall cladding (Rendered Plans)',
          stageNote: 'Schedule S.NO 5',
          imageUrl: '/assets/kitchen-extracted/swatch_granite_cladding.png',
          colorHex: '#35493E'
        },
        {
          id: 'mat-wall-tile',
          name: 'Tile Wall Cladding',
          application: 'Wall cladding (CAD Specification)',
          stageNote: 'CAD Material Specification',
          imageUrl: '/assets/kitchen-extracted/swatch_wall_tile.png',
          colorHex: '#D5D4D0'
        },
        {
          id: 'mat-italian-marble',
          name: 'Italian Marble',
          application: 'Kitchen flooring',
          stageNote: 'Schedule S.NO 3 & CAD Spec',
          imageUrl: '/assets/kitchen-extracted/swatch_italian_marble.png',
          colorHex: '#BFC2BD'
        },
        {
          id: 'mat-silver-handle',
          name: 'Silver Handle',
          application: 'Drawer & cabinet hardware pulls',
          stageNote: 'Schedule S.NO 4 & CAD Spec',
          imageUrl: '/assets/kitchen-extracted/swatch_silver_handle.png',
          colorHex: '#9FA4A8'
        }
      ],
      fixtures: [
        {
          id: 'fix-sink',
          category: 'sink',
          categoryLabel: 'Kitchen Sink',
          name: 'Integrated Sink',
          dimensions: '600 × 460 MM',
          finishOrMaterial: 'Integrated Stone Basin with Drainboard',
          specifications: [
            'Schedule Reference: S.NO 9 — INTEGRATED SINK (600 × 460 MM)',
            'Positioned within 900 mm sink module on Elevation A counter alongside circular bowl & grooved drainer shown in CAD Plan',
            'Adjacent to 600 mm Dishwasher bay and 400 mm Rollout bin'
          ],
          imageUrl: '/assets/kitchen-extracted/product_sink_faucet.png'
        },
        {
          id: 'fix-faucet',
          category: 'faucet',
          categoryLabel: 'Kitchen Faucet',
          name: 'Gooseneck Kitchen Mixer Faucet',
          finishOrMaterial: 'Brushed Brass / Warm Bronze Finish',
          specifications: [
            'High-arc gooseneck spout paired with the Integrated Sink (shown on Mood Board, S.NO 9 detail & Rendered Elevation A)',
            'Includes matching deck-mounted soap dispenser / secondary spray detail shown on product sheet & moodboard'
          ],
          imageUrl: '/assets/kitchen-extracted/product_sink_faucet.png'
        },
        {
          id: 'fix-fridge',
          category: 'refrigerator',
          categoryLabel: 'Refrigerator',
          name: 'Samsung Smart Double-Door Refrigerator',
          brand: 'Samsung',
          dimensions: '1000 × 650 MM',
          finishOrMaterial: 'Dark Matte Stainless / Black Finish with Touchscreen Display',
          specifications: [
            'Schedule Reference: S.NO 6 — REFRIDGERATOR SAMSUNG (1000 × 650 MM)',
            'Integrated centrally on Elevation B (1778 mm upper alignment datum in CAD Elevation B)',
            'Multi-door configuration featuring external water/ice dispenser and interactive front screen'
          ],
          imageUrl: '/assets/kitchen-extracted/product_fridge_samsung.png'
        },
        {
          id: 'fix-stove',
          category: 'appliance',
          categoryLabel: 'Kitchen Appliances · Hob / Cooktop',
          name: 'Elica 4-Burner Glass Hob / Stove',
          brand: 'Elica',
          dimensions: '1195 × 594 MM',
          finishOrMaterial: 'Toughened Black Glass Surface with Cast Iron Pan Supports',
          specifications: [
            'Schedule Reference: S.NO 8 — STOVE ELICA (1195 × 594 MM)',
            'Positioned centrally in the 1200 mm cooktop bay on Elevation A',
            'Paired directly beneath wall-mounted black glass/steel Chimney Hood shown in CAD & Rendered Elevation A'
          ],
          imageUrl: '/assets/kitchen-extracted/product_stove_elica.png'
        },
        {
          id: 'fix-oven',
          category: 'appliance',
          categoryLabel: 'Kitchen Appliances · Oven / Microwave',
          name: 'Agaro Countertop Oven / Microwave',
          brand: 'Agaro',
          dimensions: '600 × 600 MM',
          finishOrMaterial: 'Black Body with Glass Viewing Door & Rotary Controls',
          specifications: [
            'Schedule Reference: S.NO 7 — OVEN AGARO (600 × 600 MM)',
            'Placed in dedicated 600 mm appliance zone on left counter of Elevation A',
            'Also supported by Elevation B beverage counter appliances (espresso machine & grinder shown in Elevation B)'
          ],
          imageUrl: '/assets/kitchen-extracted/product_oven_agaro.png'
        },
        {
          id: 'fix-hardware',
          category: 'hardware',
          categoryLabel: 'Kitchen Hardware & Accessories',
          name: 'Silver Cabinet Handles & Hydraulic Upper Fittings',
          finishOrMaterial: 'Brushed Silver Cabinet & Drawer Hardware + Hydraulic Lifts',
          specifications: [
            'Schedule Reference: S.NO 4 — Silver Handle (drawer and cabinet) & CAD Specification',
            'Upper cabinets specified with Hydraulic lift mechanism ("Hydrolic cabinates" noted on CAD Elevation B)',
            'Base storage accessories mapped in CAD Plan 02: Rollout spice & oils (300 mm), Rollout bin (400 mm), Pantry pull-out (700 mm), plus Dish, Pots, Plates & Jars drawers'
          ],
          imageUrl: '/assets/kitchen-extracted/swatch_silver_handle.png'
        }
      ],
      planDimensionsMm: [
        '2438 mm Ceiling Height',
        '787 mm / 757 mm Counter Heights',
        '871 mm Upper Cabinet Height',
        '1778 mm Fridge Datum',
        '1200 mm Hob Bay',
        '900 mm Sink Bay',
        '1000 × 650 mm Fridge',
        '600 mm Microwave / Dishwasher',
        '700 mm Pantry',
        '300 mm Rollout Spice & Oils',
        '400 mm Rollout Bin / Upper Depth'
      ],
      cabinetZones: [
        'Microwave / Oven Bay (600 mm)',
        'Dish Storage (600 mm)',
        'Pots Storage (500 mm)',
        'Hob / Stove (1200 mm)',
        'Rollout Spice & Oils (300 mm)',
        'Integrated Sink (900 mm)',
        'Dishwasher Bay (600 mm)',
        'Rollout Bin (400 mm)',
        'Corner Pantry (700 mm)',
        'Opposite Wall Drawers & Plates (500 · 300 · 300 mm)',
        'Refrigerator (1000 × 650 mm)',
        'Jars, Plates & Cabinets (300 · 500 · 700 mm)'
      ]
    }
  },

  {
    id: 'furniture-design',
    number: '04',
    title: 'Fusion Furniture Design — Royal Breeze Swing',
    subtitle: 'Royal Strength Meets Coastal Breeze · 2-in-1 Punjab & Goa Heritage Jhula',
    category: 'furniture',
    categoryLabel: 'Furniture / Cultural Fusion Design',
    location: 'Punjab & Goa Heritage Study',
    year: '',
    heroImage: '/assets/furniture-extracted/render_01_jhula_swing.png',
    summary: 'A fusion furniture piece combining the royal craftsmanship of Punjab with the architectural heritage and coastal furniture traditions of Goa — transforming from a hanging jhula into detachable low-floor seating.',
    scope: [
      'Punjab × Goa Cultural Fusion',
      '2-in-1 Detachable Swing & Low Seating',
      '11 Architectural Motif Translations',
      'Furniture Working Drawing (mm)',
      'Exploded Wood Joinery & Eye-Bolt Hardware',
      'Sheesham, Teak, Cane & Carved Wood Finishes'
    ],

    introduction: 'A fusion furniture piece combining the royal craftsmanship of Punjab with the architectural heritage and coastal furniture traditions of Goa. Inspired by Punjabi royal thrones, traditional Charpai, Goan temple architecture, and Portuguese-style furniture, the design brings together strength, lightness, and intricate craftsmanship.',

    designBrief: {
      clientOrContext: '04 | Fusion Furniture Design — Royal Strength Meets Coastal Breeze',
      challenge: 'To reinterpret the cultural identity of two Indian states into one functional furniture piece through traditional motifs, regional materials, and detailed carving.',
      objectives: [
        'Combine Punjabi royal wooden framework, Charpai turned leg profiles, and Phulkari geometry with Goan sloping tiled canopy, Mahalaxmi temple arch/elephant motifs, and Portuguese-style cane craft.',
        'Engineer a 2-in-1 dual-purpose piece: a hanging Jhula that converts into detachable Charpai/Bajoth-inspired low-floor seating.',
        'Detail structural mortise-and-tenon, wooden dowel, half-lap roof frame, circular seat frame, and dynamic metal eye bolt chain fixings.'
      ]
    },

    siteContext: {
      locationDetails: 'Cross-cultural regional study bridging Punjab (grand woodwork, Charpai, Phulkari embroidery) and Goa (Mahalaxmi Temple Ghumat forms, terracotta sloped roofs, cane craft).',
      microclimate: 'Sloping tiled canopy draws from coastal Goan architecture engineered for heavy rainfall drainage while cane-woven seating introduces light breathability.',
      culturalContext: 'Translates ceremonial indoor swing rituals and grounded low-floor social seating into one modular domestic heirloom.'
    },

    research: {
      methodology: 'Precedent taxonomy pairing six cultural references from Punjab and Goa with an 11-element motif table and structural joinery validation.',
      insights: [
        'Mortise & Tenon primary pillar-to-base joints transfer vertical load cleanly while wooden dowels lock carved decorative beams mechanically against loosening over time.',
        'Detaching the metal eye-bolt chain rigging turns the circular cane-woven seat with turned Charpai feet directly into stable low-floor seating.'
      ]
    },

    userStudy: [
      {
        role: 'Suspended Jhula Mode User',
        needs: 'Smooth rhythmic swing motion supported by a commanding carved canopy and breathable arched backrest.',
        spatialResponse: '1600 × 1200 mm sloped Goan canopy frame carrying twin 11 mm chains anchored via metal eye bolts & hooks at 650 mm clearance.'
      },
      {
        role: 'Low-Floor Seating Mode User',
        needs: 'Grounded social floor seating when swing motion is not desired or when reconfiguring domestic living zones.',
        spatialResponse: 'Chains detach cleanly at the eye-bolt hooks so the 950 mm arched circular seat rests solidly on four Charpai-inspired turned legs.'
      }
    ],

    conceptDevelopment: {
      primaryMetaphor: 'Royal Strength Meets Coastal Breeze — Inspired by Punjabi royal thrones, traditional Charpai, Goan temple architecture, and Portuguese-style furniture.',
      spatialPrinciples: [
        'Dual-State Cultural Fusion uniting Punjab structural grandeur and Phulkari borders with Goan Ghumat arches, elephant brackets, and terracotta canopies.',
        'Two Forms, One Story: transitioning effortlessly between a suspended traditional Jhula and detachable low-floor seating.',
        'Artisanal Structural Joinery combining mortise-and-tenon, half-lap rafters, dowel locks, and segmented curved seat construction.'
      ]
    },

    ideation: {
      explorations: [
        'Hand-drawn studies testing arched Mahalaxmi backrest forms, cane weaving textures, pillar-to-beam dowels, and terracotta roof tile hierarchy.',
        'Dimensional proportioning linking 2150 mm full structure height, 1850 mm column clear height, 1750 × 1350 mm footprint, and 480 mm suspended seat height.',
        'Exploded joinery breakdown verifying mechanical locks across frame, roof rafters, circular seat, and dynamic chain hardware.'
      ],
      evolution: 'Evolved from initial pencil form and Charpai transformation sketches into full millimeter-dimensioned working drawings, exploded joinery sheets, and 3D renders.'
    },

    zoning: {
      publicToPrivateRatio: 'Canopy Frame (1600 × 1200 mm) · Column Span (1750 × 1350 mm) · Detachable Seat (950 mm)',
      zones: [
        { name: 'Sloped Canopy & Phulkari Frieze', percentage: 35, description: 'Teak wood roof rafters half-lapped to the ridge beam beneath terracotta roof tiles and carved decorative borders.' },
        { name: 'Carved Sheesham Pillars & Brackets', percentage: 35, description: '120 × 120 mm carved columns anchored to stepped floral bases (90 mm foot, 580 mm base block) with Goan elephant brackets.' },
        { name: '2-in-1 Detachable Seat & Chain Assembly', percentage: 30, description: 'Segmented curved Sheesham ring (950 mm), breathable cane-woven surface, turned legs, arched temple backrest & 11 mm suspension chains.' }
      ]
    },

    spatialPlanning: {
      circulationConcept: 'Dual-configuration footprint spanning 1750 × 1350 mm at base and 1600 × 1200 mm across the sloped terracotta roof.',
      keyTransitions: [
        'Swing Mode: Suspended 480 mm above ground via 1200 mm twin chain drops anchored to beam eye-bolts.',
        'Floor Seating Mode: Detach chain hooks to convert the seat independently onto its four turned Charpai legs.'
      ]
    },

    materialPalette: [
      { name: 'Sheesham Wood', category: 'Main Structure & Carved Details', description: 'Used for the strong main frame and Punjabi-inspired decorative elements. Its darker wood character supports the rich, traditional appearance.', finish: 'Deep Natural Grain Polish', colorHex: '#4E2A1A' },
      { name: 'Teak Wood', category: 'Canopy Frame', description: 'Specified for the roof frame in your design, bringing a warm wood finish to the Goan-inspired canopy.', finish: 'Warm Natural Timber', colorHex: '#8C5832' },
      { name: 'Cane Weaving', category: 'Seat Surface', description: 'Introduces ventilation, flexibility, and a lighter visual contrast against the carved wooden structure.', finish: 'Woven Natural Rattan Cane', colorHex: '#D8BD8A' },
      { name: 'Carved Wood Finish', category: 'Decorative Borders & Pillars', description: 'Carries the Phulkari-inspired patterns, floral vines, temple arches, and ornamental bands throughout the furniture.', finish: 'Detailed Relief Carving', colorHex: '#6A442C' }
    ],

    furnitureAndLighting: {
      lightingStrategy: 'Ambient architectural light highlighting deep wood reliefs, carved elephant heads, lotus-petal pillar rings, and cane texture.',
      keyPieces: [
        'Royal Breeze Swing (Full Hanging Jhula Configuration — 2150 mm H)',
        'Detachable Bajoth / Charpai-Inspired Low-Floor Seat (950 mm)'
      ],
      fixtures: ['Mortise & Tenon with Wooden Dowels', 'Half-Lap Roof Rafter Frame', 'Metal Eye Bolt & Hook Chain Fixing (11 mm chains)']
    },

    technicalDrawings: [],

    visualizations: [
      { perspective: 'Royal Breeze Swing — Hanging Jhula Mode', caption: 'Primary 3D render showing terracotta tiled Goan canopy, carved Phulkari frieze, temple pillars, hanging chains, and woven seat.', imageUrl: '/assets/furniture-extracted/render_01_jhula_swing.png' },
      { perspective: 'Detached Low-Floor Seating Mode', caption: 'With chains detached, the arched backrest with twin elephants and turned Charpai legs functions as independent low-floor seating.', imageUrl: '/assets/furniture-extracted/render_02_detached_seating.png' }
    ],

    finalDesign: {
      description: 'With the chains detached, the swing transforms into low-floor seating, making one furniture piece serve two purposes while celebrating Punjab and Goa heritage.',
      deliverables: [
        'Project Brief, Concept Brief & Design Intent',
        '6 Punjab × Goa Cultural Inspiration Studies',
        '11-Element Motif & Detailing Taxonomy',
        'Hand-Drawn Design Development & Transformation Sketches',
        'Furniture Working Drawing — Jhula (Traditional) in mm',
        '8 Exploded Joinery Diagrams & Construction Analysis',
        'Material, Colour Palette & Dual-Mode 3D Renders'
      ]
    },

    reflection: {
      learnings: 'Reinterpreting Punjab and Goa heritage into one joinery-authentic 2-in-1 furniture piece required balancing structural dynamic swing loads with detachable low-seating proportions.',
      academicSignificance: '04 | Fusion Furniture Design — Royal Breeze Swing'
    },

    fusionFurnitureCaseStudy: {
      subHeader: 'Fusion Furniture Design | Punjab Royal Craftsmanship × Goan Coastal Heritage',
      furnitureTitle: 'Royal Breeze Swing — 2-in-1 Hanging Jhula & Low-Floor Seating',
      projectBrief: 'A fusion furniture piece combining the royal craftsmanship of Punjab with the architectural heritage and coastal furniture traditions of Goa.',
      conceptHeadline: 'Royal Strength Meets Coastal Breeze',
      conceptBrief: 'Inspired by Punjabi royal thrones, traditional Charpai, Goan temple architecture, and Portuguese-style furniture, the design brings together strength, lightness, and intricate craftsmanship.',
      designIntent: 'To reinterpret the cultural identity of two Indian states into one functional furniture piece through traditional motifs, regional materials, and detailed carving.',
      twoInOneHeadline: 'Two Forms, One Story',
      twoInOnePrimaryNote: 'Royal Breeze Swing transforms from a hanging jhula into elegant low-floor seating with a simple detachable seat. Inspired by traditional Punjabi seating, this dual-purpose design blends heritage with a surprising touch of modern functionality.',
      twoInOneSecondaryNote: 'With the chains detached, the swing transforms into low-floor seating, making one furniture piece serve two purposes.',
      purposes: [
        'Serves primarily as an indoor architectural swing (Jhula) framed beneath a Goan terracotta tiled canopy and Punjabi royal carved pillars.',
        'Transforms into grounded Bajoth / Charpai-inspired low-floor seating simply by detaching the metal eye-bolt chain hooks.',
        'Pairs heavy carved Sheesham and Teak joinery with breathable Goan cane weaving for visual lightness and thermal comfort.'
      ],
      inspirations: [
        {
          id: 'ff-insp-01',
          number: '01',
          title: 'Punjabi royal throne',
          region: 'Punjab',
          description: 'The royal throne inspired the furniture\'s grand proportions, strong wooden framework, rich carving, and regal appearance. This influence establishes the main visual identity of the swing.',
          imageUrl: '/assets/furniture-extracted/insp_01_punjabi_throne.png'
        },
        {
          id: 'ff-insp-02',
          number: '02',
          title: 'Traditional Charpai',
          region: 'Punjab',
          description: 'The Charpai inspired the sturdy base, turned leg profiles, and the idea of practical traditional seating. Its influence also supports the low-seating function of the detachable seat.',
          imageUrl: '/assets/furniture-extracted/insp_02_charpai.png'
        },
        {
          id: 'ff-insp-03',
          number: '03',
          title: 'Mahalaxmi Temple architecture',
          region: 'Goa',
          description: 'The temple\'s Ghumat or arched crown form inspires the backrest. Temple-inspired arch details and elephant motifs bring Goan cultural and architectural character into the furniture.',
          imageUrl: '/assets/furniture-extracted/insp_03_mahalaxmi_temple.png'
        },
        {
          id: 'ff-insp-04',
          number: '04',
          title: 'Goan sloping roof',
          region: 'Goa',
          description: 'The canopy takes inspiration from the sloping tiled roofs of traditional Goan houses. The angled form refers to the region\'s heavy rainfall and the practical function of roof drainage.',
          imageUrl: '/assets/furniture-extracted/insp_04_goan_roof.png'
        },
        {
          id: 'ff-insp-05',
          number: '05',
          title: 'Phulkari embroidery',
          region: 'Punjab',
          description: 'Phulkari, known for its floral embroidery, inspires the carved decorative frieze along the canopy border and the geometric-floral detailing on the pillar base. It translates a textile tradition into a wooden furniture element.',
          imageUrl: '/assets/furniture-extracted/insp_05_phulkari.png'
        },
        {
          id: 'ff-insp-06',
          number: '06',
          title: 'Portuguese-style Goan furniture',
          region: 'Goa',
          description: 'Traditional carved chair-back patterns inspire the canopy\'s wooden border. The original furniture detail is reinterpreted as a decorative architectural frieze.',
          imageUrl: '/assets/furniture-extracted/insp_06_portuguese_chair.png'
        }
      ],
      motifTable: [
        { detail: 'Main wooden frame', inspiration: 'Punjabi royal furniture', purpose: 'Strength and visual grandeur' },
        { detail: 'Turned leg profile', inspiration: 'Traditional Charpai', purpose: 'Connects the base to Punjabi furniture traditions' },
        { detail: 'Arched backrest', inspiration: 'Ghumat form of Mahalaxmi Temple, Goa', purpose: 'Creates a distinctive architectural silhouette' },
        { detail: 'Elephant head motif', inspiration: 'Goan temple sculptures', purpose: 'Adds symbolic and decorative character' },
        { detail: 'Lotus-petal ring', inspiration: 'Goan temple architecture', purpose: 'Creates a transition between carved pillar sections' },
        { detail: 'Floral vine on pillar', inspiration: 'Punjabi royal furniture', purpose: 'Adds traditional carved ornamentation' },
        { detail: 'Pillar base panel', inspiration: 'Phulkari-inspired pattern', purpose: 'Translates textile geometry into wood carving' },
        { detail: 'Curved bracket', inspiration: 'Goan temple detailing', purpose: 'Visually connects the pillar and canopy' },
        { detail: 'Sloping canopy', inspiration: 'Traditional Goan tiled roofs', purpose: 'Gives the furniture an architectural identity' },
        { detail: 'Canopy border', inspiration: 'Phulkari and Portuguese-style carving', purpose: 'Brings the two regional design languages together' },
        { detail: 'Cane-woven seat', inspiration: 'Goan furniture craft', purpose: 'Introduces breathability and a lighter visual appearance' }
      ],
      conceptSketchSheet: {
        id: 'ff-sketch-master',
        plate: 'Sketch Sheet',
        title: 'Original Hand-Drawn Design Development & Structural Studies',
        subtitle: 'Original sketchbook sheet exploring arched backrest & cane seating, pillar-to-beam dowel joint, terracotta roof structure hierarchy, rafter-to-ridge half-lap joint, 2150 mm elevation, section, and Charpai low seating',
        imageUrl: '/assets/furniture-extracted/dev_concept_sketch.png',
        category: 'sketch',
        annotations: [
          'Backrest & Cane Study',
          '1. Pillar to Beam Joint (beam, wooden dowel, pillar)',
          'Rafters locked to the ridge beam and fixed w/ wooden leg',
          'Rafter to Ridge Joint — Half-lap Ridge',
          'Terracotta Roof Tile & Roof Structure Hierarchy (Rafter, Main Beam)',
          '2150 mm Height · 650 mm Clear · 120×120 mm Pillar · 480 mm Seat Clearance',
          'Charpai → Low Seating Conversion'
        ]
      },
      developmentStages: [
        {
          step: '01',
          phase: 'Initial Sketch & Form',
          title: 'Swing Frame, Arched Backrest & Cane Surface Exploration',
          description: 'Early elevation study establishing the rectangular portal frame, carved pillar bases, suspended circular seat, arched Ghumat backrest geometry, and woven cane seating texture.',
          imageUrl: '/assets/furniture-extracted/sketch_01_form_backrest.png',
          drawingId: 'ff-sketch-01',
          notes: ['backrest profile study', 'cane weaving hatch', 'portal beam & hanging seat']
        },
        {
          step: '02',
          phase: 'Base & Pillar Joinery',
          title: 'Pillar-to-Beam Joint & Charpai Low-Seating Concept',
          description: 'Structural study detailing the pillar-to-beam connection locked with a wooden dowel alongside the detachable Charpai low-seating base inspiration.',
          imageUrl: '/assets/furniture-extracted/sketch_02_pillar_charpai.png',
          drawingId: 'ff-sketch-02',
          notes: ['1. Pillar to Beam Joint', 'wooden dowel', 'charpai -> low seating']
        },
        {
          step: '03',
          phase: 'Canopy Engineering',
          title: 'Roof Structure Hierarchy & Half-Lap Rafter Locking',
          description: 'Exploded roof sketch laying out terracotta roof tiles over pitched rafters locked into the central ridge beam via a half-lap ridge joint above the main beams.',
          imageUrl: '/assets/furniture-extracted/sketch_03_roof_rafters.png',
          drawingId: 'ff-sketch-03',
          notes: ['Terracotta Roof tile', 'Roof structure Hierarchy', 'Rafter to Ridge Joint Half-lap Ridge', 'Main Beam & Rafters']
        },
        {
          step: '04',
          phase: 'Elevation & Section',
          title: 'Dimensioned Swing Elevation & Transverse Roof Section',
          description: 'Coordinated elevation and section validating overall 2150 mm height, 120 × 120 mm pillar shaft, 650 mm inner spacing, 480 mm seat clearance, and pitched canopy section.',
          imageUrl: '/assets/furniture-extracted/sketch_04_elevation_section.png',
          drawingId: 'ff-sketch-04',
          notes: ['2150 mm overall height', '650 mm suspension offset', '120 × 120 mm pillar', '480 mm floor clearance', 'transverse roof section']
        }
      ],
      workingDrawing: {
        id: 'ff-working-drawing',
        plate: 'Working Drawing',
        title: 'FURNITURE WORKING DRAWING — JHULA (TRADITIONAL)',
        subtitle: 'Dimensioned isometric working drawing showing full canopy geometry (1600 × 1200 mm), pillar sections (120 × 120 mm), chain hardware (11 mm · 1200 mm drop), detachable 950 mm seat, and stepped base (1750 × 1350 mm)',
        imageUrl: '/assets/furniture-extracted/dwg_working_jhula.png',
        category: 'working-drawing',
        annotations: [
          'Roof size: 1600 × 1200 mm',
          'Overall Height: 2150 mm',
          'Left Column Height: 1850 mm',
          'Base Front Span: 1750 mm · Depth: 1350 mm',
          'Pillar Cross-Section: 120 × 120 mm',
          'Chain Drop: 1200 mm · Link Thickness: 11 mm',
          'Seat Width / Span: 950 mm · Under-Seat Clearance: 480 mm'
        ]
      },
      dimensionsMm: [
        { label: 'Roof Size (Canopy)', value: '1600 × 1200 mm' },
        { label: 'Overall Height (Right)', value: '2150 mm' },
        { label: 'Column Height (Left)', value: '1850 mm' },
        { label: 'Overall Base Width', value: '1750 mm' },
        { label: 'Base Depth', value: '1350 mm' },
        { label: 'Pillar Cross-Section', value: '120 × 120 mm' },
        { label: 'Chain Suspension Drop', value: '1200 mm' },
        { label: 'Chain Link Thickness', value: '11 mm' },
        { label: 'Seat Diameter / Width', value: '950 mm' },
        { label: 'Horizontal Chain / Seat Offset', value: '650 mm' },
        { label: 'Lower Pillar Step Height', value: '580 mm' },
        { label: 'Seat-to-Floor Clearance', value: '480 mm' },
        { label: 'Base Foot Molding', value: '90 mm' }
      ],
      joineryDetails: [
        {
          id: 'ff-join-01',
          plate: 'Joinery 01',
          title: 'Mortise and Tenon Joint',
          category: 'structural',
          categoryLabel: 'Structural Base Connection',
          summary: 'This is the primary load-bearing joint connecting the carved vertical pillar into the stepped base block.',
          whyItWorks: [
            'Transfers vertical load from pillar to base',
            'Very stable against movement',
            'Widely used in traditional Indian carved swings'
          ],
          components: ['Pillar', 'Base Block'],
          imageUrl: '/assets/furniture-extracted/joinery_01_mortise_tenon.png'
        },
        {
          id: 'ff-join-02',
          plate: 'Joinery 02',
          title: 'Mortise and Tenon with Wooden Dowels',
          category: 'structural',
          categoryLabel: 'Pillar-to-Beam Frame Lock',
          summary: 'Connects the main carved horizontal lintel beam across the pillar tenon shaft using twin transverse wooden dowels.',
          whyItWorks: [
            'Dowels lock the joint mechanically',
            'Prevents loosening over time',
            'Ideal for carved decorative beams'
          ],
          components: ['Pillar', 'Tenon shaft', 'Twin Wooden Dowels', 'Carved Corner Bracket'],
          imageUrl: '/assets/furniture-extracted/joinery_02_mortise_dowels.png'
        },
        {
          id: 'ff-join-03',
          plate: 'Joinery 03',
          title: 'Half-Lap Joint (Roof Frame)',
          category: 'roof',
          categoryLabel: 'Roof Canopy Frame',
          summary: 'Interlocking notched lap joint used in the canopy beam and rafter frame, working alongside pillar mortise-tenon joints.',
          whyItWorks: [
            'Shares load across beam',
            'Works best in combination with mortise-tenon'
          ],
          components: ['Teak Canopy Beams', 'Cross Rafters'],
          imageUrl: '/assets/furniture-extracted/joinery_03_half_lap.png',
          referencePhotoUrl: '/assets/furniture-extracted/ref_half_lap_photo.png'
        },
        {
          id: 'ff-join-04',
          plate: 'Joinery 04',
          title: 'Wooden Dowel Joint',
          category: 'structural',
          categoryLabel: 'Decorative Frame Alignment',
          summary: 'Blind wooden dowel pins aligning carved corner frieze beams and ornamental aprons without exposed metal fasteners.',
          whyItWorks: [
            'Aligns decorative carved aprons flush at corners',
            'Conceals structural fastening within traditional joinery'
          ],
          components: ['Decorative carved frieze', 'Twin cylindrical wooden dowels'],
          imageUrl: '/assets/furniture-extracted/joinery_04_wooden_dowel.png'
        },
        {
          id: 'ff-join-05',
          plate: 'Joinery 05',
          title: 'Circular Seat Frame Joinery',
          category: 'seating',
          categoryLabel: 'Detachable Seat Ring',
          summary: 'Curved wooden segments connected using multiple round wooden dowels and adhesive to form the 950 mm circular seat base.',
          whyItWorks: [
            'Multiple dowels distribute hoop stresses across curved segments',
            'Adhesive reinforces seamless circular ring assembly',
            'Supports breathable cane weaving and four turned Charpai legs'
          ],
          components: ['Curved wooden segments', 'Round wooden dowels', 'Adhesive'],
          imageUrl: '/assets/furniture-extracted/joinery_07_circular_seat_annotated.png',
          secondaryImageUrl: '/assets/furniture-extracted/joinery_05_circular_seat_assembly.png'
        },
        {
          id: 'ff-join-06',
          plate: 'Joinery 06',
          title: 'Metal Eye Bolt Chain Fixing',
          category: 'suspension',
          categoryLabel: 'Dynamic Swing Suspension',
          summary: 'Heavy-duty vertical eye bolt anchored through the carved top beam engaging removable chain hooks for the 2-in-1 seating transformation.',
          whyItWorks: [
            'This carries dynamic load (swing motion)',
            'Eye bolt and hook arrangement allows chains to detach cleanly into floor-seating mode'
          ],
          components: ['Eye bolt', 'Hook', '11 mm Suspension Chains'],
          imageUrl: '/assets/furniture-extracted/joinery_08_eye_bolt_annotated.png',
          secondaryImageUrl: '/assets/furniture-extracted/joinery_06_eye_bolt_top.png',
          referencePhotoUrl: '/assets/furniture-extracted/ref_suspension_diagram.png'
        }
      ],
      materials: [
        {
          id: 'ff-mat-01',
          name: 'Sheesham Wood',
          application: 'Main structure and carved details',
          description: 'Used for the strong main frame and Punjabi-inspired decorative elements. Its darker wood character supports the rich, traditional appearance.',
          imageUrl: '/assets/furniture-extracted/mat_01_sheesham.png',
          colorHex: '#4E2A1A',
          finishTone: 'Rich Dark Hard Timber'
        },
        {
          id: 'ff-mat-02',
          name: 'Teak Wood',
          application: 'Canopy frame',
          description: 'Specified for the roof frame in your design, bringing a warm wood finish to the Goan-inspired canopy.',
          imageUrl: '/assets/furniture-extracted/mat_02_teak.png',
          colorHex: '#8C5832',
          finishTone: 'Warm Golden-Brown Timber'
        },
        {
          id: 'ff-mat-03',
          name: 'Cane Weaving',
          application: 'Seat surface',
          description: 'Introduces ventilation, flexibility, and a lighter visual contrast against the carved wooden structure.',
          imageUrl: '/assets/furniture-extracted/mat_03_cane_weaving.png',
          colorHex: '#D8BD8A',
          finishTone: 'Breathable Woven Natural Cane'
        },
        {
          id: 'ff-mat-04',
          name: 'Carved Wood Finish',
          application: 'Decorative borders and pillars',
          description: 'Carries the Phulkari-inspired patterns, floral vines, temple arches, and ornamental bands throughout the furniture.',
          imageUrl: '/assets/furniture-extracted/mat_04_carved_wood.png',
          colorHex: '#6A442C',
          finishTone: 'Hand-Carved Ornamented Timber'
        }
      ],
      colourPalette: [
        { name: 'Sheesham Walnut', hex: '#4E2A1A', role: 'Primary structural pillars, carved base & backrest frame' },
        { name: 'Warm Teak', hex: '#8C5832', role: 'Goan-inspired canopy roof rafters & lintel beams' },
        { name: 'Coastal Terracotta', hex: '#A4482D', role: 'Sloped Goan tiled canopy roof surface' },
        { name: 'Natural Woven Cane', hex: '#D8BD8A', role: 'Breathable lightweight Charpai/Goan seat surface' },
        { name: 'Antique Brass & Silver Relief', hex: '#C6A355', role: 'Hanging eye-bolt chains, elephant saddle accents & temple arch inlay' },
        { name: 'Phulkari Indigo & Cream Textile', hex: '#344869', role: 'Upholstered round seat cushion balancing deep timber tones' }
      ],
      finalRenders: [
        {
          id: 'ff-render-jhula',
          plate: 'Final View 01',
          title: 'Royal Breeze Swing — Hanging Jhula Mode',
          subtitle: 'Full 3D render showing the terracotta tiled Goan canopy, Phulkari rosette border, carved elephant brackets, temple columns, 11 mm chains, and suspended cane seat',
          imageUrl: '/assets/furniture-extracted/render_01_jhula_swing.png',
          category: 'render'
        },
        {
          id: 'ff-render-detached',
          plate: 'Final View 02',
          title: 'Detached Low-Floor Seating Mode (Bajoth / Charpai)',
          subtitle: 'With the chains detached, the circular seat with turned Charpai legs, woven cane deck, and twin-elephant arched Mahalaxmi backrest serves as grounded floor seating',
          imageUrl: '/assets/furniture-extracted/render_02_detached_seating.png',
          category: 'render'
        }
      ]
    }
  },

  {
    id: 'residential-interior',
    number: '05',
    title: 'Villa Interior Design',
    subtitle: 'Natural Modern Interior Design · Existing Villa Redesign, Ahmedabad',
    category: 'residential',
    categoryLabel: 'Residential Interior · Villa Design',
    location: 'Ahmedabad',
    year: '',
    heroImage: '/assets/aistudio/image_e3767538.png',
    summary: 'The project involved selecting an existing villa in Ahmedabad and redesigning its interiors while keeping the original floor plan unchanged. Guided by a Natural Modern Interior Design theme.',
    scope: [
      'Theme: Natural Modern Interior Design',
      'Ground Floor & First Floor Plans',
      'Sections AA’–DD’',
      'Bedroom Plan & Elevations A–D',
      'Bathroom Plan & Sections AA’–DD’'
    ],

    introduction: 'The project involved selecting an existing villa in Ahmedabad and redesigning its interiors. The original floor plan had to remain unchanged. The task was to understand the interior spaces, choose a specific design theme, and design the furniture placement, colours, materials, and interiors according to that theme.',

    designBrief: {
      clientOrContext: '05 | Villa Interior Design — Existing Villa in Ahmedabad',
      challenge: 'The original floor plan had to remain unchanged.',
      objectives: [
        'Understand the interior spaces of an existing villa in Ahmedabad while preserving the original floor plan.',
        'Select and apply the Natural Modern Interior Design theme across every interior zone.',
        'Design furniture placement, colours, materials, and finishes so each space is functional, comfortable, and visually connected.'
      ]
    },

    siteContext: {
      locationDetails: 'Existing two-storey residential villa in Ahmedabad featuring verandahs, courtyard, vestibule, foyer, living, dining, kitchen, terraces, and private bedrooms.',
      microclimate: 'Indoor spaces connect directly to verandahs, terraces, planters, and open courtyard pockets.',
      culturalContext: 'Residential villa home designed for functional daily living and visual continuity.'
    },

    research: {
      methodology: 'Spatial evaluation of the existing Ground Floor and First Floor villa plans prior to furniture placement and theme application.',
      insights: [
        'Ground Floor connects living room, dining, kitchen, courtyard, vestibule, foyer, verandah, and bedroom suites.',
        'First Floor organises master bedrooms (M. Bedroom-03, M. Bedroom-04, M. Bedroom-05), central lounge, dress/toilet zones, verandah, planters, and terraces.'
      ]
    },

    userStudy: [
      {
        role: 'Communal & Living Zones',
        needs: 'Functional, comfortable, and visually connected shared spaces.',
        spatialResponse: 'Coordinated furniture placement across Living Room, Dining, Verandah, and Lounge.'
      },
      {
        role: 'Bedroom & Bathroom Suites',
        needs: 'Resolved material finishes, storage, and vertical wall compositions.',
        spatialResponse: 'Developed through Bedroom Plan & Elevations A–D and Bathroom Plan & Sections AA’–DD’.'
      }
    ],

    conceptDevelopment: {
      primaryMetaphor: 'The concept focuses on creating a well-designed home based on a selected interior theme. The aim is to make each space functional, comfortable, and visually connected through furniture, colours, materials, and finishes.',
      spatialPrinciples: [
        'Original floor plan preserved unchanged.',
        'Natural Modern Interior Design palette unifying stone, wood, cane, and textured fabrics.',
        'Visual continuity across plans, sections, bedroom elevations, and bathroom details.'
      ]
    },

    ideation: {
      explorations: [
        'Natural Modern Material & Colour Moodboard.',
        'Ground Floor & First Floor CAD and Rendered Furniture Layouts.',
        'Four full villa sections (AA’, BB’, CC’, DD’) plus Bedroom & Bathroom elevations.'
      ],
      evolution: 'Progressed from the unchanged existing CAD footprint and Natural Modern theme curation to rendered floor plans, four full architectural sections, and detailed bedroom and bathroom elevations.'
    },

    zoning: {
      publicToPrivateRatio: 'Ground Floor (Living, Dining, Kitchen, Courtyard, Verandahs & Bedrooms) · First Floor (Lounge, Master Bedrooms, Planters & Terraces)',
      zones: [
        { name: 'Ground Floor — Living, Dining, Kitchen & Courtyard', percentage: 50, description: 'Shared living room, dining, kitchen, store, kitchen yard, wash, vestibule, foyer, courtyard, verandah, and bedrooms.' },
        { name: 'First Floor — Master Bedrooms, Lounge & Terraces', percentage: 50, description: 'M. Bedroom-03, M. Bedroom-04, M. Bedroom-05, dress/toilet suites, central lounge, verandah, planters, and terraces.' }
      ]
    },

    spatialPlanning: {
      circulationConcept: 'Preserving the existing villa circulation through the vestibule, foyer, verandahs, and upper lounge.',
      keyTransitions: [
        'Verandahs and courtyards framing the transition between landscaped perimeter and interior living zones.',
        'Central staircase and lift connecting Ground Floor foyer and First Floor lounge.'
      ]
    },

    materialPalette: [
      { name: 'Natural Stone & Textured Plaster', category: 'Wall Surfaces', description: 'Tactile split stone and neutral plaster finishes from the Natural Modern material board.', finish: 'Natural Matte', colorHex: '#B8AEA0' },
      { name: 'Fluted & Warm Timber', category: 'Wall Paneling & Millwork', description: 'Vertical fluted timber cladding, wood doors, and vanity cabinetry.', finish: 'Natural Wood', colorHex: '#8E5B3A' },
      { name: 'Woven Cane, Jute & Linen', category: 'Lighting & Textiles', description: 'Woven pendant lighting and textured natural upholstery swatches.', finish: 'Woven Fibre', colorHex: '#CBB89D' },
      { name: 'Botanical Greenery', category: 'Landscape & Planters', description: 'Integrated planters, courtyards, and villa perimeter planting.', finish: 'Natural Foliage', colorHex: '#5C7457' }
    ],

    furnitureAndLighting: {
      lightingStrategy: 'Natural Modern lighting combining woven rattan pendants and slender vertical bedside suspension fixtures.',
      keyPieces: [
        'Living & Dining seating aligned with open verandah glazing',
        'Custom bedroom headboard & full-height sliding wardrobe',
        'Bathroom vanity cabinetry and stacked vertical tile walls'
      ],
      fixtures: ['Woven pendant lamp', 'Linear vertical bedside pendants', 'Black wall-mounted bath fittings']
    },

    technicalDrawings: [],

    visualizations: [
      { perspective: 'Ground Floor Rendered Plan', caption: 'Rendered furniture layout and landscaping for the Ground Floor.', imageUrl: '/assets/villa-extracted/plan_rendered_ground.png' },
      { perspective: 'First Floor Rendered Plan', caption: 'Rendered furniture layout and terraces for the First Floor.', imageUrl: '/assets/villa-extracted/plan_rendered_first.png' },
      { perspective: 'Section CC’', caption: 'Longitudinal section showing living, kitchen, courtyard opening, and upper bedrooms.', imageUrl: '/assets/villa-extracted/section_cc.png' },
      { perspective: 'Section DD’', caption: 'Transverse villa section illustrating staircase/lift core, terrace, and bedroom interiors.', imageUrl: '/assets/villa-extracted/section_dd.png' }
    ],

    finalDesign: {
      description: 'The aim is to make each space functional, comfortable, and visually connected through furniture, colours, materials, and finishes while retaining the original floor plan of the villa.',
      deliverables: [
        'Project Brief & Concept Brief',
        'Natural Modern Material & Colour Moodboard',
        'Ground Floor & First Floor CAD + Rendered Plans',
        'Sections AA’, BB’, CC’ & DD’',
        'Bedroom Plan & Elevations A–D',
        'Bathroom Plan & Sections AA’–DD’'
      ]
    },

    reflection: {
      learnings: 'Developing furniture placement, colours, materials, and interiors within an unchanged villa floor plan.',
      academicSignificance: '05 | Villa Interior Design — Natural Modern Interior Design'
    },

    villaCaseStudy: {
      theme: 'Natural Modern Interior Design',
      projectBrief: 'The project involved selecting an existing villa in Ahmedabad and redesigning its interiors. The original floor plan had to remain unchanged. The task was to understand the interior spaces, choose a specific design theme, and design the furniture placement, colours, materials, and interiors according to that theme.',
      conceptBrief: 'The concept focuses on creating a well-designed home based on a selected interior theme. The aim is to make each space functional, comfortable, and visually connected through furniture, colours, materials, and finishes.',
      objectives: [
        'Select an existing residential villa in Ahmedabad and retain its original floor plan unchanged.',
        'Understand the interior spaces across Ground Floor and First Floor prior to intervention.',
        'Apply the Natural Modern Interior Design theme across furniture placement, colours, materials, and finishes.',
        'Achieve a functional, comfortable, and visually connected home resolved from overall plans down to bedroom and bathroom elevations.'
      ],
      materialFinishesNote: [
        'Textured split stone & neutral plaster surfaces',
        'Vertical fluted wood paneling & warm timber veneers',
        'Woven cane pendant lighting & coarse natural textiles',
        'Earthy palette spanning walnut brown, olive green, terracotta rust, warm taupe, and raw linen',
        'Stoneware vessels & botanical greenery integrated into planters and courtyards'
      ],
      moodboards: [
        {
          id: 'villa-mood-01',
          plate: 'Plate M.01',
          title: 'Material, Finish & Colour Swatch Board',
          subtitle: 'Split stone cladding, fluted timber slats, botanical foliage, woven cane pendant, linen, dark stone, wood planks & earthy colour strip',
          imageUrl: '/assets/villa-extracted/moodboard_collage.png',
          category: 'moodboard'
        },
        {
          id: 'villa-mood-02',
          plate: 'Plate M.02',
          title: 'Tactile Material Flatlay',
          subtitle: 'Natural stone slab paired with fluted wood, linen weave, smooth timber, ceramic vessels & olive foliage',
          imageUrl: '/assets/villa-extracted/moodboard_flatlay.png',
          category: 'moodboard'
        }
      ],
      plans: {
        ground: {
          cad: {
            id: 'villa-cad-ground',
            plate: 'Plate P.01',
            title: 'Ground Floor — CAD Plan',
            subtitle: 'Original structural walls preserved with Living Room, Dining, Kitchen, Store, Kitchen Yard, Verandah, Courtyard, Vestibule, Foyer, M. Bedroom-02 & Bed Room-1',
            imageUrl: '/assets/villa-extracted/plan_cad_ground_floor_cad.png',
            category: 'cad-plan'
          },
          rendered: {
            id: 'villa-ren-ground',
            plate: 'Plate P.02',
            title: 'Ground Floor — Rendered Furniture & Landscape Plan',
            subtitle: 'Designed furniture placement, flooring textures, courtyard greens & verandah paving',
            imageUrl: '/assets/villa-extracted/plan_rendered_ground.png',
            category: 'rendered-plan'
          },
          spaces: [
            'Verandah',
            'Living Room',
            'Dining',
            'Kitchen',
            'Store',
            'Kitchen Yard',
            'S.Room & S.Toilet',
            'Courtyard',
            'Vestibule',
            'Foyer',
            'Lift',
            'M. Bedroom-02 (Dress & Toilet)',
            'Bed Room-1'
          ]
        },
        first: {
          cad: {
            id: 'villa-cad-first',
            plate: 'Plate P.03',
            title: 'First Floor — CAD Plan',
            subtitle: 'Upper floor shell showing M. Bedroom-03, M. Bedroom-04, M. Bedroom-05, Dress / Toilet, Lounges, Verandah, Planters & Terraces',
            imageUrl: '/assets/villa-extracted/plan_cad_first_floor_cad.png',
            category: 'cad-plan'
          },
          rendered: {
            id: 'villa-ren-first',
            plate: 'Plate P.04',
            title: 'First Floor — Rendered Furniture & Terrace Plan',
            subtitle: 'Upper bedrooms, patterned bathroom tiling, timber deck, terrace seating & planter boxes',
            imageUrl: '/assets/villa-extracted/plan_rendered_first.png',
            category: 'rendered-plan'
          },
          spaces: [
            'Verandah',
            'Planter',
            'M. Bedroom-03',
            'M. Bedroom-04',
            'M. Bedroom-05',
            'Dress / Toilet',
            'Lounge',
            'Terrace',
            'Lift'
          ]
        }
      },
      sections: [
        {
          id: 'villa-sec-aa',
          plate: 'Plate S.01',
          title: 'Section AA’',
          subtitle: 'Cross-section through living wall cladding, doorway timber paneling, kitchen, staircase & upper terrazzo bathroom / lounge',
          imageUrl: '/assets/villa-extracted/section_aa.png',
          category: 'section'
        },
        {
          id: 'villa-sec-bb',
          plate: 'Plate S.02',
          title: 'Section BB’',
          subtitle: 'Section showing double-level lift core, timber doors, landscaped lawn openings & upper hallway artwork',
          imageUrl: '/assets/villa-extracted/section_bb.png',
          category: 'section'
        },
        {
          id: 'villa-sec-cc',
          plate: 'Plate S.03',
          title: 'Section CC’',
          subtitle: 'Longitudinal section cutting through ground living, marble/wood kitchen, courtyard view & upper bedroom interiors',
          imageUrl: '/assets/villa-extracted/section_cc.png',
          category: 'section'
        },
        {
          id: 'villa-sec-dd',
          plate: 'Plate S.04',
          title: 'Section DD’',
          subtitle: 'Transverse section across lift lobby, textured wall cladding, bedrooms & open terrace overlooking trees',
          imageUrl: '/assets/villa-extracted/section_dd.png',
          category: 'section'
        }
      ],
      bedroom: {
        plan: {
          id: 'villa-bed-plan',
          plate: 'Plate B.00',
          title: 'Bedroom Floor Plan',
          subtitle: 'Furniture placement & wall elevation orientation marker (A, B, C, D)',
          imageUrl: '/assets/villa-extracted/bedroom_plan.png',
          category: 'bedroom'
        },
        elevations: [
          {
            id: 'villa-bed-a',
            plate: 'Plate B.01',
            title: 'Elevation A',
            subtitle: 'Bed headboard wall with dark textured accent panel, bedside pendants & timber entry door',
            imageUrl: '/assets/villa-extracted/bedroom_elevation_a.png',
            category: 'bedroom'
          },
          {
            id: 'villa-bed-b',
            plate: 'Plate B.02',
            title: 'Elevation B',
            subtitle: 'Full-height two-panel sliding wardrobe with warm timber perimeter',
            imageUrl: '/assets/villa-extracted/bedroom_elevation_b.png',
            category: 'bedroom'
          },
          {
            id: 'villa-bed-c',
            plate: 'Plate B.03',
            title: 'Elevation C',
            subtitle: 'Dark vertical fluted wall paneling, timber trim, framed artwork & flush timber door',
            imageUrl: '/assets/villa-extracted/bedroom_elevation_c.png',
            category: 'bedroom'
          },
          {
            id: 'villa-bed-d',
            plate: 'Plate B.04',
            title: 'Elevation D',
            subtitle: 'Internal wardrobe elevation showing hanging rail, shelving & storage compartments',
            imageUrl: '/assets/villa-extracted/bedroom_elevation_d.png',
            category: 'bedroom'
          }
        ]
      },
      bathroom: {
        plan: {
          id: 'villa-bath-plan',
          plate: 'Plate W.00',
          title: 'Bathroom Floor Plan',
          subtitle: 'Geometric terrazzo floor tile layout, wooden vanity basin, WC & shower enclosure',
          imageUrl: '/assets/villa-extracted/bathroom_plan.png',
          category: 'bathroom'
        },
        sections: [
          {
            id: 'villa-bath-aa',
            plate: 'Plate W.01',
            title: 'Section AA’',
            subtitle: 'Stacked neutral ceramic wall tiles & wall-hung WC elevation',
            imageUrl: '/assets/villa-extracted/bathroom_section_aa.png',
            category: 'bathroom'
          },
          {
            id: 'villa-bath-bb',
            plate: 'Plate W.02',
            title: 'Section BB’',
            subtitle: 'Timber vanity cabinet, framed mirror, black shower fixtures & wooden door',
            imageUrl: '/assets/villa-extracted/bathroom_section_bb.png',
            category: 'bathroom'
          },
          {
            id: 'villa-bath-cc',
            plate: 'Plate W.03',
            title: 'Section CC’',
            subtitle: 'Vanity wall detail pairing warm wood finish against stacked beige tiles',
            imageUrl: '/assets/villa-extracted/bathroom_section_cc.png',
            category: 'bathroom'
          },
          {
            id: 'villa-bath-dd',
            plate: 'Plate W.04',
            title: 'Section DD’',
            subtitle: 'Walk-in shower screen with fluted glass texture and vertical tile cladding',
            imageUrl: '/assets/villa-extracted/bathroom_section_dd.png',
            category: 'bathroom'
          }
        ]
      }
    }
  },

  {
    id: 'staircase-design',
    number: '06',
    title: 'Contemporary Staircase Design',
    subtitle: 'Two-Flight Timber & Vertical Tensile Rope Staircase Within a Brick Frame',
    category: 'architectural-element',
    categoryLabel: 'Spatial Element / Staircase Design',
    location: 'Framed Brick & Water Court',
    year: '',
    heroImage: '/assets/staircase-extracted/staircase_3d_view_01.png',
    summary: 'The project involved designing a unique staircase by exploring its form, materials, and structural expression. The design combines a two-flight staircase, wooden treads, and vertical tensile ropes to create a distinctive staircase within a framed space.',
    scope: [
      'Project Brief & Concept Brief',
      'Mood Board & Material Curation',
      'Plans (Staircase & Water Body)',
      'Section AA’ & Orthographic Elevation',
      'Details A (Scale 1:8) & B (Scale 1:10)',
      '3D Views & Physical Scale Model'
    ],

    introduction: 'The project involved designing a unique staircase by exploring its form, materials, and structural expression. The design combines a two-flight staircase, wooden treads, and vertical tensile ropes to create a distinctive staircase within a framed space.',

    designBrief: {
      clientOrContext: '06 | Contemporary Staircase Design — Framed Brick & Water Space',
      challenge: 'Exploring architectural lightness and structural suspension through a two-flight staircase combining timber treads and slender vertical tensile ropes inside a solid brick frame.',
      objectives: [
        'Combine a two-flight staircase, wooden treads, and vertical tensile ropes within a compact 2843 × 2794 mm framed enclosure.',
        'Balance the solidity of the brick frame and concrete slab against slender 15 mm vertical tensile ropes.',
        'Integrate a reflective water feature (+100 mm finish level) below the flights to add depth and a quiet visual layer.'
      ]
    },

    siteContext: {
      locationDetails: 'Framed 2843 × 2794 mm masonry enclosure open across a ground-level water body.',
      microclimate: 'Natural daylight washes across the textured white wall plane, casting rhythmic linear shadows from the vertical tensile ropes.',
      culturalContext: 'Tactile pairing of brick masonry, warm oak wood, brass inlay edge trim, stone textures, and reflective water.'
    },

    research: {
      methodology: 'Structural & joinery exploration detailing vertical tensile rope anchoring, composite tread layering, and wall-to-tread connections.',
      insights: [
        'Detail A (Scale 1:8): 15 mm tensile rope anchored underside with screw fastening through the 56 mm × 254 mm composite tread.',
        'Composite Tread Build-Up: Concrete slab inlay (226 mm width), brass inlay divider, and 28 mm oak wood outer lip.',
        'Detail B (Scale 1:10): Dual screw anchor fixing the stair treads and mid-landing cleanly into the brick perimeter wall.'
      ]
    },

    userStudy: [
      {
        role: 'Circulation Experience',
        needs: 'Visual openness and clear vertical rhythm while ascending between +152 mm, +1302 mm mid-landing, and +2502 mm finish levels.',
        spatialResponse: 'Two-flight return staircase with 254 mm deep treads, 915 mm mid-landing, and floor-to-ceiling vertical tensile rope screen.'
      }
    ],

    conceptDevelopment: {
      primaryMetaphor: 'The concept explores the visual lightness of a staircase through the combination of timber treads and slender vertical tensile ropes. Set within a brick frame, the staircase creates a contrast between solid and lightweight elements, while the water feature below adds another visual layer to the overall composition.',
      spatialPrinciples: [
        'Solid vs. Lightweight Contrast: Textured brick enclosure framing floating wooden treads and slender vertical tensile ropes.',
        'Suspended Structural Expression: Full-height 15 mm vertical tensile ropes anchored from the ceiling slab to the tread underside.',
        'Layered Ground Reflection: Lower water body at +100 mm finish level mirroring light, vertical ropes, and floating timber steps.'
      ]
    },

    ideation: {
      explorations: [
        'Mood Board uniting dark walnut & live-edge timber, veined marble, rough limestone, reflective koi water basin, slender vertical tension rods, and warm wall sconces.',
        'Measured CAD Plan (2843 × 2794 mm), Water Body Plan (+100 mm), Section AA’ (+100 to +2502 mm), Orthographic Elevation, and Scales 1:8 / 1:10 Joinery Details.',
        'Three 3D architectural views (isometric, front, side section) paired with a close-up physical scale model study over water.'
      ],
      evolution: 'Developed from concept brief and material mood board into dimensioned millimeter plans, sections, scaled joinery details A & B, 3D views, and a physical model.'
    },

    zoning: {
      publicToPrivateRatio: 'Lower Water Body (+100 mm) · Flight 01 (Steps 01–07) · Mid-Landing (+1302 mm) · Flight 02 (Steps 09–16 to +2502 mm)',
      zones: [
        { name: 'Lower Flight (Steps 01–07)', percentage: 35, description: 'Seven 254 mm composite treads rising from +152 mm finish level toward the mid-landing.' },
        { name: 'Mid-Landing (Step 08 · +1302 mm)', percentage: 20, description: '915 mm deep cantilevered landing anchoring the turn between both flights (1202 mm rise from water slab).' },
        { name: 'Upper Flight (Steps 09–16)', percentage: 30, description: 'Ascending second flight suspended on vertical tensile ropes up to +2502 mm upper finish level.' },
        { name: 'Water Body (+100 mm)', percentage: 15, description: 'Full-footprint reflective water pool seated beneath the open staircase volume.' }
      ]
    },

    spatialPlanning: {
      circulationConcept: 'Two-flight U-shaped ascent framed within a 2843 × 2794 mm brick shell, stepping directly above an unbroken water court.',
      keyTransitions: [
        'Entry step (+152 mm finish level) rising across seven suspended treads past vertical tensile ropes.',
        'Half-turn across the 915 mm mid-landing (+1302 mm finish level) into the upper flight ascending to +2502 mm.'
      ]
    },

    materialPalette: [
      { name: 'Oak Wood Treads', category: 'Primary Timber', description: 'Warm oak wood tread casing forming the floating step profile (254 × 56 mm).', finish: 'Natural Matte Timber', colorHex: '#8E623D' },
      { name: 'Concrete Slab Inlay', category: 'Tread Core & Ceiling', description: '226 mm recessed concrete tread insert paired with the overhead concrete roof slab.', finish: 'Raw Cast Concrete', colorHex: '#B6B4AE' },
      { name: 'Brass Inlay', category: 'Joinery Trim', description: 'Refined brass inlay detail separating oak wood casing and concrete tread insert.', finish: 'Brushed Brass', colorHex: '#B89548' },
      { name: '15 mm Tensile Rope', category: 'Structural Suspension', description: 'Slender vertical tensile ropes anchored underside via screws to suspend the flights.', finish: 'Matte Black Tension Rod / Rope', colorHex: '#25272C' },
      { name: 'Brick Frame & Reflective Water', category: 'Enclosure & Base', description: 'Solid masonry walls framing an atmospheric water feature (+100 mm finish level) below.', finish: 'Textured Brick & Water', colorHex: '#7A4230' }
    ],

    furnitureAndLighting: {
      lightingStrategy: 'Top daylight shafts filtering down the vertical tensile ropes to cast graphic diagonal shadows across the framed brick wall and water pool.',
      keyPieces: [
        'Composite Oak Wood, Brass Inlay & Concrete Slab Treads (254 mm × 56 mm)',
        'Full-Height 15 mm Vertical Tensile Ropes with Underside Screw Anchor (Detail A)',
        'Masonry Wall Screw-Fixed Tread Brackets (Detail B)'
      ],
      fixtures: ['15 mm Tensile Ropes', 'Brass Inlay Edge Trim', 'Flush Wall Sconce Washers (Mood Board)']
    },

    technicalDrawings: [],

    visualizations: [
      { perspective: '3D View 01 — Isometric Perspective', caption: 'Full isometric view showing the brick frame, two-flight oak treads, vertical tensile ropes, and koi water feature.', imageUrl: '/assets/staircase-extracted/staircase_3d_view_01.png' },
      { perspective: '3D View 02 — Front Elevation Perspective', caption: 'Front 3D view illustrating flight alignment, mid-landing, ceiling rope anchors, and water pool base.', imageUrl: '/assets/staircase-extracted/staircase_3d_view_02.png' },
      { perspective: '3D View 03 — Side Sectional Perspective', caption: 'Cutaway 3D perspective revealing slatted shadow play and cantilever depth across both flights.', imageUrl: '/assets/staircase-extracted/staircase_3d_view_03.png' },
      { perspective: '3D View 04 — Physical Scale Model', caption: 'Close-up scale model studying timber treads, brass detailing, tensile rods, and teal water reflection.', imageUrl: '/assets/staircase-extracted/staircase_model_view_04.png' }
    ],

    finalDesign: {
      description: 'Combining wooden treads, brass inlays, concrete inserts, and 15 mm vertical tensile ropes inside a brick frame above a water body, the staircase achieves visual lightness without sacrificing structural clarity.',
      deliverables: [
        'Project Brief & Concept Brief',
        'Material & Atmosphere Mood Board',
        'Measured Staircase Plan (2843 × 2794 mm) & Water Body Plan (+100 mm)',
        'Section AA’ (+100 to +2502 mm) & Elevation',
        'Detail A (Scale 1:8) & Detail B (Scale 1:10)',
        '3D Views & Physical Scale Model Study'
      ]
    },

    reflection: {
      learnings: 'Exploring how form, material contrast, and slender vertical tension elements can turn everyday vertical circulation into an expressive spatial centerpiece.',
      academicSignificance: '06 | Contemporary Staircase Design — Structural & Material Expression'
    },

    staircaseCaseStudy: {
      subHeader: 'Two-Flight Timber & Tensile Rope Staircase Within a Brick Frame',
      projectBrief: 'The project involved designing a unique staircase by exploring its form, materials, and structural expression. The design combines a two-flight staircase, wooden treads, and vertical tensile ropes to create a distinctive staircase within a framed space.',
      conceptBrief: 'The concept explores the visual lightness of a staircase through the combination of timber treads and slender vertical tensile ropes. Set within a brick frame, the staircase creates a contrast between solid and lightweight elements, while the water feature below adds another visual layer to the overall composition.',
      measurementsUnit: 'ALL THE MEASUREMENTS ARE IN MM',
      keyDimensions: [
        { label: 'Overall Framed Footprint', value: '2843 × 2794 mm (1168 + 306 + 1168 mm)' },
        { label: 'Mid-Landing Width', value: '915 mm (+1302 mm Finish Level)' },
        { label: 'Tread Depth × Height', value: '254 mm × 56 mm (28 mm Oak / 226 mm Concrete)' },
        { label: 'Vertical Finish Levels', value: '+100 mm Water · +152 mm Start · +1302 mm Mid · +2502 mm Top' },
        { label: 'Suspension Element', value: '15 mm Vertical Tensile Rope with Screw Anchor' },
      ],
      materialSpecifications: [
        'Oak Wood outer tread profile (28 mm lip / 56 mm thickness)',
        'Concrete Slab recessed tread insert (226 mm) & overhead structural slab',
        'Brass Inlay precision transition strip between oak wood and concrete',
        '15 mm Vertical Tensile Ropes anchored through tread underside with screw (Detail A)',
        'Wall-side dual screw brackets fixed into perimeter brick wall (Detail B)',
        'Water Body at +100 mm finish level creating reflection beneath the staircase',
      ],
      moodboard: {
        id: 'stair-moodboard',
        plate: 'Plate 01',
        title: 'Mood Board — Materiality, Lighting & Water Atmosphere',
        subtitle: 'Walnut & live-edge timber, veined marble, rough limestone, wall sconces, slender vertical tension rods, koi water pool, and botanical accents.',
        imageUrl: '/assets/staircase-extracted/staircase_moodboard.png',
        category: 'moodboard',
      },
      plans: {
        staircasePlan: {
          id: 'stair-plan-main',
          plate: 'Plate 02',
          title: 'Staircase Plan (All Measurements in mm)',
          subtitle: '2843 × 2794 mm brick frame · Steps 01–15, 915 mm landing, 254 mm treads, +152 mm & +1302 mm finish levels, Concrete Slab, Brass Inlay, Oak Wood, Tensile Rope, A 1.1 / A’ 1.1 / B 2.1.',
          imageUrl: '/assets/staircase-extracted/staircase_plan.png',
          category: 'plan',
        },
        waterBodyPlan: {
          id: 'stair-plan-water',
          plate: 'Plate 03',
          title: 'Water Body Plan (+100 mm Finish Level)',
          subtitle: 'Ground-level water feature situated directly underneath the suspended two-flight staircase within the brick perimeter walls.',
          imageUrl: '/assets/staircase-extracted/staircase_water_plan.png',
          category: 'plan',
        },
      },
      sectionsAndElevation: [
        {
          id: 'stair-section-aa',
          plate: 'Plate 04',
          title: 'Section AA’',
          subtitle: 'Full vertical cut showing +100 mm base, 1202 mm rise to +1302 mm mid-landing, 2502 mm total height to +2502 mm finish level, steps 1–15, and full-height vertical tensile ropes.',
          imageUrl: '/assets/staircase-extracted/staircase_section_aa.png',
          category: 'section-elevation',
        },
        {
          id: 'stair-elevation',
          plate: 'Plate 05',
          title: 'Elevation',
          subtitle: 'Orthographic elevation depicting steps 1–16, vertical tensile rope suspension from ceiling concrete slab, 100 & 50 mm offsets, and Detail B wall support callout.',
          imageUrl: '/assets/staircase-extracted/staircase_elevation.png',
          category: 'section-elevation',
        },
      ],
      joineryDetails: [
        {
          id: 'stair-detail-a',
          plate: 'Plate 06 · Scale 1:8',
          title: 'Detail - A (Scale 1:8) — Tensile Rope & Composite Tread Section',
          subtitle: '15 mm tensile rope + underside screw anchor; Concrete Slab + Brass Inlay + Oak Wood build-up; 254 mm tread depth × 56 mm total thickness (28 / 226 mm).',
          imageUrl: '/assets/staircase-extracted/staircase_detail_a.png',
          category: 'detail',
        },
        {
          id: 'stair-detail-b',
          plate: 'Plate 07 · Scale 1:10',
          title: 'Detail - B (Scale 1:10) — Masonry Wall Anchor',
          subtitle: 'Wall-edge structural connection using dual screw fasteners anchoring the tread/landing profile into the brick wall frame.',
          imageUrl: '/assets/staircase-extracted/staircase_detail_b.png',
          category: 'detail',
        },
      ],
      views3D: [
        {
          id: 'stair-3d-01',
          plate: 'Plate 08',
          title: '3D View 01 — Isometric Framed Space',
          subtitle: 'Isometric render highlighting brick walls, overhead ceiling frame, slatted vertical shadows, wooden treads, vertical tensile ropes, and koi water feature.',
          imageUrl: '/assets/staircase-extracted/staircase_3d_view_01.png',
          category: '3d-view',
        },
        {
          id: 'stair-3d-02',
          plate: 'Plate 09',
          title: '3D View 02 — Front Architectural Perspective',
          subtitle: 'Direct front perspective aligning both flights, mid-landing turn, tensile ropes, and dark reflective pool.',
          imageUrl: '/assets/staircase-extracted/staircase_3d_view_02.png',
          category: '3d-view',
        },
        {
          id: 'stair-3d-03',
          plate: 'Plate 10',
          title: '3D View 03 — Side Sectional Perspective',
          subtitle: 'Cutaway perspective illustrating cantilevered mid-landing depth and light interaction against the interior frame.',
          imageUrl: '/assets/staircase-extracted/staircase_3d_view_03.png',
          category: '3d-view',
        },
        {
          id: 'stair-model-04',
          plate: 'Plate 11',
          title: '3D View 04 — Physical Scale Model Photograph',
          subtitle: 'Close-up scale model verifying wooden tread spacing, brass edge inlay, dark vertical tensile cords, and textured teal water base.',
          imageUrl: '/assets/staircase-extracted/staircase_model_view_04.png',
          category: '3d-view',
        },
      ],
    }
  }
];

export const STUDIO_PHILOSOPHY = [
  {
    pillar: 'SPACE',
    subtitle: 'Movement & Spatial Psychology',
    statement: 'Understanding how people move, interact and experience a space.',
    description: 'Architecture begins where the body engages with physical volume. We design circulation paths that feel organic, choreographing sightlines and transitions so that entering a room becomes a sequence of emotional discovery.'
  },
  {
    pillar: 'MATERIAL',
    subtitle: 'Tactility, Texture & Identity',
    statement: 'Using material, texture and detail to create atmosphere and identity.',
    description: 'We prioritize honest, unvarnished materials—lime plaster, regional stone, solid timber, handwoven textiles, and living metals. Materials should weather gracefully, recording time and touch rather than concealing imperfection.'
  },
  {
    pillar: 'FUNCTION',
    subtitle: 'Pragmatic Rigor & Precision',
    statement: 'Balancing practical requirements with spatial character.',
    description: 'A space that fails functionally can never be beautiful. We approach storage, acoustic containment, thermal comfort, and service distribution with engineering discipline so that visual quietness remains effortless.'
  },
  {
    pillar: 'EXPERIENCE',
    subtitle: 'Atmosphere & Everyday Memory',
    statement: 'Designing spaces that create memorable everyday experiences.',
    description: 'Beyond visual photography lies how a space feels at sunrise, how sound resonates in a vaulted ceiling, and how light falls across an evening dining table. We craft environments that linger in human memory.'
  }
];

export const PROCESS_STAGES = [
  {
    step: '01',
    name: 'Research',
    title: 'Site Documentation & Cultural Inquest',
    description: 'Deep physical site surveying, historical archival research, microclimatic mapping, and contextual cultural study.',
    artifacts: ['Sun path diagrams', 'Measured site drawings', 'Vernacular precedent studies']
  },
  {
    step: '02',
    name: 'Understand',
    title: 'User Behavioral Study & Spatial Programming',
    description: 'Observational user tracking, empathetic stakeholder interviews, circadian habit mapping, and spatial capacity matrices.',
    artifacts: ['User personas', 'Circulation bottlenecks analysis', 'Functional spatial brief']
  },
  {
    step: '03',
    name: 'Explore',
    title: 'Concept Ideation & Spatial Metaphor',
    description: 'Rapid physical sketch models, massing studies, volumetric zoning, and hand-drawn conceptual perspectives.',
    artifacts: ['Concept sketches', '1:50 study models', 'Atmospheric moodboards']
  },
  {
    step: '04',
    name: 'Develop',
    title: 'Zoning, Spatial Planning & Material Exploration',
    description: 'Rigorous CAD space planning, sensory material boards, physical swatch sourcing, and acoustic insulation analysis.',
    artifacts: ['Scaled floor plans', 'Material tactile palettes', 'Joinery concept mockups']
  },
  {
    step: '05',
    name: 'Resolve',
    title: 'Technical Detailing & 3D Visualization',
    description: 'AutoCAD construction documentation, 1:10 joinery specifications, lighting schedules, and photorealistic 3D rendering.',
    artifacts: ['Sections & elevations', 'Millwork fabrication drawings', '3D digital twins']
  },
  {
    step: '06',
    name: 'Experience',
    title: 'Physical Prototype, Styling & Realization',
    description: '1:1 furniture prototyping, material mockups on site, bespoke styling, and final human user sensory evaluation.',
    artifacts: ['Physical prototypes', 'Constructed spaces', 'Sensory post-occupancy reviews']
  }
];

export const SKILLS_DATA = {
  interiorDesign: [
    'Spatial Planning',
    'Concept Development',
    'Furniture Design',
    'Material Selection',
    'Lighting',
    'Moodboarding',
    'Interior Styling'
  ],
  representation: [
    'AutoCAD',
    'SketchUp',
    '3D Visualization',
    'Adobe Photoshop',
    'Adobe Illustrator',
    'Adobe InDesign'
  ],
  designResearch: [
    'Site Analysis',
    'User Research',
    'Case Studies',
    'Programming',
    'Concept Development',
    'Visual Communication'
  ],
  uxui: [
    'UX Research',
    'Information Architecture',
    'Wireframing',
    'Interface Design',
    'User Experience'
  ]
};
