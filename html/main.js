
'use strict';


var key = '998620459698cbed635bcd3797523a75';
var lastfm = 'http://ws.audioscrobbler.com/2.0/?api_key=' + key + '&format=json';

var app = angular.module("lastfmapp", ['ui.bootstrap','ngRoute']);
 

/*.config(function($routeProvider,$locationProvider){
console.log("inside")
$routeProvider
.when('/',{templateUrl:'Tempaltes/indexTest.html'})
.when("/artists/:name", {
  templateUrl:'artists.html',
   controller:"artistController"})
.otherwise({
  redirectTo:"/"
})
});*/


 app.controller("SearchCtrl",function($scope, $http) {
  $scope.details=[];
  $scope.artistInfo=[];
  
        $scope.$watch('search', function() {
      fetch();
    });

 function fetch() {

 $scope.totalItems=100;
  $scope.currentPage = 1;
  $scope.pageSize = 5;
    
        var url = 'http://ws.audioscrobbler.com/2.0/';
        var params = {
            method: 'geo.getTopArtists',
            api_key: '998620459698cbed635bcd3797523a75',
            country:  $scope.search,
            limit:'20',
            format: 'json'
        };
         $http.get(url, { params: params })
            .then(function (data) {
                $scope.details = data.data.topartists.artist;
                 $scope.totalItems = $scope.details.length;
                console.log(data || "Request success");
                console.log(data || $scope.details);
            }
           /* .error(function (data, status) {
                $scope.error="Please type country Name";
                console.log(data || "Request failed");
                console.log(status);
            }*/);
            
 }

       
        
        $scope.select = function() {
        console.log("try" +this.keywords);
    }
       
    });

 // pagination
app.filter('pagination', function () {
  return function (data, start) {
   return data.slice(start);
  }
});


////////artistController controller
app.config(function($routeProvider){
console.log("inside")

$routeProvider

.when('/artists/:name', {
  templateUrl:'Tempaltes/artists.html',
   controller:"artistController"})
.otherwise({
  redirectTo:"/"
})
});

app.controller("artistController",function($scope, $http,$routeParams) {
  console.log("inside2222")
  $scope.artistInfo=[];
      $scope.$watch('artistname', function() {
      fetch();
    });

 function fetch() {
       var url = 'http://ws.audioscrobbler.com/2.0/';
        var params = {
            method: 'artist.getInfo',
            api_key: '998620459698cbed635bcd3797523a75',
            artist:  $routeParams.name,
            format: 'json'
        };
         $http.get(url, { params: params })
            .then(function (data) {
                $scope.artistInfo = data.data.artist.bio.summary;
                console.log(data || $scope.details);
                
            }
            /*.error(function (data, status) {
                $scope.error="Please type country Name";
                console.log(data || "Request failed");
                console.log(status);
            }*/);
            
 }

       
       
    });

