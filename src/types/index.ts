export type ProjectCategory = 
  | 'all'
  | 'adaptive-reuse'
  | 'furniture'
  | 'residential'
  | 'digital-ux';

export interface MaterialItem {
  name: string;
  category: string;
  description: string;
  finish: string;
  colorHex: string;
}

export interface DrawingItem {
  id: string;
  title: string;
  type: 'Plan' | 'Section' | 'Elevation' | 'Axonometric' | 'Diagram' | 'Detail';
  scale: string;
  caption: string;
  svgType: 'site-plan' | 'ground-floor' | 'section-cut' | 'zoning-flow' | 'furniture-joinery' | 'spatial-wireframe';
}

export interface UserPersona {
  role: string;
  needs: string;
  spatialResponse: string;
}

export interface VillaDrawingItem {
  id: string;
  plate: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  category: 'moodboard' | 'cad-plan' | 'rendered-plan' | 'section' | 'bedroom' | 'bathroom';
}

export interface VillaCaseStudyData {
  theme: string;
  projectBrief: string;
  conceptBrief: string;
  objectives: string[];
  materialFinishesNote: string[];
  moodboards: VillaDrawingItem[];
  plans: {
    ground: {
      cad: VillaDrawingItem;
      rendered: VillaDrawingItem;
      spaces: string[];
    };
    first: {
      cad: VillaDrawingItem;
      rendered: VillaDrawingItem;
      spaces: string[];
    };
  };
  sections: VillaDrawingItem[];
  bedroom: {
    plan: VillaDrawingItem;
    elevations: VillaDrawingItem[];
  };
  bathroom: {
    plan: VillaDrawingItem;
    sections: VillaDrawingItem[];
  };
}

export interface AdaptiveReuseDrawingItem {
  id: string;
  plate: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  category:
    | 'site-photo'
    | 'moodboard'
    | 'floor-plan'
    | 'section'
    | 'spa-view'
    | 'restaurant-view'
    | 'deluxe-plan'
    | 'deluxe-view';
}

export interface AdaptiveReuseSpaceStep {
  number: string;
  title: string;
  description: string;
}

export interface AdaptiveReuseCaseStudyData {
  subHeader: string;
  projectBrief: string;
  conceptBrief: string;
  spacePlanning: AdaptiveReuseSpaceStep[];
  sitePhotos: AdaptiveReuseDrawingItem[];
  moodboard: AdaptiveReuseDrawingItem;
  plans: {
    ground: {
      drawing: AdaptiveReuseDrawingItem;
      annotations: string[];
    };
    first: {
      drawing: AdaptiveReuseDrawingItem;
      annotations: string[];
    };
  };
  sections: AdaptiveReuseDrawingItem[];
  interiorViews: {
    spaRoom: AdaptiveReuseDrawingItem[];
    restaurant: AdaptiveReuseDrawingItem[];
    deluxePlan: AdaptiveReuseDrawingItem;
    deluxeRoom: AdaptiveReuseDrawingItem[];
  };
}

export interface MarketMindfulnessDrawingItem {
  id: string;
  plate: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  category: 'market-photo' | 'mood-photo' | 'cad-plan' | 'section';
}

export interface MarketMindfulnessCaseStudyData {
  subHeader: string;
  projectBrief: string;
  conceptBrief: string;
  spacePlanning: AdaptiveReuseSpaceStep[];
  existingMarketPhotos: MarketMindfulnessDrawingItem[];
  moodPhotos: MarketMindfulnessDrawingItem[];
  plan: {
    drawing: MarketMindfulnessDrawingItem;
    dimensions: string[];
    annotations: string[];
  };
  sections: {
    drawing: MarketMindfulnessDrawingItem;
    dimensions: string[];
  }[];
}

export interface KitchenDrawingItem {
  id: string;
  plate: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  category:
    | 'moodboard'
    | 'cad-plan'
    | 'cad-elevation'
    | 'rendered-plan'
    | 'rendered-elevation';
}

export interface KitchenMaterialItem {
  id: string;
  name: string;
  application: string;
  stageNote: string;
  imageUrl: string;
  colorHex: string;
}

export interface KitchenFixtureItem {
  id: string;
  category: 'sink' | 'faucet' | 'refrigerator' | 'appliance' | 'hardware';
  categoryLabel: string;
  name: string;
  brand?: string;
  dimensions?: string;
  finishOrMaterial?: string;
  specifications: string[];
  imageUrl: string;
}

