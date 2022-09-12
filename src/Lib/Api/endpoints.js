const endpoints = {
    postComment: {url:'/comments/', method:'POST'},
    editComment: {url:'/comments/edit/', method:'POST'},
    removeComment: {url: '/comments/remove/', method:'POST'},
    createPost:{url:'/posts/', method:'POST'},
    getPost:{url:'/posts/', method:'GET'},
    editPost:{url:'/posts/edit/', method:'POST'},
    removePost:{url:'/posts/remove/', method:'POST'},
    getSubPosts:{url:'/posts/subforum/', method:'GET'},
    getUser:{url:'/users/', method:'GET'},
    editUser:{url:'/users/edit/', method:'POST'},
    getProfileComments:{url:'/comments/profile/', method:'GET'},
    verifyAccount:{url:'/users/verify', method:"POST"},
    findUser:{url:'/users/dashboard/', method:'GET'},
    removeUser:{url: '/users/remove/', method:'POST'},
    createSub:{url:'/subforum/createnewsub/', method:'POST'},
    getSub:{url:'/subforum/', method:'GET'},
    getComments:{url:'/comments/post/', method:'GET'},
    upVote:{url:'/posts/upvote/', method:"POST"},
    downVote:{url:'/posts/downvote/', method:"POST"},
    forgotPassword:{url:'/forgot-password-request',method:'POST'},
    resetPassword: { url: '/users/forgot-password', method: 'POST' },
    editSub:{url:'/subforum/subId/', method:"POST"},
    findSubByName:{url:'/subforum/subName/', method:"GET"},
    editSubForum:{url:'/subforum/editSub/',method:"POST"},
    getUserPosts:{url:'/posts/userPosts/',method:"GET"},
    getForumPosts:{url:'/subforum/subId/', method:"GET"}


    
}
export default endpoints;