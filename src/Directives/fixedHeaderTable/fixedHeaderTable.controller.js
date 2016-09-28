myApp.controller("fixedHeaderTableController", [
    "$scope",
    "$timeout",
    "fixedHeaderTableService",
    function ($scope, $timeout, ajsTableService) {
        var self = this;

        self.tableDataPath = "/dist/json/tableData.json";

        var tableCellWidth = [];

        ajsTableService.getData(self.tableDataPath).then(function (data) {
            self.data = data;
        });

        var onScrolllistener = function () {
            var scrolltrack = $(".ajs-table__body__wrapper").scrollLeft();

            $(".ajs-table__header__wrapper .ajs-table").css({
                "left": -scrolltrack
            });
        };

        var getCellWidth = function () {

            Array.prototype.slice.call(document.querySelectorAll(".ajs-table thead tr th")).forEach(function (dataTableRowCell) {
                tableCellWidth.push(dataTableRowCell.clientWidth);
            });
        };

        var setColGroup = function () {
            $('.ajs-table').prepend("<colgroup></colgroup>");

            Array.prototype.slice.call(tableCellWidth).forEach(function (width) {
                $('.ajs-table colgroup').append("<col span='1' style='width: "+width+"px'/>")
            });

            $('.ajs-table').css('width', $('.ajs-table').width()+'px');

            $('.ajs-table').css('table-layout', 'fixed');
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

            $('.ajs-table__body__wrapper').css('height', ($('.ajs-table__wrapper').height() - $('.ajs-table__header__wrapper').height()) +'px');

            $('.ajs-table__header__wrapper .ajs-table').css('position',  'relative');

            $(".ajs-table__body__wrapper").scroll(onScrolllistener);

        }

        $timeout(function () {
            getCellWidth();
            setColGroup();
            structureTableElements();
        }, 200);

    }
])