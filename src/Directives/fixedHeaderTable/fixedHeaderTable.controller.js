myApp.controller("fixedHeaderTableController", [
    "$scope",
    "$timeout",
    "fixedHeaderTableService",
    function ($scope, $timeout, ajsTableService) {

        console.log("in controller");
        var self = this;

        self.tableDataPath = "/dist/json/tableData.json";
        self.showAjsTableLoader = true;

        var tableCellWidth = [];

        ajsTableService.getData(self.tableDataPath).then(function (data) {
            self.data = data;
        });

        var initAjsTable = function () {
            // initially the actual table will be rendered and the below functions will be called to make the table header fixed.
            getCellWidth(); // get the table actual columns width.
            setColGroup(); // set the colgroup to table with the original width from previous function.
            structureTableElements(); // separate the header and body part of the table and place it separately.
            // onScrolllistener() : is used to detect the table body scroll and move the table header.
        }

        var onScrolllistener = function () {
            var scrolltrack = $(".ajs-table__body__wrapper").scrollLeft();

            $(".ajs-table__header__wrapper .ajs-table").css({
                "transform": "translateX(" + -scrolltrack + "px)"
            });
        };

        var getCellWidth = function () {
            console.log("in controller function");
            self.showAjsTableLoader = true;

            Array.prototype.slice.call(document.querySelectorAll(".ajs-table thead tr th")).forEach(function (dataTableRowCell) {
                tableCellWidth.push(dataTableRowCell.clientWidth);
            });
        };

        var setColGroup = function () {
            var ajsTableElement = $('.ajs-table');
            ajsTableElement.prepend("<colgroup></colgroup>");

            Array.prototype.slice.call(tableCellWidth).forEach(function (width) {
                $('.ajs-table colgroup').append("<col span='1' style='width: "+width+"px'/>")
            });

            ajsTableElement.css('width', ajsTableElement.width()+'px');

            ajsTableElement.css('table-layout', 'fixed');
        }

        var structureTableElements = function () {
            $('.ajs-table').wrap("<div class='ajs-table__wrapper'></div>");

            $('.ajs-table__wrapper').append(
                    "<div class='ajs-table__header__wrapper'></div>" +
                    "<div class='ajs-table__body__wrapper'></div>"
                );

            var tableElement = angular.element($('.ajs-table'));

            $('.ajs-table__header__wrapper, .ajs-table__body__wrapper').append(tableElement);

            $('.ajs-table__header__wrapper .ajs-table tbody, .ajs-table__body__wrapper .ajs-table thead').remove();

            $('.ajs-table__body__wrapper').css("height", "calc(100% - " + $('.ajs-table__header__wrapper').height() + "px)");

            $(".ajs-table__body__wrapper").scroll(onScrolllistener);

        }

        $timeout(function () {
            initAjsTable();
        }, 200);

        $timeout(function () {
            self.showAjsTableLoader = false;
        }, 1000);

        $scope.$on('$destroy', function () {
            onScrolllistener();
        })

    }
])