$(function () {

    $.get( "pre.json?callback=?", function( data ) {

        console.log(data);
        var item = $.grep(data.issues, function (n, i) {
            return (n.title.indexOf(search_item) > -1)
        });

        var issues = {"issues": item};
        var template = Handlebars.compile($('#entry-template').html());
        $('#result-data').empty();
        $('#result-data').append(template(issues));
        $('#result-data').find('h4').append(search_item);

    });

    /*
    *  House Size
    */

    var size0_60;
    var size60_80;
    var size80_plus;

    /* House Type */
    var socialRentHouses;
    var privateRentHouses;
    var buyingHouses;

    /* Population Age */
    var age0_19 = parseInt($(".tables #a019").text());
    var age20_24 = parseInt($(".tables #a2024").text());
    var age25_29 = parseInt($(".tables #a2529").text());
    var age30_39 = parseInt($(".tables #a3039").text());
    var age40_64 = parseInt($(".tables #a4064").text());
    var age65_plus = parseInt($(".tables #a65plus").text());

    /* Population Nationalities */

    var popAntille = parseInt($(".tables #antNum").text());
    var popAutochtoon = parseInt($(".tables #dutNum").text());
    var morccans = parseInt($(".tables #morNum").text());
    var popOtherNW = parseInt($(".tables #nwNum").text());
    var popStudents = parseInt($(".tables #studNum").text());
    var popSuriname = parseInt($(".tables #surNum").text());
    var turkish = parseInt($(".tables #turNum").text());
    var popWest = parseInt($(".tables #wesNum").text());

    /* Population Income */

    var low = parseInt($(".tables #lowInc").text());
    var low_EUgrens = parseInt($(".tables #lowEUInc").text());
    var Eugrens_43785 = parseInt($(".tables #EUavInc").text());
    var _43785_1_5xModaal = parseInt($(".tables #43785Inc").text());
    var _1_5xModaal_2xModaal = parseInt($(".tables #15mInc").text());
    var twoxModaal_above = parseInt($(".tables #2mInc").text());

    //
    // Selector Variables used
    //

    console.log(low);

    var container = $('#container');
    var container_two = $('#container_two');
    var min_btn = $(".size_button_left");
    var plus_btn = $(".size_button_right");

    // Number to be added
    var valueToChange = 100000;

    size0_60 = 36.156 -1.105 * age0_19 + 0.444 * low + 1.603 * age30_39;

    size60_80 = - 42.698 + 0.6481 * age65_plus + 0.145 * low - 0.498 * popAntille + 0.306 * age25_29;

    size80_plus = - 36.186 + 0.618 * twoxModaal_above + 0.333 * age0_19 - 0.800 * age30_39 + 0.293 * Eugrens_43785 + 0.362 * popOtherNW + 0.479 * _43785_1_5xModaal;

    socialRentHouses = 4.366 + 0.658 * low + 0.591 * low_EUgrens - 0.635 * age25_29;

    privateRentHouses = - 105.514 + 0.837 * popWest - 0.401 * age40_64 + 0.932 * age25_29 - 0.141 * low + 0.168 * popAutochtoon + 5.876 * popAntille - 0.662 * popOtherNW + 0.553 * _43785_1_5xModaal - 0.458 * popStudents - 0.406 * popSuriname;

    buyingHouses = 18.742 + 0.147 * age40_64 + 0.264 * twoxModaal_above + 0.302 * Eugrens_43785 - 0.156 * age0_19 + 0.194 * _1_5xModaal_2xModaal;

    min_btn.click(function()
    {


        if((parseInt($(this).parent().find($(".interactive_num")).text() - valueToChange))>=0)
        {
            $(this).parent().find($(".interactive_num")).text(parseInt($(this).parent().find($(".interactive_num")).text()) - valueToChange);

            if($(this).hasClass('groups')){
                ageUp('groups')
            }else if($(this).hasClass('age')){
                ageUp('age')
            }else {
                ageUp('income')
            }

            size0_60 = 36.156 -1.105 * age0_19 + 0.444 * low + 1.603 * age30_39;
            size60_80 = - 42.698 + 0.6481 * age65_plus + 0.145 * low - 0.498 * popAntille + 0.306 * age25_29;
            size80_plus = - 36.186 + 0.618 * twoxModaal_above + 0.333 * age0_19 - 0.800 * age30_39 + 0.293 * Eugrens_43785 + 0.362 * popOtherNW + 0.479 * _43785_1_5xModaal;

            socialRentHouses = 4.366 + 0.658 * low + 0.591 * low_EUgrens - 0.635 * age25_29;
            privateRentHouses = - 105.514 + 0.837 * popWest - 0.401 * age40_64 + 0.932 * age25_29 - 0.141 * low + 0.168 * popAutochtoon + 5.876 * popAntille - 0.662 * popOtherNW + 0.553 * _43785_1_5xModaal - 0.458 * popStudents - 0.406 * popSuriname;
            buyingHouses = 18.742 + 0.147 * age40_64 + 0.264 * twoxModaal_above + 0.302 * Eugrens_43785 - 0.156 * age0_19 + 0.194 * _1_5xModaal_2xModaal;

        }

        else
        {
            $(this).parent().find($(".interactive_num")).text(0);
            size0_60 = 36.156 -1.105 * age0_19 + 0.444 * low + 1.603 * age30_39;
            console.log(size0_60);
        }
    });

    plus_btn.click(function()
    {
        $(this).parent().find($(".interactive_num")).text(parseInt($(this).parent().find($(".interactive_num")).text()) + valueToChange);

        if($(this).hasClass('groups')){
            ageUp('groups')
        }else if($(this).hasClass('age')){
            ageUp('age')
        }else {
            ageUp('income')
        }

        size0_60 = 36.156 -1.105 * age0_19 + 0.444 * low + 1.603 * age30_39;
        size60_80 = - 42.698 + 0.6481 * age65_plus + 0.145 * low - 0.498 * popAntille + 0.306 * age25_29;
        size80_plus = - 36.186 + 0.618 * twoxModaal_above + 0.333 * age0_19 - 0.800 * age30_39 + 0.293 * Eugrens_43785 + 0.362 * popOtherNW + 0.479 * _43785_1_5xModaal;

        socialRentHouses = 4.366 + 0.658 * low + 0.591 * low_EUgrens - 0.635 * age25_29;
        privateRentHouses = - 105.514 + 0.837 * popWest - 0.401 * age40_64 + 0.932 * age25_29 - 0.141 * low + 0.168 * popAutochtoon + 5.876 * popAntille - 0.662 * popOtherNW + 0.553 * _43785_1_5xModaal - 0.458 * popStudents - 0.406 * popSuriname;
        buyingHouses = 18.742 + 0.147 * age40_64 + 0.264 * twoxModaal_above + 0.302 * Eugrens_43785 - 0.156 * age0_19 + 0.194 * _1_5xModaal_2xModaal;
    });


    /*
    *  Charts
    * */

    // Make some dummy values to test the

    $('#container_pop').highcharts({
        data: {
            table: 'datatable'
        },
        chart: {
            type: 'column'
        },
        title: {
            text: 'Ethnic groups'
        },
        yAxis: {
            allowDecimals: false,
            title: {
                text: 'Population'
            }
        },
        tooltip: {
            formatter: function () {
                return '<b>' + this.series.name + '</b><br/>' +
                    this.point.y + ' ' + this.point.name.toLowerCase();
            }
        }
    });

    container.highcharts({
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'House sizes in Amsterdam'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                }
            }
        },
        series: [{
            name: 'Brands',
            colorByPoint: true,
            data: [{
                name: '0 to 60',
                y: size0_60
            }, {
                name: '60 to 80',
                y: size60_80,
                sliced: false,
                selected: false
            }, {
                name: '80 plus',
                y: size80_plus
            }],
            dataLabels: {
                format: '{point.y}'
            }
        }]
    });

    container_two.highcharts({
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'House types in Amsterdam'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                }
            }
        },
        series: [{
            name: 'Brands',
            colorByPoint: true,
            data: [{
                name: 'Social houses',
                y: socialRentHouses
            }, {
                name: 'Private rented houses',
                y: privateRentHouses,
                sliced: false,
                selected: false
            }, {
                name: 'Buying houses',
                y: buyingHouses
            }],
            dataLabels: {
                format: '{point.y}'
            }
        }]
    });

    $( "text:contains('Highcharts')" ).hide();

    // button handler
    var chart = container.highcharts();
    min_btn.click(function () {
        chart.series[0].data[0].update(size0_60);
        chart.series[0].data[1].update(size60_80);
        chart.series[0].data[2].update(size80_plus);
    });

    plus_btn.click(function () {
        chart.series[0].data[0].update(size0_60);
        chart.series[0].data[1].update(size60_80);
        chart.series[0].data[2].update(size80_plus);
    });

    var chart_two = container_two.highcharts();
    min_btn.click(function () {
        chart_two.series[0].data[0].update(socialRentHouses);
        chart_two.series[0].data[1].update(privateRentHouses);
        chart_two.series[0].data[2].update(buyingHouses);
    });

    plus_btn.click(function () {
        chart_two.series[0].data[0].update(socialRentHouses);
        chart_two.series[0].data[1].update(privateRentHouses);
        chart_two.series[0].data[2].update(buyingHouses);
    });

    function ageUp(plus){

        console.log(plus);
        switch(plus){
            case 'groups':

                // add % to age
                age0_19 = (0.15689 * valueToChange) + age0_19;
                age20_24 = (0.06473 * valueToChange) + age20_24;
                age25_29 = (0.07875 * valueToChange) + age25_29;
                age30_39 = (0.13802 * valueToChange) + age30_39;
                age40_64 = (0.25600 * valueToChange) + age40_64;
                age65_plus = (0.08868 * valueToChange) + age65_plus;

                // add % to income
                low = (0.301 * valueToChange) + low;
                low_EUgrens = (0.158 * valueToChange) + low_EUgrens;
                Eugrens_43785 = (0.141 * valueToChange) + Eugrens_43785;
                _43785_1_5xModaal = (0.056 * valueToChange) + _43785_1_5xModaal;
                _1_5xModaal_2xModaal = (0.093 * valueToChange) + _1_5xModaal_2xModaal;
                twoxModaal_above = (0.251 * valueToChange) + twoxModaal_above;


                // add new value to front-end

                $(".tables #a019").text(age0_19);
                $(".tables #a2024").text(age20_24);
                $(".tables #a2529").text(age25_29);
                $(".tables #a3039").text(age30_39);
                $(".tables #a4064").text(age40_64);
                $(".tables #a65plus").text(age65_plus);

                /* Population Nationalities */

                /* Population Income */

                $(".tables #lowInc").text(low);
                $(".tables #lowEUInc").text(low_EUgrens);
                $(".tables #EUavInc").text(Eugrens_43785);
                $(".tables #43785Inc").text(_43785_1_5xModaal);
                $(".tables #15mInc").text(_1_5xModaal_2xModaal);
                $(".tables #2mInc").text(twoxModaal_above);

                break;
            case 'age':

                // add % to group
                popAntille = (0.0126 * valueToChange) + popAntille;
                popAutochtoon = (0.545 * valueToChange) + popAutochtoon;
                popOtherNW = (0.0917 * valueToChange) + popOtherNW;
                popSuriname = (0.065 * valueToChange) + popSuriname;
                popWest = (0.1694 * valueToChange) + popWest;

                // add % to income
                low = (0.301 * valueToChange) + low;
                low_EUgrens = (0.158 * valueToChange) + low_EUgrens;
                Eugrens_43785 = (0.141 * valueToChange) + Eugrens_43785;
                _43785_1_5xModaal = (0.056 * valueToChange) + _43785_1_5xModaal;
                _1_5xModaal_2xModaal = (0.093 * valueToChange) + _1_5xModaal_2xModaal;
                twoxModaal_above = (0.251 * valueToChange) + twoxModaal_above;

                $(".tables #antNum").text(popAntille);
                $(".tables #dutNum").text(popAutochtoon);
                $(".tables #nwNum").text(popOtherNW);
                $(".tables #surNum").text(popSuriname);
                $(".tables #wesNum").text(popWest);

                $(".tables #lowInc").text(low);
                $(".tables #lowEUInc").text(low_EUgrens);
                $(".tables #EUavInc").text(Eugrens_43785);
                $(".tables #43785Inc").text(_43785_1_5xModaal);
                $(".tables #15mInc").text(_1_5xModaal_2xModaal);
                $(".tables #2mInc").text(twoxModaal_above);


                break;
            case 'income':

                // add % to group
                popAntille = (0.0126 * valueToChange) + popAntille;
                popAutochtoon = (0.545 * valueToChange) + popAutochtoon;
                popOtherNW = (0.0917 * valueToChange) + popOtherNW;
                popSuriname = (0.065 * valueToChange) + popSuriname;
                popWest = (0.1694 * valueToChange) + popWest;

                // add % to age
                age0_19 = (0.15689 * valueToChange) + age0_19;
                age20_24 = (0.06473 * valueToChange) + age20_24;
                age25_29 = (0.07875 * valueToChange) + age25_29;
                age30_39 = (0.13802 * valueToChange) + age30_39;
                age40_64 = (0.25600 * valueToChange) + age40_64;
                age65_plus = (0.08868 * valueToChange) + age65_plus;

                $(".tables #antNum").text(popAntille);
                $(".tables #dutNum").text(popAutochtoon);
                $(".tables #nwNum").text(popOtherNW);
                $(".tables #surNum").text(popSuriname);
                $(".tables #wesNum").text(popWest);

                $(".tables #a019").text(age0_19);
                $(".tables #a2024").text(age20_24);
                $(".tables #a2529").text(age25_29);
                $(".tables #a3039").text(age30_39);
                $(".tables #a4064").text(age40_64);
                $(".tables #a65plus").text(age65_plus);

                break;
        }
    }

    function subtract(el){

        switch(el){
            case 'groups':

                // add % to age
                age0_19 = (0.15689 * valueToChange) - age0_19;
                age20_24 = (0.06473 * valueToChange) - age20_24;
                age25_29 = (0.07875 * valueToChange) - age25_29;
                age30_39 = (0.13802 * valueToChange) - age30_39;
                age40_64 = (0.25600 * valueToChange) - age40_64;
                age65_plus = (0.08868 * valueToChange) - age65_plus;

                // add % to income
                low = (0.301 * valueToChange) - low;
                low_EUgrens = (0.158 * valueToChange) - low_EUgrens;
                Eugrens_43785 = (0.141 * valueToChange) - Eugrens_43785;
                _43785_1_5xModaal = (0.056 * valueToChange) - _43785_1_5xModaal;
                _1_5xModaal_2xModaal = (0.093 * valueToChange) - _1_5xModaal_2xModaal;
                twoxModaal_above = (0.251 * valueToChange) - twoxModaal_above;


                // add new value to front-end

                $(".tables #a019").text(age0_19);
                $(".tables #a2024").text(age20_24);
                $(".tables #a2529").text(age25_29);
                $(".tables #a3039").text(age30_39);
                $(".tables #a4064").text(age40_64);
                $(".tables #a65plus").text(age65_plus);

                /* Population Nationalities */

                /* Population Income */

                $(".tables #lowInc").text(low);
                $(".tables #lowEUInc").text(low_EUgrens);
                $(".tables #EUavInc").text(Eugrens_43785);
                $(".tables #43785Inc").text(_43785_1_5xModaal);
                $(".tables #15mInc").text(_1_5xModaal_2xModaal);
                $(".tables #2mInc").text(twoxModaal_above);

                break;
            case 'age':

                // add % to group
                popAntille = (0.0126 * valueToChange) - popAntille;
                popAutochtoon = (0.545 * valueToChange) - popAutochtoon;
                popOtherNW = (0.0917 * valueToChange) - popOtherNW;
                popSuriname = (0.065 * valueToChange) - popSuriname;
                popWest = (0.1694 * valueToChange) - popWest;

                console.log(low + 'fir');
                // add % to income
                low = (0.301 * valueToChange) - low;
                low_EUgrens = (0.158 * valueToChange) - low_EUgrens;
                Eugrens_43785 = (0.141 * valueToChange) - Eugrens_43785;
                _43785_1_5xModaal = (0.056 * valueToChange) - _43785_1_5xModaal;
                _1_5xModaal_2xModaal = (0.093 * valueToChange) - _1_5xModaal_2xModaal;
                twoxModaal_above = (0.251 * valueToChange) - twoxModaal_above;

                $(".tables #antNum").text(popAntille);
                $(".tables #dutNum").text(popAutochtoon);
                $(".tables #nwNum").text(popOtherNW);
                $(".tables #surNum").text(popSuriname);
                $(".tables #wesNum").text(popWest);

                $(".tables #lowInc").text(low);
                $(".tables #lowEUInc").text(low_EUgrens);
                $(".tables #EUavInc").text(Eugrens_43785);
                $(".tables #43785Inc").text(_43785_1_5xModaal);
                $(".tables #15mInc").text(_1_5xModaal_2xModaal);
                $(".tables #2mInc").text(twoxModaal_above);


                break;
            case 'income':

                // add % to group
                popAntille = (0.0126 * valueToChange) - popAntille;
                popAutochtoon = (0.545 * valueToChange) - popAutochtoon;
                popOtherNW = (0.0917 * valueToChange) - popOtherNW;
                popSuriname = (0.065 * valueToChange) - popSuriname;
                popWest = (0.1694 * valueToChange) - popWest;

                // add % to age
                age0_19 = (0.15689 * valueToChange) - age0_19;
                age20_24 = (0.06473 * valueToChange) - age20_24;
                age25_29 = (0.07875 * valueToChange) - age25_29;
                age30_39 = (0.13802 * valueToChange) - age30_39;
                age40_64 = (0.25600 * valueToChange) - age40_64;
                age65_plus = (0.08868 * valueToChange) - age65_plus;

                $(".tables #antNum").text(popAntille);
                $(".tables #dutNum").text(popAutochtoon);
                $(".tables #nwNum").text(popOtherNW);
                $(".tables #surNum").text(popSuriname);
                $(".tables #wesNum").text(popWest);

                $(".tables #a019").text(age0_19);
                $(".tables #a2024").text(age20_24);
                $(".tables #a2529").text(age25_29);
                $(".tables #a3039").text(age30_39);
                $(".tables #a4064").text(age40_64);
                $(".tables #a65plus").text(age65_plus);

                break;
        }
    }
});

