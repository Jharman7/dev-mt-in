var app = angular.module('devMtIn');
app.controller('homeCtrl', function ($scope, profileService) {

  $scope.checkForProfile = function () {
    var profileId = JSON.parse(localStorage.getItem('profileId'));

    if (profileId) {
      console.log(profileId);
      profileService.checkForProfile(profileId.profileId)
      .then(function(profile){
        $scope.myProfile = profile.data;
      })
      .catch(function(err) {
        console.error(err);
      })
    }
  }
  $scope.checkForProfile();

  $scope.sortOptions = [{
    display: 'Ascending'
  , value: false
  },
  {
    display: 'Descending'
  , value: true
  }];

  $scope.editing = false;

  // $scope.saveProfile = function (profile) {
  //   console.log('did the thing');
  //   console.log(profile);
  //   localStorage.setItem('profile',JSON.stringify(profile));
  // }
  $scope.saveProfile = function (profile) {
    profileService.saveProfile(profile);
  }

  $scope.deleteProfile = function () {
    profileService.deleteProfile()
    .then(function(deletedProfile){
      localStorage.removeItem('profileId');
      $scope.myProfile={};
    })
    .catch(function (err) {
      console.error(err);
    })
  }

  // $scope.deleteProfile = function() {
  //   localStorage.removeItem('profile');
  //   $scope.myProfile = profileService.checkForProfile();
  // }
});
