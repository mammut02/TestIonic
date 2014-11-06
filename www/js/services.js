angular.module('starter.services', ['firebase'])

/**
 * A simple example service that returns some data.
 */
    .factory('Users', function ($firebase, FIREBASE_URL){
        // Might use a resource here that returns a JSON array

        var ref = new Firebase(FIREBASE_URL);
        var users = $firebase(ref.child('users')).$asArray();

        // Some fake testing data
        /*var friends = [
         { id: 0, name: 'Scruff McGruff' },
         { id: 1, name: 'G.I. Joe' },
         { id: 2, name: 'Miss Frizzle' },
         { id: 3, name: 'Ash Ketchum' }
         ];*/

        return {
            all: function () {
                return users;
            },
            get: function(userId){
                return $firebase(ref.child('users').child(userId)).$asObject();
            },
            create: function(user){
                console.log(user);
                return users.$add(user).then(function(userRef){
                    return userRef;
                });
            },
            delete: function(user){
                return users.$remove(user);
            }
        }
    });
