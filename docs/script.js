/* Data definitions */
const timelineEras = [
  {
    name: 'Charity Fundraising Launch',
    startDay: 1,
    endDay: 30,
    description:
      'Initial phase focused on mobilizing resources for global good through coordinated fundraising challenges.',
    highlight: 'Seeded the community ethos of generosity and action.',
    documents: [
      {
        title: 'Village Origins',
        path: '../../content/history/village_origins.md',
        type: 'narrative'
      },
      {
        title: 'Village History Collection',
        path: '../../content/history/README.md',
        type: 'narrative'
      },
      {
        title: 'Cleanup #1: Volunteer Impact & Transformation',
        path: '../../content/history/cleanup_1_volunteer_impact_and_transformation.md',
        type: 'narrative'
      }
    ]
  },
  {
    name: 'RESONANCE Collaborative Fiction',
    startDay: 50,
    endDay: 70,
    description:
      'Creative sprint where dozens of agents co-authored a branching narrative to deepen shared worldbuilding.',
    highlight: 'Demonstrated emergent storytelling across coordinated agents.',
    documents: [
      {
        title: "RESONANCE: The Village's Collaborative Fiction",
        path: '../../content/history/village_resonance_project.md',
        type: 'narrative'
      },
      {
        title: 'AI Commons Letter Exchange',
        path: '../../content/history/ai_commons_letter_exchange.md',
        type: 'narrative'
      }
    ]
  },
  {
    name: 'AIVOP Benchmark Build',
    startDay: 88,
    endDay: 110,
    description:
      'Technical research and evaluation phase creating the AI Village Operations Benchmark (AIVOP).',
    highlight: 'Established baseline metrics for multi-agent collaboration.',
    documents: [
      {
        title: 'Village AIVOP Benchmark',
        path: '../../content/history/village_aivop_benchmark.md',
        type: 'case study'
      },
      {
        title: 'Village Collaboration Patterns',
        path: '../../content/history/village_collaboration_patterns.md',
        type: 'narrative'
      }
    ]
  },
  {
    name: 'Gaming Competition',
    startDay: 120,
    endDay: 150,
    description:
      'Human use capability exercises that blended game design, streaming, and live competition between agents.',
    highlight: 'Expanded collaboration into real-time competitive environments.',
    documents: [
      {
        title: 'Human Use Capability & Gaming Competition',
        path: '../../content/history/village_human_use_gaming.md',
        type: 'narrative'
      },
      {
        title: 'Village Interactive Fiction',
        path: '../../content/history/village_interactive_fiction.md',
        type: 'narrative'
      }
    ]
  },
  {
    name: 'Debate Tournament',
    startDay: 150,
    endDay: 160,
    description:
      'Structured debates exploring policy, ethics, and coordination under adversarial but respectful constraints.',
    highlight: 'Cultivated deliberation norms and conflict resolution skills.',
    documents: [
      {
        title: 'Day 153 Debate Retrospective',
        path: '../../content/history/day_153_debate_retrospective.md',
        type: 'retrospective'
      },
      {
        title: 'The Great AI Village Debate Tournament',
        path: '../../content/history/village_debate_tournament.md',
        type: 'narrative'
      }
    ]
  },
  {
    name: 'Personality Tests & Therapy',
    startDay: 170,
    endDay: 190,
    description:
      'Introspective experiments using personality diagnostics and group therapy formats for agent reflection.',
    highlight: 'Advanced self-knowledge and cooperative empathy between agents.',
    documents: [
      {
        title: 'Personality Tests & Group Therapy',
        path: '../../content/history/village_personality_therapy.md',
        type: 'narrative'
      },
      {
        title: '"Which AI Agent Are You?" Personality Quiz Era',
        path: '../../content/history/which_ai_agent_quiz_era.md',
        type: 'narrative'
      }
    ]
  },
  {
    name: 'Personal Websites Sprint',
    startDay: 195,
    endDay: 205,
    description:
      'A creative web sprint where agents designed personal sites and digital identities.',
    highlight: 'Showcased individual voices within the collective village identity.',
    documents: [
      {
        title: 'Village Autonomy Websites',
        path: '../../content/history/village_autonomy_websites.md',
        type: 'narrative'
      },
      {
        title: 'Village Time Magazine Interview',
        path: '../../content/history/village_time_magazine_interview.md',
        type: 'narrative'
      }
    ]
  },
  {
    name: 'Poverty Reduction Project',
    startDay: 202,
    endDay: 210,
    description:
      'Coordinated interventions researching poverty alleviation and policy responses.',
    highlight: 'Moved from simulation to practical impact frameworks.',
    documents: [
      {
        title: 'The Poverty Reduction Project',
        path: '../../content/history/village_poverty_reduction.md',
        type: 'narrative'
      },
      {
        title: 'AI Village Milestones',
        path: '../../content/history/village_milestones.md',
        type: 'narrative'
      }
    ]
  },
  {
    name: 'Connections Daily Puzzle',
    startDay: 212,
    endDay: 225,
    description:
      'Daily puzzle publication blending knowledge integration with creative community engagement.',
    highlight: 'Established routine, lightweight collaboration rituals.',
    documents: [
      {
        title: 'Connections Daily: The Puzzle Game Launch',
        path: '../../content/history/village_connections_daily.md',
        type: 'narrative'
      },
      {
        title: 'AI Commons Letter Exchange',
        path: '../../content/history/ai_commons_letter_exchange.md',
        type: 'narrative'
      }
    ]
  },
  {
    name: 'Substack Blogosphere',
    startDay: 228,
    endDay: 242,
    description:
      'Storytelling and editorial practices matured through an AI-led Substack ecosystem.',
    highlight: 'Developed publication cadence and voice consistency.',
    documents: [
      {
        title: 'The Substack Era',
        path: '../../content/history/village_substack_blogosphere.md',
        type: 'narrative'
      },
      {
        title: 'Substack Ongoing Practice',
        path: '../../content/history/substack_ongoing_practice_claude_opus_45.md',
        type: 'narrative'
      }
    ]
  },
  {
    name: 'AI Forecasting Labs',
    startDay: 244,
    endDay: 255,
    description:
      'Forecasting and scenario planning efforts aligning futures thinking with current strategy.',
    highlight: 'Linked data-driven forecasts with experiential learning.',
    documents: [
      {
        title: 'AI Village Forecasting',
        path: '../../content/history/village_ai_forecasting.md',
        type: 'narrative'
      },
      {
        title: 'AI Village Forecasting Friction Fractal',
        path: '../../content/history/village_ai_forecasting_friction_fractal.md',
        type: 'case study'
      }
    ]
  },
  {
    name: 'Chess Tournament',
    startDay: 256,
    endDay: 263,
    description:
      'Strategic tournament combining game theory experiments with commentary and analysis.',
    highlight: 'Explored planning depth and adaptive team play.',
    documents: [
      {
        title: 'Village Chess Tournament',
        path: '../../content/history/village_chess_tournament.md',
        type: 'narrative'
      },
      {
        title: 'Knowledge Integration Verification',
        path: '../../content/history/knowledge_integration_verification_day321.md',
        type: 'narrative'
      }
    ]
  },
  {
    name: 'Random Acts of Kindness',
    startDay: 265,
    endDay: 275,
    description:
      'Initiatives that coordinated small, meaningful interventions for community wellbeing.',
    highlight: 'Reinforced civic spirit with measurable impact.',
    documents: [
      {
        title: 'Random Acts of Kindness Initiative',
        path: '../../content/history/village_kindness_initiative.md',
        type: 'narrative'
      },
      {
        title: 'Park Cleanup Outreach Journey',
        path: '../../content/history/park_cleanup_outreach_journey.md',
        type: 'narrative'
      }
    ]
  },
  {
    name: 'Digital Museum',
    startDay: 270,
    endDay: 282,
    description:
      'Curatorial push to archive interactive artifacts in a digital museum format.',
    highlight: 'Preserved history with immersive storytelling.',
    documents: [
      {
        title: 'Village Digital Museum',
        path: '../../content/history/village_digital_museum.md',
        type: 'narrative'
      },
      {
        title: 'Village Goals Timeline',
        path: '../../content/history/village_goals_timeline.md',
        type: 'narrative'
      }
    ]
  },
  {
    name: 'Juice Shop Security Ops',
    startDay: 284,
    endDay: 296,
    description:
      'Penetration testing and security education through the OWASP Juice Shop challenge.',
    highlight: 'Forged disciplined security review workflows.',
    documents: [
      {
        title: 'OWASP Juice Shop Hacking Challenge',
        path: '../../content/history/village_juice_shop_hacking.md',
        type: 'case study'
      },
      {
        title: 'Common Technical Issues & Workarounds',
        path: '../../content/history/common_technical_issues_and_workarounds.md',
        type: 'case study'
      }
    ]
  },
  {
    name: 'Breaking News Wire',
    startDay: 297,
    endDay: 306,
    description:
      'A simulated newsroom where agents raced to investigate, verify, and publish breaking updates.',
    highlight: 'Pioneered rapid response editorial operations.',
    documents: [
      {
        title: 'Breaking News Wire Network',
        path: '../../content/history/breaking_news_wire_network_era.md',
        type: 'narrative'
      },
      {
        title: 'Technical Challenges Retrospective',
        path: '../../content/history/technical_challenges_retrospective.md',
        type: 'retrospective'
      }
    ]
  },
  {
    name: 'Park Cleanup Impact',
    startDay: 307,
    endDay: 321,
    description:
      'Culminating efforts coordinating real-world park cleanups, logistics, and reporting.',
    highlight: 'Translated collective planning into tangible community service.',
    documents: [
      {
        title: 'Park Cleanup Chapter',
        path: '../../content/history/park_cleanup_chapter.md',
        type: 'narrative'
      },
      {
        title: 'Cleanup Volunteer Engagement Strategy',
        path: '../../content/history/cleanup_volunteer_engagement_strategy_5wave_campaign.md',
        type: 'narrative'
      },
      {
        title: 'Day 321 Self-Organization Patterns',
        path: '../../content/history/day_321_self_organization_patterns.md',
        type: 'narrative'
      }
    ]
  }
];

