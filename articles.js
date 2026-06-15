window.SITE_ARTICLES = [
    {
        title: "Cricket Ball Detection: From Single-Frame Vision to Time-Series Reconstruction",
        thumbnail: "./article_images/ball_detection.png",
        glance: "Detecting a fast-moving ball in noisy mobile footage is practically impossible using standard frame-by-frame object detection. We solved this by treating video not as a collection of static images, but as a time-series reconstruction problem.",
        markdown: `
### The Problem Space: Variable FPS, Blur, and Massive Class Imbalance
Building a sports analytics tool for real-world video means pristine lab data is completely useless. Users record training sessions on mobile phones with variable frame rates that constantly fluctuate between 30 and 60 FPS. The physical constraints make this exceptionally difficult: the cricket ball is incredibly small, often appearing as just a three-pixel blur that gets washed out in glare, lost in net shadows, or completely blocked by a batter's arm. 

Furthermore, in standard cricket footage, 99 percent of the pixels do not even contain a ball, creating a massive class imbalance. When we tried running heavy deep learning object detectors across full 1080p frames, they were incredibly slow and hallucinated constantly. Attempting to track the ball frame-by-frame inevitably broke because the model would drop detections or mistakenly flag moving bats as the ball. Hardcoding logic based on raw frame counts broke immediately the moment a user changed their camera settings.

### The Architecture: Time-Series Reconstruction Over Object Detection
To circumvent these failures, we completely shifted our paradigm. We stopped treating the system as a frame-by-frame object detection problem and instead architected it from the ground up as a time-series reconstruction problem.

We built a highly optimized two-stage pipeline:
* **Candidate Generation & Classification:** We first used motion heuristics to generate candidate crops, drastically reducing the search space. A lightweight CNN binary classifier then filtered these patches into strictly ball or no-ball.
* **Temporal Tracking Over Raw Detections:** Instead of treating raw detections as absolute truth, we treated the model outputs as noisy observations. We wrote temporal logic to check continuity based on velocity limits, systematically dropping physics-defying outliers (like a ball suddenly moving at Mach 3).
* **Dynamic Time Normalization:** To solve the frame rate issue, we dynamically normalized the entire pipeline around actual time rather than frame counts, buffering roughly 35 to 40 frames of context to mathematically capture the full delivery regardless of the recording speed.

![Ball detection architecture diagram](./article_images/ball_detection.png)

### The Takeaway: Event-Level Evaluation Beats Frame-Level Accuracy
This architectural shift required an entirely new way to measure success. Frame-level accuracy metrics were completely abandoned, as bounding box overlap is useless if the app misses the actual delivery. Instead, we evaluated the system strictly as a usable analytics product based on event-level validity, scoring video segments as Matches, Misses, and Extras using a practical temporal tolerance window.
        `
    },
    {
        title: "A Multimodal Compiler: Building a Generative AI Video Editor",
        thumbnail: "./article_images/video_editor.png",
        glance: "Traditional timeline editing is highly inefficient for spoken content. We built a system that behaves like a text document, allowing users to surgically edit video simply by modifying its transcript.",
        markdown: `
### The Problem Space: The Inefficiency of Timeline Editing for Spoken Content
Traditional timeline-based editing tools are fundamentally inefficient for spoken content like interviews, tutorials, and lectures. For spoken video, the meaningful unit of information is a word or a sentence, not an individual video frame. We wanted to bridge this gap between text manipulation and video rendering. 

While deleting a word to cut a video is relatively straightforward, text insertion is a massive engineering hurdle. It requires the system to generate entirely new audio and mathematically hallucinate the corresponding new lip movements. We could not simply regenerate the entire video to fix a single word; doing so is computationally expensive, slow, and highly unstable. Furthermore, if the transcription timestamps, generated audio samples, and stitched video frames drifted out of sync at any point, the entire output timeline would break and fall into the uncanny valley.

### The Architecture: A Multimodal Compiler Hidden Inside a Document Editor
We resolved this by building a multimodal compiler disguised as a document editor. In this paradigm, the text transcript served as the source code, and the finalized MP4 was the cleanly compiled artifact. To prevent temporal drift, the system meticulously orchestrated distinct models:

* **Surgical Deletion & Anchoring:** We utilized Whisper strictly for speech-to-text transcription and precise temporal anchoring of the original media. When a user deleted text, the system automatically located the corresponding timestamps, natively cut the media, and stitched the clips back together.
* **Zero-Shot Audio Synthesis:** For text insertions, we deployed custom GAN-based voice cloning pipelines (including Coqui-style TTS models) to synthesize zero-shot replacement speech purely from raw text.
* **Localized Visual Repair:** We integrated facial landmark detection with audio-driven Wav2Lip and MakeItTalk-style frame synthesis architectures to execute localized visual repair. This patched tiny, generated mouth movements directly back into the video timeline.
* **Sub-Frame Alignment:** To ensure the generated output didn't fall into the uncanny valley, we implemented advanced signal processing to guarantee exact sub-frame temporal synchronization and pitch alignment between the synthesized audio and video tracks.

![Multimodal compiler architecture](./article_images/video_editor.png)

### The Takeaway: The Timeline Ledger
The true power of this system was its internal Timeline Ledger. A custom timeline renderer walked an internal ledger of original clips, deleted gaps, and generated patches to deterministically compile the final MP4. By doing this, the system only ever repaired the specifically affected segment, preserving the fidelity of the original footage.
        `
    },
    {
        title: "Financial Legal Tech: Deterministic Credit Agreement Parser",
        thumbnail: "./article_images/credit_agreement_parser.png",
        glance: "We eliminated manual extraction bottlenecks for massive, 200+ page credit agreements, accelerating SEC Master table generation by converting unstructured legal text directly into relational financial schemas.",
        markdown: `
### The Problem Space: The Topological Nightmare of 200-Page Credit Agreements
The primary requirement was to accelerate SEC Master table generation by delivering high-fidelity, deterministic structured outputs extracted from massive, heavily nested 200+ page credit agreements. In the legal and financial sectors, the manual processing of these highly complex and deeply nested documents creates severe, expensive operational bottlenecks for financial and regulatory reporting. 

Financial credit agreements are inherently unstructured, highly regulated, and structurally disjointed. Basic text extraction tools and naive LLM prompts fail entirely on these documents because the true meaning of the extracted data relies heavily on long-range clause dependencies and nested definitions that are scattered randomly across hundreds of pages.

### The Architecture: Deterministic Conversion and Topological State Tracking
We bypassed simple extraction and focused on executing the deterministic conversion of unstructured legal text directly into strict, relational financial schemas. 

* **Topological Mapping:** The core of the parser was engineered to maintain topological state during document processing. This architectural decision allowed the system to accurately track long-range clause dependencies and resolve nested definitions across entirely disjointed document sections. 
* **Context-Aware Segmentation:** To feed this engine, we implemented sophisticated, context-aware NLP segmentation pipelines tailored specifically for parsing financial covenants.

![Credit agreement parser architecture](./article_images/credit_agreement_parser.png)

### The Takeaway: Cross-Reference Tracing for End-to-End Auditability
To guarantee data integrity, we built deterministic clause normalization pipelines equipped with cross-reference tracing algorithms. This ensured strict schema compliance and provided end-to-end auditability for every extracted data point, a critical requirement in legal tech.
        `
    },
    {
        title: "Mapping the Legal Labyrinth: Scaling Text Classification to 1,000+ Clauses",
        thumbnail: "./article_images/massive_legal_search.png",
        glance: "We set out to build a legal intelligence and search tool with zero initial labeled data. When a massive 1,000-class taxonomy resulted in low accuracy and high model confusion, we stopped forcing rigid human boundaries. By leveraging the confusion matrix and few-shot learning, we semantically redefined the categories, transforming a failing classifier into a dynamic semantic search engine. Crucially, we achieved this using deterministic embedding and clustering pipelines rather than relying on massive, opaque Large Language Models.",
        markdown: `
### The Problem Space: The 1,000-Class Taxonomy and the Cold Start Dilemma
The requirement was ambitious: build a legal intelligence platform that enabled significantly faster search across massive contract repositories by classifying unstructured legal text into over 1,000 highly specific clause types. The primary constraint was a complete cold start. There was absolutely zero pre-annotated data available; all human annotation had to occur dynamically during the project's lifecycle.

As the initial annotations rolled in, we attempted to train a standard text classifier. It hit a wall immediately. With 1,000+ classes, the accuracy plummeted, and the system exhibited massive confusion. The failure wasn't due to poor model architecture; it was a taxonomy problem. The semantic boundaries between human-defined legal clauses were highly subjective, overlapping, and practically indistinguishable to the model.

### The Architecture: Redefining Semantics via Confusion and Few-Shot Learning
Instead of fighting the low accuracy by forcing human reviewers to do more rigid, granular annotations, we shifted the paradigm: we decided to leverage the confusion.

* **Semantic Re-definition via Confusion:** We stopped treating the model's confusion matrix as a failure metric and started using it as a feature. If the model consistently confused Clause A and Clause B, it mathematically proved that those clauses lacked a distinct semantic boundary. We applied clustering algorithms over these high-confusion areas to group them, dynamically merging overlapping human categories into stable, mathematically distinct semantic clusters.
* **Few-Shot Learning Engine:** Because data was being labeled iteratively during the workflow, we couldn't wait for massive datasets to train standard deep learning models. We deployed few-shot learning architectures. This allowed the system to immediately adapt to newly defined or merged clauses using only a handful of expert-verified examples, keeping the pipeline agile as the taxonomy evolved.

![Semantic clustering diagram](./article_images/massive_legal_search.png)

### The Takeaway: Morphing a Classifier into a Topological Semantic Map
By clustering rather than strictly classifying, we successfully morphed the pipeline from a brittle classifier into a powerful search and discovery tool. We projected the entire contract repository into a high-dimensional latent space, rendering it as a visual Semantic Map for the end-users. 

The true power of this system was its dynamic adaptability. When lawyers encountered novel language or needed to track a newly legislated concept, they didn't need to retrain a classifier. They could visually explore the semantic map, lasso specific clusters of text that represented the new concept, and map them into entirely new clauses on the fly. The system stopped being a rigid taxonomy and became a living, topological map of legal intelligence.
        `
    },
    {
        title: "A Cognitive Approach to AI Systems Engineering",
        thumbnail: "./article_images/cognitive_functions_protocol.png",
        glance: "A research-backed framework for selecting the right AI architecture—whether a simple LLM, an Agentic Framework, or a Custom Agent system—based on cognitive functions rather than industry hype.",
        markdown: `
### The Problem Space: The High Cost of Over-Engineered Multi-Agent Frameworks
Engineering teams are currently flooded with hype around multi-agent frameworks. In an attempt to automate workflows, teams are frequently over-engineering their solutions, leading to fragile, overly complex architectures. 

Applying complex agentic frameworks to basic, deterministic problems creates massive technical debt. In real-world enterprise deployments, claims frequently get stuck between individual agents due to data mismatches. Debugging these flows turns into a nightmare of disjointed logs, and teams are often forced to hire human babysitters just to restart failed jobs.

### The Architecture: Mapping AI to the Five Core Cognitive Functions
We proposed breaking complex AI workflows down into five core cognitive functions: Observe, Remember, Reason, Act, and Verify. By mapping the architecture to these functions, teams can scale intelligence appropriately. 

The framework operates on the principle that AI systems mirror organizational structures:
* A single LLM call is a fast, specialized worker.
* Agentic frameworks operate like cross-functional project teams, excellent for exploratory flows but vulnerable to communication debt.
* Custom agentic systems function like high-performing, heavily structured enterprises offering stringent handoffs and deterministic control.

![Cognitive functions protocol diagram](./article_images/cognitive_functions_protocol.png)

### The Takeaway: True Agents Do Not Require Natural Language
A vital realization of this framework is moving beyond language. True intelligence agents sense, decide, act, and improve—they do not necessarily need natural language to deliver deterministic results. The smartest architectures deploy fast deterministic rules for unambiguous edge cases, utilize small models when speed and privacy are critical, and reserve heavy LLMs strictly for scenarios demanding broad semantic context.
        `
    }
]