export interface KitchenCaseStudyData {
  subHeader: string;
  projectBrief: string;
  conceptBrief: string;
  designIntent: string;
  objectives: string[];
  moodboard: KitchenDrawingItem;
  cadPlans: KitchenDrawingItem[];
  cadElevations: KitchenDrawingItem[];
  renderedPlans: KitchenDrawingItem[];
  renderedElevations: KitchenDrawingItem[];
  materials: KitchenMaterialItem[];
  fixtures: KitchenFixtureItem[];
  planDimensionsMm: string[];
  cabinetZones: string[];
}

export interface FusionFurnitureDrawingItem {
  id: string;
  plate: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  category:
    | 'render'
    | 'sketch'
    | 'working-drawing'
    | 'joinery'
    | 'inspiration'
    | 'material';
  annotations?: string[];
}

export interface FusionFurnitureInspirationItem {
  id: string;
  number: string;
  title: string;
  region: 'Punjab' | 'Goa';
  description: string;
  imageUrl: string;
}

export interface FusionFurnitureMotifRow {
  detail: string;
  inspiration: string;
  purpose: string;
}

export interface FusionFurnitureJoineryItem {
  id: string;
  plate: string;
  title: string;
  category: 'structural' | 'roof' | 'seating' | 'suspension';
  categoryLabel: string;
  summary: string;
  whyItWorks: string[];
  components: string[];
  imageUrl: string;
  secondaryImageUrl?: string;
  referencePhotoUrl?: string;
}

export interface FusionFurnitureMaterialItem {
  id: string;
  name: string;
  application: string;
  description: string;
  imageUrl: string;
  colorHex: string;
  finishTone: string;
}

export interface FusionFurnitureCaseStudyData {
  subHeader: string;
  furnitureTitle: string;
  projectBrief: string;
  conceptHeadline: string;
  conceptBrief: string;
  designIntent: string;
  twoInOneHeadline: string;
  twoInOnePrimaryNote: string;
  twoInOneSecondaryNote: string;
  purposes: string[];
  inspirations: FusionFurnitureInspirationItem[];
  motifTable: FusionFurnitureMotifRow[];
  conceptSketchSheet: FusionFurnitureDrawingItem;
  developmentStages: {
    step: string;
    phase: string;
    title: string;
    description: string;
    imageUrl: string;
    drawingId: string;
    notes: string[];
  }[];
  workingDrawing: FusionFurnitureDrawingItem;
  dimensionsMm: { label: string; value: string }[];
  joineryDetails: FusionFurnitureJoineryItem[];
  materials: FusionFurnitureMaterialItem[];
  colourPalette: { name: string; hex: string; role: string }[];
  finalRenders: FusionFurnitureDrawingItem[];
}

export interface ProjectCaseStudy {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: ProjectCategory;
  categoryLabel: string;
  location: string;
  year: string;
  heroImage: string;
  summary: string;
  scope: string[];
  
  // 16 Structured Case Study Points
  introduction: string;
  designBrief: {
    clientOrContext: string;
    challenge: string;
    objectives: string[];
  };
  siteContext: {
    locationDetails: string;
    microclimate: string;
    culturalContext: string;
  };
  research: {
    methodology: string;
    insights: string[];
  };
  userStudy: UserPersona[];
  conceptDevelopment: {
    primaryMetaphor: string;
    spatialPrinciples: string[];
  };
  ideation: {
    explorations: string[];
    evolution: string;
  };
  zoning: {
    publicToPrivateRatio: string;
    zones: { name: string; percentage: number; description: string }[];
  };
  spatialPlanning: {
    circulationConcept: string;
    keyTransitions: string[];
  };
  materialPalette: MaterialItem[];
  furnitureAndLighting: {
    lightingStrategy: string;
    keyPieces: string[];
    fixtures: string[];
  };
  technicalDrawings: DrawingItem[];
  visualizations: {
    caption: string;
    perspective: string;
    imageUrl?: string;
  }[];
  finalDesign: {
    description: string;
    deliverables: string[];
  };
  reflection: {
    learnings: string;
    academicSignificance: string;
  };

  villaCaseStudy?: VillaCaseStudyData;
  adaptiveReuseCaseStudy?: AdaptiveReuseCaseStudyData;
  marketMindfulnessCaseStudy?: MarketMindfulnessCaseStudyData;
  kitchenCaseStudy?: KitchenCaseStudyData;
  fusionFurnitureCaseStudy?: FusionFurnitureCaseStudyData;
}

