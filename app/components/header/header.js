(function() {
    'use strict';

    angular
        .module('app.header')
        .controller('HeaderController', HeaderController);

    function HeaderController($state, authservice, session, logger) {
        var vm = this;

        vm.contentMenu = [
            {title: 'APIs', link: 'api-list'},
            {title: 'Reviews', link: 'review-list'},
            {title: 'Reviewers', link: 'user-list'}];
        vm.createMenu = [
            {title: 'New API', link: 'api-item-new'},
            {title: 'New Review', link: 'review-item-new'}];
        vm.userMenu = [
            {title: 'My profile', link: 'user-profile-edit'},
            {title: 'My reviews', link: 'user-review-list'}];
        vm.authservice = authservice;
        vm.session = session;
        vm.logout = logout;

        function logout() {
            authservice.logout()
                .then(logoutSuccessful, logoutFailed);

            function logoutSuccessful() {
                $state.go('home');
            }

            function logoutFailed() {
            }
        }
    }

})();
