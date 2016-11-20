/**
 * Created by 100587263 on 11/19/2016.
 */
/*
Morris.Line({
    element: 'lineChart',
    lineColors: ['#F59A44', '#CF5230'],
    data: [
        { y: 'Dining Out', a: 100, b: 90 },
        { y: 'Transportation and Education', a: 75,  b: 65 },
        { y: 'Shopping and Entertainment', a: 50,  b: 40 },
        { y: 'Living Expense', a: 75,  b: 65 },
        { y: 'Other', a: 50,  b: 40 }
    ],
    xkey: 'y',
    ykeys: ['a', 'b'],
    labels: ['Expected', 'Current']
});*/

var Script = function () {

    //morris chart

    $(function () {
        // data stolen from http://howmanyleft.co.uk/vehicle/jaguar_'e'_type
        var user_data = [
            {"period": "Dining Out", "expected": 3407, "current": 660},
            {"period": "Transportation and Education", "expected": 3351, "current": 629},
            {"period": "Shopping and Entertainment", "expected": 3269, "current": 618},
            {"period": "Living Expense", "expected": 3246, "current": 661},
            {"period": "Other", "expected": 3171, "current": 676}

        ];
        Morris.Line({
            element: 'lineChart',
            data: user_data,
            xkey: 'period',
            ykeys: ['expected', 'current'],
            labels: ['Average', 'current'],
            lineColors: ['#4ECDC4', '#ed5565']
        });
    });
}();