//TODO: Turn into poster layout

function create_star_radar_chart() {
    
    var container = d3.select("#chart");

    //Destroy all that might be there
    container.selectAll("svg, img").remove();

    ////////////////////////////////////////////////////////////// 
    //////////////////////// Create SVG //////////////////////////
    ////////////////////////////////////////////////////////////// 

    var base_width = 1600,
        base_height = 2800;

    var width_container = document.getElementById("chart-container").offsetWidth;
    var max_width = 1280,
        max_height = 2800;

    //Should the orientation be portrait or landscape
    var orientation = getQueryVariable("orientation");
    var do_landscape = orientation === "landscape" ? true : false;
    if(do_landscape || (orientation !== "portrait" && width_container > 1900)) {
        do_landscape = true;
        var width = Math.min(max_height, width_container);
        var height = width * 1600/2800;
        //How much smaller is this visual than the original
        var size_factor = _.round(width/base_height,3); 
        //Update title font sizes
        d3.select("#chart-title").style("font-size", (76 * 1.2 * size_factor) + "px")
        d3.select("#chart-sub-title").style("font-size", (24 * 1.2 * size_factor) + "px"); 
        //Adjust margin of explanation text below
        d3.select("#chart-explanation").style("margin-top", "0px");
    } else {
        var width = Math.min(max_width, width_container);
        var height = width * 2800/1600;
        //How much smaller is this visual than the original
        var size_factor = _.round(width/base_width,3);  
        //Update title font sizes
        d3.select("#chart-title").style("font-size", (76 * size_factor) + "px")
        d3.select("#chart-sub-title").style("font-size", (24 * size_factor) + "px");
    }//else

    //Depending on which year to show, adjust some stylings
    var year_to_show = getQueryVariable("year") === "2006" ? "2006" : "2016";
    if(year_to_show === "2006" && !do_landscape) d3.select("#chart").style("margin-top", 20 + "px");
    if(year_to_show === "2006") {
        d3.select("#chart-sub-title span").text("2006");
        d3.select(".note-2006").style("display", "inline");
    }//if

    //Is this a mobile-ish screen?
    var small_screen = width < 400;
    if(small_screen) {
        //Show an image
        var img = document.createElement("img");
        img.src = "/wp-content/themes/article19/xpa-report/img/FoE-" + year_to_show + ".jpg";
        var src = document.getElementById("chart");
        src.appendChild(img);
        //Change some stylings of the elements above and below the chart
        d3.select("#chart-sub-title").style("margin-bottom", 2.3 + "em");
        d3.select("#chart-explanation").style("margin-top", 0 + "px");
        //Don't do any of the other code in the function, i.e. don't create the SVG
        return;
    }//if

    //Adjust the dimensions of the outer container
    container
        .style("width", width + "px")
        .style("height", height + "px")

    //SVG container behind all others
    var svg = container.append("svg")
        .attr("class", "svg-behind")
        .attr("width", 10)
        .attr("height", 10);

    // var g = svg.append("g")
    //     .attr("transform", "translate(" + _.round(width/2,2) + "," + _.round(height/2,2) + ")");

    //////////////////////////////////////////////////////////////
    //////////////// Initialize helpers and scales ///////////////
    //////////////////////////////////////////////////////////////

    var pillars = ["digital","media","transparency","protection","civic"];
      
    var outer_radius = _.round(30 * size_factor, 2);
    var radius = _.round(outer_radius * 1.6, 2);
    var font_size = _.round(8 * size_factor, 2);
    var max_font_size = _.round(6.5 * size_factor, 2);

    //Scale of the outer circle 
    var outer_circle_scale = d3.scaleLinear() //not a circular radius
        .domain([0, 1])
        .range([0, outer_radius]); 

    //Radius of the circles for each pillar
    var circle_radius_scale = d3.scaleSqrt()
        .domain([0,1])
        .range([0,13*size_factor]);

    //The center angle of each pillar
    var angle = d3.scaleLinear()
        .domain([0, pillars.length])
        .range([0, 2*Math.PI]); 

    //////////////////////////////////////////////////////////////
    /////////////////////// Create colors ////////////////////////
    //////////////////////////////////////////////////////////////

    var article19_red = "#DA291C",
        article19_orange = "#ED8B00",
        article19_yellow = "#F2A900";

    var grey_scale = chroma.scale(["#F5F5F5","#C8C8C8"])
        .domain([0,1])
        .mode("hsl")
        .correctLightness()

    var gradient_colors = ["#0D000A","#ca0000",article19_orange,article19_yellow];
    var color_stops = d3.range(gradient_colors.length).map(function (d, i) { return i / (gradient_colors.length-1); })
    var color_scale = chroma.scale(gradient_colors)
        .domain(color_stops)
        //.mode("hsl")
        .correctLightness();

    // var gradient_colors = ["#EFB605","#E01A25","#991C71","#2074A0","#7EB852"].reverse()
    // var color_scale = d3.scaleOrdinal()
    //     .domain(pillars)
    //     .range(gradient_colors);

    // var gradient_colors = ["#EFB605","#E01A25","#991C71","#206CA9"].reverse()
    // var color_stops = d3.range(gradient_colors.length).map(function (d, i) { return i / (gradient_colors.length-1); })
    // var color_scale = d3.scaleLinear()
    //     .domain(color_stops)
    //     .range(gradient_colors);

    //////////////////////////////////////////////////////////////
    //////////////////// Create def components ///////////////////
    //////////////////////////////////////////////////////////////

    var defs = svg.append("defs");

    //Gradient for the color legend
    defs.append("linearGradient")
        .attr("id", "color-gradient")
        .attr("x1", "0%").attr("y1", "0%")
        .attr("x2", "100%").attr("y2", "0%")
        .selectAll("stop") 
        .data(color_stops)                  
        .enter().append("stop") 
        .attr("offset", function(d) { return Math.round(d*100) + "%"; })   
        .attr("stop-color", function(d) { return color_scale(d); });

    //Filter for the outside darker shadow
    var filter_shadow = defs.append("filter").attr("id", "shadow");
    filter_shadow.append("feColorMatrix")
        .attr("type", "matrix")
        .attr("values", "0 0 0 0   0 0 0 0 0   0 0 0 0 0   0 0 0 0 0.3 0")
    filter_shadow.append("feGaussianBlur")
        .attr("stdDeviation", "2")
        .attr("result", "coloredBlur");
    var feMerge_shadow = filter_shadow.append("feMerge");
    feMerge_shadow.append("feMergeNode").attr("in", "coloredBlur");
    feMerge_shadow.append("feMergeNode").attr("in", "SourceGraphic");

    var filter_shadow_less = defs.append("filter").attr("id", "shadow-less");
    filter_shadow_less.append("feColorMatrix")
        .attr("type", "matrix")
        .attr("values", "0 0 0 0   0 0 0 0 0   0 0 0 0 0   0 0 0 0 0.3 0")
        filter_shadow_less.append("feGaussianBlur")
        .attr("stdDeviation", "1.5")
        .attr("result", "coloredBlur");
    var feMerge_shadow_less = filter_shadow_less.append("feMerge");
    feMerge_shadow_less.append("feMergeNode").attr("in", "coloredBlur");
    feMerge_shadow_less.append("feMergeNode").attr("in", "SourceGraphic");

    //////////////////////////////////////////////////////////////
    ///////////////////////// Read in data ///////////////////////
    //////////////////////////////////////////////////////////////

    d3.queue()
        .defer(d3.json, "/wp-content/themes/article19/xpa-report/data/article_19_country_data_" + year_to_show + ".json")
        .await(draw);

    function draw(error, data) {
        if (error) throw error;

        //////////////////////////////////////////////////////////////
        /////////////////////// Final data prep //////////////////////
        //////////////////////////////////////////////////////////////

        data.forEach(function (d,i) {
            //Adjust a few variables based on the actual chart width
            d.x = d.x * size_factor;
            d.y = d.y * size_factor;

            //Place the legend at a specific spot
            if(d.country_id === "WOR") {
                d.x = 300 * size_factor;
                d.y = 2500 * size_factor;
            }//if
        });

        //////////////////////////////////////////////////////////////
        //////////////// Create a group per country //////////////////
        //////////////////////////////////////////////////////////////

        var margin = {
            top: 30,
            right: 30,
            bottom: 30,
            left: 30
        }; 

        //The country SVG that is positioned on the right x/y location
        var country_svg = container.selectAll(".country-svg")
            .data(data)
            // .data(data.filter(function(d) { return d.special_country; }))
            .enter().append("svg")
            .attr("id", function(d) { return "country-svg-" + d.country_id; })
            .attr("class", "country-svg")
            .attr("width", function(d) { return _.round(radius + margin.left + margin.right,2); })
            .attr("height", function(d) { return _.round(radius + margin.top + margin.bottom,2); })
            //.attr("transform", function(d) { return "translate(" + _.round(d.x - radius/2 - margin.left,2) + "," + _.round(d.y - radius/2 - margin.top,2) + ")"; })

        //Depending on the desired orientation, place the SVGs
        if(!do_landscape) {
            country_svg
                .style("left", function(d) { return _.round(d.x - radius/2 - margin.left,2) + "px"; })
                .style("top", function(d) { return _.round(d.y - radius/2 - margin.top,2) + "px"; });
        } else {
            country_svg
                .style("top", function(d) { return _.round(d.x - radius/2 - margin.left,2) + "px"; })
                .style("left", function(d) { return _.round(d.y - radius/2 - margin.top,2) + "px"; });
        }

        //Inner group that is offset, so the center lies in the middle
        var country_g = country_svg.append("g")
            .attr("transform", "translate(" + (margin.left + radius/2) + "," + (margin.top + radius/2) + ")");

        //////////////////////////////////////////////////////////////
        /////////////////////// Hover functions //////////////////////
        //////////////////////////////////////////////////////////////

        //Captures the mouseover event - doesn't scale - not on mobile
        if(!small_screen) {
            var circle_hover = country_g.append("circle")
                .attr("class", "circle-hover-capture")
                .attr("r", radius)
                .on("mouseover", mouse_over_star)
                .on("mouseout", mouse_out_star);
        }//if

        //Hover interaction duration is based on difference in scale to final scale
        var popup_scale = 3 / size_factor;
        var ease = d3.easeSin;
        var legend_timer;

        //Needed for IE and Edge to do mouseover checks
        var current_hover;
        var no_mouse_out_captured = false;

        //Mouse over a country
        function mouse_over_star(d) {
            //console.log(d.country_name, _.round(d.avg_value,3))
            d3.event.stopPropagation();

            //Ignore the central world
            if(d.region === "World") return;

            //Needed for IE and Edge, otherwise a mouseover is fired on each movement
            //when combined with the appendChild
            if(current_hover === d && !no_mouse_out_captured) return;
            current_hover = d;
            no_mouse_out_captured = false;

            //Move this country to the front
            if(legend_timer) clearTimeout(legend_timer);
            var outer = d3.select("#country-svg-" + d.country_id).node();
            outer.parentNode.appendChild(outer); 
            
            var el = d3.select("#country-" + d.country_id);
            var t = d3.transition().duration(400);
            
            //Scale up the entire star radar
            el.transition(t)
                .ease(ease)
                .attr("transform", "scale(" + popup_scale + ")");

            //Show the background circle & scale up
            el.select(".circle-background")
                .style("filter", "url(#shadow)")
                .transition(t)
                // .attr("r", outer_radius * 2);
                .attr("r", outer_radius * 1.78);
        
            //Resize the country name
            el.select(".country-name")
                .transition(t)
                .style("font-size", max_font_size + "px");

            //Move the country name to a larger radius
            // var rad = outer_radius * 1.55;
            var rad = outer_radius * 1.34;
            el.select(".country-name-path")
                .transition(t)
                .attr("d", "M0," + rad + " A" + rad + "," + rad + " 0 1 1 0.01," + rad);

            //Show the pillar names
            el.select(".label-group")
                .transition(t)
                .style("opacity", 1);

        }//function mouse_over_star

        //Mouse out a country
        function mouse_out_star(d) {
            if(d.region === "World") return;

            no_mouse_out_captured = true;

            var el = d3.select("#country-" + d.country_id);
            var t = d3.transition().duration(200);

            //Scale back down
            el.transition(t)
               .ease(ease)
               .attr("transform", "scale(1)");

            //Remove filter from background circle
            el.select(".circle-background")
                .style("filter", null)
                .transition(t)
                .attr("r", _.round(outer_radius * 1.5, 2));
            
            //Resize font 
            el.select(".country-name")
                .transition(t)
                .style("font-size", font_size + "px");

            //Country name path back to normal
            el.select(".country-name-path")
                .transition(t)
                .attr("d", "M0," + outer_radius + " A" + outer_radius + "," + outer_radius + " 0 1 1 0.01," + outer_radius);

            //Hide the pillar names
            el.select(".label-group")
                .transition(t)
                .style("opacity", 0);

            legend_timer = setTimeout(function() {
                //Move the legend to the front
                var outer = d3.select("#country-svg-WOR").node();
                outer.parentNode.appendChild(outer); 
            },200);

        }//function mouse_out_star

        //////////////////////////////////////////////////////////////
        //////////////// Create the inner star group /////////////////
        //////////////////////////////////////////////////////////////

        //Inner group that can be scaled on hover
        var country = country_g.append("g")
            .attr("id", function(d) { return "country-" + d.country_id; })
            .attr("class", "country");

        //Background circle that appears during mouseover with the outer shadow
        var circle_background = country.append("circle")
            .attr("class", "circle-background")
            .attr("r", _.round(outer_radius * 1.5, 2))
            .style("stroke", function(d) { return d.special_country ? color_scale(d.avg_value) : null; })
            .style("stroke-width", size_factor * 1)

        //////////////////////////////////////////////////////////////
        //////////// Draw a radar star shape per country /////////////
        ////////////////////////////////////////////////////////////// 
        
        //Needed for IE and Edge, which don't have the mix-blend-mode option
        var op = window.getComputedStyle(document.body).mixBlendMode !== undefined ? 0.9 : 0.6;

        var rad = _.round( outer_radius * 0.5, 2);

        country.each(function(d,i) {

            var el = d3.select(this);

            //Create groups for each "group" of elements to draw
            //To make sure the order is correct, and multiply blending
            //Only happens where wanted
            var bottom_grey = el.append("g")
                .attr("class","grey-group")
                .style("isolation", "isolate");

            var bottom_circles = el.append("g")
                .attr("class","bottom-group")
                .style("isolation", "isolate");

            var top_elements = el.append("g")
                .attr("class","top-group")
                .style("isolation", "isolate");

            //Create grey circle that gives biggest size a circle can become
            for(var j = 0; j < pillars.length; j++) {
                if(d[pillars[j]] === null) continue;
                bottom_grey.append("circle")
                    .attr("class", "grey-circle")
                    .attr("cx", rad * Math.cos(angle(j) + Math.PI/2))
                    .attr("cy", rad * Math.sin(angle(j) + Math.PI/2))
                    .attr("r", circle_radius_scale(1))
                    .style("fill", grey_scale(d.avg_value))
                    // .style("fill", "url(#pattern-hatched)")
            }//for j

            //Create white circle so the background grey doesn't shine through
            for(var j = 0; j < pillars.length; j++) {
                if(d[pillars[j]] === null) continue;
                bottom_grey.append("circle")
                    .attr("class", "white-circle")
                    .attr("cx", rad * Math.cos(angle(j) + Math.PI/2))
                    .attr("cy", rad * Math.sin(angle(j) + Math.PI/2))
                    .attr("r", Math.max(0, circle_radius_scale( d[pillars[j] + "_high"] )) )
                    .style("fill", "white")
            }//for j

            //Draw the inner lines radiating towards the centers in between the pillars
            for(var j = 0; j < pillars.length; j++) {
                if(d[pillars[j]] === null) continue;

                //The bottom circles going to the higher end of the value
                bottom_circles.append("circle")
                    .attr("class", "high-level-circle")
                    .attr("cx", rad * Math.cos(angle(j) + Math.PI/2))
                    .attr("cy", rad * Math.sin(angle(j) + Math.PI/2))
                    .attr("r", Math.max(0, circle_radius_scale( d[pillars[j] + "_high"] )))
                    .style("fill", color_scale( d[pillars[j]]) )
                    //.style("fill", color_scale( pillars[j]) )
                    .style("opacity", 0.6)
                    .style("mix-blend-mode", "multiply");
            }//for j
            
            for(var j = 0; j < pillars.length; j++) {
                if(d[pillars[j]] === null) continue;
                //The top circles going to the lower end of the value
                top_elements.append("circle")
                    .attr("class", "low-level-circle")
                    .attr("cx", rad * Math.cos(angle(j) + Math.PI/2))
                    .attr("cy", rad * Math.sin(angle(j) + Math.PI/2))
                    .attr("r", Math.max(0, circle_radius_scale( d[pillars[j] + "_low"] )))
                    .style("fill", color_scale( d[pillars[j]]) )
                    //.style("fill", color_scale( pillars[j]) )
                    .style("opacity", op)
                    .style("mix-blend-mode", "multiply");

                //Create lines to center
                top_elements.append("path")
                    .attr("class", "inner-line")
                    .attr("transform", function (d) { return "rotate(" + _.round(((j) * (360 / pillars.length)), 2) + ")"; })
                    .attr("d", "M" + 0 + "," + 0 + " L" + 0 + "," + rad)
                    .style("stroke", color_scale(d[pillars[j]]))
                    //.style("stroke", color_scale( pillars[j]) )
                    .style("opacity", 0.7)
                    .style("stroke-width", _.round(1.5 * size_factor,2) + "px")
                    .style("stroke-linecap", "round")
                    .style("mix-blend-mode", "multiply");

            }//for j

            //////////////////////////////////////////////////////////////
            //////////////////// Add the country name  ///////////////////
            ////////////////////////////////////////////////////////////// 

            if (d.country_id !== "WOR") {
                //Create the path for the name to arc around, but hide the path
                el.append("path")
                    .attr("class", "country-name-path")
                    .attr("id", "country-name-path-" + d.country_id)
                    .attr("d", "M0," + outer_radius + " A" + outer_radius + "," + outer_radius + " 0 1 1 0.01," + outer_radius)
                    .style("fill", "none")
                    .style("display", "none");

                //Append the country names
                el.append("text")
                    .attr("class", "country-name")
                    .attr("dy", "-0.3em")
                    .style("font-size", font_size + "px")
                    .append("textPath")
                    .attr("xlink:href", "#country-name-path-" + d.country_id)
                    .attr("startOffset", "50%")
                    .text(d.country_name);

                //Group for the pillar labels, hide while not hovered
                var label_group = el.append("g")
                    .attr("class", "label-group")
                    .style("opacity", 0);

                //Create the paths along which the pillar labels will run
                label_group.selectAll(".country-pillar-path")
                    .data(pillars)
                    .enter().append("path")
                    .attr("class", "country-pillar-path")
                    .attr("id", function(p) { return "country-pillar-path-" + d.country_id + "-" + p; })
                    .attr("d", function(p,j) {
                        var rad_p = outer_radius * 1.1;
                        var x1 = rad_p * Math.cos(angle(j) + 0.01 - Math.PI/2),
                            y1 = rad_p * Math.sin(angle(j) + 0.01 - Math.PI/2);
                        var x2 = rad_p * Math.cos(angle(j) - 0.01 - Math.PI/2),
                            y2 = rad_p * Math.sin(angle(j) - 0.01 - Math.PI/2)
                        if(j === 2 || j === 3) {
                            return "M" + x1 + "," + y1 + " A" + rad_p + "," + rad_p + " 0 1 1 " + x2 + "," + y2;
                        } else {
                            return "M" + x2 + "," + y2 + " A" + rad_p + "," + rad_p + " 0 1 0 " + x1 + "," + y1;
                        }
                    })
                    .style("fill", "none")
                    .style("display", "none");

                //Create the pillar labels
                label_group.selectAll(".pillar-label")
                    .data(pillars)
                    .enter().append("text")
                    .attr("class", "pillar-label")
                    .attr("dy", function(p,j) { return j === 2 || j === 3 ? "-0.25em" : "0.9em"; })
                    .style("text-anchor", "middle")
                    .style("font-size", (3.5 * size_factor) + "px")
                    .append("textPath")
                    .attr("xlink:href", function(p) { return "#country-pillar-path-" + d.country_id + "-" + p; })
                    .attr("startOffset", "50%")
                    .text(function(p) { return p === "civic" ? "Civic Space" : toTitleCase(p); });

                //Create tick marks
                label_group.selectAll("pillar-tick")
                    .data(pillars)
                    .enter().append("line")
                    .attr("class", "pillar-tick")
                    .attr("transform", function (p,j) { return "rotate(" + (angle(j) * 180 / Math.PI + 90) + ")"; })
                    .attr("x1", outer_radius * 1.06)
                    .attr("y1", 0)
                    .attr("x2", outer_radius * 1.02)
                    .attr("y2", 0)
                    .style("stroke-width", 0.5 * size_factor);

                // //Create the pillar labels that become visible on hover
                // //These radiate outward
                // label_group.selectAll(".pillar-label")
                //     .data(pillars)
                //     .enter().append("text")
                //     .attr("dy", ".35em")
                //     .attr("class", "pillar-label")
                //     .attr("text-anchor", function (d,i) { return angle(i) > 0 & angle(i) < Math.PI ? "end" : null; })
                //     .attr("transform", function (d,i) {
                //         return "rotate(" + (angle(i) * 180 / Math.PI + 90) + ")"
                //             + "translate(" + (outer_radius * 1.05) + ")"
                //             + (angle(i) > 0 & angle(i) < Math.PI ? "rotate(180)" : "");
                //     })
                //     .style("font-size", (4 * size_factor) + "px")
                //     .text(function (d) { return d === "transparency" ? "trans." : d === "protection" ? "prot." : d === "civic" ? "civic sp." : d; });
            }//if

        })//foreach

        //////////////////////////////////////////////////////////////
        /////////////////////// Create legend ////////////////////////
        ////////////////////////////////////////////////////////////// 

        create_legend();

        function create_legend() {
            
                var svg_world = d3.select("#country-svg-WOR").select("g");
                var world = svg_world.select("#country-WOR");
                var legend_group = svg_world.append("g")
                    .attr("class", "legend-group")
                    .style("pointer-events","none");

                var world_radius, 
                    world_scale = 3,
                    legend_scale = world_scale / size_factor;

                var legend_pulse;
            
                //Scale up the entire chart
                world.attr("transform", "scale(" + world_scale + ")");

                //Make the stroke a bit thinner
                world.selectAll(".inner-line")
                    .style("stroke-width", function () {
                        return d3.select(this).style("stroke-width") * 0.8;
                    });
            
                //Adjust the background circle
                world.select(".circle-background")
                    .style("filter", "url(#shadow-less)")
                    .attr("r", function () {
                        world_radius = d3.select(this).attr("r") * 1.8;
                        return world_radius;
                    });

                //Make the hover capture bigger and attach a legend scale increase mouse event to it
                svg_world.select(".circle-hover-capture")
                    .attr("r", world_scale * world_radius);

                if(!small_screen) {
                    svg_world.select(".circle-hover-capture")
                        .on("mouseover", function(d) {
                            d3.event.stopPropagation();

                            //Remove the pulsing circle
                            if(legend_pulse) legend_pulse.remove()

                            //Scale up the entire chart
                            world.attr("transform", "scale(" + legend_scale + ")");
                            legend_group.attr("transform", "scale(" + (legend_scale/world_scale) + ")");
                        })
                        .on("mouseout", function(d) {
                            //Scale back down
                            world.attr("transform", "scale(" + world_scale + ")");
                            legend_group.attr("transform", "scale(1)");
                        });
                }//if

                //Create a pulsing circle so people will hopefully hover it
                if(world_scale * world_radius > 50 && world_scale * world_radius < 200) {
                    setTimeout(function() {
                        //Based on https://bl.ocks.org/larsvers/697161052354e24f6276bebad175927c
                        legend_pulse = svg_world.append("circle")
                            .attr("class", "legend-pulse")
                            .attr("r", world_scale * world_radius * 0.9)
                            .attr("fill", article19_red)
                            .lower();
                    },2000) 
                }//if

                /////////////////////// Create arced outer title ///////////////////////
                var legend_outer_title_group = svg_world.append("g")
                    .attr("class", "legend-outer-title-group")
                    .lower();

                //Create the path for the name to arc around, but hide the path
                var rad = world_radius * world_scale * 1.06;
                legend_outer_title_group.append("path")
                    .attr("class", "legend-path")
                    .attr("id", "legend-path")
                    .attr("d", "M0," + rad + " A" + rad + "," + rad + " 0 1 1 0.01," + rad)
                    .style("fill", "none")
                    .style("display", "none")
            
                //Append the text
                legend_outer_title_group.append("text")
                    .attr("class", "legend-label")
                    .style("font-size", (17 * size_factor) + "px")
                    .append("textPath")
                    .attr("xlink:href", "#legend-path")
                    .attr("startOffset", "35%")
                    .text("how to read each country's chart");

                /////////////////////// Create title ///////////////////////
                var legend_title_group = legend_group.append("g")
                    .attr("class", "legend-title-group")
                    .attr("transform", "translate(0," + (-world_scale * outer_radius * 1.95) + ")");
            
                legend_title_group.append("text")
                    .attr("class", "legend-title-sub-text")
                    .attr("x", 0)
                    .attr("y", -25 * size_factor)
                    .attr("dy", "0.35em")
                    .style("font-size", (12 * size_factor) + "px")
                    .text("the");
                legend_title_group.append("text")
                    .attr("class", "legend-title-text")
                    .attr("x", 0)
                    .attr("y", 0)
                    .attr("dy", "0.35em")
                    .style("font-size", (34 * size_factor) + "px")
                    .text("legend");
            
                /////////////////////// Create pillar words ///////////////////////
                var legend_pillar_label_group = legend_group.append("g").attr("class", "legend-pillar-label-group");
            
                legend_pillar_label_group.selectAll(".legend-pillar-label")
                    .data(pillars)
                    .enter().append("text")
                    .attr("dy", ".35em")
                    .attr("class", "legend-pillar-label")
                    .attr("text-anchor", function (d, i) { return angle(i) > 0 & angle(i) < Math.PI ? "end" : null; })
                    .attr("transform", function (d, i) {
                        return "rotate(" + (angle(i) * 180 / Math.PI + 90) + ")"
                            + "translate(" + (world_scale * outer_radius * 1.15) + ")"
                            + (angle(i) > 0 & angle(i) < Math.PI ? "rotate(180)" : "");
                    })
                    .style("font-size", (14 * size_factor) + "px")
                    .text(function (d) { return d === "civic" ? "Civic Space" : toTitleCase(d); });
            
                legend_pillar_label_group.selectAll("legend-tick")
                    .data(pillars)
                    .enter().append("line")
                    .attr("class", "legend-tick")
                    .attr("transform", function (d, i) { return "rotate(" + (angle(i) * 180 / Math.PI + 90) + ")"; })
                    .attr("x1", world_scale * outer_radius * 1.1)
                    .attr("y1", 0)
                    .attr("x2", world_scale * outer_radius * 1.05)
                    .attr("y2", 0)
                    .style("stroke-width", 1 * size_factor);
            
                /////////////////////// Create size explanation ///////////////////////
                var legend_size_group = legend_group.append("g")
                    .attr("class", "legend-size-group")
                    .attr("transform", "translate(" + (-outer_radius * world_scale * 2.2) + "," + (-outer_radius * world_scale * 0.5) + ")");

                //The text
                //The circles size scales with the score for each pillar.  The large the circle, the better the score.
                legend_size_group.selectAll(".legend-size-text")
                    .data(["The circles' size scales", "with the score for each", "pillar. The larger the","circle, the better","the score"])
                    .enter().append("text")
                    .attr("class", "legend-size-text")
                    .attr("x", 0)
                    .attr("y", function (d,i) { return i * 15 * size_factor; })
                    .attr("dy", "0.35em")
                    .style("font-size", (11 * size_factor) + "px")
                    .text(function (d) { return d; });

                //Draw two small differently sized circles as an example
                legend_size_group.selectAll(".legend-size-circle")
                    .data([6, 14])
                    .enter().append("circle")
                    .attr("class", "legend-size-circle")
                    .attr("cx", 50 * size_factor)
                    .attr("cy", function(d) { return - size_factor * (d + 12); })
                    .attr("r", function(d) { return size_factor * d; })
                    .style("stroke-width", 1.5 * size_factor);

                /////////////////////// Create color explanation ///////////////////////

                var legend_color_group = legend_group.append("g")
                    .attr("class", "legend-color-group")
                    .attr("transform", "translate(" + (outer_radius * world_scale * 1.15) + "," + (-outer_radius * world_scale * 0.5) + ")");
            
                //The text
                legend_color_group.selectAll(".legend-color-text")
                    .data(["The lighter the color","the better that pillar's","score"])
                    .enter().append("text")
                    .attr("class", "legend-color-text")
                    .attr("x", 0)
                    .attr("y", function (d,i) { return i * 15 * size_factor; })
                    .attr("dy", "0.35em")
                    .style("font-size", (11 * size_factor) + "px")
                    .text(function (d) { return d; });

                //Create rectangle to fill with color gradient
                var rect_height = 6 * size_factor;
                legend_color_group.append("rect")
                    .attr("class", "legend-color-gradient")
                    .attr("x", 0)
                    .attr("y", -20 * size_factor)
                    .attr("width", 100 * size_factor)
                    .attr("height", rect_height)
                    .attr("rx", rect_height/2)
                    .attr("ry", rect_height/2)
                    .style("fill", "url(#color-gradient)");
    
                // var color_rad = 4;
                // legend_color_group.selectAll(".legend-color-circle")
                //     .data(d3.range(11).map(function(d) { return d/10;}).reverse())
                //     .enter().append("circle")
                //     .attr("class", "legend-color-circle")
                //     .attr("cx", function(d,i) { return size_factor * (color_rad +  i * (2*color_rad - 2)); })
                //     .attr("cy", -15 * size_factor)
                //     .attr("r",  color_rad * size_factor)
                //     .style("fill", function(d) { return color_scale(d); })
                //     .style("mix-blend-mode", "multiply");

                /////////////////////// Create low-high value explanation ///////////////////////
                var legend_range_group = legend_group.append("g")
                    .attr("class", "legend-range-group")
                    .attr("transform", "translate(" + (-outer_radius * world_scale * 1.6) + "," + (outer_radius * world_scale * 1.1) + ")");
        
                //The text
                //The inner circle indicates the lower boundary score for the pillar, and the lighter outer circle, the higher boundary score.
                legend_range_group.selectAll(".legend-range-text")
                    .data(["The inner circle indicates","the lower boundary score", "for the pillar, and the", "lighter outer circle, the", "higher boundary score"])
                    .enter().append("text")
                    .attr("class", "legend-range-text")
                    .attr("x", 0)
                    .attr("y", function (d,i) { return i * 15 * size_factor; })
                    .attr("dy", "0.35em")
                    .style("font-size", (11 * size_factor) + "px")
                    .text(function (d) { return d; });

                //Line connecting the text to the circles
                legend_range_group.append("path")
                    .attr("class", "legend-grey-line")
                    .attr("d", "M" + (95*size_factor) + "," + (-8*size_factor) + " L" + (95*size_factor) + "," + (-16*size_factor) + " L" + (130*size_factor) + "," + (-40*size_factor))
                    .style("stroke-width", 1.5 * size_factor);
            
                /////////////////////// Create grey background explanation ///////////////////////
                var legend_grey_group = legend_group.append("g")
                    .attr("class", "legend-grey-group")
                    .attr("transform", "translate(" + (outer_radius * world_scale * 0.5) + "," + (outer_radius * world_scale * 1.1) + ")");

                //The text
                legend_grey_group.selectAll(".legend-grey-text")
                    .data(["The grey background", "represents the size of", "the optimal score for","each expression pillar"])
                    .enter().append("text")
                    .attr("class", "legend-grey-text")
                    .attr("x", 0)
                    .attr("y", function (d,i) { return i * 15 * size_factor; })
                    .attr("dy", "0.35em")
                    .style("font-size", (11 * size_factor) + "px")
                    .text(function (d) { return d; });
                
                //Line connecting text to grey shape
                legend_grey_group.append("path")
                    .attr("class", "legend-grey-line")
                    .attr("d", "M" + (-3*size_factor) + "," + (1*size_factor) + " L" + (-15*size_factor) + "," + (1*size_factor) + " L" + (-28*size_factor) + "," + (-16*size_factor))
                    .style("stroke-width", 1.5 * size_factor);
            
            }//function create_legend

    }//function draw

    //What orientation or year
    //https://css-tricks.com/snippets/javascript/get-url-variables/
    function getQueryVariable(variable) {
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            if (pair[0] == variable) { return pair[1]; }
        }
        return (false);
    }//function getQueryVariable

    function toTitleCase(str) {
        return str.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
    }//function toTitleCase

}//function create_star_radar_chart