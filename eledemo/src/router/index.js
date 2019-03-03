import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/linhao/cityList/Home.vue'
import Citysearch from '../components/linhao/citySearch/Citysearch.vue'
import Merchant from '../components/linhao/merchants/Merchant.vue'
import Takeout from '../components/linhao/merchants/children/Takeout.vue'
import Search from '../components/linhao/merchants/children/Search.vue'
import Food from '../components/linhao/food/Food.vue'
import Profile from '../components/linhao/merchants/children/profile/Profile.vue'
import Order from '../components/linhao/merchants/children/Order.vue'
import Login from '../components/linhao/merchants/children/profile/Login.vue'
import Download from '../components/linhao/merchants/children/profile/Download.vue'
import Info from '../components/linhao/merchants/children/profile/info/Info.vue'
import Balance from '../components/linhao/merchants/children/profile/Balance.vue'
import Points from '../components/linhao/merchants/children/profile/Points.vue'
import Benefit from '../components/linhao/merchants/children/profile/Benefit.vue'
import Hbhistory from '../components/linhao/merchants/children/profile/Hbhistory'
import Setusername from '../components/linhao/merchants/children/profile/info/setusername/Setusername.vue'
import Address from '../components/linhao/merchants/children/profile/info/address/Address.vue'
import Add from '../components/linhao/merchants/children/profile/info/address/children/add/Add.vue'
import AddDetail from '../components/linhao/merchants/children/profile/info/address/children/add/children/addDetail/AddDetail.vue'
import Exchange from '../components/linhao/merchants/children/profile/Exchange'
import Shop from '../components/haichen/shop/shop.vue'
// import MyShops from '../components/linhao/shop/myShops.vue'
import FoodDetail from '../components/haichen/shop/foodDetail.vue'
import Vipcard from '../components/haichen/vipcard/vipcard.vue'
import VipDescription from '../components/haichen/vipcard/vipDescription.vue'
import InvoiceRecord from '../components/haichen/vipcard/invoiceRecord.vue'
import useCart from '../components/haichen/vipcard/useCard.vue'
import Service from '../components/haichen/service/service.vue'
import QuestionDetail from '../components/haichen/service/questionDetail.vue'
import Commend from '../components/haichen/commend/commend.vue'
// import ConfirmOrder from '../components/hainuo/ConfirmOrder.vue'
import ConfirmOrder from '../components/hainuo/ConfirmOrder.vue'
import ChooseAddress from '../components/hainuo/ChooseAddress.vue'
import Forget from '../components/hainuo/forget.vue'
import Remark from '../components/hainuo/remark.vue'
//暂时配置
import Indent from '../components/hainuo/indent.vue'
import Indentode from '../components/hainuo/indentode.vue'
import Invoice from '../components/hainuo/invoice.vue'
import Payment from '../components/hainuo/payment.vue'
import Register from '../components/hainuo/register.vue'
import Searchcc from '../components/hainuo/searchcc.vue'







Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
      component: Home,
      redirect: "/home"
    },
    {
      path: '/',
      component: Home,
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/city/:id',
      name: 'city',
      component: Citysearch
    },
    {
      path: "/forget",
      name: 'forget',
      component: Forget
    },
    {
      path: "/confirmOrder",
      name: "confirmOrder",
      component: ConfirmOrder,
      children: [
        {
          path: "/confirmOrder/chooseAddress",
          name: "chooseAddress",
          component: ChooseAddress
        },
        {
          path: "/confirmOrder/remark",
          name: "remark",
          component: Remark
        }
      ]
    },
    {
      path: '/merchant',
      name: 'merchant',
      component: Merchant,
      redirect: "/take_out",
      children: [{
          path: '/take_out',
          name: 'take_out',
          component: Takeout
        },
        {
          path: '/search',
          name: 'search',
          component: Search
        },
        {
          path: '/order',
          name: 'order',
          component: Order
        },
        {
          path: '/profile',
          name: 'profile',
          component: Profile,
          children: [{
            path: '/profile/info',
            name: 'info',
            component: Info,
            children: [{
                path: "/profile/info/setusername",
                name: "setusername",
                component: Setusername
              },
              {
                path: "/profile/info/address",
                name: "address",
                component: Address,
                children: [{
                  path: "/profile/info/address/add",
                  name: "add",
                  component: Add,
                  children: [{
                    path: "/profile/info/address/add/addDetail",
                    name: "addDetail",
                    component: AddDetail
                  }]
                }]
              }
            ]
          }]
        },

      ]
    },
    {
      path: "/food",
      name: "food",
      component: Food
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/download",
      name: "download",
      component: Download
    },
    {
      path: "/balance",
      name: "balance",
      component: Balance
    },
    {
      path: "/points",
      name: "points",
      component: Points
    },
    {
      path: "/service",
      name: "service",
      component: Service,
      children: [{
        path: "/service/questionDetail",
        name: "questionDetail",
        component: QuestionDetail
      }]
    },
    {
      path: "/vipcard",
      name: "vipcard",
      component: Vipcard,
      children: [{
          path: "/vipcard/vipDescription",
          name: "vipDescription",
          component: VipDescription
        },
        {
          path: "/vipcard/useCart",
          name: "useCard",
          component: useCart
        },
        {
          path: "/vipcard/invoiceRecord",
          name: "invoiceRecord",
          component: InvoiceRecord
        }
      ]
    },
    {
      path: "/shop",
      name: "shop",
      component: Shop,
      children: [{
        path: "/shop/foodDetail",
        name: "foodDetail",
        component: FoodDetail
      }]
    },
    // {
    //   path: "/myshops",
    //   name: "myshops",
    //   component: MyShops
    // },
    {
      path: "/benefit",
      name: "benefit",
      component: Benefit,
      children: [{
          path: '/benefit/hbHistory',
          name: "hbHistory",
          component: Hbhistory
        },
        {
          path: "/benefit/exchange",
          name: "exchange",
          component: Exchange
        },
        {
          path: "/benefit/commend",
          name: "commend",
          component: Commend
        }
       
      ]
    },
     //暂时配置
     {
      path: "/indent",
      name: "indent",
      component: Indent
    },
    {
      path: "/indentode",
      name: "indentode",
      component: Indentode
     
    },
    {
      path: "/invoice",
      name: "invoice",
      component: Invoice
    },
    {
      path: "/payment",
      name: "payment",
      component: Payment
     
    },
    {
      path: "/register",
      name: "register",
      component: Register
      
    },
    {
      path: "/searchcc",
      name: "searchcc",
      component: Searchcc
      
    }
  ]
})
