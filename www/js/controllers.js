angular.module('starter.controllers', [])

    .controller('DashCtrl', function ($scope) {

    })

    .controller('FriendsCtrl', function ($scope, $ionicModal, $ionicListDelegate, Users) {
        $scope.friends = Users.all();

        $scope.edit = function() {
            $ionicListDelegate.showDelete(true);
        };

        $ionicModal.fromTemplateUrl('templates/new-user-form.html', {
            scope: $scope,
            animation: 'slide-in-up',
        }).then(function(modal){
            $scope.modal = modal;
        });

        $scope.newUser = {
            firstname: '',
            lastname: ''
        };

        $scope.submitNewUser = function(){
             Users.create($scope.newUser).then(function(userRef){
                $scope.closeModal();
                $scope.newUser = {
                    firstname: '',
                    lastname: ''
                }
            })
        };

        $scope.delete = function(user){
            Users.delete(user);
        }

        $scope.openModal = function(){
            $scope.modal.show();
        };

        $scope.closeModal = function(){
            $scope.modal.hide();
        };

        $scope.$on('$destroy', function(){
            $scope.modal.remove();
        });

        $scope.$on('modal.hidden', function(){

        });

        $scope.$on('modal.removed', function(){

        });
    })

    .controller('FriendDetailCtrl', function ($scope, $stateParams, Users) {
        $scope.friend = Users.get($stateParams.userId);
    })

    .controller('AccountCtrl', function ($scope) {
    });
