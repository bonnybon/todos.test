var app = angular.module("appRotture", ['lbServices']);

app.controller("controllerRotture", ["$scope", "Todo",
	function($scope, Todo)
	{
		$scope.todos = [];
		$scope.todosdone = [];
		$scope.newTodo=
		{
			name:"",
			desc:"",
			important:false
		};

		$scope.addTodo = function()
		{
			console.log($scope.newTodo);
		};

		$scope.delTodo = function(todoId)
		{
			console.log("cancella"+todoId)
		};

		$scope.execTodo = function(todoId)
		{
			for(i = 0; i < $scope.todos.length; i++)
			{
				if($scope.todos[i].id==todoId)
				{
					$scope.todos[i].done=true;
					Todo.upsert($scope.todos[i]);
					$scope.todos=[];
					$scope.todosdone=[];
					getTodos();
				}
			}
			console.log("esegue"+todoId)
		};

		function getTodos()
		{
			Todo.find()
			.$promise
			.then(function(results)
			{
				for(i = 0; i < results.length; i++)
				{
					if(results[i].done == false)
					{
						$scope.todos.push(results[i]);	
					} else
					{
						$scope.todosdone.push(results[i]);	
					}
				}
				console.log(results)
			})
		}

		getTodos();
	}]);