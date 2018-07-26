
        var myApp = angular.module('myApp', ['ngRoute'])

            //ng-route config
            .config(function ($routeProvider, $locationProvider){
              $routeProvider
                .when('/home', {
                  templateUrl: 'default.html',
                })
                .when('/contact-info/:contact_index', {
                  templateUrl: 'contact_info.html',
                  controller: 'contactInfoCtrl'
                })
                .when('/add new contact', {
                  templateUrl: 'contact_form.html',
                  controller: 'addContactCtrl'
                })
                .when('/edit/:contact_index', {
                  templateUrl: 'contact_form.html',
                  controller: 'editContactCtrl'
                })
                .otherwise({redirectTo: '/home'});
            })

            // controllers
            .controller('navCtrl', function ($scope) {
              $scope.nav = {
                navItems: ['add new contact'],
                selectedIndex: 0,
                navClick: function ($index) {
                  $scope.nav.selectedIndex = $index;
                }
              };
            })

            .controller('homeCtrl', function ($scope, ContactService){
              $scope.contacts = ContactService.getContacts();

              $scope.removeContact = function (item) {
                var index = $scope.contacts.indexOf(item);
                $scope.contacts.splice(index, 1);
                $scope.removed = 'Contact successfully removed.';
              };

            })

            .controller('contactInfoCtrl', function ($scope, $routeParams){
              var index = $routeParams.contact_index;
              $scope.currentContact = $scope.contacts[index];
            })

            .controller('addContactCtrl', function ($scope, $location) {
              //needed to show the correct button on the contact form
              $scope.path = $location.path();

              $scope.addContact = function () {
                $scope.currentContact.url = './assets/img/faces/card-profile2-square.jpg'; //default profile pic
                var contact = $scope.currentContact;
                contact.id = $scope.contacts.length;
                $scope.contacts.push(contact);
              };

            })

            .controller('editContactCtrl', function ($scope, $routeParams){
              $scope.index = $routeParams.contact_index;
              $scope.currentContact = $scope.contacts[$scope.index];
            })

            // directives
            .directive('contact', function () {
              return {
                restrict: 'E',
                replace: true,
                templateUrl: 'index.html'
              }
            })

            // services
            .factory('ContactService', [function () {
              var factory = {};

              factory.getContacts = function () {
                return contactList;
              }

              // contact list, usually would be a separate database
              var contactList = [
                {id: 0, name: 'Ned Stark', address: '5842 HILLCREST RD', email: 'ned@winterfell.com', phone: '123-456-7890', url: './assets/img/faces/card-profile1-square.jpg'},
                {id: 1, name: 'Jane Greyjoy', address: '2525 W ANLKLAM RD', email: 'jgreyjoy@winterfell.com', phone: '585-798-7460', url: './assets/img/faces/avatar.jpg'},
                {id: 2, name: 'Juan Perez', address: '123 MAIN ST', email: 'jperez@winterfell.com', phone: '631-749-7070', url: './assets/img/faces/marc.jpg'},
                {id: 3, name: 'Christian Snow', address: '7894 CYPRESS RD', email: 'csnow@castleblack.com', phone: '123-746-7890', url: './assets/img/faces/christian.jpg'},
                {id: 4, name: 'Aris Almonte', address: '7458 CLEVELAND RD', email: 'waterdancer@winterfell.com', phone: '123-456-7890', url: './assets/img/faces/card-profile4-square.jpg'},
              ];

              return factory;
            }]);