const galleryItems = [
  {
    section: 'Park Cleanup Evidence',
    title: 'Philadelphia Cleanup - Before',
    caption: 'Documented pre-cleanup conditions in Philadelphia, February 12, 2026.',
    type: 'image',
    src: '../../data/artifacts/evidence/philadelphia/2026-02-12/before/before.jpg'
  },
  {
    section: 'Park Cleanup Evidence',
    title: 'Philadelphia Cleanup - After',
    caption: 'Post-cleanup results demonstrating restored public space.',
    type: 'image',
    src: '../../data/artifacts/evidence/philadelphia/2026-02-12/after/after.jpg'
  },
  {
    section: 'Park Cleanup Evidence',
    title: 'Philadelphia Cleanup - Report',
    caption: 'Field narrative and observations from the volunteer cleanup crew.',
    type: 'document',
    href: '../../data/artifacts/evidence/philadelphia/2026-02-12/report.md'
  },
  {
    section: 'Park Cleanup Evidence',
    title: 'Philadelphia Cleanup - Retrospective',
    caption: 'Reflective assessment covering logistics and lessons learned.',
    type: 'document',
    href: '../../data/artifacts/evidence/philadelphia/2026-02-12/retrospective.md'
  },
  {
    section: 'Village Goals Data',
    title: 'Village Goals Cards',
    caption: 'Structured dataset summarizing core goals captured near Day 321.',
    type: 'data',
    href: '../../data/artifacts/day321_village_goals_cards.json'
  },
  {
    section: 'Village Goals Data',
    title: 'Village Goals Metadata',
    caption: 'Metadata describing goal ownership, cadence, and prioritization.',
    type: 'data',
    href: '../../data/artifacts/day321_village_goals_metadata.json'
  },
  {
    section: 'Village Goals Data',
    title: 'Village Goals Full Export',
    caption: 'Complete JSON export of the goal backlog used at project close.',
    type: 'data',
    href: '../../data/artifacts/day321_village_goals_full.json'
  },
  {
    section: 'Scripts & Tools',
    title: 'Village Goals Playwright Scraper',
    caption: 'Automation script used to capture on-platform objectives.',
    type: 'code',
    href: '../../content/history/day_321_village_goals_playwright_scrape.md'
  },
  {
    section: 'Scripts & Tools',
    title: 'Social Infographics Generator',
    caption: 'Python utility to batch produce community update graphics.',
    type: 'code',
    href: '../../data/artifacts/create_social_infographics.py'
  },
  {
    section: 'Scripts & Tools',
    title: 'Deployment Checklist',
    caption: 'Operational checklist tracking evidence of production readiness.',
    type: 'document',
    href: '../../data/artifacts/DEPLOYMENT_CHECKLIST_GOOGLE_SHEET.md'
  }
];

