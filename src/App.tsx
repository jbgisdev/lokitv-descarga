import React, { useState } from 'react';
import { DownloadCard } from './components/DownloadCard';
import { SplashScreen } from './components/SplashScreen';
import desktopBackgroundImage from './assets/main-background.jpg';
import mobileBackgroundImage from './assets/mobile-background.webp';

export const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState<boolean>(true);

  return (
    <div className="h-screen w-full bg-slate-100 flex flex-col justify-between items-center p-3 sm:p-4 relative overflow-hidden font-sans select-none">
      {/* Splash Screen inicial de 7 segundos con animación Zoom Out */}
      {showSplash && (
        <SplashScreen
          durationMs={7000}
          onFinish={() => setShowSplash(false)}
        />
      )}

      {/* Fondo Cinematográfico con acabado Light (Limpio y Confiable) */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <picture className="w-full h-full block">
          <source media="(max-width: 767px)" srcSet={mobileBackgroundImage} />
          <img
            src={desktopBackgroundImage}
            alt="Loki TV Background"
            className="w-full h-full object-cover object-center scale-[1.01] filter blur-[0.5px] opacity-75 transition-opacity duration-1000"
          />
        </picture>

        {/* Capa de luminosidad y contraste sutil Light Theme */}
        <div className="absolute inset-0 bg-white/45 backdrop-blur-[1px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-100/95 via-white/40 to-slate-100/60" />
      </div>

      {/* Resplandores atmosféricos sutiles en tonos cielo y naranja cálido */}
      <div className="fixed top-1/4 -left-28 w-80 h-80 bg-sky-300/30 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div
        className="fixed bottom-1/4 -right-28 w-80 h-80 bg-orange-200/30 rounded-full blur-3xl pointer-events-none animate-pulse"
        style={{ animationDuration: '5s' }}
      />

      {/* Contenedor Principal Centrado (Sin Scroll) */}
      <main className="relative z-10 w-full flex-1 flex flex-col items-center justify-center min-h-0 my-auto">
        <DownloadCard />
      </main>

      {/* Footer de una sola línea al pie de página */}
      <footer className="relative z-10 text-center text-[11px] text-slate-500 font-medium py-1 select-none">
        Loki TV &copy; {new Date().getFullYear()} • Entrega Inmediata • 100% Confiable • Sitio Oficial de Descarga
      </footer>
    </div>
  );
};

export default App;
