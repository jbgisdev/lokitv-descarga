import React, { useState, useEffect } from 'react';
import {
  Download,
  ShieldCheck,
  Smartphone,
  Tv,
  Zap,
  AlertCircle,
  RefreshCw,
  Sparkles,
  Check
} from 'lucide-react';
import { apkService, ApkDownloadInfo } from '../services/apk.service';
import logoImage from '../assets/logo.jpg';

export const DownloadCard: React.FC = () => {
  const [downloadInfo, setDownloadInfo] = useState<ApkDownloadInfo | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isTriggeringDownload, setIsTriggeringDownload] = useState<boolean>(false);

  const fetchDownloadUrl = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data, error: fetchErr } = await apkService.getDownloadUrl();
      if (fetchErr || !data) {
        setError(
          fetchErr ||
            'No se pudo obtener el enlace de descarga del APK. Por favor verifica tu conexión.'
        );
        setDownloadInfo(null);
      } else {
        setDownloadInfo(data);
        setError(null);
      }
    } catch (err: any) {
      setError(
        err?.message ||
          'Error inesperado al conectar con Supabase. Verifica tu conexión a internet.'
      );
      setDownloadInfo(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDownloadUrl();
  }, []);

  const handleDownload = () => {
    if (!downloadInfo?.downloadUrl) return;

    setIsTriggeringDownload(true);

    try {
      const link = document.createElement('a');
      link.href = downloadInfo.downloadUrl;
      link.setAttribute('download', 'LokiTV.apk');
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (e) {
      window.location.href = downloadInfo.downloadUrl;
    }

    setTimeout(() => {
      setIsTriggeringDownload(false);
    }, 2500);
  };

  return (
    <div className="w-full max-w-[440px] relative z-10 mx-auto flex flex-col items-center">
      {/* Brand Header */}
      <div className="text-center mb-3 sm:mb-4">
        <div className="relative inline-block group">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#38BDF8] via-sky-500 to-[#FB923C] rounded-2xl blur-md opacity-45 group-hover:opacity-75 transition duration-500 animate-pulse-slow" />
          <img
            src={logoImage}
            alt="Loki TV Logo"
            className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl mx-auto mb-2 object-cover shadow-2xl border border-white/10 bg-[#0B0F17] transform transition duration-500 hover:scale-105"
          />
        </div>

        <h1 className="text-2xl sm:text-3xl font-black tracking-wider flex items-center justify-center drop-shadow-md">
          <span className="text-[#38BDF8]">L</span>
          <span className="text-[#FB923C]">OK</span>
          <span className="text-[#38BDF8]">I</span>{' '}
          <span className="text-white ml-2 font-light">TV</span>
        </h1>

        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 mt-1 rounded-full bg-sky-950/60 border border-sky-500/25 text-sky-300 text-[11px] font-semibold backdrop-blur-md shadow-sm">
          <Sparkles className="w-3 h-3 text-[#38BDF8]" />
          <span>Descarga Oficial APK</span>
        </div>
      </div>

      {/* Main Glassmorphism Card */}
      <div className="w-full bg-[#0B0F17]/90 backdrop-blur-2xl rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-2xl border border-white/10 relative transition-all duration-300">
        {/* Subtle top edge ambient glow */}
        <div className="absolute top-0 inset-x-6 h-px bg-gradient-to-r from-transparent via-[#38BDF8]/60 to-transparent" />

        {/* Card Title & Description */}
        <div className="pb-3.5 mb-3.5 border-b border-white/5 flex items-center justify-between">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white tracking-wide flex items-center gap-2">
              <span>Instalador Loki TV</span>
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded-md bg-sky-500/15 border border-sky-500/30 text-sky-300">
                .APK
              </span>
            </h2>
            <p className="text-[11px] sm:text-xs text-gray-400 mt-0.5">
              Más de 100 canales en vivo para Android TV, TV Box y smartphones.
            </p>
          </div>
          <div className="w-9 h-9 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-[#38BDF8] shrink-0 ml-2">
            <Smartphone className="w-4 h-4" />
          </div>
        </div>

        {/* Features Highlights Pills */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-white/[0.03] border border-white/5 text-center">
            <Zap className="w-3.5 h-3.5 text-[#FB923C] mb-1" />
            <span className="text-[10px] font-bold text-gray-200">Entrega</span>
            <span className="text-[9px] text-gray-400">Inmediata</span>
          </div>

          <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-white/[0.03] border border-white/5 text-center">
            <ShieldCheck className="w-3.5 h-3.5 text-[#38BDF8] mb-1" />
            <span className="text-[10px] font-bold text-gray-200">100%</span>
            <span className="text-[9px] text-gray-400">Confiable</span>
          </div>

          <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-white/[0.03] border border-white/5 text-center">
            <Tv className="w-3.5 h-3.5 text-emerald-400 mb-1" />
            <span className="text-[10px] font-bold text-gray-200">Solo</span>
            <span className="text-[9px] text-gray-400">Android & TV</span>
          </div>
        </div>

        {/* Error Alert Display */}
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-950/50 border border-rose-500/30 text-rose-200 text-xs flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 flex-1">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span className="text-[11px] leading-tight">{error}</span>
            </div>
            <button
              onClick={fetchDownloadUrl}
              className="px-2.5 py-1 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-rose-200 text-[10px] font-semibold flex items-center gap-1 transition shrink-0 cursor-pointer active:scale-95"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Reintentar</span>
            </button>
          </div>
        )}

        {/* Primary Download Button Action */}
        <div className="space-y-2.5">
          <button
            onClick={handleDownload}
            disabled={isLoading || !downloadInfo?.downloadUrl || isTriggeringDownload}
            className={`w-full py-3.5 sm:py-4 px-4 rounded-xl text-sm sm:text-base font-bold transition-all duration-200 flex items-center justify-center gap-2.5 shadow-lg group select-none focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#38BDF8] ${
              isLoading || !downloadInfo?.downloadUrl
                ? 'bg-sky-950/40 border border-sky-500/20 text-sky-400/60 cursor-not-allowed opacity-75'
                : 'bg-gradient-to-r from-[#38BDF8] via-sky-400 to-[#0284C7] hover:from-sky-300 hover:to-sky-500 text-gray-950 shadow-sky-500/25 hover:shadow-sky-500/40 cursor-pointer active:scale-[0.98]'
            }`}
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-sky-400 border-t-transparent rounded-full animate-spin" />
                <span>Obteniendo enlace...</span>
              </>
            ) : isTriggeringDownload ? (
              <>
                <div className="w-4 h-4 border-2 border-gray-950 border-t-transparent rounded-full animate-spin" />
                <span>Iniciando descarga directa...</span>
              </>
            ) : !downloadInfo?.downloadUrl ? (
              <>
                <AlertCircle className="w-4 h-4" />
                <span>Descarga no disponible</span>
              </>
            ) : (
              <>
                <Download className="w-5 h-5 group-hover:translate-y-0.5 transition-transform shrink-0" />
                <span className="tracking-wide">Descargar APK</span>
                <span className="text-[10px] uppercase px-1.5 py-0.5 rounded bg-gray-950/20 text-gray-950 font-black tracking-wider">
                  Android
                </span>
              </>
            )}
          </button>

          <p className="text-center text-[10px] text-gray-400 flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>Archivo APK seguro, oficial y verificado.</span>
          </p>
        </div>

        {/* Compatibility Badges */}
        <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-center gap-2 sm:gap-3 text-[10px] text-gray-400">
          <span className="flex items-center gap-1">
            <Check className="w-3 h-3 text-sky-400" /> Smart TV
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Check className="w-3 h-3 text-sky-400" /> Fire Stick
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Check className="w-3 h-3 text-sky-400" /> TV Box / Móvil
          </span>
        </div>
      </div>
    </div>
  );
};
