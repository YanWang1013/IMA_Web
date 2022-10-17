import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared';

const routes: Routes = [
    {
        path: '',
        loadChildren: () =>
            import('./home/home.module').then((m) => m.HomeModule)
    },
    {
        path: 'vote/:username',
        loadChildren: () =>
            import('./purchasevote/purchasevote.module').then(
                (m) => m.PurchasevoteModule
            )
    },
    {
        path: 'vote/:username/:categoryId',
        loadChildren: () =>
            import('./purchasevote/purchasevote.module').then(
                (m) => m.PurchasevoteModule
            )
    },
    {
        path: 'instant_vote/:username',
        loadChildren: () =>
            import('./purchasevote/purchasevote.module').then(
                (m) => m.PurchasevoteModule
            )
    },
    {
        path: 'tickets',
        loadChildren: () =>
            import('./tickets/tickets.module').then((m) => m.TicketsModule)
    },
    {
        path: 'myproducts',
        loadChildren: () =>
            import('./shop/shop.module').then((m) => m.ShopModule)
    },
    {
        path: 'instant_vote_success/:slug',
        loadChildren: () =>
            import('./instant-success/instant-success.module').then(
                (m) => m.InstantSuccessModule
            )
    },
    {
        path: 'vote_success/:slug',
        loadChildren: () =>
            import('./vote-success/vote-success.module').then(
                (m) => m.VoteSuccessModule
            )
    },
    {
        path: 'product-success/:slug',
        loadChildren: () =>
            import('./product-success/product-success.module').then(
                (m) => m.ProductSuccessModule
            )
    },
    {
        path: 'admin',
        loadChildren: () =>
            import('./admin/admin.module').then((m) => m.AdminModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'page/:type',
        loadChildren: () =>
            import('./page/page.module').then((m) => m.PageModule)
    },
    {
        path: 'home',
        loadChildren: () =>
            import('./home/home.module').then((m) => m.HomeModule)
    },
    {
        path: 'login',
        loadChildren: () =>
            import('./login/login.module').then((m) => m.LoginModule)
    },
    {
        path: 'signup',
        loadChildren: () =>
            import('./signup/signup.module').then((m) => m.SignupModule)
    },
    {
        path: 'contestants/:slug',
        loadChildren: () =>
            import('./contestants/contestants.module').then(
                (m) => m.ContestantsModule
            )
    },
    {
        path: 'shop',
        loadChildren: () =>
            import('./shop/shop.module').then((m) => m.ShopModule)
    },
    {
        path: 'shop/:slug',
        loadChildren: () =>
            import('./shopview/shopview.module').then((m) => m.ShopViewModule)
    },
    {
        path: 'advertisers',
        loadChildren: () =>
            import('./advertisers/advertisers.module').then(
                (m) => m.AdvertisersModule
            )
    },
    {
        path: 'profile/:slug/:username',
        loadChildren: () =>
            import('./contestantprofile/contestantprofile.module').then(
                (m) => m.ContestantprofileModule
            )
    },
    {
        path: 'profile/:username',
        loadChildren: () =>
            import('./contestantprofile/contestantprofile.module').then(
                (m) => m.ContestantprofileModule
            )
    },
    {
        path: 'addproduct',
        loadChildren: () =>
            import('./addproduct/addproduct.module').then(
                (m) => m.AddproductModule
            )
    },
    {
        path: 'imalisting',
        loadChildren: () =>
            import('./imalisting/imalisting.module').then(
                (m) => m.ImalistingModule
            )
    },
    {
        path: 'categories',
        loadChildren: () =>
            import('./categories/categories.module').then(
                (m) => m.CategoriesModule
            )
    },
    {
        path: 'forgot-password',
        loadChildren: () =>
            import('./forgotpassword/forgotpassword.module').then(
                (m) => m.ForgotpasswordModule
            )
    },
    {
        path: 'transaction',
        loadChildren: () =>
            import('./transaction/transaction.module').then(
                (m) => m.TransactionModule
            )
    },
    {
        path: 'resend-link',
        loadChildren: () =>
            import('./resendlink/resendlink.module').then(
                (m) => m.ResendlinkModule
            )
    },
    {
        path: 'reset-password',
        loadChildren: () =>
            import('./resetpassword/resetpassword.module').then(
                (m) => m.ResetpasswordModule
            )
    },
    {
        path: 'change-password',
        loadChildren: () =>
            import('./passwordchanged/passwordchanged.module').then(
                (m) => m.PasswordchangedModule
            )
    },
    {
        path: 'view-profile',
        loadChildren: () =>
            import('./viewprofile/viewprofile.module').then(
                (m) => m.ViewprofileModule
            )
    },
    {
        path: 'donate',
        loadChildren: () =>
            import('./donate/donate.module').then((m) => m.DonateModule)
    },
    {
        path: 'edit',
        loadChildren: () =>
            import('./editprofile/editprofile.module').then(
                (m) => m.EditprofileModule
            )
    },
    {
        path: 'cart',
        loadChildren: () =>
            import('./cart/cart.module').then((m) => m.CartModule)
    },
    {
        path: 'myorder',
        loadChildren: () =>
            import('./cart/cart.module').then((m) => m.CartModule)
    },
    {
        path: 'checkout/:type',
        loadChildren: () =>
            import('./checkout/checkout.module').then((m) => m.CheckoutModule)
    },
    {
        path: 'instant-vote',
        loadChildren: () =>
            import('./instantvote/instantvote.module').then(
                (m) => m.InstantvoteModule
            )
    },
    {
        path: 'instant-vote/:winner',
        loadChildren: () =>
            import('./instantvote/instantvote.module').then(
                (m) => m.InstantvoteModule
            )
    },
    {
        path: 'winner',
        loadChildren: () =>
            import('./winner/winner.module').then(
                (m) => m.WinnerModule
            )
    },
    {
        path: 'recent_winner',
        loadChildren: () =>
            import('./recent-winner/recent-winner.module').then(
                (m) => m.RecentWinnerModule
            )
    },
    {
        path: 'judges',
        loadChildren: () =>
            import('./judges/judges.module').then(
                (m) => m.JudgesModule
            )
    },
    {
        path: 'executive-team',
        loadChildren: () =>
            import('./executive-team/executive-team.module').then(
                (m) => m.ExecutiveTeamModule
            )
    },
    {
        path: 'sponsors',
        loadChildren: () =>
            import('./sponsors/sponsors.module').then(
                (m) => m.SponsorsModule
            )
    },
    {
        path: 'contactus',
        loadChildren: () =>
            import('./contactus/contactus.module').then(
                (m) => m.ContactusModule
            )
    },
    {
        path: 'error',
        loadChildren: () =>
            import('./server-error/server-error.module').then(
                (m) => m.ServerErrorModule
            )
    },
    {
        path: 'access-denied',
        loadChildren: () =>
            import('./access-denied/access-denied.module').then(
                (m) => m.AccessDeniedModule
            )
    },
    {
        path: 'not-found',
        loadChildren: () =>
            import('./not-found/not-found.module').then((m) => m.NotFoundModule)
    },
    {path: '**', redirectTo: 'not-found'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
