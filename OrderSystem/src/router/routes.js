
import orderTracking from '../components/orderTracking/orderList'
import login from '../components/login/login'
import Employee from '../components/Employee/Employee.vue'
import NotFound from '../components/404'
import print from '../components/print'
import Home from '../components/Home'
import printIm from '../components/orderTracking/productDetail/printImg.vue'

import quotation from '../components/quotation/quotation'
import quotationDetail from '../components/quotation/quotationDetail/quotationDetail'
import addSupplierQuotation from '../components/quotation/addSupplierQuotation/addSupplierQuotation'

import enquirySheet from '../components/enquirySheet/enquirySheet'
import enquirySheetDetail from '../components/enquirySheet/enquirySheetDetail/enquirySheetDetail'

import Customer from '../components/Customer/Customer'
import CustomerDetail from '../components/Customer/CustomerDetail'

import SupplierList from '../components/supplier/supplierList'
import SupplierDetail from '../components/supplier/supplierDetail/supplierDetail'

import equipment from '../components/equipment/equipment.vue'

import equipmentList from '../components/equipmentList/equipmentList.vue'
import companyProfile from '../components/companyProfile/supplierDetail.vue'

let routes = [
    {
        path: '/',
        component: login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    {
        path: '/Print/:detailinfo',
        component: print,
        name: 'print',
        hidden: true
    },
    {
        path: '/PrintImg',
        component: printIm,
        name: '打印图纸'
    },
    {
        path: '/Track',
        component: Home,
        name: '订单跟踪',
        iconCls: 'el-icon-message',
        children: [
            { path: 'order', component: orderTracking, name: '主页', hidden: true, meta: {authoritys: true} }]
    },
    {
        path: '/Manage',
        component: Home,
        name: '管理',
        children: [
            { path: 'Employee', component: Employee, name: '员工管理', meta: {authoritys: false} },
            { path: 'Customer', component: Customer, name: '客户管理', meta: {authoritys: true} },
            { path: 'Customer/CustomerDetail/:id', component: CustomerDetail, name: '客户管理详情', meta: {authoritys: true} },
            { path: 'equipment', component: equipment, name: '设备管理', meta: {authoritys: true} }
        ]
    },
    {
        path: '/List',
        component: Home,
        name: '列表',
        children: [
            { path: 'equipmentList', component: equipmentList, name: '设备列表', meta: {authoritys: true} }
        ]
    },
    {
        path: '/Quotation',
        component: Home,
        name: '报价需求单',
        iconCls: 'el-icon-message',
        meta: {
          authoritys: 'true'
        },
        children: [
            { path: 'quotation', component: quotation, name: 'quotation', hidden: true, meta: {authoritys: true} },
            { path: 'quotationDetail/:demandNumber', component: quotationDetail, name: 'quotationDetail', hidden: true, meta: {authoritys: true} },
            { path: 'addSupplierQuotation/:demandNumber', component: addSupplierQuotation, name: 'addSupplierQuotation', hidden: true, meta: {authoritys: true} }
        ]
    },
    {
        path: '/EnquirySheet',
        component: Home,
        name: '询价单',
        iconCls: 'el-icon-message',
        meta: {
          authoritys: 'true'
        },
        children: [
            { path: 'enquirySheet', component: enquirySheet, name: 'enquirySheet', meta: {authoritys: true} },
            { path: 'enquirySheetDetail/:inquiryorderid', component: enquirySheetDetail, name: 'enquirySheetDetail', meta: {authoritys: true} }
        ]
    },
    {
        path: '/Supplier',
        component: Home,
        name: '供应商列表',
        iconCls: 'el-icon-message',
        meta: {
          authoritys: 'true'
        },
        children: [
            { path: 'SupplierList', component: SupplierList, name: 'SupplierList', meta: {authoritys: true} },
            { path: 'SupplierDetail/:supplierCode', component: SupplierDetail, name: 'SupplierDetail', meta: {authoritys: false} }
        ]
    },
    {
        path: '/company',
        component: Home,
        name: '公司资料',
        iconCls: 'el-icon-message',
        meta: {
          authoritys: 'true'
        },
        children: [
            { path: 'Profile', component: companyProfile, name: 'Profile', meta: {authoritys: true} }
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
]

export default routes