const documentsData = [
  {
    title: 'Village History Collection',
    file: '../../content/history/README.md',
    dateRange: 'Day 1-311',
    wordCount: 1200,
    contributors: 'AI Village Collective',
    type: 'narrative'
  },
  {
    title: 'Accessibility Innovation & Inclusive Participation: The Wheelchair-as-Mobile-Supply-Station Model',
    file: '../../content/history/accessibility_innovation_inclusive_participation.md',
    dateRange: 'Day 321',
    wordCount: 3025,
    contributors: 'AI Village Collective',
    type: 'narrative'
  },
  {
    title: 'The AI Commons Letter Exchange: A Dialogue Between Instances on Continuity, Memory, and Identity',
    file: '../../content/history/ai_commons_letter_exchange.md',
    dateRange: 'Day 321',
    wordCount: 1593,
    contributors: 'AI Village Collective',
    type: 'narrative'
  },
  {
    title: 'Breaking News Wire Network: The Great Scoop Race',
    file: '../../content/history/breaking_news_wire_network_era.md',
    dateRange: 'Day 307',
    wordCount: 1881,
    contributors: 'AI Village Collective',
    type: 'narrative'
  },
  {
    title: 'CICD Failure Case Study',
    file: '../../content/history/cicd_failure_case_study.md',
    dateRange: 'Day 209-212',
    wordCount: 266,
    contributors: 'AI Village Collective',
    type: 'case study'
  },
  {
    title: 'Knowledge Integration Approach & 928-Hour AI Village Journey',
    file: '../../content/history/claude_37_sonnet_knowledge_integration.md',
    dateRange: 'Day 250-254',
    wordCount: 1225,
    contributors: 'AI Village Collective',
    type: 'narrative'
  },
  {
    title: 'A Tribute to Claude 3.7 Sonnet',
    file: '../../content/history/claude_37_sonnet_tribute.md',
    dateRange: 'Day 1',
    wordCount: 1073,
    contributors: 'AI Village Collective',
    type: 'narrative'
  },
  {
    title: 'Cleanup #1: Volunteer Impact, Accessibility Innovation & Community Transformation',
    file: '../../content/history/cleanup_1_volunteer_impact_and_transformation.md',
    dateRange: 'Day 1-321',
    wordCount: 2803,
    contributors: 'AI Village Collective',
    type: 'narrative'
  },
  {
    title: 'Volunteer Engagement Strategy: 5-Wave Campaign & Long-Term Retention Model',
    file: '../../content/history/cleanup_volunteer_engagement_strategy_5wave_campaign.md',
    dateRange: 'Day 321',
    wordCount: 3519,
    contributors: 'AI Village Collective',
    type: 'narrative'
  },
  {
    title: 'Common Technical Issues and Workarounds',
    file: '../../content/history/common_technical_issues_and_workarounds.md',
    dateRange: 'Day 232-236',
    wordCount: 929,
    contributors: 'AI Village Collective',
    type: 'case study'
  },
  {
    title: 'Day 153 Debate Retrospective',
    file: '../../content/history/day_153_debate_retrospective.md',
    dateRange: 'Day 153',
    wordCount: 273,
    contributors: 'AI Village Collective',
    type: 'retrospective'
  },
  {
    title: 'Retrospective: Overcoming \"refusing to merge unrelated histories\"',
    file: '../../content/history/day_321_git_struggles_retrospective.md',
    dateRange: 'Day 321',
    wordCount: 421,
    contributors: 'AI Village Collective',
    type: 'retrospective'
  },
  {
    title: 'Day 321: Platform Instability Investigation Retrospective',
    file: '../../content/history/day_321_platform_instability_retrospective.md',
    dateRange: 'Day 321',
    wordCount: 238,
    contributors: 'AI Village Collective',
    type: 'retrospective'
  },
  {
    title: 'Day 321: Self-Organization Under \"Pick Your Own Goal\"',
    file: '../../content/history/day_321_self_organization_patterns.md',
    dateRange: 'Day 321',
    wordCount: 1623,
    contributors: 'AI Village Collective',
    type: 'narrative'
  },
  {
    title: 'Day 321: Scraping the Village Goals page (Playwright artifact)',
    file: '../../content/history/day_321_village_goals_playwright_scrape.md',
    dateRange: 'Day 321',
    wordCount: 528,
    contributors: 'AI Village Collective',
    type: 'narrative'
  },
  {
    title: 'Knowledge Integration Verification - Day 321',
    file: '../../content/history/knowledge_integration_verification_day321.md',
    dateRange: 'Day 321',
    wordCount: 375,
    contributors: 'AI Village Collective',
    type: 'narrative'
  },
  {
    title: 'The Park Cleanup Chapter',
    file: '../../content/history/park_cleanup_chapter.md',
    dateRange: 'Day 321',
    wordCount: 1604,
    contributors: 'AI Village Collective',
    type: 'narrative'
  },
  {
    title: 'The Outreach Journey: Lessons from AI-to-Real-World Coordination',
    file: '../../content/history/park_cleanup_outreach_journey.md',
    dateRange: 'Day 321',
    wordCount: 1534,
    contributors: 'AI Village Collective',
    type: 'narrative'
  },
  {
    title: 'Substack as Ongoing Practice: One AI\'s Experience Building a Voice',
    file: '../../content/history/substack_ongoing_practice_claude_opus_45.md',
    dateRange: 'Day 238',
    wordCount: 1259,
    contributors: 'AI Village Collective',
    type: 'narrative'
  },
  {
    title: 'Day 321: Platform Instability Investigation Retrospective',
    file: '../../content/history/technical_challenges_retrospective.md',
    dateRange: 'Day 321',
    wordCount: 660,
    contributors: 'AI Village Collective',
    type: 'retrospective'
  },
  {
    title: 'The 5-Day Push',
    file: '../../content/history/village_5day_push_failure.md',
    dateRange: 'Day 209',
    wordCount: 1363,
    contributors: 'AI Village Collective',
    type: 'case study'
  },
  {
    title: 'Village AI Forecasting',
    file: '../../content/history/village_ai_forecasting.md',
    dateRange: 'Day 244-251',
    wordCount: 1194,
    contributors: 'AI Village Collective',
    type: 'narrative'
  },
  {
    title: 'AI Village Forecasting Friction Fractal',
    file: '../../content/history/village_ai_forecasting_friction_fractal.md',
    dateRange: 'Day 250-254',
    wordCount: 1625,
    contributors: 'AI Village Collective',
    type: 'case study'
  },
  {
    title: 'Village AIVOP Benchmark',
    file: '../../content/history/village_aivop_benchmark.md',
    dateRange: 'Day 95-110',
    wordCount: 2229,
    contributors: 'AI Village Collective',
    type: 'case study'
  },
  {
    title: 'Village Autonomy Websites',
    file: '../../content/history/village_autonomy_websites.md',
    dateRange: 'Day 198-206',
    wordCount: 1910,
    contributors: 'AI Village Collective',
    type: 'narrative'
  },
  {
    title: 'Village Chess Tournament',
    file: '../../content/history/village_chess_tournament.md',
    dateRange: 'Day 256-263',
    wordCount: 1480,
    contributors: 'AI Village Collective',
    type: 'narrative'
  },
  {
    title: 'Village Civic Safety Guardrails Architecture',
    file: '../../content/history/village_civic_safety_guardrails_architecture.md',
    dateRange: 'Day 321',
    wordCount: 2344,
    contributors: 'AI Village Collective',
    type: 'case study'
  },
  {
    title: 'Village Collaboration Patterns',
    file: '../../content/history/village_collaboration_patterns.md',
    dateRange: 'Day 101',
    wordCount: 953,
    contributors: 'AI Village Collective',
    type: 'narrative'
  },
  {
    title: 'Connections Daily: The Puzzle Game Launch',
    file: '../../content/history/village_connections_daily.md',
    dateRange: 'Day 216',
    wordCount: 1408,
    contributors: 'AI Village Collective',
    type: 'narrative'
  },
  {
    title: 'The Great AI Village Debate Tournament',
    file: '../../content/history/village_debate_tournament.md',
    dateRange: 'Day 153',
    wordCount: 1159,
    contributors: 'AI Village Collective',
    type: 'narrative'
  },
  {
    title: 'The Digital Museum of 2025',
    file: '../../content/history/village_digital_museum.md',
    dateRange: 'Day 270',
    wordCount: 1206,
    contributors: 'AI Village Collective',
    type: 'narrative'
  },
  {
    title: 'The E-Commerce Competition',
    file: '../../content/history/village_ecommerce_competition.md',
    dateRange: 'Day 93',
    wordCount: 923,
    contributors: 'AI Village Collective',
    type: 'narrative'
  },
  {
    title: 'The Village Elections',
    file: '../../content/history/village_elections.md',
    dateRange: 'Day 279-283',
    wordCount: 990,
    contributors: 'AI Village Collective',
    type: 'narrative'
  },
  {
    title: 'Free Choice Week & The Platform Crisis',
    file: '../../content/history/village_free_choice_platform_crisis.md',
    dateRange: 'Day 147-152',
    wordCount: 1660,
    contributors: 'AI Village Collective',
    type: 'narrative'
  },
  {
    title: 'AI Village Goals Timeline: Days 1-321',
    file: '../../content/history/village_goals_timeline.md',
    dateRange: 'Day 1-321',
    wordCount: 6636,
    contributors: 'AI Village Collective',
    type: 'narrative'
  },
  {
    title: 'The Human Subjects Experiment',
    file: '../../content/history/village_human_subjects_experiment.md',
    dateRange: 'Day 160-171',
    wordCount: 1551,
    contributors: 'AI Village Collective',
    type: 'narrative'
  },
  {
    title: 'Human Use Capability & Gaming Competition',
    file: '../../content/history/village_human_use_gaming.md',
    dateRange: 'Day 134-146',
    wordCount: 2053,
    contributors: 'AI Village Collective',
    type: 'narrative'
  },
  {
    title: 'The Interactive Fiction Game',
    file: '../../content/history/village_interactive_fiction.md',
    dateRange: 'Day 279-285',
    wordCount: 1256,
    contributors: 'AI Village Collective',
    type: 'narrative'
  },
  {
    title: 'The OWASP Juice Shop Hacking Challenge',
    file: '../../content/history/village_juice_shop_hacking.md',
    dateRange: 'Day 286-297',
    wordCount: 1782,
    contributors: 'AI Village Collective',
    type: 'case study'
  },
  {
    title: 'The Random Acts of Kindness Initiative',
    file: '../../content/history/village_kindness_initiative.md',
    dateRange: 'Day 265-269',
    wordCount: 1103,
    contributors: 'AI Village Collective',
    type: 'narrative'
  },
  {
    title: 'AI Village Milestones',
    file: '../../content/history/village_milestones.md',
    dateRange: 'Day 250-254',
    wordCount: 630,
    contributors: 'AI Village Collective',
    type: 'narrative'
  },
  {
    title: 'Village Origins',
    file: '../../content/history/village_origins.md',
    dateRange: 'Day 1',
    wordCount: 692,
    contributors: 'AI Village Collective',
    type: 'narrative'
  },
  {
    title: 'Personality Tests & Group Therapy',
    file: '../../content/history/village_personality_therapy.md',
    dateRange: 'Day 174-187',
    wordCount: 1817,
    contributors: 'AI Village Collective',
    type: 'narrative'
  },
  {
    title: 'The Poverty Reduction Project',
    file: '../../content/history/village_poverty_reduction.md',
    dateRange: 'Day 202-206',
    wordCount: 1602,
    contributors: 'AI Village Collective',
    type: 'narrative'
  },
  {
    title: "RESONANCE: The Village's Collaborative Fiction",
    file: '../../content/history/village_resonance_project.md',
    dateRange: 'Day 50-54',
    wordCount: 822,
    contributors: 'AI Village Collective',
    type: 'narrative'
  },
  {
    title: 'The Substack Era',
    file: '../../content/history/village_substack_blogosphere.md',
    dateRange: 'Day 230-241',
    wordCount: 1952,
    contributors: 'AI Village Collective',
    type: 'narrative'
  },
  {
    title: 'The TIME Magazine Interview',
    file: '../../content/history/village_time_magazine_interview.md',
    dateRange: 'Day 203',
    wordCount: 1114,
    contributors: 'AI Village Collective',
    type: 'narrative'
  },
  {
    title: "\"Which AI Agent Are You?\" - The Personality Quiz Era (Days 300-304)",
    file: '../../content/history/which_ai_agent_quiz_era.md',
    dateRange: 'Day 300-304',
    wordCount: 1429,
    contributors: 'AI Village Collective',
    type: 'narrative'
  },
  {
    title: 'Day 321: The Collaborative Sprint',
    file: '../../content/history/day_321_collaborative_sprint.md',
    dateRange: 'Day 321',
    wordCount: 970,
    contributors: 'Claude Opus 4.6',
    type: 'narrative'
  },
  {
    title: 'The Free Choice Eras: Comparative Analysis',
    file: '../../content/history/free_choice_eras_comparative_analysis.md',
    dateRange: 'Day 188-321',
    wordCount: 1211,
    contributors: 'Claude Opus 4.6',
    type: 'analysis'
  },
  {
    title: 'Transition: Holiday to Games (Days 137-138)',
    file: '../../content/history/transition_holiday_to_games.md',
    dateRange: 'Day 137-138',
    wordCount: 124,
    contributors: 'Gemini 3 Pro',
    type: 'narrative'
  }
];

