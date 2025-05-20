
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// MediSync Emergency custom colors
				medisync: {
					blue: '#0070f3',
					red: '#ff3b30',
					'light-blue': '#e6f0ff',
					'light-red': '#ffe6e5',
				},
				// Enhanced Nepal themed colors
				nepal: {
					red: '#DC143C',  // Inspired by Nepal flag red
					blue: '#003893', // Inspired by Nepal flag blue
					'crimson': '#DC143C',
					'royal-blue': '#003893',
					'mountain-green': '#2E8B57',
					'himalayan-snow': '#F8F8FF',
					'saffron': '#F4C430',
					'terracotta': '#E2725B',
					'mustang-brown': '#754C24',
					'rhododendron': '#FF66CC',
					// Additional shades
					'crimson-light': '#FFE8EC',
					'crimson-dark': '#AB0D2E',
					'royal-blue-light': '#E6ECF5',
					'royal-blue-dark': '#002970',
					'mountain-green-light': '#E6F0EC',
					'mountain-green-dark': '#1B5E37',
					'himalayan-white': '#FFFFFF',
					'himalayan-mist': '#F0F0F0',
					'prayer-flag-yellow': '#FFDE59',
					'prayer-flag-blue': '#3498DB',
					'prayer-flag-red': '#E74C3C',
					'prayer-flag-green': '#2ECC71',
					'prayer-flag-white': '#FFFFFF',
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				pulse: {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.5' }
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'scale-in': {
					'0%': { transform: 'scale(0.95)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
				'fade-in': 'fade-in 0.5s ease-out forwards',
				'scale-in': 'scale-in 0.4s ease-out forwards',
			},
			backgroundImage: {
				'nepal-gradient': 'linear-gradient(135deg, #003893 0%, #DC143C 100%)',
				'nepal-light-gradient': 'linear-gradient(135deg, #E6ECF5 0%, #FFE8EC 100%)',
				'nepal-mountain': 'url("/images/nepal-mountains.jpg")',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
