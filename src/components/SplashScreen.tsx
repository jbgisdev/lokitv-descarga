import React, { useState, useEffect } from 'react';
import promoSplashDesktop from '../assets/background.webp';
import promoSplashMobile from '../assets/mobile-splash.webp';
import { ArrowRight } from 'lucide-react';

interface SplashScreenProps {
  onFinish: () => void;
  durationMs?: number;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({
  onFinish,
  durationMs = 5000,
}) => {
  const [isFadingOut, setIsFadingOut] = useState<boolean>(false);

  useEffect(() => {
    // Iniciar desvanecimiento suave antes de finalizar
    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, Math.max(durationMs - 600, 1000));

    // Finalizar y desmontar a los 5 segundos exactos
    const finishTimer = setTimeout(() => {
      onFinish();
    }, durationMs);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(finishTimer);
    };
  }, [durationMs, onFinish]);

  const handleSkip = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      onFinish();
    }, 350);
  };

  return (
    <div
      className={`fixed inset-0 z-50 overflow-hidden bg-[#070A10] select-none transition-opacity duration-500 flex items-center justify-center p-2 sm:p-4 md:p-6 ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Fondo difuminado ambiental responsivo para armonizar el espacio circundante */}
      <picture className="absolute inset-0 w-full h-full pointer-events-none">
        <source media="(max-width: 767px)" srcSet={promoSplashMobile} />
        <img
          src={promoSplashDesktop}
          alt="Ambient Backdrop"
          className="w-full h-full object-cover filter blur-3xl opacity-35 scale-110"
        />
      </picture>

      {/* Contenedor central con la imagen principal responsiva 100% contenida */}
      <div className="relative z-10 w-full h-full flex items-center justify-center overflow-hidden">
        <picture className="max-w-full max-h-full flex items-center justify-center animate-splash-zoom will-change-transform">
          <source media="(max-width: 767px)" srcSet={promoSplashMobile} />
          <img
            src={promoSplashDesktop}
            alt="Loki TV Splash"
            className="max-w-full max-h-full object-contain rounded-xl sm:rounded-2xl shadow-2xl drop-shadow-[0_15px_35px_rgba(0,0,0,0.85)]"
          />
        </picture>
      </div>

      {/* Botón para Omitir / Saltar */}
      <button
        onClick={handleSkip}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 z-30 px-3.5 py-1.5 rounded-full bg-black/60 hover:bg-black/80 border border-white/20 text-white/90 hover:text-white text-xs font-medium backdrop-blur-md transition flex items-center gap-1.5 cursor-pointer shadow-lg active:scale-95"
        title="Saltar introducción"
      >
        <span>Saltar</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>

      {/* Barra de progreso inferior de 5 segundos */}
      <div className="absolute bottom-0 inset-x-0 h-1 bg-white/10 z-30">
        <div className="h-full bg-gradient-to-r from-[#38BDF8] via-sky-400 to-[#FB923C] animate-splash-progress" />
      </div>
    </div>
  );
};
