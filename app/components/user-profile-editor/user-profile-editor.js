(function() {
    'use strict';

    angular
        .module('app.userProfileEditor')
        .controller('UserProfileEditorController', UserProfileEditorController);

    /** @ngInject */
    function UserProfileEditorController($state, dialogs, userservice, session, toastr, logger) {
        var vm = this;

        vm.showChangePasswordDialog = showChangePasswordDialog;
        vm.submit = submitUserProfile;
        vm.resetForm = resetForm;
        vm.currentUser = angular.copy(session.getCurrentUser());

        function showChangePasswordDialog() {
            var dlg = dialogs.create(
                '/app/components/user-profile-editor/change-password-dialog.html',
                'ChangePasswordDialogController',
                {});
            dlg.result.then(updateUserProfile, cancel);

            function updateUserProfile(newPassword) {
                vm.currentUser.new_password = newPassword;
                userservice.update(vm.currentUser)
                    .then(changePasswordSuccessful, changePasswordFailed);

                function changePasswordSuccessful(result) {
                    $state.go('login');
                    toastr.success('Password successfully updated!', 'User Profile');
                }

                function changePasswordFailed(error) {
                    toastr.error('Failed to change password. Please try again.');
                }
            }

            function cancel(btn) {
            }
        }

        function submitUserProfile() {
            vm.dataLoading = true;
            logger.log(vm.currentUser);
            userservice.update(vm.currentUser)
                    .then(updateUserProfileSuccessful, updateUserProfileFailed);

            function updateUserProfileSuccessful(result) {
                vm.dataLoading = false;
                toastr.success('Successfully updated!', 'User Profile');
            }

            function updateUserProfileFailed(error) {
                vm.dataLoading = false;
                toastr.error('Failed to update profile. Please try again.');
            }
        }

        function resetForm() {
            vm.currentUser = angular.copy(session.getCurrentUser());
        }
    }
})();
