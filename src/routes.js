import Index from "./Pages/Index/Index";
import CourseInfo from "./Pages/CourseInfo/CourseInfo";
import Category from "./Pages/Category/Category";
import ArticleInfo from "./Components/ArticleInfo/ArticleInfo";
import Courses from "./Pages/Courses/Courses";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Articles from "./Pages/Articles/Articles";
import Contact from "./Pages/Contact/Contact";
import Search from "./Pages/Search/Search";
import Session from "./Pages/Session/Session";

import PAdminPrivate from "./Components/Privates/PAdminPrivate";
import Discount from "./Components/AdminPanel/Discount/Discount";

import AdminPanel from "./Pages/AdminPanel/Index"
import Users from "./Pages/AdminPanel/Users/Users";
import AdminCourses from "./Pages/AdminPanel/Courses/Courses"
import Menus from "./Pages/AdminPanel/Menus/Menus";
import AdminArticles from "./Pages/AdminPanel/Articles/Articles";
import AdminCategory from "./Pages/AdminPanel/Category/Category";
import AdminContact from "./Pages/AdminPanel/Contact/Contact"
import AdminSession from "./Pages/AdminPanel/Session/Session"
import AdminComments from "./Pages/AdminPanel/Comments/Comments"
import Offs from "./Pages/AdminPanel/Offs/Offs";
import Draft from "./Pages/Articles/Draft";
import PAdminIndex from './Pages/AdminPanel/Index/Index';
import AdminTickets from "./Pages/AdminPanel/Tickets/AdminTickets";


import UserPanel from './Pages/UserPanel/Index';
import UserPanelIndex from './Pages/UserPanel/Index/Index';
import UserPanelOrders from './Pages/UserPanel/Orders/Orders';
import UserPanelOrdersDetails from './Pages/UserPanel/Orders/OrdersDetails';
import UserPanelCourses from './Pages/UserPanel/Courses/Courses';
import SendTickets from "./Pages/UserPanel/Tickets/SendTickets";
import UserPanelTickets from "./Pages/UserPanel/Tickets/Tickets";
import UserPanelTicketAnswer from "./Pages/UserPanel/Tickets/TicketAnswer";
import UserPanelEditAccount from "./Pages/UserPanel/EditAccount/EditAccount"

const routes=[
    { path: "/", element: <Index /> },
    { path: "/course-info/:courseName", element: <CourseInfo /> },
    { path:"/category-info/:categoryName/:page", element:<Category/>},
    { path:"/article-info/:articleName", element:<ArticleInfo/>},
    { path:"/courses/:page", element:<Courses/>},
    { path:"/articles/:page", element:<Articles/>},
    { path:"/login", element:<Login/>},
    { path:"/register", element:<Register/>},
    {path:"/contact" , element:<Contact/>},
    {path:'/search/:value' , element:<Search/>},
    {path:'/:courseName/:sessionID' , element:<Session/>},




    {path:'/p-admin/*' , 
    element:(
    <PAdminPrivate>
        <AdminPanel/> 

    </PAdminPrivate>
    )
    ,
    children:[
        {path:'', element:<PAdminIndex/>},
        {path:'users', element:<Users/>},
        {path:'courses', element:<AdminCourses/>},
        {path:'menus', element:<Menus/>},
        {path:'articles', element:<AdminArticles/>},
        {path:'articles/draft/:shortName', element:<Draft/>},
        {path:'category', element:<AdminCategory/>},
        {path:'contact', element:<AdminContact/>},
        {path:'session', element:<AdminSession/>},
        {path:'comments', element:<AdminComments/>},
        {path:'Offs', element:<Offs/>},
        {path:'tickets', element:<AdminTickets/>},
        {path:'discount', element:<Discount/>},

    ]

    },

    {path:'/my-account/*',element:<UserPanel/>,
children:[
    {path:'' , element:<UserPanelIndex/>},
    {path:'orders',element:<UserPanelOrders/>},
    {path:'orders/:orderId',element:<UserPanelOrdersDetails/>},
    {path:'buyed',element:<UserPanelCourses/>},
    {path:'send-ticket',element:<SendTickets/>},
    {path:'tickets',element:<UserPanelTickets/>},
    {path:'tickets/answer/:id',element:<UserPanelTicketAnswer/>},
    {path:'editAccount',element:<UserPanelEditAccount/>},
]}
];
export default routes