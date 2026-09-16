import type { Project } from "@/lib/types";

/**
 * Project content. Every claim below was checked against the linked
 * repository (README, docs/, source tree) at the time of writing. Keep it that
 * way: if a feature is not in the repo, it does not belong here.
 *
 * Display numbers are assigned by position (see publishedProjects).
 * To add a project, append an entry. Entries with `status: "draft"` are kept
 * out of the site (list and routes) until they are filled in.
 */
export const projects: Project[] = [
  // ---------------------------------------------------------------------
  // 01 — Flagship
  // ---------------------------------------------------------------------
  {
    slug: "ai-game-qa-framework",
    title: "AI Game QA & Automated Replay Testing System",
    tagline:
      "A Unity QA framework that records gameplay, replays it deterministically, validates the replay against the original run, and scores sessions with rule-based quality oracles.",
    technologies: ["Unity 6", "C#", "QA Automation", "Unity Test Framework"],
    type: "open-source",
    status: "active",
    year: "2026",
    featured: true,
    pipeline: [
      { label: "Gameplay", detail: "BenchGame · 2D platformer" },
      { label: "Replay Recording", detail: "ReplayRecorder · FixedUpdate" },
      { label: "Replay Data", detail: "replay.json · events.jsonl" },
      { label: "Validation", detail: "ReplayValidator · TrajectoryComparer" },
      { label: "QA Oracles", detail: "5 rule-based oracles" },
      { label: "Analysis", detail: "FeatureExtractor · AnalysisEngine" },
    ],
    highlights: [
      { label: "engine", value: "Unity 6.3 LTS" },
      { label: "assemblies", value: "6 (framework, adapters, game, editor, tests)" },
      { label: "tests", value: "29 EditMode + PlayMode test files" },
      { label: "oracles", value: "5 rule-based quality oracles" },
    ],
    github: "https://github.com/tharun-1365/AI-Game-QA-Framework",
    ctaLabel: "View Case Study",
    caseStudy: {
      overview: [
        "UnityQA is a testing framework that lives inside a Unity 6.3 LTS project and tests a 2D platformer from the outside in. It captures player input and telemetry during a session, replays that input in the physics-step domain so the run reproduces on any frame rate, and compares the replayed trajectory and outcome against the original.",
        "On top of replay it builds a small evidence pipeline: per-session features, a dataset across sessions, descriptive statistics, and a set of quality oracles that turn recorded evidence into PASS / FAIL / SKIP verdicts. A planted-bug benchmark level provides ground truth for scoring those oracles.",
        "Scope is deliberate: the repository records autonomous agents and ML-based detection as future work. The implemented contribution is the deterministic replay → validation → oracle pipeline, and every claim in its docs is meant to be checkable against the code.",
      ],
      problem: [
        "Gameplay bugs such as soft locks, fall-through colliders, and non-firing triggers are easy to hit by hand but hard to reproduce, and \"it worked on my machine\" usually means the input landed on different physics steps.",
        "Manual QA produces no artifacts. A regression needs a recorded run, a way to replay it faithfully, and a machine-checkable verdict.",
      ],
      approach: [
        "Separate tester from testee. The framework compiles in its own assemblies (UnityQA, UnityQA.Adapters) and touches the game only through small interfaces (IGameAdapter, IPlayerInputSource, IRunOutcomeSource). The game under test, BenchGame, never references the framework.",
        "Record what the physics step consumes. Input is captured per FixedUpdate rather than per rendered frame, so the mapping recorded frame → physics step is 1:1 on any frame rate (replay.json schema v2, inputDomain: fixedStep).",
        "Make everything an artifact. Sessions, replays, validation results, features, datasets, analysis, oracle results, evaluations, and the HTML report are all versioned JSON/CSV/HTML files under a single QAData/ tree.",
      ],
      features: [
        "Session recording: event stream (events.jsonl), session manifest (session.json), and an input replay trace (replay.json) written with Unity's JsonUtility — no external runtime packages.",
        "Deterministic replay: ReplayPlayer feeds recorded input through the controller's input seam one frame per FixedUpdate; ReplayInputSource substitutes the keyboard.",
        "Replay validation: ReplayValidator replays a session under recording and TrajectoryComparer computes max / mean / RMS deviation, first divergence time, and duration delta; a configurable threshold decides PASS / FAIL and outcome mismatch downgrades a pass (validation.json).",
        "Replay catalog: ReplayCatalog indexes every session newest-first, links validations to originals, and surfaces crashed (still \"open\") sessions.",
        "Feature extraction and datasets: FeatureExtractor → features.json per session; FeatureDatasetBuilder → dataset.json + features.csv across sessions; AnalysisEngine → z-scores, percentiles, and outlier candidates (analysis.json).",
        "Quality oracles: ReplayConsistency, Completion, Hazard, SoftLock, and MissingTrigger, run in deterministic order with exception isolation (oracle-results.json).",
        "Planted-bug evaluation: a benchmark level with four documented defects, an authored campaign manifest, and EvaluationEngine scoring detection rate, consistency, and false positives (evaluation.json / .csv).",
        "Reporting: HtmlReportGenerator renders the stored evidence into one self-contained HTML report with no external assets.",
      ],
      architecture: {
        diagram: {
          direction: "vertical",
          nodes: [
            {
              label: "Gameplay",
              detail: "BenchGame — 2D platformer under test",
              items: ["PlayerController2D", "IPlayerInputSource", "GameRun / SessionOutcome"],
            },
            {
              label: "Recording",
              detail: "Adapter → sampler → event bus → logger → JSONL sink",
              items: ["QAInputRecorder", "QATelemetrySampler", "ReplayRecorder (FixedUpdate)"],
            },
            {
              label: "Replay data",
              detail: "Self-contained session folder",
              items: ["session.json", "events.jsonl", "replay.json (schema v2)"],
            },
            {
              label: "Deterministic playback",
              detail: "One recorded frame per physics step",
              items: ["ReplayPlayer", "ReplayInputSource", "ReplayCatalog"],
            },
            {
              label: "Validation",
              detail: "Replay-under-recording, trajectory + outcome comparison",
              items: ["ReplayValidator", "TrajectoryComparer", "validation.json"],
            },
            {
              label: "Features & analysis",
              detail: "Per-session features → dataset → statistics",
              items: ["FeatureExtractor", "FeatureDatasetBuilder", "AnalysisEngine"],
            },
            {
              label: "Quality oracles",
              detail: "Pure rules over stored evidence",
              items: ["Completion", "Hazard", "ReplayConsistency", "SoftLock", "MissingTrigger"],
            },
            {
              label: "Evaluation & report",
              detail: "Planted-bug campaign scoring, HTML report",
              items: ["EvaluationEngine", "HtmlReportGenerator", "unityqa-report.html"],
            },
          ],
          caption:
            "Every stage reads and writes versioned files under QAData/; oracles never touch disk directly.",
        },
        notes: [
          "Assemblies: UnityQA (core), UnityQA.Adapters (the one sanctioned bridge to the game), BenchGame, BenchGame.Editor, plus EditMode and PlayMode test assemblies.",
          "Core namespaces: Core, Logging, Recording, Replay, Features, Analysis, Oracles, Evaluation, Reporting.",
          "Levels are generated from editor code (LevelBaselineBuilder, BenchmarkLevelBuilder, PlantedBugLevelBuilder), so level geometry is version-controlled as readable C# rather than scene YAML.",
          "Data formats are frozen and versioned (EVENT-SCHEMA.md): later versions may add fields; existing fields are never renamed or removed.",
        ],
      },
      testing: [
        "Unity Test Framework suites: 21 EditMode test files and 8 PlayMode test files covering recording, replay load/playback, trajectory validation, feature extraction, dataset statistics, analysis, oracle behaviour, evaluation scoring, and reporting.",
        "Ground truth is separated from detection. The planted-bug level (Level_PlantedBugs_A) contains four documented defects — a render-only collider gap, a sealed soft-lock basin, a hazard on the golden path, and a disabled exit trigger — each marked with editor-only markers and reachable by ordinary play.",
        "Detection is scored by an authored evaluation campaign that maps each planted case to its expected detector and includes clean control runs, so false positives are measured rather than assumed.",
        "The repository's recorded campaign (3 runs per planted case, 5 clean control runs, 40-session corpus) reports 12 / 12 evaluable bug runs detected and 0 / 5 false positives. Those numbers come from evaluation.json in the repository.",
        "Replay fidelity is verified on real runs: a render-domain replay initially diverged at the first jump; moving recording and playback into the FixedUpdate domain made determinism structural rather than tolerance-tuned.",
      ],
      stack: [
        { category: "Engine", items: ["Unity 6.3 LTS (6000.3)", "Built-in render pipeline", "2D Tilemap"] },
        { category: "Language", items: ["C#"] },
        { category: "Testing", items: ["Unity Test Framework (EditMode + PlayMode)"] },
        { category: "Data", items: ["JSON (JsonUtility)", "JSONL event streams", "CSV datasets", "Self-contained HTML reports"] },
        { category: "Tooling", items: ["Git + Git LFS", "Editor-generated levels"] },
      ],
    },
  },

  // ---------------------------------------------------------------------
  // 02
  // ---------------------------------------------------------------------
  {
    slug: "serverless-ai-cloud-optimizer",
    title: "Serverless AI Cloud Optimizer",
    tagline:
      "An event-driven, serverless-style optimizer that scores cloud metrics for overload risk and returns a scaling recommendation, with a separately trained scikit-learn risk model.",
    technologies: ["Python", "scikit-learn", "Serverless"],
    type: "open-source",
    status: "prototype",
    year: "2026",
    github: "https://github.com/tharun-1365/serverless-ai-cloud-optimizer",
    ctaLabel: "View Case Study",
    caseStudy: {
      overview: [
        "A Python prototype of a serverless cloud-optimization function. A handler written in the AWS Lambda style receives a metrics event (CPU, memory, latency, request rate), computes a risk score, classifies it, and returns a recommended action — then exits, so nothing runs while idle.",
        "Alongside the handler, a training script builds a lightweight risk classifier with scikit-learn from a small set of simulated metrics. The repository is a proof of concept; the metrics are sample data and the handler is exercised locally.",
      ],
      problem: [
        "Threshold-based cloud optimization usually runs on always-on servers, which costs money while idle and reacts only after a limit is crossed.",
        "The project explores the shape of an alternative: a function that is invoked by a metrics event, evaluates risk, suggests an action, and terminates.",
      ],
      approach: [
        "Keep the function pure and small: normalize each metric, combine them with fixed weights into a 0–1 risk score, bucket it into LOW / MEDIUM / HIGH / CRITICAL, and map each bucket to an action such as Monitor or Scale Up.",
        "Train the learned model separately: labels are derived from simple rules on the sample metrics (high CPU, memory or latency), features are min-max scaled, and a logistic-regression classifier plus its scaler are saved with joblib.",
      ],
      features: [
        "Event-style handler (lambda_handler) that accepts a metrics payload with sensible defaults and returns a JSON response with status code.",
        "Weighted risk score over CPU usage, memory usage, latency, and request rate, with a derived health score.",
        "Risk categories mapped to optimization recommendations (scale up, monitor, healthy).",
        "Structured logging and error handling around the handler.",
        "Training script (train_model.py) producing risk_model.pkl and scaler.pkl from sample_metrics.csv.",
        "Local test entry point that runs the handler against a sample event.",
      ],
      architecture: {
        diagram: {
          direction: "auto",
          nodes: [
            { label: "Metrics event", detail: "cpu_usage · memory_usage · latency · request_rate" },
            { label: "Handler", detail: "lambda_handler(event, context)", items: ["normalize", "weighted risk score"] },
            { label: "Risk category", detail: "LOW · MEDIUM · HIGH · CRITICAL" },
            { label: "Recommendation", detail: "action + health score", items: ["JSON response", "function exits"] },
          ],
          caption:
            "The trained logistic-regression model is produced by a separate script; the handler currently uses the weighted formula.",
        },
        notes: [
          "Repository layout: Severless/ (handler), AI_Model/ (training script), Data/ (sample metrics CSV).",
          "The handler is written in the AWS Lambda signature and simulated locally; no cloud deployment is included in the repository.",
          "Training data is a small simulated dataset, so the model is a demonstration of the pipeline rather than a production classifier.",
        ],
      },
      stack: [
        { category: "Language", items: ["Python"] },
        { category: "Machine learning", items: ["scikit-learn (LogisticRegression, MinMaxScaler)", "joblib"] },
        { category: "Data", items: ["pandas", "NumPy", "CSV sample metrics"] },
        { category: "Architecture", items: ["Serverless-style event handler (AWS Lambda signature)"] },
      ],
    },
  },

  // ---------------------------------------------------------------------
  // 03
  // ---------------------------------------------------------------------
  {
    slug: "behavioral-biometrics-password-security",
    title: "Behavioral Biometrics Password Security System",
    tagline:
      "A Flask web app that classifies password strength with a Random Forest model over extracted lexical features, backed by rule-based pattern checks and actionable feedback.",
    technologies: ["Python", "Flask", "scikit-learn", "Security"],
    type: "open-source",
    status: "completed",
    year: "2026",
    github: "https://github.com/tharun-1365/Behavorial-Biometrics-Password-Security-System",
    ctaLabel: "View Case Study",
    caseStudy: {
      overview: [
        "A password analysis tool built as an academic mini-project. As the user types, the frontend sends the password to a Flask API, which extracts features, runs a trained Random Forest classifier, and returns a Weak / Medium / Strong label with the reasons behind it.",
        "The repository implements password pattern and weakness detection. Passwords are analysed in memory and never stored or logged.",
      ],
      problem: [
        "Most strength meters are a handful of hard-coded rules. The project pairs those rules with a learned classifier and explains its output, so a user sees both a label and what to change.",
        "Real password corpora cannot be used ethically for training, so the dataset has to be generated.",
      ],
      approach: [
        "Extract nine features per password: length, counts of upper / lower / digit / special characters, repeated-character runs, sequential or keyboard patterns, membership in a common-password list, and an entropy estimate from the character pool size.",
        "Generate a balanced synthetic dataset of 3,000 passwords (1,000 per class) with a procedural script, train a RandomForestClassifier (100 trees, max depth 10) with a train/test split, and ship the pickled model with the app.",
        "Keep rules in the loop: if the model is missing the API falls back to rule-based scoring, and short or common passwords are always reported as Weak regardless of the model's confidence.",
      ],
      features: [
        "POST /api/analyze endpoint returning strength label, model confidence, class probabilities, extracted features, and feedback.",
        "Rule-based checks for length, character classes, repeated characters, sequential characters and keyboard sequences, and common passwords.",
        "Entropy estimate reported in bits.",
        "Human-readable feedback list explaining each detected weakness.",
        "Vanilla JavaScript frontend with debounced input, visibility toggle, and a results panel that updates as you type.",
        "Reproducible pipeline: generate_dataset.py → train_model.py → rf_model.pkl.",
      ],
      architecture: {
        diagram: {
          direction: "auto",
          nodes: [
            { label: "Browser", detail: "Vanilla JS, 300 ms debounce", items: ["POST /api/analyze"] },
            { label: "Flask API", detail: "app.py", items: ["load rf_model.pkl"] },
            { label: "Feature extraction", detail: "feature_extractor.py", items: ["9 lexical features", "rule feedback"] },
            { label: "Classifier", detail: "RandomForestClassifier", items: ["Weak / Medium / Strong", "rule overrides"] },
            { label: "Response", detail: "label · score · features · feedback" },
          ],
          caption:
            "Training is offline: generate_dataset.py produces passwords_dataset.csv, train_model.py fits and pickles the model.",
        },
        notes: [
          "Repository layout: app.py (Flask routes), core/ (feature extraction, training, model), data/ (dataset generator + CSV), templates/ and static/ (frontend).",
          "The label set and the feature vector are shared between the generator, the trainer, and the API, so training and inference cannot drift.",
          "Keystroke-timing or typing-pattern analysis is not part of the current implementation; the system analyses the password text itself.",
        ],
      },
      stack: [
        { category: "Backend", items: ["Python", "Flask 3"] },
        { category: "Machine learning", items: ["scikit-learn (RandomForestClassifier)", "pandas", "NumPy"] },
        { category: "Frontend", items: ["HTML", "CSS", "Vanilla JavaScript"] },
        { category: "Data", items: ["Synthetic 3,000-sample dataset", "Pickled model (rf_model.pkl)"] },
      ],
    },
  },

  // ---------------------------------------------------------------------
  // 04
  // ---------------------------------------------------------------------
  {
    slug: "attendify-dashboard",
    title: "Attendify Dashboard",
    tagline:
      "A Next.js and Supabase admin dashboard for school attendance: admin sign-up creates a school, students are registered per school, and daily attendance is marked and listed from the database.",
    technologies: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS"],
    type: "academic",
    status: "active",
    year: "2026",
    github: "https://github.com/tharun-1365/Attendify-AI-Face-Detection-Attendance-Software",
    ctaLabel: "View Project",
    caseStudy: {
      overview: [
        "Attendify is an early-stage attendance management dashboard built with the Next.js App Router and Supabase. An admin signs up, which creates a school record and links the admin to it; from the dashboard they add students and mark each one present or absent for the day.",
        "The repository is the dashboard and data layer of the project. Face-detection based attendance, which the repository name refers to, is not yet part of the code: attendance is currently marked manually from the dashboard.",
      ],
      problem: [
        "Attendance tracking in small institutions is often a paper register or a spreadsheet with no per-school scoping, no login, and no reliable one-record-per-student-per-day rule.",
      ],
      approach: [
        "Use Supabase for both authentication and storage so the app needs no custom backend: email/password auth, and four tables — schools, users, students, attendance — queried directly from the client with the Supabase JavaScript SDK (Software Development Kit).",
        "Scope every write by school_id, and enforce one attendance row per student per day with an upsert keyed on (student_id, date).",
      ],
      features: [
        "Admin sign-up flow: creates the auth user, inserts a schools row, and inserts a users row with role \"admin\" linked to that school.",
        "Email/password login; the dashboard redirects to /login when there is no active session.",
        "Add students scoped to the signed-in admin's school.",
        "Mark attendance as present or absent for today with an upsert on (student_id, date); the current status is reflected on each student's buttons.",
        "Today's attendance records listed with the student name via a joined query.",
        "Sidebar and top bar layout with routes for Dashboard, Students, Teachers, Attendance and Analytics; the last four are placeholder pages at this stage.",
      ],
      architecture: {
        diagram: {
          direction: "auto",
          nodes: [
            { label: "Next.js App Router", detail: "Client components with React state", items: ["/signup", "/login", "/ (dashboard)"] },
            { label: "Supabase Auth", detail: "Email / password sessions", items: ["signUp", "signInWithPassword", "getSession"] },
            { label: "Supabase tables", detail: "Postgres via supabase-js", items: ["schools", "users", "students", "attendance"] },
            { label: "Attendance rule", detail: "One row per student per day", items: ["upsert on (student_id, date)"] },
          ],
          caption: "All data access happens from the browser through the Supabase client; there is no custom API layer.",
        },
        notes: [
          "Repository layout: app/ (routes), components/ (Sidebar, Topbar, DashboardCard), lib/supabase.ts (client created from NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY).",
          "Stack versions from package.json: Next.js 16, React 19, @supabase/supabase-js 2, Tailwind CSS 4, TypeScript 5.",
          "Status: initial commit; the Students, Teachers, Attendance and Analytics pages are stubs, and the face-detection component has not been added to the repository yet.",
        ],
      },
      stack: [
        { category: "Frontend", items: ["Next.js 16 (App Router)", "React 19", "TypeScript"] },
        { category: "Backend / data", items: ["Supabase Auth", "Supabase Postgres (supabase-js)"] },
        { category: "Styling", items: ["Tailwind CSS 4"] },
      ],
    },
  },

  // ---------------------------------------------------------------------
  // 05 — Internship project (no public source)
  // ---------------------------------------------------------------------
  {
    slug: "report-optimizer",
    title: "Report Optimizer",
    tagline:
      "An internal tool built during a technical support internship to organise, structure, and reformat reports so the useful data is easier to read and act on.",
    technologies: ["Automation", "Data Processing", "Report Formatting"],
    type: "internship",
    status: "completed",
    organization: "Intellect Design Arena",
    sourceNote:
      "Built as an internal mini project at Intellect Design Arena. The source is not public and is no longer in my possession; this page describes the confirmed scope only.",
    ctaLabel: "View Overview",
    caseStudy: {
      overview: [
        "Report Optimizer was a mini project developed during a one-month Technical Support internship at Intellect Design Arena, Navalur. Its purpose was to analyse reports and extract the useful data so that decisions could be made faster.",
      ],
      problem: [
        "Reports arrived in inconsistent layouts, and pulling out the relevant information meant repetitive manual reorganisation and formatting.",
      ],
      approach: [
        "Automate the repetitive part: process the report data, structure it consistently, and generate cleaner, more readable output.",
        "Keep the output focused on what supports decision-making rather than reproducing the whole report.",
      ],
      features: [
        "Automated report optimization tool.",
        "Report organisation and formatting.",
        "Data processing and structuring techniques.",
        "Cleaner and more readable generated outputs.",
        "Streamlined report generation with fewer repetitive manual tasks.",
      ],
      architecture: {
        diagram: {
          direction: "auto",
          nodes: [
            { label: "Input reports", detail: "Existing report files" },
            { label: "Processing", detail: "Data extraction and structuring" },
            { label: "Organisation", detail: "Consistent layout and formatting" },
            { label: "Output", detail: "Cleaner, readable report" },
          ],
          caption: "Conceptual workflow based on the confirmed project scope; implementation details are not public.",
        },
        notes: [
          "Developed alongside the internship's other work: troubleshooting Java-based issues, automation testing with XPath, demos, and technical documentation.",
        ],
      },
      stack: [
        { category: "Context", items: ["Intellect Design Arena, Navalur", "Technical Support Intern", "1 month"] },
        { category: "Focus", items: ["Report processing", "Data structuring", "Output formatting", "Task automation"] },
      ],
    },
  },
];

/**
 * Projects that are ready to show, numbered by position so the list never
 * skips a number when a draft is hidden. Drafts are excluded everywhere.
 */
export const publishedProjects: Project[] = projects
  .filter((p) => p.status !== "draft")
  .map((p, index) => ({ ...p, number: String(index + 1).padStart(2, "0") }));

export function getProject(slug: string): Project | undefined {
  return publishedProjects.find((p) => p.slug === slug);
}

export function getAdjacentProjects(slug: string): {
  previous?: Project;
  next?: Project;
} {
  const index = publishedProjects.findIndex((p) => p.slug === slug);
  if (index === -1) return {};
  return {
    previous: publishedProjects[index - 1],
    next: publishedProjects[index + 1],
  };
}