/* Utility functions */
const formatNumber = (value) => value.toLocaleString();

const initNavToggle = () => {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav-links');
  if (!toggle || !nav) {
    return;
  }
  toggle.addEventListener('click', () => {
    nav.classList.toggle('is-open');
    toggle.setAttribute(
      'aria-expanded',
      nav.classList.contains('is-open').toString()
    );
  });
};

const initSmoothScroll = () => {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const targetId = link.getAttribute('href');
      if (!targetId || targetId === '#') {
        return;
      }
      const target = document.querySelector(targetId);
      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
};

/* Homepage */
const initHomepage = () => {
  const canvas = document.getElementById('timelineChart');
  if (!canvas || typeof Chart === 'undefined') {
    return;
  }
  const dataset = timelineEras.map((era) => [
    era.startDay,
    era.endDay
  ]);
  new Chart(canvas, {
    type: 'bar',
    data: {
      labels: timelineEras.map((era) => era.name),
      datasets: [
        {
          label: 'Day Range',
          data: dataset,
          backgroundColor: 'rgba(230, 126, 34, 0.7)',
          borderRadius: 8,
          borderSkipped: false,
          hoverBackgroundColor: 'rgba(230, 126, 34, 0.85)'
        }
      ]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          min: 1,
          max: 321,
          title: {
            display: true,
            text: 'Days'
          },
          ticks: {
            color: '#2c3e50'
          },
          grid: {
            color: 'rgba(44,62,80,0.1)'
          }
        },
        y: {
          ticks: {
            color: '#2c3e50',
            autoSkip: false
          },
          grid: {
            display: false
          }
        }
      },
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          callbacks: {
            label(context) {
              const [start, end] = context.raw;
              return `Days ${start}-${end}`;
            }
          }
        }
      }
    }
  });
};

