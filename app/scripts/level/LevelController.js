'use strict'

angular.module('serinaApp').controller('LevelCtrl', function ($rootScope, $scope, $routeParams, DataAccessor, Breadcrumb) {
  $rootScope.breadcrumb = Breadcrumb.init($routeParams.language.toUpperCase(), '/language/' + $routeParams.language.toLowerCase())
  var originatorEv

  var getListGroupsAndTranslations = function (content, levels) {
    $scope.listGroups = []
    $scope.listTranslations = []

    if (!angular.isUndefined(levels)) {
      levels = levels.replace(/\//g, '.')
      content = eval('content.' + levels)
    }

    angular.forEach(content, function (translation, key) {
      if (angular.isObject(translation)) {
        $scope.listGroups.push(key)
      } else {
        $scope.listTranslations.push({ key: key, value: translation, save: true, modified: false, nbModified: 0 })
      }
    })
  }

  $scope.btnBack = function () {
    window.history.back()
  }

  $scope.openMenu = function ($mdMenu, ev) {
    originatorEv = ev
    $mdMenu.open(ev)
  }

  $scope.currentLanguage = $routeParams.language.toLowerCase()
  DataAccessor.openLanguage($scope.currentLanguage).then(function (response) {
    getListGroupsAndTranslations(response.data, $routeParams.levels)
    $rootScope.breadcrumb = Breadcrumb.build($rootScope.breadcrumb, $scope.currentLanguage, $routeParams.levels)
  }, function (response) {
    console.error('Error on open language ' + $scope.currentLanguage, response)
  })
})