import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.capacitorapp',
  appName: 'CapacitorApp',
  webDir: 'dist/capacitor-app/browser',
  server: {
    url: 'http://192.168.1.103:4200',
    cleartext: true,
  },
};

export default config;