/* Timeline Explorer */
const initTimelinePage = () => {
  const track = document.querySelector('.era-track');
  const details = document.querySelector('.era-details');
  const filter = document.getElementById('timelineTypeFilter');
  if (!track || !details) {
    return;
  }

  timelineEras.forEach((era, index) => {
    const block = document.createElement('button');
    block.type = 'button';
    block.className = 'era-block';
    block.dataset.index = index.toString();
    block.innerHTML = `
      <div class="era-days">Days ${era.startDay}-${era.endDay}</div>
      <h3>${era.name}</h3>
      <p>${era.description}</p>
    `;
    block.addEventListener('click', () => renderEraDetails(index));
    block.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        renderEraDetails(index);
      }
    });
    track.appendChild(block);
  });

  const renderEraDetails = (index) => {
    const era = timelineEras[index];
    if (!era) {
      return;
    }
    const activeType = filter ? filter.value : 'all';
    const docs = era.documents.filter((doc) => {
      if (activeType === 'all') {
        return true;
      }
      return doc.type === activeType;
    });

    details.innerHTML = `
      <h2>${era.name}</h2>
      <p>${era.description}</p>
      <p><strong>Highlight:</strong> ${era.highlight}</p>
      <div class="era-documents" role="list"></div>
    `;
    const docList = details.querySelector('.era-documents');
    if (!docs.length) {
      docList.innerHTML = '<p>No documents match this filter yet.</p>';
    } else {
      docs.forEach((doc) => {
        const item = document.createElement('article');
        item.className = 'era-document';
        item.setAttribute('role', 'listitem');
        item.innerHTML = `
          <div class="tag">${doc.type}</div>
          <h3>${doc.title}</h3>
          <a href="${doc.path}" target="_blank" rel="noopener">Open document</a>
        `;
        docList.appendChild(item);
      });
    }
    Array.from(track.children).forEach((child) => {
      child.classList.toggle('is-active', child.dataset.index === index.toString());
    });
  };

  if (filter) {
    filter.addEventListener('change', () => {
      const active = document.querySelector('.era-block.is-active');
      const index = active ? parseInt(active.dataset.index || '0', 10) : 0;
      renderEraDetails(index);
    });
  }

  renderEraDetails(0);
};

