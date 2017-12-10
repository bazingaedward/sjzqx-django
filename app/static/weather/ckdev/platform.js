$(function () {
    var currentElement = 'TEM';
    var currentDate = null;
    var currentFileName = null;
    var RESOLUTIONTHRESHOLD = 200;
    var COLORTHRESHOLD = {};
    var PLOTLATLON = [113.4, 37.3, 115.8, 38.9];
    var ImageCache = {
      'TEM': '',
      'RHU': '',
      'PRE': '',
      'VIS_HOR_1MI': '',
      'WIN_S_Avg_1mi': ''
    }
    COLORTHRESHOLD['TEM'] = [5,35];
    COLORTHRESHOLD['RHU'] = [20,80];
    COLORTHRESHOLD['PRE'] = [50, 100];
    COLORTHRESHOLD['VIS_HOR_1MI'] = [10,100];
    COLORTHRESHOLD['WIN_S_Avg_1mi'] = [2,10];

    var targetExtent = ol.proj.transformExtent([113.516, 37.4385, 115.477, 38.7639], 'EPSG:4326', 'EPSG:3857');

    var ctlZoomToExt = new ol.control.ZoomToExtent({
        extent: targetExtent
    });
    var ctlScaleLine = new ol.control.ScaleLine();

    var mapControls = ol.control.defaults({
        attribution: false
    }).extend([
        ctlScaleLine,
        ctlZoomToExt
    ]);

    var mapInteractions = ol.interaction.defaults({altShiftDragRotate: false, pinchRotate: false});

    var lyRaster = new ol.layer.Tile({
        source: new ol.source.XYZ({
            url: '/static/gis/tiles/{z}/{x}/{-y}.png',
            minZoom: 7,
            maxZoom: 9
        })
    });

    var lyXianline = new ol.layer.Vector({
        source: new ol.source.Vector({
            url: '/static/gis/geojson/xian_line.geojson',
            format: new ol.format.GeoJSON(),

        }),
        style: function (feature, resolution) {
            return new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: '#319FD3',
                    width: 1
                })
            });
        }
    });



    var lyXianPoint = new ol.layer.Vector({
        source: new ol.source.Vector({
            url: '/static/gis/geojson/xian_point.geojson',
            format: new ol.format.GeoJSON()
        }),
        style: function (feature, resolution) {
            if(resolution > RESOLUTIONTHRESHOLD){

                return new ol.style.Style({
                    // stroke: new ol.style.Stroke({
                    //     color: [64, 200, 200, 0.5],
                    //     width: 1
                    // }),
                    text: new ol.style.Text({
                        font: '14px Simhei',
                        text: feature.get('NAME'),
                        fill: new ol.style.Fill({
                            color: [64, 64, 64, 0.6]
                        })
                    })
                });
            }
    }});

    var lyXiangPoint = new ol.layer.Vector({
        source: new ol.source.Vector({
            url: '/static/gis/geojson/xiang_point.geojson',
            format: new ol.format.GeoJSON()
        }),
        style: function (feature, resolution) {
        if(resolution <= RESOLUTIONTHRESHOLD){
            return new ol.style.Style({
                // stroke: new ol.style.Stroke({
                //     color: [64, 200, 200, 0.5],
                //     width: 1
                // }),
                text: new ol.style.Text({
                    font: '4px Simhei',
                    text: feature.get('NAME'),
                    fill: new ol.style.Fill({
                        color: [64, 64, 64, 0.45]
                    })
                })
            });
         }
        }

    });

    // function dataStyle(feature) {
    //     var dat = feature.get(currentElement) || '';
    //     if(dat=='999999'){
    //         dat = '';
    //
    //     }
    //     var style = new ol.style.Style({
    //         text: new ol.style.Text({
    //             font: '10px Simhei',
    //             text: dat,
    //             fill: new ol.style.Fill({
    //                 color: [255, 64, 64, 0.75]
    //             }),
    //             stroke: new ol.style.Stroke({
    //                 color: 'rgba(255, 255, 255, 0.7)',
    //                 width: 2
    //              })
    //         })
    //         // image: new ol.style.Circle({
    //         //     radius: 6,
    //         //     stroke: new ol.style.Stroke({
    //         //         color: 'white',
    //         //         width: 2
    //         //     }),
    //         //     fill: new ol.style.Fill({
    //         //         color: 'green'
    //         //     })
    //         // })
    //     });
    //     return [style];
    // }

    var srcData = new ol.source.Vector();
    var lyData = new ol.layer.Vector({
        source: srcData,
        // style: dataStyle
    });

    var clusterSource = new ol.source.Cluster({
      source: srcData,
      distance: 50
    });

    // var styleCache = {};
    var clusters = new ol.layer.Vector({
        source: clusterSource,
        style: function(feature) {
          var style;//!important，refresh features when change elements
          var size = feature.get('features').length;
          var sum = 0.0;
          var count = 0;
          var features = feature.get('features');
          for(var i=0;i<size;i++){
            var data = features[i]['S'][currentElement];
            if(data){
              if(data != '999999'){
                data = parseFloat(data);
                sum += data;
                count++;
              }
            }

          }
          var dataInt = '';
          // var style = styleCache[size];
          // 能见度单位m转换为km
          if(currentElement == 'VIS_HOR_1MI'){
            sum /= 1000;
          }
          if(sum){
            dataInt = parseInt(sum/count);
            //red:#cc3333(>35);blue:#3399cc(<0);green:#66cc33(0<T<35)
            var fillColor = '#66CC33';
            if(dataInt > COLORTHRESHOLD[currentElement][1]){
              fillColor = '#CC3333'
            }else if(dataInt < COLORTHRESHOLD[currentElement][0]){
              fillColor = '#3399CC'
            }
            // console.log(dataInt, fillColor);
            style = new ol.style.Style({
              image: new ol.style.Circle({
                radius: 10,
                stroke: new ol.style.Stroke({
                  color: '#fff'
                }),
                fill: new ol.style.Fill({
                  color: fillColor
                })
              }),
              text: new ol.style.Text({
                text: dataInt.toString(),
                fill: new ol.style.Fill({
                  color: '#fff'
                })
              })
            });

            // styleCache[size] = style;

          }
          return style;
        }
      });

    var imgsrc = new ol.source.ImageStatic({
      imageExtent: ol.extent.applyTransform(PLOTLATLON,ol.proj.getTransform("EPSG:4326", "EPSG:3857"))
    });

    var lyContourf = new ol.layer.Image({
      opacity: 1,
      source: imgsrc,
      visible: false
    });

    // console.log(lyContourf);
    var map = new ol.Map({
        target: 'map',
        layers: [
            lyContourf,
            lyRaster,
            lyXianline,
            lyXiangPoint,
            lyXianPoint,
            clusters

        ],
        view: new ol.View({
            maxZoom: 11,
            minZoom: 7
        }),
        logo: false,
        controls: mapControls,
        interactions: mapInteractions
    });

    var view = map.getView();
    view.fit(targetExtent, map.getSize());

    $.getJSON('/zh/realtime_latest/')
        .done(function (data) {
            var dt = data['time'];
            currentDate = dt.substr(0, 4)+'/'+dt.substr(4, 2)+'/'+dt.substr(6, 2)
            currentFileName = data['filename']
            var ti = [dt.substr(0, 4), '年', dt.substr(4, 2), '月', dt.substr(6, 2), '日', dt.substr(8, 2), ':', dt.substr(10, 2)].join('');
            $('#timeinfo').html(ti);

            var transform = ol.proj.getTransform('EPSG:4326', 'EPSG:3857');

            srcData.clear();

            $.getJSON('/zh/realtime_data/' + data['relative_dirname'] + '/' + data['filename'])
                .done(function (realtime) {
//                    console.dir(realtime);
                    realtime.forEach(function (rt) {
                        if(rt['sjz'] == "1"){
                            var feature = new ol.Feature(rt);
                            var coordinate = transform([parseFloat(rt['Lon']), parseFloat(rt['Lat'])]);
                            var geometry = new ol.geom.Point(coordinate);
                            feature.setGeometry(geometry);
                            srcData.addFeature(feature);
                        }
                    });
                });
        });

    $('#navbar a').click(function () {
        $('#navbar a').linkbutton('unselect');
        $(this).linkbutton('select');
        switch(this.dataset.button){
            case '1':
                currentElement = 'TEM';
                break;
            case '2':
                currentElement = 'RHU';
                break;
            case '3':
                currentElement = 'PRE';
                break;
            case '4':
                currentElement = 'VIS_HOR_1MI';
                break;
            case '5':
                currentElement = 'WIN_S_Avg_1mi';
                break;
        }
        clusters.changed();
        fnUpdatePlot();
    });
    // $('#navbar a:first').click();

    $('#sb').switchbutton({
              checked: false,
              onChange: function(checked){
                  if(checked){
                    //检查是否第一次装载图层
                    if(imgsrc.M.j == undefined){
                      fnUpdatePlot();
                    }
                    lyRaster.setVisible(false)
                    lyContourf.setVisible(true);
                    // clusters.setVisible(false);
                  }else {
                    lyContourf.setVisible(false);
                    // clusters.setVisible(true);
                    lyRaster.setVisible(true);
                  }
              },
              onText: "等值线ON",
              offText: "等值线OFF",
              width: 100
    });

  //ajax 装载效果函数
  function ajaxLoading(){
      $("<div class=\"datagrid-mask\"></div>").css({display:"block",width:"100%",height:$(window).height()}).appendTo("body");
      $("<div class=\"datagrid-mask-msg\"></div>").html("正在绘图，请稍候......").appendTo("body").css({display:"block",left:($(document.body).outerWidth(true) - 190) / 2,top:($(window).height() - 45) / 2});
   }

   function ajaxLoadEnd(){
       $(".datagrid-mask").remove();
       $(".datagrid-mask-msg").remove();
  }

  function fnUpdatePlot(){
    if(ImageCache[currentElement]){
      imgsrc = new ol.source.ImageStatic({
        url:'/' + ImageCache[currentElement],
        imageExtent: ol.extent.applyTransform(PLOTLATLON,ol.proj.getTransform("EPSG:4326", "EPSG:3857"))
      });
      lyContourf.setSource(imgsrc);
      lyContourf.changed();
    }else{
      $.ajax({
        url: '/zh/plot/',
        content_type: 'application/json;charset=utf-8',
        type: 'GET',
        data: {
          'var' : currentElement,
          'date': currentDate,
          'filename': currentFileName,
          'save_dir': 'static'
        },
        beforeSend: ajaxLoading,
        success: function(json){
          ajaxLoadEnd();
          if(json['imgName'] == ''){
            imgsrc = new ol.source.ImageStatic({
              url:"/static/opacity.png",
              imageExtent: ol.extent.applyTransform(PLOTLATLON,ol.proj.getTransform("EPSG:4326", "EPSG:3857"))
            });
            lyContourf.setSource(imgsrc);
            lyContourf.changed();
            //clear lyContourf
            $.messager.show({
                title:'绘图错误',
                msg:'站点数据错误，无法绘图！',
                timeout:3000,
                showType:'slide'
            });
            return;
          }
          ImageCache[currentElement] = json['imgName'];
          imgsrc = new ol.source.ImageStatic({
            url:'/' + json['imgName'],
            imageExtent: ol.extent.applyTransform(PLOTLATLON,ol.proj.getTransform("EPSG:4326", "EPSG:3857"))
          });
          lyContourf.setSource(imgsrc);
          lyContourf.changed();
          console.log(json);
        },
        error: function(error){
          console.log('error in ajax');
          console.log(error);
        }
      });
  }
}

});
