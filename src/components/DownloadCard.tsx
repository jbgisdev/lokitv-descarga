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
        <div className="text-center mb-2 sm:mb-2.5">
          <div className="relative inline-block group">
            <div className="absolute -inset-1.5 bg-gradient-to-tr from-sky-400 via-blue-500 to-orange-400 rounded-3xl blur-lg opacity-30 group-hover:opacity-60 transition duration-500 animate-pulse" />
            <img
              src={logoImage}
              alt="Loki TV Logo"
              className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl mx-auto mb-1.5 object-cover shadow-xl shadow-sky-500/10 border-2 border-white bg-slate-900 transform transition duration-500 hover:scale-105"
            />
          </div>

          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight flex items-center justify-center text-white">
            <span className="text-sky-400">L</span>
            <span className="text-orange-400">OK</span>
            <span className="text-sky-400">I</span>{' '}
            <span className="text-white ml-1.5 font-light">TV</span>
          </h1>

          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 mt-1 sm:mt-1.5 rounded-full bg-sky-50 border border-sky-100 text-sky-700 text-[10px] sm:text-xs font-semibold shadow-2xs">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Sitio Oficial • Versión Verificada</span>
          </div>
        </div>

        {/* Tarjeta Principal */}
        <div className="w-full bg-white/95 backdrop-blur-xl rounded-3xl p-4 sm:p-5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-slate-100/80 relative transition-all duration-300">

          {/* Card Title & Description */}
          <div className="pb-2.5 mb-3 border-b border-slate-100/80 flex items-center justify-between">
            <div>
              <h2 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <span>Instalador Loki TV</span>
                <span className="text-[9px] uppercase font-mono px-1.5 py-0.5 rounded-md bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold shadow-xs">
                  APK
                </span>
              </h2>
              <p className="text-[10px] sm:text-xs text-slate-500 mt-0.5 font-normal leading-relaxed">
                Más de 100 canales en vivo para Android TV, TV Box y smartphones.
              </p>
            </div>
            <div className="w-9 h-9 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600 shrink-0 ml-3 shadow-inner">
              <Smartphone className="w-4.5 h-4.5 stroke-[1.75]" />
            </div>
          </div>

          {/* Tarjetas de Beneficios (Grid moderno) */}
          <div className="grid grid-cols-3 gap-2 mb-3">
            <div className="flex flex-col items-center justify-center py-2 sm:py-2.5 px-1.5 rounded-2xl bg-slate-50/80 hover:bg-sky-50/40 border border-slate-200/60 transition-all text-center group">
              <div className="w-7 h-7 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-500 mb-1 group-hover:scale-110 transition-transform shadow-2xs">
                <Zap className="w-3.5 h-3.5 stroke-[2]" />
              </div>
              <span className="text-[11px] font-semibold text-slate-800 leading-tight">Entrega</span>
              <span className="text-[9px] text-orange-600 font-medium leading-tight mt-0.5">Inmediata</span>
            </div>

            <div className="flex flex-col items-center justify-center py-2 sm:py-2.5 px-1.5 rounded-2xl bg-slate-50/80 hover:bg-emerald-50/40 border border-slate-200/60 transition-all text-center group">
              <div className="w-7 h-7 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 mb-1 group-hover:scale-110 transition-transform shadow-2xs">
                <ShieldCheck className="w-3.5 h-3.5 stroke-[2]" />
              </div>
              <span className="text-[11px] font-semibold text-slate-800 leading-tight">100%</span>
              <span className="text-[9px] text-emerald-600 font-medium leading-tight mt-0.5">Confiable</span>
            </div>

            <div className="flex flex-col items-center justify-center py-2 sm:py-2.5 px-1.5 rounded-2xl bg-slate-50/80 hover:bg-sky-50/40 border border-slate-200/60 transition-all text-center group">
              <div className="w-7 h-7 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600 mb-1 group-hover:scale-110 transition-transform shadow-2xs">
                <Tv className="w-3.5 h-3.5 stroke-[2]" />
              </div>
              <span className="text-[11px] font-semibold text-slate-800 leading-tight">Android</span>
              <span className="text-[9px] text-sky-600 font-medium leading-tight mt-0.5">TV & Móvil</span>
            </div>
          </div>

          {/* Error Alert Display */}
          {error && (
            <div className="mb-3 p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center justify-between gap-2 shadow-xs">
              <div className="flex items-center gap-1.5 flex-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0 text-rose-600" />
                <span className="text-xs leading-snug font-medium">{error}</span>
              </div>
              <button
                onClick={fetchDownloadUrl}
                className="px-2 py-0.5 rounded-lg bg-rose-100 hover:bg-rose-200 border border-rose-300 text-rose-800 text-xs font-semibold flex items-center gap-1 transition shrink-0 cursor-pointer active:scale-95"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reintentar</span>
              </button>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-2">
            <button
              onClick={handleDownload}
              disabled={isLoading || !downloadInfo?.downloadUrl || isTriggeringDownload}
              className={`w-full py-2.5 sm:py-3 px-4 rounded-xl text-sm sm:text-base font-bold tracking-wide transition-all duration-300 flex items-center justify-center gap-2 group select-none relative overflow-hidden focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-400 ${isLoading || !downloadInfo?.downloadUrl
                ? 'bg-slate-100 border border-slate-200 text-slate-400 cursor-not-allowed opacity-75'
                : 'bg-gradient-to-r from-sky-500 via-sky-600 to-blue-600 hover:from-sky-400 hover:to-blue-700 text-white shadow-lg shadow-sky-500/25 hover:shadow-xl hover:shadow-sky-500/35 cursor-pointer active:scale-[0.98]'
                }`}
            >
              {!isLoading && downloadInfo?.downloadUrl && !isTriggeringDownload && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/25 to-transparent -skew-x-12 animate-shimmer" />
                </div>
              )}

              <div className="relative z-10 flex items-center justify-center gap-2">
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-sky-600 border-t-transparent rounded-full animate-spin" />
                    <span>Obteniendo enlace...</span>
                  </>
                ) : isTriggeringDownload ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Iniciando descarga...</span>
                  </>
                ) : !downloadInfo?.downloadUrl ? (
                  <>
                    <AlertCircle className="w-4 h-4" />
                    <span>Descarga no disponible</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform shrink-0 stroke-[2.25]" />
                    <span>Descargar APK</span>
                    <span className="text-[9px] uppercase px-1.5 py-0.5 rounded-md bg-black/20 text-white font-extrabold tracking-wider">
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
              className="w-full py-2 sm:py-2.5 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 disabled:opacity-40 border border-slate-200/80 text-slate-700 hover:text-slate-900 text-xs font-semibold flex items-center justify-center gap-2 transition active:scale-95 cursor-pointer shadow-2xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
            >
              <QrCode className="w-3.5 h-3.5 text-sky-600 stroke-[2]" />
              <span>Escanear Código QR</span>
            </button>

            <p className="text-center text-[10px] sm:text-[11px] text-slate-500 font-medium flex items-center justify-center gap-1.5 pt-0.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0 stroke-[2]" />
              <span>Archivo APK certificado, seguro y libre de malware.</span>
            </p>

            {downloadInfo?.version && (
              <div className="flex items-center justify-center pt-0.5">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-100/80 border border-slate-200/80 text-[10px] sm:text-[11px] font-medium text-slate-600 shadow-2xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                  <span>Versión</span>
                  <span className="font-semibold text-slate-800 font-mono tracking-tight">
                    {downloadInfo.version}
                  </span>
                </span>
              </div>
            )}
          </div>

          {/* Compatibility Badges */}
          <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-center gap-2.5 text-[11px] text-slate-500 font-medium">
            <span className="flex items-center gap-1">
              <Check className="w-3 h-3 text-emerald-500 stroke-[2.5]" /> Smart TV
            </span>
            <span className="text-slate-300">•</span>
            <span className="flex items-center gap-1">
              <Check className="w-3 h-3 text-emerald-500 stroke-[2.5]" /> Smartphone
            </span>
            <span className="text-slate-300">•</span>
            <span className="flex items-center gap-1">
              <Check className="w-3 h-3 text-emerald-500 stroke-[2.5]" /> TV Box
            </span>
          </div>
        </div>
      </div>

      {/* Modal de Código QR */}
      {isQrModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-fadeIn"
          onClick={() => setIsQrModalOpen(false)}
        >
          <div
            className="w-full max-w-sm bg-white border border-slate-100 rounded-3xl p-6 shadow-2xl relative flex flex-col items-center text-center transform transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsQrModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition cursor-pointer"
              title="Cerrar"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600 mb-3 shadow-inner">
              <QrCode className="w-6 h-6 stroke-[2]" />
            </div>

            <h3 className="text-lg font-bold text-slate-900 mb-1">
              Código QR de Descarga
            </h3>
            <p className="text-xs text-slate-500 mb-5 max-w-xs leading-relaxed">
              Apunta con la cámara de tu smartphone o dispositivo Android TV para descargar directamente.
            </p>

            <div className="p-4 bg-white border-2 border-slate-100 rounded-3xl shadow-lg mb-5 flex items-center justify-center">
              <img
                src={qrImageUrl}
                alt="Código QR Loki TV"
                className="w-48 h-48 object-contain rounded-xl"
              />
            </div>

            <button
              onClick={() => setIsQrModalOpen(false)}
              className="w-full py-3 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 text-xs sm:text-sm font-semibold transition cursor-pointer active:scale-95"
            >
              Cerrar Ventana
            </button>
          </div>
        </div>
      )}
    </>
  );
};