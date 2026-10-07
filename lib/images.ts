/**
 * Global Image Configuration
 *
 * Centralized image URLs for the entire project.
 * ALL images served from ImageKit CDN for optimal performance.
 *
 * Organization:
 * - common/ = used on both mobile and desktop
 * - desktop/ = desktop-only (hidden on mobile)
 * - mobile/ = mobile-only (hidden on desktop)
 */

const IMAGEKIT_BASE =
  process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || "https://ik.imagekit.io/bi3ktgt58";

export const IMAGES = {
  // ============================================
  // PASSES - All common (shown on both platforms)
  // ============================================
  passes: {
    yatri: `${IMAGEKIT_BASE}/passes/yatri-pass.png`,
    darbar: `${IMAGEKIT_BASE}/passes/darbar-pass.png`,
    swarnim: `${IMAGEKIT_BASE}/passes/swarnim-pass.png`,
  },

  // ============================================
  // HERO SECTION - All common
  // ============================================
  hero: {
    logo: `${IMAGEKIT_BASE}/hero/common/kashiyatra-logo.png`,
    heroLogo: `${IMAGEKIT_BASE}/hero/common/hero-logo.png`,
    ghatsDay: `${IMAGEKIT_BASE}/hero/common/ghats-day.png`,
    ghatsNight: `${IMAGEKIT_BASE}/hero/common/ghats-night.png`,
    temple: `${IMAGEKIT_BASE}/hero/common/kashivishwanath-temple.png`,
    varanasiBack: `${IMAGEKIT_BASE}/hero/common/varanasi-back.png`,
    steppingStone: "/home/hero/common/stepping-stone.webp",
    kites: `${IMAGEKIT_BASE}/hero/common/kites.png`,
  },

  // ============================================
  // NAVBAR - Page-specific variants
  // ============================================
  navbar: {
    // Main/Home navbar (golden/cream theme)
    main: {
      background: `${IMAGEKIT_BASE}/navbar/main/nav-bg.png`,
      badge: `${IMAGEKIT_BASE}/navbar/main/nav-badge-home.png`,
    },
    // About page navbar (purple/blue concert theme)
    about: {
      background: `${IMAGEKIT_BASE}/navbar/about/navbar-about.png`,
      badge: `${IMAGEKIT_BASE}/navbar/about/nav-badge-about.png`,
    },
    // Sponsors page navbar (green/gold nature theme)
    sponsor: {
      background: `${IMAGEKIT_BASE}/navbar/sponsor/nav-sponsor.png`,
      badge: `${IMAGEKIT_BASE}/navbar/sponsor/nav-badge-sponsor.png`,
    },
    // Legacy aliases for backwards compatibility
    background: `${IMAGEKIT_BASE}/navbar/main/nav-bg.png`,
    badge: `${IMAGEKIT_BASE}/navbar/main/nav-badge-home.png`,
  },

  // ============================================
  // BANARASI VIBES SECTION
  // ============================================
  vibes: {
    // Common (both platforms)
    background: `${IMAGEKIT_BASE}/vibes/common/vibes-bg.png`,
    backgroundDark: "/home/banarasiVibes/banarasi-vibes-bg-dark.webp",
    mahamana: `${IMAGEKIT_BASE}/vibes/common/mahamana.png`,
    bhuGate: `${IMAGEKIT_BASE}/vibes/common/bhu-gate.png`,
    rickshaw: "/home/banarasiVibes/rickshaw.webp",

    // Desktop-only decorative characters
    mandala: `${IMAGEKIT_BASE}/vibes/desktop/mandala.png`,
    gangaAartiSaint: `${IMAGEKIT_BASE}/vibes/desktop/ganga-aarti-saint.png`,
    bharatnatyamDancer: `${IMAGEKIT_BASE}/vibes/desktop/bharatnatyam-dancer.png`,

    // Mobile-only decorative elements
    mobile: {
      rangoliBg: `${IMAGEKIT_BASE}/vibes/mobile/rangoli-bg.png`,
      trishul: `${IMAGEKIT_BASE}/vibes/mobile/trishul.png`,
      lotusPairs: `${IMAGEKIT_BASE}/vibes/mobile/lotus-pairs.png`,
      etherealDancer: `${IMAGEKIT_BASE}/vibes/mobile/ethereal-dancer.png`,
      diyaPairs: `${IMAGEKIT_BASE}/vibes/mobile/diya-pairs.png`,
      conchShell: `${IMAGEKIT_BASE}/vibes/mobile/conch-shell.png`,
      varanasiSilhouette: `${IMAGEKIT_BASE}/vibes/mobile/varanasi-silhouette.png`,
    },
  },

  // ============================================
  // FEST HIGHLIGHTS SECTION
  // ============================================
  highlights: {
    // Common
    background: `${IMAGEKIT_BASE}/festival-vibes/common/festive-vibes-bg.png`,
  },

  // ============================================
  // FESTIVAL VIBES / THE EXPERIENCE SECTION
  // ============================================
  festivalVibes: {
    dj: `${IMAGEKIT_BASE}/festival-vibes/common/dj.png`,
    sareeDrape: `${IMAGEKIT_BASE}/festival-vibes/common/saree-drape.png`,
  },

  // ============================================
  // PRO NITES SECTION
  // ============================================
  proNites: {
    dancingGirl: `${IMAGEKIT_BASE}/pro-nites/common/dancing-girl.png`,
    moon: `${IMAGEKIT_BASE}/pro-nites/common/moon.png`,
    silhouette: `${IMAGEKIT_BASE}/pro-nites/common/silhouette.png`,
    aerobics: `${IMAGEKIT_BASE}/pro-nites/common/aerobics.png`,
  },

  // ============================================
  // FOOTER SECTION - Desktop decorative elements
  // ============================================
  footer: {
    etherealDancer: `${IMAGEKIT_BASE}/footer/desktop/ethereal-dancer.png?v=3`,
    floatingGarland: `${IMAGEKIT_BASE}/footer/desktop/floating-garland.png`,
    ghatSilhouette: `${IMAGEKIT_BASE}/footer/desktop/ghat-silhouette.png`,
    subtleRangoli: `${IMAGEKIT_BASE}/footer/desktop/subtle-rangoli.png`,
    floatingSpeaker: `${IMAGEKIT_BASE}/footer/desktop/floating-speaker.png`,
    concertFloor: `${IMAGEKIT_BASE}/footer/desktop/concert-floor.png`,
    footerDancer: `${IMAGEKIT_BASE}/footer/desktop/footer-dancer.png`,
  },

  // ============================================
  // MISCELLANEOUS
  // ============================================
  misc: {
    lordShiva: `${IMAGEKIT_BASE}/misc/lord-shiva.png`,
    welcomeFlag: `${IMAGEKIT_BASE}/misc/welcome-flag.png`,
  },

  // ============================================
  // ABOUT PAGE - All common
  // ============================================
  about: {
    background: `${IMAGEKIT_BASE}/about/common/about-bg.png`,
    mandalaOrnament: `${IMAGEKIT_BASE}/about/common/mandala-ornament.png`,
    peacock: `${IMAGEKIT_BASE}/about/common/peacock.png`,
    omLotus: `${IMAGEKIT_BASE}/about/common/om-lotus.png`,
    mysticDivider: `${IMAGEKIT_BASE}/about/common/mystic-divider.png`,
    diyaCluster: `${IMAGEKIT_BASE}/about/common/diya-cluster.png`,
    cornerOrnament: `${IMAGEKIT_BASE}/about/common/corner-ornament.png`,
    bhuGate: `${IMAGEKIT_BASE}/about/common/bhu-royal-gate.png`,
    ghatsSilhouette: `${IMAGEKIT_BASE}/about/common/ghats-silhouette.png`,
    heroLeftAbout: `${IMAGEKIT_BASE}/about/common/hero-left-about.png`,
    dancerGirlHeroAbout: `${IMAGEKIT_BASE}/about/common/dancer-girl-hero-about.png`,
    // IIT BHU Stamps
    stamps: {
      mandir: `${IMAGEKIT_BASE}/about/stamps/mandir.png`,
      mainBuilding: `${IMAGEKIT_BASE}/about/stamps/main-building.png`,
      library: `${IMAGEKIT_BASE}/about/stamps/library.png`,
      kyVenue: `${IMAGEKIT_BASE}/about/stamps/ky-venue.png`,
      heritageHostel: `${IMAGEKIT_BASE}/about/stamps/heritage-hostel.png`,
    },
    // Slider images - Left row (moving left to right)
    slider: {
      left1: `${IMAGEKIT_BASE}/about/slider/left1.jpg`,
      left2: `${IMAGEKIT_BASE}/about/slider/left2.jpg`,
      left3: `${IMAGEKIT_BASE}/about/slider/left3.jpg`,
      left4: `${IMAGEKIT_BASE}/about/slider/left4.jpg`,
      left5: `${IMAGEKIT_BASE}/about/slider/left5.jpg`,
      left6: `${IMAGEKIT_BASE}/about/slider/left6.jpg`,
      // Right row (moving right to left)
      right1: `${IMAGEKIT_BASE}/about/slider/right1.jpg`,
      right2: `${IMAGEKIT_BASE}/about/slider/right2.jpg`,
      right3: `${IMAGEKIT_BASE}/about/slider/right3.jpg`,
      right4: `${IMAGEKIT_BASE}/about/slider/right4.jpg`,
      right5: `${IMAGEKIT_BASE}/about/slider/right5.jpg`,
      right6: `${IMAGEKIT_BASE}/about/slider/right6.jpg`,
    },
  },

  // ============================================
  // CONTACT PAGE - All common
  // ============================================
  contact: {
    // Contact-specific images
    envelopeScroll: `${IMAGEKIT_BASE}/contact/common/envelope-scroll.png`,
    conch: `${IMAGEKIT_BASE}/contact/common/conch.png`,
    lotusMandala: `${IMAGEKIT_BASE}/contact/common/lotus-mandala.png`,
    floatingDiya: `${IMAGEKIT_BASE}/contact/common/floating-diya.png`,
    // Shared decorative images (reused from about)
    mandalaOrnament: `${IMAGEKIT_BASE}/about/common/mandala-ornament.png`,
    peacock: `${IMAGEKIT_BASE}/about/common/peacock.png`,
    mysticDivider: `${IMAGEKIT_BASE}/about/common/mystic-divider.png`,
    cornerOrnament: `${IMAGEKIT_BASE}/about/common/corner-ornament.png`,
  },

  // ============================================
  // LOGIN PAGE - All common
  // ============================================
  login: {
    mysticGate: `${IMAGEKIT_BASE}/login/common/mystic-gate.png`,
  },

  // ============================================
  // PROFILE PAGE - Decorative elements
  // ============================================
  profile: {
    decorativeCorner: `${IMAGEKIT_BASE}/profile/common/decorative-corner.png`,
    divider: `${IMAGEKIT_BASE}/profile/common/divider.png`,
  },

  // ============================================
  // SINGERS / ARTISTS - Pro Nites
  // ============================================
  singers: {
    jubinNautiyal: `${IMAGEKIT_BASE}/singers/jubin-nautiyal.webp`,
    darshanRawal: `${IMAGEKIT_BASE}/singers/darshan-rawal.webp`,
    mohitChauhan: `${IMAGEKIT_BASE}/singers/mohit-chauhan.webp`,
    vishalShekhar: `${IMAGEKIT_BASE}/singers/vishal-shekhar.webp`,
    raftaar: `${IMAGEKIT_BASE}/singers/raftaar.jpeg`,
    ritviz: `${IMAGEKIT_BASE}/singers/ritviz.jpg`,
    anubhavBassi: `${IMAGEKIT_BASE}/singers/anubhav-bassi.jpeg`,
    mj5: `${IMAGEKIT_BASE}/singers/mj5-group.jpeg`,
  },

  // ============================================
  // SPONSORS
  // ============================================
  sponsors: {
    // Background
    background: `${IMAGEKIT_BASE}/sponsors/common/sponsor-bg.png`,

    // Decorative elements
    ornamentalDivider: `${IMAGEKIT_BASE}/sponsors/decorative/ornamental-divider.png`,
    rectangularFrame: `${IMAGEKIT_BASE}/sponsors/decorative/rectangular-frame.png`,
    sponsorStamp: `${IMAGEKIT_BASE}/sponsors/common/sponsor-stamp.png`,
    standingGirl: `${IMAGEKIT_BASE}/sponsors/common/standing-girl.png`,
    leftTreeBranch: `${IMAGEKIT_BASE}/sponsors/common/left-tree-branch.png`,
    sponsorPresentor: `${IMAGEKIT_BASE}/sponsors/common/sponsor-presentor.png`,

    // Title & Co-Title
    titleSponsor: `${IMAGEKIT_BASE}/sponsors/title-sponsor.jpeg`,
    coTitlePartner: `${IMAGEKIT_BASE}/sponsors/co-title-partner.png`,

    // Powered By Partners
    poweredByPartner: `${IMAGEKIT_BASE}/sponsors/powered-by-partner.jpg`,
    coPoweredByPartner: `${IMAGEKIT_BASE}/sponsors/co-powered-by-partner.png`,
    adaniCoPoweredPartner: `${IMAGEKIT_BASE}/sponsors/adani-co-powered-partner.png`,

    // Major & Event Sponsors
    majorSponsor: `${IMAGEKIT_BASE}/sponsors/major-sponsor.jpg`,
    eventTitleCrosswindz: `${IMAGEKIT_BASE}/sponsors/event-title-crosswindz.jpg`,
    titleEnquiztaSamvad: `${IMAGEKIT_BASE}/sponsors/title-enquizta-samvad.jpg`,

    // Industry Partners
    energyPartner: `${IMAGEKIT_BASE}/sponsors/energy-partner.png`,
    steelPartner: `${IMAGEKIT_BASE}/sponsors/steel-partner.png`,
    buildPartner: `${IMAGEKIT_BASE}/sponsors/build-partner.png`,
    constructionPartner: `${IMAGEKIT_BASE}/sponsors/construction-partner.webp`,
    infrastructurePartner: `${IMAGEKIT_BASE}/sponsors/infrastructure-partner.png`,
    realEstatePartner: `${IMAGEKIT_BASE}/sponsors/real-estate-partner.jpeg`,
    developmentPartner: `${IMAGEKIT_BASE}/sponsors/development-partner.png`,

    // Social & CSR Partners
    nmdcSustainabilityPartner: `${IMAGEKIT_BASE}/sponsors/nmdc-sustainability-partner.jpg`,
    csrPartner: `${IMAGEKIT_BASE}/sponsors/csr-partner.png`,
    socialWelfarePartner: `${IMAGEKIT_BASE}/sponsors/social-welfare-partner.png`,
    nationBuildingPartner: `${IMAGEKIT_BASE}/sponsors/nation-building-partner.png`,
    communityPartner: `${IMAGEKIT_BASE}/sponsors/community-partner.png`,

    // Hospitality & Lifestyle Partners
    hospitalityPartner: `${IMAGEKIT_BASE}/sponsors/hospitality-partner.jpeg`,
    coffeePartner: `${IMAGEKIT_BASE}/sponsors/coffee-partner.png`,
    chocolatePartner: `${IMAGEKIT_BASE}/sponsors/chocolate-partner.png`,
    fragrancePartner: `${IMAGEKIT_BASE}/sponsors/fragrance-partner.jpg`,
    sareePartner: `${IMAGEKIT_BASE}/sponsors/saree-partner.jpg`,

    // Media & Tech Partners
    gamingPartner: `${IMAGEKIT_BASE}/sponsors/gaming-partner.png`,
    musicStreamingPartner: `${IMAGEKIT_BASE}/sponsors/music-streaming-partner.webp`,
    innovationPartner: `${IMAGEKIT_BASE}/sponsors/innovation-partner.webp`,
    dalimssNewsPartner: `${IMAGEKIT_BASE}/sponsors/dalimss-news-partner.webp`,
    theVibePartner: `${IMAGEKIT_BASE}/sponsors/the-vibe-partner.png`,
  },

  // ============================================
  // INTRO SECTION - Mascot and assets
  // ============================================
  intro: {
    cuteBoyMascot: `${IMAGEKIT_BASE}/intro/common/cute-boy-mascot.png`,
    logo: `${IMAGEKIT_BASE}/intro/common/intro-logo.png`,
  },

  // ============================================
  // CAMPUS AMBASSADOR PAGE
  // ============================================
  ca: {
    cosmicBackground: `${IMAGEKIT_BASE}/ca/common/cosmic-background.png`,
    goldenBadge: `${IMAGEKIT_BASE}/ca/common/golden-badge.png`,
    ambassadorDj: `${IMAGEKIT_BASE}/ca/common/ambassador-dj.png`,
    ambassadorDancing: `${IMAGEKIT_BASE}/ca/common/ambassador-dancing.png`,
    ambassadorPose: `${IMAGEKIT_BASE}/ca/common/ambassador-pose.png`,
    ambassadorWalking: `${IMAGEKIT_BASE}/ca/common/ambassador-walking.png`,
  },
} as const;

/**
 * Helper to get ImageKit URL with transformations
 * @example getImageUrl(IMAGES.passes.yatri, "tr:w-300,q-80")
 */
export function getImageUrl(path: string, transformations?: string): string {
  if (!transformations) return path;

  // Insert transformations after base URL
  const imagePath = path.replace(IMAGEKIT_BASE as string, "");
  return `${IMAGEKIT_BASE}/${transformations}${imagePath}`;
}
