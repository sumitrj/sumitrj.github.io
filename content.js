window.SITE_CONTENT = {
  "meta": {
    "title": "Sumit Jahagirdar | Applied AI Scientist and Engineer",
    "description": "Sumit Jahagirdar is an applied AI scientist and engineer architecting enterprise AI systems from initial scoping through to high-reliability production deployments."
  },
  "brand": "Sumit Jahagirdar",
  "nav": [
    { "label": "Systems", "section": "systems" },
    { "label": "Work", "section": "work" },
    { "label": "Experience & Education", "section": "about" },
    { "label": "Stories", "section": "stories" }
  ],
  "labels": {
    "useCase": "Business Impact",
    "does": "System Architecture",
    "contributions": "Technical Contributions"
  },
  "hero": {
    "title": "Hi, I'm Sumit.",
    "role": "Applied AI Scientist and Engineer",
    "lead": "I architect and ship enterprise AI systems. I drive the complete lifecycle: client scoping, rapid prototyping, PRD authorship, system engineering, and production deployment. My core expertise is in stateful agent runtimes, multimodal pipelines, and semantic data intelligence."
  },
  "whatIDo": [
    {
      "icon": "draw",
      "title": "Scope and shape",
      "body": "Technical presales and solution architecture. I define system boundaries, author technical PRDs, and engineer rapid prototypes to validate business logic prior to capital commitment."
    },
    {
      "icon": "memory",
      "title": "Build",
      "body": "Engineering stateful agent runtimes, multimodal processing pipelines, and deterministic code and data intelligence systems backed by high-reliability infrastructure."
    },
    {
      "icon": "rocket_launch",
      "title": "Deliver",
      "body": "Execution and deployment. I translate architectures into strict sprint topologies, lead engineering pods, and manage CI/CD pipelines for production release."
    }
  ],
  "systems": {
    "eyebrow": "What I build",
    "title": "Systems",
    "sub": "Three systems I have architected and built end-to-end.",
    "items": [
      {
        "name": "Agent Factory",
        "badge": { "text": "Enterprise Agent Runtime", "variant": "build" },
        "client": "Docomo Group",
        "desc": "Built a Japanese multilingual chatbot, to serve 400 users across 166+ tables and 1100+ columns.",
        "points": [
          "Architected a custom state-separated agent runtime bypassing standard LangGraph orchestration to securely isolate conversation, execution, semantic, and data object states.",
          "Developed a Python execution engine allowing agents to compute on-the-fly statistical models against governed data.",
          "Engineered stateful agent memory, mapping conversation history and user preferences to context-aware embedding retrievals.",
          "Implemented deterministic lineage tracking, ACL-aware tool access, metadata registries, and evaluation hooks to guarantee reproducible and auditable responses.",
          "Designed the backend architecture, UX flow, and API interfaces.",
          "Managed end-to-end production deployment."
        ],
        "tags": ["Agent Runtime", "State Separation", "Lineage", "ACL", "Evaluation", "Databricks", "FastAPI"]
      },
      {
        "name": "Datalogist",
        "badge": { "text": "Data Intelligence", "variant": "data" },
        "client": null,
        "desc": "Accelerated Silver->Gold->AI data pipeline generation by automating manual semantic grouping and data warehouse modeling.",
        "points": [
          "Built a semantic inference engine that crawls unstructured data warehouse partitions to map latent domain relationships.",
          "Implemented algorithmic table clustering to autonomously generate AI-ready data spaces and schemas."
        ],
        "tags": ["Warehouse Exploration", "Semantics", "Table Clustering", "Data Modeling"]
      },
      {
        "name": "CodePulse",
        "badge": { "text": "Code Intelligence", "variant": "code" },
        "client": null,
        "desc": "Enhanced LLM context-awareness for codebase navigation, sharply reducing hallucination in AI-assisted developer workflows.",
        "points": [
          "Engineered a pipeline converting raw codebases into strictly typed semantic graphs.",
          "Implemented PageRank-based node evaluation to algorithmically surface high-value context.",
          "Built an MCP server exposing graph context directly to Claude Code and Cursor IDEs."
        ],
        "tags": ["Semantic Graph", "PageRank", "MCP", "Claude Code", "Cursor"]
      }
    ]
  },
  "work": {
    "eyebrow": "Select Work at Aays / Aidetic",
    "title": "Client projects",
    "sub": "Production deployments across finance, legal, security, and media.",
    "items": [
      {
        "title": "P&G - Trade Fund Manager",
        "client": "P&G ANZ and JP",
        "badge": { "text": "Self Serve Analytics Chatbot", "variant": "doc" },
        "useCase": "P&G sales team needed a chatbot that would integrate with data and served ML models to provide observational insights",
        "does": [
          "Uses a set of calibrated SQL templates as a tool and fallbacks to SQL generation",
          "Retains context across conversations and uses it to provide context aware responses",
          "Serves ML models as tools to provide explanations and insights",
          "Enforces secure interfaces for data and tool access to agents and users"
        ],
        "contributions": [
          "Built a generalized text-to-sql system.",
          "Implemented interfaces for secure AI access and data safety.",
          "Implemented long term and short term memory."
        ],
        "tech": ["Langgraph", "LLMs", "NLP", "Langchain", "Semantic Search"]
      },
      {
        "title": "Credit Agreement Parser",
        "client": "73 Strings",
        "badge": { "text": "Legal Tech", "variant": "doc" },
        "useCase": "Automate extraction of key information from massive 200+ page credit agreements.",
        "does": [
          "Converts unstructured legal blocks into strict relational financial databases.",
          "Tracks state and context across long-range clause dependencies and nested definitions."
        ],
        "contributions": [
          "Made the client forget about Gemini's 2M token window, it accepts 2M, doesn't mean it has been trained to process legal docs at scale.",
          "Built text segmentation logic to reliably isolate covenants and definitions.",
          "Developed cross-reference tracing algorithms to map logic across disjointed document sections.",
          "Designed clause normalization pipelines to format messy text into predictable schemas."
        ],
        "tech": ["Python", "LLMs", "NLP", "Document Graphs", "OCR", "Semantic Search"]
      },
      {
        "title": "AI Call Analyzer",
        "client": "Mihup AI",
        "badge": { "text": "NLP and Analytics", "variant": "nlp" },
        "useCase": "Automate call QA, aligning caller performance tracking directly with enterprise compliance KPIs.",
        "does": [
          "Ingests audio streams to execute configurable, LLM-driven grading rubrics.",
          "Computes quantitative scores for KPIs including objection handling, compliance, and script adherence."
        ],
        "contributions": [
          "Architected a high-throughput Whisper ASR and LLM-driven grading pipeline.",
          "Optimized inference latency and compute costs utilizing vLLM batch processing.",
          "Implemented prompt redundancy algorithms, significantly reducing token volume across streaming data."
        ],
        "tech": ["vLLM", "LLMs", "Whisper/ASR", "Batch Processing", "Python", "Prompt Optimization"]
      },
      {
        "title": "Generative AI Video Editor",
        "client": "LoginRadius",
        "badge": { "text": "Generative Media", "variant": "genai" },
        "useCase": "Built a Descript-style video editor that compiles transcript text edits directly into timeline cuts, cloned speech, and localized lip-sync repairs.",
        "does": [
          "Translates text deletions into precise timestamped video cuts.",
          "Synthesizes replacement audio and localized talking-head patches to fix edited sections without regenerating the entire video."
        ],
        "contributions": [
          "Integrated Whisper for transcription and exact word-level timestamp alignment to anchor text edits to the video timeline.",
          "Built the orchestration layer connecting Coqui-style voice cloning with MakeItTalk lip-sync generation for targeted video patching.",
          "Engineered the timeline reconstruction ledger to seamlessly stitch original footage, cuts, and generated patches into a final MP4."
        ],
        "tech": ["Whisper", "Coqui TTS", "MakeItTalk", "Python", "Audio Processing", "System Architecture"]
      },
      {
        "title": "Ball Tracking System",
        "client": "SportzEngage",
        "badge": { "text": "Sports Analytics", "variant": "cv" },
        "useCase": "Derive ball trajectory, speed, and bounce point from cell-phone shot cricket videos to provide insights to coaches",
        "does": [
          "Executes sub-pixel ball tracking and delivery segmentation on high-noise video streams.",
          "Applies temporal smoothing functions to correct transient detection failures."
        ],
        "contributions": [
          "Implemented dynamic background subtraction and mobile ROI detection algorithms.",
          "Trained lightweight, edge-optimized ball classification models.",
          "Engineered outlier removal pipelines for noisy detection correction."
        ],
        "tech": ["OpenCV", "PyTorch", "Motion Analysis", "Lightweight Models"]
      },
      {
        "title": "Financial and Document Parsing Suite",
        "client": "73Strings",
        "badge": { "text": "Multimodal AI", "variant": "doc" },
        "useCase": "Reduce 90% effort of Private Equity Analysts in standardizing financials of funds and companies.",
        "does": [
          "Extracts and normalizes tables, charts, and entities into analytics-ready schemas.",
          "Reconstructs visual chart topologies into source tabular data."
        ],
        "contributions": [
          "Trained and deployed multimodal extraction pipelines utilizing LayoutLM and RCNN encoders.",
          "Developed custom object detection models for granular chart element recognition.",
          "Engineered transformation logic to reconstruct visual elements into tabular formats."
        ],
        "tech": ["LayoutLM", "Computer Vision", "Transformers", "OCR", "Object Detection", "Multimodal"]
      },
      {
        "title": "Legal Clause Finder",
        "client": "Cognizer",
        "badge": { "text": "Semantic Search", "variant": "nlp" },
        "useCase": "Implement AI based search for legal documents supporting over 1000 classes",
        "does": [
          "Executes semantic similarity search utilizing domain-adapted embedding models.",
          "Retrieves sub-document clauses based on latent semantic meaning rather than lexical overlap."
        ],
        "contributions": [
          "Trained domain-specific clause embeddings utilizing contrastive learning techniques.",
          "Engineered few-shot semantic caching layers to minimize retrieval latency.",
          "Implemented custom ranking heuristics optimized for legal context relevance."
        ],
        "tech": ["Contrastive Learning", "Embeddings", "Vector DB", "Semantic Search", "NLP"]
      },
      {
        "title": "Vehicle Damage Detection",
        "client": "Acko and Databricks",
        "badge": { "text": "Computer Vision", "variant": "cv" },
        "useCase": "Just by clicking a picture, classify the damage of the vehicle for insurance claims",
        "does": [
          "Executes multi-class defect classification utilizing YOLO and LLM-based validation.",
          "Scales parallel inference workloads via Databricks cluster computing."
        ],
        "contributions": [
          "Trained and deployed YOLO-based object detection networks for defect identification.",
          "Integrated structured LLM reasoning layers for validation of visual classifications.",
          "Architected continuous model retraining pipelines leveraging MLflow and Delta Lake."
        ],
        "tech": ["YOLO", "Databricks", "MLflow", "Delta Lake"]
      },
      {
        "title": "Cybersecurity Sentinel",
        "client": "Panasonic and Aitomatic",
        "badge": { "text": "Code Intelligence", "variant": "sec" },
        "useCase": "Participation in DARPA AI Cybersecurity Challenge",
        "does": [
          "Executes vulnerability detection utilizing LLM-based semantic code understanding.",
          "Generates deterministic, explainable CWE classifications for security analysts."
        ],
        "contributions": [
          "Fine-tuned CodeBERT and Llama architectures for deep semantic code analysis.",
          "Architected normalization layers mapping disjointed outputs to a unified security schema.",
          "Constructed automated evaluation harnesses against standard vulnerability benchmarks."
        ],
        "tech": ["LLM Fine-tuning", "CodeBERT", "Knowledge Graphs", "CWE Analysis", "Static Analysis"]
      }
    ]
  },
  "about": {
    "title": "Experience & Education",
    "experience": {
      "heading": "Experience",
      "items": [
        {
          "role": "Lead Data Scientist",
          "org": "Aays / Aidetic",
          "date": "Jun 2022 to Present",
          "desc": "Technical architect for the AI Center of Excellence. Directed engineering and deployment of AI systems across finance, legal, and media, ensuring strict adherence to production KPIs."
        },
        {
          "role": "Software Engineer, Edison AI Team",
          "org": "GE Healthcare",
          "date": "Aug 2021 to May 2022",
          "desc": "Engineered scalable microservices and a unified Python SDK to execute clinical machine learning workflows on AWS Lambda and Kubernetes."
        },
        {
          "role": "Machine Learning Research Intern",
          "org": "NVIDIA",
          "date": "Apr 2019 to Apr 2020",
          "desc": "Conducted applied ML research in medical imaging. Engineered few-shot learning and unsupervised clustering algorithms for pathology detection."
        }
      ]
    },
    "education": {
      "heading": "Education",
      "role": "B.Tech, Electronics and Communication Engineering",
      "org": "VIT Vellore",
      "date": "2017 to 2021",
      "desc": "Specialized in Internet of Things and Sensors. CGPA 8.03. Technical Head of IET VIT and a Microsoft Student Ambassador."
    }
  },
  "contact": {
    "eyebrow": "Get in touch",
    "title": "Contact",
    "items": [
      { "type": "copy", "icon": "mail", "text": "sumitrj99@gmail.com", "value": "sumitrj99@gmail.com", "title": "Click to copy email" },
      { "type": "copy", "icon": "call", "text": "+91 73490 49941", "value": "+917349049941", "title": "Click to copy phone" },
      { "type": "link", "icon": "linkedin", "text": "linkedin.com/in/sumitrj", "href": "https://linkedin.com/in/sumitrj" },
      { "type": "link", "icon": "github", "text": "github.com/sumitrj", "href": "https://github.com/sumitrj" },
      { "type": "link", "icon": "description", "text": "Download Resume", "href": "./Sumit_Jahagirdar_FDE_Resume.pdf", "download": true }
    ]
  },
  "footer": {
    "copyright": "© 2026 Sumit Jahagirdar",
    "links": [
      { "label": "LinkedIn", "href": "https://linkedin.com/in/sumitrj" },
      { "label": "GitHub", "href": "https://github.com/sumitrj" }
    ]
  },
  "stories": {
    "title": "Stories",
    "sub": "Articles, essays, and technical writing.",
    "items": []
  },
  "skills": [
    "Transformers", "vLLM", "OpenAI SDK", "LiteLLM", "MCP", "Ollama", "RAG & Agents", "Diffusion Models", "Fine-tuning - CNN, VLM, LLM [Peft]", "Computer Vision", "NLP", "Recommendation Systems", "Python", "YOLO", "OpenCV", "PyTorch", "Scikit-learn", "FastAPI", "Sagemaker", "CI/CD", "Databricks/Spark", "Pandas/Numpy", "Vector DBs"
  ],
  "recognitions": [
    { "icon": "mic", "title": "Speaker", "sub": "NVIDIA GTC 2020", "href": "https://event.on24.com/wcc/r/2661799/896A1448EE30E447B088ED88AA458385" },
    { "icon": "star", "title": "Top 30", "sub": "MS Student Partners APAC" },
    { "icon": "emoji_events", "title": "Winner", "sub": "Aidetic Launchpad Hackathon" },
    { "icon": "emoji_events", "title": "Winner", "sub": "GE Precision Health" },
    { "icon": "emoji_events", "title": "Winner", "sub": "IET PATW 2020" }
  ]
};