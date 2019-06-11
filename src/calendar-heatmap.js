import moment from "moment";
import * as d3 from "d3";

export let calendarHeatmap = {
  init() {
    // defaults
    let width = 750;
    let height = 200;
    let legendWidth = 150;
    let selector = ".vuejs-heatmap";
    let SQUARE_LENGTH = 11;
    let SQUARE_PADDING = 2;
    let MONTH_LABEL_PADDING = 6;
    let LEGEND_GROUP_OFFSET = 70;
    let now = moment()
      .endOf("day")
      .toDate();
    let yearAgo = moment()
      .startOf("day")
      .subtract(1, "year")
      .toDate();
    let startDate = null;
    let data = [];
    let max = null;
    let colorRange = ["#D8E6E7", "#218380"];
    let tooltipEnabled = true;
    let tooltipUnit = "Star";
    let legendEnabled = true;
    let onClick = null;
    let weekStart = 0; //0 for Sunday, 1 for Monday
    let locale = {
      months: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ],
      days: ["S", "M", "T", "W", "T", "F", "S"],
      No: "No",
      on: "on",
      Less: "Less",
      More: "More"
    };

    // setters and getters
    chart.data = function(value) {
      if (!arguments.length) {
        return data;
      }
      data = value;
      return chart;
    };

    chart.max = function(value) {
      if (!arguments.length) {
        return max;
      }
      max = value;
      return chart;
    };

    chart.width = function(value) {
      if (!arguments.length) {
        return width;
      }
      width = value;
      return chart;
    };

    chart.height = function(value) {
      if (!arguments.length) {
        return height;
      }
      height = value;
      return chart;
    };

    chart.max = function(value) {
      if (!arguments.length) {
        return max;
      }
      max = value;
      return chart;
    };

    chart.selector = function(value) {
      if (!arguments.length) {
        return selector;
      }
      selector = value;
      return chart;
    };

    chart.startDate = function(value) {
      if (!arguments.length) {
        return startDate;
      }
      yearAgo = value;
      now = moment(value)
        .endOf("day")
        .add(1, "year")
        .toDate();
      return chart;
    };

    chart.colorRange = function(value) {
      if (!arguments.length) {
        return colorRange;
      }
      colorRange = value;
      return chart;
    };

    chart.tooltipEnabled = function(value) {
      if (!arguments.length) {
        return tooltipEnabled;
      }
      tooltipEnabled = value;
      return chart;
    };

    chart.tooltipUnit = function(value) {
      if (!arguments.length) {
        return tooltipUnit;
      }
      tooltipUnit = value;
      return chart;
    };

    chart.legendEnabled = function(value) {
      if (!arguments.length) {
        return legendEnabled;
      }
      legendEnabled = value;
      return chart;
    };

    chart.onClick = function(value) {
      if (!arguments.length) {
        return onClick();
      }
      onClick = value;
      return chart;
    };

    chart.locale = function(value) {
      if (!arguments.length) {
        return locale;
      }
      locale = value;
      return chart;
    };

    function chart() {
      d3.select(chart.selector())
        .selectAll("svg.calendar-heatmap")
        .remove(); // remove the existing chart, if it exists

      let dateRange = d3.time.days(yearAgo, now); // generates an array of date objects within the specified range
      let monthRange = d3.time.months(
        moment(yearAgo)
          .startOf("month")
          .add(1, "month")
          .toDate(),
        now
      ); // it ignores the first month if the 1st date is after the start of the month
      let firstDate = moment(dateRange[0]);

      if (max === null) {
        max = d3.max(chart.data(), function(d) {
          return d.count;
        });
      } // max data value

      // color range
      let color = d3.scale
        .linear()
        .range(chart.colorRange())
        .domain([0, max]);

      let tooltip;
      let dayRects;

      drawChart();

      function drawChart() {
        let svg = d3
          .select(chart.selector())
          .style("position", "relative")
          .append("svg")
          .attr("width", width)
          .attr("class", "calendar-heatmap")
          .attr("height", height)
          .attr("viewBox", "-20 0 710 140")
          .style("padding", "10px");

        dayRects = svg.selectAll(".day-cell").data(dateRange); //  array of days for the last yr

        dayRects
          .enter()
          .append("rect")
          .attr("class", "day-cell")
          .attr("width", SQUARE_LENGTH)
          .attr("height", SQUARE_LENGTH)
          .attr("fill", function(d) {
            return color(countForDate(d));
          })
          .attr("x", function(d, i) {
            let cellDate = moment(d);
            let result =
              cellDate.week() -
              firstDate.week() +
              firstDate.weeksInYear() *
                (cellDate.weekYear() - firstDate.weekYear());
            return result * (SQUARE_LENGTH + SQUARE_PADDING);
          })
          .attr("y", function(d, i) {
            return (
              MONTH_LABEL_PADDING +
              formatWeekday(d.getDay()) * (SQUARE_LENGTH + SQUARE_PADDING)
            );
          });

        if (typeof onClick === "function") {
          dayRects.on("click", function(d) {
            let match = matchForDate(d);
            onClick({ date: d, count: match.count, entry: match.entry });
          });
        }

        if (chart.tooltipEnabled()) {
          dayRects
            .on("mouseover", function(d, i) {
              tooltip = d3
                .select(chart.selector())
                .append("div")
                .attr("class", "day-cell-tooltip")
                .html(tooltipHTMLForDate(d))
                .style("left", function() {
                  return Math.floor(i / 7) * SQUARE_LENGTH + "px";
                })
                .style("top", function() {
                  return (
                    formatWeekday(d.getDay()) *
                      (SQUARE_LENGTH + SQUARE_PADDING) +
                    MONTH_LABEL_PADDING * 2 +
                    "px"
                  );
                });
            })
            .on("mouseout", function(d, i) {
              tooltip.remove();
            });
        }

        if (chart.legendEnabled()) {
          let colorRange = [color(0)];
          for (let i = 3; i > 0; i--) {
            colorRange.push(color(max / i));
          }

          let legendGroup = svg.append("g");
          legendGroup
            .selectAll(".calendar-heatmap-legend")
            .data(colorRange)
            .enter()
            .append("rect")
            .attr("class", "calendar-heatmap-legend")
            .attr("width", SQUARE_LENGTH)
            .attr("height", SQUARE_LENGTH)
            .attr("x", function(d, i) {
              return width - legendWidth + (i + 1) * 13;
            })
            .attr("y", height - LEGEND_GROUP_OFFSET - SQUARE_LENGTH)
            .attr("fill", function(d) {
              return d;
            });

          legendGroup
            .append("text")
            .attr(
              "class",
              "calendar-heatmap-legend-text calendar-heatmap-legend-text-less"
            )
            .attr("x", width - legendWidth - 13)
            .attr("y", height - LEGEND_GROUP_OFFSET)
            .text(locale.Less);

          legendGroup
            .append("text")
            .attr(
              "class",
              "calendar-heatmap-legend-text calendar-heatmap-legend-text-more"
            )
            .attr(
              "x",
              width -
                legendWidth +
                SQUARE_PADDING +
                (colorRange.length + 1) * 13
            )
            .attr("y", height - LEGEND_GROUP_OFFSET)
            .text(locale.More);
        }

        dayRects.exit().remove();
        let monthLabels = svg
          .selectAll(".month")
          .data(monthRange)
          .enter()
          .append("text")
          .attr("class", "month-name")
          .style()
          .text(function(d) {
            return locale.months[d.getMonth()];
          })
          .attr("x", function(d, i) {
            let matchIndex = 0;
            dateRange.findForHeatmap(function(element, index) {
              matchIndex = index;
              return (
                moment(d).isSame(element, "month") &&
                moment(d).isSame(element, "year")
              );
            });

            return (
              Math.floor(matchIndex / 7) * (SQUARE_LENGTH + SQUARE_PADDING)
            );
          })
          .attr("y", 0); // fix these to the top

        locale.days.forEach(function(day, index) {
          index = formatWeekday(index);
          if (index % 2) {
            svg
              .append("text")
              .attr("class", "day-initial")
              .attr(
                "transform",
                "translate(-8," +
                  (SQUARE_LENGTH + SQUARE_PADDING) * (index + 1) +
                  ")"
              )
              .style("text-anchor", "middle")
              .attr("dy", "2")
              .text(day);
          }
        });
      }

      function pluralizedTooltipUnit(count) {
        if ("string" === typeof tooltipUnit) {
          return tooltipUnit + (count === 1 ? "" : "s");
        }
        for (let i in tooltipUnit) {
          let _rule = tooltipUnit[i];
          let _min = _rule.min;
          let _max = _rule.max || _rule.min;
          _max = _max === "Infinity" ? Infinity : _max;
          if (count >= _min && count <= _max) {
            return _rule.unit;
          }
        }
      }

      function tooltipHTMLForDate(d) {
        let dateStr = moment(d).format("ddd, MMM Do YYYY");
        let count = countForDate(d);
        return (
          "<span><strong>" +
          (count ? count : locale.No) +
          " " +
          pluralizedTooltipUnit(count) +
          "</strong> " +
          locale.on +
          " " +
          dateStr +
          "</span>"
        );
      }

      function countForDate(d) {
        let count = 0;
        let match = chart.data().findForHeatmap(function(element, index) {
          return moment(element.date).isSame(d, "day");
        });
        if (match) {
          count = match.count;
        }
        return count;
      }

      function matchForDate(d) {
        let count = 0;
        let match = chart.data().findForHeatmap(function(element, index) {
          return moment(element.date).isSame(d, "day");
        });
        return match;
      }

      function formatWeekday(weekDay) {
        if (weekStart === 1) {
          if (weekDay === 0) {
            return 6;
          } else {
            return weekDay - 1;
          }
        }
        return weekDay;
      }

      let daysOfChart = chart.data().map(function(day) {
        return day.date.toDateString();
      });

      dayRects
        .filter(function(d) {
          return daysOfChart.indexOf(d.toDateString()) > -1;
        })
        .attr("fill", function(d, i) {
          return color(chart.data()[i].count);
        });
    }

    return chart;
  }
};

// polyfill for Array.find() method
/* jshint ignore:start */
if (!Array.prototype.findForHeatmap) {
  Array.prototype.findForHeatmap = function(predicate) {
    if (this === null) {
      throw new TypeError(
        "Array.prototype.findForHeatmap called on null or undefined"
      );
    }
    if (typeof predicate !== "function") {
      throw new TypeError("predicate must be a function");
    }
    let list = Object(this);
    let length = list.length >>> 0;
    let thisArg = arguments[1];
    let value;

    for (let i = 0; i < length; i++) {
      value = list[i];
      if (predicate.call(thisArg, value, i, list)) {
        return value;
      }
    }
    return undefined;
  };
}
/* jshint ignore:end */