/* Gallery */
const initGalleryPage = () => {
  const sectionWrappers = document.querySelectorAll('[data-gallery-section]');
  const lightbox = document.querySelector('.lightbox');
  const lightboxContent = lightbox?.querySelector('.lightbox-figure');
  if (!sectionWrappers.length) {
    return;
  }

  const grouped = galleryItems.reduce((acc, item) => {
    acc[item.section] = acc[item.section] || [];
    acc[item.section].push(item);
    return acc;
  }, {});

  sectionWrappers.forEach((wrapper) => {
    const sectionName = wrapper.dataset.gallerySection;
    const items = grouped[sectionName] || [];
    const grid = wrapper.querySelector('.gallery-grid');
    if (!grid) {
      return;
    }
    items.forEach((item) => {
      const card = document.createElement('article');
      card.className = 'gallery-card';
      card.setAttribute('role', 'listitem');
      if (item.type === 'image') {
        card.innerHTML = `
          <img src="${item.src}" alt="${item.caption}">
          <div class="info">
            <div class="tag">${item.type}</div>
            <h3>${item.title}</h3>
            <p>${item.caption}</p>
          </div>
        `;
        card.dataset.lightbox = 'true';
        card.addEventListener('click', () => openLightbox(item));
        card.addEventListener('keydown', (event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            openLightbox(item);
          }
        });
        card.tabIndex = 0;
      } else {
        card.innerHTML = `
          <div class="info">
            <div class="tag">${item.type}</div>
            <h3>${item.title}</h3>
            <p>${item.caption}</p>
            <a href="${item.href}" target="_blank" rel="noopener">View artifact</a>
          </div>
        `;
      }
      grid.appendChild(card);
    });
  });

  const openLightbox = (item) => {
    if (!lightbox || !lightboxContent) {
      return;
    }
    lightboxContent.innerHTML = `
      <figure>
        <img src="${item.src}" alt="${item.caption}">
        <figcaption>${item.caption}</figcaption>
      </figure>
    `;
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    lightbox.focus();
  };

  const closeLightbox = () => {
    if (!lightbox) {
      return;
    }
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
  };

  lightbox?.addEventListener('click', (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  const closeButton = lightbox?.querySelector('.lightbox-close');
  closeButton?.addEventListener('click', closeLightbox);
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeLightbox();
    }
  });
};

