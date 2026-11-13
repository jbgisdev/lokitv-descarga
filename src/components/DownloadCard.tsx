import React, { useState, useEffect } from 'react';
import {
  Download,
  ShieldCheck,
  Smartphone,
  Tv,
  Zap,
  AlertCircle,
  RefreshCw,
  Check,
  QrCode,
  X
} from 'lucide-react';
import { apkService, ApkDownloadInfo } from '../services/apk.service';
import logoImage from '../assets/logo.jpg';

export const DownloadCard: React.FC = () => {
  const [downloadInfo, setDownloadInfo] = useState<ApkDownloadInfo | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isQrModalOpen, setIsQrModalOpen] = useState<boolean>(false);
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

  const qrImageUrl = downloadInfo?.downloadUrl
    ? `https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=${encodeURIComponent(
        downloadInfo.downloadUrl
      )}&bgcolor=FFFFFF&color=0284C7&margin=12`
    : '';

  return (
    <>
      <div className="w-full max-w-[420px] relative z-10 mx-auto flex flex-col items-center">
        {/* Brand Header (Proporcionado con margen superior despegado) */}
        <div className="text-center mb-2.5 sm:mb-3">
          <div className="relative inline-block group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#38BDF8] via-sky-400 to-[#FB923C] rounded-2xl blur-md opacity-60 group-hover:opacity-90 transition duration-500 animate-pulse-slow" />
            <img
              src={logoImage}
              alt="Loki TV Logo"
              className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl mx-auto mb-1.5 object-cover shadow-[0_8px_20px_rgba(0,0,0,0.5)] border-2 border-white/90 bg-white transform transition duration-500 hover:scale-105"
            />
          </div>

          <h1 className="text-xl sm:text-2xl font-black tracking-wider flex items-center justify-center drop-shadow-md text-white">
            <span className="text-[#38BDF8]">L</span>
            <span className="text-[#FB923C]">OK</span>
            <span className="text-[#38BDF8]">I</span>{' '}
            <span className="text-white ml-2 font-light">TV</span>
          </h1>

          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 mt-1 rounded-full bg-black/50 border border-white/20 text-sky-300 text-[10px] sm:text-[11px] font-semibold backdrop-blur-md shadow-md">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            <span>Sitio Oficial • Descarga Verificada</span>
          </div>
        </div>

        {/* Tarjeta Principal con Diseño DARK Glassmorphism */}
        <div className="w-full bg-[#0B0F17]/95 backdrop-blur-2xl rounded-2xl sm:rounded-3xl p-4 sm:p-5 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] border border-white/10 relative transition-all duration-300">
          {/* Subtle top edge ambient glow */}
          <div className="absolute top-0 inset-x-6 h-px bg-gradient-to-r from-transparent via-sky-400/50 to-transparent" />

          {/* Card Title & Description */}
          <div className="pb-2.5 mb-3 border-b border-white/10 flex items-center justify-between">
            <div>
              <h2 className="text-sm sm:text-base font-black text-white tracking-tight flex items-center gap-2">
                <span>Instalador Loki TV</span>
                <span className="text-[9px] uppercase font-mono px-1.5 py-0.5 rounded-md bg-sky-500/20 border border-sky-400/30 text-sky-300 font-bold shadow-xs">
                  .APK
                </span>
              </h2>
              <p className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5 font-medium leading-tight">
                Más de 100 canales en vivo para Android TV, TV Box y smartphones.
              </p>
            </div>
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 text-white flex items-center justify-center shadow-md shadow-sky-500/30 shrink-0 ml-2">
              <Smartphone className="w-4 h-4" />
            </div>
          </div>

          {/* Iconos de Beneficios con Alto Protagonismo en Dark Theme */}
          <div className="grid grid-cols-3 gap-2 mb-3">
            {/* Entrega Inmediata */}
            <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-gradient-to-b from-amber-500/10 to-amber-950/20 border border-amber-500/25 hover:border-amber-500/50 shadow-xs hover:shadow-md transition-all text-center group">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400 via-orange-500 to-amber-600 text-white flex items-center justify-center shadow-md shadow-orange-500/35 mb-1 transform group-hover:scale-110 transition-transform">
                <Zap className="w-3.5 h-3.5 fill-white text-white" />
              </div>
              <span className="text-[10px] sm:text-[11px] font-black text-slate-100 leading-tight">Entrega</span>
              <span className="text-[8px] sm:text-[9px] font-extrabold text-amber-400 uppercase tracking-wide mt-0.5">Inmediata</span>
            </div>

            {/* 100% Confiable */}
            <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-gradient-to-b from-emerald-500/10 to-emerald-950/20 border border-emerald-500/25 hover:border-emerald-500/50 shadow-xs hover:shadow-md transition-all text-center group">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-400 via-emerald-500 to-teal-600 text-white flex items-center justify-center shadow-md shadow-emerald-500/35 mb-1 transform group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-[10px] sm:text-[11px] font-black text-slate-100 leading-tight">100%</span>
              <span className="text-[8px] sm:text-[9px] font-extrabold text-emerald-400 uppercase tracking-wide mt-0.5">Confiable</span>
            </div>

            {/* Solo Android TV */}
            <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-gradient-to-b from-sky-500/10 to-sky-950/20 border border-sky-500/25 hover:border-sky-500/50 shadow-xs hover:shadow-md transition-all text-center group">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-sky-400 via-sky-500 to-blue-600 text-white flex items-center justify-center shadow-md shadow-sky-500/35 mb-1 transform group-hover:scale-110 transition-transform">
                <Tv className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-[10px] sm:text-[11px] font-black text-slate-100 leading-tight">Solo</span>
              <span className="text-[8px] sm:text-[9px] font-extrabold text-sky-400 uppercase tracking-wide mt-0.5">Android TV</span>
            </div>
          </div>

          {/* Error Alert Display */}
          {error && (
            <div className="mb-3 p-2.5 rounded-xl bg-rose-950/60 border border-rose-500/30 text-rose-300 text-xs flex items-center justify-between gap-2 shadow-sm">
              <div className="flex items-center gap-1.5 flex-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0 text-rose-400" />
                <span className="text-[10px] leading-tight font-medium">{error}</span>
              </div>
              <button
                onClick={fetchDownloadUrl}
                className="px-2 py-0.5 rounded-lg bg-rose-900/60 hover:bg-rose-800/80 border border-rose-500/40 text-rose-200 text-[9px] font-bold flex items-center gap-1 transition shrink-0 cursor-pointer active:scale-95"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Reintentar</span>
              </button>
            </div>
          )}

          {/* Action Buttons: Primary Download + QR Scanner */}
          <div className="space-y-2">
            <button
              onClick={handleDownload}
              disabled={isLoading || !downloadInfo?.downloadUrl || isTriggeringDownload}
              className={`w-full py-3 sm:py-3.5 px-4 rounded-xl text-sm sm:text-base font-black tracking-wide transition-all duration-200 flex items-center justify-center gap-2 group select-none relative overflow-hidden focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-400 ${
                isLoading || !downloadInfo?.downloadUrl
                  ? 'bg-slate-800 border border-slate-700 text-slate-500 cursor-not-allowed opacity-75'
                  : 'bg-gradient-to-r from-sky-500 via-sky-600 to-blue-600 hover:from-sky-400 hover:to-blue-700 text-white shadow-[0_10px_24px_-4px_rgba(2,132,199,0.5),inset_0_1px_1px_rgba(255,255,255,0.4)] hover:shadow-[0_14px_28px_-4px_rgba(2,132,199,0.6)] cursor-pointer active:scale-[0.98]'
              }`}
            >
              {/* Efecto de brillo sutil que recorre de izquierda a derecha lentamente */}
              {!isLoading && downloadInfo?.downloadUrl && !isTriggeringDownload && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 animate-shimmer" />
                </div>
              )}

              <div className="relative z-10 flex items-center justify-center gap-2">
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-sky-400 border-t-transparent rounded-full animate-spin" />
                    <span>Obteniendo enlace...</span>
                  </>
                ) : isTriggeringDownload ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Iniciando descarga directa...</span>
                  </>
                ) : !downloadInfo?.downloadUrl ? (
                  <>
                    <AlertCircle className="w-4 h-4" />
                    <span>Descarga no disponible</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform shrink-0" />
                    <span className="tracking-wide">Descargar APK</span>
                    <span className="text-[9px] uppercase px-1.5 py-0.5 rounded-md bg-black/25 text-white font-black tracking-wider">
                      Android
                    </span>
                  </>
                )}
              </div>
            </button>

            {/* Botón para Escanear QR */}
            <button
              onClick={() => setIsQrModalOpen(true)}
              disabled={!downloadInfo?.downloadUrl}
              className="w-full py-2 px-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] disabled:opacity-40 border border-white/10 text-slate-200 hover:text-white text-xs font-bold flex items-center justify-center gap-1.5 transition active:scale-95 cursor-pointer shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
            >
              <QrCode className="w-3.5 h-3.5 text-sky-400" />
              <span>Escanear Código QR</span>
            </button>

            <p className="text-center text-[10px] text-slate-400 font-medium flex items-center justify-center gap-1.5 pt-0.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Archivo APK certificado, seguro y libre de malware.</span>
            </p>
          </div>

          {/* Compatibility Badges */}
          <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-center gap-2 sm:gap-3 text-[10px] text-slate-400 font-medium">
            <span className="flex items-center gap-1">
              <Check className="w-3 h-3 text-sky-400 font-bold" /> Smart TV
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Check className="w-3 h-3 text-sky-400 font-bold" /> Fire Stick
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Check className="w-3 h-3 text-sky-400 font-bold" /> TV Box / Móvil
            </span>
          </div>
        </div>
      </div>

      {/* Modal de Código QR */}
      {isQrModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
          onClick={() => setIsQrModalOpen(false)}
        >
          <div
            className="w-full max-w-sm bg-[#0B0F17] border border-sky-500/30 rounded-3xl p-5 sm:p-6 shadow-2xl relative flex flex-col items-center text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsQrModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 text-slate-400 hover:text-white hover:bg-white/20 transition cursor-pointer"
              title="Cerrar"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-10 h-10 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 mb-3 shadow-inner">
              <QrCode className="w-5 h-5" />
            </div>

            <h3 className="text-base font-bold text-white mb-1">
              Código QR de Descarga
            </h3>
            <p className="text-xs text-slate-400 mb-4 max-w-xs">
              Apunta con la cámara de tu smartphone o Android TV para descargar directamente.
            </p>

            <div className="p-3 bg-white border-2 border-slate-100 rounded-2xl shadow-lg mb-4 flex items-center justify-center">
              <img
                src={qrImageUrl}
                alt="Código QR Loki TV"
                className="w-48 h-48 object-contain rounded-xl"
              />
            </div>

            <button
              onClick={() => setIsQrModalOpen(false)}
              className="w-full py-2.5 px-4 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] border border-white/10 text-slate-200 text-xs font-semibold transition cursor-pointer active:scale-95"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </>
  );
};
