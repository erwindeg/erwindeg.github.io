/* 
 * Lazy Line Painter - Path Object 
 * Generated using 'SVG to Lazy Line Converter'
 * 
 * http://lazylinepainter.info 
 * Copyright 2013, Cam O'Connell  
 *  
 */ 
 
/* 
 * Lazy Line Painter - Path Object 
 * Generated using 'SVG to Lazy Line Converter'
 * 
 * http://lazylinepainter.info 
 * Copyright 2013, Cam O'Connell  
 *  
 */ 
 
/* 
 * Lazy Line Painter - Path Object 
 * Generated using 'SVG to Lazy Line Converter'
 * 
 * http://lazylinepainter.info 
 * Copyright 2013, Cam O'Connell  
 *  
 */ 
 
var pathObj = {
    "icons": {
        "strokepath": [
            {
                "path": "M190.3,184.3c-9.4-12.1-21.8-30.4-21.1-57.5c2.8-24,21.2-20.2,21.3,5c-2.3,34.8-13.6,73.6-30.7,75.5   c-10.4,10.4-23.5-31-7.1-27.6c3.3-0.7,6.2,3.1,9.4,4.6",
                "duration": 600
            },
            {
                "path": "M 208 143 L 208 161.4",
                "duration": 200
            },
            {
                "path": "M215,184.3c3.7-17.5,23.5-26.6,15.5,2.3c-1.4,7.2-3.2,13.9-4.9,20.6 M229.2,193.5c4.6-19.1,23.1-41.6,28-18.1   c-1.2,11.6-4.3,21.5-6.8,31.9 M253.9,193.5c4.3-19.7,25.4-43.8,28.2-14.8c-8,17.5-0.2,37.8,9,25.3c4.9-3.6,8.5-12.4,12.3-19.7",
                "duration": 600
            },
            {
                "path": "M409.4,129.3c2.9,25,24-1.8,8.9-14.6c-11.1-5.3-23.2-6.3-34.1,2c-12.2,22.5,10.6,43.6,13,40.1   c-9,0.7-22.3-1.9-26.5,20.2c-1.2,33.6,20,31.6,30.5,29.3c7.2-2,14.6-8.1,18.8-22",
                "duration": 600
            },
            {
                "path": "M430.5,184.3c6.1-6.7,9.5-31,12.5-13.6c12.2-7.7,14,13.7,9.1,32.2c8.3,12.8,18.2-5.8,24.4-18.6",
                "duration": 600
            },
            {
                "path": "M487.1,166c-10,2.8-15.9,44.1-2.2,41.5c5.9-0.8,11.5-6.7,16.4-14 M508.3,166c-4.9,13.8-12.7,46.5,1.9,41.5   c9.5-2.4,21.5-15.6,19.3-41.5 M529.5,166c2.2,26.9,11.6,26.6,21.2,18.3",
                "duration": 300
            },
            {
                "path": "M561.3,143C561.5,156.2,568.2,137.8,561.3,143L561.3,143z M550.7,184.3c2.5-6.3,9.7-26,4.1-6.5   c-8.6,16.5-1.3,39.7,8.5,25.9c4.9-3.5,8.4-12.2,12.2-19.4",
                "duration": 400
            },
            {
                "path": "M575.4,184.3c3.6-17.5,23.4-26.6,15.5,2.3c-1.4,7.2-3.2,13.9-4.9,20.6 M589.5,193.5   c4.3-19.7,25.4-43.8,28.2-14.8c-8,17.5-0.2,37.8,9,25.3c4.9-3.6,8.5-12.4,12.2-19.7",
                "duration": 400
            }
        ],
        "dimensions": {
            "width": 800,
            "height": 600
        }
    }
}; 
 
 


 
 
/* 
 Setup and Paint your lazyline! 
 */ 
 
 $(document).ready(function(){ 
 $('#icons').lazylinepainter( 
 {
    "svgData": pathObj,
    "strokeWidth": 10,
    "strokeColor": "#FFFFFF"
}).lazylinepainter('paint'); 
 });