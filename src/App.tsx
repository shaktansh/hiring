import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import JobSeekerDashboard from './components/JobSeekerDashboard';
import HireTopTalent from './components/HireTopTalent';

function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'job-seeker' | 'employer'>('landing');

  return (
    <div className="min-h-screen">
      {currentView === 'landing' && (
        <LandingPage 
          onGetJob={() => setCurrentView('job-seeker')}
          onPostJob={() => setCurrentView('employer')}
        />
      )}
      {currentView === 'job-seeker' && (
        <JobSeekerDashboard onBack={() => setCurrentView('landing')} />
      )}
      {currentView === 'employer' && (
        <HireTopTalent onBack={() => setCurrentView('landing')} />
      )}
    </div>
  );
}

export default App;