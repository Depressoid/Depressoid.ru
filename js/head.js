(function(){
    function sq(number) {
        return Math.sqrt(number);
    }
    function p2(number) {
        return Math.pow(number,2);
    }

    var background = "#393939";
    var foreground = "#d4d4d4";
    var cx = 33; // x0
    var cy = 33; // y0
    var R = 33; // Радиус
    var n   =   9;  // Это стартовые P0y и P2y для кривой Безье 
    var m   =   13; // заботливо определенные по исходному рисунку.
    var z   =   m - n; // Понадобиться при рассчёте действительных Py.
    var nr = cy + n; // y для P0
    var mr = cy + m; // y для P2
    var P0y = nr;
    var P2y = mr;
    var P0x = cx - sq(    (  p2(R) - p2( (nr - cy) )  )    );
    var P2x = cx + sq(    (  p2(R) - p2( (mr - cy) )  )    );
    var P1x = 25;
    var P1y = 25;
    var l = cx - P1x;
    var ww; 
    var wh; 
    var pkx; 
    var pky;
    var r = 7;
    var f = 6.5; 
    var ta = 0.26749;
    var tb = 0.6;
    var tmin = ta;
    var tmax = 1 - tmin;
    var Smin = tb - ta;
    var Smax = tmax - tmin;
    var t = ta;
    var tkmin = ( tmin + tb )  /  2;
    var tkmax = 1 - tkmin;
    

    var paper = Raphael("logo", 68, 68);
    
    var whereami = document.location.href;
    var keyletter = whereami.slice(-2,-1);
    
    var referrer = document.referrer;
    
    if ( keyletter == "u" ) { // home
        if ( whereami.slice(0,18) == referrer.slice(0,18) ) {
            drawhead(0.384375,0.1539379);
        }
        else {
            drawhead(0.065625,0.048926);
        }
    }
    else if ( keyletter == "k" ) { // works
        drawhead(0.49296875,0.1539379);
    }
    else if ( keyletter == "t" ) { // contacts
        drawhead(0.6109375,0.1539379);
    }
    
    //onclick = function() { 
            //document.onmousemove = function(e) {
            //if(!e) e = event; 
            //var curx = e.clientX;
            //var cury = e.clientY;
            
            //if (document.body && document.body.offsetWidth) { 
                //ww = document.body.offsetWidth;
                //wh = document.body.offsetHeight;
            //}
            //if (document.compatMode=='CSS1Compat' &&
                //document.documentElement &&
                //document.documentElement.offsetWidth ) {
    
                //ww = document.documentElement.offsetWidth;
                //wh = document.documentElement.offsetHeight;
            //}
            //if (window.innerWidth && window.innerHeight) {
                //ww = window.innerWidth;
                //wh = window.innerHeight;
            //}

            //pkx = curx / ww;
            //pky = cury / wh;
            //pk = pkx + ", " + pky;

        //}
        //alert(pk);
    //}
    
    function drawhead(kx, ky) {
        head = paper.circle(cx, cy, R);  
        head.attr("fill", foreground);   
        head.attr("stroke", "none");   
        
        
        P0y = cy - (-z * kx - n); 
        P2y = 25;
        P2y = cy + (m - z * kx);
        
        ll = l / 10;
        P0x = cx - sq(    (  p2(R) - p2( (P0y - cy) )  )    );
        P1x = cx + (  (kx - ll)/0.1  );
        P2x = cx + sq(    (  p2(R) - p2( (P2y - cy) )  )    );
        
        var pathstring  = "M" + P0x + " " + P0y + "Q " +  P1x + " " + P1y  + " " + P2x + " " + P2y;
        var bezier = paper.path(pathstring);
        bezier.attr("stroke", background);
        bezier.attr("stroke-width", 2); 
        
        
        var S = (ky + 2.50932) / 7.54660; 
        var tk = (kx + 3.27329) / 7.54660 
        
        var t1; 
        var t2; 
        
        var s = S / 2;
        
        t1 = tk - s;
        t2 = tk + s;
        
        if (t1 <= tmin && t2 < tmax) {
            t1 = tmin;
            t2 = t1 + S;
        }
        
        if (t1 > tmin && t2 >= tmax) {
            t2 = tmax;
            t1 = t2 - S;
        }
        
        if (t1 > tmin && t2 < tmax) {
            var path = "path";
        }
        
        if (t1 <= tmin && t2 >= tmax) {
            t1 = tmin;
            t2 = tmax;
        }
        
        var dex = (  p2( (1 - t1) )  ) * P0x  + 2 * t1 * P1x * (1 - t1) + ( p2(t1) * P2x );
        var dey = (  p2( (1 - t1) )  ) * P0y  + 2 * t1 * P1y * (1 - t1) + ( p2(t1) * P2y );
        
        var sex = (  p2( (1 - t2) )  ) * P0x  + 2 * t2 * P1x * (1 - t2) + ( p2(t2) * P2x );
        var sey = (  p2( (1 - t2) )  ) * P0y  + 2 * t2 * P1y * (1 - t2) + ( p2(t2) * P2y );
        
        var dexter = paper.circle(dex, dey + f, r);
        dexter.attr("fill", background);
        dexter.attr("stroke", "none");
        
        var sinister = paper.circle(sex, sey + f, r);
        sinister.attr("fill", background);
        sinister.attr("stroke", "none");
    }
    
    
    onload = function() { 
        document.onmousemove = function(e) {
            if(!e) e = event; 
            var curx = e.clientX;
            var cury = e.clientY;
            
            if (document.body && document.body.offsetWidth) { 
                ww = document.body.offsetWidth;
                wh = document.body.offsetHeight;
            }
            if (document.compatMode=='CSS1Compat' &&
                document.documentElement &&
                document.documentElement.offsetWidth ) {
    
                ww = document.documentElement.offsetWidth;
                wh = document.documentElement.offsetHeight;
            }
            if (window.innerWidth && window.innerHeight) {
                ww = window.innerWidth;
                wh = window.innerHeight;
            }

            pkx = curx / ww;
            pky = cury / wh;
            
            paper.clear();
            drawhead(pkx, pky);
        } 
    }
})();
