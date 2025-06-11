import { SidebarMenu } from '../interfaces/sidebar-menu.interface';


export const MENU_WEB: SidebarMenu[] = [
  {
    id: 1,
    menu_th: 'หน้าหลัก',
    menu_en: 'Home',
    menu_detail: 'แสดงยอดขาย รายงาน และสรุปภาพรวมของระบบ',
    icon: 'pi-chart-bar',
    router: '/dashboard',
    code: 'HOME'
  },
  {
    id: 2,
    menu_th: 'สินค้า',
    menu_en: 'Products',
    menu_detail: 'จัดการรายการสินค้าและราคาขาย',
    icon: 'pi-box',
    router: '/products',
    code: 'PRODUCTS'
  },
  {
    id: 3,
    menu_th: 'หมวดหมู่สินค้า',
    menu_en: 'Categories',
    menu_detail: 'จัดการหมวดหมู่สินค้าเพื่อความเป็นระเบียบ',
    icon: 'pi-tags',
    router: '/categories',
    code: 'CATEGORIES'
  },
  {
    id: 4,
    menu_th: 'ลูกค้า',
    menu_en: 'Customers',
    menu_detail: 'จัดการข้อมูลลูกค้าและประวัติการซื้อ',
    icon: 'pi-user',
    router: '/customers',
    code: 'CUSTOMERS'
  },
  {
    id: 5,
    menu_th: 'การขาย',
    menu_en: 'Sales',
    menu_detail: 'บันทึกการขายสินค้าและออกใบเสร็จ',
    icon: 'pi-shopping-cart',
    router: '/sales',
    code: 'SALES'
  },
  {
    id: 6,
    menu_th: 'การชำระเงิน',
    menu_en: 'Payments',
    menu_detail: 'ติดตามสถานะการชำระเงินของลูกค้า',
    icon: 'pi-credit-card',
    router: '/payments',
    code: 'PAYMENTS'
  },
  {
    id: 7,
    menu_th: 'คลังสินค้า',
    menu_en: 'Inventory',
    menu_detail: 'ตรวจสอบสต๊อกสินค้าและปรับยอด',
    icon: 'pi-database',
    router: '/inventory',
    code: 'INVENTORY'
  },
  {
    id: 8,
    menu_th: 'รายงาน',
    menu_en: 'Reports',
    menu_detail: 'ดูรายงานการขาย กำไร และสินค้าเคลื่อนไหว',
    icon: 'pi-file',
    router: '/reports',
    code: 'REPORTS'
  },
  {
    id: 9,
    menu_th: 'ผู้ใช้งาน',
    menu_en: 'Users',
    menu_detail: 'จัดการบัญชีพนักงานผู้ใช้งานระบบ',
    icon: 'pi-users',
    router: '/user',
    code: 'USERS'
  },
  {
    id: 10,
    menu_th: 'สิทธิ์การใช้งาน',
    menu_en: 'Roles',
    menu_detail: 'กำหนดบทบาทและสิทธิ์การเข้าถึงเมนูต่าง ๆ',
    icon: 'pi-verified',
    router: '/role',
    code: 'ROLES'
  }
];
