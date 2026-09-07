import React from 'react';
import { SlideData } from '../../data/slides';
import CoverSlide from './CoverSlide';
import BigQuestionSlide from './BigQuestionSlide';
import RolesSlide from './RolesSlide';
import WhatIsCodeSlide from './WhatIsCodeSlide';
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
