var application = angular.module('mainApp', []);

application.provider('data', function() {
  var greet;
  return {
    setGreeting: function(value) {
      greet = value;
    },
    $get: function() {
      return {
        showDate: function() {
          var date = new Date();
          return greet + " It's " + date.getHours();
        },
        devsshowDate: function() {
          var date = new Date();
          return date.getHours();
        }
      }
    }
  }
});

application.config(function(dataProvider) {
  var time = dataProvider.$get()
    .devsshowDate();
  if (time > 0 && time < 12) {
    dataProvider.setGreeting('Good morning');
  } else if (time > 12 && time < 17) {
    dataProvider.setGreeting('Good day');
  } else if (time > 17 && time < 19) {
    dataProvider.setGreeting('Good evening');
  } else {
    dataProvider.setGreeting('Good night');
  }
});
application.controller('app', function($scope, data) {
  $scope.tasks = [];
  $scope.greatMessage = data.showDate();
  var taskData = localStorage['taskList'];

  if (taskData !== undefined) {
    $scope.tasks = JSON.parse(taskData);
  }

  $scope.searchEnter = function() {
    if (event.which == 13 && $scope.task != "") {
      $scope.addTask();
    }
  };
  $scope.addTask = function() {
    $scope.tasks.push({
      'taskMessage': $scope.task,
      'status': false
    });
    console.log($scope.tasks);
    $scope.task = "";
    localStorage['taskList'] = JSON.stringify($scope.tasks);
    console.log(localStorage);
  };
  $scope.contentEdit = function(msg) {
    console.log($scope.tasks);
    for (var i = 0; i < $scope.tasks.length; i++) {
      if ($scope.tasks[i].taskMessage == msg) {
        $scope.tasks[i].taskMessage =
          event.target.innerText;
      }
    }
    localStorage['taskList'] = JSON.stringify($scope.tasks);
    console.log(localStorage['taskList']);
    event.target.contentEditable = event.target.contentEditable == 'false' ? 'true' : 'false';
  };
  $scope.enterAgain = function(msg) {
    if (event.which == 13 && msg != "") {
      $scope.contentEdit();
    }
  }
});
