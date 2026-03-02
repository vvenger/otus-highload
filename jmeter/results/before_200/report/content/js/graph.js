/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
$(document).ready(function() {

    $(".click-title").mouseenter( function(    e){
        e.preventDefault();
        this.style.cursor="pointer";
    });
    $(".click-title").mousedown( function(event){
        event.preventDefault();
    });

    // Ugly code while this script is shared among several pages
    try{
        refreshHitsPerSecond(true);
    } catch(e){}
    try{
        refreshResponseTimeOverTime(true);
    } catch(e){}
    try{
        refreshResponseTimePercentiles();
    } catch(e){}
});


var responseTimePercentilesInfos = {
        data: {"result": {"minY": 69.0, "minX": 0.0, "maxY": 5150.0, "series": [{"data": [[0.0, 69.0], [0.1, 75.0], [0.2, 89.0], [0.3, 94.0], [0.4, 114.0], [0.5, 131.0], [0.6, 155.0], [0.7, 165.0], [0.8, 177.0], [0.9, 181.0], [1.0, 193.0], [1.1, 207.0], [1.2, 212.0], [1.3, 222.0], [1.4, 241.0], [1.5, 249.0], [1.6, 263.0], [1.7, 272.0], [1.8, 283.0], [1.9, 292.0], [2.0, 306.0], [2.1, 316.0], [2.2, 320.0], [2.3, 340.0], [2.4, 345.0], [2.5, 351.0], [2.6, 362.0], [2.7, 366.0], [2.8, 374.0], [2.9, 394.0], [3.0, 407.0], [3.1, 423.0], [3.2, 437.0], [3.3, 458.0], [3.4, 472.0], [3.5, 490.0], [3.6, 503.0], [3.7, 516.0], [3.8, 537.0], [3.9, 547.0], [4.0, 557.0], [4.1, 573.0], [4.2, 582.0], [4.3, 593.0], [4.4, 600.0], [4.5, 628.0], [4.6, 635.0], [4.7, 646.0], [4.8, 655.0], [4.9, 668.0], [5.0, 692.0], [5.1, 710.0], [5.2, 729.0], [5.3, 761.0], [5.4, 782.0], [5.5, 795.0], [5.6, 809.0], [5.7, 825.0], [5.8, 835.0], [5.9, 859.0], [6.0, 873.0], [6.1, 880.0], [6.2, 890.0], [6.3, 898.0], [6.4, 910.0], [6.5, 916.0], [6.6, 924.0], [6.7, 936.0], [6.8, 939.0], [6.9, 942.0], [7.0, 948.0], [7.1, 952.0], [7.2, 962.0], [7.3, 971.0], [7.4, 975.0], [7.5, 981.0], [7.6, 992.0], [7.7, 995.0], [7.8, 1001.0], [7.9, 1010.0], [8.0, 1018.0], [8.1, 1021.0], [8.2, 1028.0], [8.3, 1029.0], [8.4, 1039.0], [8.5, 1042.0], [8.6, 1046.0], [8.7, 1052.0], [8.8, 1056.0], [8.9, 1062.0], [9.0, 1071.0], [9.1, 1087.0], [9.2, 1102.0], [9.3, 1110.0], [9.4, 1115.0], [9.5, 1122.0], [9.6, 1135.0], [9.7, 1143.0], [9.8, 1147.0], [9.9, 1155.0], [10.0, 1160.0], [10.1, 1166.0], [10.2, 1186.0], [10.3, 1197.0], [10.4, 1213.0], [10.5, 1219.0], [10.6, 1230.0], [10.7, 1235.0], [10.8, 1242.0], [10.9, 1249.0], [11.0, 1253.0], [11.1, 1258.0], [11.2, 1277.0], [11.3, 1279.0], [11.4, 1294.0], [11.5, 1305.0], [11.6, 1313.0], [11.7, 1324.0], [11.8, 1326.0], [11.9, 1335.0], [12.0, 1337.0], [12.1, 1344.0], [12.2, 1349.0], [12.3, 1352.0], [12.4, 1360.0], [12.5, 1363.0], [12.6, 1370.0], [12.7, 1376.0], [12.8, 1390.0], [12.9, 1394.0], [13.0, 1414.0], [13.1, 1422.0], [13.2, 1441.0], [13.3, 1446.0], [13.4, 1450.0], [13.5, 1459.0], [13.6, 1465.0], [13.7, 1471.0], [13.8, 1483.0], [13.9, 1487.0], [14.0, 1488.0], [14.1, 1493.0], [14.2, 1506.0], [14.3, 1512.0], [14.4, 1516.0], [14.5, 1525.0], [14.6, 1532.0], [14.7, 1533.0], [14.8, 1549.0], [14.9, 1561.0], [15.0, 1572.0], [15.1, 1574.0], [15.2, 1583.0], [15.3, 1589.0], [15.4, 1599.0], [15.5, 1603.0], [15.6, 1610.0], [15.7, 1613.0], [15.8, 1623.0], [15.9, 1626.0], [16.0, 1640.0], [16.1, 1655.0], [16.2, 1666.0], [16.3, 1676.0], [16.4, 1689.0], [16.5, 1700.0], [16.6, 1712.0], [16.7, 1722.0], [16.8, 1736.0], [16.9, 1739.0], [17.0, 1745.0], [17.1, 1752.0], [17.2, 1767.0], [17.3, 1780.0], [17.4, 1787.0], [17.5, 1801.0], [17.6, 1810.0], [17.7, 1816.0], [17.8, 1825.0], [17.9, 1831.0], [18.0, 1846.0], [18.1, 1856.0], [18.2, 1860.0], [18.3, 1872.0], [18.4, 1877.0], [18.5, 1882.0], [18.6, 1886.0], [18.7, 1893.0], [18.8, 1898.0], [18.9, 1905.0], [19.0, 1914.0], [19.1, 1921.0], [19.2, 1924.0], [19.3, 1933.0], [19.4, 1940.0], [19.5, 1944.0], [19.6, 1947.0], [19.7, 1957.0], [19.8, 1963.0], [19.9, 1980.0], [20.0, 1984.0], [20.1, 1986.0], [20.2, 1992.0], [20.3, 2001.0], [20.4, 2012.0], [20.5, 2021.0], [20.6, 2028.0], [20.7, 2033.0], [20.8, 2039.0], [20.9, 2048.0], [21.0, 2057.0], [21.1, 2066.0], [21.2, 2077.0], [21.3, 2085.0], [21.4, 2090.0], [21.5, 2097.0], [21.6, 2098.0], [21.7, 2103.0], [21.8, 2105.0], [21.9, 2109.0], [22.0, 2115.0], [22.1, 2117.0], [22.2, 2122.0], [22.3, 2124.0], [22.4, 2137.0], [22.5, 2140.0], [22.6, 2141.0], [22.7, 2146.0], [22.8, 2151.0], [22.9, 2156.0], [23.0, 2158.0], [23.1, 2165.0], [23.2, 2170.0], [23.3, 2172.0], [23.4, 2177.0], [23.5, 2181.0], [23.6, 2183.0], [23.7, 2190.0], [23.8, 2191.0], [23.9, 2196.0], [24.0, 2199.0], [24.1, 2202.0], [24.2, 2205.0], [24.3, 2211.0], [24.4, 2216.0], [24.5, 2220.0], [24.6, 2225.0], [24.7, 2229.0], [24.8, 2232.0], [24.9, 2238.0], [25.0, 2239.0], [25.1, 2242.0], [25.2, 2247.0], [25.3, 2255.0], [25.4, 2258.0], [25.5, 2262.0], [25.6, 2264.0], [25.7, 2269.0], [25.8, 2273.0], [25.9, 2275.0], [26.0, 2283.0], [26.1, 2290.0], [26.2, 2295.0], [26.3, 2305.0], [26.4, 2310.0], [26.5, 2315.0], [26.6, 2323.0], [26.7, 2329.0], [26.8, 2332.0], [26.9, 2334.0], [27.0, 2343.0], [27.1, 2348.0], [27.2, 2350.0], [27.3, 2357.0], [27.4, 2364.0], [27.5, 2375.0], [27.6, 2376.0], [27.7, 2381.0], [27.8, 2387.0], [27.9, 2392.0], [28.0, 2399.0], [28.1, 2401.0], [28.2, 2406.0], [28.3, 2411.0], [28.4, 2415.0], [28.5, 2426.0], [28.6, 2428.0], [28.7, 2433.0], [28.8, 2440.0], [28.9, 2441.0], [29.0, 2448.0], [29.1, 2454.0], [29.2, 2458.0], [29.3, 2463.0], [29.4, 2465.0], [29.5, 2468.0], [29.6, 2469.0], [29.7, 2473.0], [29.8, 2480.0], [29.9, 2487.0], [30.0, 2490.0], [30.1, 2495.0], [30.2, 2499.0], [30.3, 2502.0], [30.4, 2504.0], [30.5, 2507.0], [30.6, 2509.0], [30.7, 2510.0], [30.8, 2514.0], [30.9, 2517.0], [31.0, 2521.0], [31.1, 2525.0], [31.2, 2529.0], [31.3, 2536.0], [31.4, 2538.0], [31.5, 2543.0], [31.6, 2545.0], [31.7, 2549.0], [31.8, 2553.0], [31.9, 2558.0], [32.0, 2562.0], [32.1, 2564.0], [32.2, 2569.0], [32.3, 2572.0], [32.4, 2576.0], [32.5, 2578.0], [32.6, 2583.0], [32.7, 2583.0], [32.8, 2586.0], [32.9, 2590.0], [33.0, 2594.0], [33.1, 2594.0], [33.2, 2600.0], [33.3, 2601.0], [33.4, 2603.0], [33.5, 2608.0], [33.6, 2612.0], [33.7, 2615.0], [33.8, 2619.0], [33.9, 2625.0], [34.0, 2629.0], [34.1, 2632.0], [34.2, 2634.0], [34.3, 2636.0], [34.4, 2639.0], [34.5, 2642.0], [34.6, 2644.0], [34.7, 2650.0], [34.8, 2651.0], [34.9, 2653.0], [35.0, 2655.0], [35.1, 2656.0], [35.2, 2658.0], [35.3, 2664.0], [35.4, 2667.0], [35.5, 2669.0], [35.6, 2673.0], [35.7, 2674.0], [35.8, 2677.0], [35.9, 2679.0], [36.0, 2683.0], [36.1, 2686.0], [36.2, 2688.0], [36.3, 2692.0], [36.4, 2695.0], [36.5, 2699.0], [36.6, 2702.0], [36.7, 2705.0], [36.8, 2708.0], [36.9, 2712.0], [37.0, 2714.0], [37.1, 2717.0], [37.2, 2717.0], [37.3, 2719.0], [37.4, 2722.0], [37.5, 2728.0], [37.6, 2729.0], [37.7, 2733.0], [37.8, 2737.0], [37.9, 2740.0], [38.0, 2742.0], [38.1, 2748.0], [38.2, 2754.0], [38.3, 2756.0], [38.4, 2758.0], [38.5, 2760.0], [38.6, 2763.0], [38.7, 2764.0], [38.8, 2769.0], [38.9, 2771.0], [39.0, 2774.0], [39.1, 2777.0], [39.2, 2779.0], [39.3, 2781.0], [39.4, 2786.0], [39.5, 2789.0], [39.6, 2792.0], [39.7, 2793.0], [39.8, 2795.0], [39.9, 2800.0], [40.0, 2802.0], [40.1, 2804.0], [40.2, 2807.0], [40.3, 2809.0], [40.4, 2810.0], [40.5, 2813.0], [40.6, 2817.0], [40.7, 2820.0], [40.8, 2823.0], [40.9, 2826.0], [41.0, 2829.0], [41.1, 2832.0], [41.2, 2833.0], [41.3, 2835.0], [41.4, 2839.0], [41.5, 2841.0], [41.6, 2845.0], [41.7, 2847.0], [41.8, 2848.0], [41.9, 2851.0], [42.0, 2853.0], [42.1, 2855.0], [42.2, 2856.0], [42.3, 2857.0], [42.4, 2859.0], [42.5, 2861.0], [42.6, 2863.0], [42.7, 2865.0], [42.8, 2869.0], [42.9, 2870.0], [43.0, 2871.0], [43.1, 2873.0], [43.2, 2875.0], [43.3, 2876.0], [43.4, 2878.0], [43.5, 2879.0], [43.6, 2881.0], [43.7, 2882.0], [43.8, 2885.0], [43.9, 2887.0], [44.0, 2891.0], [44.1, 2893.0], [44.2, 2899.0], [44.3, 2901.0], [44.4, 2904.0], [44.5, 2906.0], [44.6, 2908.0], [44.7, 2911.0], [44.8, 2914.0], [44.9, 2917.0], [45.0, 2919.0], [45.1, 2921.0], [45.2, 2924.0], [45.3, 2927.0], [45.4, 2930.0], [45.5, 2931.0], [45.6, 2932.0], [45.7, 2937.0], [45.8, 2938.0], [45.9, 2939.0], [46.0, 2941.0], [46.1, 2944.0], [46.2, 2946.0], [46.3, 2947.0], [46.4, 2949.0], [46.5, 2950.0], [46.6, 2951.0], [46.7, 2953.0], [46.8, 2954.0], [46.9, 2956.0], [47.0, 2958.0], [47.1, 2961.0], [47.2, 2964.0], [47.3, 2965.0], [47.4, 2965.0], [47.5, 2966.0], [47.6, 2968.0], [47.7, 2969.0], [47.8, 2971.0], [47.9, 2974.0], [48.0, 2975.0], [48.1, 2976.0], [48.2, 2977.0], [48.3, 2979.0], [48.4, 2979.0], [48.5, 2983.0], [48.6, 2984.0], [48.7, 2985.0], [48.8, 2989.0], [48.9, 2989.0], [49.0, 2990.0], [49.1, 2992.0], [49.2, 2994.0], [49.3, 2997.0], [49.4, 2998.0], [49.5, 3000.0], [49.6, 3004.0], [49.7, 3004.0], [49.8, 3006.0], [49.9, 3008.0], [50.0, 3010.0], [50.1, 3011.0], [50.2, 3013.0], [50.3, 3015.0], [50.4, 3016.0], [50.5, 3019.0], [50.6, 3021.0], [50.7, 3023.0], [50.8, 3024.0], [50.9, 3025.0], [51.0, 3029.0], [51.1, 3031.0], [51.2, 3034.0], [51.3, 3036.0], [51.4, 3038.0], [51.5, 3039.0], [51.6, 3041.0], [51.7, 3044.0], [51.8, 3045.0], [51.9, 3046.0], [52.0, 3047.0], [52.1, 3048.0], [52.2, 3051.0], [52.3, 3053.0], [52.4, 3057.0], [52.5, 3057.0], [52.6, 3059.0], [52.7, 3061.0], [52.8, 3062.0], [52.9, 3064.0], [53.0, 3065.0], [53.1, 3068.0], [53.2, 3070.0], [53.3, 3071.0], [53.4, 3073.0], [53.5, 3077.0], [53.6, 3078.0], [53.7, 3081.0], [53.8, 3083.0], [53.9, 3085.0], [54.0, 3086.0], [54.1, 3088.0], [54.2, 3091.0], [54.3, 3092.0], [54.4, 3094.0], [54.5, 3097.0], [54.6, 3100.0], [54.7, 3102.0], [54.8, 3104.0], [54.9, 3108.0], [55.0, 3110.0], [55.1, 3112.0], [55.2, 3114.0], [55.3, 3117.0], [55.4, 3119.0], [55.5, 3122.0], [55.6, 3123.0], [55.7, 3125.0], [55.8, 3126.0], [55.9, 3129.0], [56.0, 3132.0], [56.1, 3135.0], [56.2, 3138.0], [56.3, 3143.0], [56.4, 3144.0], [56.5, 3145.0], [56.6, 3147.0], [56.7, 3148.0], [56.8, 3150.0], [56.9, 3154.0], [57.0, 3156.0], [57.1, 3158.0], [57.2, 3161.0], [57.3, 3162.0], [57.4, 3164.0], [57.5, 3166.0], [57.6, 3168.0], [57.7, 3171.0], [57.8, 3173.0], [57.9, 3174.0], [58.0, 3175.0], [58.1, 3175.0], [58.2, 3176.0], [58.3, 3179.0], [58.4, 3183.0], [58.5, 3185.0], [58.6, 3188.0], [58.7, 3191.0], [58.8, 3193.0], [58.9, 3196.0], [59.0, 3196.0], [59.1, 3201.0], [59.2, 3203.0], [59.3, 3205.0], [59.4, 3207.0], [59.5, 3208.0], [59.6, 3210.0], [59.7, 3211.0], [59.8, 3212.0], [59.9, 3215.0], [60.0, 3217.0], [60.1, 3220.0], [60.2, 3221.0], [60.3, 3223.0], [60.4, 3227.0], [60.5, 3229.0], [60.6, 3230.0], [60.7, 3234.0], [60.8, 3237.0], [60.9, 3239.0], [61.0, 3242.0], [61.1, 3245.0], [61.2, 3246.0], [61.3, 3248.0], [61.4, 3252.0], [61.5, 3256.0], [61.6, 3259.0], [61.7, 3261.0], [61.8, 3264.0], [61.9, 3267.0], [62.0, 3271.0], [62.1, 3273.0], [62.2, 3278.0], [62.3, 3280.0], [62.4, 3283.0], [62.5, 3285.0], [62.6, 3287.0], [62.7, 3289.0], [62.8, 3291.0], [62.9, 3292.0], [63.0, 3295.0], [63.1, 3297.0], [63.2, 3299.0], [63.3, 3301.0], [63.4, 3303.0], [63.5, 3305.0], [63.6, 3307.0], [63.7, 3308.0], [63.8, 3309.0], [63.9, 3311.0], [64.0, 3317.0], [64.1, 3317.0], [64.2, 3320.0], [64.3, 3322.0], [64.4, 3323.0], [64.5, 3328.0], [64.6, 3329.0], [64.7, 3331.0], [64.8, 3333.0], [64.9, 3334.0], [65.0, 3338.0], [65.1, 3340.0], [65.2, 3348.0], [65.3, 3349.0], [65.4, 3352.0], [65.5, 3353.0], [65.6, 3354.0], [65.7, 3358.0], [65.8, 3361.0], [65.9, 3363.0], [66.0, 3365.0], [66.1, 3366.0], [66.2, 3370.0], [66.3, 3372.0], [66.4, 3372.0], [66.5, 3373.0], [66.6, 3377.0], [66.7, 3378.0], [66.8, 3380.0], [66.9, 3382.0], [67.0, 3383.0], [67.1, 3385.0], [67.2, 3386.0], [67.3, 3387.0], [67.4, 3389.0], [67.5, 3390.0], [67.6, 3392.0], [67.7, 3394.0], [67.8, 3396.0], [67.9, 3397.0], [68.0, 3398.0], [68.1, 3402.0], [68.2, 3404.0], [68.3, 3407.0], [68.4, 3411.0], [68.5, 3412.0], [68.6, 3413.0], [68.7, 3418.0], [68.8, 3422.0], [68.9, 3425.0], [69.0, 3433.0], [69.1, 3435.0], [69.2, 3438.0], [69.3, 3440.0], [69.4, 3443.0], [69.5, 3446.0], [69.6, 3449.0], [69.7, 3454.0], [69.8, 3455.0], [69.9, 3460.0], [70.0, 3461.0], [70.1, 3462.0], [70.2, 3469.0], [70.3, 3476.0], [70.4, 3479.0], [70.5, 3481.0], [70.6, 3483.0], [70.7, 3485.0], [70.8, 3487.0], [70.9, 3495.0], [71.0, 3500.0], [71.1, 3502.0], [71.2, 3503.0], [71.3, 3507.0], [71.4, 3513.0], [71.5, 3515.0], [71.6, 3519.0], [71.7, 3521.0], [71.8, 3527.0], [71.9, 3529.0], [72.0, 3532.0], [72.1, 3534.0], [72.2, 3537.0], [72.3, 3539.0], [72.4, 3543.0], [72.5, 3546.0], [72.6, 3549.0], [72.7, 3552.0], [72.8, 3554.0], [72.9, 3555.0], [73.0, 3558.0], [73.1, 3560.0], [73.2, 3561.0], [73.3, 3564.0], [73.4, 3568.0], [73.5, 3570.0], [73.6, 3573.0], [73.7, 3575.0], [73.8, 3576.0], [73.9, 3578.0], [74.0, 3580.0], [74.1, 3582.0], [74.2, 3584.0], [74.3, 3586.0], [74.4, 3588.0], [74.5, 3591.0], [74.6, 3592.0], [74.7, 3594.0], [74.8, 3596.0], [74.9, 3600.0], [75.0, 3602.0], [75.1, 3604.0], [75.2, 3606.0], [75.3, 3607.0], [75.4, 3609.0], [75.5, 3611.0], [75.6, 3613.0], [75.7, 3616.0], [75.8, 3620.0], [75.9, 3622.0], [76.0, 3626.0], [76.1, 3627.0], [76.2, 3629.0], [76.3, 3630.0], [76.4, 3630.0], [76.5, 3632.0], [76.6, 3634.0], [76.7, 3635.0], [76.8, 3637.0], [76.9, 3638.0], [77.0, 3639.0], [77.1, 3641.0], [77.2, 3644.0], [77.3, 3646.0], [77.4, 3648.0], [77.5, 3651.0], [77.6, 3653.0], [77.7, 3655.0], [77.8, 3656.0], [77.9, 3658.0], [78.0, 3660.0], [78.1, 3661.0], [78.2, 3663.0], [78.3, 3666.0], [78.4, 3667.0], [78.5, 3669.0], [78.6, 3671.0], [78.7, 3672.0], [78.8, 3673.0], [78.9, 3675.0], [79.0, 3677.0], [79.1, 3678.0], [79.2, 3681.0], [79.3, 3682.0], [79.4, 3685.0], [79.5, 3686.0], [79.6, 3689.0], [79.7, 3691.0], [79.8, 3692.0], [79.9, 3695.0], [80.0, 3696.0], [80.1, 3699.0], [80.2, 3700.0], [80.3, 3701.0], [80.4, 3703.0], [80.5, 3704.0], [80.6, 3705.0], [80.7, 3708.0], [80.8, 3711.0], [80.9, 3715.0], [81.0, 3715.0], [81.1, 3716.0], [81.2, 3717.0], [81.3, 3719.0], [81.4, 3720.0], [81.5, 3723.0], [81.6, 3726.0], [81.7, 3728.0], [81.8, 3731.0], [81.9, 3735.0], [82.0, 3736.0], [82.1, 3738.0], [82.2, 3741.0], [82.3, 3743.0], [82.4, 3747.0], [82.5, 3750.0], [82.6, 3751.0], [82.7, 3755.0], [82.8, 3757.0], [82.9, 3759.0], [83.0, 3763.0], [83.1, 3764.0], [83.2, 3765.0], [83.3, 3766.0], [83.4, 3768.0], [83.5, 3770.0], [83.6, 3774.0], [83.7, 3776.0], [83.8, 3778.0], [83.9, 3781.0], [84.0, 3782.0], [84.1, 3783.0], [84.2, 3784.0], [84.3, 3787.0], [84.4, 3790.0], [84.5, 3792.0], [84.6, 3795.0], [84.7, 3797.0], [84.8, 3800.0], [84.9, 3801.0], [85.0, 3802.0], [85.1, 3804.0], [85.2, 3809.0], [85.3, 3811.0], [85.4, 3813.0], [85.5, 3817.0], [85.6, 3818.0], [85.7, 3819.0], [85.8, 3822.0], [85.9, 3825.0], [86.0, 3828.0], [86.1, 3830.0], [86.2, 3833.0], [86.3, 3836.0], [86.4, 3842.0], [86.5, 3846.0], [86.6, 3847.0], [86.7, 3848.0], [86.8, 3852.0], [86.9, 3855.0], [87.0, 3858.0], [87.1, 3861.0], [87.2, 3864.0], [87.3, 3868.0], [87.4, 3870.0], [87.5, 3872.0], [87.6, 3874.0], [87.7, 3880.0], [87.8, 3884.0], [87.9, 3885.0], [88.0, 3887.0], [88.1, 3891.0], [88.2, 3893.0], [88.3, 3898.0], [88.4, 3905.0], [88.5, 3907.0], [88.6, 3909.0], [88.7, 3911.0], [88.8, 3914.0], [88.9, 3916.0], [89.0, 3918.0], [89.1, 3919.0], [89.2, 3921.0], [89.3, 3922.0], [89.4, 3926.0], [89.5, 3930.0], [89.6, 3934.0], [89.7, 3936.0], [89.8, 3939.0], [89.9, 3941.0], [90.0, 3943.0], [90.1, 3946.0], [90.2, 3949.0], [90.3, 3953.0], [90.4, 3957.0], [90.5, 3963.0], [90.6, 3964.0], [90.7, 3968.0], [90.8, 3973.0], [90.9, 3974.0], [91.0, 3981.0], [91.1, 3988.0], [91.2, 3989.0], [91.3, 3993.0], [91.4, 3996.0], [91.5, 4007.0], [91.6, 4009.0], [91.7, 4013.0], [91.8, 4013.0], [91.9, 4016.0], [92.0, 4020.0], [92.1, 4022.0], [92.2, 4024.0], [92.3, 4031.0], [92.4, 4038.0], [92.5, 4039.0], [92.6, 4042.0], [92.7, 4046.0], [92.8, 4050.0], [92.9, 4055.0], [93.0, 4058.0], [93.1, 4061.0], [93.2, 4064.0], [93.3, 4066.0], [93.4, 4069.0], [93.5, 4070.0], [93.6, 4072.0], [93.7, 4078.0], [93.8, 4081.0], [93.9, 4088.0], [94.0, 4090.0], [94.1, 4097.0], [94.2, 4098.0], [94.3, 4106.0], [94.4, 4109.0], [94.5, 4114.0], [94.6, 4118.0], [94.7, 4125.0], [94.8, 4132.0], [94.9, 4136.0], [95.0, 4144.0], [95.1, 4152.0], [95.2, 4158.0], [95.3, 4164.0], [95.4, 4172.0], [95.5, 4175.0], [95.6, 4180.0], [95.7, 4196.0], [95.8, 4199.0], [95.9, 4207.0], [96.0, 4214.0], [96.1, 4226.0], [96.2, 4235.0], [96.3, 4240.0], [96.4, 4244.0], [96.5, 4246.0], [96.6, 4251.0], [96.7, 4260.0], [96.8, 4267.0], [96.9, 4278.0], [97.0, 4286.0], [97.1, 4300.0], [97.2, 4314.0], [97.3, 4321.0], [97.4, 4328.0], [97.5, 4345.0], [97.6, 4351.0], [97.7, 4369.0], [97.8, 4376.0], [97.9, 4396.0], [98.0, 4406.0], [98.1, 4430.0], [98.2, 4441.0], [98.3, 4452.0], [98.4, 4492.0], [98.5, 4512.0], [98.6, 4532.0], [98.7, 4564.0], [98.8, 4573.0], [98.9, 4600.0], [99.0, 4635.0], [99.1, 4649.0], [99.2, 4677.0], [99.3, 4703.0], [99.4, 4740.0], [99.5, 4751.0], [99.6, 4816.0], [99.7, 4829.0], [99.8, 4899.0], [99.9, 4983.0]], "isOverall": false, "label": "GET /user/search", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 100.0, "title": "Response Time Percentiles"}},
        getOptions: function() {
            return {
                series: {
                    points: { show: false }
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentiles'
                },
                xaxis: {
                    tickDecimals: 1,
                    axisLabel: "Percentiles",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Percentile value in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : %x.2 percentile was %y ms"
                },
                selection: { mode: "xy" },
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentiles"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesPercentiles"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesPercentiles"), dataset, prepareOverviewOptions(options));
        }
};

/**
 * @param elementId Id of element where we display message
 */
function setEmptyGraph(elementId) {
    $(function() {
        $(elementId).text("No graph series with filter="+seriesFilter);
    });
}

// Response times percentiles
function refreshResponseTimePercentiles() {
    var infos = responseTimePercentilesInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimePercentiles");
        return;
    }
    if (isGraph($("#flotResponseTimesPercentiles"))){
        infos.createGraph();
    } else {
        var choiceContainer = $("#choicesResponseTimePercentiles");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesPercentiles", "#overviewResponseTimesPercentiles");
        $('#bodyResponseTimePercentiles .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimeDistributionInfos = {
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 211.0, "series": [{"data": [[0.0, 13.0], [600.0, 26.0], [700.0, 21.0], [800.0, 30.0], [900.0, 59.0], [1000.0, 56.0], [1100.0, 45.0], [1200.0, 46.0], [1300.0, 59.0], [1400.0, 48.0], [1500.0, 51.0], [1600.0, 42.0], [1700.0, 39.0], [1800.0, 55.0], [1900.0, 57.0], [2000.0, 54.0], [2100.0, 96.0], [2200.0, 89.0], [2300.0, 71.0], [2400.0, 87.0], [2500.0, 119.0], [2600.0, 133.0], [2700.0, 135.0], [2800.0, 172.0], [2900.0, 211.0], [3000.0, 203.0], [3100.0, 179.0], [3200.0, 167.0], [3300.0, 193.0], [3400.0, 117.0], [3500.0, 155.0], [3700.0, 186.0], [3600.0, 210.0], [3800.0, 140.0], [3900.0, 126.0], [4000.0, 110.0], [4300.0, 35.0], [4100.0, 64.0], [4200.0, 51.0], [4400.0, 18.0], [4500.0, 19.0], [4600.0, 16.0], [4700.0, 12.0], [4800.0, 9.0], [5000.0, 2.0], [4900.0, 4.0], [5100.0, 1.0], [100.0, 28.0], [200.0, 36.0], [300.0, 41.0], [400.0, 24.0], [500.0, 33.0]], "isOverall": false, "label": "GET /user/search", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 5100.0, "title": "Response Time Distribution"}},
        getOptions: function() {
            var granularity = this.data.result.granularity;
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    barWidth: this.data.result.granularity
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " responses for " + label + " were between " + xval + " and " + (xval + granularity) + " ms";
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimeDistribution"), prepareData(data.result.series, $("#choicesResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshResponseTimeDistribution() {
    var infos = responseTimeDistributionInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeDistribution");
        return;
    }
    if (isGraph($("#flotResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var syntheticResponseTimeDistributionInfos = {
        data: {"result": {"minY": 142.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 3428.0, "series": [{"data": [[0.0, 142.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 423.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[2.0, 3428.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 2.0, "title": "Synthetic Response Times Distribution"}},
        getOptions: function() {
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendSyntheticResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times ranges",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                    tickLength:0,
                    min:-0.5,
                    max:3.5
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    align: "center",
                    barWidth: 0.25,
                    fill:.75
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " " + label;
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            options.xaxis.ticks = data.result.ticks;
            $.plot($("#flotSyntheticResponseTimeDistribution"), prepareData(data.result.series, $("#choicesSyntheticResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshSyntheticResponseTimeDistribution() {
    var infos = syntheticResponseTimeDistributionInfos;
    prepareSeries(infos.data, true);
    if (isGraph($("#flotSyntheticResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerSyntheticResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var activeThreadsOverTimeInfos = {
        data: {"result": {"minY": 176.42907523510993, "minX": 1.77232014E12, "maxY": 186.20471894517695, "series": [{"data": [[1.7723202E12, 186.20471894517695], [1.77232014E12, 176.42907523510993]], "isOverall": false, "label": "Search Users", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.7723202E12, "title": "Active Threads Over Time"}},
        getOptions: function() {
            return {
                series: {
                    stack: true,
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 6,
                    show: true,
                    container: '#legendActiveThreadsOverTime'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                selection: {
                    mode: 'xy'
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : At %x there were %y active threads"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesActiveThreadsOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotActiveThreadsOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewActiveThreadsOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Active Threads Over Time
function refreshActiveThreadsOverTime(fixTimestamps) {
    var infos = activeThreadsOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 3600000);
    }
    if(isGraph($("#flotActiveThreadsOverTime"))) {
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesActiveThreadsOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotActiveThreadsOverTime", "#overviewActiveThreadsOverTime");
        $('#footerActiveThreadsOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var timeVsThreadsInfos = {
        data: {"result": {"minY": 242.33333333333334, "minX": 1.0, "maxY": 3634.0, "series": [{"data": [[2.0, 2437.0], [3.0, 2503.0], [4.0, 569.75], [5.0, 809.6666666666666], [6.0, 818.3333333333334], [7.0, 1144.5], [8.0, 618.0], [9.0, 1221.0], [10.0, 674.75], [11.0, 1534.5], [12.0, 1118.0], [13.0, 935.25], [14.0, 943.5], [15.0, 1216.0], [16.0, 831.75], [17.0, 242.33333333333334], [18.0, 1536.75], [19.0, 696.6], [20.0, 865.6], [21.0, 583.6666666666667], [22.0, 566.4], [23.0, 2351.0], [24.0, 897.6666666666666], [25.0, 672.5], [26.0, 870.4], [27.0, 829.25], [28.0, 873.0], [29.0, 744.1428571428571], [30.0, 682.0], [31.0, 747.75], [32.0, 1282.0], [33.0, 1366.6666666666665], [34.0, 477.5], [35.0, 1169.25], [36.0, 1007.0], [37.0, 882.8333333333334], [38.0, 1016.4], [39.0, 387.0], [40.0, 1266.6], [41.0, 1148.25], [42.0, 1039.3333333333333], [43.0, 1240.6666666666665], [44.0, 771.0], [45.0, 1222.0], [46.0, 911.0], [47.0, 1199.3333333333335], [48.0, 1200.0], [49.0, 1130.0], [50.0, 792.3333333333333], [51.0, 887.5], [52.0, 972.5], [53.0, 1956.5], [54.0, 1506.6666666666665], [55.0, 1055.4], [56.0, 1491.6666666666665], [57.0, 1625.3333333333335], [58.0, 972.8571428571429], [59.0, 1377.3333333333335], [60.0, 1320.75], [61.0, 1953.5], [62.0, 955.0], [63.0, 1577.0], [64.0, 1172.3333333333335], [65.0, 1163.0], [66.0, 1739.0], [67.0, 3072.0], [68.0, 1289.6], [69.0, 2020.6666666666665], [70.0, 1046.1666666666667], [71.0, 1086.375], [72.0, 724.6], [73.0, 1998.4], [74.0, 1169.875], [75.0, 2305.0], [76.0, 1604.0], [77.0, 1306.6], [78.0, 1241.8], [79.0, 1061.0], [80.0, 1756.6], [81.0, 614.5], [82.0, 1821.4], [83.0, 1114.3333333333333], [84.0, 1085.25], [85.0, 1725.5], [86.0, 1246.75], [87.0, 1197.3333333333333], [88.0, 1982.0], [89.0, 1518.2], [90.0, 1053.2], [91.0, 1292.0], [92.0, 1725.8], [93.0, 1066.5], [94.0, 1922.8], [95.0, 1308.5], [96.0, 1720.3333333333335], [97.0, 1511.8], [98.0, 1773.75], [99.0, 1607.0], [100.0, 1478.4], [101.0, 1354.3333333333335], [102.0, 2378.8], [103.0, 2051.3333333333335], [104.0, 1765.0], [105.0, 1791.0], [106.0, 1802.6], [107.0, 1316.375], [108.0, 1801.6], [109.0, 1849.2], [110.0, 1788.75], [111.0, 1531.5], [113.0, 2114.5], [114.0, 1740.8], [115.0, 1961.0], [112.0, 1807.0], [116.0, 1826.2], [117.0, 1786.5], [118.0, 1700.0], [119.0, 1356.8], [120.0, 2379.0], [121.0, 1411.0], [122.0, 2050.6666666666665], [123.0, 1409.75], [124.0, 1803.0], [125.0, 1858.4], [126.0, 1427.6666666666667], [127.0, 1495.5], [128.0, 2962.6666666666665], [129.0, 2395.0], [131.0, 1784.8333333333335], [132.0, 1391.8], [133.0, 1938.6], [134.0, 1936.25], [135.0, 1861.5714285714287], [130.0, 3046.0], [136.0, 2409.3333333333335], [137.0, 1513.4285714285713], [138.0, 1839.5], [139.0, 1413.3333333333333], [140.0, 1622.8333333333333], [141.0, 1421.5], [142.0, 2094.6666666666665], [143.0, 2917.5], [144.0, 1653.25], [145.0, 2022.0], [146.0, 1821.3333333333333], [147.0, 2181.142857142857], [148.0, 1687.0], [149.0, 2454.5], [150.0, 1871.0], [151.0, 1786.0], [152.0, 2470.6], [154.0, 2703.0], [155.0, 2173.666666666667], [156.0, 3104.0], [157.0, 2176.6666666666665], [158.0, 1636.8333333333335], [159.0, 2670.25], [160.0, 2114.4285714285716], [161.0, 2124.4], [162.0, 2571.6666666666665], [163.0, 2244.8571428571427], [164.0, 2039.5], [165.0, 1974.8], [166.0, 2623.8], [167.0, 2318.285714285714], [168.0, 2438.0], [169.0, 2560.0], [170.0, 2653.0], [171.0, 2800.0], [172.0, 2387.3333333333335], [173.0, 2509.625], [174.0, 2099.0], [175.0, 2327.6666666666665], [176.0, 1986.8], [177.0, 2236.625], [179.0, 2662.25], [180.0, 2396.75], [181.0, 2624.0], [182.0, 2157.25], [183.0, 1805.5], [178.0, 3634.0], [184.0, 2155.0], [185.0, 2342.5], [186.0, 2279.25], [187.0, 2474.666666666667], [188.0, 2353.8], [189.0, 2893.5], [190.0, 2370.8571428571427], [191.0, 2801.25], [192.0, 1742.5], [193.0, 2883.6666666666665], [194.0, 2432.0], [195.0, 2351.8], [196.0, 2427.8], [197.0, 1969.8999999999999], [198.0, 2466.0], [199.0, 2648.0], [200.0, 3123.351453855883], [1.0, 2055.0]], "isOverall": false, "label": "GET /user/search", "isController": false}, {"data": [[179.95692461808179, 2814.22915101427]], "isOverall": false, "label": "GET /user/search-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 200.0, "title": "Time VS Threads"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: { noColumns: 2,show: true, container: '#legendTimeVsThreads' },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s: At %x.2 active threads, Average response time was %y.2 ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesTimeVsThreads"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotTimesVsThreads"), dataset, options);
            // setup overview
            $.plot($("#overviewTimesVsThreads"), dataset, prepareOverviewOptions(options));
        }
};

// Time vs threads
function refreshTimeVsThreads(){
    var infos = timeVsThreadsInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTimeVsThreads");
        return;
    }
    if(isGraph($("#flotTimesVsThreads"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTimeVsThreads");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTimesVsThreads", "#overviewTimesVsThreads");
        $('#footerTimeVsThreads .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var bytesThroughputOverTimeInfos = {
        data : {"result": {"minY": 6477.9, "minX": 1.77232014E12, "maxY": 195999.46666666667, "series": [{"data": [[1.7723202E12, 111094.41666666667], [1.77232014E12, 195999.46666666667]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.7723202E12, 6477.9], [1.77232014E12, 11472.1]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.7723202E12, "title": "Bytes Throughput Over Time"}},
        getOptions : function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity) ,
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Bytes / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendBytesThroughputOverTime'
                },
                selection: {
                    mode: "xy"
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y"
                }
            };
        },
        createGraph : function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesBytesThroughputOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotBytesThroughputOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewBytesThroughputOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Bytes throughput Over Time
function refreshBytesThroughputOverTime(fixTimestamps) {
    var infos = bytesThroughputOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 3600000);
    }
    if(isGraph($("#flotBytesThroughputOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesBytesThroughputOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotBytesThroughputOverTime", "#overviewBytesThroughputOverTime");
        $('#footerBytesThroughputOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimesOverTimeInfos = {
        data: {"result": {"minY": 2574.6837774294663, "minX": 1.77232014E12, "maxY": 3238.4621790423303, "series": [{"data": [[1.7723202E12, 3238.4621790423303], [1.77232014E12, 2574.6837774294663]], "isOverall": false, "label": "GET /user/search", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.7723202E12, "title": "Response Time Over Time"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average response time was %y ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Times Over Time
function refreshResponseTimeOverTime(fixTimestamps) {
    var infos = responseTimesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 3600000);
    }
    if(isGraph($("#flotResponseTimesOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesOverTime", "#overviewResponseTimesOverTime");
        $('#footerResponseTimesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var latenciesOverTimeInfos = {
        data: {"result": {"minY": 2574.62813479624, "minX": 1.77232014E12, "maxY": 3238.41429562803, "series": [{"data": [[1.7723202E12, 3238.41429562803], [1.77232014E12, 2574.62813479624]], "isOverall": false, "label": "GET /user/search", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.7723202E12, "title": "Latencies Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response latencies in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendLatenciesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average latency was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesLatenciesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotLatenciesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewLatenciesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Latencies Over Time
function refreshLatenciesOverTime(fixTimestamps) {
    var infos = latenciesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyLatenciesOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 3600000);
    }
    if(isGraph($("#flotLatenciesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesLatenciesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotLatenciesOverTime", "#overviewLatenciesOverTime");
        $('#footerLatenciesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var connectTimeOverTimeInfos = {
        data: {"result": {"minY": 0.0, "minX": 1.77232014E12, "maxY": 0.0748432601880877, "series": [{"data": [[1.7723202E12, 0.0], [1.77232014E12, 0.0748432601880877]], "isOverall": false, "label": "GET /user/search", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.7723202E12, "title": "Connect Time Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getConnectTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average Connect Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendConnectTimeOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average connect time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesConnectTimeOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotConnectTimeOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewConnectTimeOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Connect Time Over Time
function refreshConnectTimeOverTime(fixTimestamps) {
    var infos = connectTimeOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyConnectTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 3600000);
    }
    if(isGraph($("#flotConnectTimeOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesConnectTimeOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotConnectTimeOverTime", "#overviewConnectTimeOverTime");
        $('#footerConnectTimeOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var responseTimePercentilesOverTimeInfos = {
        data: {"result": {"minY": 69.0, "minX": 1.77232014E12, "maxY": 5150.0, "series": [{"data": [[1.7723202E12, 4526.0], [1.77232014E12, 5150.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.7723202E12, 4020.8], [1.77232014E12, 3790.100000000001]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.7723202E12, 4339.959999999999], [1.77232014E12, 4724.0]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.7723202E12, 4134.0], [1.77232014E12, 4168.75]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.7723202E12, 789.0], [1.77232014E12, 69.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.7723202E12, 3521.0], [1.77232014E12, 2828.5]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.7723202E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Response Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentilesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Response time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentilesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimePercentilesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimePercentilesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Time Percentiles Over Time
function refreshResponseTimePercentilesOverTime(fixTimestamps) {
    var infos = responseTimePercentilesOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 3600000);
    }
    if(isGraph($("#flotResponseTimePercentilesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimePercentilesOverTime", "#overviewResponseTimePercentilesOverTime");
        $('#footerResponseTimePercentilesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var responseTimeVsRequestInfos = {
    data: {"result": {"minY": 114.0, "minX": 25.0, "maxY": 3981.0, "series": [{"data": [[45.0, 3601.0], [46.0, 2454.5], [48.0, 3548.5], [51.0, 3917.0], [53.0, 3435.0], [52.0, 3981.0], [55.0, 2244.5], [54.0, 3113.0], [57.0, 3422.0], [59.0, 3605.0], [58.0, 3628.5], [60.0, 2983.5], [61.0, 3477.0], [62.0, 689.5], [63.0, 3231.0], [66.0, 2728.0], [65.0, 3034.0], [64.0, 3654.0], [71.0, 1334.0], [68.0, 2808.0], [69.0, 2997.0], [70.0, 3301.5], [72.0, 2874.5], [73.0, 2951.0], [78.0, 2218.5], [77.0, 2984.5], [76.0, 3399.0], [98.0, 3150.0], [25.0, 114.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 98.0, "title": "Response Time Vs Request"}},
    getOptions: function() {
        return {
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Response Time in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: {
                noColumns: 2,
                show: true,
                container: '#legendResponseTimeVsRequest'
            },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median response time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesResponseTimeVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotResponseTimeVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewResponseTimeVsRequest"), dataset, prepareOverviewOptions(options));

    }
};

// Response Time vs Request
function refreshResponseTimeVsRequest() {
    var infos = responseTimeVsRequestInfos;
    prepareSeries(infos.data);
    if (isGraph($("#flotResponseTimeVsRequest"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeVsRequest");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimeVsRequest", "#overviewResponseTimeVsRequest");
        $('#footerResponseRimeVsRequest .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var latenciesVsRequestInfos = {
    data: {"result": {"minY": 111.0, "minX": 25.0, "maxY": 3981.0, "series": [{"data": [[45.0, 3601.0], [46.0, 2454.5], [48.0, 3548.5], [51.0, 3917.0], [53.0, 3435.0], [52.0, 3981.0], [55.0, 2244.5], [54.0, 3113.0], [57.0, 3422.0], [59.0, 3605.0], [58.0, 3628.5], [60.0, 2983.5], [61.0, 3477.0], [62.0, 689.5], [63.0, 3231.0], [66.0, 2728.0], [65.0, 3034.0], [64.0, 3654.0], [71.0, 1334.0], [68.0, 2807.5], [69.0, 2997.0], [70.0, 3301.5], [72.0, 2874.5], [73.0, 2951.0], [78.0, 2218.5], [77.0, 2984.5], [76.0, 3399.0], [98.0, 3150.0], [25.0, 111.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 98.0, "title": "Latencies Vs Request"}},
    getOptions: function() {
        return{
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Latency in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: { noColumns: 2,show: true, container: '#legendLatencyVsRequest' },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median Latency time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesLatencyVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotLatenciesVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewLatenciesVsRequest"), dataset, prepareOverviewOptions(options));
    }
};

// Latencies vs Request
function refreshLatenciesVsRequest() {
        var infos = latenciesVsRequestInfos;
        prepareSeries(infos.data);
        if(isGraph($("#flotLatenciesVsRequest"))){
            infos.createGraph();
        }else{
            var choiceContainer = $("#choicesLatencyVsRequest");
            createLegend(choiceContainer, infos);
            infos.createGraph();
            setGraphZoomable("#flotLatenciesVsRequest", "#overviewLatenciesVsRequest");
            $('#footerLatenciesVsRequest .legendColorBox > div').each(function(i){
                $(this).clone().prependTo(choiceContainer.find("li").eq(i));
            });
        }
};

var hitsPerSecondInfos = {
        data: {"result": {"minY": 20.683333333333334, "minX": 1.77232014E12, "maxY": 45.86666666666667, "series": [{"data": [[1.7723202E12, 20.683333333333334], [1.77232014E12, 45.86666666666667]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.7723202E12, "title": "Hits Per Second"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of hits / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendHitsPerSecond"
                },
                selection: {
                    mode : 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y.2 hits/sec"
                }
            };
        },
        createGraph: function createGraph() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesHitsPerSecond"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotHitsPerSecond"), dataset, options);
            // setup overview
            $.plot($("#overviewHitsPerSecond"), dataset, prepareOverviewOptions(options));
        }
};

// Hits per second
function refreshHitsPerSecond(fixTimestamps) {
    var infos = hitsPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 3600000);
    }
    if (isGraph($("#flotHitsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesHitsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotHitsPerSecond", "#overviewHitsPerSecond");
        $('#footerHitsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var codesPerSecondInfos = {
        data: {"result": {"minY": 24.016666666666666, "minX": 1.77232014E12, "maxY": 42.53333333333333, "series": [{"data": [[1.7723202E12, 24.016666666666666], [1.77232014E12, 42.53333333333333]], "isOverall": false, "label": "200", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.7723202E12, "title": "Codes Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendCodesPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "Number of Response Codes %s at %x was %y.2 responses / sec"
                }
            };
        },
    createGraph: function() {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesCodesPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotCodesPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewCodesPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Codes per second
function refreshCodesPerSecond(fixTimestamps) {
    var infos = codesPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 3600000);
    }
    if(isGraph($("#flotCodesPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesCodesPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotCodesPerSecond", "#overviewCodesPerSecond");
        $('#footerCodesPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var transactionsPerSecondInfos = {
        data: {"result": {"minY": 24.016666666666666, "minX": 1.77232014E12, "maxY": 42.53333333333333, "series": [{"data": [[1.7723202E12, 24.016666666666666], [1.77232014E12, 42.53333333333333]], "isOverall": false, "label": "GET /user/search-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.7723202E12, "title": "Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTransactionsPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                }
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTransactionsPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTransactionsPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewTransactionsPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Transactions per second
function refreshTransactionsPerSecond(fixTimestamps) {
    var infos = transactionsPerSecondInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTransactionsPerSecond");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 3600000);
    }
    if(isGraph($("#flotTransactionsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTransactionsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTransactionsPerSecond", "#overviewTransactionsPerSecond");
        $('#footerTransactionsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var totalTPSInfos = {
        data: {"result": {"minY": 24.016666666666666, "minX": 1.77232014E12, "maxY": 42.53333333333333, "series": [{"data": [[1.7723202E12, 24.016666666666666], [1.77232014E12, 42.53333333333333]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.7723202E12, "title": "Total Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTotalTPS"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                },
                colors: ["#9ACD32", "#FF6347"]
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTotalTPS"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTotalTPS"), dataset, options);
        // setup overview
        $.plot($("#overviewTotalTPS"), dataset, prepareOverviewOptions(options));
    }
};

// Total Transactions per second
function refreshTotalTPS(fixTimestamps) {
    var infos = totalTPSInfos;
    // We want to ignore seriesFilter
    prepareSeries(infos.data, false, true);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 3600000);
    }
    if(isGraph($("#flotTotalTPS"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTotalTPS");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTotalTPS", "#overviewTotalTPS");
        $('#footerTotalTPS .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

// Collapse the graph matching the specified DOM element depending the collapsed
// status
function collapse(elem, collapsed){
    if(collapsed){
        $(elem).parent().find(".fa-chevron-up").removeClass("fa-chevron-up").addClass("fa-chevron-down");
    } else {
        $(elem).parent().find(".fa-chevron-down").removeClass("fa-chevron-down").addClass("fa-chevron-up");
        if (elem.id == "bodyBytesThroughputOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshBytesThroughputOverTime(true);
            }
            document.location.href="#bytesThroughputOverTime";
        } else if (elem.id == "bodyLatenciesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesOverTime(true);
            }
            document.location.href="#latenciesOverTime";
        } else if (elem.id == "bodyCustomGraph") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCustomGraph(true);
            }
            document.location.href="#responseCustomGraph";
        } else if (elem.id == "bodyConnectTimeOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshConnectTimeOverTime(true);
            }
            document.location.href="#connectTimeOverTime";
        } else if (elem.id == "bodyResponseTimePercentilesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimePercentilesOverTime(true);
            }
            document.location.href="#responseTimePercentilesOverTime";
        } else if (elem.id == "bodyResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeDistribution();
            }
            document.location.href="#responseTimeDistribution" ;
        } else if (elem.id == "bodySyntheticResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshSyntheticResponseTimeDistribution();
            }
            document.location.href="#syntheticResponseTimeDistribution" ;
        } else if (elem.id == "bodyActiveThreadsOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshActiveThreadsOverTime(true);
            }
            document.location.href="#activeThreadsOverTime";
        } else if (elem.id == "bodyTimeVsThreads") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTimeVsThreads();
            }
            document.location.href="#timeVsThreads" ;
        } else if (elem.id == "bodyCodesPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCodesPerSecond(true);
            }
            document.location.href="#codesPerSecond";
        } else if (elem.id == "bodyTransactionsPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTransactionsPerSecond(true);
            }
            document.location.href="#transactionsPerSecond";
        } else if (elem.id == "bodyTotalTPS") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTotalTPS(true);
            }
            document.location.href="#totalTPS";
        } else if (elem.id == "bodyResponseTimeVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeVsRequest();
            }
            document.location.href="#responseTimeVsRequest";
        } else if (elem.id == "bodyLatenciesVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesVsRequest();
            }
            document.location.href="#latencyVsRequest";
        }
    }
}

/*
 * Activates or deactivates all series of the specified graph (represented by id parameter)
 * depending on checked argument.
 */
function toggleAll(id, checked){
    var placeholder = document.getElementById(id);

    var cases = $(placeholder).find(':checkbox');
    cases.prop('checked', checked);
    $(cases).parent().children().children().toggleClass("legend-disabled", !checked);

    var choiceContainer;
    if ( id == "choicesBytesThroughputOverTime"){
        choiceContainer = $("#choicesBytesThroughputOverTime");
        refreshBytesThroughputOverTime(false);
    } else if(id == "choicesResponseTimesOverTime"){
        choiceContainer = $("#choicesResponseTimesOverTime");
        refreshResponseTimeOverTime(false);
    }else if(id == "choicesResponseCustomGraph"){
        choiceContainer = $("#choicesResponseCustomGraph");
        refreshCustomGraph(false);
    } else if ( id == "choicesLatenciesOverTime"){
        choiceContainer = $("#choicesLatenciesOverTime");
        refreshLatenciesOverTime(false);
    } else if ( id == "choicesConnectTimeOverTime"){
        choiceContainer = $("#choicesConnectTimeOverTime");
        refreshConnectTimeOverTime(false);
    } else if ( id == "choicesResponseTimePercentilesOverTime"){
        choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        refreshResponseTimePercentilesOverTime(false);
    } else if ( id == "choicesResponseTimePercentiles"){
        choiceContainer = $("#choicesResponseTimePercentiles");
        refreshResponseTimePercentiles();
    } else if(id == "choicesActiveThreadsOverTime"){
        choiceContainer = $("#choicesActiveThreadsOverTime");
        refreshActiveThreadsOverTime(false);
    } else if ( id == "choicesTimeVsThreads"){
        choiceContainer = $("#choicesTimeVsThreads");
        refreshTimeVsThreads();
    } else if ( id == "choicesSyntheticResponseTimeDistribution"){
        choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        refreshSyntheticResponseTimeDistribution();
    } else if ( id == "choicesResponseTimeDistribution"){
        choiceContainer = $("#choicesResponseTimeDistribution");
        refreshResponseTimeDistribution();
    } else if ( id == "choicesHitsPerSecond"){
        choiceContainer = $("#choicesHitsPerSecond");
        refreshHitsPerSecond(false);
    } else if(id == "choicesCodesPerSecond"){
        choiceContainer = $("#choicesCodesPerSecond");
        refreshCodesPerSecond(false);
    } else if ( id == "choicesTransactionsPerSecond"){
        choiceContainer = $("#choicesTransactionsPerSecond");
        refreshTransactionsPerSecond(false);
    } else if ( id == "choicesTotalTPS"){
        choiceContainer = $("#choicesTotalTPS");
        refreshTotalTPS(false);
    } else if ( id == "choicesResponseTimeVsRequest"){
        choiceContainer = $("#choicesResponseTimeVsRequest");
        refreshResponseTimeVsRequest();
    } else if ( id == "choicesLatencyVsRequest"){
        choiceContainer = $("#choicesLatencyVsRequest");
        refreshLatenciesVsRequest();
    }
    var color = checked ? "black" : "#818181";
    if(choiceContainer != null) {
        choiceContainer.find("label").each(function(){
            this.style.color = color;
        });
    }
}

