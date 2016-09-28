myApp.directive('ajsTable', function () {
    return {
        templateUrl: "/dist/views/fixedHeaderTable.html",
        restrict: "E",
        controller: "fixedHeaderTableController as ajsTableController"
    }
})