export interface AppSetting {
  key: string;
  value: string;
  description?: string | null;
  updated_at?: string;
  value_array?: string[] | null;
}

export interface DownloadState {
  url: string | null;
  isLoading: boolean;
  error: string | null;
  isDownloading: boolean;
  versionName?: string;
}

