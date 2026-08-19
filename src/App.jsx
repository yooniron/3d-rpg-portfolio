import React, { useEffect } from 'react';
import { useGameStore } from './stores/useGameStore';
import { TownScene } from './components/3d/TownScene';
import { HUD } from './components/ui/HUD';
import { GuideModal } from './components/ui/modals/GuideModal';
import { SchoolModal } from './components/ui/modals/SchoolModal';
import { CompanyModal } from './components/ui/modals/CompanyModal';
import { ProjectModal } from './components/ui/modals/ProjectModal';
import { ContactModal } from './components/ui/modals/ContactModal';
import { QuestModal } from './components/ui/modals/QuestModal';
import { ResumeView2D } from './components/ui/ResumeView2D';

export const App = () => {
    const mode = useGameStore((state) => state.mode);
    const activeModal = useGameStore((state) => state.activeModal);
    const closeModal = useGameStore((state) => state.closeModal);
    const teleportTo = useGameStore((state) => state.teleportTo);

    // Auto-open welcome guide on first visit
    useEffect(() => {
        const hasVisited = sessionStorage.getItem('career_town_visited');
        if (!hasVisited) {
            sessionStorage.setItem('career_town_visited', 'true');
            useGameStore.getState().openModal('guide');
        }
    }, []);

    return (
        <main className="rpg-app">
            {mode === '3D' ? (
                <>
                    {/* 3D WebGL Town Scene */}
                    <TownScene />

                    {/* Interactive HUD Overlay */}
                    <HUD />

                    {/* Active Modal Dialogs */}
                    {activeModal === 'guide' && <GuideModal onClose={closeModal} onTeleport={teleportTo} />}
                    {activeModal === 'school' && <SchoolModal onClose={closeModal} />}
                    {activeModal === 'company-a' && <CompanyModal companyId="company-a" onClose={closeModal} />}
                    {activeModal === 'company-b' && <CompanyModal companyId="company-b" onClose={closeModal} />}
                    {activeModal === 'arcade' && <ProjectModal onClose={closeModal} />}
                    {activeModal === 'mailbox' && <ContactModal onClose={closeModal} />}
                    {activeModal === 'quest' && <QuestModal onClose={closeModal} onTeleport={teleportTo} />}
                </>
            ) : (
                /* 2D Clean Executive Resume Mode */
                <ResumeView2D />
            )}
        </main>
    );
};

export default App;
