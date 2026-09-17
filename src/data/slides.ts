export type SlideType =
  | 'cover'
  | 'flow'
  | 'roles'
  | 'what-is-code'
  // ── Git slide types ──────────────────────────────────
  | 'git-before'
  | 'git-what-is'
  | 'git-vs-github'
  | 'git-repository'
  | 'git-config'
  | 'git-auth'
  | 'git-areas'
  | 'git-commit-slide'
  | 'git-simulator'
  | 'git-log'
  | 'git-diff'
  | 'git-branches'
  | 'git-remotes'
  | 'git-push-pull'
  | 'git-branch-workflow'
  | 'git-pull-request'
  | 'git-merge-rebase-details'
  | 'git-stash-pop'
  | 'git-reset-details'
  | 'git-reflog-slide'
  | 'git-conflict'
  | 'git-history-revert'
  | 'git-ignore'
  | 'git-actions'
  | 'git-mistakes'
  | 'git-troubleshoot'
  | 'git-journey'
  | 'git-github-ui'
  | 'git-to-cicd'
  | 'git-vocabulary'
  | 'git-summary'
  // ── Existing non-Git types ───────────────────────────────
  | 'git-timeline'
  | 'local-to-github'
  | 'where-app-lives'
  | 'cloud'
  | 'environments'
  | 'cicd'
  | 'pipeline'
  | 'it-works-my-machine'
  | 'docker'
  | 'browser-to-server'
  | 'login-flow'
  | 'when-something-breaks'
  | 'http-errors'
  | 'where-do-i-look'
  | 'failure-scenario'
  | 'deployment-walkthrough'
  | 'whole-system'
  | 'final-rules';

export type SlideLabel = 'CORE' | 'OPTIONAL' | 'DEEP DIVE';

export interface SlideData {
  id: number;
  slug: string;
  section: string;
  sectionNumber: number;
  title: string;
  subtitle?: string;
  duration: number; // minutes
  optional: boolean;
  label: SlideLabel;
  skipIfShortOnTime: boolean;
  takeaway: string;
  notes: string[];
  type: SlideType;
}

