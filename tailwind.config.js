// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6C63FF',
        secondary: '#FF6584',
        accent1: '#4CAF50',
        accent2: '#FFC107',
        misleading: '#FF9800',
        upgrade: '#FFD700',
        text: '#333333',
        bg: '#F0F2F5',
        cardBg: '#FFFFFF',
        sidebarBg: '#2C3E50',
        sidebarText: '#ECF0F1',
      },
    },
  },
  plugins: [],
}
