import React, { useState } from 'react';
import { DownloadCard } from './components/DownloadCard';
import { SplashScreen } from './components/SplashScreen';
import desktopBackgroundImage from './assets/main-background.jpg';
import mobileBackgroundImage from './assets/mobile-background.webp';

export const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState<boolean>(true);

  return (
    <div className="h-screen w-full bg-[#070A10] flex flex-col justify-between items-center px-4 pt-3 sm:pt-5 pb-2 sm:pb-3 relative overflow-hidden font-sans select-none">
      {/* Splash Screen inicial de 5 segundos con animación Zoom Out */}
      {showSplash && (
        <SplashScreen
          durationMs={5000}
          onFinish={() => setShowSplash(false)}
        />
      )}

      {/* Fondo Cinematográfico Responsivo (Vertical para móviles, Horizontal para tablets, PC y TV) */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <picture className="w-full h-full block">
          <source media="(max-width: 767px)" srcSet={mobileBackgroundImage} />
          <img
            src={desktopBackgroundImage}
            alt="Loki TV Background"
            className="w-full h-full object-cover object-center scale-[1.01] filter blur-[0.5px] opacity-90 transition-opacity duration-1000"
          />
        </picture>

        {/* Capa de oscurecimiento muy suave para garantizar contraste de la tarjeta */}
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070A10]/90 via-transparent to-[#070A10]/40" />
      </div>

      {/* Background Glows atmosféricos sutiles */}
      <div className="fixed top-1/4 -left-28 w-72 sm:w-80 h-72 sm:h-80 bg-[#38BDF8]/15 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div
        className="fixed bottom-1/4 -right-28 w-72 sm:w-80 h-72 sm:h-80 bg-[#FB923C]/15 rounded-full blur-3xl pointer-events-none animate-pulse"
        style={{ animationDuration: '5s' }}
      />

      {/* Contenedor Principal Centrado con margen vertical despegado */}
      <main className="relative z-10 w-full flex-1 flex flex-col items-center justify-center min-h-0 py-1">
        <DownloadCard />
      </main>

      {/* Footer limpio, completamente visible y sin colisiones */}
      <footer className="relative z-10 text-center text-[11px] sm:text-xs text-gray-400 font-medium pt-2 pb-1 select-none shrink-0">
        Loki TV &copy; {new Date().getFullYear()} • Entrega Inmediata • 100% Confiable • Solo en Android
      </footer>
    </div>
  );
};

export default App;
