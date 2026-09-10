import React from 'react';
import { SlideData } from '../../data/slides';
import CoverSlide from './CoverSlide';
import BigQuestionSlide from './BigQuestionSlide';
import RolesSlide from './RolesSlide';
import WhatIsCodeSlide from './WhatIsCodeSlide';
// ── Git slides ────────────────────────────────────────────────────────────
import GitBeforeSlide from './GitBeforeSlide';
import GitWhatIsSlide from './GitWhatIsSlide';
import GitVsGitHubSlide from './GitVsGitHubSlide';
import GitRepositorySlide from './GitRepositorySlide';
import GitAreasSlide from './GitAreasSlide';
import GitCommitSlide from './GitCommitSlide';
import GitSimulatorSlide from './GitSimulatorSlide';
import GitBranchesSlide from './GitBranchesSlide';
import GitBranchWorkflowSlide from './GitBranchWorkflowSlide';
import GitPullRequestSlide from './GitPullRequestSlide';
import GitPushPullSlide from './GitPushPullSlide';
import GitConflictSlide from './GitConflictSlide';
import GitHistoryRevertSlide from './GitHistoryRevertSlide';
import GitIgnoreSlide from './GitIgnoreSlide';
import GitActionsSlide from './GitActionsSlide';
import GitDiffSlide from './GitDiffSlide';
import GitMistakesSlide from './GitMistakesSlide';
import GitTroubleshootSlide from './GitTroubleshootSlide';
import GitJourneySlide from './GitJourneySlide';
import GitHubUISlide from './GitHubUISlide';
import GitToCICDSlide from './GitToCICDSlide';
import GitVocabularySlide from './GitVocabularySlide';
import GitSummarySlide from './GitSummarySlide';
// ── Existing non-Git slides ───────────────────────────────────────────────
import GitHistorySlide from './GitHistorySlide';
import LocalToGitHubSlide from './LocalToGitHubSlide';
import WhereAppLivesSlide from './WhereAppLivesSlide';
import CloudSlide from './CloudSlide';
import EnvironmentsSlide from './EnvironmentsSlide';
import CICDSlide from './CICDSlide';
import PipelineSlide from './PipelineSlide';
import ItWorksMyMachineSlide from './ItWorksMyMachineSlide';
import DockerSlide from './DockerSlide';
import BrowserToServerSlide from './BrowserToServerSlide';
import LoginFlowSlide from './LoginFlowSlide';
import WhenSomethingBreaksSlide from './WhenSomethingBreaksSlide';
import HTTPErrorsSlide from './HTTPErrorsSlide';
import WhereDoILookSlide from './WhereDoILookSlide';
import FailureScenarioSlide from './FailureScenarioSlide';
import DeploymentWalkthroughSlide from './DeploymentWalkthroughSlide';
import WholeSystemSlide from './WholeSystemSlide';
import FinalRulesSlide from './FinalRulesSlide';

interface Props {
  slide: SlideData;
}

export default function SlideRenderer({ slide }: Props) {
  switch (slide.type) {
    case 'cover': return <CoverSlide slide={slide} />;
    case 'flow': return <BigQuestionSlide slide={slide} />;
    case 'roles': return <RolesSlide slide={slide} />;
    case 'what-is-code': return <WhatIsCodeSlide slide={slide} />;
    // ── New Git slides ──────────────────────────────────────────────────────
    case 'git-before': return <GitBeforeSlide slide={slide} />;
    case 'git-what-is': return <GitWhatIsSlide slide={slide} />;
    case 'git-vs-github': return <GitVsGitHubSlide slide={slide} />;
    case 'git-repository': return <GitRepositorySlide slide={slide} />;
    case 'git-areas': return <GitAreasSlide slide={slide} />;
    case 'git-commit-slide': return <GitCommitSlide slide={slide} />;
    case 'git-simulator': return <GitSimulatorSlide slide={slide} />;
    case 'git-branches': return <GitBranchesSlide slide={slide} />;
    case 'git-branch-workflow': return <GitBranchWorkflowSlide slide={slide} />;
    case 'git-pull-request': return <GitPullRequestSlide slide={slide} />;
    case 'git-push-pull': return <GitPushPullSlide slide={slide} />;
    case 'git-conflict': return <GitConflictSlide slide={slide} />;
    case 'git-history-revert': return <GitHistoryRevertSlide slide={slide} />;
    case 'git-ignore': return <GitIgnoreSlide slide={slide} />;
    case 'git-actions': return <GitActionsSlide slide={slide} />;
    case 'git-diff': return <GitDiffSlide slide={slide} />;
    case 'git-mistakes': return <GitMistakesSlide slide={slide} />;
    case 'git-troubleshoot': return <GitTroubleshootSlide slide={slide} />;
    case 'git-journey': return <GitJourneySlide slide={slide} />;
    case 'git-github-ui': return <GitHubUISlide slide={slide} />;
    case 'git-to-cicd': return <GitToCICDSlide slide={slide} />;
    case 'git-vocabulary': return <GitVocabularySlide slide={slide} />;
    case 'git-summary': return <GitSummarySlide slide={slide} />;
    // ── Existing non-Git slides ─────────────────────────────────────────────
    case 'git-timeline': return <GitHistorySlide slide={slide} />;
    case 'local-to-github': return <LocalToGitHubSlide slide={slide} />;
    case 'where-app-lives': return <WhereAppLivesSlide slide={slide} />;
    case 'cloud': return <CloudSlide slide={slide} />;
    case 'environments': return <EnvironmentsSlide slide={slide} />;
    case 'cicd': return <CICDSlide slide={slide} />;
    case 'pipeline': return <PipelineSlide slide={slide} />;
    case 'it-works-my-machine': return <ItWorksMyMachineSlide slide={slide} />;
    case 'docker': return <DockerSlide slide={slide} />;
    case 'browser-to-server': return <BrowserToServerSlide slide={slide} />;
    case 'login-flow': return <LoginFlowSlide slide={slide} />;
    case 'when-something-breaks': return <WhenSomethingBreaksSlide slide={slide} />;
    case 'http-errors': return <HTTPErrorsSlide slide={slide} />;
    case 'where-do-i-look': return <WhereDoILookSlide slide={slide} />;
    case 'failure-scenario': return <FailureScenarioSlide slide={slide} />;
    case 'deployment-walkthrough': return <DeploymentWalkthroughSlide slide={slide} />;
    case 'whole-system': return <WholeSystemSlide slide={slide} />;
    case 'final-rules': return <FinalRulesSlide slide={slide} />;
    default: return <div style={{ color: 'var(--text-primary)', padding: 40 }}>Slide not found: {slide.type}</div>;
  }
}
