interface nesto extends ng.IScope
{

}

var app = angular.module("app", ["xeditable"])
    .value("ulogovani_id", {id: 0})
    .controller("NoviKontroler", function($http, $scope, $rootScope, ulogovani_id)
    {
        $scope.$on('novi_login', function(event, arg)
        {
            $http.get("/api/zadaci?korisnik=" + ulogovani_id.id).success(function (podaci)
            {
                $scope.svi_zadaci = podaci;
            });
        });

        $http.get("/api/zadaci?korisnik=" + ulogovani_id.id).success(function (podaci)
        {
            $scope.svi_zadaci = podaci;
        });


        $scope.ubaci = function()
        {
            if($scope.novi_zadatak.tekst.length > 0)
            {
                $http.post("/api/zadaci", {tekst: $scope.novi_zadatak.tekst, korisnik: ulogovani_id.id}).success(function (podaci)
                {
                    $scope.novi_zadatak.tekst = "";
                    $scope.svi_zadaci = podaci;
                });
            }
        };

        $scope.izbrisi = function(arg)
        {
            $http.delete("/api/zadaci" + arg).success(function(podaci)
            {
                $scope.svi_zadaci = podaci;
            });
        };

        $scope.snimi = function(id, txt)
        {
            $http.post("/api/azuriraj_zadatak", {_id: id, tekst: txt}).success(function(podaci) {});
        };
    })

    .controller("LoginKontrola", function ($scope, $http, $rootScope, ulogovani_id) {
            var tekst_za_login = "Nisi registrovan?";
            var tekst_za_reg = "Uloguj se";
            $scope.login_aktivacija = true;
            $scope.tekst_aktivacije = tekst_za_login;

            $scope.$on('novi_login', function (event, arg) {
                if (ulogovani_id.id == 0)
                {
                    console.log("novi login... " + ulogovani_id.id);
                    $scope.tekst_ulogovanosti = "";
                }
            });

            $scope.promijeni_aktivaciju = function()
            {
                $scope.login_aktivacija = !$scope.login_aktivacija;
                $scope.novi = {};
                $scope.pokusaj = {};

                if ($scope.login_aktivacija)
                    $scope.tekst_aktivacije = tekst_za_login;
                else
                    $scope.tekst_aktivacije = tekst_za_reg;

            };

            $scope.uloguj = function () {
                console.log("pokusaj logina za " + $scope.pokusaj.uname);
                $http.post("/api/login", $scope.pokusaj).success(function (podaci) {


                    if (podaci.username != "") {
                        $scope.tekst_aktivacije = "";
                        ulogovani_id.id = podaci._id;
                        $rootScope.$broadcast('novi_login', ulogovani_id.id);
                        console.log("uspio login kao " + podaci.username);
                        $scope.tekst_ulogovanosti = "Ulogovani ste kao " + podaci.username + ".";

                    } else {
                        $scope.tekst_ulogovanosti = "Login nije uspio.";
                        console.log("Neuspješan login");
                    }
                });

                $scope.pokusaj = {};
            };

            $scope.registruj = function () {
                $http.post("/api/registracija_korisnika", $scope.novi).success(function (podaci) {
                });
                console.log("napravljen korisnik " + $scope.novi.reg_uname + " s passom " + $scope.novi.reg_pass);
                $scope.novi = {};
            };

            $scope.logout = function()
            {
                ulogovani_id.id = 0;
                $rootScope.$broadcast('novi_login', ulogovani_id.id);
                $scope.login_aktivacija = true;
                $scope.tekst_aktivacije = tekst_za_login;

            };

            $scope.neko_ulogovan = function()
            {
                return ulogovani_id.id != 0;
            };

            $scope.img_src = function () {
                return "/api/profilna_slika/id=" + ulogovani_id.id;
            };

            /*        $scope.upload_profilne = function()
             {
             var f = document.getElementById("file");
             var r = new FileReader();
             r.onloadend = function(e)
             {
             var podaci = e.targetScope.result;

             }
             };*/

        }
    );