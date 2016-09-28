angular.module("myApp").service("fixedHeaderTableService", [
    "$http",
    function ($http) {
        var self = this;

        self.getData = function (path) {
            return (
                $http.get(path).then(function (response) {
                    self.data = response.data;
                    return self.data;
                })
            )
        }
    }
]);