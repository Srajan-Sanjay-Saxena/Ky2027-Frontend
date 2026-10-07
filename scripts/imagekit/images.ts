import type { ImageToUpload } from "./types";

/**
 * All images to upload with their target folders
 * Organized by section and device type (common/desktop/mobile)
 */
export const IMAGES_TO_UPLOAD: ImageToUpload[] = [
  // ============================================
  // PASSES
  // ============================================
  { localFile: "passes/common/yatriPass.png", remoteName: "yatri-pass.png", folder: "/passes" },
  { localFile: "passes/common/darbarPass.png", remoteName: "darbar-pass.png", folder: "/passes" },
  { localFile: "passes/common/swarnimPass.png", remoteName: "swarnim-pass.png", folder: "/passes" },

  // ============================================
  // HERO SECTION - All common
  // ============================================
  {
    localFile: "home/hero/common/kashiyatra.png",
    remoteName: "kashiyatra-logo.png",
    folder: "/hero/common",
  },
  {
    localFile: "home/hero/common/heroLogo.png",
    remoteName: "hero-logo.png",
    folder: "/hero/common",
  },
  {
    localFile: "home/hero/common/ghatsDay.png",
    remoteName: "ghats-day.png",
    folder: "/hero/common",
  },
  {
    localFile: "home/hero/common/ghatsNight.png",
    remoteName: "ghats-night.png",
    folder: "/hero/common",
  },
  {
    localFile: "home/hero/common/kashivishwanath.png",
    remoteName: "kashivishwanath-temple.png",
    folder: "/hero/common",
  },
  {
    localFile: "home/hero/common/varanasiTownBG.png",
    remoteName: "varanasi-back.png",
    folder: "/hero/common",
  },
  {
    localFile: "home/hero/common/stone.png",
    remoteName: "stepping-stone.png",
    folder: "/hero/common",
  },
  { localFile: "home/hero/common/kites.png", remoteName: "kites.png", folder: "/hero/common" },

  // ============================================
  // NAVBAR - Page-specific variants
  // ============================================
  // Main/Home navbar (golden/cream theme)
  { localFile: "navbar/navMain/navBg.png", remoteName: "nav-bg.png", folder: "/navbar/main" },
  {
    localFile: "navbar/navMain/NavBadgeHome.png",
    remoteName: "nav-badge-home.png",
    folder: "/navbar/main",
  },
  // About page navbar (purple/blue concert theme)
  {
    localFile: "navbar/navAbout/navbarAbout.png",
    remoteName: "navbar-about.png",
    folder: "/navbar/about",
  },
  {
    localFile: "navbar/navAbout/NavBadgeAbout.png",
    remoteName: "nav-badge-about.png",
    folder: "/navbar/about",
  },
  // Sponsors page navbar (green/gold nature theme)
  {
    localFile: "navbar/navSponsor/navSponsor.png",
    remoteName: "nav-sponsor.png",
    folder: "/navbar/sponsor",
  },
  {
    localFile: "navbar/navSponsor/NavBadgeSponsor.png",
    remoteName: "nav-badge-sponsor.png",
    folder: "/navbar/sponsor",
  },

  // ============================================
  // BANARASI VIBES SECTION
  // ============================================
  // Common
  {
    localFile: "home/banarasiVibes/common/vibesBG.png",
    remoteName: "vibes-bg.png",
    folder: "/vibes/common",
  },
  {
    localFile: "home/BanarasiVibesBg.png",
    remoteName: "banarasi-vibes-bg-dark.png",
    folder: "/vibes/common",
  },
  {
    localFile: "home/banarasiVibes/common/mahamana.png",
    remoteName: "mahamana.png",
    folder: "/vibes/common",
  },
  {
    localFile: "home/banarasiVibes/common/bhuGate.png",
    remoteName: "bhu-gate.png",
    folder: "/vibes/common",
  },
  {
    localFile: "home/banarasiVibes/common/rickshaw.png",
    remoteName: "rickshaw.png",
    folder: "/vibes/common",
  },

  // Desktop-only
  {
    localFile: "home/banarasiVibes/desktop/mandala.png",
    remoteName: "mandala.png",
    folder: "/vibes/desktop",
  },
  {
    localFile: "home/banarasiVibes/desktop/gangaArtiSaint.png",
    remoteName: "ganga-aarti-saint.png",
    folder: "/vibes/desktop",
  },
  {
    localFile: "home/banarasiVibes/desktop/bharatnatiyamDancer.png",
    remoteName: "bharatnatyam-dancer.png",
    folder: "/vibes/desktop",
  },

  // Mobile-only
  {
    localFile: "home/banarasiVibes/mobile/rangoliBg.png",
    remoteName: "rangoli-bg.png",
    folder: "/vibes/mobile",
  },
  {
    localFile: "home/banarasiVibes/mobile/trishul.png",
    remoteName: "trishul.png",
    folder: "/vibes/mobile",
  },
  {
    localFile: "home/banarasiVibes/mobile/lotusPairs.png",
    remoteName: "lotus-pairs.png",
    folder: "/vibes/mobile",
  },
  {
    localFile: "home/banarasiVibes/mobile/etherealDancer.png",
    remoteName: "ethereal-dancer.png",
    folder: "/vibes/mobile",
  },
  {
    localFile: "home/banarasiVibes/mobile/diyaPairs.png",
    remoteName: "diya-pairs.png",
    folder: "/vibes/mobile",
  },
  {
    localFile: "home/banarasiVibes/mobile/conchShell.png",
    remoteName: "conch-shell.png",
    folder: "/vibes/mobile",
  },
  {
    localFile: "home/banarasiVibes/mobile/varanasiSaloutte.png",
    remoteName: "varanasi-silhouette.png",
    folder: "/vibes/mobile",
  },

  // ============================================
  // FEST HIGHLIGHTS
  // ============================================
  {
    localFile: "home/festiveHighlights/common/durga_temple.svg",
    remoteName: "durga-temple.svg",
    folder: "/highlights/common",
  },
  {
    localFile: "home/festiveHighlights/desktop/durga.svg",
    remoteName: "durga.svg",
    folder: "/highlights/desktop",
  },

  // ============================================
  // FESTIVAL VIBES / THE EXPERIENCE
  // ============================================
  {
    localFile: "home/FestiveVibesBg.png",
    remoteName: "festive-vibes-bg.png",
    folder: "/festival-vibes/common",
  },
  {
    localFile: "home/theExperience/common/baddie.png",
    remoteName: "dj.png",
    folder: "/festival-vibes/common",
  },
  {
    localFile: "home/theExperience/common/sareeDrape.png",
    remoteName: "saree-drape.png",
    folder: "/festival-vibes/common",
  },

  // ============================================
  // PRO NITES
  // ============================================
  {
    localFile: "home/proNites/common/proNiteDancingGirl.png",
    remoteName: "dancing-girl.png",
    folder: "/pro-nites/common",
  },
  {
    localFile: "home/proNites/common/moon.png",
    remoteName: "moon.png",
    folder: "/pro-nites/common",
  },
  {
    localFile: "home/proNites/common/silhoutte.png",
    remoteName: "silhouette.png",
    folder: "/pro-nites/common",
  },
  {
    localFile: "home/proNites/common/aerobics.png",
    remoteName: "aerobics.png",
    folder: "/pro-nites/common",
  },

  // ============================================
  // FOOTER - Desktop decorative elements
  // ============================================
  {
    localFile: "home/footer/desktop/dancer.png",
    remoteName: "ethereal-dancer.png",
    folder: "/footer/desktop",
  },
  {
    localFile: "home/footer/desktop/floatingGarland.png",
    remoteName: "floating-garland.png",
    folder: "/footer/desktop",
  },
  {
    localFile: "home/footer/desktop/lampCluster.png",
    remoteName: "lamp-cluster.png",
    folder: "/footer/desktop",
  },
  {
    localFile: "home/footer/desktop/silhoutteGhat.png",
    remoteName: "ghat-silhouette.png",
    folder: "/footer/desktop",
  },
  {
    localFile: "home/footer/desktop/spiritualOrna.png",
    remoteName: "spiritual-ornament.png",
    folder: "/footer/desktop",
  },
  {
    localFile: "home/footer/desktop/standingPillar.png",
    remoteName: "temple-pillar.png",
    folder: "/footer/desktop",
  },
  {
    localFile: "home/footer/desktop/subtleRangoli.png",
    remoteName: "subtle-rangoli.png",
    folder: "/footer/desktop",
  },
  {
    localFile: "home/footer/floatingSpeaker.png",
    remoteName: "floating-speaker.png",
    folder: "/footer/desktop",
  },
  {
    localFile: "home/footer/desktop/concertFloor.png",
    remoteName: "concert-floor.png",
    folder: "/footer/desktop",
  },
  {
    localFile: "home/footer/footerDancer.png",
    remoteName: "footer-dancer.png",
    folder: "/footer/desktop",
  },

  // ============================================
  // MISCELLANEOUS
  // ============================================
  {
    localFile: "miscellaneous/common/lord_shiva.png",
    remoteName: "lord-shiva.png",
    folder: "/misc",
  },
  {
    localFile: "miscellaneous/common/welcomeFlag.png",
    remoteName: "welcome-flag.png",
    folder: "/misc",
  },

  // ============================================
  // ABOUT PAGE - All common
  // ============================================
  { localFile: "about/aboutBG.png", remoteName: "about-bg.png", folder: "/about/common" },
  {
    localFile: "about/common/mandlaOrnament.png",
    remoteName: "mandala-ornament.png",
    folder: "/about/common",
  },
  {
    localFile: "about/common/peacock_nobg.png",
    remoteName: "peacock.png",
    folder: "/about/common",
  },
  { localFile: "about/common/omLotus.png", remoteName: "om-lotus.png", folder: "/about/common" },
  {
    localFile: "about/common/mysticDivider.png",
    remoteName: "mystic-divider.png",
    folder: "/about/common",
  },
  {
    localFile: "about/common/diyaCluster.png",
    remoteName: "diya-cluster.png",
    folder: "/about/common",
  },
  {
    localFile: "about/common/cornerOrnament.png",
    remoteName: "corner-ornament.png",
    folder: "/about/common",
  },
  {
    localFile: "about/common/bhuRoyalGate.png",
    remoteName: "bhu-royal-gate.png",
    folder: "/about/common",
  },
  {
    localFile: "about/common/ghatSaloutte.png",
    remoteName: "ghats-silhouette.png",
    folder: "/about/common",
  },
  {
    localFile: "about/heroLeftAbout.png",
    remoteName: "hero-left-about.png",
    folder: "/about/common",
  },
  {
    localFile: "about/dancerGirlHeroAbout.png",
    remoteName: "dancer-girl-hero-about.png",
    folder: "/about/common",
  },
  // IIT BHU Stamps
  { localFile: "about/stamps/mandir.png", remoteName: "mandir.png", folder: "/about/stamps" },
  {
    localFile: "about/stamps/mainBuilding.png",
    remoteName: "main-building.png",
    folder: "/about/stamps",
  },
  { localFile: "about/stamps/library.png", remoteName: "library.png", folder: "/about/stamps" },
  { localFile: "about/stamps/kyVenue.png", remoteName: "ky-venue.png", folder: "/about/stamps" },
  {
    localFile: "about/stamps/heritageHostel.png",
    remoteName: "heritage-hostel.png",
    folder: "/about/stamps",
  },
  // Slider images - Left side
  { localFile: "about/slider/left1.jpg", remoteName: "left1.jpg", folder: "/about/slider" },
  { localFile: "about/slider/left2.jpg", remoteName: "left2.jpg", folder: "/about/slider" },
  { localFile: "about/slider/left3.jpg", remoteName: "left3.jpg", folder: "/about/slider" },
  { localFile: "about/slider/left4.jpg", remoteName: "left4.jpg", folder: "/about/slider" },
  { localFile: "about/slider/left5.jpg", remoteName: "left5.jpg", folder: "/about/slider" },
  { localFile: "about/slider/left6.jpg", remoteName: "left6.jpg", folder: "/about/slider" },
  // Slider images - Right side
  { localFile: "about/slider/right1.jpg", remoteName: "right1.jpg", folder: "/about/slider" },
  { localFile: "about/slider/right2.jpg", remoteName: "right2.jpg", folder: "/about/slider" },
  { localFile: "about/slider/right3.jpg", remoteName: "right3.jpg", folder: "/about/slider" },
  { localFile: "about/slider/right4.jpg", remoteName: "right4.jpg", folder: "/about/slider" },
  { localFile: "about/slider/right5.jpg", remoteName: "right5.jpg", folder: "/about/slider" },
  { localFile: "about/slider/right6.jpg", remoteName: "right6.jpg", folder: "/about/slider" },

  // ============================================
  // CONTACT PAGE - All common
  // ============================================
  {
    localFile: "contact/common/envelopeScrolled.png",
    remoteName: "envelope-scroll.png",
    folder: "/contact/common",
  },
  { localFile: "contact/common/conch.png", remoteName: "conch.png", folder: "/contact/common" },
  {
    localFile: "contact/common/lotusMandla.png",
    remoteName: "lotus-mandala.png",
    folder: "/contact/common",
  },
  {
    localFile: "contact/common/floatingDiya.png",
    remoteName: "floating-diya.png",
    folder: "/contact/common",
  },

  // ============================================
  // LOGIN PAGE - All common
  // ============================================
  {
    localFile: "login/common/mysticGate.png",
    remoteName: "mystic-gate.png",
    folder: "/login/common",
  },

  // ============================================
  // SINGERS / ARTISTS - Pro Nites
  // ============================================
  { localFile: "singer/jubinNautiyal.webp", remoteName: "jubin-nautiyal.webp", folder: "/singers" },
  { localFile: "singer/darshanRawal.webp", remoteName: "darshan-rawal.webp", folder: "/singers" },
  { localFile: "singer/MohitChauhan.webp", remoteName: "mohit-chauhan.webp", folder: "/singers" },
  {
    localFile: "singer/vishal-shekhar.webp",
    remoteName: "vishal-shekhar.webp",
    folder: "/singers",
  },
  { localFile: "singer/raftaar.jpeg", remoteName: "raftaar.jpeg", folder: "/singers" },
  { localFile: "singer/ritviz.jpg", remoteName: "ritviz.jpg", folder: "/singers" },
  { localFile: "singer/anubhav bassi.jpeg", remoteName: "anubhav-bassi.jpeg", folder: "/singers" },
  { localFile: "singer/MJ5-group.jpeg", remoteName: "mj5-group.jpeg", folder: "/singers" },

  // ============================================
  // SPONSORS
  // ============================================
  // Background
  { localFile: "home/sponsorBG.png", remoteName: "sponsor-bg.png", folder: "/sponsors/common" },
  {
    localFile: "sponsors/sponsorStamp.png",
    remoteName: "sponsor-stamp.png",
    folder: "/sponsors/common",
  },
  {
    localFile: "sponsors/standingGirl.png",
    remoteName: "standing-girl.png",
    folder: "/sponsors/common",
  },
  {
    localFile: "sponsor/leftTreeBranch_nobg.png",
    remoteName: "left-tree-branch.png",
    folder: "/sponsors/common",
  },
  {
    localFile: "sponsors/sponsorPresentor.png",
    remoteName: "sponsor-presentor.png",
    folder: "/sponsors/common",
  },

  // Title & Co-Title
  {
    localFile: "sponsor/title_sponsor.jpeg",
    remoteName: "title-sponsor.jpeg",
    folder: "/sponsors",
  },
  {
    localFile: "sponsor/Co-title partner.png",
    remoteName: "co-title-partner.png",
    folder: "/sponsors",
  },

  // Powered By Partners
  {
    localFile: "sponsor/Powered-by partner.jpg",
    remoteName: "powered-by-partner.jpg",
    folder: "/sponsors",
  },
  {
    localFile: "sponsor/Co-powered by partner.png",
    remoteName: "co-powered-by-partner.png",
    folder: "/sponsors",
  },
  {
    localFile: "sponsor/adani Co-powered by partner.png",
    remoteName: "adani-co-powered-partner.png",
    folder: "/sponsors",
  },

  // Major & Event Sponsors
  { localFile: "sponsor/Major sponsor.jpg", remoteName: "major-sponsor.jpg", folder: "/sponsors" },
  {
    localFile: "sponsor/Event Title-Crosswindz.jpg",
    remoteName: "event-title-crosswindz.jpg",
    folder: "/sponsors",
  },
  {
    localFile: "sponsor/title of Enquizta & Samvad.jpg",
    remoteName: "title-enquizta-samvad.jpg",
    folder: "/sponsors",
  },

  // Industry Partners
  {
    localFile: "sponsor/Energy partner.png",
    remoteName: "energy-partner.png",
    folder: "/sponsors",
  },
  { localFile: "sponsor/Steel partner.png", remoteName: "steel-partner.png", folder: "/sponsors" },
  { localFile: "sponsor/Build partner.png", remoteName: "build-partner.png", folder: "/sponsors" },
  {
    localFile: "sponsor/Construction partner.webp",
    remoteName: "construction-partner.webp",
    folder: "/sponsors",
  },
  {
    localFile: "sponsor/Infrastructure Partner.png",
    remoteName: "infrastructure-partner.png",
    folder: "/sponsors",
  },
  {
    localFile: "sponsor/Real-estate partner.jpeg",
    remoteName: "real-estate-partner.jpeg",
    folder: "/sponsors",
  },
  {
    localFile: "sponsor/Development partner.png",
    remoteName: "development-partner.png",
    folder: "/sponsors",
  },

  // Social & CSR Partners
  {
    localFile: "sponsor/NMDC Sustainability partner.jpg",
    remoteName: "nmdc-sustainability-partner.jpg",
    folder: "/sponsors",
  },
  { localFile: "sponsor/CSR Partner.png", remoteName: "csr-partner.png", folder: "/sponsors" },
  {
    localFile: "sponsor/Social Welfare partner.png",
    remoteName: "social-welfare-partner.png",
    folder: "/sponsors",
  },
  {
    localFile: "sponsor/Nation-Building Partner.png",
    remoteName: "nation-building-partner.png",
    folder: "/sponsors",
  },
  {
    localFile: "sponsor/Community_Partner.png",
    remoteName: "community-partner.png",
    folder: "/sponsors",
  },

  // Hospitality & Lifestyle Partners
  {
    localFile: "sponsor/Hospitatlity Partner.jpeg",
    remoteName: "hospitality-partner.jpeg",
    folder: "/sponsors",
  },
  {
    localFile: "sponsor/Coffee partner.png",
    remoteName: "coffee-partner.png",
    folder: "/sponsors",
  },
  {
    localFile: "sponsor/Chocolate partner.png",
    remoteName: "chocolate-partner.png",
    folder: "/sponsors",
  },
  {
    localFile: "sponsor/fragnance partner.jpg",
    remoteName: "fragrance-partner.jpg",
    folder: "/sponsors",
  },
  { localFile: "sponsor/Saree_partner.jpg", remoteName: "saree-partner.jpg", folder: "/sponsors" },

  // Media & Tech Partners
  {
    localFile: "sponsor/Gaming Partner.png",
    remoteName: "gaming-partner.png",
    folder: "/sponsors",
  },
  {
    localFile: "sponsor/Official Music Streaming partner.webp",
    remoteName: "music-streaming-partner.webp",
    folder: "/sponsors",
  },
  {
    localFile: "sponsor/Innovation Partner.webp",
    remoteName: "innovation-partner.webp",
    folder: "/sponsors",
  },
  {
    localFile: "sponsor/Dalimss news, Official Partner.webp",
    remoteName: "dalimss-news-partner.webp",
    folder: "/sponsors",
  },
  {
    localFile: "sponsor/the vibe official partner.png",
    remoteName: "the-vibe-partner.png",
    folder: "/sponsors",
  },

  // ============================================
  // PROFILE PAGE - Decorative elements
  // ============================================
  {
    localFile: "profile/common/profileDecorativeCorner.png",
    remoteName: "decorative-corner.png",
    folder: "/profile/common",
  },
  {
    localFile: "profile/common/profileDivider.png",
    remoteName: "divider.png",
    folder: "/profile/common",
  },

  // ============================================
  // SPONSORS PAGE - Decorative elements
  // ============================================
  {
    localFile: "sponsors/common/sponsorOrnamentalDivider.png",
    remoteName: "ornamental-divider.png",
    folder: "/sponsors/decorative",
  },
  {
    localFile: "sponsors/common/sponsorRectangularFrame.png",
    remoteName: "rectangular-frame.png",
    folder: "/sponsors/decorative",
  },

  // ============================================
  // INTRO SECTION - Mascot and assets
  // ============================================
  { localFile: "intro/cuteBoy.png", remoteName: "cute-boy-mascot.png", folder: "/intro/common" },
  { localFile: "intro/introLogo.png", remoteName: "intro-logo.png", folder: "/intro/common" },

  // ============================================
  // CAMPUS AMBASSADOR PAGE
  // ============================================
  {
    localFile: "ca/cosmicBackground.png",
    remoteName: "cosmic-background.png",
    folder: "/ca/common",
  },
  {
    localFile: "ca/GoldenBadge.png",
    remoteName: "golden-badge.png",
    folder: "/ca/common",
  },
  {
    localFile: "ca/ambassador-dj.png",
    remoteName: "ambassador-dj.png",
    folder: "/ca/common",
  },
  {
    localFile: "ca/ambassador-dancing.png",
    remoteName: "ambassador-dancing.png",
    folder: "/ca/common",
  },
  {
    localFile: "ca/ambassador-pose.png",
    remoteName: "ambassador-pose.png",
    folder: "/ca/common",
  },
  {
    localFile: "ca/ambassador-walking.png",
    remoteName: "ambassador-walking.png",
    folder: "/ca/common",
  },
];
