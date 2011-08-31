    /* Метакомментарии и декларация стиля
        — Стиль расстановки фигурных скобок: по Кернигену и Ричи.
        — Комментарии даются после строки, исходя из следующей логики:
            • если комментарий не выходит за пределы 72-символьной ширины
              он даётся после точки с запятой;
            • иначе — на следующей строке;
        — Комментарии разбиваются на 72-символьной (±5) ширине.
        — Все комментарии оформляются как однострочные.
        — Все метакомментарии оформляются как многострочные.
        — В качестве отступа используется 4 пробела.
        — Табуляции не используются вообще.
    */
    
    // #393939 — бэкграунд
    // #d4d4d4 — фореграунд
    
    var background = "#393939";
    var foreground = "#d4d4d4";
    
    var paper = Raphael("logo", 68, 68);
    
    // Объявили область рисования
    
    var cx = 33; // x0
    var cy = 33; // y0
    var R = 33; // Радиус
    
    var head = paper.circle(cx, cy, R); // Создали круг
    head.attr("fill", foreground); // Заполнили его фореграундои
    
    head.attr("stroke", "none"); // Единственный кроссбраузерный вариант.
    // head.attr("stroke-width", 0); || head.attr("stroke-width", "0");
    // Такое не работает, в кавычках или без — не важно
    // head.attr("stroke-width", 1); -> head.attr("stroke", "#d4d4d4"); 
    // Тоже не работает.
    // head.attr("stroke-width", 0); -> head.attr("stroke", "#393939");
    // Тоже нет.
    // Что обидно, — неадекватничает Хромиум. Так, ладно...
    
    var n   =   9;  // Это стартовые P0y и P2y для кривой Безье 
    var m   =   13; // заботливо определенные по исходному рисунку.
    // Исходим из предположения что исходный рисунок получился идеальным
    // и нам следует свести расхождения с ним к минимуму.
    // Они же — минимальное и максимальное отклонения от центра по OY
    // для кривой.
    
    var z   =   m - n; // Понадобиться при рассчёте действительных Py.
    
    /* Следующий блог кода создан для эмпирического определения P3xy,
       поскольку теоретическое определение в данном случае невозможно.
    */
    // Убирая вверху слэш комментируем весь экспериментальный код.      Триггер!
    
    //var cx = 33; // x0
    //var cy = 33; // y0
    
    var nr = cy + n; // y для P0
    var mr = cy + m; // y для P2
    // Из-за идиотизма стандартов консорциума, не осиливших помещать 0, 0
    // в центр svg или хотя бы не переворачивать декартову систему
    // координат вниз головой — применяем соответствующие поправки
    // ко всем величинам.
    
    function sq(number) {
        return Math.sqrt(number);
    }
    function p2(number) {
        return Math.pow(number,2);
    }
    
    
    
    var P0y = nr;
    var P2y = mr;
    
    //var R = 33;
    
    var P0x = cx - sq(    (  p2(R) - p2( (nr - cy) )  )    );
    var P2x = cx + sq(    (  p2(R) - p2( (mr - cy) )  )    );
    // Очевидно.
    
    // Рисуем отрезок.
    //var pathstring  = "M" + P0x + " " + P0y + "L" + P2x + " " + P2y;
    //var bezier = paper.path(pathstring);
    // Всё получилось правильно, отлично.
    
    // Рисуем кривую Безье. Подбираем  P1xy
    // А, стоп. Я придумал как их вывести из рисунка. Сейчас... Ага!
    // Ого.
    // Вы не поверите... 25 × 25! Реально волшебный рисунок.
    // Нет, правда. Я ничего не округлял и не подгонял.
    // Офигенно, а?
    
    var P1x = 25;
    var P1y = 25;
    
    var pathstring  = "M" + P0x + " " + P0y + "Q " +  P1x + " " + P1y  + " " + P2x + " " + P2y;
    var bezier = paper.path(pathstring);
    
    // А вот толщину линии я подберу уже действительно эмпирически.
    bezier.attr("stroke", background);
    bezier.attr("stroke-width", 2); // Подобрал, хе-хе.
    
    var l = cx - P1x;
    // Максимальное отклонение, нужно для коэффициента линейного уравнения
    // рассчёта P1x. P1y = 25 = const (из определения кривой Безье).
    
    // Всё. Статика готова. Оживляем...
    //*/                                                                Триггер!
    
    var ww; // Ширина экрана
    var wh; // Высота экрана
    
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
    // Определяем высоту и ширину экрана. Самое время.
    
    var kx; // Коэффициент для определения параметров кривой Безье.
    var ky;
    
    var r = 7;
    var f = 6.5; // Смещение глазика вниз.
    
    
    var dexter = paper.circle(15, 36 + f, r); // Создали круг — правый глаз.
    dexter.attr("fill", background); // Заполнили его бэкграундом.
    dexter.attr("stroke", "none");
    
    var sinister = paper.circle(35, 35 + f, r); // Создали круг — левый глаз.
    sinister.attr("fill", background); // Заполнили его бэкграундом.
    sinister.attr("stroke", "none");
    
    
    //Pxy = "P0x = " + P2y; //
    //alert(Pxy);//                                                     Дебаг!
    
    var ta = 0.26749; // Параметр t кривой Безье, получен решением квадратного уравнения по иксу (игрек изначально порочен, а тут дал слишком большую погрешность).
    var tb = 0.6; // Ещё один.
    

    var tmin = ta;
    var tmax = 1 - tmin;
    
    
    var Smin = tb - ta;
    // alert(tmax); // Сколько там у нас вышло? Ага...                  Дебаг!
    var Smax = tmax - tmin;
    // alert(Smax); // Сколько там у нас вышло? Ага...                  Дебаг!
    
    
    
    
    
    var t = ta; //                                                      Дебаг!
    
    var tkmin = ( tmin + tb )  /  2;
    var tkmax = 1 - tkmin;
    //alert(tkmax);//                                                   Дебаг!
    
    
    //var S = (ky + 2.50932) / 7.54660; // Коэффициенты получены решением линейного уравнения.
    //var tk = (kx + 3.27329) / 7.54660 
    
    
    //var ex = (  p2( (1 - t) )  ) * P0x  + 2 * t * P1x * (1 - t) + ( p2(t) * P2x );
    //var ey = (  p2( (1 - t) )  ) * P0y  + 2 * t * P1y * (1 - t) + ( p2(t) * P2y );
    // По уравнению квадратичной кривой Безье из опорных точек и t выводим x и y.
    
    
    
    
    //var tester = paper.circle(ex, ey + f, r); // Создали круг — правый глаз.
    //tester.attr("fill", "#00ff00"); // Заполнили его бэкграундом.
    //tester.attr("stroke", "none");
    
    
    
    
    onload = function() { 
        document.onmousemove = function(e) {  //                        Фу! Раскидать всё содержимое по функциям и вызывать их!
            if(!e) e = event; 
            var curx = e.clientX;
            var cury = e.clientY;

            //document.getElementById("test").innerHTML = "Скажите, работает ли в МСИЕ, пожалуйста. И да, " + curx + ", " + cury; 
            //                                                          Дебаг!
            
            
            
            if (document.body && document.body.offsetWidth) { //        Фу!
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
            
            
            paper.clear();
            
            head = paper.circle(cx, cy, R);  //                         Фу!
            head.attr("fill", foreground);    //                         Фу!
            head.attr("stroke", "none");     //                         Фу!
            
            
            
            
            kx = curx / ww;
            ky = cury / wh;
            // Рассчитали коэффициент kx.
            
            // Поехали чертить кривую.
            
            P0y = cy - (-z * kx - n); // Ещё немного линейных уравнений.
            P2y = 25;
            P2y = cy + (m - z * kx);
            
            ll = l / 10;
            P0x = cx - sq(    (  p2(R) - p2( (P0y - cy) )  )    );
            P1x = cx + (  (kx - ll)/0.1  );
            P2x = cx + sq(    (  p2(R) - p2( (P2y - cy) )  )    );
            
            var pathstring  = "M" + P0x + " " + P0y + "Q " +  P1x + " " + P1y  + " " + P2x + " " + P2y;
            var bezier = paper.path(pathstring);
            bezier.attr("stroke", background);
            bezier.attr("stroke-width", 2); // Подобрал, хе-хе.
            
            
            var S = (ky + 2.50932) / 7.54660; // Коэффициенты получены решением линейного уравнения.
            var tk = (kx + 3.27329) / 7.54660 
            
            var t1; // Первый глазик.
            var t2; // Второй глазик.
            
            var s = S / 2;
            
            t1 = tk - s;
            t2 = tk + s;
            
                        
            if (t1 <= tmin && t2 < tmax) { //                           Фу! Сократить!
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
            // По уравнению квадратичной кривой Безье из опорных точек и t выводим x и y.
            
            var sex = (  p2( (1 - t2) )  ) * P0x  + 2 * t2 * P1x * (1 - t2) + ( p2(t2) * P2x );
            var sey = (  p2( (1 - t2) )  ) * P0y  + 2 * t2 * P1y * (1 - t2) + ( p2(t2) * P2y );
            
            var dexter = paper.circle(dex, dey + f, r); // Создали круг — правый глаз.
            dexter.attr("fill", background); // Заполнили его бэкграундом.
            dexter.attr("stroke", "none");
            
            var sinister = paper.circle(sex, sey + f, r); // Создали круг — правый глаз.
            sinister.attr("fill", background); // Заполнили его бэкграундом.
            sinister.attr("stroke", "none");
            
        } 
    }
    /*
    document.onclick = function() {
        w = ww + ", " + wh;
        alert(w);
        
    } //                                                                Дебаг!
    */
    // А теперь вводим коэффициент положения курсора по оси OX.
    //var kx = ww;
    
    
    
    // #393939 — бэкграунд
    // #d4d4d4 — фореграунд
