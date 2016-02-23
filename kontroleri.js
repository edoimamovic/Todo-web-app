app = angular.module("app", ["xeditable"])
    .value("ulogovani_id", {id: 0})
    .controller("NoviKontroler", ['$scope', '$http', function($scope, $http)
{
    $http.get("/api/tasks").success(function (podaci)
    {
        $scope.svi_zadaci = podaci;
    });


    $scope.ubaci = function()
    {
        if($scope.novi_zadatak.tekst.length > 0)
        {
            $http.post("/api/tasks", $scope.novi_zadatak).success(function (podaci)
            {
                $scope.novi_zadatak.tekst = "";
                $scope.svi_zadaci = podaci;
            });
        }
    };

    $scope.izbrisi = function(arg)
    {
        $http.delete("/api/tasks" + arg + novi_tekst).success(function(podaci)
        {
            $scope.svi_zadaci = podaci;
        });
    };

    $scope.snimi = function(zd)
    {
        console.log("NOVI: " + zd.tekst);
        $http.post("/api/tasks" + zd).success(function(podaci) {});
    };
}
]
)

    .controller("LoginKontrola", ['$scope', '$rootScope', '$http', function ($rootScope, $scope, $http)
{
    $scope.uloguj = function()
    {
      $http.get("/api/korisnici").success(function(podaci)
      {
          $scope.tekst_ulogovanosti = "Ulogovani ste kao " + podaci.username;
          $rootScope.ulogovani_id = podaci._id;
      })
    };

    $scope.registruj = function()
    {
        $http.post("/api/korisnici", $scope.novi).success(function(podaci)
        {
        });
    }
}]);

    .run(function($rootScope)
{
    $rootScope.ulogovani_id = 0;
});