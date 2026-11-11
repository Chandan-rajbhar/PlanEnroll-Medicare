import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { LiveAgentChatModal } from './components/LiveAgentChatModal';
import { PlanDetailModal } from './components/PlanDetailModal';

// 20 Screens
import { HomeScreen } from './screens/HomeScreen';
import { MedicareProductsScreen } from './screens/MedicareProductsScreen';
import { PlanSearchScreen } from './screens/PlanSearchScreen';
import { PlanDetailsScreen } from './screens/PlanDetailsScreen';
import { PlanComparisonScreen } from './screens/PlanComparisonScreen';
import { MyDoctorsScreen } from './screens/MyDoctorsScreen';
import { MyPharmaciesScreen } from './screens/MyPharmaciesScreen';
import { MyPrescriptionsScreen } from './screens/MyPrescriptionsScreen';
import { PersonalizedQuoteScreen } from './screens/PersonalizedQuoteScreen';
import { SavedPlansScreen } from './screens/SavedPlansScreen';
import { NotificationsScreen } from './screens/NotificationsScreen';
import { ContactAgentScreen } from './screens/ContactAgentScreen';
import { UserProfileScreen } from './screens/UserProfileScreen';
import { LoginScreen } from './screens/LoginScreen';
import { RegistrationScreen } from './screens/RegistrationScreen';
import { ForgotPasswordScreen } from './screens/ForgotPasswordScreen';
import { LearningCenterScreen } from './screens/LearningCenterScreen';
import { MedicareDisclaimersScreen } from './screens/MedicareDisclaimersScreen';
import { SettingsScreen } from './screens/SettingsScreen';
import { HelpSupportScreen } from './screens/HelpSupportScreen';

const MainAppContent: React.FC = () => {
  const { 
    currentScreen, 
    selectedPlanForDetails, 
    closePlanDetails 
  } = useApp();

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeScreen />;
      case 'products':
        return <MedicareProductsScreen />;
      case 'plan-search':
        return <PlanSearchScreen />;
      case 'plan-details':
        return <PlanDetailsScreen />;
      case 'plan-comparison':
        return <PlanComparisonScreen />;
      case 'my-doctors':
        return <MyDoctorsScreen />;
      case 'my-pharmacies':
        return <MyPharmaciesScreen />;
      case 'my-prescriptions':
        return <MyPrescriptionsScreen />;
      case 'personalized-quote':
        return <PersonalizedQuoteScreen />;
      case 'saved-plans':
        return <SavedPlansScreen />;
      case 'notifications':
        return <NotificationsScreen />;
      case 'contact-agent':
        return <ContactAgentScreen />;
      case 'user-profile':
        return <UserProfileScreen />;
      case 'login':
        return <LoginScreen />;
      case 'registration':
        return <RegistrationScreen />;
      case 'forgot-password':
        return <ForgotPasswordScreen />;
      case 'learning-center':
        return <LearningCenterScreen />;
      case 'medicare-disclaimers':
        return <MedicareDisclaimersScreen />;
      case 'settings':
        return <SettingsScreen />;
      case 'help-support':
        return <HelpSupportScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <div className="fixed inset-0 sm:relative sm:inset-auto w-full h-[100dvh] sm:h-auto sm:min-h-screen bg-slate-900 flex flex-col items-center justify-center p-0 sm:py-4 md:py-6 font-sans overflow-hidden">
      {/* Phone Mockup Frame Container - traps all fixed/absolute modals within the phone frame */}
      <div 
        className="w-full max-w-[430px] h-full sm:h-[880px] sm:max-h-[94vh] bg-slate-50 relative flex flex-col sm:rounded-[46px] sm:shadow-[0_25px_70px_rgba(0,0,0,0.65)] sm:border-[10px] sm:border-slate-800 sm:ring-1 sm:ring-slate-700 overflow-hidden"
        style={{ transform: 'translateZ(0)' }}
      >
        {/* Global App Header */}
        <Header />

        {/* Dynamic Screen View - min-h-0 prevents flex overflow on mobile browsers */}
        <main className="flex-1 min-h-0 overflow-y-auto no-scrollbar relative">
          {renderScreen()}
        </main>

        {/* Mobile Bottom Navigation - Firmly inside the phone container */}
        <BottomNav />

        {/* Live Licensed Agent Chat Simulation Modal */}
        <LiveAgentChatModal />

        {/* Selected Plan Details Modal */}
        {selectedPlanForDetails && currentScreen !== 'plan-details' && (
          <PlanDetailModal
            plan={selectedPlanForDetails}
            onClose={closePlanDetails}
          />
        )}
      </div>
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}

export default App;