function changePrediction(that){

    console.log(that.value);

    if(that.value == 'groups'){
        $('#container_pop').highcharts({
            data: {
                table: 'datatable'
            },
            chart: {
                type: 'column'
            },
            title: {
                text: 'Ethnic groups'
            },
            yAxis: {
                allowDecimals: false,
                title: {
                    text: 'Population'
                }
            },
            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.name + '</b><br/>' +
                        this.point.y + ' ' + this.point.name.toLowerCase();
                }
            }
        });
    }else if(that.value == 'age'){
        $('#container_pop').highcharts({
            data: {
                table: 'datatable_one'
            },
            chart: {
                type: 'column'
            },
            title: {
                text: 'Age'
            },
            yAxis: {
                allowDecimals: false,
                title: {
                    text: 'Population'
                }
            },
            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.name + '</b><br/>' +
                        this.point.y + ' ' + this.point.name.toLowerCase();
                }
            }
        });
    }else {
        $('#container_pop').highcharts({
            data: {
                table: 'datatable_two'
            },
            chart: {
                type: 'column'
            },
            title: {
                text: 'Income'
            },
            yAxis: {
                allowDecimals: false,
                title: {
                    text: 'Population'
                }
            },
            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.name + '</b><br/>' +
                        this.point.y + ' ' + this.point.name.toLowerCase();
                }
            }
        });
    }
}