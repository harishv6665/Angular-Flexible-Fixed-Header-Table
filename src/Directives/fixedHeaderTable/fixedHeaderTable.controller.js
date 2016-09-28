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
            document.querySelectorAll(".ajs-table thead tr th").forEach(function (dataTableRowCell) {
                tableCellWidth.push(dataTableRowCell.clientWidth);
            });
        };

        var setColGroup = function () {
            $('.ajs-table').prepend("<colgroup></colgroup>");

            tableCellWidth.forEach(function (width) {
                $('.ajs-table colgroup').append("<col span='1' style='width: "+width+"px'/>")
            });

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

            var tableHeaderCellHeight = $('.ajs-table__header__wrapper').height();
            $('.ajs-table__body__wrapper').css('height', 'calc(100% - '+tableHeaderCellHeight+'px');
            $('.ajs-table__header__wrapper .ajs-table').css('position',  'relative');
            $('.ajs-table').css('width', '0');

            $(".ajs-table__body__wrapper").scroll(onScrolllistener);

        }

        $timeout(function () {
            getCellWidth();
            setColGroup();
            structureTableElements();
        }, 200);

    }
])