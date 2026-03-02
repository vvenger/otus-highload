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
        data: {"result": {"minY": 33.0, "minX": 0.0, "maxY": 2395.0, "series": [{"data": [[0.0, 33.0], [0.1, 36.0], [0.2, 47.0], [0.3, 53.0], [0.4, 57.0], [0.5, 61.0], [0.6, 66.0], [0.7, 70.0], [0.8, 72.0], [0.9, 75.0], [1.0, 76.0], [1.1, 81.0], [1.2, 84.0], [1.3, 87.0], [1.4, 88.0], [1.5, 92.0], [1.6, 94.0], [1.7, 96.0], [1.8, 97.0], [1.9, 104.0], [2.0, 105.0], [2.1, 108.0], [2.2, 109.0], [2.3, 114.0], [2.4, 117.0], [2.5, 121.0], [2.6, 123.0], [2.7, 127.0], [2.8, 129.0], [2.9, 133.0], [3.0, 136.0], [3.1, 138.0], [3.2, 140.0], [3.3, 142.0], [3.4, 146.0], [3.5, 148.0], [3.6, 151.0], [3.7, 153.0], [3.8, 158.0], [3.9, 160.0], [4.0, 163.0], [4.1, 167.0], [4.2, 173.0], [4.3, 177.0], [4.4, 183.0], [4.5, 188.0], [4.6, 193.0], [4.7, 201.0], [4.8, 203.0], [4.9, 206.0], [5.0, 212.0], [5.1, 215.0], [5.2, 217.0], [5.3, 218.0], [5.4, 223.0], [5.5, 226.0], [5.6, 227.0], [5.7, 231.0], [5.8, 236.0], [5.9, 240.0], [6.0, 241.0], [6.1, 245.0], [6.2, 248.0], [6.3, 252.0], [6.4, 259.0], [6.5, 263.0], [6.6, 268.0], [6.7, 271.0], [6.8, 276.0], [6.9, 279.0], [7.0, 282.0], [7.1, 286.0], [7.2, 290.0], [7.3, 292.0], [7.4, 296.0], [7.5, 298.0], [7.6, 302.0], [7.7, 307.0], [7.8, 311.0], [7.9, 323.0], [8.0, 328.0], [8.1, 331.0], [8.2, 336.0], [8.3, 339.0], [8.4, 348.0], [8.5, 351.0], [8.6, 355.0], [8.7, 361.0], [8.8, 362.0], [8.9, 365.0], [9.0, 368.0], [9.1, 371.0], [9.2, 374.0], [9.3, 375.0], [9.4, 380.0], [9.5, 382.0], [9.6, 384.0], [9.7, 389.0], [9.8, 391.0], [9.9, 396.0], [10.0, 400.0], [10.1, 404.0], [10.2, 408.0], [10.3, 414.0], [10.4, 420.0], [10.5, 421.0], [10.6, 427.0], [10.7, 428.0], [10.8, 433.0], [10.9, 436.0], [11.0, 439.0], [11.1, 443.0], [11.2, 449.0], [11.3, 451.0], [11.4, 455.0], [11.5, 459.0], [11.6, 461.0], [11.7, 465.0], [11.8, 469.0], [11.9, 473.0], [12.0, 477.0], [12.1, 479.0], [12.2, 484.0], [12.3, 487.0], [12.4, 491.0], [12.5, 494.0], [12.6, 497.0], [12.7, 499.0], [12.8, 505.0], [12.9, 511.0], [13.0, 525.0], [13.1, 526.0], [13.2, 528.0], [13.3, 532.0], [13.4, 535.0], [13.5, 541.0], [13.6, 549.0], [13.7, 552.0], [13.8, 554.0], [13.9, 560.0], [14.0, 564.0], [14.1, 571.0], [14.2, 579.0], [14.3, 582.0], [14.4, 587.0], [14.5, 589.0], [14.6, 592.0], [14.7, 594.0], [14.8, 597.0], [14.9, 600.0], [15.0, 604.0], [15.1, 610.0], [15.2, 611.0], [15.3, 618.0], [15.4, 620.0], [15.5, 624.0], [15.6, 628.0], [15.7, 629.0], [15.8, 632.0], [15.9, 635.0], [16.0, 637.0], [16.1, 641.0], [16.2, 648.0], [16.3, 649.0], [16.4, 653.0], [16.5, 655.0], [16.6, 657.0], [16.7, 660.0], [16.8, 663.0], [16.9, 666.0], [17.0, 672.0], [17.1, 672.0], [17.2, 676.0], [17.3, 679.0], [17.4, 682.0], [17.5, 684.0], [17.6, 685.0], [17.7, 688.0], [17.8, 691.0], [17.9, 694.0], [18.0, 695.0], [18.1, 696.0], [18.2, 701.0], [18.3, 703.0], [18.4, 704.0], [18.5, 711.0], [18.6, 713.0], [18.7, 715.0], [18.8, 718.0], [18.9, 725.0], [19.0, 727.0], [19.1, 729.0], [19.2, 732.0], [19.3, 737.0], [19.4, 742.0], [19.5, 745.0], [19.6, 746.0], [19.7, 747.0], [19.8, 750.0], [19.9, 752.0], [20.0, 753.0], [20.1, 757.0], [20.2, 759.0], [20.3, 765.0], [20.4, 766.0], [20.5, 773.0], [20.6, 775.0], [20.7, 777.0], [20.8, 781.0], [20.9, 783.0], [21.0, 785.0], [21.1, 789.0], [21.2, 792.0], [21.3, 795.0], [21.4, 799.0], [21.5, 803.0], [21.6, 805.0], [21.7, 807.0], [21.8, 809.0], [21.9, 815.0], [22.0, 821.0], [22.1, 825.0], [22.2, 827.0], [22.3, 832.0], [22.4, 837.0], [22.5, 839.0], [22.6, 841.0], [22.7, 844.0], [22.8, 848.0], [22.9, 850.0], [23.0, 852.0], [23.1, 855.0], [23.2, 857.0], [23.3, 859.0], [23.4, 865.0], [23.5, 867.0], [23.6, 870.0], [23.7, 873.0], [23.8, 876.0], [23.9, 878.0], [24.0, 879.0], [24.1, 883.0], [24.2, 886.0], [24.3, 888.0], [24.4, 891.0], [24.5, 894.0], [24.6, 895.0], [24.7, 896.0], [24.8, 898.0], [24.9, 903.0], [25.0, 909.0], [25.1, 910.0], [25.2, 914.0], [25.3, 918.0], [25.4, 921.0], [25.5, 924.0], [25.6, 930.0], [25.7, 931.0], [25.8, 934.0], [25.9, 936.0], [26.0, 940.0], [26.1, 944.0], [26.2, 947.0], [26.3, 949.0], [26.4, 951.0], [26.5, 954.0], [26.6, 955.0], [26.7, 958.0], [26.8, 960.0], [26.9, 963.0], [27.0, 963.0], [27.1, 965.0], [27.2, 969.0], [27.3, 970.0], [27.4, 971.0], [27.5, 974.0], [27.6, 976.0], [27.7, 979.0], [27.8, 981.0], [27.9, 982.0], [28.0, 985.0], [28.1, 986.0], [28.2, 990.0], [28.3, 991.0], [28.4, 994.0], [28.5, 995.0], [28.6, 998.0], [28.7, 1002.0], [28.8, 1004.0], [28.9, 1005.0], [29.0, 1007.0], [29.1, 1011.0], [29.2, 1013.0], [29.3, 1016.0], [29.4, 1017.0], [29.5, 1021.0], [29.6, 1022.0], [29.7, 1026.0], [29.8, 1028.0], [29.9, 1031.0], [30.0, 1034.0], [30.1, 1035.0], [30.2, 1040.0], [30.3, 1044.0], [30.4, 1045.0], [30.5, 1047.0], [30.6, 1049.0], [30.7, 1054.0], [30.8, 1056.0], [30.9, 1059.0], [31.0, 1062.0], [31.1, 1066.0], [31.2, 1069.0], [31.3, 1072.0], [31.4, 1073.0], [31.5, 1075.0], [31.6, 1078.0], [31.7, 1080.0], [31.8, 1081.0], [31.9, 1084.0], [32.0, 1085.0], [32.1, 1090.0], [32.2, 1094.0], [32.3, 1095.0], [32.4, 1097.0], [32.5, 1100.0], [32.6, 1102.0], [32.7, 1108.0], [32.8, 1112.0], [32.9, 1116.0], [33.0, 1117.0], [33.1, 1118.0], [33.2, 1120.0], [33.3, 1124.0], [33.4, 1127.0], [33.5, 1129.0], [33.6, 1134.0], [33.7, 1137.0], [33.8, 1140.0], [33.9, 1144.0], [34.0, 1150.0], [34.1, 1155.0], [34.2, 1158.0], [34.3, 1161.0], [34.4, 1163.0], [34.5, 1166.0], [34.6, 1168.0], [34.7, 1169.0], [34.8, 1172.0], [34.9, 1175.0], [35.0, 1178.0], [35.1, 1178.0], [35.2, 1181.0], [35.3, 1183.0], [35.4, 1185.0], [35.5, 1188.0], [35.6, 1190.0], [35.7, 1190.0], [35.8, 1191.0], [35.9, 1195.0], [36.0, 1197.0], [36.1, 1199.0], [36.2, 1200.0], [36.3, 1202.0], [36.4, 1205.0], [36.5, 1207.0], [36.6, 1209.0], [36.7, 1210.0], [36.8, 1211.0], [36.9, 1214.0], [37.0, 1215.0], [37.1, 1218.0], [37.2, 1220.0], [37.3, 1221.0], [37.4, 1222.0], [37.5, 1226.0], [37.6, 1228.0], [37.7, 1231.0], [37.8, 1236.0], [37.9, 1237.0], [38.0, 1242.0], [38.1, 1245.0], [38.2, 1247.0], [38.3, 1247.0], [38.4, 1248.0], [38.5, 1250.0], [38.6, 1252.0], [38.7, 1253.0], [38.8, 1257.0], [38.9, 1260.0], [39.0, 1266.0], [39.1, 1269.0], [39.2, 1272.0], [39.3, 1273.0], [39.4, 1276.0], [39.5, 1280.0], [39.6, 1281.0], [39.7, 1282.0], [39.8, 1284.0], [39.9, 1287.0], [40.0, 1289.0], [40.1, 1292.0], [40.2, 1294.0], [40.3, 1295.0], [40.4, 1296.0], [40.5, 1299.0], [40.6, 1302.0], [40.7, 1303.0], [40.8, 1304.0], [40.9, 1306.0], [41.0, 1309.0], [41.1, 1310.0], [41.2, 1313.0], [41.3, 1314.0], [41.4, 1315.0], [41.5, 1318.0], [41.6, 1319.0], [41.7, 1321.0], [41.8, 1322.0], [41.9, 1326.0], [42.0, 1328.0], [42.1, 1330.0], [42.2, 1332.0], [42.3, 1335.0], [42.4, 1336.0], [42.5, 1337.0], [42.6, 1338.0], [42.7, 1340.0], [42.8, 1342.0], [42.9, 1344.0], [43.0, 1345.0], [43.1, 1347.0], [43.2, 1348.0], [43.3, 1349.0], [43.4, 1351.0], [43.5, 1351.0], [43.6, 1354.0], [43.7, 1355.0], [43.8, 1356.0], [43.9, 1358.0], [44.0, 1359.0], [44.1, 1360.0], [44.2, 1362.0], [44.3, 1364.0], [44.4, 1367.0], [44.5, 1367.0], [44.6, 1368.0], [44.7, 1369.0], [44.8, 1370.0], [44.9, 1373.0], [45.0, 1374.0], [45.1, 1376.0], [45.2, 1378.0], [45.3, 1380.0], [45.4, 1382.0], [45.5, 1384.0], [45.6, 1385.0], [45.7, 1386.0], [45.8, 1387.0], [45.9, 1388.0], [46.0, 1389.0], [46.1, 1390.0], [46.2, 1391.0], [46.3, 1393.0], [46.4, 1393.0], [46.5, 1397.0], [46.6, 1397.0], [46.7, 1399.0], [46.8, 1400.0], [46.9, 1401.0], [47.0, 1401.0], [47.1, 1402.0], [47.2, 1404.0], [47.3, 1406.0], [47.4, 1407.0], [47.5, 1409.0], [47.6, 1411.0], [47.7, 1411.0], [47.8, 1412.0], [47.9, 1414.0], [48.0, 1415.0], [48.1, 1417.0], [48.2, 1418.0], [48.3, 1418.0], [48.4, 1421.0], [48.5, 1422.0], [48.6, 1424.0], [48.7, 1425.0], [48.8, 1427.0], [48.9, 1427.0], [49.0, 1428.0], [49.1, 1430.0], [49.2, 1431.0], [49.3, 1432.0], [49.4, 1433.0], [49.5, 1434.0], [49.6, 1435.0], [49.7, 1436.0], [49.8, 1438.0], [49.9, 1440.0], [50.0, 1441.0], [50.1, 1441.0], [50.2, 1442.0], [50.3, 1443.0], [50.4, 1444.0], [50.5, 1445.0], [50.6, 1447.0], [50.7, 1448.0], [50.8, 1449.0], [50.9, 1450.0], [51.0, 1452.0], [51.1, 1453.0], [51.2, 1455.0], [51.3, 1456.0], [51.4, 1458.0], [51.5, 1459.0], [51.6, 1460.0], [51.7, 1461.0], [51.8, 1462.0], [51.9, 1463.0], [52.0, 1465.0], [52.1, 1468.0], [52.2, 1470.0], [52.3, 1471.0], [52.4, 1472.0], [52.5, 1474.0], [52.6, 1475.0], [52.7, 1476.0], [52.8, 1478.0], [52.9, 1479.0], [53.0, 1480.0], [53.1, 1481.0], [53.2, 1481.0], [53.3, 1482.0], [53.4, 1483.0], [53.5, 1484.0], [53.6, 1486.0], [53.7, 1487.0], [53.8, 1488.0], [53.9, 1490.0], [54.0, 1491.0], [54.1, 1492.0], [54.2, 1494.0], [54.3, 1495.0], [54.4, 1497.0], [54.5, 1498.0], [54.6, 1500.0], [54.7, 1502.0], [54.8, 1503.0], [54.9, 1504.0], [55.0, 1505.0], [55.1, 1507.0], [55.2, 1508.0], [55.3, 1509.0], [55.4, 1510.0], [55.5, 1511.0], [55.6, 1512.0], [55.7, 1513.0], [55.8, 1514.0], [55.9, 1514.0], [56.0, 1515.0], [56.1, 1516.0], [56.2, 1517.0], [56.3, 1518.0], [56.4, 1520.0], [56.5, 1521.0], [56.6, 1522.0], [56.7, 1525.0], [56.8, 1526.0], [56.9, 1527.0], [57.0, 1528.0], [57.1, 1530.0], [57.2, 1532.0], [57.3, 1532.0], [57.4, 1533.0], [57.5, 1534.0], [57.6, 1534.0], [57.7, 1535.0], [57.8, 1537.0], [57.9, 1538.0], [58.0, 1539.0], [58.1, 1539.0], [58.2, 1540.0], [58.3, 1541.0], [58.4, 1542.0], [58.5, 1544.0], [58.6, 1545.0], [58.7, 1547.0], [58.8, 1548.0], [58.9, 1550.0], [59.0, 1552.0], [59.1, 1553.0], [59.2, 1553.0], [59.3, 1556.0], [59.4, 1557.0], [59.5, 1558.0], [59.6, 1559.0], [59.7, 1559.0], [59.8, 1560.0], [59.9, 1561.0], [60.0, 1562.0], [60.1, 1562.0], [60.2, 1563.0], [60.3, 1564.0], [60.4, 1565.0], [60.5, 1566.0], [60.6, 1567.0], [60.7, 1568.0], [60.8, 1568.0], [60.9, 1569.0], [61.0, 1571.0], [61.1, 1573.0], [61.2, 1573.0], [61.3, 1575.0], [61.4, 1576.0], [61.5, 1578.0], [61.6, 1578.0], [61.7, 1579.0], [61.8, 1581.0], [61.9, 1582.0], [62.0, 1583.0], [62.1, 1584.0], [62.2, 1586.0], [62.3, 1589.0], [62.4, 1589.0], [62.5, 1591.0], [62.6, 1591.0], [62.7, 1592.0], [62.8, 1593.0], [62.9, 1594.0], [63.0, 1594.0], [63.1, 1595.0], [63.2, 1596.0], [63.3, 1599.0], [63.4, 1600.0], [63.5, 1601.0], [63.6, 1603.0], [63.7, 1604.0], [63.8, 1606.0], [63.9, 1607.0], [64.0, 1608.0], [64.1, 1610.0], [64.2, 1612.0], [64.3, 1613.0], [64.4, 1614.0], [64.5, 1615.0], [64.6, 1616.0], [64.7, 1617.0], [64.8, 1617.0], [64.9, 1618.0], [65.0, 1620.0], [65.1, 1621.0], [65.2, 1622.0], [65.3, 1623.0], [65.4, 1624.0], [65.5, 1625.0], [65.6, 1627.0], [65.7, 1627.0], [65.8, 1628.0], [65.9, 1630.0], [66.0, 1631.0], [66.1, 1633.0], [66.2, 1634.0], [66.3, 1636.0], [66.4, 1637.0], [66.5, 1639.0], [66.6, 1639.0], [66.7, 1640.0], [66.8, 1642.0], [66.9, 1643.0], [67.0, 1644.0], [67.1, 1645.0], [67.2, 1646.0], [67.3, 1646.0], [67.4, 1647.0], [67.5, 1648.0], [67.6, 1650.0], [67.7, 1650.0], [67.8, 1652.0], [67.9, 1652.0], [68.0, 1653.0], [68.1, 1654.0], [68.2, 1656.0], [68.3, 1657.0], [68.4, 1659.0], [68.5, 1661.0], [68.6, 1662.0], [68.7, 1663.0], [68.8, 1663.0], [68.9, 1664.0], [69.0, 1665.0], [69.1, 1666.0], [69.2, 1668.0], [69.3, 1668.0], [69.4, 1669.0], [69.5, 1671.0], [69.6, 1672.0], [69.7, 1673.0], [69.8, 1675.0], [69.9, 1677.0], [70.0, 1679.0], [70.1, 1681.0], [70.2, 1682.0], [70.3, 1683.0], [70.4, 1683.0], [70.5, 1684.0], [70.6, 1686.0], [70.7, 1687.0], [70.8, 1688.0], [70.9, 1690.0], [71.0, 1692.0], [71.1, 1692.0], [71.2, 1694.0], [71.3, 1694.0], [71.4, 1697.0], [71.5, 1700.0], [71.6, 1701.0], [71.7, 1702.0], [71.8, 1703.0], [71.9, 1704.0], [72.0, 1705.0], [72.1, 1706.0], [72.2, 1707.0], [72.3, 1708.0], [72.4, 1709.0], [72.5, 1711.0], [72.6, 1712.0], [72.7, 1713.0], [72.8, 1716.0], [72.9, 1717.0], [73.0, 1718.0], [73.1, 1719.0], [73.2, 1720.0], [73.3, 1722.0], [73.4, 1723.0], [73.5, 1725.0], [73.6, 1726.0], [73.7, 1729.0], [73.8, 1730.0], [73.9, 1732.0], [74.0, 1734.0], [74.1, 1736.0], [74.2, 1737.0], [74.3, 1737.0], [74.4, 1739.0], [74.5, 1740.0], [74.6, 1740.0], [74.7, 1742.0], [74.8, 1743.0], [74.9, 1745.0], [75.0, 1746.0], [75.1, 1747.0], [75.2, 1748.0], [75.3, 1749.0], [75.4, 1750.0], [75.5, 1751.0], [75.6, 1752.0], [75.7, 1753.0], [75.8, 1754.0], [75.9, 1755.0], [76.0, 1756.0], [76.1, 1758.0], [76.2, 1758.0], [76.3, 1760.0], [76.4, 1762.0], [76.5, 1762.0], [76.6, 1764.0], [76.7, 1765.0], [76.8, 1765.0], [76.9, 1766.0], [77.0, 1767.0], [77.1, 1768.0], [77.2, 1769.0], [77.3, 1770.0], [77.4, 1771.0], [77.5, 1772.0], [77.6, 1773.0], [77.7, 1774.0], [77.8, 1775.0], [77.9, 1776.0], [78.0, 1777.0], [78.1, 1778.0], [78.2, 1781.0], [78.3, 1782.0], [78.4, 1784.0], [78.5, 1786.0], [78.6, 1787.0], [78.7, 1788.0], [78.8, 1790.0], [78.9, 1792.0], [79.0, 1792.0], [79.1, 1793.0], [79.2, 1793.0], [79.3, 1796.0], [79.4, 1797.0], [79.5, 1800.0], [79.6, 1801.0], [79.7, 1802.0], [79.8, 1803.0], [79.9, 1805.0], [80.0, 1807.0], [80.1, 1810.0], [80.2, 1812.0], [80.3, 1813.0], [80.4, 1814.0], [80.5, 1814.0], [80.6, 1815.0], [80.7, 1816.0], [80.8, 1818.0], [80.9, 1819.0], [81.0, 1819.0], [81.1, 1820.0], [81.2, 1821.0], [81.3, 1823.0], [81.4, 1823.0], [81.5, 1824.0], [81.6, 1826.0], [81.7, 1827.0], [81.8, 1828.0], [81.9, 1829.0], [82.0, 1830.0], [82.1, 1832.0], [82.2, 1834.0], [82.3, 1835.0], [82.4, 1836.0], [82.5, 1838.0], [82.6, 1838.0], [82.7, 1840.0], [82.8, 1841.0], [82.9, 1842.0], [83.0, 1842.0], [83.1, 1845.0], [83.2, 1847.0], [83.3, 1847.0], [83.4, 1849.0], [83.5, 1850.0], [83.6, 1851.0], [83.7, 1853.0], [83.8, 1855.0], [83.9, 1855.0], [84.0, 1857.0], [84.1, 1857.0], [84.2, 1859.0], [84.3, 1860.0], [84.4, 1860.0], [84.5, 1861.0], [84.6, 1862.0], [84.7, 1863.0], [84.8, 1864.0], [84.9, 1865.0], [85.0, 1867.0], [85.1, 1867.0], [85.2, 1868.0], [85.3, 1871.0], [85.4, 1872.0], [85.5, 1872.0], [85.6, 1874.0], [85.7, 1875.0], [85.8, 1876.0], [85.9, 1878.0], [86.0, 1879.0], [86.1, 1880.0], [86.2, 1882.0], [86.3, 1883.0], [86.4, 1884.0], [86.5, 1886.0], [86.6, 1886.0], [86.7, 1887.0], [86.8, 1888.0], [86.9, 1890.0], [87.0, 1891.0], [87.1, 1893.0], [87.2, 1895.0], [87.3, 1897.0], [87.4, 1897.0], [87.5, 1898.0], [87.6, 1901.0], [87.7, 1903.0], [87.8, 1904.0], [87.9, 1904.0], [88.0, 1905.0], [88.1, 1906.0], [88.2, 1908.0], [88.3, 1910.0], [88.4, 1911.0], [88.5, 1913.0], [88.6, 1913.0], [88.7, 1914.0], [88.8, 1916.0], [88.9, 1916.0], [89.0, 1919.0], [89.1, 1921.0], [89.2, 1923.0], [89.3, 1925.0], [89.4, 1926.0], [89.5, 1927.0], [89.6, 1928.0], [89.7, 1932.0], [89.8, 1932.0], [89.9, 1933.0], [90.0, 1935.0], [90.1, 1936.0], [90.2, 1938.0], [90.3, 1939.0], [90.4, 1941.0], [90.5, 1942.0], [90.6, 1944.0], [90.7, 1946.0], [90.8, 1947.0], [90.9, 1948.0], [91.0, 1949.0], [91.1, 1950.0], [91.2, 1953.0], [91.3, 1953.0], [91.4, 1955.0], [91.5, 1958.0], [91.6, 1960.0], [91.7, 1962.0], [91.8, 1963.0], [91.9, 1964.0], [92.0, 1965.0], [92.1, 1966.0], [92.2, 1968.0], [92.3, 1970.0], [92.4, 1971.0], [92.5, 1974.0], [92.6, 1976.0], [92.7, 1978.0], [92.8, 1980.0], [92.9, 1983.0], [93.0, 1984.0], [93.1, 1984.0], [93.2, 1986.0], [93.3, 1987.0], [93.4, 1990.0], [93.5, 1991.0], [93.6, 1992.0], [93.7, 1993.0], [93.8, 1995.0], [93.9, 1997.0], [94.0, 1998.0], [94.1, 1999.0], [94.2, 2000.0], [94.3, 2003.0], [94.4, 2006.0], [94.5, 2008.0], [94.6, 2008.0], [94.7, 2010.0], [94.8, 2011.0], [94.9, 2014.0], [95.0, 2019.0], [95.1, 2021.0], [95.2, 2022.0], [95.3, 2023.0], [95.4, 2027.0], [95.5, 2032.0], [95.6, 2033.0], [95.7, 2037.0], [95.8, 2039.0], [95.9, 2041.0], [96.0, 2042.0], [96.1, 2045.0], [96.2, 2046.0], [96.3, 2051.0], [96.4, 2052.0], [96.5, 2054.0], [96.6, 2055.0], [96.7, 2060.0], [96.8, 2063.0], [96.9, 2065.0], [97.0, 2067.0], [97.1, 2072.0], [97.2, 2074.0], [97.3, 2080.0], [97.4, 2087.0], [97.5, 2092.0], [97.6, 2094.0], [97.7, 2097.0], [97.8, 2106.0], [97.9, 2109.0], [98.0, 2111.0], [98.1, 2113.0], [98.2, 2118.0], [98.3, 2121.0], [98.4, 2126.0], [98.5, 2135.0], [98.6, 2140.0], [98.7, 2153.0], [98.8, 2161.0], [98.9, 2171.0], [99.0, 2176.0], [99.1, 2183.0], [99.2, 2190.0], [99.3, 2199.0], [99.4, 2212.0], [99.5, 2218.0], [99.6, 2242.0], [99.7, 2267.0], [99.8, 2281.0], [99.9, 2304.0], [100.0, 2395.0]], "isOverall": false, "label": "GET /user/search", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 100.0, "title": "Response Time Percentiles"}},
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
        data: {"result": {"minY": 7.0, "minX": 0.0, "maxY": 376.0, "series": [{"data": [[0.0, 78.0], [2100.0, 69.0], [2200.0, 22.0], [2300.0, 7.0], [600.0, 139.0], [700.0, 141.0], [200.0, 120.0], [800.0, 143.0], [900.0, 163.0], [1000.0, 164.0], [1100.0, 158.0], [300.0, 105.0], [1200.0, 185.0], [1300.0, 265.0], [1400.0, 334.0], [1500.0, 376.0], [100.0, 122.0], [400.0, 117.0], [1600.0, 346.0], [1700.0, 341.0], [1800.0, 343.0], [1900.0, 281.0], [500.0, 93.0], [2000.0, 153.0]], "isOverall": false, "label": "GET /user/search", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 2300.0, "title": "Response Time Distribution"}},
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
        data: {"result": {"minY": 542.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 1936.0, "series": [{"data": [[0.0, 542.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 1787.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[2.0, 1936.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 2.0, "title": "Synthetic Response Times Distribution"}},
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
        data: {"result": {"minY": 49.06509695290859, "minX": 1.77232002E12, "maxY": 98.59271803556304, "series": [{"data": [[1.77232002E12, 49.06509695290859], [1.77232008E12, 98.59271803556304]], "isOverall": false, "label": "Search Users", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.77232008E12, "title": "Active Threads Over Time"}},
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
        data: {"result": {"minY": 80.0, "minX": 2.0, "maxY": 1458.6990064289912, "series": [{"data": [[2.0, 351.7142857142857], [3.0, 161.42857142857142], [4.0, 240.0], [5.0, 197.0], [6.0, 80.0], [7.0, 327.55555555555554], [8.0, 217.2], [9.0, 225.75], [10.0, 112.85714285714285], [11.0, 372.4], [12.0, 276.2222222222223], [13.0, 212.36363636363637], [14.0, 388.83333333333337], [15.0, 250.58333333333331], [16.0, 325.625], [17.0, 251.44444444444446], [18.0, 332.125], [19.0, 358.42857142857144], [20.0, 365.5], [21.0, 359.6], [22.0, 367.85714285714283], [23.0, 360.20000000000005], [24.0, 346.1111111111111], [25.0, 357.6], [26.0, 422.375], [27.0, 431.6], [28.0, 402.55555555555554], [29.0, 490.71428571428567], [30.0, 427.6666666666667], [31.0, 379.99999999999994], [32.0, 554.8571428571429], [33.0, 553.4285714285714], [34.0, 368.8181818181818], [35.0, 532.7692307692308], [36.0, 468.42857142857144], [37.0, 466.6666666666667], [38.0, 470.30000000000007], [39.0, 459.3333333333333], [40.0, 500.1111111111111], [41.0, 602.6666666666666], [42.0, 554.0769230769231], [43.0, 497.3333333333333], [44.0, 383.5], [45.0, 699.0], [46.0, 753.5555555555555], [47.0, 599.3333333333334], [48.0, 719.3846153846154], [49.0, 577.5555555555555], [50.0, 652.4285714285714], [51.0, 499.45454545454544], [52.0, 872.6666666666667], [53.0, 649.2222222222222], [54.0, 785.9999999999999], [55.0, 797.0], [56.0, 716.1538461538461], [57.0, 730.2857142857143], [58.0, 872.5], [59.0, 693.9166666666666], [60.0, 533.3333333333334], [61.0, 749.3749999999999], [62.0, 762.8333333333334], [63.0, 639.5], [64.0, 800.25], [65.0, 801.1538461538461], [66.0, 711.0], [67.0, 915.5833333333334], [68.0, 958.5714285714287], [69.0, 1250.3333333333333], [70.0, 833.0666666666667], [71.0, 924.4], [72.0, 955.0], [73.0, 799.3333333333334], [74.0, 1062.5714285714287], [75.0, 866.3333333333335], [76.0, 888.75], [77.0, 997.0000000000001], [78.0, 1167.888888888889], [79.0, 1050.7], [80.0, 805.6666666666667], [81.0, 741.5714285714286], [82.0, 1051.2222222222222], [83.0, 991.6666666666666], [84.0, 1180.5], [85.0, 868.0], [86.0, 1137.6999999999998], [87.0, 1060.142857142857], [88.0, 1036.7777777777778], [89.0, 1146.0], [90.0, 1132.5714285714287], [91.0, 935.5], [92.0, 1181.2], [93.0, 1182.9166666666667], [94.0, 1175.5714285714287], [95.0, 942.5000000000001], [96.0, 978.6], [97.0, 1402.1999999999998], [98.0, 1317.625], [99.0, 1335.142857142857], [100.0, 1458.6990064289912]], "isOverall": false, "label": "GET /user/search", "isController": false}, {"data": [[90.20844079718653, 1302.2736225087915]], "isOverall": false, "label": "GET /user/search-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 100.0, "title": "Time VS Threads"}},
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
        data : {"result": {"minY": 3246.3, "minX": 1.77232002E12, "maxY": 276439.4666666667, "series": [{"data": [[1.77232002E12, 50111.083333333336], [1.77232008E12, 276439.4666666667]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.77232002E12, 3246.3], [1.77232008E12, 15926.5]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.77232008E12, "title": "Bytes Throughput Over Time"}},
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
        data: {"result": {"minY": 550.945983379501, "minX": 1.77232002E12, "maxY": 1455.380750776179, "series": [{"data": [[1.77232002E12, 550.945983379501], [1.77232008E12, 1455.380750776179]], "isOverall": false, "label": "GET /user/search", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.77232008E12, "title": "Response Time Over Time"}},
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
        data: {"result": {"minY": 550.8961218836564, "minX": 1.77232002E12, "maxY": 1455.3389782670051, "series": [{"data": [[1.77232002E12, 550.8961218836564], [1.77232008E12, 1455.3389782670051]], "isOverall": false, "label": "GET /user/search", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.77232008E12, "title": "Latencies Over Time"}},
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
        data: {"result": {"minY": 0.00423370025402203, "minX": 1.77232002E12, "maxY": 0.10249307479224376, "series": [{"data": [[1.77232002E12, 0.10249307479224376], [1.77232008E12, 0.00423370025402203]], "isOverall": false, "label": "GET /user/search", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.77232008E12, "title": "Connect Time Over Time"}},
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
        data: {"result": {"minY": 33.0, "minX": 1.77232002E12, "maxY": 2395.0, "series": [{"data": [[1.77232002E12, 1704.0], [1.77232008E12, 2395.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.77232002E12, 1124.0], [1.77232008E12, 1961.6]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.77232002E12, 1453.2399999999998], [1.77232008E12, 2189.56]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.77232002E12, 1313.85], [1.77232008E12, 2039.7999999999997]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.77232002E12, 33.0], [1.77232008E12, 76.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.77232002E12, 478.5], [1.77232008E12, 1542.0]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.77232008E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
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
    data: {"result": {"minY": 53.0, "minX": 25.0, "maxY": 1748.5, "series": [{"data": [[50.0, 1281.5], [57.0, 1662.0], [58.0, 1746.5], [59.0, 1744.0], [60.0, 1748.5], [61.0, 1583.0], [62.0, 1633.5], [63.0, 1695.0], [66.0, 1407.0], [67.0, 1619.0], [65.0, 1629.0], [64.0, 1667.0], [69.0, 1621.0], [71.0, 1529.5], [70.0, 1702.0], [68.0, 1677.0], [75.0, 686.0], [73.0, 1367.0], [72.0, 1434.0], [74.0, 1372.0], [77.0, 717.0], [76.0, 1192.0], [79.0, 1281.0], [78.0, 996.0], [80.0, 109.0], [82.0, 583.5], [81.0, 1376.5], [86.0, 1382.0], [25.0, 53.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 86.0, "title": "Response Time Vs Request"}},
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
    data: {"result": {"minY": 53.0, "minX": 25.0, "maxY": 1748.5, "series": [{"data": [[50.0, 1281.5], [57.0, 1662.0], [58.0, 1746.5], [59.0, 1744.0], [60.0, 1748.5], [61.0, 1583.0], [62.0, 1633.5], [63.0, 1695.0], [66.0, 1406.5], [67.0, 1619.0], [65.0, 1629.0], [64.0, 1667.0], [69.0, 1621.0], [71.0, 1529.5], [70.0, 1701.5], [68.0, 1677.0], [75.0, 686.0], [73.0, 1367.0], [72.0, 1434.0], [74.0, 1372.0], [77.0, 717.0], [76.0, 1192.0], [79.0, 1281.0], [78.0, 996.0], [80.0, 109.0], [82.0, 583.5], [81.0, 1376.5], [86.0, 1382.0], [25.0, 53.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 86.0, "title": "Latencies Vs Request"}},
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
        data: {"result": {"minY": 13.633333333333333, "minX": 1.77232002E12, "maxY": 57.45, "series": [{"data": [[1.77232002E12, 13.633333333333333], [1.77232008E12, 57.45]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.77232008E12, "title": "Hits Per Second"}},
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
        data: {"result": {"minY": 12.033333333333333, "minX": 1.77232002E12, "maxY": 59.05, "series": [{"data": [[1.77232002E12, 12.033333333333333], [1.77232008E12, 59.05]], "isOverall": false, "label": "200", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.77232008E12, "title": "Codes Per Second"}},
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
        data: {"result": {"minY": 12.033333333333333, "minX": 1.77232002E12, "maxY": 59.05, "series": [{"data": [[1.77232002E12, 12.033333333333333], [1.77232008E12, 59.05]], "isOverall": false, "label": "GET /user/search-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.77232008E12, "title": "Transactions Per Second"}},
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
        data: {"result": {"minY": 12.033333333333333, "minX": 1.77232002E12, "maxY": 59.05, "series": [{"data": [[1.77232002E12, 12.033333333333333], [1.77232008E12, 59.05]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.77232008E12, "title": "Total Transactions Per Second"}},
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