const rawSlides: SlideData[] = [
  // ── Section 1: The Big Picture ───────────────────────────────────────────
  {
    id: 1,
    slug: 'big-question',
    section: 'The Big Picture',
    sectionNumber: 1,
    title: 'What happens after someone says: "Build this"?',
    duration: 3,
    optional: false,
    label: 'CORE',
    skipIfShortOnTime: false,
    takeaway: 'Software does not jump directly from an idea to a customer.',
    notes: [
      'Ask the audience what they think happens after a business request.',
      'Most people assume: someone writes code → it appears on the website.',
      'Reality: there are many controlled steps between idea and customer.',
      'Emphasise that every company follows some version of this journey.',
      'This is the mental model we will build today.',
    ],
    type: 'flow',
  },

  // ── Section 2: Git & Source Control ──────────────────────────────────────
  {
    id: 2,
    slug: 'what-is-code',
    section: 'Git & Source Control',
    sectionNumber: 2,
    title: 'What Is Code?',
    duration: 2,
    optional: false,
    label: 'CORE',
    skipIfShortOnTime: false,
    takeaway: 'Code is the product\'s instruction set. Git helps us manage changes to those instructions.',
    notes: [
      'Don\'t teach programming syntax here.',
      'Think of code as instructions: "When button is clicked → do this."',
      'A product has many layers: button, form, login, payment, dashboard, API, database.',
      'All of these are different pieces of code working together.',
      'The frontend is what you see. The backend is the logic. The database stores the data.',
    ],
    type: 'what-is-code',
  },
  {
    id: 3,
    slug: 'before-git',
    section: 'Git & Source Control',
    sectionNumber: 2,
    title: 'Before Git: The Problem',
    subtitle: 'How teams managed code before version control',
    duration: 2,
    optional: false,
    label: 'CORE',
    skipIfShortOnTime: false,
    takeaway: 'Git exists because managing changing code manually becomes unreliable very quickly.',
    notes: [
      'Ask if anyone in the audience has used "final_v2_really_final.docx" naming.',
      'Most teams recognize this pattern from documents, spreadsheets, or email chains.',
      'Translate the same chaos to software: 5 developers each with their own copy.',
      'Who has the latest version? What changed? Can we go back to last Tuesday?',
      'The punchline: naming files "FINAL" is not a version-control strategy.',
    ],
    type: 'git-before',
  },
  {
    id: 4,
    slug: 'what-is-git',
    section: 'Git & Source Control',
    sectionNumber: 2,
    title: 'What Is Git?',
    subtitle: 'A version control system',
    duration: 3,
    optional: false,
    label: 'CORE',
    skipIfShortOnTime: false,
    takeaway: 'Git tracks changes to files over time so teams can collaborate, compare, and recover.',
    notes: [
      'Git was created by Linus Torvalds in 2005.',
      'The analogy that works best: "track changes" in Word, but for the entire project.',
      'Critical point: Git runs on your computer. It does NOT require internet.',
      'Git can work completely offline. This surprises most non-developers.',
    ],
    type: 'git-what-is',
  },
  {
    id: 5,
    slug: 'git-vs-github',
    section: 'Git & Source Control',
    sectionNumber: 2,
    title: 'Git vs GitHub',
    subtitle: 'Two different things, often confused',
    duration: 2,
    optional: false,
    label: 'CORE',
    skipIfShortOnTime: false,
    takeaway: 'Git manages history locally. GitHub gives teams a shared, online place to collaborate around that history.',
    notes: [
      'This is one of the most common confusions, even among developers.',
      'Analogy: Git is like Microsoft Word. GitHub is like Google Drive.',
      'Git is the tool. GitHub is a hosting service that uses Git.',
      'You can use Git without GitHub. You cannot use GitHub without Git.',
    ],
    type: 'git-vs-github',
  },
  {
    id: 6,
    slug: 'git-repository',
    section: 'Git & Source Control',
    sectionNumber: 2,
    title: 'What Is a Repository?',
    subtitle: 'The project + its entire history',
    duration: 2,
    optional: false,
    label: 'CORE',
    skipIfShortOnTime: false,
    takeaway: 'A repository is the project plus every change ever made to it.',
    notes: [
      'A repository (repo) is the folder that Git is tracking.',
      'It contains the code, configuration, documentation AND the hidden .git folder.',
      'The .git folder is Git\'s database — do not manually edit it.',
    ],
    type: 'git-repository',
  },
  {
    id: 7,
    slug: 'git-config',
    section: 'Git & Source Control',
    sectionNumber: 2,
    title: 'Git Config: Identity & Workspace Settings',
    subtitle: 'Setting up author identity and workspace defaults',
    duration: 3,
    optional: false,
    label: 'CORE',
    skipIfShortOnTime: false,
    takeaway: 'Git attaches your user name and email to every single commit for team auditability.',
    notes: [
      'Explain global (~/.gitconfig) vs local (.git/config) configuration.',
      'Show how git config --global user.name and user.email assign identity.',
      'Explain init.defaultBranch main and core.editor.',
      'Show git config --list to view active configuration settings.',
    ],
    type: 'git-config',
  },
  {
    id: 8,
    slug: 'git-auth',
    section: 'Git & Source Control',
    sectionNumber: 2,
    title: 'Git Authentication: HTTPS vs SSH vs Tokens',
    subtitle: 'Understanding protocols and credential security',
    duration: 3,
    optional: false,
    label: 'CORE',
    skipIfShortOnTime: false,
    takeaway: 'HTTPS is easy to start, SSH is seamless for developers, and Tokens secure automated access.',
    notes: [
      'HTTPS cloning uses standard web ports (443) and Personal Access Tokens or Credential Managers.',
      'SSH cloning uses key pairs (~/.ssh/id_ed25519) for secure, passwordless daily pushes/pulls.',
      'Personal Access Tokens (PAT) replace account passwords for secure scoped access and CI/CD pipelines.',
    ],
    type: 'git-auth',
  },
  {
    id: 8,
    slug: 'git-areas',
    section: 'Git & Source Control',
    sectionNumber: 2,
    title: 'The Three Git Areas',
    subtitle: 'Where is my code right now?',
    duration: 4,
    optional: false,
    label: 'CORE',
    skipIfShortOnTime: false,
    takeaway: 'A file being changed, staged, committed, and pushed are distinct states.',
    notes: [
      'This is a core conceptual slide in the Git section.',
      'Working Directory (modified files) → Staging Index (git add) → Local Repository (git commit).',
      'Staging lets you choose WHICH changes go into a commit.',
    ],
    type: 'git-areas',
  },
  {
    id: 9,
    slug: 'git-commit-simulator',
    section: 'Git & Source Control',
    sectionNumber: 2,
    title: 'Interactive: Watch a Change Become a Commit',
    subtitle: 'Edit → Status → Add → Commit → Pull → Push',
    duration: 4,
    optional: false,
    label: 'CORE',
    skipIfShortOnTime: false,
    takeaway: 'Changing a file, staging it, committing it, pulling latest, and pushing to main are separate steps.',
    notes: [
      'Walk through each step slowly — do not rush this.',
      'Step 1: Click "Edit app.js" — modified in working directory.',
      'Step 2: Click "git status".',
      'Step 3: Click "git add" — moves to staging area.',
      'Step 4: Click "git commit" — permanent checkpoint locally.',
      'Step 5: Click "git pull" — sync latest changes from main branch before pushing.',
      'Step 6: Click "git push" — travels to GitHub.',
    ],
    type: 'git-simulator',
  },
  {
    id: 10,
    slug: 'git-commit',
    section: 'Git & Source Control',
    sectionNumber: 2,
    title: 'What Is a Commit?',
    subtitle: 'A checkpoint in the project\'s history',
    duration: 3,
    optional: false,
    label: 'CORE',
    skipIfShortOnTime: false,
    takeaway: 'A good commit records one meaningful change with a message that explains why.',
    notes: [
      'Analogy: a commit is like saving a game — you can return to this exact state.',
      'A commit has: unique hash (ID), message, author, timestamp, and diff content.',
      'Good commit messages answer WHY, not just WHAT.',
    ],
    type: 'git-commit-slide',
  },
  {
    id: 11,
    slug: 'git-log',
    section: 'Git & Source Control',
    sectionNumber: 2,
    title: 'Git Log: Inspecting History & Commits',
    subtitle: 'Viewing commit timelines and filtering history',
    duration: 3,
    optional: false,
    label: 'CORE',
    skipIfShortOnTime: false,
    takeaway: 'Git log allows you to navigate history, filter by author, and view commit hashes.',
    notes: [
      'Demonstrate git log, git log --oneline, and git log --graph.',
      'Show how git log --author="Alex" filters commits by author.',
      'Explain commit hashes (SHA-1 checksums) and how they identify states.',
    ],
    type: 'git-log',
  },
  {
    id: 12,
    slug: 'git-diff',
    section: 'Git & Source Control',
    sectionNumber: 2,
    title: 'Git Diff: See Exactly What Changed',
    subtitle: 'Inspecting line-by-line differences before committing or merging',
    duration: 3,
    optional: false,
    label: 'CORE',
    skipIfShortOnTime: false,
    takeaway: 'Always inspect what changed before committing — git diff is your X-ray tool.',
    notes: [
      'git diff shows unstaged changes in the working directory.',
      'git diff --staged shows staged changes ready to commit.',
      'git diff main..feature compares differences between two branches.',
      'Reading diffs: + green for added lines, - red for removed lines.',
    ],
    type: 'git-diff',
  },
  {
    id: 13,
    slug: 'git-branches',
    section: 'Git & Source Control',
    sectionNumber: 2,
    title: 'Why Do We Need Branches?',
    subtitle: 'Parallel lines of development',
    duration: 3,
    optional: false,
    label: 'CORE',
    skipIfShortOnTime: false,
    takeaway: 'Branches let developers work independently without breaking the stable codebase.',
    notes: [
      'Without branches: everyone pushes directly to main — constant broken code.',
      'With branches: each feature or fix lives in its own isolated branch.',
      'A branch is a lightweight pointer to a commit in Git history.',
    ],
    type: 'git-branches',
  },
  {
    id: 14,
    slug: 'git-remotes',
    section: 'Git & Source Control',
    sectionNumber: 2,
    title: 'Origin, Remotes & Environments',
    subtitle: 'Connecting local repositories with multiple remote servers and environments',
    duration: 4,
    optional: false,
    label: 'CORE',
    skipIfShortOnTime: false,
    takeaway: 'Remotes define target servers (origin, upstream, production) where repositories sync.',
    notes: [
      'Explain what origin means (the default name Git gives to the remote server you cloned from).',
      'Explain multiple remotes: origin (GitHub), upstream (fork parent), production (live app server).',
      'Show git remote -v, git remote add origin <url>, and git remote show origin.',
    ],
    type: 'git-remotes',
  },
  {
    id: 15,
    slug: 'git-push-pull',
    section: 'Git & Source Control',
    sectionNumber: 2,
    title: 'Push, Pull & Syncing Remotes',
    subtitle: 'Transferring commits between local and remote repositories',
    duration: 3,
    optional: false,
    label: 'CORE',
    skipIfShortOnTime: false,
    takeaway: 'Push sends local commits out to remotes. Pull brings remote commits in.',
    notes: [
      'PUSH: git push -u origin main sends local commits to GitHub.',
      'PULL: git pull origin main (fetch + merge combined).',
      'FETCH: git fetch downloads remote metadata without modifying working directory.',
      'Explain upstream tracking (-u flag) and safe pushing habits.',
    ],
    type: 'git-push-pull',
  },
  {
    id: 16,
    slug: 'git-branch-workflow',
    section: 'Git & Source Control',
    sectionNumber: 2,
    title: 'Branch → PR → Merge Workflow',
    subtitle: 'The standard collaboration flow',
    duration: 3,
    optional: false,
    label: 'CORE',
    skipIfShortOnTime: false,
    takeaway: 'Every feature travels through: branch → commits → pull latest → push → PR → review → merge.',
    notes: [
      'Click each step so the audience can follow the flow.',
      'Always pull latest main before pushing to avoid conflicts.',
      'Code never goes directly to main without review.',
      'The branch protects main from half-finished work.',
    ],
    type: 'git-branch-workflow',
  },
  {
    id: 17,
    slug: 'git-stash-pop',
    section: 'Git & Source Control',
    sectionNumber: 2,
    title: 'Git Stash & Pop: Shelving Uncommitted Work',
    subtitle: 'Temporarily saving uncommitted working changes',
    duration: 3,
    optional: false,
    label: 'CORE',
    skipIfShortOnTime: false,
    takeaway: 'Stash lets you clean your working directory without losing uncommitted progress.',
    notes: [
      'Use case: Urgent production hotfix arrives while working on unfinished feature.',
      'git stash: saves working directory + index state to hidden shelf.',
      'git stash pop: restores stashed changes and removes from shelf.',
      'git stash list, git stash apply, git stash drop.',
    ],
    type: 'git-stash-pop',
  },
  {
    id: 18,
    slug: 'git-merge-rebase',
    section: 'Git & Source Control',
    sectionNumber: 2,
    title: 'Merge vs Rebase In Detail',
    subtitle: 'Comparing 3-way merge commits vs linear rebase history',
    duration: 4,
    optional: false,
    label: 'CORE',
    skipIfShortOnTime: false,
    takeaway: 'Merge creates a merge commit preserving true history. Rebase replays commits linearly.',
    notes: [
      'Merge: Non-destructive, creates 3-way merge commit with 2 parents. Ideal for shared main branch.',
      'Rebase: Rewrites history by replaying feature commits on top of target branch.',
      'Golden Rule: Never rebase a public shared branch!',
      'Step-by-step interactive visual graph demonstration.',
    ],
    type: 'git-merge-rebase-details',
  },

  {
    id: 21,
    slug: 'git-reset-details',
    section: 'Git & Source Control',
    sectionNumber: 2,
    title: 'Undoing Changes: Soft vs Hard Reset',
    subtitle: 'Moving HEAD pointer back and managing working/staged files',
    duration: 4,
    optional: false,
    label: 'CORE',
    skipIfShortOnTime: false,
    takeaway: 'Soft reset keeps staged changes intact, Hard reset discards everything.',
    notes: [
      'git reset --soft HEAD~1: Moves HEAD, leaves changes staged.',
      'git reset --hard HEAD~1: Moves HEAD AND wipes working directory & staging!',
      'CAUTION: Hard reset destroys uncommitted working code.',
    ],
    type: 'git-reset-details',
  },
  {
    id: 22,
    slug: 'git-reflog-slide',
    section: 'Git & Source Control',
    sectionNumber: 2,
    title: 'Git Reflog & Recovery: Safe Compare & Reclaiming Lost Commits',
    subtitle: 'Git\'s reference log — the ultimate local safety net',
    duration: 4,
    optional: false,
    label: 'CORE',
    skipIfShortOnTime: false,
    takeaway: 'Reflog records every movement of HEAD locally, allowing recovery of deleted commits.',
    notes: [
      'git reflog logs every commit, checkout, reset, and rebase operation.',
      'Comparing diffs with git diff HEAD@{1}.',
      'Recovering lost commits after an accidental hard reset using git reset --hard <reflog-hash>.',
    ],
    type: 'git-reflog-slide',
  },
  {
    id: 23,
    slug: 'git-merge-conflict',
    section: 'Git & Source Control',
    sectionNumber: 2,
    title: 'Merge Conflicts',
    subtitle: 'When Git needs a human decision',
    duration: 3,
    optional: false,
    label: 'CORE',
    skipIfShortOnTime: false,
    takeaway: 'A merge conflict is not a failure — it is Git asking which version should win.',
    notes: [
      'Conflicts happen when two people edit the same line of a file differently.',
      'Show conflict markers: <<<<<< HEAD / ====== / >>>>>> branch.',
      'Steps to resolve: edit file, choose correct version, save, stage, commit.',
    ],
    type: 'git-conflict',
  },
  {
    id: 24,
    slug: 'git-ignore',
    section: 'Git & Source Control',
    sectionNumber: 2,
    title: 'Git Ignore & Secrets Warning',
    subtitle: 'What should NOT go into Git',
    duration: 2,
    optional: false,
    label: 'CORE',
    skipIfShortOnTime: false,
    takeaway: 'Git remembers everything you commit — never commit secrets or credentials.',
    notes: [
      'The .gitignore file tells Git to skip specified files and folders.',
      'Common ignores: node_modules, .env, build/, logs/.',
      'Never commit API keys or passwords.',
    ],
    type: 'git-ignore',
  },
  {
    id: 26,
    slug: 'git-mistakes',
    section: 'Git & Source Control',
    sectionNumber: 2,
    title: 'Common Git Mistakes',
    subtitle: 'What to avoid — and better practices',
    duration: 3,
    optional: false,
    label: 'CORE',
    skipIfShortOnTime: false,
    takeaway: 'Most Git problems come from predictable mistakes that better habits prevent.',
    notes: [
      'Working directly on main.',
      'Committing secrets.',
      'Huge unrelated commits.',
      'Bad commit messages.',
    ],
    type: 'git-mistakes',
  },
  {
    id: 28,
    slug: 'git-to-cicd',
    section: 'Git & Source Control',
    sectionNumber: 2,
    title: 'Git → CI/CD',
    subtitle: 'How a commit triggers automation',
    duration: 2,
    optional: false,
    label: 'CORE',
    skipIfShortOnTime: false,
    takeaway: 'Git records and transports changes. CI/CD reacts to those changes and automates the rest.',
    notes: [
      'Bridge between Git section and CI/CD section.',
      'Push triggers CI/CD pipeline: build, test, deploy.',
    ],
    type: 'git-to-cicd',
  },
  {
    id: 32,
    slug: 'git-summary',
    section: 'Git & Source Control',
    sectionNumber: 2,
    title: 'Git: What You Need to Remember',
    subtitle: 'The complete mental model',
    duration: 2,
    optional: false,
    label: 'CORE',
    skipIfShortOnTime: false,
    takeaway: 'Git tracks history. GitHub gives the team a place to collaborate around history.',
    notes: [
      'Closing slide for Git section.',
      'Mental model tree: Track → Save → Branch → Share → Review → Combine → Recover.',
    ],
    type: 'git-summary',
  },

  // ── Section 3: Servers & Cloud ────────────────────────────────────────────
  {
    id: 33,
    slug: 'where-app-lives',
    section: 'Servers & Cloud',
    sectionNumber: 3,
    title: 'Your Laptop Is Not Production',
    duration: 3,
    optional: false,
    label: 'CORE',
    skipIfShortOnTime: false,
    takeaway: 'Production is a separate environment designed to serve real users.',
    notes: [
      'Developer machine vs Production server.',
      'Changes must travel laptop → server in a controlled way.',
    ],
    type: 'where-app-lives',
  },
  {
    id: 34,
    slug: 'cloud',
    section: 'Servers & Cloud',
    sectionNumber: 3,
    title: 'What Is AWS / A VPS?',
    duration: 3,
    optional: false,
    label: 'CORE',
    skipIfShortOnTime: false,
    takeaway: 'Cloud hosting gives us a computer on the internet where software runs.',
    notes: [
      'AWS, Azure, GCP rent data centre capacity.',
      'VPS = virtual slice of a server.',
    ],
    type: 'cloud',
  },
  {
    id: 35,
    slug: 'environments',
    section: 'Servers & Cloud',
    sectionNumber: 3,
    title: 'One Application, Multiple Environments',
    duration: 3,
    optional: false,
    label: 'CORE',
    skipIfShortOnTime: false,
    takeaway: 'Environments are safety barriers between a code change and the customer.',
    notes: [
      'LOCAL → TEST → STAGING → PRODUCTION.',
    ],
    type: 'environments',
  },

  // ── Section 4: CI/CD ──────────────────────────────────────────────────────
  {
    id: 36,
    slug: 'cicd',
    section: 'CI/CD',
    sectionNumber: 4,
    title: 'What Is CI/CD?',
    duration: 3,
    optional: false,
    label: 'CORE',
    skipIfShortOnTime: false,
    takeaway: 'CI/CD automates the path from code change to deployable software.',
    notes: [
      'CI = Continuous Integration. CD = Continuous Delivery/Deployment.',
    ],
    type: 'cicd',
  },
  {
    id: 37,
    slug: 'pipeline',
    section: 'CI/CD',
    sectionNumber: 4,
    title: 'The Pipeline',
    duration: 4,
    optional: false,
    label: 'CORE',
    skipIfShortOnTime: false,
    takeaway: 'A good pipeline stops bad code before it reaches production.',
    notes: [
      'Build → Test → Security → Deploy.',
    ],
    type: 'pipeline',
  },

  // ── Section 5: Docker & Runtime ───────────────────────────────────────────
  {
    id: 38,
    slug: 'it-works-my-machine',
    section: 'Docker & Runtime',
    sectionNumber: 5,
    title: 'Why Does "It Works on My Machine" Happen?',
    duration: 2,
    optional: false,
    label: 'CORE',
    skipIfShortOnTime: false,
    takeaway: 'Many deployment problems come from environment differences.',
    notes: [
      'Environment drift between local and server.',
    ],
    type: 'it-works-my-machine',
  },
  {
    id: 39,
    slug: 'docker',
    section: 'Docker & Runtime',
    sectionNumber: 5,
    title: 'Docker: Package the Application Environment',
    duration: 4,
    optional: false,
    label: 'CORE',
    skipIfShortOnTime: false,
    takeaway: 'Docker makes application runtime predictable and repeatable.',
    notes: [
      'Docker images and containers.',
    ],
    type: 'docker',
  },

  // ── Section 6: What Happens in the Browser ────────────────────────────────
  {
    id: 40,
    slug: 'browser-to-server',
    section: 'What Happens in the Browser',
    sectionNumber: 6,
    title: 'What Happens When I Type a Website Address?',
    duration: 3,
    optional: false,
    label: 'CORE',
    skipIfShortOnTime: false,
    takeaway: 'A website request travels through multiple layers before UI appears.',
    notes: [
      'Browser → DNS → Server IP → Reverse Proxy → Application.',
    ],
    type: 'browser-to-server',
  },
  {
    id: 41,
    slug: 'login-flow',
    section: 'What Happens in the Browser',
    sectionNumber: 6,
    title: 'What Happens When I Click Login?',
    duration: 3,
    optional: false,
    label: 'CORE',
    skipIfShortOnTime: false,
    takeaway: 'The UI is only one part of the application.',
    notes: [
      'Browser POST → Backend validation → Database check → Response token.',
    ],
    type: 'login-flow',
  },

  // ── Section 7: Debugging ──────────────────────────────────────────────────
  {
    id: 42,
    slug: 'when-something-breaks',
    section: 'Debugging',
    sectionNumber: 7,
    title: "Don't Randomly Change Code. Find the Broken Layer.",
    duration: 3,
    optional: false,
    label: 'CORE',
    skipIfShortOnTime: false,
    takeaway: 'Debug from the outside toward the inside.',
    notes: [
      'Identify failing layer first.',
    ],
    type: 'when-something-breaks',
  },
  {
    id: 43,
    slug: 'http-errors',
    section: 'Debugging',
    sectionNumber: 7,
    title: 'Understanding HTTP Errors',
    duration: 4,
    optional: false,
    label: 'CORE',
    skipIfShortOnTime: false,
    takeaway: 'HTTP status tells you the neighborhood. Logs tell you the house.',
    notes: [
      '4xx client errors vs 5xx server errors.',
    ],
    type: 'http-errors',
  },
  {
    id: 44,
    slug: 'where-do-i-look',
    section: 'Debugging',
    sectionNumber: 7,
    title: 'Where Do I Look?',
    duration: 4,
    optional: false,
    label: 'CORE',
    skipIfShortOnTime: false,
    takeaway: 'Always identify the layer before trying to fix the problem.',
    notes: [
      'Interactive debugging checklist.',
    ],
    type: 'where-do-i-look',
  },

  // ── Section 8: Real Failure Walkthrough ───────────────────────────────────
  {
    id: 45,
    slug: 'failure-scenario',
    section: 'Real Failure Walkthrough',
    sectionNumber: 8,
    title: 'Failure Scenario: Live Incident',
    duration: 4,
    optional: false,
    label: 'CORE',
    skipIfShortOnTime: false,
    takeaway: 'Follow evidence, not guesses.',
    notes: [
      'Live incident simulation.',
    ],
    type: 'failure-scenario',
  },
  {
    id: 46,
    slug: 'deployment-walkthrough',
    section: 'Deployment Walkthrough',
    sectionNumber: 8,
    title: 'From Developer to Production',
    duration: 3,
    optional: false,
    label: 'CORE',
    skipIfShortOnTime: false,
    takeaway: 'Deployment is a chain of controlled steps, not one magic button.',
    notes: [
      'Full deployment flow animation.',
    ],
    type: 'deployment-walkthrough',
  },

  // ── Section 9: Final Mental Model ─────────────────────────────────────────
  {
    id: 47,
    slug: 'whole-system',
    section: 'Final Mental Model',
    sectionNumber: 9,
    title: 'The Whole System',
    duration: 2,
    optional: false,
    label: 'CORE',
    skipIfShortOnTime: false,
    takeaway: 'Understand the flow. Locate the failing layer. Then fix the problem.',
    notes: [
      'Complete end-to-end system architecture.',
    ],
    type: 'whole-system',
  },
  {
    id: 48,
    slug: 'final-rules',
    section: 'Final Mental Model',
    sectionNumber: 9,
    title: '10 Rules to Remember',
    duration: 2,
    optional: false,
    label: 'CORE',
    skipIfShortOnTime: false,
    takeaway: 'From idea → code → customer → feedback → next version.',
    notes: [
      'Key takeaways summary.',
    ],
    type: 'final-rules',
  },
];

export const slides: SlideData[] = rawSlides.map((s, idx) => ({ ...s, id: idx + 1 }));

export const sections = [
  { number: 0, name: 'Introduction' },
  { number: 1, name: 'The Big Picture' },
  { number: 2, name: 'Git & Source Control' },
  { number: 3, name: 'Servers & Cloud' },
  { number: 4, name: 'CI/CD' },
  { number: 5, name: 'Docker & Runtime' },
  { number: 6, name: 'What Happens in the Browser' },
  { number: 7, name: 'Debugging' },
  { number: 8, name: 'Real Failure Walkthrough' },
  { number: 9, name: 'Final Mental Model' },
];

export function getSlidesForMode(mode?: number): SlideData[] {
  return slides;
}
