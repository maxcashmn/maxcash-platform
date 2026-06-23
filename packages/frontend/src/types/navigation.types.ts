export interface NavItem {
  label: string;
  path: string;
  icon?: string;
  children?: NavItem[];
  roles?: string[];
}

export interface SidebarConfig {
  items: NavItem[];
  footer?: NavItem[];
}

export interface BreadcrumbItem {
  label: string;
  path: string;
  isActive?: boolean;
}
