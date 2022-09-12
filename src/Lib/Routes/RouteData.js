import Home from '../../Pages/HomePage/Home.js'
import LoginPage from '../../Pages/LoginPage/LoginPage.js'
import Register from '../../Pages/RegisterPage/Register.jsx'
import Header from '../..//Pages/Components/Header/Header.jsx'
import Sub from '../../Pages/SubPage/Sub'
import Posts from '../../Pages/PostsPage/Posts.jsx'
import EditComment from '../../Pages/Components/EditComment/EditComment';

import EditPost from '../../Pages/Components/EditPost/EditPost';
import CreatePost from '../../Pages/CreatePostPage/CreatePost.jsx'
import ProfilePage from '../../Pages/ProfilePage/ProfilePage'
import EditProfile from '../..//Pages/EditProfile/EditProfile'
import VerifyAccountPage from '../../Pages/VerifyAccountPage/VerifyAccountPage.jsx'
import Dashboard from '../../Pages/Dashboard/Dashboard.jsx'
import ForgotPassword from '../../Pages/ForgotPassword/ForgotPassword.jsx'
import ResetPassword from '../../Pages/ResetPasswordPage/ResetPassword.jsx'
import EditSubforumForm from '../../Pages/Components/EditSubforumForm/EditSubforumForm.jsx'

/*
  <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/login' element={<LoginPage />} />
    <Route path='/register' element={<Register />}/>
    <Route path='/subforums/:params' element={<Sub />} />
    <Route path='/subforums/:sub/createPost' element={<CreatePost />} />
    <Route path='/subforums/:name/post/:id' element={<Posts />} />
    <Route path='/editcomments/:id' element={<EditComment />} />
    <Route path='/edit/:id' element={<EditPost />} />
    <Route path='/profile/:id' element={<ProfilePage />} />
    <Route path='/editProfile/:id' element={<EditProfile />} />
  </Routes>
*/
export const routeData = {
    public:[
        {
            path:'/register',
            element:<Register />
        },
        {
            path:'/verify',
            element:<VerifyAccountPage />
        },
        {
            path:'/login',
            element:<LoginPage />
        },
        {
            path:'/forgot-password',
            element:<ForgotPassword />
        },
        {
            path:'/reset-password',
            element:<ResetPassword />
        }
        
        

    ],
    exposed:[
        {
            path:'/',
            element:<Home />
        }
    ],
    admin:[
        {
            path:'/profile/:id',
            element:<ProfilePage />
        },
        {
            path:'/editProfile/:id',
            element:<EditProfile />
        },{ 
            path:'/subforums/:params',
            element:<Sub />

        },
        {
            path:'/subforums/:sub/createPost',
            element:<CreatePost />
        },
        {
            path:'/subforums/:name/post/:id',
            element:<Posts />
        },
        {
            path:'/editcomments/:id',
            element:<EditComment />

        },
        {
            path:'/edit/:id',
            element:<EditPost />

        },
        {
            path:'/dashboard',
            element:<Dashboard />
        },
        {
            path:'/edit/:id',
            element:<EditPost />

        },
        {
            path:'/editSub/:params',
            element:<EditSubforumForm />
        }
       
        

    ],
    user:[
        {
            path:'/profile/:id',
            element:<ProfilePage />
        },
        {
            path:'/editProfile/:id',
            element:<EditProfile />
        },{ 
            path:'/subforums/:params',
            element:<Sub />

        },
        {
            path:'/subforums/:sub/createPost',
            element:<CreatePost />
        },
        {
            path:'/subforums/:name/post/:id',
            element:<Posts />
        },
        {
            path:'/editcomments/:id',
            element:<EditComment />

        },
        {
            path:'/edit/:id',
            element:<EditPost />

        },
        


    ]

}