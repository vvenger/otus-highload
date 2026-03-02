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
        data: {"result": {"minY": 25.0, "minX": 0.0, "maxY": 504.0, "series": [{"data": [[0.0, 25.0], [0.1, 26.0], [0.2, 26.0], [0.3, 27.0], [0.4, 27.0], [0.5, 28.0], [0.6, 28.0], [0.7, 29.0], [0.8, 29.0], [0.9, 29.0], [1.0, 29.0], [1.1, 30.0], [1.2, 30.0], [1.3, 30.0], [1.4, 30.0], [1.5, 30.0], [1.6, 31.0], [1.7, 31.0], [1.8, 31.0], [1.9, 32.0], [2.0, 32.0], [2.1, 33.0], [2.2, 33.0], [2.3, 34.0], [2.4, 35.0], [2.5, 35.0], [2.6, 36.0], [2.7, 37.0], [2.8, 38.0], [2.9, 40.0], [3.0, 42.0], [3.1, 42.0], [3.2, 43.0], [3.3, 43.0], [3.4, 43.0], [3.5, 44.0], [3.6, 45.0], [3.7, 46.0], [3.8, 46.0], [3.9, 47.0], [4.0, 47.0], [4.1, 48.0], [4.2, 48.0], [4.3, 49.0], [4.4, 49.0], [4.5, 50.0], [4.6, 50.0], [4.7, 51.0], [4.8, 52.0], [4.9, 52.0], [5.0, 53.0], [5.1, 54.0], [5.2, 54.0], [5.3, 54.0], [5.4, 55.0], [5.5, 55.0], [5.6, 56.0], [5.7, 56.0], [5.8, 57.0], [5.9, 58.0], [6.0, 58.0], [6.1, 59.0], [6.2, 59.0], [6.3, 59.0], [6.4, 60.0], [6.5, 60.0], [6.6, 61.0], [6.7, 61.0], [6.8, 61.0], [6.9, 62.0], [7.0, 62.0], [7.1, 63.0], [7.2, 63.0], [7.3, 64.0], [7.4, 64.0], [7.5, 64.0], [7.6, 65.0], [7.7, 65.0], [7.8, 66.0], [7.9, 66.0], [8.0, 67.0], [8.1, 68.0], [8.2, 68.0], [8.3, 69.0], [8.4, 69.0], [8.5, 69.0], [8.6, 70.0], [8.7, 71.0], [8.8, 71.0], [8.9, 71.0], [9.0, 72.0], [9.1, 72.0], [9.2, 72.0], [9.3, 72.0], [9.4, 73.0], [9.5, 73.0], [9.6, 73.0], [9.7, 74.0], [9.8, 74.0], [9.9, 75.0], [10.0, 75.0], [10.1, 76.0], [10.2, 76.0], [10.3, 76.0], [10.4, 76.0], [10.5, 77.0], [10.6, 77.0], [10.7, 78.0], [10.8, 78.0], [10.9, 78.0], [11.0, 79.0], [11.1, 79.0], [11.2, 79.0], [11.3, 80.0], [11.4, 80.0], [11.5, 80.0], [11.6, 81.0], [11.7, 81.0], [11.8, 81.0], [11.9, 81.0], [12.0, 82.0], [12.1, 82.0], [12.2, 82.0], [12.3, 83.0], [12.4, 83.0], [12.5, 83.0], [12.6, 84.0], [12.7, 84.0], [12.8, 84.0], [12.9, 84.0], [13.0, 85.0], [13.1, 85.0], [13.2, 85.0], [13.3, 85.0], [13.4, 85.0], [13.5, 85.0], [13.6, 86.0], [13.7, 86.0], [13.8, 86.0], [13.9, 86.0], [14.0, 87.0], [14.1, 87.0], [14.2, 87.0], [14.3, 87.0], [14.4, 87.0], [14.5, 87.0], [14.6, 87.0], [14.7, 88.0], [14.8, 88.0], [14.9, 88.0], [15.0, 88.0], [15.1, 88.0], [15.2, 88.0], [15.3, 89.0], [15.4, 89.0], [15.5, 89.0], [15.6, 89.0], [15.7, 90.0], [15.8, 90.0], [15.9, 90.0], [16.0, 90.0], [16.1, 90.0], [16.2, 90.0], [16.3, 90.0], [16.4, 91.0], [16.5, 91.0], [16.6, 91.0], [16.7, 92.0], [16.8, 92.0], [16.9, 92.0], [17.0, 92.0], [17.1, 92.0], [17.2, 92.0], [17.3, 92.0], [17.4, 92.0], [17.5, 93.0], [17.6, 93.0], [17.7, 93.0], [17.8, 93.0], [17.9, 93.0], [18.0, 93.0], [18.1, 93.0], [18.2, 93.0], [18.3, 94.0], [18.4, 94.0], [18.5, 94.0], [18.6, 94.0], [18.7, 94.0], [18.8, 94.0], [18.9, 94.0], [19.0, 94.0], [19.1, 94.0], [19.2, 95.0], [19.3, 95.0], [19.4, 95.0], [19.5, 95.0], [19.6, 95.0], [19.7, 95.0], [19.8, 95.0], [19.9, 95.0], [20.0, 95.0], [20.1, 96.0], [20.2, 96.0], [20.3, 96.0], [20.4, 96.0], [20.5, 96.0], [20.6, 96.0], [20.7, 97.0], [20.8, 97.0], [20.9, 97.0], [21.0, 97.0], [21.1, 97.0], [21.2, 97.0], [21.3, 97.0], [21.4, 97.0], [21.5, 98.0], [21.6, 98.0], [21.7, 98.0], [21.8, 98.0], [21.9, 98.0], [22.0, 98.0], [22.1, 98.0], [22.2, 99.0], [22.3, 99.0], [22.4, 99.0], [22.5, 99.0], [22.6, 99.0], [22.7, 99.0], [22.8, 99.0], [22.9, 99.0], [23.0, 99.0], [23.1, 100.0], [23.2, 100.0], [23.3, 100.0], [23.4, 100.0], [23.5, 100.0], [23.6, 100.0], [23.7, 100.0], [23.8, 100.0], [23.9, 100.0], [24.0, 101.0], [24.1, 101.0], [24.2, 101.0], [24.3, 101.0], [24.4, 101.0], [24.5, 101.0], [24.6, 101.0], [24.7, 101.0], [24.8, 102.0], [24.9, 102.0], [25.0, 102.0], [25.1, 102.0], [25.2, 102.0], [25.3, 102.0], [25.4, 102.0], [25.5, 102.0], [25.6, 102.0], [25.7, 102.0], [25.8, 102.0], [25.9, 103.0], [26.0, 103.0], [26.1, 103.0], [26.2, 103.0], [26.3, 103.0], [26.4, 103.0], [26.5, 103.0], [26.6, 104.0], [26.7, 104.0], [26.8, 104.0], [26.9, 104.0], [27.0, 104.0], [27.1, 104.0], [27.2, 104.0], [27.3, 104.0], [27.4, 105.0], [27.5, 105.0], [27.6, 105.0], [27.7, 105.0], [27.8, 105.0], [27.9, 105.0], [28.0, 105.0], [28.1, 105.0], [28.2, 106.0], [28.3, 106.0], [28.4, 106.0], [28.5, 106.0], [28.6, 106.0], [28.7, 106.0], [28.8, 106.0], [28.9, 106.0], [29.0, 107.0], [29.1, 107.0], [29.2, 107.0], [29.3, 107.0], [29.4, 107.0], [29.5, 107.0], [29.6, 107.0], [29.7, 108.0], [29.8, 108.0], [29.9, 108.0], [30.0, 108.0], [30.1, 108.0], [30.2, 108.0], [30.3, 108.0], [30.4, 108.0], [30.5, 108.0], [30.6, 108.0], [30.7, 108.0], [30.8, 109.0], [30.9, 109.0], [31.0, 109.0], [31.1, 109.0], [31.2, 109.0], [31.3, 109.0], [31.4, 109.0], [31.5, 109.0], [31.6, 110.0], [31.7, 110.0], [31.8, 110.0], [31.9, 110.0], [32.0, 110.0], [32.1, 110.0], [32.2, 110.0], [32.3, 110.0], [32.4, 111.0], [32.5, 111.0], [32.6, 111.0], [32.7, 111.0], [32.8, 111.0], [32.9, 111.0], [33.0, 111.0], [33.1, 112.0], [33.2, 112.0], [33.3, 112.0], [33.4, 112.0], [33.5, 112.0], [33.6, 112.0], [33.7, 112.0], [33.8, 112.0], [33.9, 112.0], [34.0, 113.0], [34.1, 113.0], [34.2, 113.0], [34.3, 113.0], [34.4, 113.0], [34.5, 113.0], [34.6, 113.0], [34.7, 114.0], [34.8, 114.0], [34.9, 114.0], [35.0, 114.0], [35.1, 114.0], [35.2, 114.0], [35.3, 114.0], [35.4, 114.0], [35.5, 114.0], [35.6, 114.0], [35.7, 115.0], [35.8, 115.0], [35.9, 115.0], [36.0, 115.0], [36.1, 115.0], [36.2, 115.0], [36.3, 115.0], [36.4, 116.0], [36.5, 116.0], [36.6, 116.0], [36.7, 116.0], [36.8, 116.0], [36.9, 116.0], [37.0, 116.0], [37.1, 116.0], [37.2, 116.0], [37.3, 117.0], [37.4, 117.0], [37.5, 117.0], [37.6, 117.0], [37.7, 117.0], [37.8, 117.0], [37.9, 117.0], [38.0, 118.0], [38.1, 118.0], [38.2, 118.0], [38.3, 118.0], [38.4, 118.0], [38.5, 118.0], [38.6, 118.0], [38.7, 118.0], [38.8, 119.0], [38.9, 119.0], [39.0, 119.0], [39.1, 119.0], [39.2, 119.0], [39.3, 119.0], [39.4, 119.0], [39.5, 119.0], [39.6, 119.0], [39.7, 119.0], [39.8, 120.0], [39.9, 120.0], [40.0, 120.0], [40.1, 120.0], [40.2, 120.0], [40.3, 120.0], [40.4, 120.0], [40.5, 121.0], [40.6, 121.0], [40.7, 121.0], [40.8, 121.0], [40.9, 121.0], [41.0, 121.0], [41.1, 121.0], [41.2, 121.0], [41.3, 121.0], [41.4, 121.0], [41.5, 121.0], [41.6, 121.0], [41.7, 122.0], [41.8, 122.0], [41.9, 122.0], [42.0, 122.0], [42.1, 122.0], [42.2, 122.0], [42.3, 122.0], [42.4, 122.0], [42.5, 122.0], [42.6, 122.0], [42.7, 123.0], [42.8, 123.0], [42.9, 123.0], [43.0, 123.0], [43.1, 123.0], [43.2, 123.0], [43.3, 123.0], [43.4, 124.0], [43.5, 124.0], [43.6, 124.0], [43.7, 124.0], [43.8, 124.0], [43.9, 124.0], [44.0, 125.0], [44.1, 125.0], [44.2, 125.0], [44.3, 125.0], [44.4, 125.0], [44.5, 125.0], [44.6, 125.0], [44.7, 125.0], [44.8, 125.0], [44.9, 126.0], [45.0, 126.0], [45.1, 126.0], [45.2, 126.0], [45.3, 126.0], [45.4, 126.0], [45.5, 126.0], [45.6, 126.0], [45.7, 126.0], [45.8, 127.0], [45.9, 127.0], [46.0, 127.0], [46.1, 127.0], [46.2, 127.0], [46.3, 127.0], [46.4, 127.0], [46.5, 127.0], [46.6, 127.0], [46.7, 128.0], [46.8, 128.0], [46.9, 128.0], [47.0, 128.0], [47.1, 128.0], [47.2, 128.0], [47.3, 128.0], [47.4, 129.0], [47.5, 129.0], [47.6, 129.0], [47.7, 129.0], [47.8, 129.0], [47.9, 129.0], [48.0, 129.0], [48.1, 130.0], [48.2, 130.0], [48.3, 130.0], [48.4, 130.0], [48.5, 130.0], [48.6, 130.0], [48.7, 131.0], [48.8, 131.0], [48.9, 131.0], [49.0, 131.0], [49.1, 131.0], [49.2, 131.0], [49.3, 131.0], [49.4, 131.0], [49.5, 132.0], [49.6, 132.0], [49.7, 132.0], [49.8, 132.0], [49.9, 132.0], [50.0, 132.0], [50.1, 133.0], [50.2, 133.0], [50.3, 133.0], [50.4, 133.0], [50.5, 133.0], [50.6, 133.0], [50.7, 133.0], [50.8, 133.0], [50.9, 134.0], [51.0, 134.0], [51.1, 134.0], [51.2, 134.0], [51.3, 134.0], [51.4, 134.0], [51.5, 135.0], [51.6, 135.0], [51.7, 135.0], [51.8, 135.0], [51.9, 135.0], [52.0, 135.0], [52.1, 135.0], [52.2, 136.0], [52.3, 136.0], [52.4, 136.0], [52.5, 136.0], [52.6, 136.0], [52.7, 137.0], [52.8, 137.0], [52.9, 137.0], [53.0, 137.0], [53.1, 137.0], [53.2, 138.0], [53.3, 138.0], [53.4, 138.0], [53.5, 138.0], [53.6, 138.0], [53.7, 139.0], [53.8, 139.0], [53.9, 139.0], [54.0, 139.0], [54.1, 140.0], [54.2, 140.0], [54.3, 140.0], [54.4, 140.0], [54.5, 141.0], [54.6, 141.0], [54.7, 141.0], [54.8, 141.0], [54.9, 141.0], [55.0, 141.0], [55.1, 141.0], [55.2, 141.0], [55.3, 142.0], [55.4, 142.0], [55.5, 142.0], [55.6, 142.0], [55.7, 142.0], [55.8, 143.0], [55.9, 143.0], [56.0, 143.0], [56.1, 143.0], [56.2, 143.0], [56.3, 143.0], [56.4, 144.0], [56.5, 144.0], [56.6, 144.0], [56.7, 144.0], [56.8, 144.0], [56.9, 144.0], [57.0, 145.0], [57.1, 145.0], [57.2, 145.0], [57.3, 145.0], [57.4, 146.0], [57.5, 146.0], [57.6, 146.0], [57.7, 146.0], [57.8, 146.0], [57.9, 146.0], [58.0, 146.0], [58.1, 146.0], [58.2, 147.0], [58.3, 147.0], [58.4, 147.0], [58.5, 147.0], [58.6, 147.0], [58.7, 147.0], [58.8, 148.0], [58.9, 148.0], [59.0, 148.0], [59.1, 148.0], [59.2, 148.0], [59.3, 149.0], [59.4, 149.0], [59.5, 149.0], [59.6, 149.0], [59.7, 149.0], [59.8, 150.0], [59.9, 150.0], [60.0, 150.0], [60.1, 150.0], [60.2, 150.0], [60.3, 151.0], [60.4, 151.0], [60.5, 151.0], [60.6, 151.0], [60.7, 151.0], [60.8, 152.0], [60.9, 152.0], [61.0, 152.0], [61.1, 152.0], [61.2, 152.0], [61.3, 152.0], [61.4, 152.0], [61.5, 153.0], [61.6, 153.0], [61.7, 153.0], [61.8, 154.0], [61.9, 154.0], [62.0, 154.0], [62.1, 155.0], [62.2, 155.0], [62.3, 155.0], [62.4, 155.0], [62.5, 155.0], [62.6, 156.0], [62.7, 156.0], [62.8, 156.0], [62.9, 157.0], [63.0, 157.0], [63.1, 157.0], [63.2, 157.0], [63.3, 157.0], [63.4, 157.0], [63.5, 157.0], [63.6, 157.0], [63.7, 158.0], [63.8, 158.0], [63.9, 158.0], [64.0, 158.0], [64.1, 158.0], [64.2, 159.0], [64.3, 159.0], [64.4, 159.0], [64.5, 159.0], [64.6, 159.0], [64.7, 159.0], [64.8, 159.0], [64.9, 160.0], [65.0, 160.0], [65.1, 160.0], [65.2, 160.0], [65.3, 160.0], [65.4, 160.0], [65.5, 161.0], [65.6, 161.0], [65.7, 161.0], [65.8, 161.0], [65.9, 161.0], [66.0, 162.0], [66.1, 162.0], [66.2, 162.0], [66.3, 162.0], [66.4, 163.0], [66.5, 163.0], [66.6, 163.0], [66.7, 163.0], [66.8, 163.0], [66.9, 164.0], [67.0, 164.0], [67.1, 164.0], [67.2, 164.0], [67.3, 165.0], [67.4, 165.0], [67.5, 165.0], [67.6, 165.0], [67.7, 165.0], [67.8, 166.0], [67.9, 166.0], [68.0, 166.0], [68.1, 166.0], [68.2, 167.0], [68.3, 167.0], [68.4, 167.0], [68.5, 168.0], [68.6, 168.0], [68.7, 168.0], [68.8, 168.0], [68.9, 168.0], [69.0, 169.0], [69.1, 169.0], [69.2, 169.0], [69.3, 169.0], [69.4, 170.0], [69.5, 170.0], [69.6, 170.0], [69.7, 170.0], [69.8, 171.0], [69.9, 171.0], [70.0, 171.0], [70.1, 171.0], [70.2, 172.0], [70.3, 172.0], [70.4, 172.0], [70.5, 173.0], [70.6, 173.0], [70.7, 173.0], [70.8, 173.0], [70.9, 174.0], [71.0, 175.0], [71.1, 175.0], [71.2, 175.0], [71.3, 176.0], [71.4, 177.0], [71.5, 177.0], [71.6, 177.0], [71.7, 177.0], [71.8, 178.0], [71.9, 178.0], [72.0, 179.0], [72.1, 179.0], [72.2, 180.0], [72.3, 180.0], [72.4, 180.0], [72.5, 181.0], [72.6, 181.0], [72.7, 181.0], [72.8, 182.0], [72.9, 183.0], [73.0, 183.0], [73.1, 183.0], [73.2, 184.0], [73.3, 184.0], [73.4, 185.0], [73.5, 185.0], [73.6, 185.0], [73.7, 186.0], [73.8, 186.0], [73.9, 187.0], [74.0, 188.0], [74.1, 188.0], [74.2, 188.0], [74.3, 188.0], [74.4, 189.0], [74.5, 190.0], [74.6, 190.0], [74.7, 190.0], [74.8, 191.0], [74.9, 191.0], [75.0, 191.0], [75.1, 192.0], [75.2, 193.0], [75.3, 193.0], [75.4, 194.0], [75.5, 194.0], [75.6, 194.0], [75.7, 195.0], [75.8, 195.0], [75.9, 196.0], [76.0, 196.0], [76.1, 196.0], [76.2, 197.0], [76.3, 198.0], [76.4, 199.0], [76.5, 199.0], [76.6, 200.0], [76.7, 200.0], [76.8, 201.0], [76.9, 202.0], [77.0, 202.0], [77.1, 203.0], [77.2, 203.0], [77.3, 203.0], [77.4, 204.0], [77.5, 204.0], [77.6, 204.0], [77.7, 205.0], [77.8, 205.0], [77.9, 206.0], [78.0, 206.0], [78.1, 207.0], [78.2, 207.0], [78.3, 208.0], [78.4, 208.0], [78.5, 208.0], [78.6, 209.0], [78.7, 210.0], [78.8, 210.0], [78.9, 210.0], [79.0, 211.0], [79.1, 211.0], [79.2, 212.0], [79.3, 212.0], [79.4, 212.0], [79.5, 213.0], [79.6, 213.0], [79.7, 213.0], [79.8, 214.0], [79.9, 214.0], [80.0, 215.0], [80.1, 215.0], [80.2, 215.0], [80.3, 215.0], [80.4, 216.0], [80.5, 216.0], [80.6, 217.0], [80.7, 217.0], [80.8, 218.0], [80.9, 219.0], [81.0, 219.0], [81.1, 219.0], [81.2, 220.0], [81.3, 220.0], [81.4, 221.0], [81.5, 221.0], [81.6, 221.0], [81.7, 222.0], [81.8, 223.0], [81.9, 223.0], [82.0, 223.0], [82.1, 224.0], [82.2, 224.0], [82.3, 224.0], [82.4, 225.0], [82.5, 225.0], [82.6, 225.0], [82.7, 226.0], [82.8, 226.0], [82.9, 226.0], [83.0, 227.0], [83.1, 227.0], [83.2, 227.0], [83.3, 228.0], [83.4, 228.0], [83.5, 229.0], [83.6, 229.0], [83.7, 229.0], [83.8, 230.0], [83.9, 230.0], [84.0, 230.0], [84.1, 231.0], [84.2, 231.0], [84.3, 232.0], [84.4, 233.0], [84.5, 233.0], [84.6, 234.0], [84.7, 234.0], [84.8, 234.0], [84.9, 235.0], [85.0, 235.0], [85.1, 236.0], [85.2, 236.0], [85.3, 237.0], [85.4, 237.0], [85.5, 237.0], [85.6, 237.0], [85.7, 238.0], [85.8, 238.0], [85.9, 239.0], [86.0, 239.0], [86.1, 239.0], [86.2, 240.0], [86.3, 240.0], [86.4, 240.0], [86.5, 241.0], [86.6, 241.0], [86.7, 241.0], [86.8, 242.0], [86.9, 242.0], [87.0, 243.0], [87.1, 243.0], [87.2, 243.0], [87.3, 244.0], [87.4, 244.0], [87.5, 245.0], [87.6, 245.0], [87.7, 245.0], [87.8, 246.0], [87.9, 246.0], [88.0, 247.0], [88.1, 247.0], [88.2, 247.0], [88.3, 248.0], [88.4, 248.0], [88.5, 248.0], [88.6, 249.0], [88.7, 249.0], [88.8, 250.0], [88.9, 251.0], [89.0, 251.0], [89.1, 252.0], [89.2, 252.0], [89.3, 253.0], [89.4, 253.0], [89.5, 253.0], [89.6, 254.0], [89.7, 254.0], [89.8, 254.0], [89.9, 255.0], [90.0, 255.0], [90.1, 255.0], [90.2, 256.0], [90.3, 256.0], [90.4, 257.0], [90.5, 258.0], [90.6, 259.0], [90.7, 259.0], [90.8, 259.0], [90.9, 260.0], [91.0, 260.0], [91.1, 261.0], [91.2, 261.0], [91.3, 261.0], [91.4, 261.0], [91.5, 262.0], [91.6, 262.0], [91.7, 262.0], [91.8, 263.0], [91.9, 263.0], [92.0, 264.0], [92.1, 264.0], [92.2, 264.0], [92.3, 265.0], [92.4, 265.0], [92.5, 266.0], [92.6, 267.0], [92.7, 267.0], [92.8, 268.0], [92.9, 269.0], [93.0, 270.0], [93.1, 271.0], [93.2, 271.0], [93.3, 271.0], [93.4, 272.0], [93.5, 273.0], [93.6, 273.0], [93.7, 274.0], [93.8, 274.0], [93.9, 275.0], [94.0, 275.0], [94.1, 276.0], [94.2, 276.0], [94.3, 277.0], [94.4, 277.0], [94.5, 279.0], [94.6, 279.0], [94.7, 279.0], [94.8, 280.0], [94.9, 281.0], [95.0, 282.0], [95.1, 283.0], [95.2, 284.0], [95.3, 284.0], [95.4, 285.0], [95.5, 286.0], [95.6, 287.0], [95.7, 287.0], [95.8, 287.0], [95.9, 288.0], [96.0, 289.0], [96.1, 289.0], [96.2, 290.0], [96.3, 291.0], [96.4, 292.0], [96.5, 293.0], [96.6, 294.0], [96.7, 294.0], [96.8, 295.0], [96.9, 296.0], [97.0, 297.0], [97.1, 298.0], [97.2, 299.0], [97.3, 300.0], [97.4, 301.0], [97.5, 302.0], [97.6, 302.0], [97.7, 303.0], [97.8, 304.0], [97.9, 305.0], [98.0, 307.0], [98.1, 309.0], [98.2, 310.0], [98.3, 311.0], [98.4, 314.0], [98.5, 317.0], [98.6, 318.0], [98.7, 320.0], [98.8, 322.0], [98.9, 323.0], [99.0, 323.0], [99.1, 324.0], [99.2, 326.0], [99.3, 331.0], [99.4, 336.0], [99.5, 345.0], [99.6, 354.0], [99.7, 357.0], [99.8, 372.0], [99.9, 439.0]], "isOverall": false, "label": "GET /user/search", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 100.0, "title": "Response Time Percentiles"}},
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
        data: {"result": {"minY": 2.0, "minX": 0.0, "maxY": 1978.0, "series": [{"data": [[0.0, 853.0], [300.0, 96.0], [100.0, 1978.0], [200.0, 769.0], [400.0, 2.0], [500.0, 2.0]], "isOverall": false, "label": "GET /user/search", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 500.0, "title": "Response Time Distribution"}},
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
        data: {"result": {"minY": 1.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 3699.0, "series": [{"data": [[0.0, 3699.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 1.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 1.0, "title": "Synthetic Response Times Distribution"}},
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
        data: {"result": {"minY": 8.946526151444179, "minX": 1.7723199E12, "maxY": 9.960456942003512, "series": [{"data": [[1.7723199E12, 8.946526151444179], [1.77231996E12, 9.960456942003512]], "isOverall": false, "label": "Search Users", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.77231996E12, "title": "Active Threads Over Time"}},
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
        data: {"result": {"minY": 32.01587301587302, "minX": 1.0, "maxY": 163.29254977520844, "series": [{"data": [[1.0, 32.66666666666667], [2.0, 32.01587301587302], [4.0, 58.072463768115945], [8.0, 113.19178082191779], [9.0, 129.13043478260866], [5.0, 73.75714285714288], [10.0, 163.29254977520844], [3.0, 45.34848484848486], [6.0, 83.71232876712328], [7.0, 99.05714285714284]], "isOverall": false, "label": "GET /user/search", "isController": false}, {"data": [[9.258378378378382, 149.72135135135161]], "isOverall": false, "label": "GET /user/search-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 10.0, "title": "Time VS Threads"}},
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
        data : {"result": {"minY": 5116.0, "minX": 1.7723199E12, "maxY": 195911.41666666666, "series": [{"data": [[1.7723199E12, 195911.41666666666], [1.77231996E12, 88893.41666666667]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.7723199E12, 11517.2], [1.77231996E12, 5116.0]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.77231996E12, "title": "Bytes Throughput Over Time"}},
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
        data: {"result": {"minY": 139.29469164715078, "minX": 1.7723199E12, "maxY": 173.19507908611632, "series": [{"data": [[1.7723199E12, 139.29469164715078], [1.77231996E12, 173.19507908611632]], "isOverall": false, "label": "GET /user/search", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.77231996E12, "title": "Response Time Over Time"}},
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
        data: {"result": {"minY": 139.25058548009355, "minX": 1.7723199E12, "maxY": 173.14850615114236, "series": [{"data": [[1.7723199E12, 139.25058548009355], [1.77231996E12, 173.14850615114236]], "isOverall": false, "label": "GET /user/search", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.77231996E12, "title": "Latencies Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.7723199E12, "maxY": 0.007416081186572986, "series": [{"data": [[1.7723199E12, 0.007416081186572986], [1.77231996E12, 0.0]], "isOverall": false, "label": "GET /user/search", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.77231996E12, "title": "Connect Time Over Time"}},
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
        data: {"result": {"minY": 25.0, "minX": 1.7723199E12, "maxY": 504.0, "series": [{"data": [[1.7723199E12, 504.0], [1.77231996E12, 377.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.7723199E12, 239.0], [1.77231996E12, 279.0]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.7723199E12, 311.0], [1.77231996E12, 341.0]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.7723199E12, 264.0], [1.77231996E12, 301.04999999999995]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.7723199E12, 25.0], [1.77231996E12, 64.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.7723199E12, 125.0], [1.77231996E12, 152.0]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.77231996E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
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
    data: {"result": {"minY": 29.0, "minX": 9.0, "maxY": 159.0, "series": [{"data": [[9.0, 29.0], [45.0, 157.0], [46.0, 29.0], [51.0, 149.0], [53.0, 159.0], [55.0, 158.0], [54.0, 143.0], [56.0, 152.5], [59.0, 146.0], [58.0, 152.0], [61.0, 149.0], [60.0, 136.5], [63.0, 143.0], [64.0, 120.5], [65.0, 111.5], [66.0, 128.0], [70.0, 88.0], [69.0, 103.0], [71.0, 95.0], [68.0, 130.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 71.0, "title": "Response Time Vs Request"}},
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
    data: {"result": {"minY": 29.0, "minX": 9.0, "maxY": 159.0, "series": [{"data": [[9.0, 29.0], [45.0, 157.0], [46.0, 29.0], [51.0, 149.0], [53.0, 159.0], [55.0, 158.0], [54.0, 143.0], [56.0, 152.5], [59.0, 146.0], [58.0, 152.0], [61.0, 149.0], [60.0, 136.5], [63.0, 143.0], [64.0, 120.5], [65.0, 111.5], [66.0, 128.0], [70.0, 88.0], [69.0, 103.0], [71.0, 95.0], [68.0, 130.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 71.0, "title": "Latencies Vs Request"}},
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
        data: {"result": {"minY": 18.8, "minX": 1.7723199E12, "maxY": 42.86666666666667, "series": [{"data": [[1.7723199E12, 42.86666666666667], [1.77231996E12, 18.8]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.77231996E12, "title": "Hits Per Second"}},
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
        data: {"result": {"minY": 18.966666666666665, "minX": 1.7723199E12, "maxY": 42.7, "series": [{"data": [[1.7723199E12, 42.7], [1.77231996E12, 18.966666666666665]], "isOverall": false, "label": "200", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.77231996E12, "title": "Codes Per Second"}},
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
        data: {"result": {"minY": 18.966666666666665, "minX": 1.7723199E12, "maxY": 42.7, "series": [{"data": [[1.7723199E12, 42.7], [1.77231996E12, 18.966666666666665]], "isOverall": false, "label": "GET /user/search-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.77231996E12, "title": "Transactions Per Second"}},
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
        data: {"result": {"minY": 18.966666666666665, "minX": 1.7723199E12, "maxY": 42.7, "series": [{"data": [[1.7723199E12, 42.7], [1.77231996E12, 18.966666666666665]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.77231996E12, "title": "Total Transactions Per Second"}},
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

