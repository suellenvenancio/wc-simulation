import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        dark: '#050a0f',
        card: '#0a141d',
        neon: '#00ff88',
        accent: '#00ddeb',
        glass: 'rgba(255, 255, 255, 0.03)',
      },
      backgroundImage: {
        'glass-gradient':
          'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
      },
    },
  },
  plugins: [],
}
export default config
