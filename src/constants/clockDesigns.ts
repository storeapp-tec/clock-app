import { ClockDesignDefinition } from '../types';

export const CLOCK_DESIGNS: ClockDesignDefinition[] = [
  {
    id: 1,
    name: 'Split-Flap Mechanical',
    category: 'Mecánico / Retro',
    description: 'Tarjetas mecánicas partidas con caída hacia abajo por gravedad y chasis mate negro.',
    defaultColors: {
      bg: '#0a0a0a',
      box: '#18181b',
      digits: '#ffffff',
      sep: '#ffffff',
      divider: '#09090b'
    },
    fontOptions: [
      { id: 'bebas', label: 'Bebas Neue', fontFamily: "'Bebas Neue', sans-serif" },
      { id: 'oswald', label: 'Oswald', fontFamily: "'Oswald', sans-serif" },
      { id: 'jetbrains', label: 'JetBrains Mono', fontFamily: "'JetBrains Mono', monospace" }
    ],
    defaultFont: 'bebas',
    colorFields: [
      { key: 'bg', label: 'Fondo Pantalla', defaultColor: '#0a0a0a' },
      { key: 'box', label: 'Tarjetas de Solapa', defaultColor: '#18181b' },
      { key: 'digits', label: 'Dígitos', defaultColor: '#ffffff' },
      { key: 'sep', label: 'Puntos Separadores', defaultColor: '#ffffff' }
    ]
  },
  {
    id: 2,
    name: 'Cyberpunk HUD',
    category: 'Sci-Fi / Futurista',
    description: 'Interfaz angular de alta tecnología con tipografía Orbitron, glow cibernético y acentos cyan neón.',
    defaultColors: {
      bg: '#030712',
      hour: '#f8fafc',
      min: '#00f2ff',
      sep: '#f43f5e'
    },
    fontOptions: [
      { id: 'orbitron', label: 'Orbitron', fontFamily: "'Orbitron', sans-serif" },
      { id: 'tektur', label: 'Tektur', fontFamily: "'Tektur', sans-serif" }
    ],
    defaultFont: 'orbitron',
    colorFields: [
      { key: 'bg', label: 'Fondo Pantalla', defaultColor: '#030712' },
      { key: 'hour', label: 'Horas', defaultColor: '#f8fafc' },
      { key: 'min', label: 'Minutos', defaultColor: '#00f2ff' },
      { key: 'sep', label: 'Separador', defaultColor: '#f43f5e' }
    ]
  },
  {
    id: 3,
    name: 'Bauhaus Modern',
    category: 'Vanguardia / Arte',
    description: 'Tipografía escultórica vanguardista en cuatro cuadrantes cromáticos con estética de diseño moderno.',
    defaultColors: {
      bg: '#000000',
      d1: '#ff3b30',
      d2: '#ff9500',
      d3: '#34c759',
      d4: '#007aff',
      sep: '#ff2d55'
    },
    fontOptions: [
      { id: 'syne', label: 'Syne Bold', fontFamily: "'Syne', sans-serif" },
      { id: 'unbounded', label: 'Unbounded', fontFamily: "'Unbounded', sans-serif" },
      { id: 'righteous', label: 'Righteous', fontFamily: "'Righteous', cursive" }
    ],
    defaultFont: 'syne',
    colorFields: [
      { key: 'bg', label: 'Fondo', defaultColor: '#000000' },
      { key: 'd1', label: 'Primer Dígito', defaultColor: '#ff3b30' },
      { key: 'd2', label: 'Segundo Dígito', defaultColor: '#ff9500' },
      { key: 'd3', label: 'Tercer Dígito', defaultColor: '#34c759' },
      { key: 'd4', label: 'Cuarto Dígito', defaultColor: '#007aff' },
      { key: 'sep', label: 'Separador', defaultColor: '#ff2d55' }
    ]
  },
  {
    id: 4,
    name: 'Braun Minimal Industrial',
    category: 'Minimalismo / Alemán',
    description: 'Diseño industrial clásico inspirado en Dieter Rams con tipografía de máxima precisión, fondo claro y acento amarillo funcional.',
    defaultColors: {
      bg: '#f4f4f5',
      text: '#18181b',
      accent: '#eab308'
    },
    fontOptions: [
      { id: 'inter', label: 'Inter Clean', fontFamily: "'Inter', sans-serif" },
      { id: 'roboto', label: 'Roboto Mono', fontFamily: "'Roboto Mono', monospace" }
    ],
    defaultFont: 'inter',
    colorFields: [
      { key: 'bg', label: 'Fondo Minimal', defaultColor: '#f4f4f5' },
      { key: 'text', label: 'Dígitos Hora', defaultColor: '#18181b' },
      { key: 'accent', label: 'Acento Amarillo', defaultColor: '#eab308' }
    ]
  },
  {
    id: 5,
    name: 'Aurora Fluid Glass',
    category: 'Glassmorphism / Neón',
    description: 'Elegante cristal esmerilado con ondas de luz ambiental aurora boreal en degradado fluido.',
    defaultColors: {
      bg: '#09090b',
      text: '#ffffff',
      glow1: '#ec4899',
      glow2: '#8b5cf6',
      glow3: '#3b82f6'
    },
    fontOptions: [
      { id: 'syne', label: 'Syne Bold', fontFamily: "'Syne', sans-serif" },
      { id: 'orbitron', label: 'Orbitron Tech', fontFamily: "'Orbitron', sans-serif" }
    ],
    defaultFont: 'syne',
    colorFields: [
      { key: 'bg', label: 'Fondo Profundo', defaultColor: '#09090b' },
      { key: 'text', label: 'Dígitos', defaultColor: '#ffffff' },
      { key: 'glow1', label: 'Aurora Rosa', defaultColor: '#ec4899' },
      { key: 'glow2', label: 'Aurora Violeta', defaultColor: '#8b5cf6' }
    ]
  },
  {
    id: 6,
    name: 'Zenith Solar Monolith',
    category: 'Lujo / Arquitectura',
    description: 'Monolito de obsidiana con indicador de ciclo solar/lunar y tipografía serif de alta costura.',
    defaultColors: {
      bg: '#050508',
      text: '#fdfbf7',
      gold: '#d4af37',
      box: '#0f1015'
    },
    fontOptions: [
      { id: 'playfair', label: 'Playfair Display', fontFamily: "'Playfair Display', serif" },
      { id: 'cinzel', label: 'Cinzel Roman', fontFamily: "'Cinzel', serif" }
    ],
    defaultFont: 'playfair',
    colorFields: [
      { key: 'bg', label: 'Fondo Obsidian', defaultColor: '#050508' },
      { key: 'text', label: 'Dígitos Serif', defaultColor: '#fdfbf7' },
      { key: 'gold', label: 'Oro Zenith', defaultColor: '#d4af37' },
      { key: 'box', label: 'Panel Central', defaultColor: '#0f1015' }
    ]
  },
  {
    id: 7,
    name: 'Smartwatch OLED Ultra',
    category: 'Smartwatch / Modular',
    description: 'Pantalla inteligente modular OLED con anillos de actividad, frecuencia cardíaca pulsante, batería y widgets meteorológicos.',
    defaultColors: {
      bg: '#000000',
      time: '#ffffff',
      ringActivity: '#ff2453',
      ringExercise: '#a3e635',
      ringStand: '#00f2fe',
      accent: '#38bdf8'
    },
    fontOptions: [
      { id: 'syne', label: 'Syne Modern', fontFamily: "'Syne', sans-serif" },
      { id: 'orbitron', label: 'Orbitron Tech', fontFamily: "'Orbitron', sans-serif" },
      { id: 'bebas', label: 'Bebas Neue', fontFamily: "'Bebas Neue', sans-serif" }
    ],
    defaultFont: 'syne',
    colorFields: [
      { key: 'bg', label: 'Fondo OLED', defaultColor: '#000000' },
      { key: 'time', label: 'Dígitos Hora', defaultColor: '#ffffff' },
      { key: 'ringActivity', label: 'Anillo Calorías (Rojo)', defaultColor: '#ff2453' },
      { key: 'ringExercise', label: 'Anillo Ejercicio (Verde)', defaultColor: '#a3e635' },
      { key: 'ringStand', label: 'Anillo Movimiento (Cyan)', defaultColor: '#00f2fe' },
      { key: 'accent', label: 'Complicaciones & Pulso', defaultColor: '#38bdf8' }
    ]
  },
  {
    id: 8,
    name: 'Qlocktwo Español',
    category: 'Tipográfico / Arte',
    description: 'Reloj tipográfico de matriz de letras en español que ilumina las palabras exactas de la hora sin fórmula convencional.',
    defaultColors: {
      bg: '#0b0c10',
      digit: '#ffffff',
      inactive: 'rgba(255, 255, 255, 0.15)'
    },
    fontOptions: [
      { id: 'pacifico', label: 'Pacifico (Cursiva Fluida)', fontFamily: "'Pacifico', cursive" },
      { id: 'caveat', label: 'Caveat (Manuscrita Elegante)', fontFamily: "'Caveat', cursive" },
      { id: 'shortstack', label: 'Short Stack (Manuscrita Casual)', fontFamily: "'Short Stack', cursive" },
      { id: 'share', label: 'Share Tech Mono', fontFamily: "'Share Tech Mono', monospace" },
      { id: 'playfair', label: 'Playfair Display (Elegante)', fontFamily: "'Playfair Display', serif" }
    ],
    defaultFont: 'pacifico',
    colorFields: [
      { key: 'bg', label: 'Fondo Pantalla', defaultColor: '#0b0c10' },
      { key: 'digit', label: 'Letras Iluminadas', defaultColor: '#ffffff' },
      { key: 'inactive', label: 'Letras en Reposo', defaultColor: 'rgba(255, 255, 255, 0.15)' }
    ]
  },
  {
    id: 9,
    name: 'Neon Sign Atelier',
    category: 'Neón / Anuncio',
    description: 'Rótulo de neón auténtico con tubos delgados de gas noble, soporte de acrílico con fijaciones y sutil parpadeo eléctrico.',
    defaultColors: {
      bg: '#040406',
      neon: '#ff2d55'
    },
    fontOptions: [
      { id: 'dancing', label: 'Dancing Script (Cursiva de Neón)', fontFamily: "'Dancing Script', cursive" },
      { id: 'gruppo', label: 'Gruppo (Neón Minimal Delgado)', fontFamily: "'Gruppo', sans-serif" },
      { id: 'sacramento', label: 'Sacramento (Trazo de Tubo Fino)', fontFamily: "'Sacramento', cursive" },
      { id: 'monoton', label: 'Monoton (Multi-Tubo Retro)', fontFamily: "'Monoton', cursive" },
      { id: 'syncopate', label: 'Syncopate (Neón Geométrico)', fontFamily: "'Syncopate', sans-serif" },
      { id: 'megrim', label: 'Megrim (Neón Futurista)', fontFamily: "'Megrim', cursive" }
    ],
    defaultFont: 'dancing',
    colorFields: [
      { key: 'bg', label: 'Fondo Pared / Estudio', defaultColor: '#040406' },
      { key: 'neon', label: 'Color Tubo Neón & Glow', defaultColor: '#ff2d55' }
    ]
  },
  {
    id: 10,
    name: 'Casio Digital Chrono',
    category: 'Retro Digital / Casio',
    description: 'Auténtico reloj digital estilo Casio vintage con cristal líquido LCD, días de la semana, bisel octogonal y dígitos segmentados.',
    defaultColors: {
      bg: '#090a0f',
      case: '#181920',
      lcdBg: '#95ad90',
      lcdDark: '#141c14',
      lcdGhost: 'rgba(20, 28, 20, 0.12)',
      accentLine: '#3b82f6',
      goldLine: '#eab308'
    },
    colorFields: [
      { key: 'bg', label: 'Fondo Pantalla', defaultColor: '#090a0f' },
      { key: 'case', label: 'Caja del Reloj', defaultColor: '#181920' },
      { key: 'lcdBg', label: 'Cristal Líquido LCD', defaultColor: '#95ad90' },
      { key: 'lcdDark', label: 'Dígitos LCD Activos', defaultColor: '#141c14' }
    ]
  }
];

export const STORAGE_KEY_CONFIG = 'studio_clock_config_v2';
