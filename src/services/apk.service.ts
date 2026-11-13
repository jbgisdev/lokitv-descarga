import { supabase } from '../lib/supabase';
import { AppSetting } from '../types';

export interface ApkDownloadInfo {
  downloadUrl: string;
  description?: string | null;
  updatedAt?: string | null;
  version?: string | null;
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

      // Extraer la versión desde el atributo value_array
      let version: string | null = null;

      const extractVersionString = (val: any): string | null => {
        if (!val) return null;
        if (typeof val === 'object') {
          const raw = val.codigo || val.version || val.version_name || val.tag || Object.values(val)[0];
          return raw ? String(raw).trim() : null;
        }
        if (typeof val === 'string') {
          const trimmed = val.trim();
          if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
            try {
              const parsed = JSON.parse(trimmed);
              if (Array.isArray(parsed)) {
                return extractVersionString(parsed[0]);
              }
              return extractVersionString(parsed);
            } catch {
              // fallback
            }
          }
          return trimmed;
        }
        return String(val).trim();
      };

      if (Array.isArray(setting.value_array) && setting.value_array.length > 0) {
        version = extractVersionString(setting.value_array[0]);
      } else if (setting.value_array) {
        version = extractVersionString(setting.value_array);
      }

      if (version) {
        version = version.startsWith('v') || version.startsWith('V') ? version : `v${version}`;
      }

      return {
        data: {
          downloadUrl,
          description: setting.description,
          updatedAt: setting.updated_at,
          version: version || null,
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