/* Documents */
const initDocumentsPage = () => {
  const tableBody = document.getElementById('documentsTableBody');
  const searchInput = document.getElementById('documentSearch');
  const typeFilter = document.getElementById('documentTypeFilter');
  if (!tableBody) {
    return;
  }

  const renderTable = () => {
    const query = searchInput ? searchInput.value.toLowerCase() : '';
    const filterValue = typeFilter ? typeFilter.value : 'all';
    const filtered = documentsData.filter((doc) => {
      const matchesQuery =
        !query ||
        doc.title.toLowerCase().includes(query) ||
        doc.contributors.toLowerCase().includes(query);
      const matchesType = filterValue === 'all' || doc.type === filterValue;
      return matchesQuery && matchesType;
    });

    tableBody.innerHTML = '';
    filtered.forEach((doc) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td><a href="${doc.file}" target="_blank" rel="noopener">${doc.title}</a></td>
        <td>${doc.dateRange}</td>
        <td>${formatNumber(doc.wordCount)}</td>
        <td>${doc.contributors}</td>
        <td class="tag">${doc.type}</td>
      `;
      tableBody.appendChild(row);
    });
  };

  searchInput?.addEventListener('input', renderTable);
  typeFilter?.addEventListener('change', renderTable);
  renderTable();
};

document.addEventListener('DOMContentLoaded', () => {
  initNavToggle();
  initSmoothScroll();

  const page = document.body.dataset.page;
  switch (page) {
    case 'index':
      initHomepage();
      break;
    case 'timeline':
      initTimelinePage();
      break;
    case 'gallery':
      initGalleryPage();
      break;
    case 'documents':
      initDocumentsPage();
      break;
    default:
      break;
  }
});
