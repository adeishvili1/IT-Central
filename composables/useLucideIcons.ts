import {
  Monitor,
  Package,
  Lock,
  Wrench,
  ClipboardList,
  Check,
  UserPlus,
  MoreHorizontal,
  Search,
  X,
  Plus,
  ChevronRight,
  Home,
  FileText,
  CheckCircle2,
  Users,
  BarChart3,
  Settings,
  LogOut,
  Moon,
  Sun,
  Bell,
  User,
  Menu,
  ChevronDown,
  AlertCircle,
  GripVertical,
  Info,
  Eye,
  Edit,
  Trash2,
  Filter,
  Download,
  Send,
  Calendar,
  MapPin,
  Clock,
  Zap
} from '@lucide/vue'

export const useLucideIcons = () => {
  // Category icons mapping
  const categoryIcons = {
    hardware: Monitor,
    software: Package,
    access: Lock,
    support: Wrench,
    other: ClipboardList
  }

  // Icon sizes (in pixels for lucide props)
  const sizes = {
    xs: 14,
    sm: 18,
    md: 20,
    lg: 24,
    xl: 32
  }

  // Colors for categories
  const categoryColors = {
    hardware: '#2563eb',    // blue
    software: '#a855f7',    // purple
    access: '#16a34a',      // green
    support: '#ea580c',     // orange
    other: '#64748b'        // slate
  }

  // Icon style classes
  const iconStyles = {
    default: 'transition-all duration-200',
    hover: 'hover:scale-110',
    active: 'scale-95'
  }

  return {
    // Icons
    categoryIcons,
    // Utility icons
    Check,
    UserPlus,
    MoreHorizontal,
    Search,
    X,
    Plus,
    ChevronRight,
    Home,
    FileText,
    CheckCircle2,
    Users,
    BarChart3,
    Settings,
    LogOut,
    Moon,
    Sun,
    Bell,
    User,
    Menu,
    ChevronDown,
    AlertCircle,
    GripVertical,
    Info,
    Eye,
    Edit,
    Trash2,
    Filter,
    Download,
    Send,
    Calendar,
    MapPin,
    Clock,
    Zap,
    // Sizes & colors
    sizes,
    categoryColors,
    iconStyles
  }
}
