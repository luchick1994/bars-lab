var shopApp = angular.module('shopApp', []);

shopApp.controller('shopCtrl', function ($scope) {
  $scope.shops = [
    {'name': '15.6" [Home] Ноутбук DNS (0164783) (HD)',
     'price': '20 490 руб.',
 	  'imgurl': 'img/1.jpg',
 		'incard': 0},
    {'name': '17.3" [Gamer] Ноутбук DNS (0801153) (HD+)',
     'price': '33 990 руб.',
 	  'imgurl': 'img/2.jpg',
 	  'incard': 0},
 	  {'name': 'Компьютер DNS Prestige XL [0800795]',
     'price': '59 990 руб.',
 	  'imgurl': 'img/3.jpg',
 	  'incard': 0},
  ];

  $scope.addToCard = function(shop){
  	shop.incard = 1;
  }

  $scope.removeFromCard = function(shop){
  	shop.incard = 0;
  }
});
