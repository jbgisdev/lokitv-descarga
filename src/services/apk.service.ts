import { supabase } from '../lib/supabase';
import { AppSetting } from '../types';

export interface ApkDownloadInfo {
  downloadUrl: string;
  description?: string | null;
  updatedAt?: string | null;
}

export const apkService = {
  /**
   * Consulta en Supabase la tabla app_settings filtrando por key = 'url_download_apk'
   */
  async getDownloadUrl(): Promise<{ data: ApkDownloadInfo | null; error: string | null }> {
    try {
      const { data, error } = await supabase
        .from('app_settings')
        .select('*')
        .eq('key', 'url_download_apk')
        .maybeSingle();

      if (error) {
        console.error('Error fetching download URL from Supabase:', error);
        return { data: null, error: error.message || 'Error al conectar con la base de datos' };
      }

      if (!data) {
        return {
          data: null,
          error: 'No se encontró la configuración del APK (clave "url_download_apk").',
        };
      }

      const setting = data as AppSetting;
      const downloadUrl = setting.value ? setting.value.trim() : '';

      if (!downloadUrl) {
        return {
          data: null,
          error: 'El enlace de descarga del APK aún no ha sido configurado en el sistema.',
        };
      }

      return {
        data: {
          downloadUrl,
          description: setting.description,
          updatedAt: setting.updated_at,
        },
        error: null,
      };
    } catch (err: any) {
      console.error('Unexpected error fetching APK URL:', err);
      return {
        data: null,
        error: err.message || 'No se pudo conectar con el servidor. Verifica tu conexión a internet.',
      };
    }
  },
};

