angular.module('starter.controllers', [])

    .controller('PeopleCtrl', function($scope, people, $ionicLoading){
        $scope.people = people.list;

        $scope.addPerson = function(){
            people.add().then(function(){
                $scope.$broadcast('scroll.refreshComplete');
            })
        };

        $ionicLoading.show({
            template: '<i class="ion-loading-c"></i><br>Loading...'
        });

        people.ready.then(function(){
            $ionicLoading.hide();
        })
    })

    .controller('PersonCtrl', function($scope, person, people, $ionicActionSheet){
        $scope.person = person;

        $scope.deletePerson = function(){
            $ionicActionSheet.show({
                destructiveText: 'Delete ' + person.name.first,
                cancelText: 'Cancel',
                destructiveButtonClicked: function(){
                    people.list.splice(people.list.indexOf(person), 1);
                    window.history.back();
                }
            })
        }
    })

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
