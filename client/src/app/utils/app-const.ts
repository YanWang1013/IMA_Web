
export class AppConst {
    public static readonly SERVER_URL = {
        REGISTER: '/users/register',
        LOGIN: '/users/login',
        SOCIAL_LOGIN: '/users/social_login',
        USER: '/users',
        PROFILE: '/profile',
        FORGETPASSWORD: '/users/forgot_password',
        CHANGEPASSWORD: '/users/change_password',
        ALLCATEGORY: '/categories',
        CONTESTANTS: '/contestants',
        HIGHEST_VOTES: '/contestants/highest_votes',
        HIGHEST_VOTES_LIST: '/contestants/highest_votes_list',
        RECENT_WINNER: '/contestants/recent_winner',
        ADVERTISEMENTS: '/sponsors',
        PRODUCTS: '/products',
        PRODUCT: '/product',
        ATTACHMENTS: '/attachments',
        SETTINGS: '/settings?is_web=true',
        TRANSACTIONS: '/transactions',
        VOTEPACKAGES: '/vote_packages',
        VOTEPACKAGE: '/vote_package',
        CONTEST: '/contest',
        FUND: '/fund',
        PAYMENT_GATEWAYS: '/payment_gateways',
        SUBSCRIPTION: '/purchase/subscription/1',
        VOTE_PURCHASE: '/purchase/vote_package/',
        USER_CATEGORY: '/user_category/',
        INSTANT_VOTE_PURCHASE: '/purchase/contest/',
        CART: '/cart',
        OFFLINECART: '/offline/cart',
        CART_PURCHASE: '/purchase/cart',
        USER_ADDRESS: '/user_address',
        INSTANT_WINNER: '/instant_vote',
        PAGES: '/pages',
        USER_IMAGE: '/user_image',
        SIZES: '/sizes',
        TICKETS: '/tickets',
        LOGOUT: '/users/logout',
        CONTACTUS: '/contactus',
        DASHBOARD: '/admin/dashboard',
    };

    public static readonly NON_AUTH_SERVER_URL = [
        '/users/register',
        '/users/login',
        '/users/forgot_password',
        '/change_password',
        '/categories',
        '/contestants',
        '/advertisements',
        '/settings?is_web=true',
        '/contestants/highest_votes',
        '/contestants/recent_winner',
        '/pages',
        '/pages/aboutus',
        '/pages/term-and-conditions',
        '/pages/privacy',
        '/pages/how-it-works',
        '/pages/aup',
        '/pages/faq',
        '/vote_packages',
        '/tickets'
    ];

    public static readonly SERVICE_STATUS = {
        SUCCESS: 0,
        FAILED: 1
    };

    public static readonly ROLE = {
        ADMIN: 1,
        USER: 2,
        CONTESTANT: 3,
        COMPANY: 4
    };

    public static readonly MONTH_NAMES = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
    ];

    public static readonly WEEK_DAYS = [
        'Sun',
        'Mon',
        'Tue',
        'Wed',
        'Thu',
        'Fri',
        'Sat'
    ];
}
