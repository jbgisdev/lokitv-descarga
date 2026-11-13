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
      <div className="w-full max-w-[440px] relative z-10 mx-auto flex flex-col items-center">
        {/* Brand Header */}
        <div className="text-center mb-3 sm:mb-4">
          <div className="relative inline-block group">
            <div className="absolute -inset-1 bg-gradient-to-r from-sky-400 via-sky-300 to-orange-300 rounded-2xl blur-md opacity-60 group-hover:opacity-90 transition duration-500 animate-pulse-slow" />
            <img
              src={logoImage}
              alt="Loki TV Logo"
              className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl mx-auto mb-2 object-cover shadow-lg border-2 border-white bg-white transform transition duration-500 hover:scale-105"
            />
          </div>

          <h1 className="text-2xl sm:text-3xl font-black tracking-wider flex items-center justify-center drop-shadow-sm text-slate-900">
            <span className="text-[#0284C7]">L</span>
            <span className="text-[#EA580C]">OK</span>
            <span className="text-[#0284C7]">I</span>{' '}
            <span className="text-slate-800 ml-2 font-light">TV</span>
          </h1>

          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 mt-1 rounded-full bg-emerald-50 border border-emerald-200/90 text-emerald-700 text-[11px] font-bold shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Sitio Oficial • Descarga Verificada</span>
          </div>
        </div>

        {/* Main Clean Card (Theme Light Confiable) */}
        <div className="w-full bg-white/95 backdrop-blur-2xl rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-[0_20px_50px_rgba(15,23,42,0.1)] border border-white/80 relative transition-all duration-300">
          {/* Subtle top edge ambient highlight */}
          <div className="absolute top-0 inset-x-8 h-px bg-gradient-to-r from-transparent via-sky-400/60 to-transparent" />

          {/* Card Title & Description */}
          <div className="pb-3.5 mb-3.5 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-wide flex items-center gap-2">
                <span>Instalador Loki TV</span>
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded-md bg-sky-100 border border-sky-200 text-sky-800 font-bold">
                  .APK
                </span>
              </h2>
              <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
                Más de 100 canales en vivo para Android TV, TV Box y smartphones.
              </p>
            </div>
            <div className="w-9 h-9 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-[#0284C7] shrink-0 ml-2 shadow-inner">
              <Smartphone className="w-4 h-4" />
            </div>
          </div>

          {/* Features Highlights Pills con tonos de confianza */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-amber-50/80 border border-amber-200/70 text-center shadow-xs">
              <Zap className="w-3.5 h-3.5 text-[#EA580C] mb-1" />
              <span className="text-[10px] font-bold text-amber-950">Entrega</span>
              <span className="text-[9px] text-amber-700">Inmediata</span>
            </div>

            <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-emerald-50/80 border border-emerald-200/70 text-center shadow-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 mb-1" />
              <span className="text-[10px] font-bold text-emerald-950">100%</span>
              <span className="text-[9px] text-emerald-700">Confiable</span>
            </div>

            <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-sky-50/80 border border-sky-200/70 text-center shadow-xs">
              <Tv className="w-3.5 h-3.5 text-[#0284C7] mb-1" />
              <span className="text-[10px] font-bold text-sky-950">Solo</span>
              <span className="text-[9px] text-sky-700">Android & TV</span>
            </div>
          </div>

          {/* Error Alert Display */}
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center justify-between gap-2 shadow-xs">
              <div className="flex items-center gap-2 flex-1">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                <span className="text-[11px] leading-tight font-medium">{error}</span>
              </div>
              <button
                onClick={fetchDownloadUrl}
                className="px-2.5 py-1 rounded-lg bg-rose-100 hover:bg-rose-200 border border-rose-300 text-rose-800 text-[10px] font-bold flex items-center gap-1 transition shrink-0 cursor-pointer active:scale-95"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Reintentar</span>
              </button>
            </div>
          )}

          {/* Action Buttons: Primary Download + QR Scanner */}
          <div className="space-y-2.5">
            <button
              onClick={handleDownload}
              disabled={isLoading || !downloadInfo?.downloadUrl || isTriggeringDownload}
              className={`w-full py-3.5 sm:py-4 px-4 rounded-xl text-sm sm:text-base font-bold transition-all duration-200 flex items-center justify-center gap-2.5 shadow-lg group select-none focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-400 ${
                isLoading || !downloadInfo?.downloadUrl
                  ? 'bg-slate-100 border border-slate-200 text-slate-400 cursor-not-allowed opacity-75'
                  : 'bg-gradient-to-r from-sky-500 via-sky-600 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white shadow-sky-500/25 hover:shadow-sky-500/40 cursor-pointer active:scale-[0.98]'
              }`}
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-sky-600 border-t-transparent rounded-full animate-spin" />
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
                  <Download className="w-5 h-5 group-hover:translate-y-0.5 transition-transform shrink-0" />
                  <span className="tracking-wide">Descargar APK</span>
                  <span className="text-[10px] uppercase px-1.5 py-0.5 rounded bg-white/20 text-white font-black tracking-wider">
                    Android
                  </span>
                </>
              )}
            </button>

            {/* Botón para Escanear QR */}
            <button
              onClick={() => setIsQrModalOpen(true)}
              disabled={!downloadInfo?.downloadUrl}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-50 hover:bg-slate-100 disabled:opacity-40 border border-slate-200/90 text-slate-700 hover:text-slate-900 text-xs font-semibold flex items-center justify-center gap-2 transition active:scale-95 cursor-pointer shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
            >
              <QrCode className="w-4 h-4 text-[#0284C7]" />
              <span>Escanear Código QR</span>
            </button>

            <p className="text-center text-[10px] text-slate-500 flex items-center justify-center gap-1.5 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Archivo APK certificado, seguro y libre de malware.</span>
            </p>
          </div>

          {/* Compatibility Badges */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-center gap-2 sm:gap-3 text-[10px] text-slate-500">
            <span className="flex items-center gap-1">
              <Check className="w-3 h-3 text-emerald-600 font-bold" /> Smart TV
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Check className="w-3 h-3 text-emerald-600 font-bold" /> Fire Stick
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Check className="w-3 h-3 text-emerald-600 font-bold" /> TV Box / Móvil
            </span>
          </div>
        </div>
      </div>

      {/* Modal de Código QR (Theme Light) */}
      {isQrModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-md animate-fadeIn"
          onClick={() => setIsQrModalOpen(false)}
        >
          <div
            className="w-full max-w-sm bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-2xl relative flex flex-col items-center text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsQrModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition cursor-pointer"
              title="Cerrar"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-10 h-10 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center text-[#0284C7] mb-3 shadow-inner">
              <QrCode className="w-5 h-5" />
            </div>

            <h3 className="text-base font-bold text-slate-900 mb-1">
              Código QR de Descarga
            </h3>
            <p className="text-xs text-slate-500 mb-4 max-w-xs">
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
              className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 text-xs font-semibold transition cursor-pointer active:scale-95"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </>
  );
};
